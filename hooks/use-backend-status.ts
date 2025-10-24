import { useState, useEffect } from 'react'

interface Service {
  name: string
  description: string
  status: 'checking' | 'online' | 'offline' | 'degraded'
  responseTime?: number
  lastChecked: Date
}

interface BackendStatus {
  services: Service[]
  getStatusColor: (status: string) => string
  getStatusText: (status: string) => string
  getStatusTextColor: (status: string) => string
}

export function useBackendStatus(): BackendStatus {
  const [services, setServices] = useState<Service[]>([])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500'
      case 'degraded':
        return 'bg-yellow-500'
      case 'offline':
        return 'bg-red-500'
      case 'checking':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return 'Online'
      case 'degraded':
        return 'Degraded'
      case 'offline':
        return 'Offline'
      case 'checking':
        return 'Checking...'
      default:
        return 'Unknown'
    }
  }

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-600'
      case 'degraded':
        return 'text-yellow-600'
      case 'offline':
        return 'text-red-600'
      case 'checking':
        return 'text-blue-600'
      default:
        return 'text-gray-600'
    }
  }

  useEffect(() => {
    const checkServices = async () => {
      const startTime = Date.now()
      
      // Initialize services
      const servicesToCheck: Service[] = [
        {
          name: 'Supabase',
          description: 'Database & Authentication',
          status: 'checking',
          lastChecked: new Date()
        },
        {
          name: 'OpenAI',
          description: 'AI Processing',
          status: 'checking',
          lastChecked: new Date()
        },
        {
          name: 'Local Storage',
          description: 'Client-side storage',
          status: 'checking',
          lastChecked: new Date()
        }
      ]

      setServices(servicesToCheck)

      try {
        // Check Supabase
        try {
          const supabaseResponse = await fetch('/api/health')
          const responseTime = Date.now() - startTime
          if (supabaseResponse.ok) {
            setServices(prev => prev.map(service => 
              service.name === 'Supabase' 
                ? { ...service, status: 'online', responseTime, lastChecked: new Date() }
                : service
            ))
          } else {
            setServices(prev => prev.map(service => 
              service.name === 'Supabase' 
                ? { ...service, status: 'offline', responseTime, lastChecked: new Date() }
                : service
            ))
          }
        } catch {
          setServices(prev => prev.map(service => 
            service.name === 'Supabase' 
              ? { ...service, status: 'offline', lastChecked: new Date() }
              : service
          ))
        }

        // Check OpenAI
        try {
          // Mock OpenAI check
          await new Promise(resolve => setTimeout(resolve, 100))
          const responseTime = Date.now() - startTime
          setServices(prev => prev.map(service => 
            service.name === 'OpenAI' 
              ? { ...service, status: 'online', responseTime, lastChecked: new Date() }
              : service
          ))
        } catch {
          setServices(prev => prev.map(service => 
            service.name === 'OpenAI' 
              ? { ...service, status: 'offline', lastChecked: new Date() }
              : service
          ))
        }

        // Check localStorage
        try {
          localStorage.setItem('test', 'test')
          localStorage.removeItem('test')
          const responseTime = Date.now() - startTime
          setServices(prev => prev.map(service => 
            service.name === 'Local Storage' 
              ? { ...service, status: 'online', responseTime, lastChecked: new Date() }
              : service
          ))
        } catch {
          setServices(prev => prev.map(service => 
            service.name === 'Local Storage' 
              ? { ...service, status: 'offline', lastChecked: new Date() }
              : service
          ))
        }
      } catch (error) {
        console.error('Error checking services:', error)
      }
    }

    checkServices()
  }, [])

  return {
    services,
    getStatusColor,
    getStatusText,
    getStatusTextColor
  }
}