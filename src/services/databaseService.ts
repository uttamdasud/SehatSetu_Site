import { Doctor, Appointment, DigitalPrescription, MedicalRecord, UserProfile } from '../types';
import { MOCK_DOCTORS, INITIAL_APPOINTMENTS, INITIAL_PRESCRIPTIONS } from '../data/mockData';

// Configurable cloud endpoints
const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const isCloudDatabaseConfigured = (): boolean => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && !SUPABASE_URL.includes('example.com'));
};

/**
 * Universal Database Service for SehatSetu
 * Handles live PostgreSQL / Supabase synchronization when credentials exist,
 * with resilient local-first caching and fallback.
 */
class DatabaseService {
  private localDoctors: Doctor[] = [...MOCK_DOCTORS];
  private localAppointments: Appointment[] = [...INITIAL_APPOINTMENTS];
  private localPrescriptions: DigitalPrescription[] = [...INITIAL_PRESCRIPTIONS];

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    };
  }

  // =========================================================================
  // DOCTORS
  // =========================================================================

  async fetchDoctors(): Promise<Doctor[]> {
    if (!isCloudDatabaseConfigured()) {
      return this.localDoctors;
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/doctors?select=*&is_verified=eq.true`, {
        headers: this.getHeaders(),
      });
      if (!response.ok) throw new Error(`Supabase error: ${response.statusText}`);
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((d: any) => ({
          id: d.id,
          name: d.full_name,
          specialty: d.specialty,
          qualifications: d.qualifications,
          experienceYears: d.experience_years,
          hospital: d.hospital_name,
          hospitalAddress: d.hospital_address,
          city: d.city,
          location: d.city,
          languages: d.languages || ['Bengali', 'Hindi', 'English'],
          rating: Number(d.rating) || 4.8,
          reviewCount: d.review_count || 0,
          feeVideo: Number(d.fee_video) || 0,
          feeInClinic: Number(d.fee_in_clinic) || 0,
          availableForVideo: d.available_for_video ?? true,
          availableForInClinic: d.available_for_in_clinic ?? true,
          weeklySchedule: d.weekly_schedule || [],
          nextSlotVideo: 'Today, 05:00 PM',
          nextSlotClinic: 'Tomorrow, 10:00 AM',
          image: d.image_url || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
          verified: d.is_verified,
          isAvailableNow: true,
          gender: 'Male',
          about: d.about || '',
          education: [d.qualifications],
          specializations: [d.specialty],
          registrationNumber: d.registration_number,
          receptionistName: d.receptionist_name,
          receptionistPhone: d.receptionist_phone,
          receptionistEmail: d.receptionist_email,
          autoNotifyReceptionist: d.auto_notify_receptionist ?? true,
          reviews: [],
        }));
      }
    } catch (err) {
      console.warn('[DatabaseService] Failed to fetch doctors from Supabase, using local fallback:', err);
    }
    return this.localDoctors;
  }

  // =========================================================================
  // APPOINTMENTS
  // =========================================================================

  async createAppointment(appointment: Appointment): Promise<Appointment> {
    if (isCloudDatabaseConfigured()) {
      try {
        const payload = {
          doctor_id: appointment.doctorId,
          patient_name: appointment.patientName,
          patient_age: appointment.patientAge,
          patient_gender: appointment.patientGender,
          patient_phone: appointment.patientPhone,
          patient_address: appointment.patientAddress,
          consultation_type: appointment.type,
          appointment_date: new Date().toISOString().split('T')[0],
          time_slot: appointment.timeSlot,
          status: appointment.status,
          serial_number: appointment.serialNumber,
          token_number: appointment.tokenNumber,
          doctor_fee: appointment.doctorFeePayableAtClinic || appointment.fee,
          platform_fee: appointment.platformFee,
          platform_fee_status: appointment.platformFeeStatus,
          payment_method: appointment.paymentMethod,
          payment_id: appointment.paymentId,
          symptoms_notes: appointment.symptoms,
        };

        const res = await fetch(`${SUPABASE_URL}/rest/v1/appointments`, {
          method: 'POST',
          headers: {
            ...this.getHeaders(),
            Prefer: 'return=representation',
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const inserted = await res.json();
          if (inserted && inserted[0]) {
            appointment.id = inserted[0].id;
          }
        }
      } catch (err) {
        console.warn('[DatabaseService] Failed to push appointment to Supabase, stored locally:', err);
      }
    }

    this.localAppointments.unshift(appointment);
    return appointment;
  }

  async fetchAppointments(phone?: string): Promise<Appointment[]> {
    if (!isCloudDatabaseConfigured()) {
      return this.localAppointments;
    }

    try {
      const filter = phone ? `?patient_phone=eq.${encodeURIComponent(phone)}&order=created_at.desc` : '?order=created_at.desc';
      const res = await fetch(`${SUPABASE_URL}/rest/v1/appointments${filter}`, {
        headers: this.getHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map((a: any) => ({
            id: a.id,
            doctorId: a.doctor_id,
            doctorName: 'Dr. Specialist',
            doctorSpecialty: 'General Medicine',
            doctorImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
            doctorHospital: 'ILS Hospitals Agartala',
            doctorHospitalAddress: 'Capital Complex, Agartala',
            patientName: a.patient_name,
            patientAge: a.patient_age,
            patientGender: a.patient_gender,
            patientPhone: a.patient_phone,
            patientAddress: a.patient_address,
            relationshipToUser: 'Self',
            type: a.consultation_type,
            date: a.appointment_date,
            timeSlot: a.time_slot,
            status: a.status,
            serialNumber: a.serial_number,
            fee: Number(a.doctor_fee),
            doctorFeePayableAtClinic: Number(a.doctor_fee),
            platformFee: Number(a.platform_fee),
            platformFeeStatus: a.platform_fee_status,
            totalPaid: Number(a.platform_fee),
            tokenNumber: a.token_number,
            paymentMethod: a.payment_method,
            paymentId: a.payment_id,
            symptoms: a.symptoms_notes,
            createdDate: a.created_at,
          }));
        }
      }
    } catch (err) {
      console.warn('[DatabaseService] Failed to fetch appointments from Supabase:', err);
    }
    return this.localAppointments;
  }

  // =========================================================================
  // PRESCRIPTIONS
  // =========================================================================

  async createPrescription(rx: DigitalPrescription): Promise<DigitalPrescription> {
    if (isCloudDatabaseConfigured()) {
      try {
        const payload = {
          appointment_id: rx.appointmentId,
          doctor_name: rx.doctorName,
          doctor_reg_number: rx.doctorRegNumber,
          doctor_qualifications: rx.doctorQualifications,
          doctor_hospital: rx.doctorHospital,
          patient_name: rx.patientName,
          patient_age: rx.patientAge,
          patient_gender: rx.patientGender,
          primary_diagnosis: rx.diagnosis,
          symptoms_recorded: rx.symptomsRecorded,
          medicines: rx.medicines,
          clinical_advice: rx.advice,
          follow_up_in: rx.followUpIn,
        };

        await fetch(`${SUPABASE_URL}/rest/v1/prescriptions`, {
          method: 'POST',
          headers: this.getHeaders(),
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn('[DatabaseService] Failed to push prescription to Supabase:', err);
      }
    }

    this.localPrescriptions.unshift(rx);
    return rx;
  }
}

export const databaseService = new DatabaseService();
