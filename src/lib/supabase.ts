// This file connects your Next.js app to Supabase
// Think of it as the "bridge" between your app and the database

import { createClient } from '@supabase/supabase-js'

// Get the Supabase URL and API key from .env.local
// These are like your "keys to the database"
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

// Create the Supabase client
// This is what you'll use to read and write data
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 🔒 IMPORTANT: These are "public" credentials
// They only allow users to access their own data (Row Level Security)
// Don't worry about security—Supabase handles it!
