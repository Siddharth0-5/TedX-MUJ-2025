import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Registration = {
  id?: string
  full_name: string
  mobile: string
  email: string
  registration_number: string
  transaction_id: string
  payment_proof_url: string
  accept_terms: boolean
  created_at?: string
  updated_at?: string
}
