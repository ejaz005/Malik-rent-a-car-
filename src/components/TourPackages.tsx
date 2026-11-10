import React, { useState } from 'react';
import { 
  Compass, 
  Clock, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  MessageCircle, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';
import { TOUR_PACKAGES, TourPackage, SITE_CONFIG } from '../data/config';
import { useLanguage } from '../context/LanguageContext';
import { formatCurrency } from '../utils/calculator';

interface TourPackagesProps {
  onInquirePackage: (tourTitle: string) => void;
  currency: 'PKR' | 'USD';
}

export const TourPackages: React.FC<TourPackagesProps> = ({
  onInquirePackage,
  currency,
}) => {
  const { t, language } = useLanguage();
  const [expandedPackageId, setExpandedPackageId] = useState<string | null>(TOUR_PACKAGES[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedPackageId(expandedPackageId === id ? null : id);
  };

  const handleWhatsAppInquiry = (tour: TourPackage) => {
    const text = `*Tour Package Inquiry - Malik Rent A Car Gilgit Baltistan*\n` +
      `🏔️ Package: ${tour.title}\n` +
      `⏳ Duration: ${tour.duration}\n` +
      `💰 Starting Rate: PKR ${tour.priceFrom.toLocaleString('en-PK')}\n` +
      `Hello team, I would like to inquire about dates, availability, and customizations for this tour.`;

    const url = `https://wa.me/923179236600?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="tours" className="py-16 sm:py-20 bg-slate-900/40 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'ٹور پیکجز' : 'Guided Gilgit-Baltistan Tours'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('toursHeading')}
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
            {t('toursSubheading')}
          </p>
        </div>

        {/* Tour Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {TOUR_PACKAGES.map((tour) => {
            const isExpanded = expandedPackageId === tour.id;
            const displayPrice = currency === 'USD'
              ? `$${tour.priceFromUsd}`
              : `PKR ${tour.priceFrom.toLocaleString('en-PK')}`;

            return (
              <div
                key={tour.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700 transition flex flex-col justify-between"
              >
                <div>
                  {/* Tour Banner Image */}
                  <div className="relative h-60 w-full bg-slate-950 overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded shadow">
                        {tour.duration}
                      </span>
                      <span className="bg-slate-900/90 text-slate-200 text-xs font-semibold px-2.5 py-0.5 rounded border border-slate-700">
                        {tour.bestSeason}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-black text-white">{tour.title}</h3>
                        <p className="text-xs text-slate-300 italic">{tour.tagline}</p>
                      </div>

                      <div className="text-right bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">{t('startingFrom')}</span>
                        <p className="text-lg font-black text-amber-400">{displayPrice}</p>
                      </div>
                    </div>
                  </div>

                  {/* Highlights pills */}
                  <div className="p-5 space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {tour.highlights.map((h, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700/60"
                        >
                          ✦ {h}
                        </span>
                      ))}
                    </div>

                    {/* Collapsible Day-by-Day Itinerary */}
                    <div>
                      <button
                        onClick={() => toggleExpand(tour.id)}
                        className="w-full flex items-center justify-between py-2 text-xs font-bold text-amber-400 hover:text-amber-300 border-y border-slate-800 transition"
                      >
                        <span>{isExpanded ? 'Hide Day-by-Day Itinerary' : 'View Detailed Day-by-Day Itinerary'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {isExpanded && (
                        <div className="pt-3 pb-2 space-y-2.5 text-xs text-slate-300">
                          {tour.itinerary.map((day, dIdx) => (
                            <div key={dIdx} className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                              <span className="font-bold text-amber-400 block mb-0.5">
                                {day.day}: {day.title}
                              </span>
                              <p className="text-slate-400 text-[11px] leading-relaxed">{day.desc}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Inclusions / Exclusions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                      <div className="space-y-1">
                        <span className="font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Included:
                        </span>
                        {tour.included.map((inc, iIdx) => (
                          <p key={iIdx} className="text-slate-400 text-[11px] pl-4">• {inc}</p>
                        ))}
                      </div>

                      <div className="space-y-1">
                        <span className="font-bold text-slate-400 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5 text-rose-400" /> Excluded:
                        </span>
                        {tour.excluded.map((exc, eIdx) => (
                          <p key={eIdx} className="text-slate-500 text-[11px] pl-4">• {exc}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Package Footer CTA */}
                <div className="p-5 pt-0 border-t border-slate-800/80 mt-2 flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => handleWhatsAppInquiry(tour)}
                    className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition hover:scale-102"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => onInquirePackage(tour.title)}
                    className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 hover:text-amber-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-slate-700 transition"
                  >
                    <span>Custom Package Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
