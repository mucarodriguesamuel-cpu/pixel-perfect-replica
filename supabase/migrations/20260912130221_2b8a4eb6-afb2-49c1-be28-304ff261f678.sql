
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
      OR lower(coalesce(auth.jwt() ->> 'email','')) = 'ffcontaneto@gmail.com';
$$;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM public, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM public, anon;
REVOKE EXECUTE ON FUNCTION public.available_slots(date) FROM public;
GRANT EXECUTE ON FUNCTION public.available_slots(date) TO anon, authenticated;