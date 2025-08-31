-- Create security definer function to check user roles (using correct enum type)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can view contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated users can update message status" ON public.contact_messages;

-- Create new admin-only policies for contact messages
CREATE POLICY "Only admins can view contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update message status" 
ON public.contact_messages 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'::app_role));