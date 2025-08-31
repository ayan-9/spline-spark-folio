-- Remove the overly permissive read policy for edge functions
DROP POLICY IF EXISTS "Edge function contact access" ON contact_messages;

-- Verify that our INSERT policy is properly configured for edge functions
-- The "Allow contact form submissions" policy should be sufficient