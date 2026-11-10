import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  PhoneCall, 
  MessageCircle, 
  Sparkles, 
  Calendar, 
  Car, 
  ArrowRight, 
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FLEET_DATA, SITE_CONFIG } from '../data/config';
import { buildWhatsAppBookingUrl } from '../utils/calculator';

interface HeroProps {
  onOpenBooking: (vehicleId?: string) => void;
  onOpenAiAdvisor: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenAiAdvisor }) => {
  const { t, language } = useLanguage();

  // Quick booking state
  const [pickup, setPickup] = useState('Gilgit Airport');
  const [dropoff, setDropoff] = useState('Hunza (Karimabad)');
  const [carType, setCarType] = useState(FLEET_DATA[0].id);
  const [startDate, setStartDate] = useState('');
  const [withDriver, setWithDriver] = useState(true);

  const selectedVehicle = FLEET_DATA.find((v) => v.id === carType) || FLEET_DATA[0];

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking(carType);
  };

  const handleDirectWhatsApp = () => {
    const url = buildWhatsAppBookingUrl({
      phone: SITE_CONFIG.primaryPhone,
      carName: selectedVehicle.name,
      pickupLocation: pickup,
      dropoffLocation: dropoff,
      withDriver,
      startDate: startDate || 'Upcoming trip',
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-between pt-6 pb-12 overflow-hidden">
      {/* Background with mountain landscape and moody gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85"
          alt="Majestic mountain peaks of Gilgit Baltistan"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-pulse-subtle"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 sm:pt-10">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-amber-400 text-xs font-bold shadow-lg backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>24/7 Gilgit & Skardu Service</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-200 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Since 2020 • Verified Mountain Operator</span>
          </div>

          <button
            onClick={onOpenAiAdvisor}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-950/90 border border-indigo-500/40 text-indigo-300 hover:text-white text-xs font-semibold backdrop-blur-md transition hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Road & Vehicle Advisor</span>
          </button>
        </div>

        {/* Main Grid: Headline & Quick Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              {language === 'ur' ? (
                <>
                  <span className="text-amber-400">گلگت بلتستان</span> بھر میں قابل اعتماد اور سستی سواری
                </>
              ) : (
                <>
                  Reliable & Affordable Rides Across{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
                    Gilgit-Baltistan
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {language === 'ur'
                ? 'ٹویوٹا پراڈو TZ/TX، لینڈ کروزر، ہائی لکس اور کوسٹر وینز۔ ہنزہ، سکردو، دیوسائی اور فیری میڈوز کے لیے تجربہ کار مقامی پہاڑی ڈرائیورز دستیاب ہیں۔'
                : 'Premium Toyota Prado TZ/TX 4x4, Land Cruisers, Hiluxes, and passenger vans. Native mountain drivers for safe and scenic travel across Hunza, Skardu, Deosai, and Fairy Meadows.'}
            </p>

            {/* Quick Fleet highlights pill */}
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/80">
                ✓ Prado from PKR 7,500/day
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/80">
                ✓ With / Without Driver
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/80">
                ✓ Airport Pick & Drop
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/80">
                ✓ 100% Maintained 4WD
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/25 transition transform hover:-translate-y-0.5"
              >
                <Car className="w-5 h-5 stroke-[2.5]" />
                <span>{t('bookNow')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleDirectWhatsApp}
                className="flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>WhatsApp Instant (0317 9236600)</span>
              </button>

              <a
                href={`tel:${SITE_CONFIG.primaryPhone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm transition"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Call 0317 9236600</span>
              </a>
            </div>

            {/* Micro Trust indicators */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80 max-w-lg">
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">6+ Yrs</p>
                <p className="text-xs text-slate-400">Serving GB Tourists</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-amber-400">100%</p>
                <p className="text-xs text-slate-400">Safe Mountain Records</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-emerald-400">4.9 ★</p>
                <p className="text-xs text-slate-400">Verified Reviews</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Booking Bar Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl shadow-2xl p-5 sm:p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-bold text-white text-sm sm:text-base">
                      {language === 'ur' ? 'گاڑی بکنگ اور ریٹ چیک' : 'Quick Reservation Bar'}
                    </h2>
                    <p className="text-[11px] text-slate-400">Gilgit, Skardu, Hunza & All GB</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
                  24/7 Ready
                </span>
              </div>

              <form onSubmit={handleQuickBook} className="space-y-3.5">
                {/* Vehicle Selection */}
                <div>
                  <label htmlFor="quick-vehicle" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-amber-400" />
                    <span>Select Vehicle Model</span>
                  </label>
                  <select
                    id="quick-vehicle"
                    value={carType}
                    onChange={(e) => setCarType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    {FLEET_DATA.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.models}) — PKR {v.pricePerDay.toLocaleString()}/day
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pickup and Dropoff */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label htmlFor="quick-pickup" className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400" />
                      <span>Pick-up</span>
                    </label>
                    <select
                      id="quick-pickup"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Gilgit Airport">Gilgit Airport</option>
                      <option value="Gilgit City">Gilgit City</option>
                      <option value="Skardu Airport">Skardu Airport</option>
                      <option value="Skardu City">Skardu City</option>
                      <option value="Hunza (Karimabad)">Hunza Valley</option>
                      <option value="Raikot Bridge">Raikot (Fairy Meadows)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="quick-dropoff" className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-orange-400" />
                      <span>Drop-off</span>
                    </label>
                    <select
                      id="quick-dropoff"
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Hunza (Karimabad)">Hunza (Karimabad)</option>
                      <option value="Skardu">Skardu City</option>
                      <option value="Gilgit Airport">Gilgit Airport</option>
                      <option value="Khunjerab Pass">Khunjerab Pass</option>
                      <option value="Deosai Plains">Deosai Plains</option>
                      <option value="Same as Pick-up">Same as Pick-up</option>
                    </select>
                  </div>
                </div>

                {/* Date & Driver Option */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label htmlFor="quick-date" className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span>Start Date</span>
                    </label>
                    <input
                      type="date"
                      id="quick-date"
                      min={new Date().toISOString().split('T')[0]}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      <span>Driver Option</span>
                    </label>
                    <div className="flex bg-slate-950 rounded-xl p-1 border border-slate-700">
                      <button
                        type="button"
                        onClick={() => setWithDriver(true)}
                        className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition ${
                          withDriver
                            ? 'bg-amber-500 text-slate-950'
                            : 'text-slate-400'
                        }`}
                      >
                        With Driver
                      </button>
                      <button
                        type="button"
                        onClick={() => setWithDriver(false)}
                        className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition ${
                          !withDriver
                            ? 'bg-amber-500 text-slate-950'
                            : 'text-slate-400'
                        }`}
                      >
                        Self-Drive
                      </button>
                    </div>
                  </div>
                </div>

                {/* Selected vehicle price preview */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <p className="text-slate-400 text-[11px]">Daily Rate ({selectedVehicle.name})</p>
                    <p className="font-extrabold text-white text-sm">
                      PKR {selectedVehicle.pricePerDay.toLocaleString()} / day
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                    {selectedVehicle.seats} Seats • 4x4
                  </span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 transition hover:scale-101"
                >
                  <span>Book Now & Check Availability</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
