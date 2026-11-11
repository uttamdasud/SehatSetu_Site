import React, { useState } from 'react';
import { AlertTriangle, PhoneCall, X, ShieldAlert } from 'lucide-react';

export const EmergencyDisclaimerBanner: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div
      id="nmc-emergency-disclaimer-banner"
      role="alert"
      className="bg-gradient-to-r from-rose-900 via-rose-800 to-red-900 text-white text-xs px-3 py-2 border-b border-rose-700 shadow-xs relative z-40"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-start sm:items-center space-x-2">
          <ShieldAlert className="w-4 h-4 text-rose-200 shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-snug text-[11px] sm:text-xs text-rose-100">
            <strong className="text-white font-bold">NMC Medical Emergency Notice:</strong> SehatSetu is an outpatient consultation & queue management platform. For acute medical emergencies, trauma, severe chest pain, or poisoning, immediately visit the nearest hospital emergency room.
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
          <a
            href="tel:108"
            className="px-2 py-0.5 bg-white text-rose-900 hover:bg-rose-100 rounded-md font-bold text-[10px] flex items-center space-x-1 transition-colors shadow-2xs"
          >
            <PhoneCall className="w-2.5 h-2.5" />
            <span>Ambulance 108</span>
          </a>
          <a
            href="tel:112"
            className="px-2 py-0.5 bg-rose-950/80 hover:bg-rose-950 text-white border border-rose-600 rounded-md font-bold text-[10px] flex items-center space-x-1 transition-colors"
          >
            <span>Emergency 112</span>
          </a>
          <button
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss emergency notice"
            className="p-1 text-rose-300 hover:text-white rounded-full transition-colors ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
