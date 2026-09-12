
CREATE TYPE public.app_role AS ENUM ('admin');
CREATE TYPE public.appointment_status AS ENUM ('pendente','confirmado','concluido','cancelado');

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

-- roles
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(auth.uid(), 'admin');
$$;

-- grant admin role automatically to the owner email on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF lower(NEW.email) = 'ffcontaneto@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END; $$;

-- services
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  duration_minutes int NOT NULL DEFAULT 90,
  price numeric(10,2),
  active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.services TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT ALL ON public.services TO service_role;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "services public read" ON public.services FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "services admin write" ON public.services FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER services_updated BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- business hours
CREATE TABLE public.business_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  weekday int NOT NULL UNIQUE CHECK (weekday BETWEEN 0 AND 6),
  is_open boolean NOT NULL DEFAULT true,
  start_time time NOT NULL DEFAULT '09:00',
  end_time time NOT NULL DEFAULT '18:00',
  slot_minutes int NOT NULL DEFAULT 90,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.business_hours TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.business_hours TO authenticated;
GRANT ALL ON public.business_hours TO service_role;
ALTER TABLE public.business_hours ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hours public read" ON public.business_hours FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "hours admin write" ON public.business_hours FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER hours_updated BEFORE UPDATE ON public.business_hours FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- blocks
CREATE TABLE public.blocked_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  block_date date NOT NULL,
  block_time time,
  reason text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX blocked_slots_unique ON public.blocked_slots (block_date, COALESCE(block_time, '00:00'::time), (block_time IS NULL));
GRANT SELECT ON public.blocked_slots TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blocked_slots TO authenticated;
GRANT ALL ON public.blocked_slots TO service_role;
ALTER TABLE public.blocked_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "blocks public read" ON public.blocked_slots FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "blocks admin write" ON public.blocked_slots FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- appointments
CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  whatsapp text NOT NULL,
  email text,
  service_id uuid REFERENCES public.services(id) ON DELETE SET NULL,
  service_name text NOT NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  notes text,
  status public.appointment_status NOT NULL DEFAULT 'pendente',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX appointments_slot_unique ON public.appointments (appointment_date, appointment_time)
  WHERE status <> 'cancelado';
GRANT INSERT ON public.appointments TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.appointments TO authenticated;
GRANT ALL ON public.appointments TO service_role;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can book" ON public.appointments FOR INSERT TO anon, authenticated WITH CHECK (status = 'pendente' AND appointment_date >= (now() AT TIME ZONE 'America/Sao_Paulo')::date);
CREATE POLICY "admin reads" ON public.appointments FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "admin updates" ON public.appointments FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "admin deletes" ON public.appointments FOR DELETE TO authenticated USING (public.is_admin());
CREATE TRIGGER appointments_updated BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- public availability function (does not leak client data)
CREATE OR REPLACE FUNCTION public.available_slots(_date date)
RETURNS TABLE (slot time)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE h record;
BEGIN
  SELECT * INTO h FROM public.business_hours WHERE weekday = EXTRACT(DOW FROM _date)::int;
  IF h IS NULL OR NOT h.is_open THEN RETURN; END IF;
  IF _date < (now() AT TIME ZONE 'America/Sao_Paulo')::date THEN RETURN; END IF;
  IF EXISTS (SELECT 1 FROM public.blocked_slots b WHERE b.block_date = _date AND b.block_time IS NULL) THEN RETURN; END IF;
  RETURN QUERY
  SELECT s::time FROM generate_series(
      _date + h.start_time,
      _date + h.end_time - (h.slot_minutes || ' minutes')::interval,
      (h.slot_minutes || ' minutes')::interval
    ) AS s
  WHERE NOT EXISTS (
      SELECT 1 FROM public.appointments a
      WHERE a.appointment_date = _date AND a.appointment_time = s::time AND a.status <> 'cancelado')
    AND NOT EXISTS (
      SELECT 1 FROM public.blocked_slots b
      WHERE b.block_date = _date AND b.block_time = s::time)
    AND (_date > (now() AT TIME ZONE 'America/Sao_Paulo')::date
         OR s::time > (now() AT TIME ZONE 'America/Sao_Paulo')::time);
END; $$;
GRANT EXECUTE ON FUNCTION public.available_slots(date) TO anon, authenticated;

-- seed services (no prices invented)
INSERT INTO public.services (name, description, duration_minutes, sort_order) VALUES
  ('Alongamento de unhas', 'Resultado natural, resistente e elegante.', 150, 1),
  ('Banho de gel', 'Proteção e fortalecimento das unhas naturais.', 90, 2),
  ('Manutenção', 'Cuidado periódico para preservar o acabamento e a resistência.', 120, 3),
  ('Esmaltação em gel', 'Finalização duradoura, delicada e com brilho.', 60, 4);

INSERT INTO public.business_hours (weekday, is_open, start_time, end_time, slot_minutes) VALUES
  (0, false, '09:00', '18:00', 90),
  (1, true, '09:00', '18:00', 90),
  (2, true, '09:00', '18:00', 90),
  (3, true, '09:00', '18:00', 90),
  (4, true, '09:00', '18:00', 90),
  (5, true, '09:00', '18:00', 90),
  (6, true, '09:00', '16:00', 90);
