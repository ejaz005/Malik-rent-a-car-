import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  Sparkles, 
  Car, 
  MapPin, 
  Globe 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SITE_CONFIG } from '../data/config';

interface NavbarProps {
  onOpenAiAdvisor: () => void;
  onOpenBooking: (vehicleId?: string) => void;
  currency: 'PKR' | 'USD';
  onToggleCurrency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenAiAdvisor, 
  onOpenBooking,
  currency,
  onToggleCurrency
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t('home') },
    { href: '#fleet', label: t('fleet') },
    { href: '#tours', label: t('tours') },
    { href: '#destinations', label: t('destinations') },
    { href: '#calculator', label: 'Estimator' },
    { href: '#tips', label: t('travelTips') },
    { href: '#about', label: t('about') },
    { href: '#gallery', label: t('gallery') },
    { href: '#reviews', label: t('reviews') },
    { href: '#contact', label: t('contact') },
  ];

  return (
    <>
      {/* Top 24/7 helpline bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {t('open247')}
            </span>
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Gilgit Airport Road & Skardu Hubs
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <a 
              href={`tel:${SITE_CONFIG.primaryPhone.replace(/\s+/g, '')}`}
              className="hover:text-amber-400 flex items-center gap-1 transition"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{SITE_CONFIG.primaryPhone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href={`https://wa.me/923179236600`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition font-bold"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp: +92 317 9236600</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-slate-900/95 backdrop-blur-md shadow-2xl py-2.5 border-b border-slate-800' 
            : 'bg-slate-900/90 backdrop-blur-sm py-3.5 border-b border-slate-800/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
              <Car className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="font-black text-base sm:text-lg text-white tracking-tight flex items-center gap-1.5">
                <span>{language === 'ur' ? SITE_CONFIG.businessNameUrdu : 'Malik Rent A Car'}</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/30 uppercase font-bold tracking-wider">GB</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Gilgit & Skardu • {SITE_CONFIG.domain}
              </p>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-amber-400 transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="hidden md:flex items-center gap-2">
            {/* Currency toggle */}
            <button
              onClick={onToggleCurrency}
              aria-label="Toggle currency"
              className="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Toggle PKR / USD Rates"
            >
              {currency === 'PKR' ? '₨ PKR' : '$ USD'}
            </button>

            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              aria-label="Toggle English / Urdu"
              className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'en' ? 'اردو' : 'English'}</span>
            </button>

            {/* Gemini AI Inspector */}
            <button
              onClick={onOpenAiAdvisor}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white shadow-md transition hover:scale-102"
              title="Gemini 4 Argon AI Route & Car Advisor"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Advisor</span>
            </button>

            {/* Book Now button */}
            <button
              onClick={() => onOpenBooking()}
              className="flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20 transition hover:scale-102"
            >
              <Car className="w-3.5 h-3.5" />
              <span>{t('bookNow')}</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              aria-label="Toggle Language"
              className="text-xs font-bold px-2 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700"
            >
              {language === 'en' ? 'اردو' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-5 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-amber-400 font-medium transition"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAiAdvisor();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-indigo-900/60 border border-indigo-700/60 text-indigo-200 font-bold text-xs"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Gemini 4 Argon AI Route Advisor</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black text-sm shadow-md"
              >
                {t('bookNow')} - WhatsApp / Form
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
