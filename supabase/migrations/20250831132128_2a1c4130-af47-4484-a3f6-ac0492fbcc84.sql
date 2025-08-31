-- Drop the existing INSERT policy that's not working for edge functions
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON contact_messages;

-- Create a new policy that properly handles edge function requests
-- Edge functions with verify_jwt = false run with the service role
CREATE POLICY "Allow contact form submissions" 
ON contact_messages 
FOR INSERT 
WITH CHECK (true);

-- Also ensure we have a policy for edge functions to potentially read if needed for validation
DROP POLICY IF EXISTS "Edge function contact access" ON contact_messages;
CREATE POLICY "Edge function contact access" 
ON contact_messages 
FOR SELECT 
TO service_role
USING (true);