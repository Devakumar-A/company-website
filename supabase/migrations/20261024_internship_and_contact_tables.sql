-- ==============================================================================
-- Cognolynx Supabase Schema Migration: Internship & Contact Inquiries
-- Safe, non-destructive migration using ALTER TABLE ... ADD COLUMN IF NOT EXISTS
-- and CREATE TABLE IF NOT EXISTS.
-- ==============================================================================

-- 1. INTERNSHIP APPLICATIONS TABLE UPDATES
-- Adds dedicated specialization column to preserve exact track selection
ALTER TABLE IF EXISTS public.internship_applications
ADD COLUMN IF NOT EXISTS specialization text;

-- Index for fast queries across domain and specialization
CREATE INDEX IF NOT EXISTS idx_internship_applications_domain_spec
ON public.internship_applications (domain, specialization);

COMMENT ON COLUMN public.internship_applications.specialization IS 
'Specific track or focused specialization chosen under the primary internship domain.';

-- 2. CONTACT FORM INQUIRIES TABLE
-- Stores client inquiries and project requests from /contact
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  service text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new'
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
ON public.contact_submissions (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status
ON public.contact_submissions (status);

COMMENT ON TABLE public.contact_submissions IS 
'Client and project inquiries submitted through the Cognolynx website contact form.';

-- 3. NEWSLETTER SUBSCRIBERS TABLE (OPTIONAL / EXPANSION)
-- Stores email newsletter signups from the website footer
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  email text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'active'
);

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) & ACCESS POLICIES
-- Strict Security: Anonymous users are allowed to INSERT inquiries/applications only.
-- Public SELECT, UPDATE, and DELETE are strictly disallowed for anon.
-- Only authenticated administrators (service role or Supabase Dashboard) can view/manage submissions.
-- ==============================================================================

-- Enable RLS on contact_submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous insert to contact_submissions" ON public.contact_submissions;
CREATE POLICY "Allow anonymous insert to contact_submissions"
ON public.contact_submissions
FOR INSERT
TO anon
WITH CHECK (true);

-- Enable RLS on internship_applications
ALTER TABLE public.internship_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous insert to internship_applications" ON public.internship_applications;
CREATE POLICY "Allow anonymous insert to internship_applications"
ON public.internship_applications
FOR INSERT
TO anon
WITH CHECK (true);

-- Enable RLS on job_applications
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous insert to job_applications" ON public.job_applications;
CREATE POLICY "Allow anonymous insert to job_applications"
ON public.job_applications
FOR INSERT
TO anon
WITH CHECK (true);

-- Enable RLS on newsletter_subscribers
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous insert to newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Allow anonymous insert to newsletter_subscribers"
ON public.newsletter_subscribers
FOR INSERT
TO anon
WITH CHECK (true);
