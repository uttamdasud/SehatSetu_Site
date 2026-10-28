import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Search,
  Video,
  UserCheck,
  BrainCircuit,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Clock,
  Building2,
  Stethoscope,
  ChevronRight,
  MapPin,
  HeartPulse,
  Baby,
  Activity,
  Bone,
  Ear,
  Smile,
  Brain,
  Leaf,
  Eye,
  Flame,
  Wind,
  Droplets,
  Scissors,
  Dumbbell,
  Grid,
  Award,
  Zap,
  Users,
  CheckCircle2,
  Car,
  BookOpen,
  MessageCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  SPECIALTIES,
  PRACTO_SYMPTOMS,
  MOCK_HEALTH_ARTICLES,
} from '../../data/mockData';
import { Doctor, SpecialtyType, HealthArticle } from '../../types';
import { CarePlusModal } from '../plus/CarePlusModal';
import { ArticleDetailModal } from '../articles/ArticleDetailModal';

export const HomeScreen: React.FC = () => {
  const {
    doctors,
    setActiveTab,
    setSelectedDoctor,
    startBooking,
    startInstantConsultation,
    setSelectedSpecialtyFilter,
    setSearchQuery,
    setActiveScreen,
    currentLocation,
  } = useApp();

  const [isCarePlusOpen, setIsCarePlusOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<HealthArticle | null>(null);

  // Live Instant Home Search State
  const [homeSearchInput, setHomeSearchInput] = useState('');
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);
  const searchInputContainerRef = React.useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cleanTerm = homeSearchInput.trim().toLowerCase();

  const matchingDoctors = cleanTerm
    ? doctors.filter(
        (d) =>
          d.name.toLowerCase().includes(cleanTerm) ||
          d.specialty.toLowerCase().includes(cleanTerm) ||
          d.hospital.toLowerCase().includes(cleanTerm)
      ).slice(0, 4)
    : [];

  const matchingSpecialties = cleanTerm
    ? SPECIALTIES.filter(
        (s) =>
          s.name.toLowerCase().includes(cleanTerm) ||
          s.commonSymptoms.some((sym) => sym.toLowerCase().includes(cleanTerm))
      ).slice(0, 3)
    : [];

  const hasAnyMatches =
    matchingDoctors.length > 0 ||
    matchingSpecialties.length > 0;

  const availableDoctors = doctors.slice(0, 5);

  const getSpecialtyIcon = (name: string) => {
    switch (name) {
      case 'General Physician':
        return <Stethoscope className="w-5 h-5 text-emerald-700" />;
      case 'Child Specialist':
      case 'Pediatrician':
        return <Baby className="w-5 h-5 text-sky-600" />;
      case 'Gynecologist':
        return <Activity className="w-5 h-5 text-pink-600" />;
      case 'Dermatologist':
        return <Sparkles className="w-5 h-5 text-amber-600" />;
      case 'Orthopedic':
        return <Bone className="w-5 h-5 text-orange-600" />;
      case 'Cardiologist':
        return <HeartPulse className="w-5 h-5 text-rose-600" />;
      case 'Neurologist':
        return <Brain className="w-5 h-5 text-purple-600" />;
      case 'ENT':
        return <Ear className="w-5 h-5 text-indigo-600" />;
      case 'Eye Specialist':
        return <Eye className="w-5 h-5 text-cyan-600" />;
      case 'Dentist':
        return <Smile className="w-5 h-5 text-teal-600" />;
      case 'Gastroenterologist':
        return <Flame className="w-5 h-5 text-amber-700" />;
      case 'Urologist':
        return <Droplets className="w-5 h-5 text-blue-600" />;
      case 'General Surgeon':
        return <Scissors className="w-5 h-5 text-emerald-800" />;
      case 'Physiotherapist':
        return <Dumbbell className="w-5 h-5 text-lime-600" />;
      default:
        return <Stethoscope className="w-5 h-5 text-emerald-700" />;
    }
  };

  const getSymptomIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-5 h-5 text-pink-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-600" />;
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5 text-emerald-700" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-rose-600" />;
      case 'Baby':
        return <Baby className="w-5 h-5 text-sky-600" />;
      case 'Brain':
        return <Brain className="w-5 h-5 text-purple-600" />;
      case 'Bone':
        return <Bone className="w-5 h-5 text-orange-600" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-teal-600" />;
      default:
        return <Activity className="w-5 h-5 text-emerald-700" />;
    }
  };

  const handleSpecialtyClick = (specialty: SpecialtyType) => {
    setSelectedSpecialtyFilter(specialty);
    setActiveTab('find-doctors');
  };

  const handleSymptomClick = (specialty: SpecialtyType) => {
    setSelectedSpecialtyFilter(specialty);
    setActiveTab('find-doctors');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (homeSearchInput.trim()) {
      setSearchQuery(homeSearchInput.trim());
    }
    setIsSearchDropdownOpen(false);
    setActiveTab('find-doctors');
  };

  return (
    <div id="home-screen-view" className="space-y-7 pb-24 pt-4">
      {/* 1. Main Hero Section */}
      <section className="overflow-hidden rounded-[2.5rem] border border-emerald-100 bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 text-white shadow-[0_24px_60px_rgba(13,58,48,0.28)]">
        <div className="grid gap-8 p-6 md:grid-cols-[1.3fr_0.7fr] md:p-8 xl:p-10">
          <div className="flex flex-col justify-center">
            <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-100 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              India's Trusted Digital Health Network
            </span>

            <h1 className="max-w-xl text-3xl font-black tracking-tight text-white md:text-5xl font-heading leading-tight">
              Better Healthcare, Connected & Simple.
            </h1>
            <p className="mt-3.5 max-w-xl text-xs leading-relaxed text-emerald-50/90 md:text-sm">
              Instant 60-second video consults and confirmed in-clinic appointments in {currentLocation.city}.
            </p>

            {/* Smart Live Instant Search Bar */}
            <div ref={searchContainerRef} className="relative mt-6 z-30">
              <form
                onSubmit={handleSearchSubmit}
                className="flex flex-col gap-2 rounded-2xl bg-white/10 p-2.5 backdrop-blur-md md:flex-row md:items-center"
              >
                <div ref={searchInputContainerRef} className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="home-main-search-input"
                    type="text"
                    value={homeSearchInput}
                    placeholder="Type doctor, specialty, or symptom (e.g. fever, skin, heart)..."
                    onFocus={() => {
                      if (homeSearchInput.trim().length > 0) {
                        setIsSearchDropdownOpen(true);
                      }
                    }}
                    onChange={(e) => {
                      setHomeSearchInput(e.target.value);
                      setIsSearchDropdownOpen(true);
                    }}
                    className="w-full rounded-xl border border-white/10 bg-white px-10 py-3 text-xs md:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-300"
                  />
                  {homeSearchInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setHomeSearchInput('');
                        setIsSearchDropdownOpen(false);
                      }}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-500 px-5 py-3 text-xs md:text-sm font-black text-emerald-950 transition hover:bg-emerald-400 shadow-sm shrink-0"
                >
                  Find Care
                </button>
              </form>

              {/* Floating Instant Live Autocomplete Suggestions Dropdown */}
              {isSearchDropdownOpen &&
                homeSearchInput.trim().length > 0 &&
                searchInputContainerRef.current &&
                createPortal(
                  <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden text-slate-900 z-50 max-h-[26rem] overflow-y-auto">
                  {hasAnyMatches ? (
                    <div className="p-3 space-y-3.5">
                      {/* Doctors Matches */}
                      {matchingDoctors.length > 0 && (
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2 px-1 flex items-center justify-between">
                            <span>Doctors & Practitioners</span>
                            <span className="text-emerald-700 font-bold">{matchingDoctors.length} found</span>
                          </div>
                          <div className="space-y-1.5">
                            {matchingDoctors.map((doc) => (
                              <div
                                key={doc.id}
                                onClick={() => {
                                  setIsSearchDropdownOpen(false);
                                  startBooking(doc);
                                }}
                                className="cursor-pointer flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50 transition border border-transparent hover:border-emerald-100"
                              >
                                <div className="flex items-center gap-2.5">
                                  <img
                                    src={doc.image}
                                    alt={doc.name}
                                    className="h-10 w-10 rounded-xl object-cover ring-1 ring-slate-100"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div>
                                    <div className="flex items-center gap-1.5">
                                      <h5 className="text-xs font-bold text-slate-900">{doc.name}</h5>
                                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.2 rounded">
                                        ★ {doc.rating}
                                      </span>
                                    </div>
                                    <div className="text-[11px] text-slate-500">
                                      {doc.specialty} · {doc.hospital}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="text-xs font-black text-slate-900 block">₹{doc.feeVideo}</span>
                                  <span className="text-[10px] font-bold text-emerald-700">Book Slot →</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Specialties Matches */}
                      {matchingSpecialties.length > 0 && (
                        <div className="border-t border-slate-100 pt-2.5">
                          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2 px-1">
                            Medical Specialties
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {matchingSpecialties.map((spec) => (
                              <button
                                key={spec.id}
                                type="button"
                                onClick={() => {
                                  setIsSearchDropdownOpen(false);
                                  setSelectedSpecialtyFilter(spec.id);
                                  setActiveTab('find-doctors');
                                }}
                                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-800 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-900 transition"
                              >
                                {getSpecialtyIcon(spec.id)}
                                <span>{spec.name}</span>
                                <span className="text-[10px] text-slate-400">({spec.doctorCount})</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* View All Matches Footer */}
                      <div className="border-t border-slate-100 pt-2 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setIsSearchDropdownOpen(false);
                            setSearchQuery(homeSearchInput.trim());
                            setActiveTab('find-doctors');
                          }}
                          className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center justify-center gap-1 mx-auto"
                        >
                          <span>See all results for "{homeSearchInput}"</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-xs text-slate-500">
                      <p>No exact match found for "<strong>{homeSearchInput}</strong>".</p>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSearchDropdownOpen(false);
                          setSearchQuery(homeSearchInput.trim());
                          setActiveTab('find-doctors');
                        }}
                        className="mt-2 text-xs font-bold text-emerald-700 hover:underline"
                      >
                        Search all doctor profiles →
                      </button>
                    </div>
                  )}
                  </div>,
                  searchInputContainerRef.current,
                )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-emerald-50/90">
              <div>
                <span className="block text-xl font-black text-white">60 Secs</span>
                <span>teleconsult connect</span>
              </div>
              <div className="border-l border-white/20 pl-6">
                <span className="block text-xl font-black text-white">100%</span>
                <span>verified doctors</span>
              </div>
              <div className="border-l border-white/20 pl-6">
                <span className="block text-xl font-black text-white">24/7</span>
                <span>care access</span>
              </div>
            </div>
          </div>

          {/* Quick Doctor Live Float Card */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-md">
              <div className="rounded-[1.5rem] bg-white p-4.5 text-slate-900 shadow-sm">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 block">
                      Doctor Online Now
                    </span>
                    <h3 className="mt-0.5 text-base font-black font-heading">Dr. Aisha Roy</h3>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-800">
                    Active
                  </span>
                </div>

                <div className="rounded-2xl bg-slate-50 p-3 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200"
                      alt="Doctor"
                      className="h-12 w-12 rounded-xl object-cover ring-2 ring-emerald-200"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">General Physician</div>
                      <div className="text-[11px] text-slate-500">Wait time: &lt; 60 seconds</div>
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="rounded-xl bg-emerald-50 p-2.5 border border-emerald-100">
                    <div className="font-black text-emerald-950">₹299</div>
                    <div className="text-[10px] text-emerald-700">Video Call</div>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                    <div className="font-black text-slate-900">₹450</div>
                    <div className="text-[10px] text-slate-500">Clinic Visit</div>
                  </div>
                </div>

                <button
                  onClick={() => startInstantConsultation()}
                  className="mt-3.5 w-full rounded-xl bg-emerald-700 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-800 active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Video className="w-4 h-4" />
                  <span>Start Video Consult Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Practo-Style 4 Core Pillars Discovery Grid */}
      <section className="space-y-3">
        <div className="px-1 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-heading">
              Healthcare Services
            </h2>
            <span className="text-xs text-slate-500">Explore our available healthcare services</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Card 1: Instant Video Consult */}
          <div
            onClick={() => startInstantConsultation()}
            className="group cursor-pointer rounded-3xl p-5 border border-blue-200/80 bg-gradient-to-br from-[#AFCFED]/30 via-sky-50 to-white shadow-xs hover:shadow-md hover:border-blue-300 transition-all active:scale-[0.98] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="rounded-full bg-blue-100 text-blue-900 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
                  60 Secs SLA
                </span>
                <div className="h-10 w-10 rounded-2xl bg-blue-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <Video className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 font-heading">
                Instant Video Consult
              </h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Connect with verified doctors in under 60 seconds. Digital prescription included.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between text-xs font-bold text-blue-900">
              <span>From ₹299</span>
              <span className="flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                Consult Now <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Card 2: Find In-Clinic Doctors */}
          <div
            onClick={() => {
              setSelectedSpecialtyFilter('ALL');
              setActiveTab('find-doctors');
            }}
            className="group cursor-pointer rounded-3xl p-5 border border-teal-200/80 bg-gradient-to-br from-[#98CBD6]/30 via-teal-50 to-white shadow-xs hover:shadow-md hover:border-teal-300 transition-all active:scale-[0.98] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="rounded-full bg-teal-100 text-teal-900 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
                  Confirmed Slots
                </span>
                <div className="h-10 w-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <UserCheck className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 font-heading">
                Find Doctors Near You
              </h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Book physical in-clinic visits with verified specialists across your city.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-teal-100 flex items-center justify-between text-xs font-bold text-teal-900">
              <span>Zero Waiting Fee</span>
              <span className="flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                Find Doctors <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Practo-Style 1-Click Common Health Concern Symptoms */}
      <section className="space-y-3">
        <div className="px-1 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-heading">
              Consult Top Specialists for Any Health Concern
            </h2>
            <span className="text-xs text-slate-500">Private & secure consultations with verified doctors</span>
          </div>
          <button
            onClick={() => setActiveTab('find-doctors')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
          >
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
          {PRACTO_SYMPTOMS.map((sym) => (
            <div
              key={sym.id}
              onClick={() => handleSymptomClick(sym.specialty)}
              className={`cursor-pointer rounded-2xl border border-slate-200/80 bg-gradient-to-br ${sym.bgGradient} p-4 transition-all hover:shadow-xs active:scale-[0.98] flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-xl bg-white shadow-2xs">
                    {getSymptomIcon(sym.iconName)}
                  </div>
                  <span className="rounded-md bg-white/90 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-slate-700 shadow-2xs">
                    {sym.badge}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 font-heading leading-tight">
                  {sym.label}
                </h4>
                <p className="mt-0.5 text-[11px] text-slate-500 truncate">
                  {sym.sublabel}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/50 flex items-center justify-between text-[11px] font-bold text-emerald-800">
                <span>{sym.specialty}</span>
                <span className="flex items-center gap-0.5 hover:underline">
                  Consult <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SehatSetu Care Plus VIP Pass Banner (Practo Plus equivalent) */}
      <section className="relative overflow-hidden rounded-[2rem] border border-amber-300 bg-gradient-to-r from-amber-500 via-orange-500 to-purple-900 p-6 text-white shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-amber-100 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>SehatSetu Care Plus Membership</span>
            </span>

            <h3 className="mt-2 text-xl font-black font-heading md:text-2xl">
              Unlimited Doctor Consultations for 6 Family Members
            </h3>
            <p className="mt-1 text-xs text-amber-100/90 leading-relaxed">
              Get 24/7 instant free video consults and zero platform booking fee.
            </p>

            <div className="mt-3 flex flex-wrap gap-3 text-xs font-bold text-white">
              <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-300" /> ₹0 Video Consult Fee
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-300" /> Priority Connect
              </span>
            </div>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => setIsCarePlusOpen(true)}
              className="rounded-2xl bg-white px-5 py-3 text-xs md:text-sm font-black text-amber-950 shadow-md transition hover:bg-amber-50 active:scale-95 flex items-center gap-2"
            >
              <span>Explore Plus Plans</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="absolute -right-8 -bottom-8 h-48 w-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </section>

      {/* 6. AI Clinical Symptom Checker Card */}
      <section className="rounded-3xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/50 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <BrainCircuit className="w-4 h-4 text-emerald-600" />
              <span>AI Clinical Triage Assistant</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Unsure which doctor you need?
            </h3>
            <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
              Describe your symptoms in natural language (e.g. "headache with blurry vision since yesterday"). Our AI clinical navigator evaluates urgency and guides you to the right specialist.
            </p>
          </div>

          <button
            onClick={() => setActiveScreen('symptom-checker')}
            className="rounded-2xl bg-emerald-800 px-5 py-3 text-xs font-bold text-white shadow-xs hover:bg-emerald-900 transition active:scale-95 flex items-center justify-center gap-2 shrink-0"
          >
            <span>Launch Symptom Navigator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 7. Explore Medical Specialties */}
      <section className="space-y-3">
        <div className="px-1 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-heading">
              Browse by Medical Discipline
            </h2>
            <span className="text-xs text-slate-500">Find doctors by specialty</span>
          </div>
          <button
            onClick={() => {
              setSelectedSpecialtyFilter('ALL');
              setActiveTab('find-doctors');
            }}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
          {SPECIALTIES.map((spec) => (
            <button
              key={spec.id}
              onClick={() => handleSpecialtyClick(spec.id)}
              className="min-w-[120px] rounded-2xl border border-slate-200/80 bg-white p-3 text-center flex flex-col items-center justify-between shrink-0 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition active:scale-95"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-2">
                {getSpecialtyIcon(spec.id)}
              </div>
              <h4 className="text-xs font-bold text-slate-900 truncate leading-tight w-full">
                {spec.name}
              </h4>
              <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                {spec.doctorCount} Doctors
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 8. Available Verified Doctors Near You */}
      <section className="space-y-3">
        <div className="px-1 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-heading">
              Verified Doctors in {currentLocation.city}
            </h2>
            <span className="text-xs text-slate-500">Confirmed availability with direct booking</span>
          </div>
          <button
            onClick={() => setActiveTab('find-doctors')}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
          >
            <span>See All Doctors</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          {availableDoctors.map((doc) => (
            <div
              key={doc.id}
              className="rounded-3xl border border-slate-200/90 bg-white p-4.5 shadow-xs hover:border-slate-300 transition flex flex-col justify-between"
            >
              <div className="flex items-start gap-3.5">
                <div className="relative shrink-0">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="h-16 w-16 rounded-2xl object-cover ring-2 ring-slate-100"
                    referrerPolicy="no-referrer"
                  />
                  {doc.isAvailableNow && (
                    <span
                      className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white"
                      title="Available Now"
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 truncate">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{doc.name}</h4>
                      {doc.verified && (
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-900 border border-amber-200">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span>{doc.rating}</span>
                      <span className="text-[9px] text-amber-700 font-normal">({doc.reviewCount})</span>
                    </div>
                  </div>

                  <div className="text-xs font-medium text-emerald-800 mt-0.5">{doc.specialty}</div>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5">
                    {doc.qualifications} • {doc.experienceYears} yrs exp
                  </div>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5 flex items-center gap-1">
                    <Building2 className="h-3 w-3 text-slate-400 shrink-0" />
                    <span>{doc.hospital}</span>
                  </div>
                </div>
              </div>

              {/* Dual Fee Bar & Booking CTA */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-emerald-800 font-bold text-[10px]">
                    Video ₹{doc.feeVideo}
                  </span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-slate-700 font-medium text-[10px]">
                    Clinic ₹{doc.feeInClinic}
                  </span>
                </div>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => startBooking(doc, 'VIDEO')}
                    className="rounded-xl border border-emerald-600 px-3 py-1.5 text-[11px] font-bold text-emerald-700 hover:bg-emerald-50"
                  >
                    Video Slot
                  </button>
                  <button
                    onClick={() => startBooking(doc, 'IN_CLINIC')}
                    className="rounded-xl bg-emerald-700 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-emerald-800 shadow-2xs"
                  >
                    Book Clinic
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Practo Healthfeed Articles (Patient Education by Doctors) */}
      <section className="space-y-3">
        <div className="px-1 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-heading">
              Read Top Health Articles
            </h2>
            <span className="text-xs text-slate-500">Doctor-verified wellness and prevention insights</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {MOCK_HEALTH_ARTICLES.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="cursor-pointer overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs transition hover:border-slate-300 hover:shadow-md flex flex-col justify-between"
            >
              <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2.5 left-2.5 rounded-md bg-white/90 backdrop-blur-xs px-2 py-0.5 text-[9px] font-black uppercase text-slate-800 shadow-xs">
                  {art.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 font-heading leading-tight line-clamp-2">
                    {art.title}
                  </h4>
                  <p className="mt-1 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{art.doctorAuthorName}</span>
                  <span className="flex items-center gap-1 font-bold text-emerald-700">
                    Read <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Verified Patient Testimonials (Practo Social Proof) */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 font-heading">
            What Patients Say About SehatSetu
          </h3>
          <p className="text-xs text-slate-500">Trusted by thousands of families across India</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <div className="flex gap-1 text-amber-400 mb-2">
              {'★★★★★'.split('').map((s, i) => (
                <span key={i} className="text-xs">★</span>
              ))}
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              "Connected with a general physician within 45 seconds at 11 PM when my daughter had a 102°F fever. The digital prescription worked immediately at our pharmacy."
            </p>
            <div className="mt-3 text-[11px] font-bold text-slate-900">
              — Amit Sharma, Bengaluru
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <div className="flex gap-1 text-amber-400 mb-2">
              {'★★★★★'.split('').map((s, i) => (
                <span key={i} className="text-xs">★</span>
              ))}
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              "The doctor explained every step clearly and answered all my questions during the consultation."
            </p>
            <div className="mt-3 text-[11px] font-bold text-slate-900">
              — Jyothi Bhatia, Kolkata
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
            <div className="flex gap-1 text-amber-400 mb-2">
              {'★★★★★'.split('').map((s, i) => (
                <span key={i} className="text-xs">★</span>
              ))}
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed">
              "I found a nearby specialist quickly and booked an appointment without any hassle."
            </p>
            <div className="mt-3 text-[11px] font-bold text-slate-900">
              — Avinash Kumar, Delhi
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <CarePlusModal isOpen={isCarePlusOpen} onClose={() => setIsCarePlusOpen(false)} />
      <ArticleDetailModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
    </div>
  );
};
