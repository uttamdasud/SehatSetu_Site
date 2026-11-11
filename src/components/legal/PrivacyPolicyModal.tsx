import React from 'react';
import { X, ShieldCheck, Lock, EyeOff, Server } from 'lucide-react';
import { useEscapeKey } from '../../utils/useEscapeKey';

export const PrivacyPolicyModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEscapeKey(onClose);

  return (
    <div
      id="privacy-policy-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-teal-800 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5 text-teal-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading text-slate-900">Privacy & Health Data Policy</h3>
              <p className="text-xs text-slate-500">Digital Personal Data Protection (DPDP) Act 2023 Compliance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Policy Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs text-slate-700 leading-relaxed pr-2">
          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">1. Commitment to Health Data Confidentiality</h4>
            <p>
              SehatSetu values your digital privacy and treats personal health data with the highest fiduciary standard under the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">2. What Information We Collect</h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Identity & Demographics:</strong> Name, age, gender, contact mobile number, and city/state.</li>
              <li><strong>Clinical Information:</strong> Recorded symptoms, doctor consultation summaries, uploaded lab diagnostics, radiology reports, and digital prescriptions.</li>
              <li><strong>National Health ID (ABHA):</strong> 14-digit ABHA number and ABDM address with your explicit Aadhaar OTP consent.</li>
              <li><strong>Transaction Data:</strong> UPI transaction reference IDs and platform fee payment status (we never store banking passwords or credit card CVV).</li>
            </ul>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">3. Purpose Limitation</h4>
            <p>
              Your personal and health data is strictly processed for the intended purpose: scheduling outpatient appointments, generating digital prescription records, sharing patient rosters with the treating doctor's clinic desk, and synchronizing with the National Health Claims/ABDM network. We do NOT sell, rent, or trade your medical data to third-party advertisers.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">4. Data Encryption & Storage Security</h4>
            <p>
              All transit communications use TLS 1.3 encryption. Health documents stored in the SehatSetu vault are protected by AES-256 server-side encryption with optional biometric lock (Touch ID / Face ID / PIN) on your mobile device.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">5. Patient Rights as Data Principal (DPDP Act 2023)</h4>
            <p>As a Data Principal under Indian law, you have the following rights:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Right to Access:</strong> View all medical documents and consultation history at any time in your profile.</li>
              <li><strong>Right to Correction:</strong> Update personal demographic details or family member information.</li>
              <li><strong>Right to Erasure:</strong> Request permanent deletion of uploaded medical records from our servers.</li>
              <li><strong>Right to Nominate:</strong> Add family members who can manage healthcare bookings on your behalf.</li>
            </ul>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">6. Grievance Redressal Officer</h4>
            <p>
              In accordance with DPDP Act 2023 and IT Rules 2011, for data concerns or erasure requests, contact our designated Grievance Officer:
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-0.5 text-slate-600">
              <div><strong>Email:</strong> privacy@sehatsetu.in / desk.agartala@medpulse.in</div>
              <div><strong>Nodal Officer:</strong> Data Protection Officer, SehatSetu Medical Network</div>
              <div><strong>Jurisdiction:</strong> Agartala, Tripura, India</div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-400">DPDP Act 2023 Compliant • ISO/IEC 27001 Certified Standards</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold transition shadow-xs"
          >
            Close Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
};
