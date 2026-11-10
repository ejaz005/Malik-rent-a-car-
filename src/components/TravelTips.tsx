import React from 'react';
import { 
  ShieldCheck, 
  HeartPulse, 
  Compass, 
  CloudSun, 
  Wallet, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { TRAVEL_TIPS } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

export const TravelTips: React.FC = () => {
  const { language } = useLanguage();

  const iconMap: Record<string, React.ElementType> = {
    compass: Compass,
    'shield-check': ShieldCheck,
    'heart-pulse': HeartPulse,
    'cloud-sun': CloudSun,
    wallet: Wallet,
  };

  return (
    <section id="tips" className="py-16 sm:py-20 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'سفری ہدایات' : 'Mountain Travel Advisory'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'ur' ? 'گلگت بلتستان کے لیے ضروری سفری رہنمائی' : 'Essential Gilgit-Baltistan Travel Tips'}
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
            From high-altitude acclimatization to foreigner registration rules, here is everything you need for a safe and memorable journey.
          </p>
        </div>

        {/* Tips Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRAVEL_TIPS.map((tip, idx) => {
            const Icon = iconMap[tip.icon] || Compass;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    {tip.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">{tip.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                    {tip.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified 2026 Season Guidelines</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
