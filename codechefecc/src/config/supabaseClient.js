import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://rfzescvrapwdcfpuunxf.supabase.co"//process.env.SUPABASE_URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmemVzY3ZyYXB3ZGNmcHV1bnhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5NzQwODAsImV4cCI6MjAwMzU1MDA4MH0.fKK2OZMxIg9oQa_xep85whNItYtEdXAIlfdM6ECooOM"//process.env.SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase