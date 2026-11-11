import React, { useState, useEffect } from 'react';
import { Clock, Users, X, Bell, Volume2, CheckCircle2, ChevronRight, Activity, Building2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_DOCTORS } from '../../data/mockData';
import { useEscapeKey } from '../../utils/useEscapeKey';

export const OpdLiveTokenModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEscapeKey(onClose);
  const { appointments, doctors, showToast } = useApp();

  // Find user's upcoming appointment or default to first doctor
  const upcomingAppointment = appointments.find((a) => a.status === 'UPCOMING');
  const activeDoctor = (upcomingAppointment
    ? doctors.find((d) => d.id === upcomingAppointment.doctorId) || doctors[0]
    : doctors[0]) || MOCK_DOCTORS[0];

  const userTokenNumber = upcomingAppointment ? upcomingAppointment.tokenNumber : '#ROY-12';
  const userSerialNumber = upcomingAppointment ? upcomingAppointment.serialNumber : 12;

  // Realtime simulated state
  const [currentServingToken, setCurrentServingToken] = useState<number>(Math.max(1, userSerialNumber - 4));
  const [estimatedWaitMinutes, setEstimatedWaitMinutes] = useState<number>((userSerialNumber - (userSerialNumber - 4)) * 6);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const soundEnabledRef = React.useRef(soundEnabled);
  soundEnabledRef.current = soundEnabled;

  // Update wait minutes reactively when current serving token advances
  useEffect(() => {
    setEstimatedWaitMinutes(Math.max(0, (userSerialNumber - currentServingToken) * 5));
  }, [currentServingToken, userSerialNumber]);

  // Simulated live queue ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentServingToken((prev) => {
        if (prev < userSerialNumber) {
          const next = prev + 1;
          if (soundEnabledRef.current && next === userSerialNumber) {
            showToast(`🔔 Attention! Your token ${userTokenNumber} is NOW being called to Chamber 104!`);
          }
          return next;
        }
        return prev;
      });
    }, 18000); // changes every 18 seconds for realistic demo

    return () => clearInterval(timer);
  }, [userSerialNumber, userTokenNumber, showToast]);

  const queueDistance = Math.max(0, userSerialNumber - currentServingToken);
  const isNowServingUser = currentServingToken >= userSerialNumber;

  return (
    <div
      id="opd-live-token-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl max-h-[90vh] flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-heading text-slate-900">
                  OPD Realtime Live Token Counter
                </h3>
                <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-500">Live queue position & digital chamber call bell</p>
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

        {/* Doctor Status Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={activeDoctor.image}
              alt={activeDoctor.name}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-emerald-400/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black">{activeDoctor.name}</span>
                <span className="text-[10px] bg-emerald-400/20 text-emerald-200 px-2 py-0.2 rounded-full border border-emerald-400/30">
                  Room 104 (1st Floor)
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/90">{activeDoctor.specialty} · {activeDoctor.hospital}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-800/80 px-2.5 py-1 rounded-full border border-emerald-600/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              In Chamber
            </span>
          </div>
        </div>

        {/* Big Dual Token Display */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Currently Inside */}
          <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/60 p-5 text-center flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              Currently Inside Chamber
            </span>
            <div className="my-3">
              <span className="text-4xl sm:text-5xl font-black text-amber-950 font-heading">
                #{activeDoctor.name.split(' ')[1]?.slice(0, 3).toUpperCase() || 'OPD'}-{String(currentServingToken).padStart(2, '0')}
              </span>
              <span className="block text-xs font-semibold text-amber-700 mt-1">
                Queue Serial #{currentServingToken}
              </span>
            </div>
            <span className="inline-flex items-center justify-center gap-1.5 text-xs text-amber-900 font-medium">
              <Activity className="w-3.5 h-3.5 text-amber-600 animate-spin" />
              Consultation in progress (~6 min)
            </span>
          </div>

          {/* Your Token */}
          <div className={`rounded-2xl border-2 p-5 text-center flex flex-col justify-between ${
            isNowServingUser
              ? 'border-emerald-500 bg-emerald-50/80 ring-4 ring-emerald-200 animate-pulse'
              : 'border-emerald-200 bg-emerald-50/40'
          }`}>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Your Booking Token
            </span>
            <div className="my-3">
              <span className="text-4xl sm:text-5xl font-black text-emerald-950 font-heading">
                {userTokenNumber}
              </span>
              <span className="block text-xs font-bold text-emerald-700 mt-1">
                Queue Serial #{userSerialNumber}
              </span>
            </div>
            <div>
              {isNowServingUser ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-200 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                  PLEASE ENTER CHAMBER 104 NOW
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-900 font-bold">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  Approx. wait: ~{estimatedWaitMinutes} mins ({queueDistance} patients ahead)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Live Queue Progress Bar */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span>Live OPD Chamber Queue</span>
            <span>{currentServingToken} of {userSerialNumber + 5} Checked In</span>
          </div>
          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(100, (currentServingToken / userSerialNumber) * 100)}%` }}
            />
          </div>

          {/* Individual queue nodes */}
          <div className="mt-4 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar py-1">
            {[userSerialNumber - 2, userSerialNumber - 1, userSerialNumber, userSerialNumber + 1, userSerialNumber + 2].map((token) => {
              const isPast = token < currentServingToken;
              const isCurrent = token === currentServingToken;
              const isUser = token === userSerialNumber;

              return (
                <div
                  key={token}
                  className={`flex-1 min-w-[70px] text-center p-2 rounded-xl text-xs font-bold border ${
                    isCurrent
                      ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-sm'
                      : isUser
                      ? 'bg-emerald-800 text-white border-emerald-800 ring-2 ring-emerald-300'
                      : isPast
                      ? 'bg-slate-200 text-slate-500 border-slate-300 line-through'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="block text-[10px] opacity-75">
                    {isCurrent ? 'Inside' : isUser ? 'You' : isPast ? 'Done' : 'Waiting'}
                  </span>
                  <span>#{token}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sound & WhatsApp Notification Toggle */}
        <div className="mt-4 flex items-center justify-between p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs">
          <div className="flex items-center gap-2.5">
            <Volume2 className={`w-4 h-4 ${soundEnabled ? 'text-emerald-700' : 'text-slate-400'}`} />
            <div>
              <span className="font-bold text-slate-900 block">Audio Chime & Vibration</span>
              <span className="text-[11px] text-slate-500">Alerts when your turn is 2 tokens away</span>
            </div>
          </div>
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              showToast(soundEnabled ? 'Chime muted' : 'Chime enabled for your token');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition text-xs ${
              soundEnabled
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-200 text-slate-700'
            }`}
          >
            {soundEnabled ? 'Enabled' : 'Muted'}
          </button>
        </div>

        {/* Footer actions */}
        <div className="mt-5 flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
          >
            Got it, Keep Tracking in Background
          </button>
        </div>
      </div>
    </div>
  );
};
