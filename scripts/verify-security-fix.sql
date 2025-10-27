-- Verification script for security fix
-- Run this in Supabase SQL editor to verify the search_path fix is working
-- This verifies that the security fix in schema.sql is properly applied

-- Check if the function exists and has the correct search_path
SELECT 
  proname AS function_name,
  pronamespace::regnamespace AS schema_name,
  proconfig AS configuration,
  CASE 
    WHEN proconfig IS NULL THEN 'VULNERABLE - No search_path set'
    WHEN 'search_path=public,pg_catalog' = ANY(proconfig) THEN 'SECURE - Correct search_path'
    WHEN 'search_path=pg_catalog,public' = ANY(proconfig) THEN 'SECURE - Alternative search_path order'
    ELSE 'CHECK - Unexpected configuration: ' || array_to_string(proconfig, ', ')
  END AS security_status
FROM pg_proc 
WHERE proname = 'update_updated_at_column' 
  AND pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public');

-- Check if the trigger exists and is properly configured
SELECT 
  tgname AS trigger_name,
  tgrelid::regclass AS table_name,
  tgenabled AS enabled,
  'Trigger exists and is enabled' AS trigger_status
FROM pg_trigger 
WHERE tgname = 'update_tasks_updated_at';

-- Test the function to ensure it still works
-- This should return the current timestamp
SELECT update_updated_at_column() AS test_result;

-- Expected result: The function should work and show SECURE status
