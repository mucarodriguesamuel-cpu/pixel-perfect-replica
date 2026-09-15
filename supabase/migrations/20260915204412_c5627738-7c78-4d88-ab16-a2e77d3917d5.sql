ALTER FUNCTION public.is_admin() SECURITY INVOKER;

CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC;
GRANT USAGE ON SCHEMA private TO anon, authenticated;

CREATE OR REPLACE FUNCTION private.available_slots_impl(_date date)
RETURNS TABLE(slot time)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public, pg_temp AS $$
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
REVOKE ALL ON FUNCTION private.available_slots_impl(date) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.available_slots_impl(date) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.available_slots(_date date)
RETURNS TABLE(slot time)
LANGUAGE sql STABLE SECURITY INVOKER SET search_path = public, private AS $$
  SELECT * FROM private.available_slots_impl(_date);
$$;
REVOKE ALL ON FUNCTION public.available_slots(date) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.available_slots(date) TO anon, authenticated;