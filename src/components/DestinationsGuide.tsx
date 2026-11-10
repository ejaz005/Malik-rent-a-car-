import React, { useState } from 'react';
import { 
  MapPin, 
  Compass, 
  Mountain, 
  Calendar, 
  Car, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { DESTINATIONS_DATA, Destination } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

interface DestinationsGuideProps {
  onBookForDestination: (destName: string) => void;
}

export const DestinationsGuide: React.FC<DestinationsGuideProps> = ({ onBookForDestination }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>(DESTINATIONS_DATA[0].id);

  const selectedDestination = DESTINATIONS_DATA.find((d) => d.id === activeTab) || DESTINATIONS_DATA[0];

  return (
    <section id="destinations" className="py-16 sm:py-20 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Mountain className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'سیاحتی مقامات' : 'Gilgit-Baltistan Travel Guide'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'ur' ? 'اہم سیاحتی مقامات اور سڑک کے حالات' : 'Explore Gilgit-Baltistan Destinations'}
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
            Essential road status, elevation, best seasons, and recommended vehicle types for Northern Pakistan's most spectacular valleys.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {DESTINATIONS_DATA.map((dest) => (
            <button
              key={dest.id}
              onClick={() => setActiveTab(dest.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition flex items-center gap-2 ${
                activeTab === dest.id
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-102'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{dest.name}</span>
            </button>
          ))}
        </div>

        {/* Active Destination Feature Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          
          {/* Image & Quick Badges */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-slate-950 overflow-hidden">
            <img
              src={selectedDestination.image}
              alt={selectedDestination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:hidden" />

            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-slate-950/85 backdrop-blur-md text-amber-400 text-xs font-bold px-3 py-1 rounded-lg border border-slate-700">
                🏔️ {selectedDestination.altitude}
              </span>
              <span className="bg-slate-950/85 backdrop-blur-md text-slate-200 text-xs font-semibold px-3 py-1 rounded-lg border border-slate-700">
                📍 {selectedDestination.distanceFromGilgit}
              </span>
            </div>
          </div>

          {/* Details & Road Advice */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">{selectedDestination.name}</h3>
                  <p className="text-xs text-amber-400 font-semibold mt-0.5">
                    Best Visiting Window: {selectedDestination.bestMonths}
                  </p>
                </div>

                <div className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border ${
                  selectedDestination.roadCondition.includes('4x4')
                    ? 'bg-amber-950/60 border-amber-600/50 text-amber-300'
                    : 'bg-emerald-950/60 border-emerald-600/50 text-emerald-300'
                }`}>
                  <Car className="w-3.5 h-3.5" />
                  <span>{selectedDestination.roadCondition}</span>
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedDestination.summary}
              </p>

              {/* Key Attractions */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Top Attractions & Viewpoints:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDestination.attractions.map((att, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700/60"
                    >
                      {att}
                    </span>
                  ))}
                </div>
              </div>

              {/* Road Condition / Driving Tip */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Fleet & Road Condition Advisory:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedDestination.travelTip}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Ready to explore {selectedDestination.name}?
              </span>

              <button
                onClick={() => onBookForDestination(selectedDestination.name)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition hover:scale-102"
              >
                <span>Book 4x4 Prado for {selectedDestination.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
