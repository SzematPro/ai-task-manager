'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, AlertCircle, AlertTriangle } from 'lucide-react'

interface TaskStatsProps {
  stats: {
    total: number
    pending: number
    inProgress: number
    completed: number
    overdue: number
  }
}

export function TaskStats({ stats }: TaskStatsProps) {
  const statItems = [
    {
      label: 'Total',
      value: stats.total,
      icon: CheckCircle,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100 dark:bg-gray-800'
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20'
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      icon: AlertCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/20'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {statItems.map((item, index) => {
        const Icon = item.icon
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${item.bgColor}`}>
                    <Icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.value}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {item.label}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
