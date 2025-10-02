-- Drop the overly permissive policy that allows all authenticated users to view businesses
DROP POLICY IF EXISTS "Authenticated users can view businesses" ON public.businesses;

-- Create a new policy that restricts business data access to admins and developers only
CREATE POLICY "Admins and devs can view businesses"
ON public.businesses
FOR SELECT
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'dev'::app_role)
);