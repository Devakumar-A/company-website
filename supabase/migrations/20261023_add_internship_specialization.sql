-- Migration: Add internship specialization support to internship_applications table
-- Ensures backwards compatibility with existing rows while allowing separate domain and specialization storage.

ALTER TABLE IF EXISTS public.internship_applications
ADD COLUMN IF NOT EXISTS specialization text;

-- Optional index for faster filtering and analytics by domain and specialization
CREATE INDEX IF NOT EXISTS idx_internship_applications_domain_spec
ON public.internship_applications (domain, specialization);

COMMENT ON COLUMN public.internship_applications.specialization IS 'Specific track/focus area selected under the main internship domain.';
