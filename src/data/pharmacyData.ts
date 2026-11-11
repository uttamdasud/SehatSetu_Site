export interface PharmacyItem {
  id: string;
  name: string;
  type: 'Jan Aushadhi Kendra (PMBJP)' | 'Apollo Pharmacy' | 'MedPlus' | 'Local 24x7 Chemist' | 'Hospital Pharmacy';
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  whatsappPhone?: string;
  isOpen24Hours: boolean;
  openingHours: string;
  homeDelivery: boolean;
  deliveryMinutes: number;
  rating: number;
  reviewsCount: number;
  discountPercentage: number;
  hasJanAushadhiStock: boolean;
  hasOxygenAndWheelchair: boolean;
  lat: number;
  lng: number;
  distanceKm: number; // relative to city center
}

export const PHARMACIES_DATA: PharmacyItem[] = [
  // Agartala / Tripura
  {
    id: 'pharma-agt-1',
    name: 'Pradhan Mantri Jan Aushadhi Kendra - Agartala Central',
    type: 'Jan Aushadhi Kendra (PMBJP)',
    address: 'Shop No. 12, Opposite IGM Hospital, Central Road',
    locality: 'Central Road',
    city: 'Agartala',
    state: 'Tripura',
    pincode: '799001',
    phone: '+91 381 232 4580',
    whatsappPhone: '+91 94361 22910',
    isOpen24Hours: false,
    openingHours: '08:00 AM - 10:00 PM',
    homeDelivery: true,
    deliveryMinutes: 45,
    rating: 4.8,
    reviewsCount: 312,
    discountPercentage: 70,
    hasJanAushadhiStock: true,
    hasOxygenAndWheelchair: false,
    lat: 23.8315,
    lng: 91.2868,
    distanceKm: 0.8
  },
  {
    id: 'pharma-agt-2',
    name: 'ILS Hospital 24x7 Emergency Pharmacy',
    type: 'Hospital Pharmacy',
    address: 'ILS Hospital Complex, Capital Complex, Kunjaban',
    locality: 'Kunjaban',
    city: 'Agartala',
    state: 'Tripura',
    pincode: '799006',
    phone: '+91 381 241 5000',
    whatsappPhone: '+91 98620 44102',
    isOpen24Hours: true,
    openingHours: 'Open 24 Hours / 7 Days',
    homeDelivery: true,
    deliveryMinutes: 30,
    rating: 4.9,
    reviewsCount: 540,
    discountPercentage: 15,
    hasJanAushadhiStock: false,
    hasOxygenAndWheelchair: true,
    lat: 23.8612,
    lng: 91.2985,
    distanceKm: 2.4
  },
  {
    id: 'pharma-agt-3',
    name: 'Apollo Pharmacy - Akhaura Road',
    type: 'Apollo Pharmacy',
    address: 'Holding No. 44, Akhaura Road, Near Fire Brigade Chowmuhani',
    locality: 'Fire Brigade Chowmuhani',
    city: 'Agartala',
    state: 'Tripura',
    pincode: '799001',
    phone: '+91 381 238 9012',
    whatsappPhone: '+91 94364 88310',
    isOpen24Hours: true,
    openingHours: 'Open 24 Hours / 7 Days',
    homeDelivery: true,
    deliveryMinutes: 25,
    rating: 4.7,
    reviewsCount: 428,
    discountPercentage: 20,
    hasJanAushadhiStock: false,
    hasOxygenAndWheelchair: true,
    lat: 23.8354,
    lng: 91.2789,
    distanceKm: 1.2
  },
  {
    id: 'pharma-agt-4',
    name: 'Lifeline Chemist & Surgical Store',
    type: 'Local 24x7 Chemist',
    address: 'Opposite GB Pant Hospital Gate No. 2, Kunjaban',
    locality: 'GB Hospital Road',
    city: 'Agartala',
    state: 'Tripura',
    pincode: '799006',
    phone: '+91 381 235 6721',
    whatsappPhone: '+91 97740 55182',
    isOpen24Hours: true,
    openingHours: 'Open 24 Hours',
    homeDelivery: false,
    deliveryMinutes: 0,
    rating: 4.5,
    reviewsCount: 195,
    discountPercentage: 12,
    hasJanAushadhiStock: false,
    hasOxygenAndWheelchair: true,
    lat: 23.8589,
    lng: 91.2950,
    distanceKm: 2.1
  },

  // Kolkata / West Bengal
  {
    id: 'pharma-kol-1',
    name: 'Jan Aushadhi Kendra - Salt Lake Sector V',
    type: 'Jan Aushadhi Kendra (PMBJP)',
    address: 'Block EP & GP, Sector V, Bidhannagar',
    locality: 'Sector V',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700091',
    phone: '+91 33 2357 8890',
    whatsappPhone: '+91 98301 55670',
    isOpen24Hours: false,
    openingHours: '09:00 AM - 09:30 PM',
    homeDelivery: true,
    deliveryMinutes: 40,
    rating: 4.8,
    reviewsCount: 620,
    discountPercentage: 75,
    hasJanAushadhiStock: true,
    hasOxygenAndWheelchair: false,
    lat: 22.5802,
    lng: 88.4358,
    distanceKm: 1.5
  },
  {
    id: 'pharma-kol-2',
    name: 'MedPlus 24x7 - Park Street',
    type: 'MedPlus',
    address: '54A, Park Street, Near Mullick Bazar Crossing',
    locality: 'Park Street',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700016',
    phone: '+91 33 2229 4510',
    whatsappPhone: '+91 98312 99401',
    isOpen24Hours: true,
    openingHours: 'Open 24 Hours',
    homeDelivery: true,
    deliveryMinutes: 20,
    rating: 4.9,
    reviewsCount: 980,
    discountPercentage: 20,
    hasJanAushadhiStock: false,
    hasOxygenAndWheelchair: true,
    lat: 22.5512,
    lng: 88.3639,
    distanceKm: 0.9
  },

  // Guwahati / Assam
  {
    id: 'pharma-guw-1',
    name: 'Apollo 24x7 Pharmacy - GS Road',
    type: 'Apollo Pharmacy',
    address: 'GS Road, Christian Basti, Near Dispur Supermarket',
    locality: 'Christian Basti',
    city: 'Guwahati',
    state: 'Assam',
    pincode: '781005',
    phone: '+91 361 234 8900',
    whatsappPhone: '+91 98640 12345',
    isOpen24Hours: true,
    openingHours: 'Open 24 Hours',
    homeDelivery: true,
    deliveryMinutes: 30,
    rating: 4.8,
    reviewsCount: 710,
    discountPercentage: 18,
    hasJanAushadhiStock: false,
    hasOxygenAndWheelchair: true,
    lat: 26.1523,
    lng: 91.7780,
    distanceKm: 1.1
  },

  // Delhi / NCR
  {
    id: 'pharma-del-1',
    name: 'Pradhan Mantri Jan Aushadhi Kendra - AIIMS Delhi Sub-way',
    type: 'Jan Aushadhi Kendra (PMBJP)',
    address: 'AIIMS Metro Station Subway, Sri Aurobindo Marg, Ansari Nagar',
    locality: 'Ansari Nagar',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110029',
    phone: '+91 11 2658 9100',
    whatsappPhone: '+91 98110 55432',
    isOpen24Hours: true,
    openingHours: 'Open 24 Hours',
    homeDelivery: true,
    deliveryMinutes: 35,
    rating: 4.9,
    reviewsCount: 1450,
    discountPercentage: 75,
    hasJanAushadhiStock: true,
    hasOxygenAndWheelchair: true,
    lat: 28.5672,
    lng: 77.2100,
    distanceKm: 0.5
  },
  {
    id: 'pharma-del-2',
    name: 'Apollo Pharmacy 24x7 - Connaught Place',
    type: 'Apollo Pharmacy',
    address: 'N-Block, Outer Circle, Connaught Place',
    locality: 'Connaught Place',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
    phone: '+91 11 4151 7780',
    whatsappPhone: '+91 99990 44321',
    isOpen24Hours: true,
    openingHours: 'Open 24 Hours',
    homeDelivery: true,
    deliveryMinutes: 20,
    rating: 4.9,
    reviewsCount: 1890,
    discountPercentage: 20,
    hasJanAushadhiStock: false,
    hasOxygenAndWheelchair: true,
    lat: 28.6328,
    lng: 77.2197,
    distanceKm: 0.7
  }
];
