// src/components/CityDropdown.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useUserStore } from '../store/userStore';

interface CityDropdownProps {
  cities: string[];
}

const CityDropdown: React.FC<CityDropdownProps> = ({ cities }) => {
  const { selectedCity, setSelectedCity } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

   
  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (city: string) => {
    setSelectedCity(city);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    setSelectedCity('');
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div ref={dropdownRef} className="relative ">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-left flex items-center justify-between hover:border-blue-500/50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <div className="flex items-center gap-3">
          <svg 
            className="w-5 h-5 text-gray-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
          <span className={selectedCity ? 'text-white' : 'text-gray-500'}>
            {selectedCity || 'All Cities'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {selectedCity && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
            >
              <svg className="w-4 h-4 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <svg 
            className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      
      {isOpen && (
        <div className="absolute backdrop-blur-3xl  z-9999 w-fit  left-0     mb-2 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl shadow-black/50 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
         
          <div className="px-3 py-2 border-b border-gray-700">
            <div className="relative">
              <svg 
                className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search cities..."
                className="w-full pl-9 pr-3 py-1 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

           <div className="max-h-64 overflow-y-auto custom-scrollbar">
             <button
              onClick={handleClear}
              className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-gray-700/50 transition-colors ${
                !selectedCity ? 'bg-blue-500/10 text-blue-400' : 'text-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded border-2 flex items-center justify-center ${
                  !selectedCity 
                    ? 'border-blue-500 bg-blue-500' 
                    : 'border-gray-600'
                }`}>
                  {!selectedCity && (
                    <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="font-medium text-sm">All Cities</span>
              </div>
              {!selectedCity && (
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                  {cities.length} total
                </span>
              )}
            </button>

            {/* City Options */}
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => {
                const isSelected = selectedCity === city;
                // const cityUserCount = cities.filter(c => c === city).length;
                
                return (
                  <button
                    key={city}
                    onClick={() => handleSelect(city)}
                    className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-gray-700/50 transition-colors ${
                      isSelected ? 'bg-blue-500/10 text-blue-400' : 'text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded border-2 flex items-center justify-center ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-600'
                      }`}>
                        {isSelected && (
                          <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={isSelected ? 'font-medium text-sm' : ' text-sm'}>{city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-sm">No cities found</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.8);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 1);
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation: slideIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CityDropdown;