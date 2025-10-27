# Security Policy

## Security Fixes Applied

### Database Security - Search Path Vulnerability Fix

**Issue**: The `update_updated_at_column` function was vulnerable to search_path manipulation attacks because it didn't explicitly set a search_path.

**Risk**: 
- Ambiguous object resolution could lead to calling unintended functions
- Potential SQL injection via object name resolution
- Non-deterministic behavior based on caller's search_path

**Fix Applied**:
```sql
-- BEFORE (Vulnerable)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- AFTER (Secure)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql' SET search_path = public, pg_catalog;
```

**Implementation**: The security fix is included in `supabase/schema.sql` for new deployments. No additional migration is needed.

## Security Features

### Row Level Security (RLS)
- All tables have RLS enabled
- Users can only access their own data
- 4 comprehensive RLS policies implemented

### Authentication
- Google OAuth integration
- Secure session management
- Proper error handling for auth failures

### Database Functions
- All functions use explicit search_path
- No privilege escalation vulnerabilities
- Proper parameter validation

### API Security
- Environment variable protection
- Secure API key handling
- Input validation and sanitization

## Reporting Security Issues

If you discover a security vulnerability, please report it to:
- **Email**: waldemar@szemat.pro
- **GitHub Issues**: [Security Issues](https://github.com/SzematPro/ai-task-manager/issues)

Please do not report security vulnerabilities through public GitHub issues.

## Security Best Practices

1. **Environment Variables**: Never commit API keys or secrets to version control
2. **Database Access**: Use RLS policies to restrict data access
3. **Function Security**: Always set explicit search_path for database functions
4. **Input Validation**: Validate all user inputs
5. **Error Handling**: Don't expose sensitive information in error messages
6. **Regular Updates**: Keep dependencies updated for security patches
