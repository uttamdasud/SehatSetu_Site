import React, { useState } from 'react';
import {
  Activity,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  PhoneCall,
  Calendar,
  Building2,
  Car,
  CreditCard,
  UserCheck,
  ChevronRight,
  Info,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_SURGERIES } from '../../data/mockData';
import { SurgeryProcedure } from '../../types';

export const SurgeriesScreen: React.FC = () => {
  const { userProfile, currentLocation, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Consultation Modal State
  const [consultSurgery, setConsultSurgery] = useState<SurgeryProcedure | null>(null);
  const [patientName, setPatientName] = useState(userProfile.name || 'Self');
  const [patientPhone, setPatientPhone] = useState(userProfile.phone || '+91 98765 43210');
  const [insuranceProvider, setInsuranceProvider] = useState('Star Health / Other Private TPA');
  const [city, setCity] = useState(currentLocation.city);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const categories = [
    'ALL',
    'General Surgery',
    'Ophthalmology',
    'Proctology',
    'Urology',
    'Orthopedics',
  ];

  const filteredSurgeries = MOCK_SURGERIES.filter((surg) => {
    const matchesCategory =
      selectedCategory === 'ALL' || surg.category === selectedCategory;
    const matchesSearch =
      surg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surg.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surg.technique.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultSurgery) return;
    setIsSuccessModalOpen(true);
  };

  return (
    <div id="surgeries-screen-view" className="space-y-6 pb-24 pt-4">
      {/* Hero Daycare Surgery Section */}
      <section className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-900 p-6 text-white shadow-xl md:p-8">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-300/30 bg-indigo-500/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-200 backdrop-blur-md">
            <Activity className="h-3.5 w-3.5 text-indigo-300" />
            <span>SehatSetu Care · Daycare Surgeries</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
            Surgical Care Simplified with 100% Cashless Insurance
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-indigo-100/90 md:text-base">
            Minimal cuts, advanced laser and laparoscopic techniques, same-day discharge, and a dedicated Care Coordinator managing hospital admission, paperwork, and free cab transit.
          </p>

          {/* 4 Value Pillars */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs font-semibold text-indigo-50">
            <div className="flex items-center gap-2 rounded-xl bg-white/10 p-2.5 backdrop-blur-xs">
              <UserCheck className="h-4 w-4 text-indigo-300 shrink-0" />
              <span>Dedicated Care Buddy</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/10 p-2.5 backdrop-blur-xs">
              <ShieldCheck className="h-4 w-4 text-indigo-300 shrink-0" />
              <span>100% Cashless TPA</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/10 p-2.5 backdrop-blur-xs">
              <Car className="h-4 w-4 text-indigo-300 shrink-0" />
              <span>Free Cab Pick & Drop</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/10 p-2.5 backdrop-blur-xs">
              <CreditCard className="h-4 w-4 text-indigo-300 shrink-0" />
              <span>0% No-Cost EMI</span>
            </div>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
      </section>

      {/* Search & Category Filter Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search procedure (e.g. Cataract, Piles, Gallstone, Hernia, Lasik, Knee)..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-10 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-xs outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Horizontal Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat === 'ALL' ? 'All Surgeries' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Surgery Procedures Grid */}
      <div className="grid gap-5 md:grid-cols-2">
        {filteredSurgeries.map((surg) => (
          <div
            key={surg.id}
            className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs transition hover:border-indigo-400 hover:shadow-md"
          >
            {/* Image Header with Technique Overlay */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-100">
              <img
                src={surg.image}
                alt={surg.name}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              <div className="absolute top-3 left-3 flex gap-2">
                <span className="rounded-md bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[10px] font-black uppercase text-indigo-950 shadow-sm">
                  {surg.technique}
                </span>
                {surg.insuranceCashlessCovered && (
                  <span className="rounded-md bg-emerald-600/90 backdrop-blur-xs px-2.5 py-1 text-[10px] font-black uppercase text-white shadow-sm flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    100% Cashless
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-lg font-black text-white font-heading leading-tight drop-shadow-sm">
                  {surg.name}
                </h3>
                <span className="text-xs text-indigo-200 font-medium">{surg.hospitalStay}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {surg.tagline}
                </p>

                {/* Surgery Fast Facts Matrix */}
                <div className="mt-3.5 grid grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-3 text-center text-xs">
                  <div>
                    <span className="block text-[10px] font-medium text-slate-400">Est. Cost Range</span>
                    <strong className="text-slate-900 font-bold text-[11px]">{surg.estimatedCostRange}</strong>
                  </div>
                  <div className="border-x border-slate-200">
                    <span className="block text-[10px] font-medium text-slate-400">Recovery Time</span>
                    <strong className="text-indigo-900 font-bold text-[11px]">{surg.recoveryTimeDays} Days</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] font-medium text-slate-400">Free Followups</span>
                    <strong className="text-emerald-700 font-bold text-[11px]">{surg.freeFollowupsCount} Visits</strong>
                  </div>
                </div>

                {/* Key Surgical Benefits */}
                <ul className="mt-4 space-y-1.5 text-xs text-slate-700">
                  {surg.benefits.slice(0, 3).map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 mt-0.5 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Bar */}
              <div className="border-t border-slate-100 pt-3.5 flex items-center justify-between">
                <div className="text-[11px] text-slate-500">
                  <span>Free Initial Evaluation</span>
                </div>

                <button
                  onClick={() => setConsultSurgery(surg)}
                  className="rounded-xl bg-indigo-900 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-950 active:scale-95 flex items-center gap-1.5"
                >
                  <span>Book Free Consult</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* How SehatSetu Care Works */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 font-heading">
          How SehatSetu Care Works For You
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          End-to-end guidance so you and your family can focus on healing
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-900 font-black text-sm">
              1
            </div>
            <h4 className="mt-2.5 text-xs font-bold text-slate-900">Free Doctor Consult</h4>
            <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
              Meet top surgeons for physical examination, second opinion, and cost transparency.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-900 font-black text-sm">
              2
            </div>
            <h4 className="mt-2.5 text-xs font-bold text-slate-900">Insurance Approval</h4>
            <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
              Care buddy submits your pre-authorization papers to the TPA for 100% cashless approval.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-900 font-black text-sm">
              3
            </div>
            <h4 className="mt-2.5 text-xs font-bold text-slate-900">Surgery Day Concierge</h4>
            <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
              Complimentary cab arrives at your home. Your Care Buddy welcomes you at the hospital.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-900 font-black text-sm">
              4
            </div>
            <h4 className="mt-2.5 text-xs font-bold text-slate-900">Post-Op Recovery</h4>
            <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
              Same-day or next-day discharge with free doctor follow-ups, medicine guidance & dietary plan.
            </p>
          </div>
        </div>
      </section>

      {/* Free Surgery Consultation Booking Modal */}
      {consultSurgery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                  Free Surgical Guidance & Estimate
                </span>
                <h3 className="text-lg font-black text-slate-900 font-heading">
                  {consultSurgery.name}
                </h3>
              </div>
              <button
                onClick={() => setConsultSurgery(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 rounded-2xl bg-indigo-50 p-3 border border-indigo-100 text-xs text-indigo-950 flex items-start gap-2.5">
              <Sparkles className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
              <span>
                A dedicated <strong>SehatSetu Care Specialist</strong> will contact you within 15 minutes to evaluate insurance coverage, explain hospital options, and book your free doctor consultation.
              </span>
            </div>

            <form onSubmit={handleConsultSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Patient Name</label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Contact Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Health Insurance / Mediclaim</label>
                <select
                  value={insuranceProvider}
                  onChange={(e) => setInsuranceProvider(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-indigo-500"
                >
                  <option>Star Health / Private TPA</option>
                  <option>Care Health Insurance</option>
                  <option>HDFC ERGO / ICICI Lombard</option>
                  <option>Corporate Group Mediclaim</option>
                  <option>Ayushman Bharat / PM-JAY</option>
                  <option>No Insurance (Check 0% EMI options)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-indigo-500"
                />
              </div>

              <div className="mt-5 flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setConsultSurgery(null)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-indigo-900 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-950"
                >
                  Schedule Callback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-center border border-slate-200">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-900">
              <CheckCircle2 className="h-8 w-8 text-indigo-700" />
            </div>

            <h3 className="mt-3 text-lg font-black text-slate-900 font-heading">
              Care Specialist Assigned!
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              We have received your consultation request for <strong>{consultSurgery?.name}</strong>. Your dedicated care coordinator will call <strong>{patientPhone}</strong> shortly.
            </p>

            <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-left text-xs space-y-1">
              <div className="text-slate-500">Patient: <strong className="text-slate-900">{patientName}</strong></div>
              <div className="text-slate-500">Insurance: <strong className="text-slate-900">{insuranceProvider}</strong></div>
              <div className="text-slate-500">Assigned Coordinator: <strong className="text-indigo-800">Pooja Sharma (Senior Care Buddy)</strong></div>
            </div>

            <button
              onClick={() => {
                setIsSuccessModalOpen(false);
                setConsultSurgery(null);
                showToast('Care specialist callback scheduled successfully!');
              }}
              className="mt-5 w-full rounded-xl bg-indigo-900 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-950"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
