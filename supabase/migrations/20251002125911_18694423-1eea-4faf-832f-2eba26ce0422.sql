-- Drop the overly permissive policy that allows all authenticated users to view customers
DROP POLICY IF EXISTS "Authenticated users can view customers" ON public.customers;

-- Create a new policy that restricts customer data access to admins and developers only
CREATE POLICY "Admins and devs can view customers"
ON public.customers
FOR SELECT
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'dev'::app_role)
);