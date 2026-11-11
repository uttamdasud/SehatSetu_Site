import React, { useState } from 'react';
import {
  X,
  FileText,
  ShieldCheck,
  Download,
  ExternalLink,
  Search,
  CheckCircle2,
  Calendar,
  Building2,
  RefreshCw,
  PlusCircle,
  FileCheck2
} from 'lucide-react';
import { EXTERNAL_PLATFORM_RECORDS, ExternalMedicalRecord } from '../../data/externalReportsData';
import { useApp } from '../../context/AppContext';
import { useEscapeKey } from '../../utils/useEscapeKey';
import { PatientConsentModal } from '../legal/PatientConsentModal';

export const ExternalRecordsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEscapeKey(onClose);
  const { showToast, addMedicalRecord } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('ALL');
  const [isSyncing, setIsSyncing] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);

  const platforms = ['ALL', 'Apollo 24|7', 'Practo Health', 'DigiLocker / ABDM', 'Tata 1mg'];

  const filteredRecords = EXTERNAL_PLATFORM_RECORDS.filter((rec) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      rec.title.toLowerCase().includes(q) ||
      rec.doctorName.toLowerCase().includes(q) ||
      rec.diagnosisSummary.toLowerCase().includes(q) ||
      rec.sourcePlatform.toLowerCase().includes(q);

    const matchesPlatform = selectedPlatform === 'ALL' || rec.sourcePlatform === selectedPlatform;

    return matchesSearch && matchesPlatform;
  });

  const executeSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast('ABDM Health Gateway refreshed: 4 federated records synced via FHIR');
    }, 1200);
  };

  const handleSyncAbdm = () => {
    if (!hasConsent) {
      setShowConsentModal(true);
      return;
    }
    executeSync();
  };

  const handleImportToVault = (record: ExternalMedicalRecord) => {
    addMedicalRecord({
      title: `${record.sourcePlatform}: ${record.title}`,
      type: record.recordType === 'Lab Diagnostic' ? 'LAB_REPORT' : 'PRESCRIPTION',
      date: record.date,
      doctorOrLab: record.doctorName,
      patientName: 'Self',
      fileSize: record.fileSize,
      fileType: 'PDF',
      summary: record.diagnosisSummary,
      tags: ['Cross-Platform', record.sourcePlatform, record.recordType]
    });
    showToast(`"${record.title}" imported into your encrypted Medical Vault!`);
  };

  return (
    <div
      id="external-records-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-4xl bg-white rounded-3xl p-6 shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-indigo-700 text-white flex items-center justify-center shadow-xs">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-heading text-slate-900">
                  Cross-Platform Patient Records & Consultation History
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                  FHIR v4.0.1
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Federated health records synced from Apollo 24|7, Practo, DigiLocker, and Hospital EMRs via ABDM
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

        {/* Sync Status Banner */}
        <div className="mt-3.5 p-3.5 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-indigo-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-indigo-200">ABHA Health Information Exchange Active</div>
              <div className="text-[11px] text-white/90">
                Linked to ABHA: <strong>91-8842-9901-4431</strong> · Cryptographically signed by licensed practitioners
              </div>
            </div>
          </div>
          <button
            onClick={handleSyncAbdm}
            disabled={isSyncing}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-xs disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing ABDM Gateway...' : 'Sync External Records'}</span>
          </button>
        </div>

        {/* Search & Platform Filters */}
        <div className="mt-3.5 space-y-2.5 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports by doctor, hospital, diagnosis, or platform..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {platforms.map((plat) => (
              <button
                key={plat}
                onClick={() => setSelectedPlatform(plat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedPlatform === plat
                    ? 'bg-indigo-700 text-white border-indigo-700 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {plat}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Records List */}
        <div className="mt-3 flex-1 overflow-y-auto pr-1 space-y-3">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-xs transition space-y-3"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${record.platformColor}`}>
                    {record.sourcePlatform}
                  </span>
                  <span className="text-xs font-bold text-slate-900">{record.recordType}</span>
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {record.date}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">HIP: {record.hipId}</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    FHIR Validated
                  </span>
                </div>
              </div>

              {/* Title & Doctor Details */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 font-heading">{record.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Consultant: <strong>{record.doctorName}</strong> ({record.specialty}) · {record.hospitalOrClinic}
                </p>
                <div className="mt-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-900">Clinical Summary: </span>
                  {record.diagnosisSummary}
                </div>
              </div>

              {/* Key Findings Pills */}
              <div className="space-y-1.5 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Key Quantitative Findings & Prescriptions
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {record.keyFindings.map((finding, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50/60 border border-indigo-100 text-indigo-950 text-[11px] font-medium"
                    >
                      {finding}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">{record.fileSize}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleImportToVault(record)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold transition border border-indigo-200"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Save to SehatSetu Vault</span>
                  </button>

                  <button
                    onClick={() => showToast(`Opening signed report PDF (${record.sourcePlatform})...`)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>View Signed Report</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            Powered by National Digital Health Mission (NDHM) & ABDM Consent Architecture
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>
      </div>

      <PatientConsentModal
        isOpen={showConsentModal}
        onClose={() => setShowConsentModal(false)}
        onConsentGranted={() => {
          setHasConsent(true);
          executeSync();
        }}
        title="Authorize ABDM Health Records Sync"
        purpose="Synchronize and fetch historical diagnostic lab reports and consultation summaries from DigiLocker, Apollo 24|7, and Practo into your encrypted health locker."
      />
    </div>
  );
};
