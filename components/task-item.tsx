'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Task } from '@/types/task'
import { useTaskStore } from '@/hooks/use-task-store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  CheckCircle, 
  Circle, 
  Edit3, 
  Trash2, 
  Calendar, 
  Tag,
  Clock,
  AlertTriangle
} from 'lucide-react'
import { formatDate, getRelativeTime } from '@/lib/utils'
import toast from 'react-hot-toast'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const { updateTask, deleteTask, toggleTaskStatus } = useTaskStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [isHovered, setIsHovered] = useState(false)

  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    high: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
  }

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed'

  const handleSave = async () => {
    if (editTitle.trim() === task.title) {
      setIsEditing(false)
      return
    }

    try {
      await updateTask(task.id, { title: editTitle.trim() })
      setIsEditing(false)
    } catch (error) {
      toast.error('Failed to update task')
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task.id)
      } catch (error) {
        toast.error('Failed to delete task')
      }
    }
  }

  const handleToggleStatus = async () => {
    try {
      await toggleTaskStatus(task.id)
    } catch (error) {
      toast.error('Failed to update task status')
    }
  }

  return (
    <Card 
      className={`transition-all duration-200 hover:shadow-md ${
        isOverdue ? 'border-red-200 dark:border-red-800' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleStatus}
            className="mt-1 h-6 w-6 p-0"
          >
            {task.status === 'completed' ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </Button>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="flex-1 px-2 py-1 border rounded text-sm"
                  autoFocus
                  onBlur={handleSave}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave()
                    if (e.key === 'Escape') {
                      setEditTitle(task.title)
                      setIsEditing(false)
                    }
                  }}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 
                    className={`text-sm font-medium ${
                      task.status === 'completed' 
                        ? 'line-through text-gray-500' 
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {task.title}
                  </h3>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="flex items-center space-x-1"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsEditing(true)}
                      className="h-6 w-6 p-0"
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleDelete}
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </motion.div>
                </div>

                {task.description && (
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {task.description}
                  </p>
                )}

                <div className="flex items-center space-x-2 flex-wrap">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${priorityColors[task.priority]}`}
                  >
                    {task.priority}
                  </Badge>

                  {task.category && (
                    <Badge variant="outline" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {task.category}
                    </Badge>
                  )}

                  {task.dueDate && (
                    <div className={`flex items-center space-x-1 text-xs ${
                      isOverdue ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      <Calendar className="h-3 w-3" />
                      <span>
                        {isOverdue && <AlertTriangle className="h-3 w-3 inline mr-1" />}
                        {getRelativeTime(new Date(task.dueDate))}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{getRelativeTime(new Date(task.createdAt))}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
