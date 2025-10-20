import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

export type Database = {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          due_date: string | null
          priority: 'low' | 'medium' | 'high'
          status: 'pending' | 'in_progress' | 'completed'
          category: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          due_date?: string | null
          priority?: 'low' | 'medium' | 'high'
          status?: 'pending' | 'in_progress' | 'completed'
          category?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          due_date?: string | null
          priority?: 'low' | 'medium' | 'high'
          status?: 'pending' | 'in_progress' | 'completed'
          category?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
