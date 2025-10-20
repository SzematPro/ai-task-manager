'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Filter, X } from 'lucide-react'

interface TaskFiltersProps {
  filters: {
    status?: 'pending' | 'in_progress' | 'completed'
    priority?: 'low' | 'medium' | 'high'
  }
  onFiltersChange: (filters: {
    status?: 'pending' | 'in_progress' | 'completed'
    priority?: 'low' | 'medium' | 'high'
  }) => void
}

export function TaskFilters({ filters, onFiltersChange }: TaskFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' },
    { value: 'in_progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
  ]

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' },
  ]

  const handleStatusFilter = (status: 'pending' | 'in_progress' | 'completed') => {
    onFiltersChange({
      ...filters,
      status: filters.status === status ? undefined : status
    })
  }

  const handlePriorityFilter = (priority: 'low' | 'medium' | 'high') => {
    onFiltersChange({
      ...filters,
      priority: filters.priority === priority ? undefined : priority
    })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  const hasActiveFilters = filters.status || filters.priority

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Filters
            </span>
            {hasActiveFilters && (
              <Badge variant="secondary" className="text-xs">
                {Object.values(filters).filter(Boolean).length} active
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-xs"
            >
              {isOpen ? 'Hide' : 'Show'} Options
            </Button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-4"
          >
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Status
              </h4>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={filters.status === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleStatusFilter(option.value as any)}
                    className="text-xs"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Priority
              </h4>
              <div className="flex flex-wrap gap-2">
                {priorityOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={filters.priority === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePriorityFilter(option.value as any)}
                    className="text-xs"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
