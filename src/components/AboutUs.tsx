import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Compass, 
  HeartHandshake 
} from 'lucide-react';
import { SITE_CONFIG } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

export const AboutUs: React.FC = () => {
  const { language } = useLanguage();

  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-900/60 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Image Mosaic */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
              <img
                src="/assets/aistudio/images__4__2a8814c6.jfif"
                alt="Malik Rent A Car fleet in Gilgit"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-4 rounded-2xl border border-slate-800">
                <span className="text-amber-400 font-bold text-xs uppercase tracking-wider block">
                  Established January 2020
                </span>
                <p className="font-extrabold text-white text-base">
                  Main Airport Road, Gilgit 15100, Pakistan
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Serving Gilgit, Skardu, Hunza & All Northern Areas
                </p>
              </div>
            </div>

            {/* Overlapping small card */}
            <div className="hidden sm:block absolute -top-5 -right-5 bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 p-4 rounded-2xl shadow-xl font-black text-center border-2 border-slate-900">
              <p className="text-2xl">6+ Years</p>
              <p className="text-[11px] uppercase tracking-wider">Unbroken Excellence</p>
            </div>
          </div>

          {/* Right Column: Story & Team Mission */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Our Legacy & Mountain Heritage</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {language === 'ur'
                ? 'ملک رینٹ اے کار گلگت بلتستان — 2020 سے آپ کا بااعتماد ساتھی'
                : 'Driven by Passion for Gilgit-Baltistan Tourism Since 2020'}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Founded in <strong>January 2020</strong> right beside the Gilgit Airport terminal, <strong>Malik Rent A Car Gilgit Baltistan</strong> was created to solve the real hurdles visitors faced in Northern Pakistan: unpredictable car conditions, inflated peak-season pricing, and inexperienced drivers on treacherous mountain curves.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              Over the last 6 years, our fleet of 4x4 Toyota Land Cruiser Prados (TZ and TX models), double-cabin Hilux Revos, and high-roof luxury vans has successfully transported thousands of families, nature photographers, foreign diplomats, and mountaineers across the Karakoram, Himalayan, and Hindu Kush mountain ranges.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800">
                <Users className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">Seasoned Mountain Captains</h4>
                  <p className="text-slate-400 text-[11px] mt-0.5">Native drivers with certified defensive mountain driving credentials.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">24/7 Rapid Emergency Response</h4>
                  <p className="text-slate-400 text-[11px] mt-0.5">Control rooms in Gilgit and Skardu ready for prompt road assistance.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">Zero Hidden Charges</h4>
                  <p className="text-slate-400 text-[11px] mt-0.5">Direct transparent pricing agreed before your journey commences.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900 border border-slate-800">
                <HeartHandshake className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">Warm Northern Hospitality</h4>
                  <p className="text-slate-400 text-[11px] mt-0.5">More than just drivers — genuine local guides eager to show you hidden gems.</p>
                </div>
              </div>
            </div>

            {/* Contact quick callout */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="font-semibold text-white">Managing Director:</span>
              <span>Malik & Team</span>
              <span className="text-slate-600">|</span>
              <span className="font-semibold text-white">Primary Helpline:</span>
              <a href="tel:03179236600" className="text-amber-400 font-bold hover:underline">
                0317 9236600
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
