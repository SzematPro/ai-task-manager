'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TaskItem } from './task-item'
import { TaskFilters } from './task-filters'
import { TaskStats } from './task-stats'
import { useTaskStore } from '@/hooks/use-task-store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, AlertCircle } from 'lucide-react'

export function TaskList() {
  const { tasks, getFilteredTasks, getTaskStats } = useTaskStore()
  const [filters, setFilters] = useState<{
    status?: 'pending' | 'in_progress' | 'completed'
    priority?: 'low' | 'medium' | 'high'
  }>({})

  const filteredTasks = getFilteredTasks(filters)
  const stats = getTaskStats()

  const groupedTasks = {
    pending: filteredTasks.filter(task => task.status === 'pending'),
    inProgress: filteredTasks.filter(task => task.status === 'in_progress'),
    completed: filteredTasks.filter(task => task.status === 'completed'),
  }

  if (tasks.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="h-16 w-16 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              No tasks yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Start by adding your first task using natural language above
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <TaskStats stats={stats} />
      
      <TaskFilters 
        filters={filters} 
        onFiltersChange={setFilters}
      />

      <div className="grid gap-6">
        {Object.entries(groupedTasks).map(([status, tasks]) => {
          if (tasks.length === 0) return null

          const statusConfig = {
            pending: { 
              title: 'Pending', 
              icon: Clock, 
              color: 'text-yellow-600',
              bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
            },
            inProgress: { 
              title: 'In Progress', 
              icon: AlertCircle, 
              color: 'text-blue-600',
              bgColor: 'bg-blue-50 dark:bg-blue-900/20'
            },
            completed: { 
              title: 'Completed', 
              icon: CheckCircle, 
              color: 'text-green-600',
              bgColor: 'bg-green-50 dark:bg-green-900/20'
            },
          }

          const config = statusConfig[status as keyof typeof statusConfig]
          const Icon = config.icon

          return (
            <Card key={status} className="overflow-hidden">
              <CardHeader className={`${config.bgColor} border-b`}>
                <CardTitle className="flex items-center space-x-2">
                  <Icon className={`h-5 w-5 ${config.color}`} />
                  <span>{config.title}</span>
                  <Badge variant="secondary">{tasks.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <AnimatePresence>
                    {tasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <TaskItem task={task} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
