import React from 'react';
import {
  HeartPulse,
  Phone,
  ShieldCheck,
  Video,
  Sparkles,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const {
    setActiveTab,
    setActiveScreen,
    startInstantConsultation,
    setShowOnboardingModal,
    setShowReceptionistRosterModal,
    showToast,
  } = useApp();

  return (
    <footer id="app-global-footer" className="mt-16 border-t border-slate-200 bg-slate-900 text-slate-300">
      {/* 1. Emergency Helpline & Trust Banner */}
      <div className="border-b border-slate-800 bg-slate-950/70 px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              24/7 Medical Emergency Response
            </span>
            <span className="text-xs text-slate-400">
              · For critical medical emergencies, call national helplines:
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:108"
              className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600/20 border border-rose-500/40 px-3 py-1.5 text-xs font-black text-rose-300 hover:bg-rose-600 hover:text-white transition"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Ambulance: 108</span>
            </a>
            <a
              href="tel:112"
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600/20 border border-blue-500/40 px-3 py-1.5 text-xs font-black text-blue-300 hover:bg-blue-600 hover:text-white transition"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>National Helpline: 112</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main 5-Column Navigation Grid */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Column 1: For Patients */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-400 font-heading">
              For Patients
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('find-doctors');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition text-left"
                >
                  Search for Doctors
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    startInstantConsultation();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition flex items-center gap-1 text-emerald-300 font-medium"
                >
                  <span>Instant Video Consult</span>
                  <span className="rounded bg-emerald-900/60 px-1 py-0.2 text-[9px] font-bold">60s</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveScreen('symptom-checker');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition text-left"
                >
                  AI Clinical Symptom Checker
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('appointments');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition text-left"
                >
                  Manage Appointments
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition text-left"
                >
                  Digital Health Vault (Records)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: For Doctors & Clinics */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-teal-400 font-heading">
              Doctors & Clinics
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setShowOnboardingModal(true)}
                  className="hover:text-white transition flex items-center gap-1 text-teal-300 font-medium text-left"
                >
                  <span>Join as Doctor / Clinic</span>
                  <Sparkles className="h-3 w-3 text-teal-400 shrink-0" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowReceptionistRosterModal(true)}
                  className="hover:text-white transition text-left"
                >
                  Clinic Receptionist Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Practitioner verification is managed via State Medical Councils.')}
                  className="hover:text-white transition text-left"
                >
                  MCI Credential Verification
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Virtual Clinic EMR is active for verified doctors.')}
                  className="hover:text-white transition text-left"
                >
                  Digital Prescription EMR
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Automated WhatsApp rosters are dispatched each morning at 8:00 AM.')}
                  className="hover:text-white transition text-left"
                >
                  Daily Patient Manifest (WhatsApp)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setShowOnboardingModal(true)}
                  className="hover:text-white transition text-left"
                >
                  Pharmacy Network Partnership
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: National Digital Health (ABDM / ABHA) */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 font-heading">
              ABDM & National Health
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition flex items-center gap-1 text-amber-300 font-medium text-left"
                >
                  <span>14-Digit ABHA ID Creation</span>
                </button>
              </li>
              <li>
                <span className="block text-slate-400">
                  Ayushman Bharat Digital Mission
                </span>
              </li>
              <li>
                <span className="block text-slate-400">
                  HIP & HIU Consent Architecture
                </span>
              </li>
              <li>
                <span className="block text-slate-400">
                  QR Scan & Share at Clinics
                </span>
              </li>
              <li>
                <span className="block text-slate-400">
                  ISO 27001 & HIPAA Compliant
                </span>
              </li>
              <li>
                <span className="block text-slate-400">
                  DISHA Data Privacy Standard
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200 font-heading">
              Company & Trust
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => showToast('SehatSetu is building India’s most accessible digital health bridge.')}
                  className="hover:text-white transition text-left"
                >
                  About Our Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Medical content is reviewed by certified Indian physicians.')}
                  className="hover:text-white transition text-left"
                >
                  Medical Review Board
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Zero third-party tracker policy: your health data is never sold.')}
                  className="hover:text-white transition text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Terms of Service and Telemedicine Practice Guidelines adhere to NMC 2020 rules.')}
                  className="hover:text-white transition text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Contact support: care@sehatsetu.in or call 1800-SEHAT-SETU')}
                  className="hover:text-white transition text-left"
                >
                  Help & Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('Grievance Officer: grievances@sehatsetu.in')}
                  className="hover:text-white transition text-left"
                >
                  Grievance Redressal
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Brand & Certifications Bar */}
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                <HeartPulse className="h-5 w-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white font-heading">
                SehatSetu
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Connecting patients with verified doctors and clinics across India.
            </p>
          </div>

          {/* Security & Regulatory Badges */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 rounded-xl bg-slate-800/80 px-3 py-1.5 border border-slate-700">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>ABDM M1/M2/M3</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-slate-800/80 px-3 py-1.5 border border-slate-700">
              <Lock className="h-4 w-4 text-teal-400" />
              <span>256-Bit SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-xl bg-slate-800/80 px-3 py-1.5 border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-blue-400" />
              <span>MCI Registered Doctors</span>
            </div>
          </div>
        </div>

        {/* 4. Legal & Copyright Disclaimer */}
        <div className="mt-8 border-t border-slate-800/60 pt-6 text-[11px] text-slate-500 space-y-2">
          <p className="leading-relaxed">
            <strong>Medical Disclaimer:</strong> SehatSetu facilitates discovery and scheduling between verified healthcare practitioners and patients. The platform does not replace emergency medical interventions. In case of severe chest pain, head trauma, acute difficulty breathing, or stroke symptoms, please visit the nearest hospital emergency room immediately.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 text-slate-400">
            <div>
              © 2026 SehatSetu Healthcare Technologies Pvt. Ltd. All rights reserved.
            </div>
            <div className="flex gap-4">
              <button onClick={() => showToast('Privacy Policy: Zero tracker surveillance.')} className="hover:text-white">
                Privacy
              </button>
              <button onClick={() => showToast('Terms of Service compliant with Telemedicine Practice Guidelines 2020.')} className="hover:text-white">
                Terms
              </button>
              <button onClick={() => showToast('Security: ISO 27001, HIPAA & ABDM standards.')} className="hover:text-white">
                Security
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
