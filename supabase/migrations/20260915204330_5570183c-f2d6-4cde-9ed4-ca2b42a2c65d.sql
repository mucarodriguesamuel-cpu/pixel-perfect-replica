CREATE TYPE public.appointment_status AS ENUM ('pendente','confirmado','concluido','cancelado');

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

CREATE TABLE public.business_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  weekday int NOT NULL UNIQUE CHECK (weekday BETWEEN 0 AND 6),
  is_open boolean NOT NULL DEFAULT true,
  start_time time NOT NULL DEFAULT '09:00',
  end_time time NOT NULL DEFAULT '23:00',
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
CREATE UNIQUE INDEX appointments_slot_unique ON public.appointments (appointment_date, appointment_time) WHERE status <> 'cancelado';
GRANT INSERT ON public.appointments TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.appointments TO authenticated;
GRANT ALL ON public.appointments TO service_role;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can book" ON public.appointments FOR INSERT TO anon, authenticated WITH CHECK (status = 'pendente' AND appointment_date >= (now() AT TIME ZONE 'America/Sao_Paulo')::date);
CREATE POLICY "admin reads" ON public.appointments FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "admin updates" ON public.appointments FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "admin deletes" ON public.appointments FOR DELETE TO authenticated USING (public.is_admin());
CREATE TRIGGER appointments_updated BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.available_slots(_date date)
RETURNS TABLE(slot time)
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
REVOKE ALL ON FUNCTION public.available_slots(date) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.available_slots(date) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.validate_appointment()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE recent_count int;
BEGIN
  NEW.client_name := btrim(NEW.client_name);
  NEW.whatsapp := btrim(NEW.whatsapp);
  NEW.email := nullif(btrim(coalesce(NEW.email, '')), '');
  NEW.notes := nullif(btrim(coalesce(NEW.notes, '')), '');
  IF length(NEW.client_name) < 2 OR length(NEW.client_name) > 80 THEN RAISE EXCEPTION 'Nome inválido'; END IF;
  IF length(regexp_replace(NEW.whatsapp, '\D', '', 'g')) < 10 OR length(NEW.whatsapp) > 25 THEN RAISE EXCEPTION 'WhatsApp inválido'; END IF;
  IF NEW.email IS NOT NULL AND (length(NEW.email) > 120 OR NEW.email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$') THEN RAISE EXCEPTION 'E-mail inválido'; END IF;
  IF NEW.notes IS NOT NULL AND length(NEW.notes) > 500 THEN RAISE EXCEPTION 'Observações muito longas'; END IF;
  IF length(NEW.service_name) > 120 THEN RAISE EXCEPTION 'Serviço inválido'; END IF;
  IF TG_OP = 'INSERT' THEN
    SELECT count(*) INTO recent_count FROM public.appointments a
    WHERE regexp_replace(a.whatsapp, '\D', '', 'g') = regexp_replace(NEW.whatsapp, '\D', '', 'g')
      AND a.created_at > now() - interval '24 hours';
    IF recent_count >= 5 THEN RAISE EXCEPTION 'Limite de agendamentos atingido. Fale conosco pelo WhatsApp.'; END IF;
  END IF;
  RETURN NEW;
END; $$;
REVOKE ALL ON FUNCTION public.validate_appointment() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.validate_appointment() TO service_role;
CREATE TRIGGER appointments_validate BEFORE INSERT OR UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.validate_appointment();

INSERT INTO public.services (name, description, duration_minutes, sort_order) VALUES
  ('Alongamento em gel', 'Alongamentos personalizados que respeitam o formato das mãos e priorizam uma aparência natural, elegante e resistente.', 120, 1),
  ('Banho de gel', 'Uma camada de estrutura e proteção sobre a unha natural, sem necessidade de alongar.', 90, 2),
  ('Manutenção', 'Cuidados para preservar a estrutura e o acabamento conforme a unha natural cresce.', 90, 3);
INSERT INTO public.business_hours (weekday, is_open, start_time, end_time, slot_minutes) VALUES
  (0, true, '09:00', '23:00', 90), (1, true, '09:00', '23:00', 90),
  (2, true, '09:00', '23:00', 90), (3, true, '09:00', '23:00', 90),
  (4, true, '09:00', '23:00', 90), (5, true, '09:00', '23:00', 90),
  (6, true, '09:00', '23:00', 90);