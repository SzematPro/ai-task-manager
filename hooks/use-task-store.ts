import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

export interface Task {
  id: string
  title: string
  status: 'pending' | 'completed'
  priority: 'low' | 'medium' | 'high'
  category: string
  due_date: string | null
  urgency: number
  importance: number
  complexity: 'simple' | 'moderate' | 'complex'
  tags: string[]
  estimatedDuration: string | null
  subtasks: string[]
  context: string | null
  suggestedActions: string[]
  confidence: number
  timeSensitivity: 'flexible' | 'soon' | 'urgent'
  emotionalContext: string | null
  workContext: 'personal' | 'professional'
  energyLevel: 'low' | 'medium' | 'high'
  socialContext: 'solo' | 'collaborative' | 'team'
  locationContext: string | null
  toolsNeeded: string[]
  blockers: string[]
  successCriteria: string[]
  created_at: string
  updated_at: string
  user_id: string
}

export interface TaskFilter {
  status?: 'pending' | 'completed' | 'all'
  priority?: 'low' | 'medium' | 'high' | 'all'
  category?: string | 'all'
}

export interface TaskSort {
  field: 'due_date' | 'priority' | 'urgency' | 'created_at' | 'estimatedDuration'
  direction: 'asc' | 'desc'
}

interface TaskStore {
  tasks: Task[]
  filteredTasks: Task[]
  loading: boolean
  isProcessing: boolean
  user: any
  supabaseConfigured: boolean
  filter: TaskFilter
  sort: TaskSort
  searchQuery: string
  expandedTaskId: string | null
  
  // Task limiting
  isTaskLimitModalOpen: boolean
  maxTasksAllowed: number
  isTaskLimitEnabled: boolean
  
  // Actions
  addTask: (input: string) => Promise<void>
  toggleTask: (id: string) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  fetchTasks: (userId: string) => Promise<void>
  setUser: (user: any) => void
  setLoading: (loading: boolean) => void
  setIsProcessing: (processing: boolean) => void
  setTasks: (tasks: Task[]) => void
  setSupabaseConfigured: (configured: boolean) => void
  setFilter: (filter: Partial<TaskFilter>) => void
  setSort: (sort: TaskSort) => void
  setSearchQuery: (query: string) => void
  setExpandedTask: (taskId: string | null) => void
  applyFiltersAndSort: () => void
  
  // Task limit actions
  setTaskLimitModalOpen: (open: boolean) => void
  checkTaskLimit: () => boolean
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  filteredTasks: [],
  loading: false,
  isProcessing: false,
  user: null,
  supabaseConfigured: true,
  filter: {
    status: 'all',
    priority: 'all',
    category: 'all'
  },
  sort: {
    field: 'due_date',
    direction: 'asc'
  },
  searchQuery: '',
  expandedTaskId: null,
  
  // Task limiting
  isTaskLimitModalOpen: false,
  maxTasksAllowed: parseInt(process.env.NEXT_PUBLIC_MAX_TASKS_PER_USER || '5'),
  isTaskLimitEnabled: process.env.NEXT_PUBLIC_ENABLE_TASK_LIMIT === 'true',

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setIsProcessing: (processing) => set({ isProcessing: processing }),
  setTasks: (tasks) => {
    set({ tasks })
    get().applyFiltersAndSort()
  },
  setSupabaseConfigured: (configured) => set({ supabaseConfigured: configured }),
  setFilter: (filter) => {
    set(state => ({ filter: { ...state.filter, ...filter } }))
    get().applyFiltersAndSort()
  },
  setSort: (sort) => {
    set({ sort })
    get().applyFiltersAndSort()
  },
  setSearchQuery: (query) => {
    set({ searchQuery: query })
    get().applyFiltersAndSort()
  },
  setExpandedTask: (taskId) => {
    set({ expandedTaskId: taskId })
  },

