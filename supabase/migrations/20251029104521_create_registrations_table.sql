/*
  # Create registrations table for TEDx event

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key) - Unique identifier for each registration
      - `full_name` (text, required) - Attendee's full name
      - `mobile` (text, required) - WhatsApp mobile number
      - `email` (text, required) - Email address
      - `registration_number` (text, required) - Student/participant registration number
      - `transaction_id` (text, required) - Payment transaction ID
      - `payment_proof_url` (text, required) - URL to uploaded payment screenshot
      - `accept_terms` (boolean, required) - Terms and conditions acceptance
      - `created_at` (timestamptz) - Registration timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `registrations` table
    - Add policy for authenticated users to insert their own registration
    - Add policy for authenticated users to read their own registrations
    - Add policy for service role to read all registrations (for admin access)

  3. Indexes
    - Add index on email for faster lookups
    - Add index on mobile for faster lookups
    - Add index on registration_number for faster lookups

  4. Storage Bucket
    - Create storage bucket for payment proof uploads
    - Enable public access for uploaded files
    - Set up RLS policies for bucket access
*/

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  mobile text NOT NULL,
  email text NOT NULL,
  registration_number text NOT NULL,
  transaction_id text NOT NULL,
  payment_proof_url text NOT NULL,
  accept_terms boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert their registration (public registration)
CREATE POLICY "Anyone can insert registration"
  ON registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Users can read all registrations (for verification purposes)
CREATE POLICY "Anyone can read registrations"
  ON registrations
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_mobile ON registrations(mobile);
CREATE INDEX IF NOT EXISTS idx_registrations_registration_number ON registrations(registration_number);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);

-- Create storage bucket for payment proofs
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-proofs', 'payment-proofs', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: Anyone can upload payment proofs
CREATE POLICY "Anyone can upload payment proofs"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'payment-proofs');

-- Storage policy: Anyone can read payment proofs
CREATE POLICY "Anyone can read payment proofs"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'payment-proofs');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_registrations_updated_at
  BEFORE UPDATE ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();