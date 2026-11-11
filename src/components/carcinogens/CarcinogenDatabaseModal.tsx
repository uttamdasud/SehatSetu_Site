import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  ShieldAlert,
  Search,
  CheckCircle2,
  Sparkles,
  Phone,
  Info,
  Flame,
  ArrowRight,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { CARCINOGENS_DATABASE, CarcinogenItem, IarcGroup } from '../../data/carcinogensData';
import { useApp } from '../../context/AppContext';
import { useEscapeKey } from '../../utils/useEscapeKey';

export const CarcinogenDatabaseModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEscapeKey(onClose);
  const { setSelectedSpecialtyFilter, setActiveTab, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedIarc, setSelectedIarc] = useState<string>('ALL');

  const categories = ['ALL', 'Tobacco & Areca Nut', 'Air & Environmental', 'Dietary & Water', 'Biological & Infectious'];

  const filteredCarcinogens = CARCINOGENS_DATABASE.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      item.name.toLowerCase().includes(q) ||
      item.hindiName.toLowerCase().includes(q) ||
      item.targetOrgans.some((org) => org.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q);

    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesIarc = selectedIarc === 'ALL' || item.iarcClassification === selectedIarc;

    return matchesSearch && matchesCategory && matchesIarc;
  });

  const handleConsultOncologist = () => {
    onClose();
    setSelectedSpecialtyFilter('Oncologist');
    setActiveTab('find-doctors');
    showToast('Showing verified Oncologists & Cancer Screening Specialists');
  };

  return (
    <div
      id="carcinogen-database-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-5xl bg-white rounded-3xl p-6 shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-rose-700 text-white flex items-center justify-center shadow-xs">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-heading text-slate-900">
                  Know Carcinogens — Public Cancer Awareness & Prevention
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                  IARC / WHO Database
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Identify cancer-causing agents, Indian epidemiological threats, early warning signs & safe alternatives
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

        {/* National Emergency Banner */}
        <div className="mt-3.5 p-4 rounded-2xl bg-gradient-to-r from-rose-950 via-slate-900 to-rose-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-rose-200">50% of All Cancers in India are 100% Preventable</div>
              <p className="text-[11px] text-white/90">
                Tobacco (Gutkha/Bidi) alone causes over 300,000 cancer deaths yearly in India. Early detection cures &gt; 80%.
              </p>
            </div>
          </div>
          <button
            onClick={handleConsultOncologist}
            className="shrink-0 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition flex items-center gap-1.5 shadow-xs"
          >
            <span>Consult Oncologist</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search Bar & Filter Tabs */}
        <div className="mt-3.5 space-y-2.5 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search carcinogen (e.g. Gutkha, Supari, Bidi, Arsenic, HPV, Reheated oil)..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-600 focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-rose-700 text-white border-rose-700 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-1.5 text-xs">
              <span className="text-[11px] text-slate-400 font-medium">IARC Group:</span>
              {['ALL', 'Group 1', 'Group 2A'].map((grp) => (
                <button
                  key={grp}
                  onClick={() => setSelectedIarc(grp)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                    selectedIarc === grp
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {grp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Carcinogen Database Cards */}
        <div className="mt-4 flex-1 overflow-y-auto pr-1 space-y-4">
          {filteredCarcinogens.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-rose-300 hover:shadow-xs transition space-y-4"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200">
                      {item.iarcClassification}: Proven Carcinogen
                    </span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      item.indiaContext.exposureSeverity.includes('CRITICAL')
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {item.indiaContext.exposureSeverity}
                    </span>
                  </div>
                  <h4 className="text-base font-black text-slate-900 font-heading">
                    {item.name}
                  </h4>
                  <span className="text-xs font-semibold text-rose-800 mt-0.5 block">
                    {item.hindiName}
                  </span>
                </div>

                <div className="shrink-0 text-right">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Target Organs</span>
                  <div className="flex flex-wrap gap-1 mt-1 justify-end">
                    {item.targetOrgans.map((org, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold text-[10px]">
                        {org}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* India Context & Global Burden */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block mb-1">
                    Indian Impact & Exposed Demographics
                  </span>
                  <p className="text-amber-950 text-[11px] leading-relaxed">
                    {item.indiaContext.affectedPopulation}
                  </p>
                  <p className="text-amber-900 font-bold text-[11px] mt-1.5">
                    Annual Cases: {item.indiaContext.annualCasesIndia}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Common Consumption Forms & Mutagenic Mechanism
                  </span>
                  <div className="flex flex-wrap gap-1 mb-1.5">
                    {item.indiaContext.commonForms.map((form, i) => (
                      <span key={i} className="px-1.5 py-0.5 rounded bg-white text-slate-700 text-[10px] border border-slate-200">
                        {form}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {item.mechanism}
                  </p>
                </div>
              </div>

              {/* Early Warning Signs & Safe Alternatives */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Warning signs */}
                <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-900 block mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    Early Warning Symptoms (Do Not Ignore!)
                  </span>
                  <ul className="space-y-1.5 text-rose-950 text-[11px]">
                    {item.earlyWarningSigns.map((sign, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Safe Alternatives */}
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Safe Non-Carcinogenic Alternatives & Quitting Tips
                  </span>
                  <ul className="space-y-1.5 text-emerald-950 text-[11px]">
                    {item.safeAlternatives.map((alt, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span>{alt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Screening & Prevention Protocol */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-slate-800">Recommended Screening Protocol: </span>
                  <span className="text-slate-600">{item.screeningAndPrevention}</span>
                </div>
                <button
                  onClick={handleConsultOncologist}
                  className="shrink-0 text-rose-700 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Book Screening</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            Source: WHO International Agency for Research on Cancer (IARC) Monographs & Tata Memorial Centre
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
          >
            Close Knowledge Base
          </button>
        </div>
      </div>
    </div>
  );
};