  addTask: async (input: string) => {
    set({ isProcessing: true })
    
    try {
      // Check task limit if enabled
      const state = get()
      if (state.isTaskLimitEnabled && state.tasks.length >= state.maxTasksAllowed) {
        set({ 
          isTaskLimitModalOpen: true,
          isProcessing: false 
        })
        return
      }
      
      // Get current date from user's browser
      const currentDate = new Date().toISOString().split('T')[0]
      
      // Process task on server-side to access environment variables
      const response = await fetch('/api/process-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input, currentDate }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to process task')
      }
      
      const result = await response.json()
      
      if (!result.success) {
        throw new Error('Task processing failed')
      }
      
      const newTask: Task = {
        id: Date.now().toString(),
        title: result.professionalTitle, // Use professional title for database storage
        status: 'pending',
        priority: result.analysis.priority,
        category: result.analysis.category,
        due_date: result.analysis.due_date,
        urgency: result.analysis.urgency,
        importance: result.analysis.importance,
        complexity: result.analysis.complexity,
        tags: result.analysis.tags,
        estimatedDuration: result.analysis.estimatedDuration,
        subtasks: result.analysis.subtasks,
        context: result.analysis.context,
        suggestedActions: result.analysis.suggestedActions,
        confidence: result.analysis.confidence,
        timeSensitivity: result.analysis.timeSensitivity,
        emotionalContext: result.analysis.emotionalContext,
        workContext: result.analysis.workContext,
        energyLevel: result.analysis.energyLevel,
        socialContext: result.analysis.socialContext,
        locationContext: result.analysis.locationContext,
        toolsNeeded: result.analysis.toolsNeeded,
        blockers: result.analysis.blockers,
        successCriteria: result.analysis.successCriteria,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: get().user?.id || 'anonymous',
      }

      // Try to save to database
      try {
        if (!supabase) {
          throw new Error('Supabase not configured')
        }
        
        const { data, error } = await supabase
          .from('tasks')
          .insert([{
            title: newTask.title,
            status: newTask.status,
            priority: newTask.priority,
            category: newTask.category,
            due_date: newTask.due_date,
            user_id: newTask.user_id,
            description: JSON.stringify({
              // AI Analysis
              urgency: newTask.urgency,
              importance: newTask.importance,
              complexity: newTask.complexity,
              tags: newTask.tags,
              estimatedDuration: newTask.estimatedDuration,
              subtasks: newTask.subtasks,
              context: newTask.context,
              suggestedActions: newTask.suggestedActions,
              confidence: newTask.confidence,
              timeSensitivity: newTask.timeSensitivity,
              emotionalContext: newTask.emotionalContext,
              workContext: newTask.workContext,
              energyLevel: newTask.energyLevel,
              socialContext: newTask.socialContext,
              locationContext: newTask.locationContext,
              toolsNeeded: newTask.toolsNeeded,
              blockers: newTask.blockers,
              successCriteria: newTask.successCriteria,
              // Multilingual processing info
              originalText: result.originalText,
              translatedText: result.translatedText,
              sourceLanguage: result.sourceLanguage,
              wasTranslated: result.wasTranslated,
              translationConfidence: result.translationConfidence,
            }),
          }])
          .select()
          .single()

        if (error) throw error
        
        // Update task with database ID
        newTask.id = data.id
        newTask.created_at = data.created_at
        newTask.updated_at = data.updated_at
      } catch (error) {
        console.error('Database error:', error)
        // Continue with local storage fallback
      }

      // Add to local state
      set(state => ({ 
        tasks: [...state.tasks, newTask],
        isProcessing: false 
      }))
      
      // Apply filters and sort after adding new task
      get().applyFiltersAndSort()
    } catch (error) {
      console.error('Error adding task:', error)
      set({ isProcessing: false })
    }
  },

  toggleTask: async (id: string) => {
    const task = get().tasks.find(t => t.id === id)
    if (!task) return

    const newStatus = task.status === 'pending' ? 'completed' : 'pending'
    
    try {
      if (!supabase) {
        throw new Error('Supabase not configured')
      }
      
      // Update in database
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Database error:', error)
    }

    // Update local state
    set(state => ({
      tasks: state.tasks.map(t => 
        t.id === id ? { ...t, status: newStatus, updated_at: new Date().toISOString() } : t
      )
    }))
    
    // Apply filters and sort after status change
    get().applyFiltersAndSort()
  },

  deleteTask: async (id: string) => {
    try {
      if (!supabase) {
        throw new Error('Supabase not configured')
      }
      
      // Delete from database
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (error) {
      console.error('Database error:', error)
    }

    // Update local state
    set(state => ({
      tasks: state.tasks.filter(t => t.id !== id)
    }))
    
    // Apply filters and sort after deletion
    get().applyFiltersAndSort()
  },

  fetchTasks: async (userId: string) => {
    set({ loading: true })
    
    try {
      if (!supabase) {
        throw new Error('Supabase not configured')
      }
      
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Parse AI analysis from description field
      const tasks = data.map((task: any) => {
        let aiAnalysis = {}
        try {
          aiAnalysis = JSON.parse(task.description || '{}')
        } catch (e) {
          console.error('Error parsing AI analysis:', e)
        }

        return {
          id: task.id,
          title: task.title,
          status: task.status,
          priority: task.priority,
          category: task.category,
          due_date: task.due_date,
          created_at: task.created_at,
          updated_at: task.updated_at,
          user_id: task.user_id,
          ...aiAnalysis,
        } as Task
      })

      set({ tasks, loading: false })
      get().applyFiltersAndSort()
    } catch (error) {
      console.error('Error fetching tasks:', error)
      set({ loading: false })
    }
  },

  applyFiltersAndSort: () => {
    const { tasks, filter, sort, searchQuery } = get()
    
    // Apply filters
    let filtered = tasks.filter(task => {
      // Search filter - search in title, category, and tags
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const titleMatch = task.title.toLowerCase().includes(query)
        const categoryMatch = task.category.toLowerCase().includes(query)
        const tagsMatch = task.tags.some(tag => tag.toLowerCase().includes(query))
        
        if (!titleMatch && !categoryMatch && !tagsMatch) {
          return false
        }
      }
      // Status filter
      if (filter.status !== 'all' && task.status !== filter.status) {
        return false
      }
      
      // Priority filter
      if (filter.priority !== 'all' && task.priority !== filter.priority) {
        return false
      }
      
      
      // Category filter
      if (filter.category !== 'all' && task.category !== filter.category) {
        return false
      }
      
      return true
    })
    
    // Apply sorting
    filtered.sort((a, b) => {
      // First, move completed tasks to the end
      if (a.status !== b.status) {
        return a.status === 'completed' ? 1 : -1
      }
      
      // Then sort by the specified field
      let aValue: any, bValue: any
      
      switch (sort.field) {
        case 'due_date':
          aValue = a.due_date ? new Date(a.due_date).getTime() : Infinity
          bValue = b.due_date ? new Date(b.due_date).getTime() : Infinity
          break
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          aValue = priorityOrder[a.priority]
          bValue = priorityOrder[b.priority]
          break
        case 'urgency':
          aValue = a.urgency
          bValue = b.urgency
          break
        case 'created_at':
          aValue = new Date(a.created_at).getTime()
          bValue = new Date(b.created_at).getTime()
          break
        case 'estimatedDuration':
          // Parse duration for sorting
          const parseDuration = (duration: string | null) => {
            if (!duration) return 0
            if (duration.includes('minute')) return 1
            if (duration.includes('hour')) return 2
            if (duration.includes('day')) return 3
            return 0
          }
          aValue = parseDuration(a.estimatedDuration)
          bValue = parseDuration(b.estimatedDuration)
          break
        default:
          return 0
      }
      
      if (sort.direction === 'asc') {
        return aValue - bValue
      } else {
        return bValue - aValue
      }
    })
    
    set({ filteredTasks: filtered })
  },
  
  // Task limit actions
  setTaskLimitModalOpen: (open) => set({ isTaskLimitModalOpen: open }),
  checkTaskLimit: () => {
    const state = get()
    return state.isTaskLimitEnabled && state.tasks.length >= state.maxTasksAllowed
  },
}))