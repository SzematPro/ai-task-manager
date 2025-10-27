import { lazy, Suspense } from 'react'

// Lazy load heavy components
const TaskLimitModal = lazy(() => import('@/components/task-limit-modal').then(module => ({ default: module.TaskLimitModal })))

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
  </div>
)

// Optimized TaskLimitModal wrapper
export const OptimizedTaskLimitModal = (props: any) => (
  <Suspense fallback={<LoadingFallback />}>
    <TaskLimitModal {...props} />
  </Suspense>
)
