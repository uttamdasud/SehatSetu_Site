export interface SpecialistOpdTemplate {
  id: string;
  specialty: string;
  department: string;
  icon: string;
  chiefComplaintsExamples: string[];
  vitalsRequired: string[];
  clinicalExaminationFields: {
    section: string;
    items: string[];
  }[];
  commonInvestigations: string[];
  commonDiagnoses: string[];
  standardAdvice: string[];
  emergencyRedFlags: string[];
}

export const SPECIALIST_OPD_TEMPLATES: SpecialistOpdTemplate[] = [
  {
    id: 'opd-cardio',
    specialty: 'Cardiology',
    department: 'Department of Cardiology & Cardiac Care',
    icon: 'HeartPulse',
    chiefComplaintsExamples: [
      'Chest pain (substernal / radiating to left arm / jaw)',
      'Exertional breathlessness (NYHA Class II-IV)',
      'Palpitations (paroxysmal or persistent)',
      'Syncope or presyncope episodes',
      'Bilateral pedal edema'
    ],
    vitalsRequired: ['BP (Right arm supine & standing)', 'Heart Rate (bpm)', 'SpO2 (%)', 'Respiratory Rate', 'BMI', 'Capillary Blood Sugar'],
    clinicalExaminationFields: [
      {
        section: 'Cardiovascular Examination',
        items: ['JVP (cm above sternal angle)', 'Apical impulse location', 'S1, S2 intensity', 'Murmurs (Systolic / Diastolic / Radiation)', 'Carotid bruit', 'Peripheral pulses (Radials, Femorals, Dorsalis Pedis)']
      },
      {
        section: 'Chest & Lungs',
        items: ['Bilateral basal crackles / crepitations', 'Wheezing', 'Air entry equal']
      },
      {
        section: 'General Physical',
        items: ['Pallor', 'Clubbing', 'Cyanosis', 'Pitting pedal edema']
      }
    ],
    commonInvestigations: ['12-Lead ECG', '2D Echocardiogram + Color Doppler', 'TMT (Treadmill Stress Test)', 'Serum Troponin-I / hs-cTnT', 'NT-proBNP', 'Lipid Profile (TC, LDL, HDL, Triglycerides)', 'Serum Electrolytes & Creatinine'],
    commonDiagnoses: [
      'Coronary Artery Disease (Stable Angina / Non-STEMI)',
      'Essential Hypertension (Stage 1 / Stage 2)',
      'Congestive Heart Failure (HFrEF / HFpEF)',
      'Supraventricular Tachycardia (SVT / Atrial Fibrillation)',
      'Dyslipidemia'
    ],
    standardAdvice: [
      'Strict Low salt diet (< 3-5g/day)',
      'Zero tobacco/smoking cessation',
      'Daily 30-min brisk walk if NYHA Class I-II',
      'Home blood pressure log daily morning & evening',
      'Emergency SOS: If chest heaviness > 10 mins with sweating, rush to Emergency with tab Sorbitrate 5mg sublingually'
    ],
    emergencyRedFlags: ['Crushing retrosternal chest pain with diaphoresis', 'Rest dyspnea with cyanosis', 'Sustained ventricular arrhythmia', 'Syncope on exertion']
  },
  {
    id: 'opd-derma',
    specialty: 'Dermatology',
    department: 'Department of Dermatology & Cosmetology',
    icon: 'Sparkles',
    chiefComplaintsExamples: [
      'Pruritic erythematous rash across flexural/extensor areas',
      'Acne vulgaris (comedones, papules, cysts on face & back)',
      'Scaly silvery plaques on scalp, elbows, knees',
      'Pigmentary changes (hyper/hypopigmentation / melasma)',
      'Hair loss (telogen effluvium / androgenetic alopecia)'
    ],
    vitalsRequired: ['Pulse Rate', 'Blood Pressure', 'Temperature'],
    clinicalExaminationFields: [
      {
        section: 'Morphological Lesion Analysis',
        items: ['Primary lesion (Macule, Papule, Plaque, Nodule, Vesicle, Bulla)', 'Secondary changes (Scale, Crust, Lichenification, Excoriation)', 'Border & margins (well-defined vs ill-defined)', 'Arrangement (Linear, Annular, Grouped, Dermatomal)']
      },
      {
        section: 'Distribution & Extent',
        items: ['Body surface area (BSA %) involved', 'Symmetry (Symmetrical vs Asymmetrical)', 'Sun-exposed areas vs Covered areas']
      },
      {
        section: 'Hair, Nails & Mucosa',
        items: ['Nail pitting / Oncholyis / Subungual hyperkeratosis', 'Scalp hair density & pull test', 'Oral mucosal examination (Lichen planus plaques)']
      }
    ],
    commonInvestigations: ['KOH Mount for fungus/hyphae', 'Skin scraping & Tzanck smear', 'Wood’s Lamp examination', 'Dermoscopy', 'Punch biopsy 3-4mm for Histopathology', 'Serum IgE levels & Allergy patch test'],
    commonDiagnoses: [
      'Tinea Corporis / Cruris (Dermatophytosis)',
      'Atopic Dermatitis / Allergic Contact Dermatitis',
      'Psoriasis Vulgaris',
      'Acne Vulgaris (Grade II/III)',
      'Scabies',
      'Urticaria (Acute / Chronic Spontaneous)'
    ],
    standardAdvice: [
      'Avoid sharing towels, bedsheets, and personal clothes',
      'Bathe in lukewarm water with mild syndet cleanser; apply emollient within 3 mins of bath (Soak & Seal)',
      'Broad-spectrum sunscreen SPF 50+ PA+++ every 3 hours outdoors',
      'Do not apply over-the-counter steroid combination creams (e.g., Quadriderm/Betnovate)',
      'Wear loose cotton clothing'
    ],
    emergencyRedFlags: ['Steven-Johnson Syndrome / TEN signs (mucosal blisters, peeling skin)', 'Angioedema of lips/tongue', 'Generalized pustular psoriasis with high fever']
  },
  {
    id: 'opd-pediatrics',
    specialty: 'Pediatrics',
    department: 'Department of Child Health & Pediatrics',
    icon: 'Baby',
    chiefComplaintsExamples: [
      'High grade fever with chills / convulsions',
      'Acute watery diarrhea and vomiting',
      'Persistent cough with chest indrawing / rapid breathing',
      'Poor feeding, lethargy and irritability',
      'Failure to gain weight / milestone delays'
    ],
    vitalsRequired: ['Weight (kg)', 'Height/Length (cm)', 'Head Circumference (cm)', 'Temperature (°F/°C)', 'Heart Rate', 'Respiratory Rate (counted for 1 full minute)', 'SpO2'],
    clinicalExaminationFields: [
      {
        section: 'Anthropometry & Growth Percentiles',
        items: ['Weight-for-Age (IAP/WHO chart Z-score)', 'Height-for-Age', 'Weight-for-Height (wasting vs stunting)']
      },
      {
        section: 'Systemic Pediatric Assessment',
        items: ['Anterior fontanelle (flat, sunken, bulging)', 'Signs of dehydration (tears present, skin pinch return, dry tongue)', 'Chest indrawing / subcostal retractions / stridor', 'Abdominal distension / liver span / tenderness', 'Meningeal signs (Neck stiffness, Kernig’s)']
      },
      {
        section: 'Immunization & Milestones',
        items: ['UIP (Universal Immunization Programme) status', 'Gross motor, Fine motor, Language, Social milestones up to date']
      }
    ],
    commonInvestigations: ['Complete Blood Count (CBC) + ESR', 'C-Reactive Protein (CRP)', 'Urine Routine & Microscopy', 'Dengue NS1 Antigen & IgM (if season)', 'Chest X-Ray AP view', 'Stool Routine examination'],
    commonDiagnoses: [
      'Acute Bronchiolitis / Viral Wheeze',
      'Acute Gastroenteritis with mild-moderate dehydration',
      'Viral Exanthem / Hand-Foot-Mouth Disease (HFMD)',
      'Febrile Seizures (Simple vs Complex)',
      'Upper Respiratory Tract Infection (URTI) with Otitis Media'
    ],
    standardAdvice: [
      'ORS solution preparation: 1 packet in exactly 1 Litre boiled & cooled drinking water',
      'Exclusive breastfeeding for infants < 6 months; frequent hydration',
      'Tepid sponging with room temperature water if fever > 101°F, followed by syrup Paracetamol per kg weight',
      'Continue regular feeding; do not withhold diet during diarrhea',
      'Complete full course of antibiotics if prescribed'
    ],
    emergencyRedFlags: ['Lethargy / unarousable child', 'Stridor at rest or grunting respirations', 'Refusal to drink or feed completely', 'Convulsions / seizures', 'Cold clammy peripheries']
  },
  {
    id: 'opd-general',
    specialty: 'General Physician',
    department: 'Department of Internal & Family Medicine',
    icon: 'Stethoscope',
    chiefComplaintsExamples: [
      'Acute fever of 3-7 days duration with myalgia',
      'Persistent generalized weakness, lethargy and fatigue',
      'Dyspepsia, epigastric burning, nausea and bloating',
      'Uncontrolled blood glucose or frequent urination/polydipsia',
      'Chronic tension or migraine headache'
    ],
    vitalsRequired: ['Blood Pressure (mmHg)', 'Pulse Rate (bpm)', 'SpO2 (%)', 'Temperature (°F)', 'Random Blood Sugar (mg/dL)', 'BMI (kg/m²)'],
    clinicalExaminationFields: [
      {
        section: 'General Physical Examination',
        items: ['Pallor (conjunctiva/tongue)', 'Icterus (sclera)', 'Cyanosis', 'Clubbing', 'Pedal edema', 'Lymphadenopathy (cervical, axillary, inguinal)']
      },
      {
        section: 'Abdominal Examination',
        items: ['Soft / non-tender / guarding', 'Hepatomegaly / Splenomegaly', 'Bowel sounds present']
      },
      {
        section: 'Respiratory & Neuro',
        items: ['Bilateral vesicular breath sounds', 'Oriented to time, place, person', 'Gross motor power 5/5']
      }
    ],
    commonInvestigations: ['Complete Blood Count (CBC) with Platelets', 'Liver Function Test (LFT)', 'Kidney Function Test (KFT & Serum Creatinine)', 'HbA1c & Fasting / Postprandial Blood Sugar', 'Thyroid Profile (TSH, Free T3, Free T4)', 'Urine Routine', 'Serum Vitamin D3 & Vitamin B12'],
    commonDiagnoses: [
      'Type 2 Diabetes Mellitus',
      'Essential Hypertension',
      'Acute Febrile Illness (Viral / Typhoid / Malaria / Dengue)',
      'Gastroesophageal Reflux Disease (GERD) / Peptic Gastritis',
      'Nutritional Iron Deficiency Anemia',
      'Hypothyroidism'
    ],
    standardAdvice: [
      'Hydration: 2.5 - 3.5 Litres of water daily',
      'Low Glycemic Index diet: Avoid refined sugars, maida, processed foods',
      'Regular physical activity: 150 minutes of moderate exercise per week',
      'Follow up with fasting blood sugar and BP records in 2 weeks',
      'Avoid self-medication with painkillers (NSAIDs) or over-the-counter steroids'
    ],
    emergencyRedFlags: ['Persistent vomiting with inability to retain fluids', 'Chest tightness or severe shortness of breath', 'High grade fever with altered mental status', 'Hematemesis or black tarry stools (melena)']
  },
  {
    id: 'opd-ortho',
    specialty: 'Orthopedic',
    department: 'Department of Orthopedics & Joint Replacement',
    icon: 'Bone',
    chiefComplaintsExamples: [
      'Knee joint pain exacerbated by stair climbing / squatting',
      'Low back ache radiating to posterior thigh / foot (Sciatica)',
      'Acute ankle sprain / twisting injury with swelling',
      'Shoulder pain with limited abduction and overhead reach (Frozen shoulder)',
      'Neck stiffness radiating to forearm and fingers with tingling'
    ],
    vitalsRequired: ['BP', 'Pulse Rate', 'Weight / BMI'],
    clinicalExaminationFields: [
      {
        section: 'Inspection & Palpation',
        items: ['Deformity / Genu varum or valgum', 'Joint effusion / warmth / localized tenderness', 'Active & Passive Range of Motion (degrees)']
      },
      {
        section: 'Special Orthopedic Tests',
        items: ['McMurray’s test / Lachman test (Knee)', 'Straight Leg Raise (SLR) test / Lasegue sign (Lumbar spine)', 'Neer’s & Hawkins test / Empty can test (Shoulder)', 'Phalen’s & Tinel’s sign (Wrist)']
      },
      {
        section: 'Neurological & Vascular Check',
        items: ['Dermatomal sensory mapping', 'Myotomal muscle grading (L1 to S1 / C5 to T1)', 'Distal peripheral pulses (Radial / Posterior Tibial)']
      }
    ],
    commonInvestigations: ['Digital X-Ray Weight Bearing (AP & Lateral views)', 'MRI Scan (Spine / Knee / Shoulder)', 'Serum Uric Acid (for Gout)', 'RA Factor & Anti-CCP (Rheumatoid arthritis)', 'Bone Mineral Density (DEXA Scan)', 'Serum Calcium & Vitamin D3'],
    commonDiagnoses: [
      'Osteoarthritis of Bilateral Knees (Kellgren-Lawrence Grade I-IV)',
      'Lumbar Spondylosis with Radiculopathy (L4-L5 / L5-S1 PIVD)',
      'Adhesive Capsulitis (Frozen Shoulder Phase I-III)',
      'Cervical Spondylotic Radiculopathy',
      'Plantar Fasciitis / Calcaneal Spur'
    ],
    standardAdvice: [
      'Avoid deep squatting, cross-legged sitting and using Indian toilets if knee OA diagnosed',
      'Quadriceps strengthening exercises and isometric back extensions twice daily',
      'Hot fomentation for 15 minutes before exercises; cold pack for acute swelling',
      'Ergonomic lumbar support chair and proper posture during computer work',
      'Maintain healthy BMI to reduce compressive load on knee joints'
    ],
    emergencyRedFlags: ['Cauda Equina Syndrome (loss of bowel/bladder control, saddle anesthesia)', 'Compound fracture with skin puncture', 'Acute septic arthritis (hot, red joint with inability to bear weight and high fever)']
  },
  {
    id: 'opd-gynae',
    specialty: 'Gynecologist',
    department: 'Department of Obstetrics & Gynecology',
    icon: 'Activity',
    chiefComplaintsExamples: [
      'Irregular menstrual cycles (Oligomenorrhea / Polymenorrhea)',
      'Heavy menstrual bleeding (Menorrhagia) with clots',
      'Lower abdominal pelvic pain / Dysmenorrhea',
      'Vaginal discharge with pruritus / foul odor',
      'Routine Antenatal Care (ANC) checkup / positive urine pregnancy test'
    ],
    vitalsRequired: ['Blood Pressure (both arms)', 'Weight & BMI gain curve', 'Hemoglobin (g/dL)', 'Fundal height (in pregnancy)'],
    clinicalExaminationFields: [
      {
        section: 'Obstetric / Gynecological Exam',
        items: ['Per Abdomen: Soft, non-tender / Fundal height in weeks / Fetal heart sound (FHS)', 'Per Speculum: Cervical appearance, discharge nature (curdy white, yellowish, foul)', 'Per Vaginal bimanual: Uterus size, anteverted/retroverted, mobility, fornices tenderness']
      },
      {
        section: 'Secondary Attributes',
        items: ['Hirsutism score (Ferriman-Gallwey)', 'Acanthosis nigricans on nape of neck (insulin resistance)', 'Thyroid enlargement']
      }
    ],
    commonInvestigations: ['Pelvic Ultrasound (USG Pelvis / Transvaginal Scan TVS)', 'Obstetric USG (NT-scan / Anomaly scan)', 'Pap Smear / Liquid Based Cytology (LBC)', 'Hormone Profile (LH, FSH, Serum Prolactin, Total Testosterone, AMH)', 'Thyroid Profile & Fasting Blood Sugar', 'Vaginal Swab Culture & Sensitivity'],
    commonDiagnoses: [
      'Polycystic Ovarian Syndrome (PCOS / PCOD)',
      'Uterine Fibroids (Leiomyoma)',
      'Pelvic Inflammatory Disease (PID)',
      'Bacterial Vaginosis / Vaginal Candidiasis',
      'Normal Intrauterine Gestation (Antenatal Trimester 1/2/3)',
      'Dysfunctional Uterine Bleeding (AUB)'
    ],
    standardAdvice: [
      'Maintain menstrual calendar / mobile cycle tracker',
      'Daily Folic Acid 5mg (pre-conceptional / first trimester of pregnancy)',
      'Intimate hygiene: Avoid scented feminine washes; wash front to back with plain water',
      'PCOS management: Low carbohydrate diet, regular physical exercise to enhance insulin sensitivity',
      'Routine Cervical Cancer screening (Pap test every 3 years for age 21-65)'
    ],
    emergencyRedFlags: ['Severe acute lower abdominal pain with fainting (Ectopic Pregnancy rupture)', 'Vaginal bleeding with passage of tissue during pregnancy', 'Elevated BP > 140/90 with severe headache / visual blurring in pregnancy (Preeclampsia)']
  }
];
