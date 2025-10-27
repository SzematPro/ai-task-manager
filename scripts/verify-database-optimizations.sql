-- Verification script for security and performance optimizations
-- Run this in Supabase SQL editor to verify all optimizations are working
-- This verifies that the security fixes and performance optimizations in schema.sql are properly applied

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

-- Verify RLS policies are using optimized subselects
SELECT 
  schemaname,
  tablename,
  policyname,
  cmd,
  qual,
  with_check,
  CASE 
    WHEN qual LIKE '%(SELECT auth.uid())%' OR with_check LIKE '%(SELECT auth.uid())%' 
    THEN 'OPTIMIZED - Using subselect for better performance'
    WHEN qual LIKE '%auth.uid()%' OR with_check LIKE '%auth.uid()%' 
    THEN 'NOT OPTIMIZED - Direct auth.uid() call detected'
    ELSE 'CHECK - No auth.uid() calls found'
  END AS performance_status
FROM pg_policies 
WHERE tablename = 'tasks' 
  AND schemaname = 'public'
ORDER BY policyname;

-- Expected result: All policies should show "OPTIMIZED" status
