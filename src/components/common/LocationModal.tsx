import React, { useState, useMemo } from 'react';
import { MapPin, Navigation, X, Check, Search, ChevronRight, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { INDIAN_STATES_AND_CITIES } from '../../data/mockData';

const ALL_STATES = Object.keys(INDIAN_STATES_AND_CITIES);

export const LocationModal: React.FC = () => {
  const { showLocationModal, setShowLocationModal, currentLocation, setCurrentLocation, showToast } = useApp();
  const [citySearch, setCitySearch] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  if (!showLocationModal) return null;

  const handleSelectCity = (city: string, state: string) => {
    setCurrentLocation({
      city,
      state,
      area: `${city} Central`,
    });
    setShowLocationModal(false);
    showToast(`Location set to ${city}, ${state}`);
  };

  const handleUseCurrentLocation = () => {
    setIsDetecting(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsDetecting(false);
          handleSelectCity('Agartala', 'Tripura');
        },
        () => {
          setIsDetecting(false);
          handleSelectCity('Agartala', 'Tripura');
        },
        { timeout: 3000 }
      );
    } else {
      setTimeout(() => {
        setIsDetecting(false);
        handleSelectCity('Agartala', 'Tripura');
      }, 1000);
    }
  };

  // Search results: match states and cities
  const searchResults = useMemo(() => {
    if (!citySearch.trim()) return null;
    const query = citySearch.toLowerCase();
    const results: { city: string; state: string }[] = [];

    for (const [state, cities] of Object.entries(INDIAN_STATES_AND_CITIES)) {
      // If state name matches, add all its cities
      const stateMatches = state.toLowerCase().includes(query);
      for (const city of cities) {
        if (stateMatches || city.toLowerCase().includes(query)) {
          results.push({ city, state });
        }
      }
    }
    return results;
  }, [citySearch]);

  const isSearching = citySearch.trim().length > 0;

  // Filtered states (for browsing without search)
  const filteredStates = ALL_STATES;
  const citiesForState = selectedState ? INDIAN_STATES_AND_CITIES[selectedState] || [] : [];

  const handleBack = () => {
    setSelectedState(null);
  };

  return (
    <div
      id="location-permission-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
    >
      <div
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-250"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2 text-emerald-800 font-bold">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-heading font-bold text-slate-900">Find Doctors Near You</h3>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Allow SehatSetu to use your location to show nearby doctors, clinics and hospitals.
            </p>
          </div>
          <button
            id="close-location-modal-btn"
            onClick={() => setShowLocationModal(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GPS Auto-detect button */}
        <div className="pt-4 pb-2">
          <button
            id="allow-gps-location-btn"
            onClick={handleUseCurrentLocation}
            disabled={isDetecting}
            className="w-full bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-900 px-4 py-3 rounded-2xl flex items-center justify-between font-semibold text-sm transition-all active:scale-[0.98]"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <Navigation className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-emerald-950">
                  {isDetecting ? 'Detecting current GPS location...' : 'Allow Location (Auto-detect)'}
                </div>
                <div className="text-xs text-emerald-700 font-normal">Use device GPS for accurate nearby results</div>
              </div>
            </div>
          </button>
        </div>

        {/* City Search */}
        <div className="py-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Or Enter Location Manually
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="city-search-input"
              type="text"
              placeholder="Search state or city (e.g. Maharashtra, Agartala)..."
              value={citySearch}
              onChange={(e) => { setCitySearch(e.target.value); setSelectedState(null); }}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pt-2 no-scrollbar">
          {isSearching ? (
            /* Search Results */
            <>
              {searchResults && searchResults.length > 0 ? (
                <>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 pb-4">
                    {searchResults.map(({ city, state }) => {
                      const isSelected = currentLocation.city === city && currentLocation.state === state;
                      return (
                        <button
                          key={`${state}-${city}`}
                          onClick={() => handleSelectCity(city, state)}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between text-sm transition-all ${
                            isSelected
                              ? 'bg-emerald-800 text-white border-emerald-800 font-semibold shadow-xs'
                              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <MapPin className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-emerald-300' : 'text-slate-400'}`} />
                            <div>
                              <span className="font-medium">{city}</span>
                              <span className={`text-xs ml-1.5 ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`}>
                                {state}
                              </span>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-emerald-300" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <MapPin className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-medium">No results found</p>
                  <p className="text-xs mt-1">Try a different state or city name</p>
                </div>
              )}
            </>
          ) : selectedState ? (
            /* Cities in selected state */
            <>
              <button
                onClick={handleBack}
                className="flex items-center space-x-1.5 text-sm text-emerald-700 font-semibold mb-3 hover:text-emerald-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to States</span>
              </button>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Cities in {selectedState}
              </div>
              <div className="grid grid-cols-2 gap-2 pb-4">
                {citiesForState.map((city) => {
                  const isSelected = currentLocation.city === city && currentLocation.state === selectedState;
                  return (
                    <button
                      key={city}
                      id={`city-select-${city.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => handleSelectCity(city, selectedState)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between text-sm transition-all ${
                        isSelected
                          ? 'bg-emerald-800 text-white border-emerald-800 font-semibold shadow-xs'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <MapPin className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-emerald-300' : 'text-slate-400'}`} />
                        <span>{city}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-300" />}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            /* States List */
            <>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Select a State / Union Territory
              </div>
              <div className="grid grid-cols-1 gap-1.5 pb-4">
                {filteredStates.map((state) => {
                  const cityCount = INDIAN_STATES_AND_CITIES[state].length;
                  const isCurrentState = currentLocation.state === state;
                  return (
                    <button
                      key={state}
                      id={`state-select-${state.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => setSelectedState(state)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between text-sm transition-all ${
                        isCurrentState
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <MapPin className={`w-3.5 h-3.5 flex-shrink-0 ${isCurrentState ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <div>
                          <span className="font-medium">{state}</span>
                          <span className={`text-xs ml-1.5 ${isCurrentState ? 'text-emerald-500' : 'text-slate-400'}`}>
                            {cityCount} {cityCount === 1 ? 'city' : 'cities'}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isCurrentState ? 'text-emerald-500' : 'text-slate-300'}`} />
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
