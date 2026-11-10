import React from 'react';
import { 
  Clock, 
  Wrench, 
  Award, 
  ShieldCheck, 
  DollarSign, 
  MapPin, 
  PhoneCall, 
  Compass, 
  Sparkles 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SITE_CONFIG } from '../data/config';

export const WhyChooseUs: React.FC = () => {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Clock,
      title: '24/7 Service & Airport Pickups',
      titleUrdu: '24 گھنٹے سروس اور ائیرپورٹ پک اپ',
      desc: 'Our Gilgit and Skardu teams operate round-the-clock. Whether your flight lands early morning or midnight, your car and driver will be waiting.',
      descUrdu: 'گلگت اور سکردو ائیرپورٹ پر چوبیس گھنٹے استقبالیہ اور ڈلیوری سروس دستیاب ہے۔',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Wrench,
      title: 'Well-Maintained 4x4 Cars',
      titleUrdu: 'مکمل فٹ اور سروس شدہ 4x4 گاڑیاں',
      desc: 'Every Prado, Hilux, and van undergoes mandatory suspension, brake, engine coolant, and all-terrain tire checks before tackling mountain passes.',
      descUrdu: 'ہر سفر سے قبل بریک، ٹائر اور سسپنشن کا تفصیلی معائنہ کیا جاتا ہے۔',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Compass,
      title: 'Native Mountain Drivers',
      titleUrdu: 'ماہر مقامی پہاڑی ڈرائیورز',
      desc: 'Born and raised in Gilgit-Baltistan. Masters of Karakoram Highway hairpins, Babusar Pass weather, and rocky Deosai river crossings.',
      descUrdu: 'قراقرم ہائی وے اور کٹھن پہاڑی راستوں کے ماہر ڈرائیورز جو سفر کو محفوظ بناتے ہیں۔',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: DollarSign,
      title: 'Affordable, Transparent Prices',
      titleUrdu: 'سستے اور شفاف ترین کرائے',
      desc: 'Direct fleet pricing starting at PKR 7,500/day. No hidden commission, zero surprise charges, with volume discounts for multi-day tours.',
      descUrdu: 'براہ راست مناسب ترین کرائے، بغیر کسی اضافی یا پوشیدہ اخراجات کے۔',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: ShieldCheck,
      title: 'Safe & Comfortable Journeys',
      titleUrdu: 'محفوظ اور پرسکون سفر کی ضمانت',
      desc: 'Chilled dual air conditioning, plush reclining seats, roof racks, and 24/7 roadside backup across Gilgit, Hunza, Skardu, and Chilas.',
      descUrdu: 'آرام دہ سیٹیں، چائلڈ سیفٹی اور دوران سفر 24 گھنٹے روڈ سائیڈ بیک اپ۔',
      color: 'from-rose-500 to-red-500',
    },
    {
      icon: Sparkles,
      title: 'Flexible Rental Options',
      titleUrdu: 'لچکدار رینٹل اور ٹور آپشنز',
      desc: 'Choose self-drive or driver-accompanied, daily rental, one-way transfers, or complete custom Gilgit-Baltistan tour packages with fuel.',
      descUrdu: 'سیلف ڈرائیو یا ڈرائیور کے ساتھ، روزانہ کرایہ یا مکمل ٹور پیکج۔',
      color: 'from-amber-600 to-yellow-500',
    },
  ];

  return (
    <section className="py-16 bg-slate-900/60 border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'ہماری خصوصیات' : 'The Malik Rent A Car Advantage'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('whyHeading')}
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            {t('whySubheading')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg mb-5 group-hover:scale-110 transition`}>
                  <Icon className="w-6 h-6 stroke-[2.2]" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition">
                  {language === 'ur' ? item.titleUrdu : item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {language === 'ur' ? item.descUrdu : item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* 24/7 Emergency Support Banner */}
        <div className="mt-12 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 border border-blue-900/60 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              24/7 Gilgit & Skardu Hotline
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-white">
              Need a vehicle dispatched urgently at Gilgit or Skardu Airport?
            </h4>
            <p className="text-sm text-slate-300">
              Call our control room directly. Available 24 hours every day.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.primaryPhone.replace(/\s+/g, '')}`}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition hover:scale-102"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call 0317 9236600</span>
            </a>

            <a
              href={`https://wa.me/923179236600`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition hover:scale-102"
            >
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
