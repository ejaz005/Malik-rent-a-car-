import React from 'react';
import { 
  X, 
  Users, 
  Gauge, 
  Fuel, 
  Wind, 
  Briefcase, 
  Check, 
  MessageCircle, 
  Car, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { Vehicle, SITE_CONFIG } from '../data/config';
import { formatCurrency, buildWhatsAppBookingUrl } from '../utils/calculator';
import { useLanguage } from '../context/LanguageContext';

interface CarDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onBookNow: (vehicleId: string) => void;
  currency: 'PKR' | 'USD';
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  vehicle,
  onClose,
  onBookNow,
  currency,
}) => {
  const { language } = useLanguage();

  if (!vehicle) return null;

  const displayPrice = currency === 'USD' 
    ? `$${vehicle.pricePerDayUsd}` 
    : `PKR ${vehicle.pricePerDay.toLocaleString('en-PK')}`;

  const handleWhatsApp = () => {
    const url = buildWhatsAppBookingUrl({
      phone: SITE_CONFIG.primaryPhone,
      carName: `${vehicle.name} (${vehicle.models})`,
      withDriver: true,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition backdrop-blur-md"
          aria-label="Close vehicle details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Vehicle Image Banner */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-950 overflow-hidden">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-500 text-slate-950 mb-1">
                {vehicle.categoryLabel}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{vehicle.name}</h2>
              <p className="text-xs sm:text-sm text-slate-300">Model: {vehicle.models}</p>
            </div>

            <div className="text-right bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800 backdrop-blur-md">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Rate</span>
              <p className="text-lg sm:text-xl font-black text-amber-400">{displayPrice}</p>
              <span className="text-[10px] text-slate-400">per day</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 text-slate-200">
          
          {/* Key Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-center">
              <Users className="w-5 h-5 mx-auto text-amber-400 mb-1" />
              <p className="text-[11px] text-slate-400">Capacity</p>
              <p className="font-bold text-white text-sm">{vehicle.seats} Seats</p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-center">
              <Gauge className="w-5 h-5 mx-auto text-blue-400 mb-1" />
              <p className="text-[11px] text-slate-400">Transmission</p>
              <p className="font-bold text-white text-sm truncate">{vehicle.transmission}</p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-center">
              <Wind className="w-5 h-5 mx-auto text-teal-400 mb-1" />
              <p className="text-[11px] text-slate-400">Air Condition</p>
              <p className="font-bold text-white text-sm">{vehicle.ac ? 'Chilled AC' : 'Heater only'}</p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-3 text-center">
              <Fuel className="w-5 h-5 mx-auto text-orange-400 mb-1" />
              <p className="text-[11px] text-slate-400">Fuel Policy</p>
              <p className="font-bold text-white text-sm">{vehicle.fuel}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Vehicle Overview</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {vehicle.description}
            </p>
          </div>

          {/* Highlights & Mountain Suitability */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
              Features & Mountain Readiness
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {vehicle.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 bg-slate-800/40 px-3 py-2 rounded-lg border border-slate-800 text-slate-300">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                onClose();
                onBookNow(vehicle.id);
              }}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition hover:scale-101"
            >
              <Car className="w-4 h-4" />
              <span>Book This Car Online</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition hover:scale-101"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire via WhatsApp</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
