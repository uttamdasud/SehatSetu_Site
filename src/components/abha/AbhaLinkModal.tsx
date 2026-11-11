import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  QrCode,
  Download,
  Share2,
  Building2,
  KeyRound,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useEscapeKey } from '../../utils/useEscapeKey';

export const AbhaLinkModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEscapeKey(onClose);
  const { userProfile, setUserProfile, showToast } = useApp();

  const [step, setStep] = useState<'DETAILS' | 'OTP' | 'SUCCESS'>('SUCCESS'); // default to success if already linked
  const [aadhaarNumber, setAadhaarNumber] = useState('5842 9901 4431');
  const [abhaAddress, setAbhaAddress] = useState('uttamdas@abdm');
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [autoSyncConsent, setAutoSyncConsent] = useState(true);

  const handleSendOtp = () => {
    if (aadhaarNumber.replace(/\s+/g, '').length !== 12) {
      showToast('Please enter a valid 12-digit Aadhaar number');
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep('OTP');
      showToast('OTP sent to your Aadhaar-linked mobile number');
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (otp.length < 4) {
      showToast('Please enter the 6-digit OTP');
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep('SUCCESS');
      setUserProfile((prev) => ({
        ...prev,
        abhaId: '91-8842-9901-4431'
      }));
      showToast('ABHA ID linked successfully with ABDM Gateway!');
    }, 1200);
  };

  return (
    <div
      id="abha-link-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl max-h-[92vh] flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-heading text-slate-900">
                  Ayushman Bharat Health Account (ABHA)
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  ABDM Official
                </span>
              </div>
              <p className="text-xs text-slate-500">
                National Health Authority (NHA) unified digital healthcare identity
              </p>
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

        {/* Dynamic Step View */}
        {step === 'SUCCESS' ? (
          <div className="mt-4 space-y-4">
            {/* Official ABHA Card Preview */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 text-white shadow-xl border border-emerald-400/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck className="w-48 h-48" />
              </div>

              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/15 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl bg-white text-emerald-950 flex items-center justify-center font-black text-sm">
                    🇮🇳
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-200 block">
                      National Health Authority (NHA)
                    </span>
                    <span className="text-xs font-black text-white">Government of India</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-emerald-400/20 text-emerald-200 px-2.5 py-1 rounded-full border border-emerald-400/30">
                  ABHA Verified
                </span>
              </div>

              {/* Card Details */}
              <div className="mt-5 flex items-start justify-between gap-4 relative z-10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 block">
                    ABHA Number (14 Digits)
                  </span>
                  <div className="text-xl sm:text-2xl font-mono font-black text-white tracking-wider mt-0.5">
                    {userProfile.abhaId || '91-8842-9901-4431'}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[10px] text-emerald-300 block">Cardholder Name</span>
                      <span className="font-bold text-white text-sm">{userProfile.name}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-300 block">ABHA Address</span>
                      <span className="font-bold text-white text-sm">{abhaAddress}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-300 block">Gender / Age</span>
                      <span className="font-semibold text-white">{userProfile.gender} / {userProfile.age} Yrs</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-300 block">Blood Group</span>
                      <span className="font-semibold text-white">{userProfile.bloodGroup}</span>
                    </div>
                  </div>
                </div>

                {/* QR Code Simulation */}
                <div className="p-2.5 bg-white rounded-2xl shrink-0 text-slate-900 shadow-md text-center">
                  <QrCode className="w-20 h-20 text-slate-900 mx-auto" />
                  <span className="text-[9px] font-bold text-slate-600 block mt-1">Scan for EMR</span>
                </div>
              </div>
            </div>

            {/* Health Locker Sync Status */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">ABDM Consent Manager Active</h5>
                    <p className="text-[11px] text-slate-500">
                      Your lab reports, prescriptions & doctor consults auto-sync across hospitals
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setAutoSyncConsent(!autoSyncConsent);
                    showToast(autoSyncConsent ? 'Auto-sync paused' : 'Auto-sync enabled');
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                    autoSyncConsent ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {autoSyncConsent ? 'Active' : 'Paused'}
                </button>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span>Linked Network Providers: <strong>4 Hospitals, 12 Diagnostic Labs</strong></span>
                <span className="text-emerald-700 font-bold">Encrypted 256-bit</span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => showToast('ABHA Digital Card PDF downloaded to device!')}
                className="py-2.5 px-4 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Card</span>
              </button>

              <button
                onClick={() => showToast('ABHA QR code shared to clinic scanner!')}
                className="py-2.5 px-4 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs hover:bg-slate-200 transition flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4" />
                <span>Share with Doctor</span>
              </button>
            </div>
          </div>
        ) : step === 'OTP' ? (
          <div className="mt-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="text-center">
              <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
                <KeyRound className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Enter Aadhaar Verification OTP</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Sent to mobile linked with Aadhaar ending in ...4431
              </p>
            </div>

            <div>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP (e.g. 482910)"
                className="w-full text-center tracking-widest text-lg font-mono font-bold bg-white border border-slate-300 rounded-xl py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={isVerifying}
              className="w-full py-3 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition shadow-xs disabled:opacity-50"
            >
              {isVerifying ? 'Verifying with ABDM Gateway...' : 'Verify OTP & Link ABHA'}
            </button>
          </div>
        ) : (
          <div className="mt-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Enter 12-digit Aadhaar Number
              </label>
              <input
                type="text"
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value)}
                placeholder="5842 9901 4431"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Choose ABHA Address (PHR Handle)
              </label>
              <input
                type="text"
                value={abhaAddress}
                onChange={(e) => setAbhaAddress(e.target.value)}
                placeholder="yourname@abdm"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900"
              />
            </div>

            <button
              onClick={handleSendOtp}
              disabled={isVerifying}
              className="w-full py-3 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition shadow-xs disabled:opacity-50"
            >
              {isVerifying ? 'Connecting to UIDAI Gateway...' : 'Request Aadhaar OTP'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
