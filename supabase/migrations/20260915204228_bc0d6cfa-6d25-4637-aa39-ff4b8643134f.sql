DROP FUNCTION IF EXISTS public.available_slots(date);
DROP TABLE IF EXISTS public.appointments;
DROP FUNCTION IF EXISTS public.validate_appointment();
DROP TABLE IF EXISTS public.blocked_slots;
DROP TABLE IF EXISTS public.business_hours;
DROP TABLE IF EXISTS public.services;
DROP TYPE IF EXISTS public.appointment_status;