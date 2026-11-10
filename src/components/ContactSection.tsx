import React from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  ExternalLink, 
  Smartphone, 
  Banknote, 
  BadgeCheck 
} from 'lucide-react';
import { SITE_CONFIG } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

export const ContactSection: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="contact" className="py-16 sm:py-20 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Phone className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'رابطہ کی تفصیلات' : '24/7 Direct Contact Desk'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'ur' ? 'ہم سے کسی بھی وقت رابطہ کریں' : 'Visit Us or Reach Out 24/7'}
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
            Our dispatch base is located on Airport Road, Gilgit, with dedicated operational vehicles across Skardu, Hunza, and all of Gilgit-Baltistan.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* 24/7 Hours Badge Card */}
            <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-600/40 rounded-2xl p-5 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 block">
                    Operating Schedule
                  </span>
                  <p className="font-extrabold text-white text-base">Open 24 Hours / 7 Days A Week</p>
                  <p className="text-xs text-slate-400">Night flight pickups & emergency dispatch</p>
                </div>
              </div>
              <span className="hidden sm:inline-block w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            {/* Primary Phone & WhatsApp */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Primary Phone Numbers
                  </span>
                  <p className="font-extrabold text-white text-base">
                    <a href={`tel:${SITE_CONFIG.primaryPhone.replace(/\s+/g, '')}`} className="hover:text-amber-400 transition">
                      {SITE_CONFIG.primaryPhone}
                    </a>
                    <span className="text-slate-500 mx-2">|</span>
                    <a href={`tel:${SITE_CONFIG.secondaryPhone.replace(/\s+/g, '')}`} className="hover:text-amber-400 transition">
                      {SITE_CONFIG.secondaryPhone}
                    </a>
                  </p>
                  <p className="text-xs text-slate-400">Direct voice call & SMS line</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-2">
                <a
                  href="https://wa.me/923179236600"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp +92 317 9236600</span>
                </a>

                <a
                  href={`sms:${SITE_CONFIG.primaryPhone.replace(/\s+/g, '')}`}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition"
                >
                  SMS Line
                </a>
              </div>
            </div>

            {/* Address & Skardu Service Note */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Headquarters & Base
                  </span>
                  <p className="font-extrabold text-white text-sm sm:text-base mt-0.5">
                    {SITE_CONFIG.address}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Airport Meet & Greet at Gilgit Airport Arrivals
                  </p>
                </div>
              </div>

              {/* Skardu notice */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-amber-400 block mb-0.5">📍 Skardu & Baltistan Branch Note:</span>
                We maintain stationed vehicles at Skardu Airport and city center for direct transfers to Shangrila, Shigar, and Deosai without long repositioning delays.
              </div>
            </div>

            {/* Email & Domain */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Official Email & Website
                </span>
                <p className="font-bold text-white text-sm">
                  <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-amber-400 transition">
                    {SITE_CONFIG.email}
                  </a>
                </p>
                <p className="text-xs text-amber-400 font-semibold">{SITE_CONFIG.domain}</p>
              </div>
            </div>

          </div>

          {/* Embedded Google Map / Visual Gilgit Location */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Gilgit Airport Operational Hub</h3>
                <p className="text-xs text-slate-400">Gilgit 15100, Northern Areas, Pakistan</p>
              </div>
              <a
                href="https://maps.google.com/?q=Gilgit+Airport+Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="relative w-full h-[360px] sm:h-[420px] bg-slate-950">
              <iframe
                title="Malik Rent A Car Gilgit Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51838.25712128711!2d74.2982855216797!3d35.92083329999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e649e7b2521c57%3A0xbce56782db8ff227!2sGilgit%20Airport!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                className="w-full h-full border-0 filter grayscale-20 invert-90 contrast-120"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="p-4 bg-slate-950 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800">
              <span>Coordinates: 35.9208° N, 74.3144° E</span>
              <span className="text-emerald-400 font-semibold">Free Pickup at Gilgit Airport Arrivals</span>
            </div>
          </div>

        </div>

        {/* Payment Methods Badge Banner */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Flexible Payment Options Accepted</h4>
                <p className="text-xs text-slate-400">Invoice and digital receipt issued on all rentals</p>
              </div>
            </div>

            {/* Badges list */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
              <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200">
                💵 Cash (PKR/USD/EUR)
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-blue-950/80 border border-blue-700/60 text-blue-200">
                💳 Visa
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-orange-950/80 border border-orange-700/60 text-orange-200">
                💳 Mastercard
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200">
                🏦 Debit / Credit Cards
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-700/60 text-emerald-200">
                📱 NFC / EasyPaisa / JazzCash / Raast
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-slate-200">
                📑 Bank Cheques
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
