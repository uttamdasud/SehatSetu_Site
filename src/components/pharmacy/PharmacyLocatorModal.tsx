import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Phone,
  MessageCircle,
  Clock,
  Truck,
  ShieldCheck,
  Star,
  ExternalLink,
  X,
  Navigation,
  Percent
} from 'lucide-react';
import { PHARMACIES_DATA, PharmacyItem } from '../../data/pharmacyData';
import { useApp } from '../../context/AppContext';
import { useEscapeKey } from '../../utils/useEscapeKey';

export const PharmacyLocatorModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEscapeKey(onClose);
  const { currentLocation, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filter24x7, setFilter24x7] = useState(false);
  const [filterJanAushadhi, setFilterJanAushadhi] = useState(false);
  const [filterDelivery, setFilterDelivery] = useState(false);

  // Filter pharmacies based on city & toggles
  const filteredPharmacies = PHARMACIES_DATA.filter((pharma) => {
    // City match (or allow all if searching)
    const matchesSearch =
      searchQuery.trim() === '' ||
      pharma.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharma.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharma.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matches24x7 = !filter24x7 || pharma.isOpen24Hours;
    const matchesJanAushadhi = !filterJanAushadhi || pharma.hasJanAushadhiStock;
    const matchesDelivery = !filterDelivery || pharma.homeDelivery;

    return matchesSearch && matches24x7 && matchesJanAushadhi && matchesDelivery;
  });

  return (
    <div
      id="pharmacy-locator-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="w-full max-w-4xl bg-white rounded-3xl p-6 shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-teal-700 text-white flex items-center justify-center shadow-xs">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-heading text-slate-900">
                  Nearest 24x7 Pharmacies & Jan Aushadhi Kendras
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">
                  Verified Stores
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Locate chemists near <strong>{currentLocation.city}</strong> with home delivery, salt stock & phone numbers
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

        {/* Search Bar & Filters */}
        <div className="mt-3.5 space-y-2.5 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pharmacy name, locality, or city (e.g. Apollo, Jan Aushadhi, Kunjaban)..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setFilter24x7(!filter24x7)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition border ${
                filter24x7
                  ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>24x7 Open Only</span>
            </button>

            <button
              onClick={() => setFilterJanAushadhi(!filterJanAushadhi)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition border ${
                filterJanAushadhi
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Percent className="w-3.5 h-3.5" />
              <span>Jan Aushadhi (Up to 75% Off)</span>
            </button>

            <button
              onClick={() => setFilterDelivery(!filterDelivery)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition border ${
                filterDelivery
                  ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Home Delivery Available</span>
            </button>

            <span className="text-[11px] text-slate-400 ml-auto font-medium">
              Showing {filteredPharmacies.length} pharmacies
            </span>
          </div>
        </div>

        {/* Scrollable Pharmacy Cards Grid */}
        <div className="mt-4 flex-1 overflow-y-auto pr-1 space-y-3">
          {filteredPharmacies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2">
              {filteredPharmacies.map((pharmacy) => {
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${pharmacy.name}, ${pharmacy.address}, ${pharmacy.city}`
                )}`;

                return (
                  <div
                    key={pharmacy.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-teal-300 hover:shadow-xs transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          pharmacy.type.includes('Jan Aushadhi')
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : pharmacy.type.includes('Apollo')
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : 'bg-teal-100 text-teal-800 border border-teal-200'
                        }`}>
                          {pharmacy.type}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {pharmacy.isOpen24Hours ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              24x7 Open
                            </span>
                          ) : (
                            <span className="text-[10px] font-medium text-slate-500">
                              {pharmacy.openingHours}
                            </span>
                          )}
                          <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                            ★ {pharmacy.rating}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 font-heading">
                        {pharmacy.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 flex items-start gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{pharmacy.address}, {pharmacy.locality}, {pharmacy.city} - {pharmacy.pincode}</span>
                      </p>

                      {/* Distance & Feature Pills */}
                      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px]">
                        <span className="font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                          {pharmacy.distanceKm} km away
                        </span>

                        {pharmacy.homeDelivery && (
                          <span className="font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 flex items-center gap-1">
                            <Truck className="w-3 h-3 text-blue-600" />
                            ~{pharmacy.deliveryMinutes} min delivery
                          </span>
                        )}

                        {pharmacy.discountPercentage > 20 && (
                          <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                            Up to {pharmacy.discountPercentage}% Off
                          </span>
                        )}

                        {pharmacy.hasOxygenAndWheelchair && (
                          <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                            Oxygen & Wheelchair Stocked
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <a
                        href={`tel:${pharmacy.phone}`}
                        className="flex-1 py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold flex items-center justify-center gap-1 transition"
                      >
                        <Phone className="w-3 h-3 text-slate-600" />
                        <span>Call</span>
                      </a>

                      {pharmacy.whatsappPhone && (
                        <a
                          href={`https://api.whatsapp.com/send?phone=${pharmacy.whatsappPhone.replace(/[^0-9]/g, '')}&text=Hello%20${encodeURIComponent(pharmacy.name)},%20I%20want%20to%20inquire%20about%20medicine%20availability%20and%20home%20delivery.`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-1.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center justify-center gap-1 border border-emerald-200 transition"
                        >
                          <MessageCircle className="w-3 h-3 text-emerald-600" />
                          <span>WhatsApp</span>
                        </a>
                      )}

                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-1.5 px-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-[11px] font-bold flex items-center justify-center gap-1 transition shadow-xs"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>Maps Directions</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <MapPin className="w-10 h-10 mx-auto mb-2 opacity-30 text-teal-600" />
              <p className="text-sm font-bold text-slate-700">No matching pharmacies found</p>
              <p className="text-xs text-slate-500 mt-1">Try relaxing filters or search a nearby locality</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP) authorized outlet directory
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
