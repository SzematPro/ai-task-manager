#!/usr/bin/env node

/**
 * Vercel Configuration Verification Script
 * Run this to verify your Vercel deployment configuration
 */

console.log('🔍 Verifying Vercel Configuration...\n');

// Check if we're in a Vercel environment
const isVercel = process.env.VERCEL === '1';
const vercelUrl = process.env.VERCEL_URL;
const nextAuthUrl = process.env.NEXTAUTH_URL;

console.log('Environment Information:');
console.log(`- Vercel Environment: ${isVercel ? '✅ Yes' : '❌ No'}`);
console.log(`- Vercel URL: ${vercelUrl || 'Not set'}`);
console.log(`- NextAuth URL: ${nextAuthUrl || 'Not set'}`);

if (isVercel && vercelUrl) {
  console.log('\n✅ Vercel environment detected');
  console.log(`🌐 Your app URL: https://${vercelUrl}`);
  
  if (nextAuthUrl && nextAuthUrl.includes(vercelUrl)) {
    console.log('✅ NextAuth URL matches Vercel URL');
  } else {
    console.log('⚠️  NextAuth URL may not match Vercel URL');
    console.log(`   Expected: https://${vercelUrl}`);
    console.log(`   Current: ${nextAuthUrl}`);
  }
} else {
  console.log('\n📝 Local development environment detected');
  console.log('   Make sure to set NEXTAUTH_URL in your .env.local file');
}

console.log('\n🔧 Supabase Configuration Checklist:');
console.log('1. Go to Supabase Dashboard → Authentication → URL Configuration');
console.log('2. Set Site URL to your Vercel URL');
console.log('3. Add redirect URL: https://your-app.vercel.app/auth/callback');
console.log('4. Keep localhost:3000/auth/callback for local development');

console.log('\n🚀 After updating Supabase:');
console.log('1. Redeploy your Vercel app');
console.log('2. Test the sign-up flow');
console.log('3. Verify redirects go to Vercel URL, not localhost');
