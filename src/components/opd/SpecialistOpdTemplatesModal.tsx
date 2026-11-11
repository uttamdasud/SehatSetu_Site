import React, { useState } from 'react';
import { X, FileText, HeartPulse, Sparkles, Baby, Stethoscope, Bone, Activity, AlertTriangle, Check, Copy, Printer } from 'lucide-react';
import { SPECIALIST_OPD_TEMPLATES, SpecialistOpdTemplate } from '../../data/opdTemplatesData';
import { useApp } from '../../context/AppContext';
import { useEscapeKey } from '../../utils/useEscapeKey';

export const SpecialistOpdTemplatesModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEscapeKey(onClose);
  const { showToast } = useApp();
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('opd-cardio');
  const [patientName, setPatientName] = useState('Ratan Debnath');
  const [patientAge, setPatientAge] = useState('48');
  const [patientGender, setPatientGender] = useState('Male');

  const currentTemplate = SPECIALIST_OPD_TEMPLATES.find((t) => t.id === selectedTemplateId) || SPECIALIST_OPD_TEMPLATES[0];

  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string>(currentTemplate.commonDiagnoses[0]);
  const [selectedInvestigations, setSelectedInvestigations] = useState<string[]>([currentTemplate.commonInvestigations[0], currentTemplate.commonInvestigations[1]]);
  const [selectedAdvice, setSelectedAdvice] = useState<string[]>([currentTemplate.standardAdvice[0], currentTemplate.standardAdvice[1]]);
  const [customClinicalNotes, setCustomClinicalNotes] = useState('');

  const toggleInvestigation = (inv: string) => {
    setSelectedInvestigations((prev) =>
      prev.includes(inv) ? prev.filter((i) => i !== inv) : [...prev, inv]
    );
  };

  const toggleAdvice = (adv: string) => {
    setSelectedAdvice((prev) =>
      prev.includes(adv) ? prev.filter((a) => a !== adv) : [...prev, adv]
    );
  };

  const handleCopyNote = () => {
    const noteText = `=== SEHATSETU SPECIALIST OPD CLINICAL RECORD ===\nSpecialty: ${currentTemplate.specialty} (${currentTemplate.department})\nPatient: ${patientName}, ${patientAge}Y / ${patientGender}\nDate: ${new Date().toLocaleDateString('en-IN')}\n\nVitals Required: ${currentTemplate.vitalsRequired.join(', ')}\n\nPrimary Diagnosis: ${selectedDiagnosis}\n\nInvestigations Ordered:\n- ${selectedInvestigations.join('\n- ')}\n\nAdvice & Precautions:\n- ${selectedAdvice.join('\n- ')}\n\nRed Flags / Emergency SOS:\n- ${currentTemplate.emergencyRedFlags.join('\n- ')}\n\nDoctor Clinical Notes: ${customClinicalNotes || 'Examined thoroughly. Patient advised regular follow-up.'}`;
    navigator.clipboard.writeText(noteText);
    showToast('Structured OPD Clinical note copied to clipboard!');
  };

  const getSpecialtyIcon = (icon: string) => {
    switch (icon) {
      case 'HeartPulse':
        return <HeartPulse className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'Baby':
        return <Baby className="w-4 h-4" />;
      case 'Bone':
        return <Bone className="w-4 h-4" />;
      case 'Activity':
        return <Activity className="w-4 h-4" />;
      default:
        return <Stethoscope className="w-4 h-4" />;
    }
  };

  return (
    <div
      id="specialist-opd-templates-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-4xl bg-white rounded-3xl p-6 shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-heading text-slate-900">
                  Specialist OPD Clinical Documentation Templates
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Doctor Desk
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Departmental examination protocols, vitals benchmarks & standardized EMR notes
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

        {/* Specialty Selector Tabs */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar py-1 shrink-0">
          {SPECIALIST_OPD_TEMPLATES.map((tmpl) => {
            const isSelected = tmpl.id === selectedTemplateId;
            return (
              <button
                key={tmpl.id}
                onClick={() => {
                  setSelectedTemplateId(tmpl.id);
                  setSelectedDiagnosis(tmpl.commonDiagnoses[0]);
                  setSelectedInvestigations([tmpl.commonInvestigations[0], tmpl.commonInvestigations[1]]);
                  setSelectedAdvice([tmpl.standardAdvice[0], tmpl.standardAdvice[1]]);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {getSpecialtyIcon(tmpl.icon)}
                <span>{tmpl.specialty}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Template Body */}
        <div className="mt-4 flex-1 overflow-y-auto space-y-5 pr-1 text-slate-800 text-xs">
          {/* Patient Header Bar */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block">Patient Name</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="mt-1 w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-900"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block">Age & Gender</label>
              <div className="flex gap-1.5 mt-1">
                <input
                  type="text"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  className="w-16 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-slate-900"
                />
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                  className="flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold text-slate-900"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block">Clinical Department</label>
              <span className="mt-1.5 font-bold text-emerald-950 block truncate">{currentTemplate.department}</span>
            </div>
            <div className="flex items-end justify-end gap-2">
              <button
                onClick={handleCopyNote}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 text-white font-bold hover:bg-emerald-800 transition shadow-xs text-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy EMR Note</span>
              </button>
            </div>
          </div>

          {/* Vitals Required for this specialty */}
          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block mb-2">
              Mandatory OPD Vitals for {currentTemplate.specialty}
            </span>
            <div className="flex flex-wrap gap-2">
              {currentTemplate.vitalsRequired.map((vital, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-950 font-semibold text-[11px]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {vital}
                </span>
              ))}
            </div>
          </div>

          {/* Clinical Examination Protocols */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Structured Clinical Examination Checkpoints
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentTemplate.clinicalExaminationFields.map((field, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    {field.section}
                  </h5>
                  <ul className="space-y-1.5 text-slate-600 text-[11px]">
                    {field.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Common Diagnoses (1-Click Selector) */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900 block mb-2">
              Common {currentTemplate.specialty} Diagnoses (Select for Prescription)
            </span>
            <div className="flex flex-wrap gap-2">
              {currentTemplate.commonDiagnoses.map((diag, idx) => {
                const isSelected = selectedDiagnosis === diag;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDiagnosis(diag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                      isSelected
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {diag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Investigations & Standard Advice Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Investigations */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-2">
                Recommended Lab & Imaging Orders
              </span>
              <div className="space-y-1.5">
                {currentTemplate.commonInvestigations.map((inv, idx) => {
                  const checked = selectedInvestigations.includes(inv);
                  return (
                    <label
                      key={idx}
                      className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer text-[11px] text-slate-800"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleInvestigation(inv)}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{inv}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Standard Advice */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-2">
                Specialty Dietary & Lifestyle Advice
              </span>
              <div className="space-y-1.5">
                {currentTemplate.standardAdvice.map((adv, idx) => {
                  const checked = selectedAdvice.includes(adv);
                  return (
                    <label
                      key={idx}
                      className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer text-[11px] text-slate-800"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAdvice(adv)}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{adv}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Emergency Red Flags */}
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
            <div className="flex items-center gap-2 text-rose-800 font-bold mb-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Emergency Clinical Red Flags (Immediate Referral / Casualty Admission)</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-rose-900">
              {currentTemplate.emergencyRedFlags.map((flag, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Custom Notes */}
          <div>
            <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
              Additional Physician Clinical Impressions / Drug Rx
            </label>
            <textarea
              rows={3}
              value={customClinicalNotes}
              onChange={(e) => setCustomClinicalNotes(e.target.value)}
              placeholder="Enter patient-specific exam findings, customized medicines and dosages, or follow-up schedule..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            Standardized with National Health Mission (NHM) OPD guidelines
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleCopyNote}
              className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition"
            >
              Export EMR Note
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
