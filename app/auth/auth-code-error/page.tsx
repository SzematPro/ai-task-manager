'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

function AuthCodeErrorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const errorParam = searchParams.get('error')
    if (errorParam) {
      setError(errorParam)
    }
  }, [searchParams])

  useEffect(() => {
    // Auto-redirect after 10 seconds
    const timer = setTimeout(() => {
      router.push('/')
    }, 10000)

    return () => clearTimeout(timer)
  }, [router])

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'access_denied':
        return 'You denied access to the application. Please try again and allow access when prompted.'
      case 'exchange_failed':
        return 'Failed to exchange authorization code for session. Please try again.'
      case 'callback_failed':
        return 'Authentication callback failed. Please try again.'
      case 'no_code':
        return 'No authorization code received. Please try signing in again.'
      default:
        return 'An unknown error occurred during authentication.'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100">
      <div className="text-center space-y-6 p-8 max-w-md">
        <div className="text-6xl">⚠️</div>
        <h1 className="text-3xl font-bold text-gray-900">
          Authentication Error
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p className="font-semibold">Error Details:</p>
            <p className="text-sm">{getErrorMessage(error)}</p>
          </div>
        )}
        
        <p className="text-lg text-gray-600">
          There was a problem signing you in with Google. This could be due to:
        </p>
        <ul className="text-left text-gray-600 space-y-2">
          <li>• Network connectivity issues</li>
          <li>• Google OAuth configuration in Supabase</li>
          <li>• Browser security settings</li>
          <li>• Incorrect redirect URL configuration</li>
        </ul>
        
        <div className="space-y-4">
          <Button 
            onClick={() => router.push('/')}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </Button>
          <p className="text-sm text-gray-500">
            You will be automatically redirected in 10 seconds...
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AuthCodeError() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100">
        <div className="text-center space-y-6 p-8 max-w-md">
          <div className="text-6xl">⚠️</div>
          <h1 className="text-3xl font-bold text-gray-900">
            Loading...
          </h1>
        </div>
      </div>
    }>
      <AuthCodeErrorContent />
    </Suspense>
  )
}
