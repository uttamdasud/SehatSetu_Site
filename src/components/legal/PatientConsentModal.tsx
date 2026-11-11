import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { useEscapeKey } from '../../utils/useEscapeKey';

interface PatientConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConsentGranted: () => void;
  title: string;
  purpose: string;
}

export const PatientConsentModal: React.FC<PatientConsentModalProps> = ({
  isOpen,
  onClose,
  onConsentGranted,
  title,
  purpose,
}) => {
  useEscapeKey(onClose, isOpen);

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToAbdm, setAgreedToAbdm] = useState(false);

  if (!isOpen) return null;

  const canProceed = agreedToTerms && agreedToAbdm;

  const handleGrant = () => {
    if (!canProceed) return;
    onConsentGranted();
    onClose();
  };

  return (
    <div
      id="patient-consent-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-heading text-slate-900">{title}</h3>
              <p className="text-[11px] text-slate-500">DPDP Act 2023 Informed Consent</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-xs text-emerald-950 space-y-1">
          <div className="font-bold">Specified Purpose:</div>
          <div className="text-[11px] text-emerald-900 leading-relaxed">{purpose}</div>
        </div>

        <div className="space-y-3 pt-1">
          <label className="flex items-start space-x-2.5 cursor-pointer text-xs text-slate-700">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-700 w-4 h-4"
            />
            <span>
              I grant explicit permission to process my health documents strictly for outpatient consultation, diagnosis, and prescription generation.
            </span>
          </label>

          <label className="flex items-start space-x-2.5 cursor-pointer text-xs text-slate-700">
            <input
              type="checkbox"
              checked={agreedToAbdm}
              onChange={(e) => setAgreedToAbdm(e.target.checked)}
              className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-700 w-4 h-4"
            />
            <span>
              I understand my rights under the Digital Personal Data Protection Act 2023, including the right to revoke consent and request data erasure.
            </span>
          </label>
        </div>

        <div className="pt-2 flex items-center space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
          >
            Decline
          </button>
          <button
            type="button"
            disabled={!canProceed}
            onClick={handleGrant}
            className={`flex-1 py-2.5 text-white rounded-xl text-xs font-bold transition shadow-xs ${
              canProceed
                ? 'bg-emerald-800 hover:bg-emerald-900'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            Grant Explicit Consent
          </button>
        </div>
      </div>
    </div>
  );
};
