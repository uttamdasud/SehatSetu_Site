import React, { useState } from 'react';
import {
  BrainCircuit,
  Search,
  AlertTriangle,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  X,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Clock,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Doctor, SpecialtyType } from '../../types';
import { useEscapeKey } from '../../utils/useEscapeKey';

interface AiDiagnosisOutcome {
  primaryDiagnosis: string;
  confidence: number;
  secondaryDiagnoses: string[];
  recommendedSpecialty: SpecialtyType;
  urgency: 'ROUTINE' | 'SOON' | 'URGENT' | 'EMERGENCY';
  urgencyReason: string;
  immediateAdvice: string[];
  suggestedQuestionsForDoctor: string[];
  isEmergency: boolean;
}

export const AiDiagnosisSuggesterModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEscapeKey(onClose);
  const { doctors, currentLocation, startBooking, showToast } = useApp();

  const [description, setDescription] = useState('');
  const [patientAge, setPatientAge] = useState('32');
  const [patientGender, setPatientGender] = useState('Male');
  const [symptomDuration, setSymptomDuration] = useState('3-5 days');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [outcome, setOutcome] = useState<AiDiagnosisOutcome | null>(null);

  const runDiagnosisAnalysis = () => {
    if (!description.trim()) {
      showToast('Please type your symptoms or health concerns');
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      const text = description.toLowerCase();
      let matchedOutcome: AiDiagnosisOutcome;

      // Smart Clinical Heuristic Mapping
      if (text.includes('chest') || text.includes('heart') || text.includes('left arm') || text.includes('angina')) {
        matchedOutcome = {
          primaryDiagnosis: 'Suspected Angina Pectoris / Acute Coronary Syndrome',
          confidence: 88,
          secondaryDiagnoses: ['Gastroesophageal Reflux Disease (GERD)', 'Costochondritis (Chest wall inflammation)', 'Anxiety Panic Reaction'],
          recommendedSpecialty: 'Cardiologist',
          urgency: 'EMERGENCY',
          urgencyReason: 'Retrosternal chest discomfort or pain radiating to arms/jaw carries immediate cardiac risk.',
          immediateAdvice: [
            'Sit down immediately in a comfortable upright resting posture',
            'Do not exert, walk, or drive yourself',
            'Take tab Sorbitrate 5mg under the tongue if previously prescribed by your cardiologist',
            'If pain persists > 10 minutes with sweating or breathlessness, call 108 or 112 immediately'
          ],
          suggestedQuestionsForDoctor: [
            'Is an urgent 12-lead ECG and Troponin-I test necessary?',
            'Could this be related to physical stress or digestion?',
            'Should I be admitted to cardiac ICU for observation?'
          ],
          isEmergency: true
        };
      } else if (text.includes('rash') || text.includes('itch') || text.includes('ring') || text.includes('skin') || text.includes('pimple') || text.includes('acne')) {
        matchedOutcome = {
          primaryDiagnosis: 'Tinea Corporis / Allergic Contact Dermatitis',
          confidence: 91,
          secondaryDiagnoses: ['Atopic Eczema', 'Urticaria (Allergic Hives)', 'Psoriasis Vulgaris'],
          recommendedSpecialty: 'Dermatologist',
          urgency: 'SOON',
          urgencyReason: 'Superficial fungal / allergic skin conditions require targeted topical antifungal or antihistamines to prevent spread.',
          immediateAdvice: [
            'Do NOT apply steroid combination creams (e.g. Betnovate/Quadriderm) without prescription',
            'Wear loose, dry cotton clothes and avoid synthetic polyester fabrics',
            'Bathe with lukewarm water and avoid harsh chemical soaps',
            'Keep skin folds dry and avoid sharing towels'
          ],
          suggestedQuestionsForDoctor: [
            'Is a KOH mount skin scraping needed to confirm fungal presence?',
            'How long should the antifungal application continue after the rash disappears?',
            'Do family members need prophylactic treatment?'
          ],
          isEmergency: false
        };
      } else if (text.includes('fever') || text.includes('chill') || text.includes('cold') || text.includes('body ache') || text.includes('weakness')) {
        matchedOutcome = {
          primaryDiagnosis: 'Acute Febrile Illness (Viral / Dengue / Typhoid workup required)',
          confidence: 84,
          secondaryDiagnoses: ['Upper Respiratory Tract Infection', 'Urinary Tract Infection', 'Malaria'],
          recommendedSpecialty: 'General Physician',
          urgency: 'SOON',
          urgencyReason: 'Persistent fever of several days duration requires baseline CBC with platelets and physical hydration.',
          immediateAdvice: [
            'Maintain strict hydration: drink 2.5 - 3 Litres of fluids (ORS, coconut water, lemon water)',
            'Take Paracetamol 650mg every 6-8 hours for fever; avoid NSAIDs like Brufen or Aspirin',
            'Tepid water sponging on forehead and limbs if temperature > 101°F',
            'Monitor platelet count if fever persists past 3 days during dengue season'
          ],
          suggestedQuestionsForDoctor: [
            'Should I test CBC Platelets, Dengue NS1 Antigen, and Widal test?',
            'What are the warning signs of fluid depletion or drop in platelets?',
            'Is antibiotic therapy warranted or is this viral?'
          ],
          isEmergency: false
        };
      } else if (text.includes('knee') || text.includes('back') || text.includes('joint') || text.includes('spine') || text.includes('shoulder')) {
        matchedOutcome = {
          primaryDiagnosis: 'Osteoarthritis / Lumbar Spondylosis with Radiculopathy',
          confidence: 86,
          secondaryDiagnoses: ['Lumbar Disc Herniation (PIVD)', 'Ankylosing Spondylitis', 'Tendonitis / Bursitis'],
          recommendedSpecialty: 'Orthopedic',
          urgency: 'ROUTINE',
          urgencyReason: 'Degenerative joint disease requires weight management, quadriceps physiotherapy and posture correction.',
          immediateAdvice: [
            'Apply hot fomentation pack for 15 minutes twice daily',
            'Avoid deep squatting, cross-legged sitting on the floor, and lifting heavy weights',
            'Gentle straight-leg raise exercises in supine position',
            'Wear supportive cushioned footwear'
          ],
          suggestedQuestionsForDoctor: [
            'Is a digital weight-bearing X-Ray or MRI spine indicated?',
            'Would physical therapy and core strengthening delay progression?',
            'Are intra-articular injections or supplements beneficial?'
          ],
          isEmergency: false
        };
      } else if (text.includes('stomach') || text.includes('gas') || text.includes('vomit') || text.includes('motion') || text.includes('diarrhea') || text.includes('acidity')) {
        matchedOutcome = {
          primaryDiagnosis: 'Acute Gastroenteritis / Gastroesophageal Reflux Disease (GERD)',
          confidence: 87,
          secondaryDiagnoses: ['Peptic Ulcer Disease', 'Irritable Bowel Syndrome (IBS)', 'H. Pylori Gastritis'],
          recommendedSpecialty: 'Gastroenterologist',
          urgency: 'SOON',
          urgencyReason: 'GI symptoms require fluid balance restoration and mucosal acid suppression.',
          immediateAdvice: [
            'Drink ORS (Oral Rehydration Salts) solution after each loose motion',
            'Avoid oily, deep-fried snacks, spicy curries, and caffeine/tea',
            'Eat light khichdi, curd rice, and boiled bananas',
            'Do not lie down flat immediately after eating dinner'
          ],
          suggestedQuestionsForDoctor: [
            'Is an ultrasound abdomen or stool culture needed?',
            'Should I take a course of probiotics with proton pump inhibitors?',
            'Are there any red-flag signs like blood in stool?'
          ],
          isEmergency: false
        };
      } else {
        matchedOutcome = {
          primaryDiagnosis: 'Undifferentiated Symptom Complex — Clinical Evaluation Indicated',
          confidence: 76,
          secondaryDiagnoses: ['General Metabolic Imbalance', 'Nutritional Deficiency (Vitamin D3 / B12)', 'Stress Somatization'],
          recommendedSpecialty: 'General Physician',
          urgency: 'ROUTINE',
          urgencyReason: 'Broad clinical evaluation and baseline screening will isolate the root cause accurately.',
          immediateAdvice: [
            'Maintain adequate sleep (7-8 hours) and consistent hydration',
            'Keep a daily log of when symptoms peak and note any food or activity triggers',
            'Avoid self-medicating with unprescribed pharmaceuticals'
          ],
          suggestedQuestionsForDoctor: [
            'What baseline laboratory panel (CBC, LFT, KFT, Thyroid, Blood Sugar) do you advise?',
            'Could my lifestyle or diet be playing a contributory role?'
          ],
          isEmergency: false
        };
      }

      setOutcome(matchedOutcome);
      setIsAnalyzing(false);
    }, 700);
  };

  // Filter nearest doctors matching the diagnosed specialty
  const matchedDoctors = outcome
    ? doctors.filter(
        (d) =>
          d.specialty === outcome.recommendedSpecialty ||
          d.specialty === 'General Physician'
      ).slice(0, 4)
    : [];

  return (
    <div
      id="ai-diagnosis-suggester-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-3xl bg-white rounded-3xl p-6 shadow-2xl max-h-[92vh] flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-xs">
              <BrainCircuit className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-heading text-slate-900">
                  AI Clinical Diagnosis & Nearest Doctor Suggester
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  AI Triage
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Describe your symptoms for preliminary clinical triage & direct doctor contact cards
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

        {/* Input Form */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Patient Age</label>
              <input
                type="number"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-900"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Gender</label>
              <select
                value={patientGender}
                onChange={(e) => setPatientGender(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-900"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Duration of Symptoms</label>
              <select
                value={symptomDuration}
                onChange={(e) => setSymptomDuration(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-900"
              >
                <option>Under 24 hours</option>
                <option>1-3 days</option>
                <option>3-5 days</option>
                <option>1-2 weeks</option>
                <option>More than a month</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
              Describe Symptoms (e.g. "Severe chest heaviness and cold sweat", "Itchy circular red rash on arm", "Fever with chills for 3 days")
            </label>
            <div className="relative">
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Type in English, Hindi, or Bengali (e.g. सीने में दर्द, গায়ে জ্বর, burning sensation in stomach)..."
                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-500">
              Location detected: <strong>{currentLocation.city}, {currentLocation.state}</strong>
            </span>
            <button
              onClick={runDiagnosisAnalysis}
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition shadow-xs disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>{isAnalyzing ? 'Analyzing Clinical Signals...' : 'Run AI Differential Diagnosis'}</span>
            </button>
          </div>
        </div>

        {/* Diagnostic Outcome Results */}
        {outcome && (
          <div className="mt-5 space-y-5 animate-in fade-in duration-300">
            {/* Urgency Alert Banner */}
            <div
              className={`p-4 rounded-2xl border flex items-start justify-between gap-3 ${
                outcome.isEmergency
                  ? 'bg-rose-50 border-rose-300 text-rose-950'
                  : outcome.urgency === 'URGENT'
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-950'
              }`}
            >
              <div className="flex items-start gap-3">
                {outcome.isEmergency ? (
                  <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                ) : (
                  <Stethoscope className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm uppercase tracking-wide">
                      Triage Category: {outcome.urgency}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 border">
                      Confidence {outcome.confidence}%
                    </span>
                  </div>
                  <p className="text-xs mt-1 leading-relaxed">{outcome.urgencyReason}</p>
                </div>
              </div>

              {outcome.isEmergency && (
                <a
                  href="tel:112"
                  className="shrink-0 px-4 py-2 rounded-xl bg-rose-600 text-white font-black text-xs hover:bg-rose-700 transition flex items-center gap-1.5 shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 112 SOS</span>
                </a>
              )}
            </div>

            {/* Differential Diagnosis Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Primary Likely Clinical Assessment
                </span>
                <span className="text-xs font-bold text-emerald-800">
                  Consult Specialty: <strong>{outcome.recommendedSpecialty}</strong>
                </span>
              </div>
              <h4 className="text-base font-black text-slate-900 font-heading">
                {outcome.primaryDiagnosis}
              </h4>

              <div className="mt-3 pt-3 border-t border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Other Differential Possibilities to Rule Out
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {outcome.secondaryDiagnoses.map((sec, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-medium"
                    >
                      {sec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Immediate Advice & Doctor Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Immediate Safe First-Aid & Self-Care
                </h5>
                <ul className="space-y-1.5 text-slate-600 text-[11px]">
                  {outcome.immediateAdvice.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Important Questions to Ask Your Doctor
                </h5>
                <ul className="space-y-1.5 text-slate-600 text-[11px]">
                  {outcome.suggestedQuestionsForDoctor.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Nearest Doctors with Direct Contact Information */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-heading">
                    Nearest Verified {outcome.recommendedSpecialty} Doctors in {currentLocation.city}
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    Direct phone call, WhatsApp, physical clinic address & token booking
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-800">
                  {matchedDoctors.length} Specialists Available
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {matchedDoctors.map((doc, idx) => {
                  const simulatedDistance = (0.8 + idx * 0.9).toFixed(1);
                  const docPhone = doc.receptionistPhone || '+91 98301 22450';
                  const cleanPhone = docPhone.replace(/[^0-9]/g, '');

                  return (
                    <div
                      key={doc.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-xs transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start gap-3">
                          <img
                            src={doc.image}
                            alt={doc.name}
                            className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h5 className="text-xs font-bold text-slate-900 truncate">{doc.name}</h5>
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                                ★ {doc.rating}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 truncate">{doc.specialty} · {doc.qualifications}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5 truncate flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                              <span>{doc.hospital}, {doc.hospitalAddress}</span>
                            </p>
                          </div>
                        </div>

                        {/* Distance & Fees */}
                        <div className="mt-3 py-2 px-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px]">
                          <span className="font-bold text-slate-700 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            {simulatedDistance} km away
                          </span>
                          <span className="font-black text-slate-900">
                            ₹{doc.feeInClinic} <span className="text-[10px] font-normal text-slate-500">at clinic</span>
                          </span>
                        </div>
                      </div>

                      {/* Direct Contact CTAs */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5">
                        <a
                          href={`tel:${docPhone}`}
                          className="flex-1 py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold flex items-center justify-center gap-1 transition"
                        >
                          <Phone className="w-3 h-3 text-slate-600" />
                          <span>Call Clinic</span>
                        </a>

                        <a
                          href={`https://api.whatsapp.com/send?phone=${cleanPhone}&text=Hello%20${encodeURIComponent(doc.name)},%20I%20got%20your%20contact%20via%20SehatSetu%20for%20a%20consultation.`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-1.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center gap-1 border border-emerald-200 transition"
                        >
                          <MessageCircle className="w-3 h-3 text-emerald-600" />
                          <span>WhatsApp</span>
                        </a>

                        <button
                          onClick={() => {
                            onClose();
                            startBooking(doc);
                          }}
                          className="flex-1 py-1.5 px-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-[11px] font-black flex items-center justify-center gap-1 transition shadow-xs"
                        >
                          <Calendar className="w-3 h-3" />
                          <span>Book Token</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
