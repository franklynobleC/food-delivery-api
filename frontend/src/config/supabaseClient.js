import { createClient } from '@supabase/supabase-js'

export const supabaseClient = createClient(
  'https://oyhwveyxgvipsnwmlkrj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95aHd2ZXl4Z3ZpcHNud21sa3JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwNzA0NjYsImV4cCI6MjAyNTY0NjQ2Nn0.uOEoxELi3H0OQESSwMV32akWfpuvVfFMN_0JE0Gxbms'
)
