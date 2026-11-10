import React from 'react';
import { 
  Car, 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  Heart, 
  ShieldCheck, 
  Code2, 
  HelpCircle 
} from 'lucide-react';
import { SITE_CONFIG } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenDeploymentGuide: () => void;
  onOpenAiAdvisor: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenDeploymentGuide, 
  onOpenAiAdvisor 
}) => {
  const { language, t } = useLanguage();

  const seoKeywords = [
    'rent a car Gilgit',
    'rent a car Skardu',
    'Hunza tour packages',
    'Gilgit Baltistan tour',
    '4x4 jeep rental Gilgit',
    'Skardu tour packages',
    'Toyota Prado rental Gilgit',
    'Fairy Meadows 4x4 Jeep',
    'Deosai Safari rental',
    'Khunjerab pass car hire',
    'depayalotours.com',
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs sm:text-sm">
      
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#home" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
                <Car className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <span className="font-black text-white text-base block tracking-tight">
                  {SITE_CONFIG.businessName}
                </span>
                <span className="text-[11px] text-amber-400 font-semibold">
                  {SITE_CONFIG.domain}
                </span>
              </div>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'ur'
                ? '2020 سے گلگت، ہنزہ اور سکردو میں سب سے سستی اور معیاری 4x4 کار رینٹل اور ٹور سروس۔'
                : 'Reliable & affordable 4x4 Prado, Land Cruiser, Hilux, and van rentals serving Gilgit, Skardu, Hunza, Fairy Meadows, and all of Gilgit-Baltistan since January 2020.'}
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-emerald-400">Open 24 Hours / 7 Days</span>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenDeploymentGuide}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition"
              >
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Hosting & Custom Domain Setup Guide</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-slate-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-amber-400 transition">Home</a></li>
              <li><a href="#fleet" className="hover:text-amber-400 transition">Our 4x4 Fleet</a></li>
              <li><a href="#tours" className="hover:text-amber-400 transition">Tour Packages</a></li>
              <li><a href="#destinations" className="hover:text-amber-400 transition">Destinations Guide</a></li>
              <li><a href="#calculator" className="hover:text-amber-400 transition">Rental Estimator</a></li>
              <li><a href="#tips" className="hover:text-amber-400 transition">Travel Tips & NOC</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition">About Us</a></li>
              <li><a href="#contact" className="hover:text-amber-400 transition">Contact</a></li>
            </ul>
          </div>

          {/* Popular Destinations (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-slate-200">
              Top GB Routes
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#destinations" className="hover:text-amber-400 transition">Gilgit to Hunza (Karimabad)</a></li>
              <li><a href="#destinations" className="hover:text-amber-400 transition">Gilgit to Skardu & Shigar</a></li>
              <li><a href="#destinations" className="hover:text-amber-400 transition">Deosai National Park 4x4 Safari</a></li>
              <li><a href="#destinations" className="hover:text-amber-400 transition">Fairy Meadows & Raikot Bridge Jeep</a></li>
              <li><a href="#destinations" className="hover:text-amber-400 transition">Khunjerab Pass (China Border 4,693m)</a></li>
              <li><a href="#destinations" className="hover:text-amber-400 transition">Naltar Valley & Colorful Lakes</a></li>
              <li><a href="#destinations" className="hover:text-amber-400 transition">Attabad Lake & Passu Cones</a></li>
            </ul>
          </div>

          {/* Contact Direct Info (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-slate-200">
              Get In Touch
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${SITE_CONFIG.primaryPhone.replace(/\s+/g, '')}`} className="font-bold text-white hover:text-amber-400 block">
                    {SITE_CONFIG.primaryPhone}
                  </a>
                  <a href={`tel:${SITE_CONFIG.secondaryPhone.replace(/\s+/g, '')}`} className="text-slate-400 hover:text-white block">
                    {SITE_CONFIG.secondaryPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/923179236600" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-semibold hover:underline">
                  +92 317 9236600 (WhatsApp)
                </a>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-slate-300 hover:text-white break-all">
                  {SITE_CONFIG.email}
                </a>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-tight">
                  Main Airport Road, Gilgit 15100, Pakistan
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* SEO Tag Cloud */}
        <div className="mt-10 pt-6 border-t border-slate-800/80">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Gilgit-Baltistan Car Rental & Tour Keywords:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {seoKeywords.map((kw, i) => (
              <span
                key={i}
                className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment notice */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.businessName}. All rights reserved. • Domain: {SITE_CONFIG.domain}
          </div>

          <div className="flex items-center gap-3">
            <span>Payments: Cash • Visa • Mastercard • NFC • Cheques</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
