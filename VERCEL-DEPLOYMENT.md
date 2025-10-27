# Vercel Deployment Guide

## Quick Setup Steps

### 1. Connect Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository containing this project

### 2. Configure Environment Variables
In your Vercel project settings, go to **Environment Variables** and add:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Your Supabase anon key |
| `OPENAI_API_KEY` | `sk-...` | Your OpenAI API key |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` | Your Vercel domain |
| `NEXTAUTH_SECRET` | `random-32-char-string` | Random secret for NextAuth |

### 3. Deploy
1. Click "Deploy"
2. Wait for the build to complete
3. Your app will be available at `https://your-app.vercel.app`

### 4. Analytics & Monitoring
- **Analytics**: User behavior and engagement tracking starts automatically
- **Speed Insights**: Performance data collection begins automatically
- **Dashboard**: View analytics in your Vercel dashboard under "Analytics" and "Speed Insights"
- **Metrics**: Monitor user engagement, page views, and Core Web Vitals

## Environment Variable Details

### Required Variables
- **NEXT_PUBLIC_SUPABASE_URL**: Get from Supabase project settings
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Get from Supabase project settings
- **OPENAI_API_KEY**: Get from OpenAI dashboard
- **NEXTAUTH_URL**: Your Vercel domain (will be provided after first deploy)
- **NEXTAUTH_SECRET**: Generate with `openssl rand -base64 32`

### Optional Variables
- **NEXT_PUBLIC_ENABLE_TASK_LIMIT**: `false` (default)
- **NEXT_PUBLIC_MAX_TASKS_PER_USER**: `5` (default)
- **NEXT_PUBLIC_SUPPORT_EMAIL**: `support@example.com` (default)

## Troubleshooting

### Common Issues

**Environment Variable Not Found**
- Ensure all variables are set in Vercel dashboard
- Check variable names match exactly (case-sensitive)
- Redeploy after adding new variables

**Authentication Errors**
- Verify `NEXTAUTH_URL` matches your Vercel domain exactly
- Ensure `NEXTAUTH_SECRET` is a strong random string
- Check Supabase URL and keys are correct

**Build Failures**
- Check Vercel build logs for specific errors
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation passes locally

### Getting Help
- Check Vercel deployment logs
- Verify environment variables are set correctly
- Test locally with same environment variables
