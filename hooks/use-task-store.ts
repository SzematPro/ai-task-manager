'use client'

import { create } from 'zustand'
import { Task, CreateTaskInput, UpdateTaskInput, TaskFilters } from '@/types/task'
import { supabase } from '@/lib/supabase'
import { processNaturalLanguageTask } from '@/lib/openai'
import toast from 'react-hot-toast'

interface TaskStore {
  tasks: Task[]
  loading: boolean
  error: string | null
  fetchTasks: () => Promise<void>
  createTask: (input: CreateTaskInput) => Promise<void>
  createTaskFromNaturalLanguage: (input: string) => Promise<void>
  updateTask: (id: string, input: UpdateTaskInput) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  toggleTaskStatus: (id: string) => Promise<void>
  getFilteredTasks: (filters?: TaskFilters) => Task[]
  getTaskStats: () => {
    total: number
    pending: number
    inProgress: number
    completed: number
    overdue: number
  }
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null })
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      set({ tasks: data || [], loading: false })
    } catch (error) {
      console.error('Error fetching tasks:', error)
      set({ error: error instanceof Error ? error.message : 'Failed to fetch tasks', loading: false })
      toast.error('Failed to fetch tasks')
    }
  },

  createTask: async (input: CreateTaskInput) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('tasks')
        .insert({
          user_id: user.id,
          title: input.title,
          description: input.description,
          due_date: input.dueDate,
          priority: input.priority,
          category: input.category,
          status: 'pending',
        })
        .select()
        .single()

      if (error) throw error

      set((state) => ({
        tasks: [data, ...state.tasks]
      }))

      toast.success('Task created successfully')
    } catch (error) {
      console.error('Error creating task:', error)
      toast.error('Failed to create task')
    }
  },

  createTaskFromNaturalLanguage: async (input: string) => {
    try {
      set({ loading: true })
      
      // Process with OpenAI
      const processedTask = await processNaturalLanguageTask(input)
      
      // Create task with processed data
      await get().createTask(processedTask)
      
      set({ loading: false })
    } catch (error) {
      console.error('Error processing natural language task:', error)
      set({ loading: false })
      toast.error('Failed to process task')
    }
  },

  updateTask: async (id: string, input: UpdateTaskInput) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({
          ...input,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...data } : task
        )
      }))

      toast.success('Task updated successfully')
    } catch (error) {
      console.error('Error updating task:', error)
      toast.error('Failed to update task')
    }
  },

  deleteTask: async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      if (error) throw error

      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id)
      }))

      toast.success('Task deleted successfully')
    } catch (error) {
      console.error('Error deleting task:', error)
      toast.error('Failed to delete task')
    }
  },

  toggleTaskStatus: async (id: string) => {
    const task = get().tasks.find((t) => t.id === id)
    if (!task) return

    const newStatus = task.status === 'completed' ? 'pending' : 'completed'
    await get().updateTask(id, { status: newStatus })
  },

  getFilteredTasks: (filters?: TaskFilters) => {
    const { tasks } = get()
    
    if (!filters) return tasks

    return tasks.filter((task) => {
      if (filters.status && task.status !== filters.status) return false
      if (filters.priority && task.priority !== filters.priority) return false
      if (filters.category && task.category !== filters.category) return false
      
      if (filters.dueDate) {
        if (filters.dueDate.from && task.dueDate && task.dueDate < filters.dueDate.from) return false
        if (filters.dueDate.to && task.dueDate && task.dueDate > filters.dueDate.to) return false
      }
      
      return true
    })
  },

  getTaskStats: () => {
    const { tasks } = get()
    const now = new Date().toISOString()
    
    return {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      inProgress: tasks.filter(t => t.status === 'in_progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      overdue: tasks.filter(t => 
        t.status !== 'completed' && 
        t.dueDate && 
        t.dueDate < now
      ).length,
    }
  },
}))
