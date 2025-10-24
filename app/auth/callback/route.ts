import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error, errorDescription)
    return NextResponse.redirect(`${requestUrl.origin}/auth/auth-code-error?error=${error}`)
  }

  // Check if Supabase is configured
  if (!supabase) {
    console.warn('Supabase is not configured. Redirecting to demo mode.')
    return NextResponse.redirect(`${requestUrl.origin}/?demo=true`)
  }

  if (code) {
    try {
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Auth callback error:', exchangeError)
        return NextResponse.redirect(`${requestUrl.origin}/auth/auth-code-error?error=exchange_failed`)
      }

      if (data.user) {
        console.log('User authenticated successfully:', data.user.email)
        return NextResponse.redirect(`${requestUrl.origin}/`)
      }
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(`${requestUrl.origin}/auth/auth-code-error?error=callback_failed`)
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}/auth/auth-code-error?error=no_code`)
}