import React, { useState } from 'react';
import {
  X,
  Brain,
  HeartPulse,
  Wind,
  Activity,
  Flame,
  Droplets,
  Bone,
  Sparkles,
  AlertCircle,
  Globe,
  MapPin,
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { ANATOMY_REGIONS, AnatomyRegion } from '../../data/anatomyData';
import { useApp } from '../../context/AppContext';
import { useEscapeKey } from '../../utils/useEscapeKey';

export const BodyAnatomyViewerModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEscapeKey(onClose);
  const { setSelectedSpecialtyFilter, setActiveTab, showToast } = useApp();
  const [selectedRegionId, setSelectedRegionId] = useState<string>('heart-cardiovascular');

  const currentRegion = ANATOMY_REGIONS.find((r) => r.id === selectedRegionId) || ANATOMY_REGIONS[0];

  const getRegionIcon = (icon: string) => {
    switch (icon) {
      case 'Brain':
        return <Brain className="w-5 h-5" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5" />;
      case 'Wind':
        return <Wind className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5" />;
      case 'Bone':
        return <Bone className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const handleConsultSpecialist = (specialty: string) => {
    onClose();
    // Map to specialty filter
    setSelectedSpecialtyFilter(specialty as any);
    setActiveTab('find-doctors');
    showToast(`Showing verified ${specialty} specialists in your area`);
  };

  return (
    <div
      id="body-anatomy-viewer-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-5xl bg-white rounded-3xl p-6 shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-teal-800 text-white flex items-center justify-center shadow-xs">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-heading text-slate-900">
                  Human Body Anatomy & Disease Intelligence
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                  Epidemiological Atlas
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Explore organ systems, disease prevalence in India vs Global, causative triggers & prevention
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

        {/* Anatomical Regions Selector Pill Ribbon */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar py-1 shrink-0">
          {ANATOMY_REGIONS.map((region) => {
            const isSelected = region.id === selectedRegionId;
            return (
              <button
                key={region.id}
                onClick={() => setSelectedRegionId(region.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-teal-800 text-white border-teal-800 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {getRegionIcon(region.icon)}
                <span>{region.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="mt-4 flex-1 overflow-y-auto space-y-6 pr-1 text-slate-800">
          {/* Region Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white/10 text-teal-300">
                {getRegionIcon(currentRegion.icon)}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300">
                  {currentRegion.system} · {currentRegion.hindiName}
                </span>
                <h4 className="text-lg font-black font-heading text-white">{currentRegion.name}</h4>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-xs font-bold text-teal-200 block">
                {currentRegion.commonDiseases.length} Major Pathologies
              </span>
              <span className="text-[10px] text-teal-300/80">ICMR & WHO Epidemiological Data</span>
            </div>
          </div>

          {/* Diseases for Selected Region */}
          <div className="space-y-5">
            {currentRegion.commonDiseases.map((disease, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-teal-200 hover:shadow-xs transition space-y-4"
              >
                {/* Disease Title & Specialty CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <h5 className="text-base font-black text-slate-900 font-heading">
                      {disease.name}
                    </h5>
                    <p className="text-xs text-slate-600 mt-0.5">{disease.description}</p>
                  </div>
                  <button
                    onClick={() => handleConsultSpecialist(disease.recommendedSpecialty)}
                    className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-800 text-white font-bold text-xs hover:bg-teal-900 transition shadow-xs"
                  >
                    <span>Consult {disease.recommendedSpecialty}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* India vs Global Occurrence Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* India Occurrence */}
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                    <div className="flex items-center gap-1.5 text-amber-900 font-bold mb-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>Occurrence & Burden in India</span>
                    </div>
                    <p className="text-amber-950 font-medium leading-relaxed text-[11px]">
                      {disease.indiaOccurrence}
                    </p>
                  </div>

                  {/* Global Occurrence */}
                  <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200">
                    <div className="flex items-center gap-1.5 text-sky-900 font-bold mb-1">
                      <Globe className="w-3.5 h-3.5 text-sky-600" />
                      <span>Global Occurrence & Worldwide Rank</span>
                    </div>
                    <p className="text-sky-950 font-medium leading-relaxed text-[11px]">
                      {disease.globalOccurrence}
                    </p>
                  </div>
                </div>

                {/* Responsible Factors & Lifestyle Triggers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                      Responsible Biological & Environmental Causes
                    </span>
                    <ul className="space-y-1.5 text-slate-700 text-[11px]">
                      {disease.responsibleFactors.map((factor, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                      Key Warning Symptoms to Watch
                    </span>
                    <ul className="space-y-1.5 text-slate-700 text-[11px]">
                      {disease.earlySymptoms.map((sym, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                          <span>{sym}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Evidence-Based Prevention Steps */}
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-900 font-bold mb-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Evidence-Based Prevention & Mitigation Protocols</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-emerald-950 text-[11px]">
                    {disease.preventionSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            Source: Indian Council of Medical Research (ICMR) & World Health Organization (WHO) Global Burden of Disease
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
          >
            Close Atlas
          </button>
        </div>
      </div>
    </div>
  );
};
