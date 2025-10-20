'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useTaskStore } from '@/hooks/use-task-store'
import { Send, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

export function TaskInput() {
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const { createTaskFromNaturalLanguage } = useTaskStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    setIsProcessing(true)
    try {
      await createTaskFromNaturalLanguage(input.trim())
      setInput('')
    } catch (error) {
      console.error('Error creating task:', error)
      toast.error('Failed to create task')
    } finally {
      setIsProcessing(false)
    }
  }

  const examplePrompts = [
    "Remind me to email Ana tomorrow",
    "Schedule a dentist appointment next week",
    "Buy groceries this weekend",
    "Finish the quarterly report by Friday",
    "Call mom this evening"
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add a new task
            </h2>
          </div>
          
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your task in natural language..."
              className="flex-1"
              disabled={isProcessing}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isProcessing}
              className="px-6"
            >
              {isProcessing ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Try these examples:
          </p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((prompt, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setInput(prompt)}
                className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {prompt}
              </motion.button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
