-- ==============================================================================
-- SehatSetu Telemedicine & OPD Queue Management Platform
-- Production PostgreSQL Database Schema (Compatible with Supabase / AWS RDS / Neon)
-- Compliant with:
-- 1. National Medical Commission (NMC) Telemedicine Practice Guidelines (2020)
-- 2. Digital Personal Data Protection (DPDP) Act (2023)
-- 3. Ayushman Bharat Digital Mission (ABDM) FHIR v4 Standards
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. USERS & PATIENT PROFILES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(160),
    age INT CHECK (age >= 0 AND age <= 130),
    gender VARCHAR(20) CHECK (gender IN ('Male', 'Female', 'Other')),
    blood_group VARCHAR(10),
    city VARCHAR(100) DEFAULT 'Agartala',
    state VARCHAR(100) DEFAULT 'Tripura',
    avatar_url TEXT,
    abha_id VARCHAR(30), -- e.g. '91-8842-9901-4431'
    abha_address VARCHAR(100), -- e.g. 'uttamdas@abdm'
    is_phone_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 2. FAMILY MEMBERS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.family_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    full_name VARCHAR(120) NOT NULL,
    relationship VARCHAR(30) NOT NULL CHECK (relationship IN ('Spouse', 'Father', 'Mother', 'Child', 'Sibling', 'Other')),
    age INT,
    gender VARCHAR(20) CHECK (gender IN ('Male', 'Female', 'Other')),
    blood_group VARCHAR(10),
    phone VARCHAR(20),
    allergies TEXT DEFAULT 'None reported',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 3. REGISTERED SPECIALIST DOCTORS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.doctors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(120) NOT NULL,
    specialty VARCHAR(80) NOT NULL,
    qualifications VARCHAR(120) NOT NULL, -- e.g. "MBBS, MD (Medicine), DM (Cardiology)"
    experience_years INT NOT NULL DEFAULT 5,
    registration_number VARCHAR(80) NOT NULL UNIQUE, -- NMC / State Medical Council Reg No
    hospital_name VARCHAR(160) NOT NULL,
    hospital_address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) DEFAULT 'Tripura',
    languages TEXT[] DEFAULT ARRAY['Bengali', 'Hindi', 'English'],
    fee_video NUMERIC(10, 2) DEFAULT 0,
    fee_in_clinic NUMERIC(10, 2) DEFAULT 0,
    available_for_video BOOLEAN DEFAULT TRUE,
    available_for_in_clinic BOOLEAN DEFAULT TRUE,
    weekly_schedule JSONB NOT NULL DEFAULT '[]'::jsonb,
    rating NUMERIC(3, 2) DEFAULT 4.8,
    review_count INT DEFAULT 0,
    image_url TEXT,
    is_verified BOOLEAN DEFAULT TRUE,
    receptionist_name VARCHAR(120),
    receptionist_phone VARCHAR(20),
    receptionist_email VARCHAR(160),
    auto_notify_receptionist BOOLEAN DEFAULT TRUE,
    about TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 4. APPOINTMENTS & REALTIME OPD QUEUE TOKENS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID REFERENCES public.doctors(id) ON DELETE RESTRICT,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    patient_name VARCHAR(120) NOT NULL,
    patient_age INT NOT NULL,
    patient_gender VARCHAR(20) NOT NULL,
    patient_phone VARCHAR(20) NOT NULL,
    patient_address TEXT,
    consultation_type VARCHAR(20) NOT NULL CHECK (consultation_type IN ('IN_CLINIC', 'VIDEO')),
    appointment_date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    status VARCHAR(30) DEFAULT 'UPCOMING' CHECK (status IN ('UPCOMING', 'SERVING', 'COMPLETED', 'CANCELLED')),
    serial_number INT NOT NULL, -- Queue position for the doctor on that date (1, 2, 3...)
    token_number VARCHAR(40) NOT NULL, -- Human-readable token e.g. '#ROY-08'
    doctor_fee NUMERIC(10, 2) DEFAULT 0, -- Payable at clinic or online
    platform_fee NUMERIC(10, 2) DEFAULT 0, -- SehatSetu convenience fee (₹0 in promo)
    platform_fee_status VARCHAR(30) DEFAULT 'WAIVED_PROMO' CHECK (platform_fee_status IN ('WAIVED_PROMO', 'PAID_VIA_UPI', 'PAID_ONLINE', 'FREE')),
    payment_method VARCHAR(40) DEFAULT 'CASH_AT_CLINIC',
    payment_id VARCHAR(120), -- Razorpay / UPI transaction ID
    symptoms_notes TEXT,
    receptionist_notified_whatsapp BOOLEAN DEFAULT FALSE,
    receptionist_notified_email BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_appointments_doctor_date ON public.appointments (doctor_id, appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_patient_phone ON public.appointments (patient_phone);

-- ------------------------------------------------------------------------------
-- 5. DIGITAL PRESCRIPTIONS (NMC COMPLIANT)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID REFERENCES public.appointments(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES public.doctors(id) ON DELETE RESTRICT,
    doctor_name VARCHAR(120) NOT NULL,
    doctor_reg_number VARCHAR(80) NOT NULL,
    doctor_qualifications VARCHAR(120) NOT NULL,
    doctor_hospital VARCHAR(160) NOT NULL,
    patient_name VARCHAR(120) NOT NULL,
    patient_age INT NOT NULL,
    patient_gender VARCHAR(20) NOT NULL,
    consultation_date DATE NOT NULL DEFAULT CURRENT_DATE,
    primary_diagnosis TEXT NOT NULL,
    symptoms_recorded TEXT,
    medicines JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of {name, dosage, frequency, duration, instructions}
    clinical_advice TEXT[] DEFAULT ARRAY[]::text[],
    investigations_ordered TEXT[] DEFAULT ARRAY[]::text[],
    follow_up_in VARCHAR(60),
    is_digital_signed BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 6. PATIENT HEALTH RECORDS & VAULT (DPDP ACT ENCRYPTED REFERENCES)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.medical_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(160) NOT NULL,
    record_type VARCHAR(40) NOT NULL CHECK (record_type IN ('PRESCRIPTION', 'LAB_REPORT', 'MEDICAL_DOC', 'CONSULTATION', 'SCAN_REPORT', 'DISCHARGE_SUMMARY')),
    doctor_or_facility VARCHAR(160) NOT NULL,
    record_date VARCHAR(60) NOT NULL,
    file_url TEXT NOT NULL,
    file_type VARCHAR(20) DEFAULT 'PDF',
    file_size VARCHAR(30) DEFAULT '1.5 MB',
    summary TEXT,
    tags TEXT[] DEFAULT ARRAY['Medical Document'],
    is_abdm_synced BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 7. RECEPTIONIST DAILY ROSTER DISPATCH AUDIT LOG
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.receptionist_rosters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE,
    roster_date DATE NOT NULL,
    total_appointments INT NOT NULL DEFAULT 0,
    receptionist_phone VARCHAR(20),
    receptionist_email VARCHAR(160),
    channel VARCHAR(30) DEFAULT 'WHATSAPP', -- 'WHATSAPP' | 'EMAIL' | 'SMS'
    delivery_status VARCHAR(30) DEFAULT 'DISPATCHED', -- 'DISPATCHED' | 'DELIVERED' | 'FAILED'
    manifest_payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ------------------------------------------------------------------------------
-- 8. DPDP ACT 2023 PATIENT CONSENT LEDGER (AUDIT TRAIL)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.patient_consents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    consent_purpose VARCHAR(100) NOT NULL, -- e.g. 'ABDM_CROSS_PLATFORM_FETCH', 'DOCUMENT_UPLOAD', 'DOCTOR_SHARING'
    description TEXT NOT NULL,
    is_granted BOOLEAN NOT NULL DEFAULT TRUE,
    granted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    revoked_at TIMESTAMP WITH TIME ZONE,
    ip_address VARCHAR(50),
    user_agent TEXT
);

-- ------------------------------------------------------------------------------
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_consents ENABLE ROW LEVEL SECURITY;

-- Public read access for doctor profiles
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view verified doctors" ON public.doctors
    FOR SELECT USING (is_verified = TRUE);

-- Users can only read & update their own records
CREATE POLICY "Users can manage own profile" ON public.users
    FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can manage own family members" ON public.family_members
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own appointments" ON public.appointments
    FOR ALL USING (auth.uid() = user_id OR patient_phone = (SELECT phone FROM public.users WHERE id = auth.uid()));

CREATE POLICY "Users can view own medical records" ON public.medical_records
    FOR ALL USING (auth.uid() = user_id);
