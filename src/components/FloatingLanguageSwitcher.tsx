import React, { useState } from 'react';
import { Globe, ArrowRightLeft, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FloatingLanguageSwitcher: React.FC = () => {
  const { language, isRtl, setLanguage, toggleLanguage, t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      aria-label="Language selection"
      className={`fixed z-40 transition-all duration-300 ease-out select-none
        ${isRtl ? 'left-4 sm:left-6' : 'right-4 sm:right-6'}
        bottom-20 sm:bottom-6
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative group">
        
        {/* Subtle glowing ambient backdrop */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition duration-300" />

        {/* Main Floating Container */}
        <div className="relative flex items-center bg-slate-900/90 hover:bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 hover:border-amber-500/60 rounded-2xl p-1.5 shadow-2xl shadow-black/60 transition-all duration-300">
          
          {/* Globe & Quick Toggle Icon Button */}
          <button
            type="button"
            onClick={toggleLanguage}
            title={t('floatingSwitcherTooltip')}
            aria-label={`Current language is ${language === 'en' ? 'English' : 'Urdu'}. Click to switch to ${language === 'en' ? 'Urdu' : 'English'}`}
            className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-800 text-amber-400 hover:bg-slate-700 hover:text-amber-300 transition shrink-0 cursor-pointer"
          >
            <Globe className="w-4 h-4 animate-spin-slow group-hover:scale-110 transition-transform" />
          </button>

          {/* Segmented Dual Switcher Pill */}
          <div 
            role="group" 
            aria-label="Language options"
            className="flex items-center gap-1 mx-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800"
          >
            {/* English Button */}
            <button
              type="button"
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                language === 'en'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>English</span>
              {language === 'en' && <Check className="w-3 h-3 stroke-[3]" />}
            </button>

            {/* Urdu Button */}
            <button
              type="button"
              onClick={() => setLanguage('ur')}
              aria-pressed={language === 'ur'}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1 cursor-pointer font-serif ${
                language === 'ur'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>اردو</span>
              {language === 'ur' && <Check className="w-3 h-3 stroke-[3]" />}
            </button>
          </div>

          {/* RTL Mode Indicator Pill */}
          <div className="hidden md:flex items-center gap-1 pl-1 pr-2 text-[10px] uppercase font-bold tracking-wider text-slate-400">
            <span className={`w-1.5 h-1.5 rounded-full ${isRtl ? 'bg-amber-400 animate-pulse' : 'bg-blue-400'}`} />
            <span>{isRtl ? 'RTL' : 'LTR'}</span>
          </div>
        </div>

        {/* Floating Tooltip hint on hover */}
        <div 
          className={`absolute bottom-full mb-2 ${isRtl ? 'left-0' : 'right-0'} pointer-events-none transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
          }`}
        >
          <div className="bg-slate-950/95 text-slate-200 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-700 shadow-xl whitespace-nowrap">
            {isRtl ? 'اردو اور انگلش میں تبدیل کریں (RTL سپورٹ)' : 'Toggle English & Urdu (RTL Support)'}
          </div>
        </div>

      </div>
    </aside>
  );
};
