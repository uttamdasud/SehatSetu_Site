import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Users,
  Video,
  Calendar,
  ShieldCheck,
  Zap,
  X,
  CreditCard,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_CARE_PLUS_PLANS } from '../../data/mockData';

interface CarePlusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CarePlusModal: React.FC<CarePlusModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [selectedPlanId, setSelectedPlanId] = useState('plan-family-annual');
  const [isActivated, setIsActivated] = useState(false);

  if (!isOpen) return null;

  const handleActivate = () => {
    setIsActivated(true);
    showToast('🎉 Congratulations! SehatSetu Care Plus Family Pass activated!');
    setTimeout(() => {
      setIsActivated(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-amber-200 max-h-[92vh] overflow-y-auto">
        {/* Gold & Purple Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-600 to-purple-900 p-6 text-white md:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-black/20 p-1.5 text-white/80 hover:bg-black/40 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-amber-100 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>VIP Family Healthcare Pass</span>
          </div>

          <h2 className="mt-2 text-2xl font-black font-heading md:text-3xl">
            SehatSetu Care Plus
          </h2>
          <p className="mt-1 text-xs text-amber-100/90 leading-relaxed md:text-sm">
            Zero doctor consultation fees. Complete health peace of mind for your whole family.
          </p>

          <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-white">
            <span className="rounded-lg bg-white/20 px-2.5 py-1 backdrop-blur-xs flex items-center gap-1">
              <Users className="h-3.5 w-3.5" /> Up to 6 Family Members
            </span>
            <span className="rounded-lg bg-white/20 px-2.5 py-1 backdrop-blur-xs flex items-center gap-1">
              <Video className="h-3.5 w-3.5" /> Unlimited Video Consults
            </span>
          </div>

          <div className="absolute -right-8 -bottom-8 h-48 w-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        </div>

        {/* Plans Selector */}
        <div className="p-6 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Select Your Membership Plan
          </div>

          <div className="grid gap-3">
            {MOCK_CARE_PLUS_PLANS.map((plan) => {
              const isSelected = selectedPlanId === plan.id;

              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/50 shadow-sm ring-1 ring-amber-400'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      {plan.badge && (
                        <span className="mb-1 inline-block rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-black uppercase text-amber-900 border border-amber-300">
                          {plan.badge}
                        </span>
                      )}
                      <h4 className="text-sm font-bold text-slate-900 font-heading">
                        {plan.name}
                      </h4>
                      <span className="text-xs text-slate-500">
                        Valid for {plan.durationMonths} months · Covers {plan.familyMembersCovered} members
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="flex items-baseline gap-1.5 justify-end">
                        <span className="text-lg font-black text-slate-900">₹{plan.price}</span>
                        <span className="text-xs text-slate-400 line-through">₹{plan.originalPrice}</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700">
                        Just ₹{Math.round(plan.price / plan.durationMonths)}/mo
                      </span>
                    </div>
                  </div>

                  {/* Bullet Benefits */}
                  <ul className="mt-3 space-y-1.5 border-t border-slate-200/60 pt-2.5 text-xs text-slate-700">
                    {plan.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Guarantee pill */}
          <div className="rounded-2xl bg-slate-50 p-3 text-xs text-slate-600 flex items-center gap-2.5 border border-slate-200">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>
              <strong>100% Risk Free:</strong> Cancel within 7 days if you haven’t used any consultation for a full refund.
            </span>
          </div>

          {/* Action button */}
          <button
            onClick={handleActivate}
            disabled={isActivated}
            className="w-full rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 py-3.5 text-sm font-black text-white shadow-md hover:from-amber-700 hover:to-orange-700 transition active:scale-95 disabled:opacity-75 flex items-center justify-center gap-2"
          >
            {isActivated ? (
              <>
                <CheckCircle2 className="h-5 w-5" />
                <span>Activating Your Plus Pass...</span>
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                <span>Join Care Plus & Start Saving</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
