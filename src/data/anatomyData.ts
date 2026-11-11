export interface AnatomyRegion {
  id: string;
  name: string;
  hindiName: string;
  system: string;
  svgZone: 'head' | 'eyes' | 'throat' | 'chest' | 'heart' | 'abdomen' | 'liver' | 'kidneys' | 'pelvis' | 'limbs' | 'skin';
  icon: string;
  commonDiseases: {
    name: string;
    description: string;
    indiaOccurrence: string;
    globalOccurrence: string;
    responsibleFactors: string[];
    lifestyleTriggers: string[];
    earlySymptoms: string[];
    preventionSteps: string[];
    recommendedSpecialty: string;
  }[];
}

export const ANATOMY_REGIONS: AnatomyRegion[] = [
  {
    id: 'brain-nervous',
    name: 'Brain & Nervous System',
    hindiName: 'मस्तिष्क एवं तंत्रिका तंत्र',
    system: 'Central Nervous System',
    svgZone: 'head',
    icon: 'Brain',
    commonDiseases: [
      {
        name: 'Ischemic & Hemorrhagic Stroke (Paralysis)',
        description: 'Disruption of blood supply to the brain causing rapid neuronal death and paralysis.',
        indiaOccurrence: '145 to 154 per 100,000 population annually (~1.8 million new cases/year in India; #2 cause of death).',
        globalOccurrence: '101 per 100,000 population; 12.2 million new strokes per year worldwide.',
        responsibleFactors: [
          'Uncontrolled hypertension (high blood pressure) responsible for > 55% of cases in India',
          'Atherosclerosis due to high saturated fat diets, trans-fats and smoking/bidi',
          'Diabetes mellitus causing microvascular and macrovascular damage',
          'Sedentary lifestyle and high salt intake (> 10g/day vs WHO limit of 5g)'
        ],
        lifestyleTriggers: ['Tobacco smoking / chewing', 'Excessive alcohol intake', 'High stress & sleep deprivation', 'Poor diet'],
        earlySymptoms: ['Sudden facial drooping', 'Arm weakness / numbness', 'Slurred speech or difficulty understanding', 'Sudden loss of balance or severe headache (BE-FAST signs)'],
        preventionSteps: ['Keep Blood Pressure strictly < 130/80 mmHg', 'Routine lipid screening after age 30', '30 minutes aerobic exercise 5 days a week', 'Strict cessation of bidi, cigarette, and gutkha'],
        recommendedSpecialty: 'Neurologist'
      },
      {
        name: 'Migraine & Tension Headache',
        description: 'Recurrent pulsating neurovascular headache often accompanied by nausea and photophobia.',
        indiaOccurrence: '25.2% population prevalence in India (higher in females: 32% vs males: 18%).',
        globalOccurrence: '14.7% global prevalence; ranks as the 2nd leading cause of years lived with disability.',
        responsibleFactors: [
          'Trigeminovascular activation and CGRP neuropeptide release',
          'Excessive digital screen time and blue light exposure',
          'Dehydration and skipped meals',
          'Weather fluctuations, intense humidity, and hormonal shifts'
        ],
        lifestyleTriggers: ['Irregular sleep patterns', 'Excessive caffeine or abrupt withdrawal', 'Monosodium glutamate (MSG) & aged foods'],
        earlySymptoms: ['Unilateral throbbing headache', 'Sensitivity to light (photophobia) and loud sounds', 'Visual aura (zigzag flashing lights)', 'Nausea'],
        preventionSteps: ['Maintain consistent sleep schedule (7-8 hours)', 'Hydrate with at least 3 litres water daily', 'Take screen breaks every 20 minutes (20-20-20 rule)', 'Trigger diary to identify food/odor triggers'],
        recommendedSpecialty: 'Neurologist'
      }
    ]
  },
  {
    id: 'heart-cardiovascular',
    name: 'Heart & Cardiovascular System',
    hindiName: 'हृदय एवं रक्त वाहिकाएं',
    system: 'Cardiovascular System',
    svgZone: 'heart',
    icon: 'HeartPulse',
    commonDiseases: [
      {
        name: 'Coronary Artery Disease (CAD) / Heart Attack',
        description: 'Blockage of coronary arteries supplying oxygen to heart muscle by atherosclerotic cholesterol plaques.',
        indiaOccurrence: 'CAD prevalence in India is 11% in urban and 7% in rural adults. Indians develop heart attacks a decade earlier (average age 53 vs 63 in West).',
        globalOccurrence: 'Estimated 6.7% global prevalence; leading cause of death worldwide (~18 million deaths/year).',
        responsibleFactors: [
          'Metabolic Syndrome & Asian Indian Phenotype (high visceral adiposity, high triglycerides, low HDL, insulin resistance)',
          'High dietary intake of reheated cooking oils (palm oil, vanaspati, trans-fats)',
          'Air pollution (PM2.5 particles triggering systemic vascular inflammation)',
          'Tobacco chewing (Gutkha, Khaini) and smoking causing coronary vasoconstriction and endothelial injury'
        ],
        lifestyleTriggers: ['Lack of physical activity', 'Chronic workplace stress', 'High sodium intake in pickles, papads, fried snacks'],
        earlySymptoms: ['Substernal heavy chest pressure or squeezing', 'Pain radiating to left arm, neck, jaw, or upper back', 'Cold sweating and unexplained breathlessness on slight exertion', 'Atypical burning in upper stomach resembling acidity'],
        preventionSteps: ['Keep LDL Cholesterol < 70 mg/dL (or < 55 mg/dL if high risk)', 'Annual TMT and 2D Echocardiogram for adults > 35 with family history', 'Adopt Mediterranean / balanced traditional Indian diet with nuts and seeds', 'Zero exposure to passive or active tobacco smoke'],
        recommendedSpecialty: 'Cardiologist'
      },
      {
        name: 'Hypertension (High Blood Pressure)',
        description: 'Chronic elevation of systemic arterial pressure exceeding 140/90 mmHg.',
        indiaOccurrence: '31.4% of urban Indians and 27.6% of rural Indians (over 220 million people in India, of which only 12% have it under control).',
        globalOccurrence: '31.1% of global adult population (1.28 billion adults).',
        responsibleFactors: [
          'Excess dietary sodium and potassium deficiency (low fruit/vegetable intake)',
          'Obesity and arterial vascular stiffness with advancing age',
          'Chronic mental stress releasing sustained cortisol and epinephrine',
          'Chronic kidney disease and obstructive sleep apnea'
        ],
        lifestyleTriggers: ['Processed salty foods', 'Sedentary desk jobs', 'Alcohol consumption', 'Excess tea/coffee intake'],
        earlySymptoms: ['Often completely asymptomatic ("Silent Killer")', 'Occipital morning headache', 'Dizziness or lightheadedness', 'Nosebleeds (epistaxis) in severe spikes'],
        preventionSteps: ['Reduce dietary salt to under 1 level teaspoon (< 5g) per day', 'DASH Diet: High fiber, leafy greens, bananas, lentils, low-fat dairy', 'Daily blood pressure monitoring with validated digital arm cuff', 'Weight reduction: losing 5 kg reduces BP by 4-5 mmHg'],
        recommendedSpecialty: 'General Physician'
      }
    ]
  },
  {
    id: 'lungs-respiratory',
    name: 'Lungs & Respiratory System',
    hindiName: 'फेफड़े एवं श्वसन तंत्र',
    system: 'Respiratory System',
    svgZone: 'chest',
    icon: 'Wind',
    commonDiseases: [
      {
        name: 'Chronic Obstructive Pulmonary Disease (COPD) & Asthma',
        description: 'Chronic inflammatory lung diseases causing airflow limitation, airway hyper-responsiveness, and destruction of alveoli.',
        indiaOccurrence: 'COPD accounts for 55.3 million cases in India (India has 32% of global COPD mortality). 37.9 million Indians suffer from Asthma.',
        globalOccurrence: '212 million cases of COPD globally; 262 million asthma cases globally.',
        responsibleFactors: [
          'Chulha / Biomass fuel smoke for cooking in unventilated rural homes (leading cause of COPD in non-smoking Indian women)',
          'Severe ambient urban air pollution (PM2.5, PM10, stubble burning, vehicular exhaust)',
          'Bidi and cigarette smoking (bidi delivers 3x more carbon monoxide than conventional cigarettes)',
          'Occupational dusts (silica in stone crushers, coal mines, textile cotton dust)'
        ],
        lifestyleTriggers: ['Cold weather inversions and smog during winter', 'Indoor incense / agarbatti / mosquito coil smoke', 'Cockroach and dust mite allergens'],
        earlySymptoms: ['Chronic morning cough with sputum production', 'Wheezing / whistling sound while exhaling', 'Progressive shortness of breath while climbing stairs', 'Chest tightness'],
        preventionSteps: ['Switch to clean LPG cooking gas (Pradhan Mantri Ujjwala Yojana)', 'Wear N95 masks when Air Quality Index (AQI) exceeds 200', 'Annual Influenza and Pneumococcal vaccination (PCV13 / PPSV23)', 'Use prescribed inhalers with spacer consistently as directed'],
        recommendedSpecialty: 'Pulmonologist'
      },
      {
        name: 'Pulmonary Tuberculosis (TB)',
        description: 'Bacterial infection caused by Mycobacterium tuberculosis, spreading via microscopic airborne droplets.',
        indiaOccurrence: 'India bears 27% of the entire global TB burden (~2.8 million new TB cases annually; 188 cases per 100,000 population).',
        globalOccurrence: '10.6 million new cases worldwide (133 per 100,000 population).',
        responsibleFactors: [
          'Overcrowded living spaces with inadequate ventilation',
          'Malnutrition and undernutrition impairing cellular immunity',
          'Poorly controlled Diabetes Mellitus (increases TB reactivation risk by 3x)',
          'Incomplete treatment courses leading to Multi-Drug Resistant (MDR-TB)'
        ],
        lifestyleTriggers: ['Tobacco smoking', 'Silicosis exposure in construction workers', 'HIV co-infection'],
        earlySymptoms: ['Cough persisting for more than 2 weeks', 'Low-grade evening fever with night sweats', 'Unintentional weight loss and loss of appetite', 'Hemoptysis (blood in sputum)'],
        preventionSteps: ['Prompt diagnosis with GeneXpert / CBNAAT molecular testing', 'Complete full 6-month DOTS treatment regimen without skipping doses', 'Nutritional support (Nikshay Poshan Yojana ₹500/month)', 'BCG vaccination in newborns'],
        recommendedSpecialty: 'Pulmonologist'
      }
    ]
  },
  {
    id: 'liver-digestive',
    name: 'Liver & Gallbladder',
    hindiName: 'यकृत एवं पित्ताशय',
    system: 'Hepatobiliary System',
    svgZone: 'liver',
    icon: 'Activity',
    commonDiseases: [
      {
        name: 'Non-Alcoholic Fatty Liver Disease (MASLD / NAFLD)',
        description: 'Abnormal accumulation of fat droplets inside liver hepatocytes not caused by alcohol, progressing to cirrhosis.',
        indiaOccurrence: '38% to 40% prevalence in adult Indians (one in three Indian adults has fatty liver; present in up to 60% of diabetic patients).',
        globalOccurrence: '29.8% to 32% global adult prevalence.',
        responsibleFactors: [
          'High intake of refined carbohydrates, polished white rice, refined flour (maida), and sugar-sweetened beverages',
          'High-fructose corn syrup in packaged beverages and sweets',
          'Insulin resistance causing lipolysis and hepatic free fatty acid influx',
          'Abdominal/central obesity even with normal overall BMI (lean NAFLD)'
        ],
        lifestyleTriggers: ['Sedentary screen time', 'Late-night heavy oily dinners', 'Lack of resistance exercise'],
        earlySymptoms: ['Usually asymptomatic in early stages', 'Dull ache or discomfort in right upper quadrant of abdomen', 'Unexplained fatigue and daytime sluggishness', 'Elevated SGPT / SGOT in routine health tests'],
        preventionSteps: ['Losing 7% to 10% body weight reverses liver steatosis and inflammation', 'Cut down sugar-sweetened beverages and sweets completely', '150 minutes of aerobic + 2 sessions of strength training per week', 'Black coffee (2 cups/day without sugar) has proven hepatoprotective benefits'],
        recommendedSpecialty: 'Gastroenterologist'
      },
      {
        name: 'Gallstones (Cholelithiasis)',
        description: 'Hardened deposits of cholesterol or bilirubin forming inside the gallbladder lumen.',
        indiaOccurrence: '6.1% in South India vs up to 12.5% to 15% in Gangetic plains of North & East India (Bihar, UP, Bengal).',
        globalOccurrence: '10% to 15% in Western adult populations; lower in East Asian populations.',
        responsibleFactors: [
          'High cholesterol saturation in bile coupled with gallbladder hypomotility',
          'Estrogen influence (higher in females: 4F rule: Female, Forty, Fertile, Fat)',
          'Rapid weight loss and prolonged fasting cycles',
          'Water contamination with heavy metals in Gangetic basin'
        ],
        lifestyleTriggers: ['High-calorie, low-fiber fried diet', 'Sudden crash diets', 'Oral contraceptive pills'],
        earlySymptoms: ['Sudden severe cramping pain in right upper abdomen radiating to right shoulder/back (Biliary Colic)', 'Nausea and vomiting following a rich oily meal', 'Indigestion, belching and intolerance to fatty foods'],
        preventionSteps: ['High dietary fiber intake from whole grains and vegetables', 'Avoid crash diets; maintain steady gradual weight loss', 'Stay adequately hydrated throughout the day', 'Laparoscopic cholecystectomy if symptomatic to avoid pancreatitis'],
        recommendedSpecialty: 'General Surgeon'
      }
    ]
  },
  {
    id: 'pancreas-endocrine',
    name: 'Pancreas & Endocrine System',
    hindiName: 'अग्न्याशय एवं अंतःस्रावी प्रणाली',
    system: 'Endocrine System',
    svgZone: 'abdomen',
    icon: 'Flame',
    commonDiseases: [
      {
        name: 'Type 2 Diabetes Mellitus',
        description: 'Chronic metabolic disorder characterized by beta-cell secretory dysfunction and peripheral insulin resistance.',
        indiaOccurrence: 'India is the "Diabetes Capital" with 101 million diagnosed diabetics and another 136 million in pre-diabetic stage (ICMR-INDIAB study).',
        globalOccurrence: '537 million adults globally (10.5% prevalence); projected to rise to 783 million by 2045.',
        responsibleFactors: [
          'Genetic predisposition with lower beta-cell reserve in South Asians',
          'High refined carbohydrate diet (rice, roti without bran, fried snacks)',
          'Visceral fat accumulation causing chronic low-grade inflammation',
          'Epigenetic "Thrifty Gene" hypothesis due to historical nutritional famine'
        ],
        lifestyleTriggers: ['Physical inactivity', 'Mental stress raising cortisol and glucose', 'Disturbed circadian rhythm & shift work'],
        earlySymptoms: ['Frequent urination, especially waking at night (Polyuria)', 'Excessive unquenchable thirst (Polydipsia)', 'Persistent hunger (Polyphagia)', 'Slow healing of cuts or wounds and frequent fungal infections'],
        preventionSteps: ['Maintain HbA1c < 6.5% with personalized nutrition and exercise', 'Eat plate method: 50% raw vegetables/salad, 25% protein (dal/paneer/eggs), 25% complex carbs', '10-minute post-meal brisk walk to blunt postprandial glucose spike', 'Screen yearly starting at age 25 in individuals with family history'],
        recommendedSpecialty: 'Endocrinologist/Diabetologist'
      }
    ]
  },
  {
    id: 'kidneys-renal',
    name: 'Kidneys & Urinary Tract',
    hindiName: 'गुर्दे एवं मूत्र प्रणाली',
    system: 'Renal System',
    svgZone: 'kidneys',
    icon: 'Droplets',
    commonDiseases: [
      {
        name: 'Chronic Kidney Disease (CKD)',
        description: 'Gradual, irreversible loss of renal nephron filtration capacity over months to years.',
        indiaOccurrence: 'Prevalence in India is estimated at 13.8% (~100 million people affected; > 150,000 progress to end-stage kidney failure yearly).',
        globalOccurrence: '9.1% to 13.4% worldwide (~850 million individuals globally).',
        responsibleFactors: [
          'Diabetic Nephropathy responsible for 40-50% of CKD in India',
          'Hypertensive Nephrosclerosis causing glomerular capillary destruction',
          'Indiscriminate overuse of over-the-counter NSAID painkillers (Diclofenac, Ibuprofen, Aceclofenac)',
          'Heavy metal contamination (lead, cadmium) in unregulated indigenous potions / bhasmas'
        ],
        lifestyleTriggers: ['Chronic dehydration in tropical climates', 'Excessive salt intake', 'Smoking'],
        earlySymptoms: ['Often silent until 70% function lost', 'Frothy or foamy urine (proteinuria)', 'Swelling around eyes in the morning and ankle edema in the evening', 'Loss of appetite, metallic taste, nausea, and persistent fatigue'],
        preventionSteps: ['Test Urine Albumin-to-Creatinine Ratio (uACR) and Serum Creatinine annually if diabetic or hypertensive', 'Never consume OTC painkillers without doctor prescription', 'Drink 2.5 to 3 Litres clean filtered water daily unless fluid restricted', 'Keep blood pressure under strict control (< 125/75 mmHg if proteinuria present)'],
        recommendedSpecialty: 'Nephrologist'
      },
      {
        name: 'Kidney Stones (Nephrolithiasis)',
        description: 'Crystalline mineral aggregates forming within the renal calyces and pelvis, commonly calcium oxalate.',
        indiaOccurrence: 'India falls within the Afro-Asian "Stone Belt"; 12% of the Indian population is affected by urinary calculi during their lifetime.',
        globalOccurrence: '8% to 12% global lifetime risk; incidence has doubled over the past 30 years.',
        responsibleFactors: [
          'Chronic tropical heat and dehydration resulting in concentrated acidic urine',
          'High dietary oxalate (spinach, beetroot, nuts, chocolate) with inadequate dietary calcium',
          'Excess animal protein intake and high sodium diets which increase urinary calcium excretion',
          'Metabolic conditions such as primary hyperparathyroidism or gout (uric acid stones)'
        ],
        lifestyleTriggers: ['Inadequate water intake during hot summer months', 'High sodium intake', 'Excess carbonated cola beverages'],
        earlySymptoms: ['Excruciating spasmodic loin-to-groin flank pain (Renal Colic)', 'Pink, red, or brownish urine (hematuria)', 'Frequent urgent desire to urinate with burning sensation', 'Nausea and vomiting during severe spasms'],
        preventionSteps: ['Drink at least 3 to 3.5 Litres of fluids daily to produce > 2 Litres of clear urine daily', 'Add fresh lemon/lime juice to drinking water (citrate naturally inhibits crystal growth)', 'Maintain normal dietary calcium (milk/curd) to bind dietary oxalate in the gut', 'Reduce table salt to reduce urinary calcium supersaturation'],
        recommendedSpecialty: 'Urologist'
      }
    ]
  },
  {
    id: 'stomach-gi',
    name: 'Stomach, Colon & Intestines',
    hindiName: 'पेट, आंत एवं पाचन तंत्र',
    system: 'Gastrointestinal System',
    svgZone: 'abdomen',
    icon: 'Flame',
    commonDiseases: [
      {
        name: 'Peptic Ulcer Disease & H. Pylori Gastritis',
        description: 'Erosions in the gastric or duodenal mucosa caused by Helicobacter pylori colonization and acid hypersecretion.',
        indiaOccurrence: 'Helicobacter pylori infection rate is 70% to 80% in the Indian population (transmitted via contaminated water and close contact).',
        globalOccurrence: 'Approx 44% to 50% global population is infected with H. Pylori.',
        responsibleFactors: [
          'Helicobacter pylori bacterial infection disrupting gastric mucosal defense',
          'Frequent unprescribed use of aspirin and NSAID analgesics',
          'High intake of extremely spicy, deep-fried foods and stale reused cooking oils',
          'Severe emotional and physiological stress'
        ],
        lifestyleTriggers: ['Cigarette / bidi smoking', 'Alcohol consumption', 'Irregular fasting followed by large heavy meals'],
        earlySymptoms: ['Burning epigastric pain between meals or at night', 'Early satiety, bloating, and postprandial fullness', 'Acid regurgitation / heartburn (GERD)', 'Nausea and belching'],
        preventionSteps: ['Drink boiled or RO purified water', 'Complete 14-day Triple/Quadruple H. Pylori eradication therapy if diagnosed', 'Avoid self-medicating with pain relievers', 'Small, frequent balanced meals rather than skipping food'],
        recommendedSpecialty: 'Gastroenterologist'
      }
    ]
  },
  {
    id: 'bones-joints',
    name: 'Bones, Joints & Musculoskeletal',
    hindiName: 'हड्डियां एवं जोड़',
    system: 'Musculoskeletal System',
    svgZone: 'limbs',
    icon: 'Bone',
    commonDiseases: [
      {
        name: 'Osteoarthritis (Degenerative Knee & Spine Disease)',
        description: 'Progressive wear and degradation of articular cartilage leading to subchondral bone remodeling and joint space narrowing.',
        indiaOccurrence: 'Osteoarthritis affects 28.7% of Indian adults (over 180 million people; India has the highest prevalence of severe bilateral knee OA globally).',
        globalOccurrence: 'Affects 240 million people globally (~10% of men and 18% of women over 60).',
        responsibleFactors: [
          'Cultural practices of deep squatting, kneeling, and cross-legged sitting on floor for long durations',
          'Vitamin D3 deficiency (prevalent in > 70% of Indians due to melanin absorbing UV rays and modern indoor lifestyle)',
          'High BMI putting 4x force on knee joints with every step',
          'Prior meniscus or ACL ligament sports injuries'
        ],
        lifestyleTriggers: ['Sedentary habits leading to quadriceps muscle wasting', 'Lack of sunlight exposure', 'Carrying heavy loads'],
        earlySymptoms: ['Deep aching knee pain on climbing stairs or getting up from low chair', 'Morning joint stiffness lasting under 30 minutes', 'Crepitus (grating/crackling sound) during joint movement', 'Gradual bow-leg (Genu Varum) knee deformity'],
        preventionSteps: ['Regular quadriceps strengthening exercises (straight leg raises, cycling)', 'Maintain healthy BMI (losing 1 kg reduces 4 kg knee pressure)', 'Correct Vitamin D deficiency with 60,000 IU cholecalciferol as prescribed', 'Use western commodes and avoid deep squatting once joint pain starts'],
        recommendedSpecialty: 'Orthopedic'
      }
    ]
  },
  {
    id: 'skin-tissues',
    name: 'Skin & Integumentary System',
    hindiName: 'त्वचा एवं बाल',
    system: 'Integumentary System',
    svgZone: 'skin',
    icon: 'Sparkles',
    commonDiseases: [
      {
        name: 'Recalcitrant Dermatophytosis (Tinea / Ringworm)',
        description: 'Superficial fungal infection of the skin caused by Trichophyton species, complicated by epidemic steroid resistance in India.',
        indiaOccurrence: 'Epidemic proportions in India: estimated 20% to 25% of all dermatology OPD visits in Indian clinics.',
        globalOccurrence: 'Affects 10% to 15% worldwide, but severe recalcitrant steroid-modified cases are concentrated in the Indian subcontinent.',
        responsibleFactors: [
          'Tropical hot and humid climate favoring fungal proliferation in body folds',
          'Uncontrolled sale and misuse of topical cocktail steroid-antibacterial-antifungal creams (e.g., Quadriderm, Betnovate, Panderm) sold OTC',
          'Overcrowding and sharing of bedsheets, undergarments, and towels',
          'Tight synthetic fabrics (jeans, polyester) trapping sweat'
        ],
        lifestyleTriggers: ['Poor personal hygiene', 'Wearing unwashed sweaty workout clothes', 'Public gym equipment without cleaning'],
        earlySymptoms: ['Intensely itchy circular annular red rash with active raised scaly borders and central clearing', 'Spreading rash in groin (Jock itch / Tinea cruris) and body folds', 'Burning sensation aggravated by sweat'],
        preventionSteps: ['Never use over-the-counter mixed steroid creams (steroids make fungi mutate and resist drugs)', 'Wear loose, breathable cotton clothing', 'Bathe twice daily during hot humid weather; dry skin folds thoroughly', 'Wash and iron clothes inside out with hot water; do not share towels'],
        recommendedSpecialty: 'Dermatologist'
      }
    ]
  }
];
