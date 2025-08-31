-- Create an enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
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

-- Create RLS policy for user_roles table (users can only see their own roles)
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can view contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Authenticated users can update message status" ON public.contact_messages;

-- Create new admin-only policies for contact messages
CREATE POLICY "Only admins can view contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update message status" 
ON public.contact_messages 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

-- Insert the first admin user (this will be the first user who signs up)
-- Note: This will need to be manually assigned after the first user registers