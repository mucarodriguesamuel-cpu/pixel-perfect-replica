REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated;
REVOKE ALL ON FUNCTION public.is_admin() FROM anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
REVOKE ALL ON FUNCTION public.available_slots(date) FROM public;
GRANT EXECUTE ON FUNCTION public.available_slots(date) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.validate_appointment()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE recent_count int;
BEGIN
  NEW.client_name := btrim(NEW.client_name);
  NEW.whatsapp := btrim(NEW.whatsapp);
  NEW.email := nullif(btrim(coalesce(NEW.email, '')), '');
  NEW.notes := nullif(btrim(coalesce(NEW.notes, '')), '');

  IF length(NEW.client_name) < 2 OR length(NEW.client_name) > 80 THEN
    RAISE EXCEPTION 'Nome inválido';
  END IF;

  IF length(regexp_replace(NEW.whatsapp, '\D', '', 'g')) < 10
     OR length(NEW.whatsapp) > 25 THEN
    RAISE EXCEPTION 'WhatsApp inválido';
  END IF;

  IF NEW.email IS NOT NULL AND (length(NEW.email) > 120 OR NEW.email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$') THEN
    RAISE EXCEPTION 'E-mail inválido';
  END IF;

  IF NEW.notes IS NOT NULL AND length(NEW.notes) > 500 THEN
    RAISE EXCEPTION 'Observações muito longas';
  END IF;

  IF length(NEW.service_name) > 120 THEN
    RAISE EXCEPTION 'Serviço inválido';
  END IF;

  IF TG_OP = 'INSERT' THEN
    SELECT count(*) INTO recent_count
    FROM public.appointments a
    WHERE regexp_replace(a.whatsapp, '\D', '', 'g') = regexp_replace(NEW.whatsapp, '\D', '', 'g')
      AND a.created_at > now() - interval '24 hours';

    IF recent_count >= 5 THEN
      RAISE EXCEPTION 'Limite de agendamentos atingido. Fale conosco pelo WhatsApp.';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.validate_appointment() FROM anon, authenticated;

DROP TRIGGER IF EXISTS appointments_validate ON public.appointments;
CREATE TRIGGER appointments_validate
BEFORE INSERT OR UPDATE ON public.appointments
FOR EACH ROW EXECUTE FUNCTION public.validate_appointment();