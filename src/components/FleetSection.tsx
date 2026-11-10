import React, { useState } from 'react';
import { 
  Users, 
  Gauge, 
  Fuel, 
  Wind, 
  Briefcase, 
  Car, 
  MessageCircle, 
  Sparkles, 
  CheckCircle, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { FLEET_DATA, Vehicle, SITE_CONFIG } from '../data/config';
import { formatCurrency, buildWhatsAppBookingUrl } from '../utils/calculator';
import { useLanguage } from '../context/LanguageContext';

interface FleetSectionProps {
  onBookVehicle: (vehicleId: string) => void;
  onSelectVehicleDetail: (vehicle: Vehicle) => void;
  currency: 'PKR' | 'USD';
}

export const FleetSection: React.FC<FleetSectionProps> = ({
  onBookVehicle,
  onSelectVehicleDetail,
  currency,
}) => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: t('allVehicles') },
    { id: 'suv', label: t('suvPrado') },
    { id: 'pickup', label: t('pickupHilux') },
    { id: 'van', label: t('vanCoaster') },
    { id: 'sedan', label: t('sedan') },
    { id: 'jeep', label: t('mountainJeep') },
  ];

  const filteredVehicles = selectedCategory === 'all'
    ? FLEET_DATA
    : FLEET_DATA.filter((v) => v.category === selectedCategory);

  const handleWhatsAppBooking = (vehicle: Vehicle) => {
    const url = buildWhatsAppBookingUrl({
      phone: SITE_CONFIG.primaryPhone,
      carName: `${vehicle.name} (${vehicle.models})`,
      withDriver: true,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="fleet" className="py-16 sm:py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Car className="w-3.5 h-3.5" />
              <span>{language === 'ur' ? 'گاڑیوں کی رینج' : 'Verified Mountain Fleet'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t('fleetHeading')}
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
              {t('fleetSubheading')}
            </p>
          </div>

          {/* Pricing transparency note */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>All Prado rates include AC • With/Without Driver Options</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-102'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Vehicle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVehicles.map((vehicle) => {
            const displayPrice = currency === 'USD'
              ? `$${vehicle.pricePerDayUsd}`
              : `PKR ${vehicle.pricePerDay.toLocaleString('en-PK')}`;

            return (
              <div
                key={vehicle.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between group"
              >
                <div>
                  {/* Vehicle Image */}
                  <div className="relative h-52 sm:h-56 w-full bg-slate-950 overflow-hidden cursor-pointer"
                    onClick={() => onSelectVehicleDetail(vehicle)}
                  >
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

                    {/* Badge */}
                    {vehicle.badge && (
                      <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded shadow-md">
                        {vehicle.badge}
                      </span>
                    )}

                    {/* Category Label */}
                    <span className="absolute top-3 right-3 bg-slate-900/85 backdrop-blur-md text-slate-300 text-[11px] font-semibold px-2.5 py-0.5 rounded border border-slate-700">
                      {vehicle.categoryLabel}
                    </span>

                    {/* Bottom overlay with model and price */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div>
                        <span className="text-[11px] text-amber-400 font-semibold">
                          Model: {vehicle.models}
                        </span>
                        <h3 className="text-lg font-extrabold text-white group-hover:text-amber-400 transition">
                          {vehicle.name}
                        </h3>
                      </div>

                      <div className="text-right bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800">
                        <p className="text-base font-black text-amber-400">{displayPrice}</p>
                        <span className="text-[10px] text-slate-400 block -mt-1">{t('perDay')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Spec Highlights Grid */}
                  <div className="p-4 sm:p-5 space-y-4">
                    <div className="grid grid-cols-4 gap-2 text-center py-2.5 px-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs">
                      <div>
                        <Users className="w-4 h-4 mx-auto text-amber-400 mb-0.5" />
                        <span className="text-white font-bold block">{vehicle.seats}</span>
                        <span className="text-[10px] text-slate-400">{t('seats')}</span>
                      </div>

                      <div>
                        <Gauge className="w-4 h-4 mx-auto text-blue-400 mb-0.5" />
                        <span className="text-white font-bold block truncate">{vehicle.transmission.includes('4WD') ? '4WD' : 'Auto'}</span>
                        <span className="text-[10px] text-slate-400">Drive</span>
                      </div>

                      <div>
                        <Wind className="w-4 h-4 mx-auto text-teal-400 mb-0.5" />
                        <span className="text-white font-bold block">{vehicle.ac ? 'Yes' : 'No'}</span>
                        <span className="text-[10px] text-slate-400">A/C</span>
                      </div>

                      <div>
                        <Fuel className="w-4 h-4 mx-auto text-orange-400 mb-0.5" />
                        <span className="text-white font-bold block truncate">Excl.</span>
                        <span className="text-[10px] text-slate-400">Fuel</span>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {vehicle.description}
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 sm:p-5 pt-0 border-t border-slate-800/60 mt-2 flex flex-col gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onBookVehicle(vehicle.id)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition hover:scale-102"
                    >
                      <Car className="w-3.5 h-3.5" />
                      <span>{t('bookNow')}</span>
                    </button>

                    <button
                      onClick={() => handleWhatsAppBooking(vehicle)}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition hover:scale-102"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onSelectVehicleDetail(vehicle)}
                    className="w-full text-center text-xs text-slate-400 hover:text-amber-400 font-semibold py-1 transition"
                  >
                    View Specs & Photos →
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
