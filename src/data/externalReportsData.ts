export interface ExternalMedicalRecord {
  id: string;
  sourcePlatform: 'Apollo 24|7' | 'Practo Health' | 'Tata 1mg' | 'DigiLocker / ABDM' | 'Max Healthcare' | 'Fortis Health';
  platformIcon: string;
  platformColor: string;
  title: string;
  recordType: 'Discharge Summary' | 'Consultation Note' | 'Lab Diagnostic' | 'Imaging / Radiology' | 'Prescription';
  date: string;
  doctorName: string;
  specialty: string;
  hospitalOrClinic: string;
  diagnosisSummary: string;
  keyFindings: string[];
  prescribedMedicinesSummary: string[];
  documentUrl: string;
  fileSize: string;
  fhirVerified: boolean;
  abhaLinked: boolean;
  hipId: string; // Health Information Provider ID under ABDM
}

export const EXTERNAL_PLATFORM_RECORDS: ExternalMedicalRecord[] = [
  {
    id: 'ext-rec-01',
    sourcePlatform: 'Apollo 24|7',
    platformIcon: 'Activity',
    platformColor: 'text-amber-600 bg-amber-50 border-amber-200',
    title: 'Executive Comprehensive Health Check & Lipid Profile',
    recordType: 'Lab Diagnostic',
    date: '14 Oct 2026',
    doctorName: 'Dr. Arindam Das, MD (Pathology)',
    specialty: 'Pathology & Preventive Medicine',
    hospitalOrClinic: 'Apollo Clinic, Guwahati',
    diagnosisSummary: 'Borderline Hypercholesterolemia with mild Vitamin D3 insufficiency (18.4 ng/mL). HbA1c 5.8% (Pre-diabetic window).',
    keyFindings: [
      'Total Cholesterol: 218 mg/dL (Normal < 200)',
      'LDL Bad Cholesterol: 138 mg/dL (Desirable < 100)',
      'Vitamin D3: 18.4 ng/mL (Deficient < 20)',
      'Serum Creatinine: 0.9 mg/dL (Normal)'
    ],
    prescribedMedicinesSummary: ['Cholecalciferol 60,000 IU once weekly for 8 weeks', 'Dietary modifications and daily 40-min brisk walk'],
    documentUrl: '#',
    fileSize: '1.8 MB (Signed PDF)',
    fhirVerified: true,
    abhaLinked: true,
    hipId: 'IN18000021-APOLLO-GH'
  },
  {
    id: 'ext-rec-02',
    sourcePlatform: 'Practo Health',
    platformIcon: 'Stethoscope',
    platformColor: 'text-sky-600 bg-sky-50 border-sky-200',
    title: 'Teleconsultation Summary — Acute Gastric Acidity & Dyspepsia',
    recordType: 'Consultation Note',
    date: '28 Aug 2026',
    doctorName: 'Dr. Neha Sharma, MBBS, DNB (Internal Medicine)',
    specialty: 'General Physician',
    hospitalOrClinic: 'Practo Prime Care Network',
    diagnosisSummary: 'Acute Peptic Dyspepsia with nocturnal acid reflux triggered by irregular meal hours and caffeine.',
    keyFindings: [
      'Heartburn aggravated by lying flat after dinner',
      'No vomiting, melena, or weight loss',
      'Normal vitals recorded via patient log'
    ],
    prescribedMedicinesSummary: ['Cap Pan-D (Pantoprazole + Domperidone) 40mg OD before breakfast x 14 days', 'Syrup Gelusil MPS 10ml SOS'],
    documentUrl: '#',
    fileSize: '420 KB (FHIR JSON & PDF)',
    fhirVerified: true,
    abhaLinked: true,
    hipId: 'IN07000189-PRACTO-CARE'
  },
  {
    id: 'ext-rec-03',
    sourcePlatform: 'DigiLocker / ABDM',
    platformIcon: 'ShieldCheck',
    platformColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    title: 'Official CoWIN Universal COVID-19 Immunization Certificate',
    recordType: 'Prescription',
    date: '12 Feb 2024',
    doctorName: 'Govt. of India / Ministry of Health & Family Welfare (MoHFW)',
    specialty: 'Public Health & Immunization',
    hospitalOrClinic: 'IGM Hospital Vaccination Center, Agartala',
    diagnosisSummary: 'Full Primary + Precaution Dose vaccination completed (Covishield / ChAdOx1 nCoV-19).',
    keyFindings: [
      'Dose 1: 04 May 2021 (Batch: 4120Z004)',
      'Dose 2: 28 Jul 2021 (Batch: 4121Z019)',
      'Precaution Dose: 12 Feb 2024 (Batch: 4122Z088)'
    ],
    prescribedMedicinesSummary: ['Immunity boost confirmed; Nil adverse reaction reported'],
    documentUrl: '#',
    fileSize: '512 KB (Government Cryptographic Signed)',
    fhirVerified: true,
    abhaLinked: true,
    hipId: 'IN-GOV-COWIN-NATIONAL'
  },
  {
    id: 'ext-rec-04',
    sourcePlatform: 'Tata 1mg',
    platformIcon: 'HeartPulse',
    platformColor: 'text-rose-600 bg-rose-50 border-rose-200',
    title: 'Home Sample HbA1c & Fasting Glucose Diagnostic Profile',
    recordType: 'Lab Diagnostic',
    date: '02 Jun 2026',
    doctorName: 'Dr. Vivek Mittal, MD (Biochemistry)',
    specialty: 'Clinical Biochemistry',
    hospitalOrClinic: 'Tata 1mg Reference Labs, Kolkata',
    diagnosisSummary: 'Pre-diabetes screening. HbA1c 5.7%, Fasting blood glucose 104 mg/dL (Impaired fasting glucose).',
    keyFindings: [
      'HbA1c: 5.7% (Pre-diabetic range 5.7% - 6.4%)',
      'Fasting Plasma Glucose: 104 mg/dL (Normal < 100 mg/dL)',
      'Mean Estimated Blood Glucose: 117 mg/dL'
    ],
    prescribedMedicinesSummary: ['Lifestyle modification: 150 min weekly exercise, low GI diet, retest in 6 months'],
    documentUrl: '#',
    fileSize: '950 KB (NABL Accredited Report)',
    fhirVerified: true,
    abhaLinked: true,
    hipId: 'IN19000451-TATA1MG-LAB'
  }
];
