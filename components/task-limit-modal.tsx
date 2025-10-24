'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface TaskLimitModalProps {
  isOpen: boolean
  onClose: () => void
  maxTasks: number
  currentTasks: number
}

export function TaskLimitModal({ isOpen, onClose, maxTasks, currentTasks }: TaskLimitModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full bg-white dark:bg-gray-900 border-2 border-orange-200 dark:border-orange-800 shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Demo Mode Active
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              You've reached the task limit for this demo
            </p>
          </div>

          {/* Content */}
          <div className="space-y-4 mb-6">
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                  Current Tasks
                </span>
                <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                  {currentTasks} / {maxTasks}
                </Badge>
              </div>
              <div className="w-full bg-orange-200 dark:bg-orange-800 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentTasks / maxTasks) * 100}%` }}
                />
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                This is a <strong>demo version</strong> with limited functionality
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Task limit is set to <strong>{maxTasks} tasks</strong> per user
              </p>
            </div>

            {/* Features that are limited */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Demo Limitations:
              </h3>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Maximum {maxTasks} tasks per user</li>
                <li>• Advanced AI features may be limited</li>
                <li>• Data persistence is temporary</li>
                <li>• Some features require full version</li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center">
            <Button
              onClick={onClose}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2"
            >
              Got it, Continue Demo
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              To remove limitations, contact us at{' '}
              <a 
                href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@example.com'}?subject=Upgrade to Full Version - AI Task Manager&body=Hi there,%0A%0AI'm interested in upgrading to the full version of AI Task Manager. I've been using the demo and would like to remove the task limitations.%0A%0ACurrent usage: ${currentTasks}/${maxTasks} tasks%0A%0APlease let me know about:%0A- Pricing options%0A- Feature differences%0A- How to get started%0A%0AThank you!`}
                className="font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline"
              >
                {process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@example.com'}
              </a>{' '}
              for a full version license
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
