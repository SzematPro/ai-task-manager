export interface Task {
  id: string
  userId: string
  title: string
  description?: string
  dueDate?: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'in_progress' | 'completed'
  category?: string
  createdAt: string
  updatedAt: string
}

export interface CreateTaskInput {
  title: string
  description?: string
  dueDate?: string
  priority: 'low' | 'medium' | 'high'
  category?: string
}

export interface UpdateTaskInput {
  title?: string
  description?: string
  dueDate?: string
  priority?: 'low' | 'medium' | 'high'
  status?: 'pending' | 'in_progress' | 'completed'
  category?: string
}

export interface TaskFilters {
  status?: 'pending' | 'in_progress' | 'completed'
  priority?: 'low' | 'medium' | 'high'
  category?: string
  dueDate?: {
    from?: string
    to?: string
  }
}

export interface TaskStats {
  total: number
  pending: number
  inProgress: number
  completed: number
  overdue: number
}
