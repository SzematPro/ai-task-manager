'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTaskStore } from '@/hooks/use-task-store'
import { useBackendStatus } from '@/hooks/use-backend-status'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { CheckCircle, Database, Brain, HardDrive, AlertCircle, Clock } from 'lucide-react'
import { ThemeToggle, FloatingThemeToggle } from '@/components/theme-toggle'
import { TaskLimitModal } from '@/components/task-limit-modal'

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null)
  const [taskInput, setTaskInput] = useState('')
  const [isButtonPressed, setIsButtonPressed] = useState(false)
  
  const {
    user,
    tasks,
    filteredTasks,
    loading,
    isProcessing,
    supabaseConfigured,
    filter,
    sort,
    setUser,
    setSupabaseConfigured,
    addTask,
    toggleTask,
    deleteTask,
    fetchTasks,
    setFilter,
    setSort,
    searchQuery,
    setSearchQuery,
    expandedTaskId,
    setExpandedTask,
    isTaskLimitModalOpen,
    maxTasksAllowed,
    setTaskLimitModalOpen
  } = useTaskStore()
  
  const { services, getStatusColor, getStatusText, getStatusTextColor } = useBackendStatus()

  useEffect(() => {
    // Check if Supabase is configured
    const isConfigured = !!(supabase && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    setSupabaseConfigured(isConfigured)
    
    // Check for existing session
    const checkSession = async () => {
      if (supabase && isConfigured) {
        try {
          const { data: { session } } = await supabase.auth.getSession()
          if (session?.user) {
            console.log('Session found, setting user:', session.user.email)
            setUser(session.user)
            await fetchTasks(session.user.id)
          } else {
            console.log('No session found, user will be null')
            setUser(null)
          }
        } catch (error) {
          console.error('Error checking session:', error)
          setUser(null)
        }
      } else {
        console.log('Supabase not configured, user will be null')
        setUser(null)
      }
    }
    
    checkSession()
  }, [setSupabaseConfigured, setUser, fetchTasks]) // Add dependencies

  // Ensure filteredTasks is initialized when tasks change
  useEffect(() => {
    if (tasks.length > 0 && filteredTasks.length === 0) {
      // Force re-filtering if filteredTasks is empty but tasks exist
      const { applyFiltersAndSort } = useTaskStore.getState()
      applyFiltersAndSort()
    }
  }, [tasks, filteredTasks.length])

  const handleSignIn = async () => {
    if (!supabase || !supabaseConfigured) {
      // Demo mode - simulate authentication
      setUser({ 
        email: 'demo@example.com',
        name: 'Demo User',
        id: 'demo-user-id',
        user_metadata: { full_name: 'Demo User' }
      })
      return
    }

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      })

      if (error) {
        console.error('Sign in error:', error)
        // Fallback to demo mode
        setUser({
          email: 'demo@example.com',
          name: 'Demo User',
          id: 'demo-user-id',
          user_metadata: { full_name: 'Demo User' }
        })
      }
    } catch (error) {
      console.error('Unexpected sign in error:', error)
      // Fallback to demo mode
      setUser({
        email: 'demo@example.com',
        name: 'Demo User',
        id: 'demo-user-id',
        user_metadata: { full_name: 'Demo User' }
      })
    }
  }

  const handleSignOut = async () => {
    console.log('Sign out initiated')
    
    if (!supabase || !supabaseConfigured) {
      console.log('Supabase not available, clearing user and tasks')
      setUser(null)
      // Clear tasks when signing out
      localStorage.removeItem('tasks')
      return
    }

    try {
      console.log('Calling Supabase signOut')
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Sign out error:', error)
      } else {
        console.log('Sign out successful, clearing user and tasks')
        setUser(null)
        // Clear tasks when signing out
        localStorage.removeItem('tasks')
      }
    } catch (error) {
      console.error('Unexpected sign out error:', error)
    }
  }

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = taskInput.trim()
    if (input) {
      await addTask(input)
      setTaskInput('') // Reset input state
      // Reset form using ref
      if (formRef.current) {
        formRef.current.reset()
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Allow Enter key to submit (but not Shift+Enter for new lines)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (taskInput.trim() && !isProcessing) {
        handleAddTask(e as any)
      }
    }
  }

  const handleButtonPress = () => {
    setIsButtonPressed(true)
    setTimeout(() => setIsButtonPressed(false), 150)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div 
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
            <motion.div 
              className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <motion.p 
            className="text-gray-500 text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Loading your tasks...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center" style={{ backgroundColor: '#ffffff' }}>
        <motion.div 
          className="max-w-md w-full mx-auto px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center space-y-8">
            {/* Logo and Title */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ color: '#111827' }}>AI Task Manager</h1>
                <p className="text-gray-600 text-lg" style={{ color: '#4b5563' }}>Transform your thoughts into organized tasks</p>
              </div>
            </motion.div>

            {/* Features Preview */}
            <motion.div 
              className="bg-gray-50 rounded-2xl p-6 space-y-4" style={{ backgroundColor: '#f9fafb' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ color: '#111827' }}>Intelligent AI Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <motion.div 
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700" style={{ color: '#374151' }}>Smart categorization</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700" style={{ color: '#374151' }}>Priority detection</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700" style={{ color: '#374151' }}>Duration estimation</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700" style={{ color: '#374151' }}>Due date prediction</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Sign In Button */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <Button
                onClick={handleSignIn}
                className="w-full bg-white hover:bg-gray-50 text-gray-900 px-6 py-4 rounded-xl font-medium transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:shadow-md flex items-center justify-center space-x-3" style={{ backgroundColor: '#ffffff', color: '#111827', borderColor: '#e5e7eb' }}
                size="lg"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>{supabaseConfigured ? 'Continue with Google' : 'Start Demo'}</span>
              </Button>
              
              <p className="text-xs text-gray-500 text-center">
                {supabaseConfigured ? 'Secure authentication • Your data is protected' : 'Demo mode • Local storage only'}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Modern Header */}
      <motion.header 
        className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <motion.div 
                className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </motion.div>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">AI Task Manager</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {supabaseConfigured ? 'Powered by Supabase' : 'Demo Mode'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 sm:space-x-3 flex-shrink-0">
              <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">
                {user.name || user.email}
              </div>
              
              {/* Theme Toggle */}
              <ThemeToggle />
              
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="inline-flex items-center text-xs sm:text-sm px-2 sm:px-3"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline">Sign Out</span>
                <span className="sm:hidden">Out</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <motion.div 
          className="space-y-6 sm:space-y-8 mobile-space-y"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Welcome Section */}
          <motion.div 
            className="text-center space-y-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Welcome back!</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Add a new task and let AI structure it for you
            </p>
          </motion.div>

          {/* Backend Services Status */}
          <motion.div 
            className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-gray-200 dark:border-slate-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Backend Services Status</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              {services && services.length > 0 ? services.map((service, index) => {
                const getServiceIcon = (serviceName: string) => {
                  switch (serviceName) {
                    case 'Supabase':
                      return <Database className="w-4 h-4" />
                    case 'OpenAI':
                      return <Brain className="w-4 h-4" />
                    case 'Local Storage':
                      return <HardDrive className="w-4 h-4" />
                    default:
                      return <Database className="w-4 h-4" />
                  }
                }

                const getStatusIcon = (status: string) => {
                  switch (status) {
                    case 'online':
                      return <CheckCircle className="w-4 h-4 text-green-500" />
                    case 'degraded':
                      return <AlertCircle className="w-4 h-4 text-yellow-500" />
                    case 'offline':
                      return <AlertCircle className="w-4 h-4 text-red-500" />
                    case 'checking':
                      return <Clock className="w-4 h-4 text-blue-500 animate-pulse" />
                    default:
                      return <AlertCircle className="w-4 h-4 text-gray-500" />
                  }
                }

                return (
                  <motion.div 
                    key={service.name}
                    className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-600 shadow-sm hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                        {getServiceIcon(service.name)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">{service.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{service.description}</div>
                        {service.responseTime !== undefined && service.responseTime > 0 && (
                          <div className="text-xs text-gray-400 dark:text-gray-500">{service.responseTime}ms</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(service.status)}
                      <div className={`text-xs font-medium ${getStatusTextColor(service.status)}`}>
                        {getStatusText(service.status)}
                      </div>
                    </div>
                  </motion.div>
                )
              }) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-2"></div>
                  <p>Checking services...</p>
                </div>
              )}
            </div>
            
            <motion.div 
              className="mt-4 pt-4 border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Last updated: {services && services.length > 0 ? services[0]?.lastChecked.toLocaleTimeString() : new Date().toLocaleTimeString()}</span>
                </span>
                <span className="flex items-center space-x-2">
                  {services && services.length > 0 && services.every(s => s.status === 'online') ? (
                    <CheckCircle className="w-3 h-3 text-green-500" />
                  ) : (
                    <AlertCircle className="w-3 h-3 text-yellow-500" />
                  )}
                  <span>
                    {services && services.length > 0 && services.every(s => s.status === 'online') 
                      ? 'All systems operational' 
                      : services && services.length > 0 
                        ? `${services.filter(s => s.status === 'online').length}/${services.length} systems operational`
                        : 'Checking systems...'
                    }
                  </span>
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Modern Task Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </motion.div>
                  <div>
                    <CardTitle>Add New Task</CardTitle>
                    <CardDescription>Describe your task in natural language</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form ref={formRef} onSubmit={handleAddTask} className="space-y-4">
                  <div className="relative">
                    <Textarea
                      name="task"
                      value={taskInput}
                      onChange={(e) => setTaskInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Try: 'I'm stressed about preparing comprehensive quarterly report for client meeting next week' or 'Schedule annual checkup with Dr. Smith this month - I'm worried about my health'"
                      className="w-full px-3 sm:px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 text-sm sm:text-base"
                      rows={3}
                      disabled={isProcessing}
                    />
                    {isProcessing && (
                      <motion.div 
                        className="absolute right-3 top-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 space-y-2 sm:space-y-0">
                    <div className="flex flex-col">
                      <p className="text-xs text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Super intelligent AI analysis
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Press <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Enter</kbd> to submit
                      </p>
                    </div>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button
                        type="submit"
                        disabled={isProcessing || !taskInput.trim()}
                        onClick={handleButtonPress}
                        className={`inline-flex items-center transition-all duration-200 touch-target ${
                          isButtonPressed ? 'scale-95 shadow-lg' : 'scale-100'
                        } ${
                          !taskInput.trim() 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:shadow-md active:shadow-lg'
                        }`}
                      >
                        {isProcessing ? (
                          <>
                            <motion.div 
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Processing...
                          </>
                        ) : (
                          <>
                            <motion.svg 
                              className="w-4 h-4 mr-2" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                              animate={isButtonPressed ? { scale: 1.1 } : { scale: 1 }}
                              transition={{ duration: 0.1 }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </motion.svg>
                            Add Task
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Modern Task List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </motion.div>
                    <div>
                      <CardTitle>Your Tasks</CardTitle>
                      <CardDescription>
                        {tasks.filter(t => t.status === 'pending').length} pending • {tasks.filter(t => t.status === 'completed').length} completed • Sorted by {sort.field === 'due_date' ? 'due date' : sort.field === 'created_at' ? 'created date' : sort.field === 'estimatedDuration' ? 'estimated duration' : sort.field} ({sort.direction === 'asc' ? 'ascending' : 'descending'})
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search Section */}
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search tasks by title, category, or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Filter Section */}
                <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <select 
                      value={filter.status} 
                      onChange={(e) => setFilter({ status: e.target.value as any })}
                      className="px-3 py-1 text-sm border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700"
                    >
                      <option value="all">All Tasks</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                    
                    <select 
                      value={filter.priority} 
                      onChange={(e) => setFilter({ priority: e.target.value as any })}
                      className="px-3 py-1 text-sm border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700"
                    >
                      <option value="all">All Priorities</option>
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                    
                            <select 
                              value={sort.field} 
                              onChange={(e) => setSort({ ...sort, field: e.target.value as any })}
                              className="px-3 py-1 text-sm border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700"
                            >
                              <option value="due_date">Sort by Due Date</option>
                              <option value="priority">Sort by Priority</option>
                              <option value="created_at">Sort by Created</option>
                            </select>
                    
                    <button
                      onClick={() => setSort({ ...sort, direction: sort.direction === 'asc' ? 'desc' : 'asc' })}
                      className="px-3 py-1 text-sm border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600"
                    >
                      {sort.direction === 'asc' ? '↑' : '↓'}
                    </button>
                  </div>
                </div>
                
                <AnimatePresence>
                  {filteredTasks.length === 0 ? (
                    <motion.div 
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <motion.div 
                        className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </motion.div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No tasks yet</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-6">Add your first task above to get started!</p>
                      <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 max-w-md mx-auto border border-gray-200 dark:border-slate-600">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Try these examples:</p>
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                          <p>💡 "Call mom this weekend"</p>
                          <p>💡 "Finish project report by Friday"</p>
                          <p>💡 "Buy birthday gift for Sarah"</p>
                          <p>💡 "Exercise at the gym tomorrow"</p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                        {filteredTasks.map((task, index) => (
                          <motion.div
                            key={`${task.id}-${task.status}`}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ 
                              duration: 0.3, 
                              delay: index * 0.1,
                              type: "spring",
                              stiffness: 300
                            }}
                            whileHover={{ scale: 1.02 }}
                            className={`bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-2xl p-6 transition-all duration-200 hover:shadow-md ${
                              task.status === 'completed' 
                                ? 'opacity-60 bg-gray-50 dark:bg-slate-900' 
                                : 'hover:border-gray-300 dark:hover:border-slate-500'
                            }`}
                          >
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start gap-3 sm:gap-4 mb-3">
                                      <div className="flex items-center flex-shrink-0">
                                        <input
                                          type="checkbox"
                                          checked={task.status === 'completed'}
                                          onChange={() => toggleTask(task.id)}
                                          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-lg transition-colors"
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h3 className={`text-base sm:text-lg font-medium leading-6 break-words mobile-heading ${task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
                                          {task.title}
                                        </h3>
                                      </div>
                                      <button
                                        onClick={() => setExpandedTask(expandedTaskId === task.id ? null : task.id)}
                                        className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                      >
                                        <svg 
                                          className={`w-4 h-4 transition-transform duration-200 ${expandedTaskId === task.id ? 'rotate-180' : ''}`}
                                          fill="none" 
                                          stroke="currentColor" 
                                          viewBox="0 0 24 24"
                                        >
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                      </button>
                                    </div>
                                
                                {/* Collapsible Content */}
                                {expandedTaskId === task.id && (
                                  <div className="ml-0 sm:ml-9 mb-4">
                                    {/* AI Analysis Section */}
                                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700/50 dark:to-slate-600/50 rounded-xl p-4 border border-blue-100 dark:border-slate-600">
                                      <div className="flex items-center mb-4">
                                        <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
                                        </svg>
                                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">AI Analysis</span>
                                      </div>
                                    
                                      {/* Quick Stats Row */}
                                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4 mobile-grid">
                                      {task.estimatedDuration && (
                                        <div className="flex items-center space-x-2">
                                          <span className="text-gray-500">⏱️</span>
                                          <span className="text-gray-700 dark:text-gray-300 text-xs">{task.estimatedDuration}</span>
                                        </div>
                                      )}
                                      
                                      
                                      {task.complexity && task.complexity !== 'moderate' && (
                                        <div className="flex items-center space-x-2">
                                          <span className="text-gray-500">🧩</span>
                                          <span className="text-gray-700 dark:text-gray-300 text-xs capitalize">{task.complexity}</span>
                                        </div>
                                      )}
                                      
                                      {task.energyLevel && task.energyLevel !== 'medium' && (
                                        <div className="flex items-center space-x-2">
                                          <span className="text-gray-500">🔋</span>
                                          <span className="text-gray-700 dark:text-gray-300 text-xs capitalize">{task.energyLevel} energy</span>
                                        </div>
                                      )}
                                      
                                      {task.timeSensitivity && task.timeSensitivity !== 'flexible' && (
                                        <div className="flex items-center space-x-2">
                                          <span className="text-gray-500">⏰</span>
                                          <span className="text-gray-700 dark:text-gray-300 text-xs capitalize">{task.timeSensitivity}</span>
                                        </div>
                                      )}
                                      
                                      {task.socialContext && task.socialContext !== 'solo' && (
                                        <div className="flex items-center space-x-2">
                                          <span className="text-gray-500">👥</span>
                                          <span className="text-gray-700 dark:text-gray-300 text-xs capitalize">{task.socialContext}</span>
                                        </div>
                                      )}
                                      
                                      {task.toolsNeeded && task.toolsNeeded.length > 0 && (
                                        <div className="flex items-center space-x-2">
                                          <span className="text-gray-500">🔧</span>
                                          <span className="text-gray-700 dark:text-gray-300 text-xs">{task.toolsNeeded.slice(0, 2).join(', ')}</span>
                                        </div>
                                      )}
                                    </div>
                                    
                                    {/* Detailed Context Section */}
                                    <div className="space-y-3">
                                      {task.emotionalContext && (
                                        <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3 border mobile-padding border-gray-200 dark:border-slate-600">
                                          <div className="flex items-start space-x-2">
                                            <span className="text-gray-500 text-sm flex-shrink-0 mt-0.5">😊</span>
                                            <div className="flex-1 min-w-0 overflow-hidden">
                                              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Emotional Context</p>
                                              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed break-words hyphens-auto mobile-text">
                                                {task.emotionalContext}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      
                                      {task.context && (
                                        <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3 border mobile-padding border-gray-200 dark:border-slate-600">
                                          <div className="flex items-start space-x-2">
                                            <span className="text-gray-500 text-sm flex-shrink-0">📍</span>
                                            <div className="flex-1 min-w-0 overflow-hidden">
                                              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Context</p>
                                              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed break-words hyphens-auto mobile-text">
                                                {task.context}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      
                                      {task.locationContext && (
                                        <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3 border mobile-padding border-gray-200 dark:border-slate-600">
                                          <div className="flex items-start space-x-2">
                                            <span className="text-gray-500 text-sm flex-shrink-0">🏠</span>
                                            <div className="flex-1 min-w-0 overflow-hidden">
                                              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Location</p>
                                              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed break-words hyphens-auto mobile-text">
                                                {task.locationContext}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      
                                      {task.blockers && task.blockers.length > 0 && (
                                        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border mobile-padding border-red-200 dark:border-red-800">
                                          <div className="flex items-start space-x-2">
                                            <span className="text-red-500 text-sm flex-shrink-0">⚠️</span>
                                            <div className="flex-1 min-w-0 overflow-hidden">
                                              <p className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">Potential Blockers</p>
                                              <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                                                {task.blockers.map((blocker: string, index: number) => (
                                                  <li key={index} className="leading-relaxed break-words hyphens-auto mobile-text">• {blocker}</li>
                                                ))}
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      
                                      {task.successCriteria && task.successCriteria.length > 0 && (
                                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border mobile-padding border-green-200 dark:border-green-800">
                                          <div className="flex items-start space-x-2">
                                            <span className="text-green-500 text-sm flex-shrink-0">✅</span>
                                            <div className="flex-1 min-w-0 overflow-hidden">
                                              <p className="text-xs font-medium text-green-600 dark:text-green-400 mb-1">Success Criteria</p>
                                              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                                                {task.successCriteria.map((criteria: string, index: number) => (
                                                  <li key={index} className="leading-relaxed break-words hyphens-auto mobile-text">• {criteria}</li>
                                                ))}
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    
                                    {task.tags && task.tags.length > 0 && (
                                      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-slate-600">
                                        <div className="flex items-center space-x-2 flex-wrap gap-2">
                                          <span className="text-xs text-gray-500">🏷️</span>
                                          {task.tags.map((tag: string, tagIndex: number) => (
                                            <span key={tagIndex} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                                              {tag}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                
                                <div className="flex items-center gap-2 ml-0 sm:ml-9 mt-3 flex-wrap">
                                  <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'secondary' : 'outline'}>
                                    {task.priority} priority
                                  </Badge>
                                  
                                  {task.category && (
                                    <Badge variant="outline">
                                      {task.category}
                                    </Badge>
                                  )}
                                  
                                  {task.due_date && (
                                    <Badge variant="outline">
                                      📅 {new Date(task.due_date).toLocaleDateString()}
                                    </Badge>
                                  )}
                                  
                                  {task.estimatedDuration && (
                                    <Badge variant="outline">
                                      ⏱️ {task.estimatedDuration}
                                    </Badge>
                                  )}
                                </div>
                                
                                {task.suggestedActions && task.suggestedActions.length > 0 && (
                                  <div className="ml-9 mt-3">
                                    <p className="text-xs text-gray-600 mb-1">📋 Suggested Actions:</p>
                                    <ul className="text-xs text-gray-500 space-y-1">
                                      {task.suggestedActions.map((action: string, actionIndex: number) => (
                                        <li key={actionIndex} className="flex items-center">
                                          <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                                          {action}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                
                              </div>
                                )}
                              
                              </div>
                              <Button
                                onClick={() => deleteTask(task.id)}
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
      
      {/* Floating Theme Toggle */}
      <FloatingThemeToggle />
      
      {/* Task Limit Modal */}
      <TaskLimitModal
        isOpen={isTaskLimitModalOpen}
        onClose={() => setTaskLimitModalOpen(false)}
        maxTasks={maxTasksAllowed}
        currentTasks={tasks.length}
      />

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © 2024 AI Task Manager. Demo application under MIT License.
            </div>
            <div className="flex space-x-6">
              <a 
                href="/privacy" 
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms" 
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
