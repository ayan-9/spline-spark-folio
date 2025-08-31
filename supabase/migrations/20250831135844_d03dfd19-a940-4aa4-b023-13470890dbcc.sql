-- Clean up duplicate policies on contact_messages table
DROP POLICY IF EXISTS "allow_insert_messages" ON contact_messages;
DROP POLICY IF EXISTS "Admin only contact messages access" ON contact_messages;
DROP POLICY IF EXISTS "Admin only contact messages update" ON contact_messages;

-- Keep only the clean, properly named policies
-- The "Allow contact form submissions" policy should remain for INSERT
-- The "Only admins can view contact messages" policy should remain for SELECT  
-- The "Only admins can update message status" policy should remain for UPDATE

-- Ensure the edge function can access environment variables by checking config
SELECT name FROM pg_settings WHERE name LIKE '%supabase%' LIMIT 5;