import React, { useState } from 'react';
import {
  Search,
  Percent,
  CheckCircle2,
  TrendingDown,
  Info,
  X,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Pill
} from 'lucide-react';
import { MEDICINE_COMPARISONS, MedicineComparisonItem } from '../../data/medicineComparisonData';
import { useApp } from '../../context/AppContext';
import { useEscapeKey } from '../../utils/useEscapeKey';

export const MedicineRateComparisonModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEscapeKey(onClose);
  const { showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Antibiotic', 'Diabetes', 'Cardiology / BP', 'Pain & Fever', 'Gastro / Acidity', 'Cholesterol', 'Allergy & Respiratory'];

  const filteredMedicines = MEDICINE_COMPARISONS.filter((med) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      med.brandName.toLowerCase().includes(q) ||
      med.saltComposition.toLowerCase().includes(q) ||
      med.genericName.toLowerCase().includes(q) ||
      med.manufacturer.toLowerCase().includes(q);

    const matchesCategory = selectedCategory === 'ALL' || med.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Calculate total monthly savings if user buys 1 of each filtered medicine
  const totalBrandCost = filteredMedicines.reduce((acc, m) => acc + m.brandPrice, 0);
  const totalGenericCost = filteredMedicines.reduce((acc, m) => acc + m.genericPrice, 0);
  const totalSavings = totalBrandCost - totalGenericCost;
  const overallSavingsPct = totalBrandCost > 0 ? Math.round((totalSavings / totalBrandCost) * 100) : 0;

  return (
    <div
      id="medicine-rate-comparison-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-4xl bg-white rounded-3xl p-6 shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-xs">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-heading text-slate-900">
                  Medicine Rate & Generic Salt Comparison Engine
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Jan Aushadhi
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Compare expensive branded medicines with identical salt generic alternatives & calculate savings
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

        {/* Savings Highlight Banner */}
        <div className="mt-3.5 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-200">National Health Savings Benchmark</div>
              <div className="text-sm font-black text-white">
                Generic medicines have the exact same active salt & therapeutic efficacy
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold shrink-0">
            <div>
              <span className="block text-[10px] text-emerald-300">Avg. Savings</span>
              <span className="text-base font-black text-emerald-300">70% to 88%</span>
            </div>
            <div className="border-l border-emerald-700 pl-4">
              <span className="block text-[10px] text-emerald-300">Govt PMBJP Approved</span>
              <span className="text-base font-black text-white">10,000+ Kendras</span>
            </div>
          </div>
        </div>

        {/* Search Bar & Categories */}
        <div className="mt-3.5 space-y-2.5 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by brand name (Augmentin, Pan-D, Glycomet) or salt (Amoxicillin, Pantoprazole)..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Medicines List */}
        <div className="mt-3 flex-1 overflow-y-auto pr-1 space-y-3">
          {filteredMedicines.map((med) => (
            <div
              key={med.id}
              className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-xs transition"
            >
              {/* Header row: Salt name & Category */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{med.saltComposition}</span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                      {med.strength}
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">
                      {med.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">
                    Timing: <strong>{med.foodTiming}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 font-black text-xs border border-emerald-200 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-700" />
                    Save ₹{med.savingsAmount.toFixed(2)} ({med.savingsPercentage}% Off)
                  </span>
                </div>
              </div>

              {/* Price Comparison Columns */}
              <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Expensive Brand */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Branded Commercial Medicine
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 font-heading">{med.brandName}</h4>
                    <span className="text-[11px] text-slate-500">Mfr: {med.manufacturer}</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200 flex items-baseline justify-between">
                    <span className="text-[11px] text-slate-500">Pack: {med.packSizeBrand}</span>
                    <span className="text-base font-black text-slate-900">₹{med.brandPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Generic Alternative */}
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                        Generic Equivalent (Same Salt)
                      </span>
                      {med.janAushadhiCode && (
                        <span className="text-[9px] font-bold bg-white text-emerald-800 px-1.5 py-0.2 rounded border border-emerald-200">
                          {med.janAushadhiCode}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-emerald-950 font-heading">{med.genericName}</h4>
                    <span className="text-[11px] text-emerald-800">Source: {med.genericSource}</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-emerald-200 flex items-baseline justify-between">
                    <span className="text-[11px] text-emerald-700">Pack: {med.packSizeGeneric}</span>
                    <span className="text-base font-black text-emerald-800">₹{med.genericPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Indications & Side Effects */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-600">
                <div className="truncate">
                  <span className="font-bold text-slate-800">Treats:</span> {med.indications.join(', ')}
                </div>
                <div className="shrink-0 text-slate-500">
                  <span className="font-bold text-slate-700">Dosage:</span> {med.dosageGuide}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer with Monthly Savings Calculator */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-600">
            For chronic illnesses (Diabetes, Hypertension, Heart), switching to Jan Aushadhi saves an average Indian family{' '}
            <strong className="text-emerald-800">₹14,000 - ₹25,000 annually</strong>.
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
          >
            Close Engine
          </button>
        </div>
      </div>
    </div>
  );
};
