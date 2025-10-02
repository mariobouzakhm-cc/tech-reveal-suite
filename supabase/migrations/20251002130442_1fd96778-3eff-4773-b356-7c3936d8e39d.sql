-- Fix 1: Add explicit INSERT policy for profiles (profiles are created by trigger only)
-- This prevents manual profile creation and makes security explicit
CREATE POLICY "Profiles are created by trigger only"
ON public.profiles
FOR INSERT
WITH CHECK (false);

-- Fix 2: Allow users to view their own role
CREATE POLICY "Users can view their own role"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

-- Fix 3: Restrict support case creation to prevent abuse
-- Remove the overly permissive policy
DROP POLICY IF EXISTS "Authenticated users can create support cases" ON public.support_cases;

-- Allow only admins and devs to create support cases
-- (In a real application, you might want customers to create their own cases,
-- but without a customer relationship system in place, we restrict to staff)
CREATE POLICY "Admins and devs can create support cases"
ON public.support_cases
FOR INSERT
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'dev'::app_role)
);