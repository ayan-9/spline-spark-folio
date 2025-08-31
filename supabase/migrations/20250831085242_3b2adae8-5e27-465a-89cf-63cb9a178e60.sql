-- Fix security vulnerability: Update overly permissive RLS policies for contact_messages table

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Admin can view all contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admin can update message status" ON public.contact_messages;

-- Create secure policies that require authentication
CREATE POLICY "Authenticated users can view contact messages" 
ON public.contact_messages 
FOR SELECT 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can update message status" 
ON public.contact_messages 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- The INSERT policy "Anyone can submit contact messages" remains unchanged as it's correct for a contact form