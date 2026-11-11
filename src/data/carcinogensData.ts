export type IarcGroup = 'Group 1' | 'Group 2A' | 'Group 2B';

export interface CarcinogenItem {
  id: string;
  name: string;
  hindiName: string;
  category: 'Tobacco & Areca Nut' | 'Air & Environmental' | 'Dietary & Water' | 'Biological & Infectious' | 'Occupational & Chemical' | 'Radiation';
  iarcClassification: IarcGroup;
  iarcMeaning: string;
  targetOrgans: string[];
  indiaContext: {
    exposureSeverity: 'CRITICAL (Epidemic)' | 'HIGH' | 'MODERATE';
    affectedPopulation: string;
    annualCasesIndia: string;
    commonForms: string[];
  };
  globalBurden: string;
  mechanism: string;
  earlyWarningSigns: string[];
  safeAlternatives: string[];
  screeningAndPrevention: string;
}

export const CARCINOGENS_DATABASE: CarcinogenItem[] = [
  {
    id: 'smokeless-tobacco',
    name: 'Smokeless Tobacco (Gutkha, Khaini, Zarda, Pan Masala)',
    hindiName: 'धुआंरहित तंबाकू (गुटखा, खैनी, जर्दा, पान मसाला)',
    category: 'Tobacco & Areca Nut',
    iarcClassification: 'Group 1',
    iarcMeaning: 'Carcinogenic to Humans (Sufficient scientific evidence of causing cancer)',
    targetOrgans: ['Oral Cavity (Cheek, Tongue, Gum)', 'Pharynx', 'Esophagus (Food pipe)'],
    indiaContext: {
      exposureSeverity: 'CRITICAL (Epidemic)',
      affectedPopulation: 'Over 200 million users in India (India is the global oral cancer capital, accounting for one-third of all oral cancer cases worldwide).',
      annualCasesIndia: '135,000+ new oral cancer cases per year; 75,000+ deaths annually in India.',
      commonForms: ['Khaini (tobacco mixed with slaked lime/chuna kept in lower labial groove)', 'Gutkha (crushed areca nut, tobacco, paraffin, flavorings)', 'Zarda / Mawa', 'Gul (tobacco tooth powder)']
    },
    globalBurden: 'Causes over 350,000 oral cancer deaths worldwide annually, 85% concentrated in South Asia.',
    mechanism: 'Tobacco-Specific Nitrosamines (TSNAs such as NNK and NNN) cause direct DNA adduct formation, p53 tumor-suppressor gene mutations, and chronic mucosal ulceration in the buccal vestibule.',
    earlyWarningSigns: [
      'Non-healing painless ulcer or sore in mouth persisting > 2 weeks',
      'White patch (Leukoplakia) or red velvety patch (Erythroplakia) on gums or inner cheek',
      'Difficulty opening mouth completely (Trismus due to Oral Submucous Fibrosis)',
      'Lump or thickening in the cheek or neck lymph nodes',
      'Difficulty chewing or swallowing'
    ],
    safeAlternatives: [
      'Nicotine Replacement Therapy (NRT: Nicotine gums 2mg/4mg, transdermal patches under medical supervision)',
      'Roasted fennel seeds (saunf), cardamom, and roasted carom seeds (ajwain) for oral fixation',
      'Behavioral counseling via National Tobacco Quitline (Toll-free 1800-11-2356)'
    ],
    screeningAndPrevention: 'Monthly self-oral examination in front of mirror; 6-monthly oral screening with toluidine blue or visual inspection by a dentist.'
  },
  {
    id: 'areca-nut',
    name: 'Areca Nut / Betel Nut (Supari)',
    hindiName: 'सुपारी / छालिया (बिना तंबाकू भी कैंसरकारी)',
    category: 'Tobacco & Areca Nut',
    iarcClassification: 'Group 1',
    iarcMeaning: 'Carcinogenic to Humans (Independent of tobacco, classified by WHO/IARC since 2004)',
    targetOrgans: ['Oral Cavity', 'Pharynx', 'Esophagus', 'Liver'],
    indiaContext: {
      exposureSeverity: 'CRITICAL (Epidemic)',
      affectedPopulation: 'Widespread social acceptance in weddings, religious rituals, and sweetened "scented supari" consumed even by children and young adults.',
      annualCasesIndia: 'Direct precursor to Oral Submucous Fibrosis (OSF), affecting > 5 million Indians, with a 7-10% malignant transformation rate into squamous cell carcinoma.',
      commonForms: ['Raw/dried areca nut with betel leaf (Paan)', 'Flavored packaged supari', 'Sweet mawa without tobacco']
    },
    globalBurden: '4th most widely consumed psychoactive substance in the world after caffeine, alcohol, and nicotine (~600 million users worldwide).',
    mechanism: 'Arecoline and arecaidine alkaloids stimulate excessive collagen synthesis by fibroblasts while inhibiting collagenase, resulting in progressive rigid fibrosis and DNA cross-linking.',
    earlyWarningSigns: [
      'Progressive burning sensation when eating spicy, salty, or acidic foods',
      'Blanching (marble-white appearance) of buccal mucosa and soft palate',
      'Progressive reduction in mouth opening (cannot insert more than 2-3 fingers)',
      'Loss of tongue papillae and restricted tongue movement'
    ],
    safeAlternatives: [
      'Roasted sesame seeds, pumpkin seeds, and melon seeds',
      'Sugar-free mints or pure clove (laung) for mouth freshening',
      'Complete elimination of packaged supari'
    ],
    screeningAndPrevention: 'Strict cessation immediately upon early burning sensation. Intralesional steroid and hyaluronidase injections for OSF under maxillofacial surgeon guidance.'
  },
  {
    id: 'combustion-tobacco',
    name: 'Bidi & Cigarette Smoking (Tobacco Smoke)',
    hindiName: 'बीड़ी एवं सिगरेट का धुआं',
    category: 'Tobacco & Areca Nut',
    iarcClassification: 'Group 1',
    iarcMeaning: 'Carcinogenic to Humans (Contains over 70 identified human carcinogens)',
    targetOrgans: ['Lungs & Bronchus', 'Larynx (Voice box)', 'Urinary Bladder', 'Pancreas', 'Esophagus', 'Kidney'],
    indiaContext: {
      exposureSeverity: 'CRITICAL (Epidemic)',
      affectedPopulation: 'Approx 100 million smokers in India. Bidis outsell cigarettes 8 to 1. Bidi smoke delivers 3x more nicotine and carbon monoxide and 5x more tar than filtered cigarettes.',
      annualCasesIndia: '100,000+ new lung and larynx cancers annually. Tobacco smoking causes 1 million deaths per year in India.',
      commonForms: ['Bidi (unprocessed tobacco hand-rolled in tendu leaf)', 'Cigarettes', 'Hookah / Shisha', 'Chillum']
    },
    globalBurden: 'Leading preventable cause of death globally, causing > 8 million deaths each year, including 1.3 million non-smokers exposed to secondhand smoke.',
    mechanism: 'Benzopyrene, 1,3-butadiene, benzene, formaldehyde, and polonium-210 cause covalent DNA damage, adducts at codons 157, 248, and 273 of the TP53 gene, and chronic respiratory inflammation.',
    earlyWarningSigns: [
      'Persistent cough lasting more than 3 weeks or changing cough character',
      'Coughing up blood or rust-colored phlegm (Hemoptysis)',
      'Unexplained hoarseness of voice persisting > 2 weeks',
      'Shortness of breath, wheezing, and recurring bronchitis/pneumonia',
      'Painless hematuria (blood in urine, indicative of bladder cancer)'
    ],
    safeAlternatives: [
      'Medical smoking cessation therapy (Varenicline, Bupropion, Nicotine Inhalers/gums)',
      'Aerobic deep breathing exercises and yoga pranayama',
      'Digital smoke-free tracker applications'
    ],
    screeningAndPrevention: 'Annual Low-Dose Computed Tomography (LDCT) chest screening for adults aged 50-80 with a 20 pack-year smoking history.'
  },
  {
    id: 'biomass-smoke',
    name: 'Indoor Biomass & Chulha Smoke',
    hindiName: 'चूल्हे का धुआं (लकड़ी, उपले एवं कोयले का दहन)',
    category: 'Air & Environmental',
    iarcClassification: 'Group 1',
    iarcMeaning: 'Carcinogenic to Humans (Indoor emissions from household fuel combustion)',
    targetOrgans: ['Lungs', 'Nasopharynx', 'Larynx'],
    indiaContext: {
      exposureSeverity: 'HIGH',
      affectedPopulation: 'Over 40% of rural Indian households still utilize firewood, cow-dung cakes, and crop residues for indoor cooking in poorly ventilated spaces.',
      annualCasesIndia: 'Major driver of non-smoking lung cancer in rural Indian women (over 30,000 lung adenocarcinoma cases in non-smoking women).',
      commonForms: ['Unvented mud cookstoves (Chulha)', 'Dung cake fire', 'Coal stoves (Angithi)']
    },
    globalBurden: 'Responsible for 3.2 million premature deaths annually from indoor air pollution worldwide.',
    mechanism: 'Incomplete combustion releases lethal concentrations of Polycyclic Aromatic Hydrocarbons (PAHs like Benzo[a]pyrene), fine particulate matter (PM2.5), and carbon monoxide at levels 20-50x WHO guidelines.',
    earlyWarningSigns: [
      'Chronic daily dry cough or cough with greyish sputum',
      'Progressive breathlessness on exertion',
      'Unexplained dull thoracic chest wall pain',
      'Significant unintentional weight loss'
    ],
    safeAlternatives: [
      'Pradhan Mantri Ujjwala Yojana clean LPG cylinders',
      'Electric induction cooktops and solar cookers',
      'Installation of chimney exhaust hoods in kitchens'
    ],
    screeningAndPrevention: 'Ventilate kitchen spaces with at least two open windows during cooking; annual chest X-ray/LDCT for long-term chulha cooks with respiratory symptoms.'
  },
  {
    id: 'arsenic-groundwater',
    name: 'Arsenic in Drinking Groundwater',
    hindiName: 'पीने के पानी में आर्सेनिक विष',
    category: 'Dietary & Water',
    iarcClassification: 'Group 1',
    iarcMeaning: 'Carcinogenic to Humans (Inorganic Arsenic compounds in drinking water)',
    targetOrgans: ['Skin (Basal & Squamous cell carcinoma)', 'Urinary Bladder', 'Lungs', 'Kidneys', 'Liver (Angiosarcoma)'],
    indiaContext: {
      exposureSeverity: 'HIGH',
      affectedPopulation: 'Over 50 million people across the Gangetic-Brahmaputra alluvial plains (West Bengal, Bihar, Eastern UP, Jharkhand, Assam) drink groundwater with arsenic > 10 µg/L (often exceeding 50-300 µg/L).',
      annualCasesIndia: 'High incidence of arsenicosis, Blackfoot disease, keratosis, and secondary visceral malignancies in affected rural districts.',
      commonForms: ['Shallow hand-pump tube-wells penetrating arsenic-rich alluvial aquifers', 'Crops irrigated with contaminated tubewell water (rice bioaccumulating arsenic)']
    },
    globalBurden: 'More than 140 million people in 50 countries drink water containing arsenic above the WHO guideline value.',
    mechanism: 'Inorganic trivalent arsenite [As(III)] disrupts cellular oxidative phosphorylation, generates reactive oxygen species (ROS), inhibits DNA repair enzymes, and induces chromosomal aberrations.',
    earlyWarningSigns: [
      'Raindrop pigmentation (dark brown/black macules interspersed with normal skin) on chest, back, and abdomen',
      'Rough, hard, wart-like nodular thickening on palms and soles (Arsenical Keratosis)',
      'Non-healing scaly crusts or ulcers on skin exposed to sun',
      'Painless blood in urine or chronic cough'
    ],
    safeAlternatives: [
      'Deep aquifer tubewells (> 100-150 meters deep with proven low arsenic levels)',
      'Community piped surface river water purification schemes (Jal Jeevan Mission)',
      'Certified domestic Reverse Osmosis (RO) or iron-arsenic removal filters'
    ],
    screeningAndPrevention: 'Test handpump water with arsenic field testing kits; clinical inspection of palms and soles for hyperkeratosis every 6 months.'
  },
  {
    id: 'hpv-virus',
    name: 'Human Papillomavirus (High-Risk HPV 16 & 18)',
    hindiName: 'ह्यूमन पेपिलोमावायरस (एचपीवी संक्रमण)',
    category: 'Biological & Infectious',
    iarcClassification: 'Group 1',
    iarcMeaning: 'Carcinogenic to Humans (Responsible for > 95% of cervical cancers)',
    targetOrgans: ['Cervix (Cervical Cancer)', 'Oropharynx (Base of tongue, tonsils)', 'Anus & Genital tract'],
    indiaContext: {
      exposureSeverity: 'HIGH',
      affectedPopulation: 'Cervical cancer is the 2nd most common cancer in Indian women (India accounts for nearly 20% of the global cervical cancer death toll).',
      annualCasesIndia: '123,000+ new cases and ~77,000 deaths annually in India.',
      commonForms: ['Sexually transmitted mucosal contact', 'Persistent chronic infection in women with poor genital hygiene, early marriage, and multiple child births']
    },
    globalBurden: 'Over 600,000 new cervical cancer cases worldwide annually, with 340,000 deaths (90% in low- and middle-income nations).',
    mechanism: 'Viral oncoproteins E6 and E7 degrade tumor suppressor proteins p53 and pRb respectively, allowing uncontrolled host cellular cycle replication and malignant transformation.',
    earlyWarningSigns: [
      'Irregular vaginal bleeding between menstrual cycles',
      'Post-coital bleeding (bleeding after sexual intercourse)',
      'Post-menopausal bleeding or foul-smelling watery vaginal discharge',
      'Pelvic pain or pain during intercourse'
    ],
    safeAlternatives: [
      'Quadrivalent / Nonavalent HPV Vaccine (Gardasil / Cervavac developed by Serum Institute of India)',
      'Ideal vaccination age: Girls and boys aged 9 to 14 years before sexual debut (2-dose schedule)'
    ],
    screeningAndPrevention: 'Pap smear every 3 years or HPV DNA PCR test every 5 years for women aged 25-65; visual inspection with acetic acid (VIA) in rural centers.'
  },
  {
    id: 'aflatoxin-molds',
    name: 'Aflatoxins (Aspergillus flavus in Stored Grains)',
    hindiName: 'एफ्लाटॉक्सिन फंगस (सड़ी हुई मूंगफली, मक्का एवं मसाले)',
    category: 'Dietary & Water',
    iarcClassification: 'Group 1',
    iarcMeaning: 'Carcinogenic to Humans (Potent hepatocarcinogen produced by fungi)',
    targetOrgans: ['Liver (Hepatocellular Carcinoma)'],
    indiaContext: {
      exposureSeverity: 'MODERATE',
      affectedPopulation: 'High humidity and warm monsoonal temperatures promote fungal growth during improper drying and storage of peanuts (groundnuts), maize, red chillies, and mustard seeds.',
      annualCasesIndia: 'Significant synergistic cofactor with Hepatitis B virus for endemic primary liver cancer in rural agricultural communities.',
      commonForms: ['Discolored, bitter-tasting or moldy peanuts and peanut oil', 'Improperly stored damp corn/maize', 'Unhygienically dried spice powders']
    },
    globalBurden: 'Contributes to 28,000 to 155,000 liver cancer cases annually worldwide.',
    mechanism: 'Aflatoxin B1 is metabolized by liver cytochrome P450 into Aflatoxin-8,9-epoxide, which causes G-to-T transversion mutations specifically at codon 249 of the p53 gene.',
    earlyWarningSigns: [
      'Dull aching pain in right upper abdomen',
      'Rapid yellowing of eyes and skin (Jaundice)',
      'Abdominal swelling with fluid (Ascites)',
      'Unexplained weight loss and severe weakness'
    ],
    safeAlternatives: [
      'Discard any shriveled, moldy, or bitter-tasting nuts or grains immediately (do not scrape off mold)',
      'Store all dry rations in airtight containers in dry, cool conditions',
      'Hepatitis B vaccination (prevents lethal synergy with Aflatoxin)'
    ],
    screeningAndPrevention: 'Annual Liver Ultrasound and Serum Alpha-Fetoprotein (AFP) screening for individuals with chronic Hepatitis B/C or fatty liver.'
  },
  {
    id: 'reheated-cooking-oils',
    name: 'Repeatedly Reheated Cooking Oils & Trans-Fats',
    hindiName: 'बार-बार गर्म किया हुआ तेल एवं ट्रांस फैट',
    category: 'Dietary & Water',
    iarcClassification: 'Group 2A',
    iarcMeaning: 'Probably Carcinogenic to Humans (Thermal degradation generates toxic mutagenic aldehydes)',
    targetOrgans: ['Colorectal & Intestinal Tract', 'Stomach (Gastric)', 'Liver'],
    indiaContext: {
      exposureSeverity: 'HIGH',
      affectedPopulation: 'Common commercial practice by roadside street food vendors, sweetshops (halwais), and fast-food stalls to continuously boil and reuse the same cooking oil for days.',
      annualCasesIndia: 'Major contributor to the skyrocketing incidence of colorectal cancer in younger Indian urban populations (< 45 years).',
      commonForms: ['Samosas, pakodas, pooris, bhaturas, and jalebis fried in repeatedly reused black oxidized oil', 'Vanaspati / partially hydrogenated vegetable oils']
    },
    globalBurden: 'High global contribution to lifestyle-associated colorectal, stomach, and breast cancers.',
    mechanism: 'Repeated heating past smoke point causes lipid peroxidation, yielding 4-hydroxy-2-nonenal (4-HNE), malondialdehyde, polar compounds (Total Polar Compounds > 25%), and polycyclic aromatic hydrocarbons.',
    earlyWarningSigns: [
      'Persistent change in bowel habits (alternating diarrhea and constipation)',
      'Blood in stools (bright red or dark tarry stools)',
      'Persistent abdominal cramps, bloating, or feeling of incomplete bowel emptying',
      'Unexplained iron-deficiency anemia'
    ],
    safeAlternatives: [
      'FSSAI RUCO (Repurpose Used Cooking Oil) guideline: Never reheat oil more than 1-2 times at home',
      'Use oils with high smoke points (mustard oil, groundnut oil, ghee) and discard discarded oil',
      'Air-frying, baking, grilling, and steaming food instead of deep frying'
    ],
    screeningAndPrevention: 'Fecal Immunochemical Test (FIT) annually or screening Colonoscopy every 10 years starting at age 45.'
  },
  {
    id: 'air-pollution-pm25',
    name: 'Ambient Air Pollution & Diesel Particulate Matter (PM2.5)',
    hindiName: 'वायु प्रदूषण एवं पीएम 2.5 कण',
    category: 'Air & Environmental',
    iarcClassification: 'Group 1',
    iarcMeaning: 'Carcinogenic to Humans (Outdoor air pollution evaluated as Group 1 carcinogen by IARC)',
    targetOrgans: ['Lungs', 'Urinary Bladder'],
    indiaContext: {
      exposureSeverity: 'CRITICAL (Epidemic)',
      affectedPopulation: 'India has 14 of the world’s top 20 most polluted cities. Over 99% of India’s population breathes air exceeding WHO guidelines (PM2.5 > 5 µg/m³).',
      annualCasesIndia: 'Outdoor air pollution was responsible for 1.67 million deaths in India (17.8% of all deaths in 2019, ICMR lancet study).',
      commonForms: ['Winter smog inversions (Delhi-NCR, UP, Punjab, Haryana, Bihar)', 'Vehicular diesel emissions', 'Industrial factory chimney exhausts', 'Construction dust']
    },
    globalBurden: 'Outdoor air pollution causes approximately 4.2 million premature deaths annually worldwide.',
    mechanism: 'Ultra-fine PM2.5 (< 2.5 micrometers) penetrates deep into lung alveoli and enters capillary circulation, triggering sustained oxidative stress, systemic vascular inflammation, and macrophage cellular damage.',
    earlyWarningSigns: [
      'Morning coughing fits with blackish or greyish mucus',
      'Chronic throat irritation, burning eyes, and sinusitis',
      'Exertional breathlessness in previously healthy individuals'
    ],
    safeAlternatives: [
      'Use certified HEPA air purifiers inside bedrooms during winter smog episodes',
      'Wear tight-fitting N95/N99 respirators when venturing outside during high AQI (> 200)',
      'Transition to electric public transport, metro, and non-polluting commuting'
    ],
    screeningAndPrevention: 'Monitor daily AQI levels via SAFAR / CPCB mobile apps; avoid outdoor morning jogging when AQI is in Very Poor or Severe category.'
  }
];
