import React, { useState } from 'react';
import {
  FlaskConical,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MapPin,
  User,
  Phone,
  AlertCircle,
  Truck,
  HeartPulse,
  Award,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MOCK_LAB_TESTS } from '../../data/mockData';
import { LabTestPackage } from '../../types';

export const LabTestsScreen: React.FC = () => {
  const {
    currentLocation,
    userProfile,
    showToast,
    addMedicalRecord,
    setActiveTab,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>(null);

  // Booking Modal State
  const [bookingPackage, setBookingPackage] = useState<LabTestPackage | null>(null);
  const [patientName, setPatientName] = useState(userProfile.name || 'Self');
  const [patientPhone, setPatientPhone] = useState(userProfile.phone || '+91 98765 43210');
  const [sampleAddress, setSampleAddress] = useState(
    `${currentLocation.area}, ${currentLocation.city}, ${currentLocation.state}`
  );
  const [bookingDate, setBookingDate] = useState('Tomorrow, 07:00 AM - 08:00 AM');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const categories = [
    'ALL',
    'Full Body',
    'Diabetes',
    'Fever & Infection',
    'Thyroid',
    'Vitamins',
    'Heart',
    'Women Health',
  ];

  const filteredPackages = MOCK_LAB_TESTS.filter((pkg) => {
    const matchesCategory =
      selectedCategory === 'ALL' || pkg.category === selectedCategory;
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.parameters.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleBookTestClick = (pkg: LabTestPackage) => {
    setBookingPackage(pkg);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingPackage) return;

    // Add to Medical Records as an upcoming lab order
    addMedicalRecord({
      title: `${bookingPackage.name} (Home Collection)`,
      type: 'LAB_REPORT',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      doctorOrLab: 'SehatSetu NABL Diagnostic Network',
      patientName,
      fileSize: 'Pending Collection',
      fileType: 'PDF',
      summary: `Sample Pickup Scheduled for ${bookingDate} at ${sampleAddress}. ${bookingPackage.testCount} parameters. Fasting: ${
        bookingPackage.fastingRequired ? `Yes (${bookingPackage.fastingHours}h)` : 'No'
      }. Total Paid: ₹${bookingPackage.price}.`,
      tags: [bookingPackage.category, 'Home Sample', 'NABL Certified'],
    });

    setIsSuccessModalOpen(true);
  };

  return (
    <div id="lab-tests-screen-view" className="space-y-6 pb-24 pt-4">
      {/* Hero Diagnostic Header */}
      <section className="relative overflow-hidden rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-teal-900 via-emerald-900 to-slate-900 p-6 text-white shadow-xl md:p-8">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-500/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-200 backdrop-blur-md">
            <FlaskConical className="h-3.5 w-3.5 text-teal-300" />
            <span>NABL Certified Diagnostics</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
            Book Lab Tests & Health Checkups at Home
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-teal-100/90 md:text-base">
            Safe, sterile home sample collection by certified phlebotomists. 100% accurate digital reports delivered within 12 to 24 hours.
          </p>

          {/* Trust Value Badges */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 text-xs font-semibold text-teal-50">
            <div className="flex items-center gap-2 rounded-xl bg-white/10 p-2.5 backdrop-blur-xs">
              <Truck className="h-4 w-4 text-teal-300 shrink-0" />
              <span>Free Home Pickup</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/10 p-2.5 backdrop-blur-xs">
              <Award className="h-4 w-4 text-teal-300 shrink-0" />
              <span>100% NABL Labs</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/10 p-2.5 backdrop-blur-xs">
              <Clock className="h-4 w-4 text-teal-300 shrink-0" />
              <span>Reports in 12-24 Hrs</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/10 p-2.5 backdrop-blur-xs">
              <ShieldCheck className="h-4 w-4 text-teal-300 shrink-0" />
              <span>Safe Barcoded Vials</span>
            </div>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />
      </section>

      {/* Search & Category Filter Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search test name, organ (e.g. CBC, Thyroid, Liver, Sugar, Vitamins)..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-10 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-xs outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
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
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat === 'ALL' ? 'All Checkups' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredPackages.map((pkg) => {
          const isExpanded = expandedPackageId === pkg.id;

          return (
            <div
              key={pkg.id}
              className="flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:border-teal-400 hover:shadow-md"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {pkg.badge && (
                      <span className="mb-1.5 inline-block rounded-md bg-teal-50 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-teal-800 border border-teal-200">
                        {pkg.badge}
                      </span>
                    )}
                    <h3 className="text-base font-bold text-slate-900 font-heading">
                      {pkg.name}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="flex items-baseline gap-1.5 justify-end">
                      <span className="text-xl font-black text-slate-900">₹{pkg.price}</span>
                      <span className="text-xs text-slate-400 line-through">₹{pkg.originalPrice}</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600">
                      {pkg.discountPercentage}% OFF
                    </span>
                  </div>
                </div>

                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Key Attributes Pills */}
                <div className="mt-3.5 flex flex-wrap gap-2 text-[11px]">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 font-medium text-slate-700">
                    <FlaskConical className="h-3 w-3 text-teal-700" />
                    {pkg.testCount} Tests Included
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2 py-1 font-medium text-slate-700">
                    Sample: {pkg.sampleType}
                  </span>
                  <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 font-medium ${
                    pkg.fastingRequired ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-emerald-800'
                  }`}>
                    {pkg.fastingRequired ? `Fasting ${pkg.fastingHours}h req.` : 'No fasting required'}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-teal-50 px-2 py-1 font-medium text-teal-800">
                    <Clock className="h-3 w-3 text-teal-600" />
                    Report in {pkg.reportTurnaroundHours}h
                  </span>
                </div>

                {/* Expandable Parameters List */}
                <div className="mt-4 border-t border-slate-100 pt-3">
                  <button
                    onClick={() => setExpandedPackageId(isExpanded ? null : pkg.id)}
                    className="flex items-center justify-between w-full text-xs font-bold text-teal-800 hover:text-teal-900"
                  >
                    <span>{isExpanded ? 'Hide test parameters' : `View all ${pkg.parameters.length} test groups`}</span>
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  {isExpanded && (
                    <ul className="mt-3 space-y-1.5 rounded-2xl bg-slate-50 p-3.5 text-xs text-slate-700">
                      {pkg.parameters.map((param, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 mt-0.5 shrink-0" />
                          <span>{param}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Free Home Collection</span>
                </div>

                <button
                  onClick={() => handleBookTestClick(pkg)}
                  className="rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-teal-800 active:scale-95"
                >
                  Book Test
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* How Home Collection Works */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 font-heading">
          How Home Sample Collection Works
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Zero hassle, hospital-grade sterile collection at your doorstep
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 font-black text-sm">
              1
            </div>
            <h4 className="mt-2.5 text-xs font-bold text-slate-900">Select Package</h4>
            <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
              Choose your health package and pick a convenient morning time slot.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 font-black text-sm">
              2
            </div>
            <h4 className="mt-2.5 text-xs font-bold text-slate-900">Home Sample Pickup</h4>
            <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
              Certified technician arrives with temperature-controlled sterile equipment.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 font-black text-sm">
              3
            </div>
            <h4 className="mt-2.5 text-xs font-bold text-slate-900">NABL Lab Processing</h4>
            <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
              Barcoded vials analyzed on automated multi-stage robotic analyzers.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 font-black text-sm">
              4
            </div>
            <h4 className="mt-2.5 text-xs font-bold text-slate-900">Digital Smart Report</h4>
            <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
              Download PDF report directly to your SehatSetu Medical Vault within 24h.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Modal */}
      {bookingPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                  Confirm Home Sample Collection
                </span>
                <h3 className="text-lg font-black text-slate-900 font-heading">
                  {bookingPackage.name}
                </h3>
              </div>
              <button
                onClick={() => setBookingPackage(null)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            {/* Price banner */}
            <div className="mt-4 rounded-2xl bg-teal-50 p-3.5 border border-teal-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-600 block">Total Payable at Home Collection:</span>
                <span className="text-xl font-black text-teal-950">₹{bookingPackage.price}</span>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                Free Sample Pickup
              </span>
            </div>

            <form onSubmit={handleConfirmBooking} className="mt-4 space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Patient Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2 text-xs outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Contact Phone (for WhatsApp Report)</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2 text-xs outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Home Collection Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <textarea
                    required
                    rows={2}
                    value={sampleAddress}
                    onChange={(e) => setSampleAddress(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2 text-xs outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Collection Slot</label>
                <select
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-teal-500"
                >
                  <option>Tomorrow, 06:30 AM - 07:30 AM (Fasting)</option>
                  <option>Tomorrow, 07:30 AM - 08:30 AM (Fasting)</option>
                  <option>Tomorrow, 08:30 AM - 09:30 AM (Fasting)</option>
                  <option>Tomorrow, 10:00 AM - 11:30 AM (Non-fasting)</option>
                  <option>Day After Tomorrow, 07:00 AM - 08:00 AM (Fasting)</option>
                </select>
              </div>

              {bookingPackage.fastingRequired && (
                <div className="rounded-xl bg-amber-50 p-2.5 text-[11px] text-amber-900 border border-amber-200 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Fasting Reminder:</strong> Please avoid all food and caloric beverages for {bookingPackage.fastingHours} hours prior to collection. Plain water is permitted.
                  </span>
                </div>
              )}

              <div className="mt-5 flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setBookingPackage(null)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-teal-700 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-teal-800"
                >
                  Confirm & Schedule
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
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>

            <h3 className="mt-3 text-lg font-black text-slate-900 font-heading">
              Home Collection Scheduled!
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Your appointment for <strong>{bookingPackage?.name}</strong> has been confirmed. A certified phlebotomist will arrive on {bookingDate}.
            </p>

            <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-left text-xs space-y-1">
              <div className="text-slate-500">Patient: <strong className="text-slate-900">{patientName}</strong></div>
              <div className="text-slate-500">Address: <strong className="text-slate-900">{sampleAddress}</strong></div>
              <div className="text-slate-500">Order saved to: <strong className="text-emerald-700">Medical Vault</strong></div>
            </div>

            <button
              onClick={() => {
                setIsSuccessModalOpen(false);
                setBookingPackage(null);
                showToast('Lab test order confirmed and added to your Health Records!');
              }}
              className="mt-5 w-full rounded-xl bg-teal-700 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-teal-800"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
