'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TaskInput } from '@/components/task-input'
import { TaskList } from '@/components/task-list'
import { Header } from '@/components/header'
import { useTaskStore } from '@/hooks/use-task-store'
import { useAuth } from '@/hooks/use-auth'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function Home() {
  const { user, loading: authLoading } = useAuth()
  const { tasks, loading: tasksLoading, fetchTasks } = useTaskStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (user && mounted) {
      fetchTasks()
    }
  }, [user, mounted, fetchTasks])

  if (!mounted || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 p-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            AI Task Manager
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
            Transform your natural language into structured tasks with the power of AI
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Please sign in to get started
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              AI Task Manager
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Type your tasks in natural language and let AI structure them for you
            </p>
          </div>

          <TaskInput />
          
          {tasksLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : (
            <TaskList />
          )}
        </motion.div>
      </main>
    </div>
  )
}
