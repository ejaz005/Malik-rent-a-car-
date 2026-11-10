import React, { useState } from 'react';
import { 
  Calculator, 
  Car, 
  Calendar, 
  UserCheck, 
  Fuel, 
  MessageCircle, 
  Sparkles, 
  Check, 
  ShieldCheck,
  TrendingDown
} from 'lucide-react';
import { FLEET_DATA, SITE_CONFIG, Vehicle } from '../data/config';
import { calculateRentalCost, formatCurrency, buildWhatsAppBookingUrl } from '../utils/calculator';
import { useLanguage } from '../context/LanguageContext';

interface PriceCalculatorProps {
  onBookEstimated: (vehicleId: string) => void;
  currency: 'PKR' | 'USD';
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  onBookEstimated,
  currency,
}) => {
  const { t, language } = useLanguage();

  const [selectedVehicleId, setSelectedVehicleId] = useState(FLEET_DATA[0].id);
  const [days, setDays] = useState(5);
  const [withDriver, setWithDriver] = useState(true);
  const [includeFuel, setIncludeFuel] = useState(false);
  const [dailyKm, setDailyKm] = useState(120);

  const selectedVehicle = FLEET_DATA.find((v) => v.id === selectedVehicleId) || FLEET_DATA[0];

  const calculation = calculateRentalCost({
    dailyRatePkr: selectedVehicle.pricePerDay,
    days,
    withDriver,
    includeFuel,
    estimatedKmPerDay: dailyKm,
    currency,
  });

  const handleBookViaWhatsApp = () => {
    const text = `*Custom Price Estimate - Malik Rent A Car Gilgit Baltistan*\n` +
      `🚗 Vehicle: ${selectedVehicle.name} (${selectedVehicle.models})\n` +
      `📅 Duration: ${days} Days\n` +
      `👨‍✈️ Driver: ${withDriver ? 'Included' : 'Self-Drive'}\n` +
      `⛽ Fuel: ${includeFuel ? `Included (~${dailyKm} km/day)` : 'Without Fuel'}\n` +
      `💰 Estimated Total: ${currency === 'USD' ? `$${calculation.finalUsd}` : `PKR ${calculation.finalPkr.toLocaleString('en-PK')}`}\n` +
      `Hello, I would like to lock in this reservation. Please confirm availability.`;

    const url = `https://wa.me/923179236600?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="calculator" className="py-16 sm:py-20 bg-slate-900/80 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'آن لائن کرایہ تخمینہ' : 'Transparent Budget Planner'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t('calculatorTitle')}
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
            {t('calculatorSubtitle')}
          </p>
        </div>

        {/* Calculator Interactive Card */}
        <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Vehicle Selection */}
            <div>
              <label htmlFor="calc-vehicle" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Car className="w-4 h-4 text-amber-400" />
                <span>1. Choose Your Vehicle</span>
              </label>
              <select
                id="calc-vehicle"
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
              >
                {FLEET_DATA.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.models}) — PKR {v.pricePerDay.toLocaleString()}/day
                  </option>
                ))}
              </select>
            </div>

            {/* Days Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="calc-days-range" className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>2. Duration ({days} {days === 1 ? 'Day' : 'Days'})</span>
                </label>
                {days >= 7 ? (
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-700/60 px-2 py-0.5 rounded flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" /> 10% Long-Trip Discount
                  </span>
                ) : days >= 4 ? (
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-700/60 px-2 py-0.5 rounded flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" /> 5% Multi-Day Discount
                  </span>
                ) : null}
              </div>

              <input
                type="range"
                id="calc-days-range"
                min="1"
                max="21"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
              />

              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-semibold">
                <span>1 Day</span>
                <span>3 Days</span>
                <span>7 Days (Weekly)</span>
                <span>14 Days</span>
                <span>21 Days</span>
              </div>
            </div>

            {/* Driver Option & Fuel Option Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <span className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-amber-400" />
                  <span>Driver Service</span>
                </span>
                <div className="flex bg-slate-950 rounded-xl p-1 border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setWithDriver(true)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                      withDriver ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    With Driver (+PKR 2.5k)
                  </button>
                  <button
                    type="button"
                    onClick={() => setWithDriver(false)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                      !withDriver ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    Self-Drive
                  </button>
                </div>
              </div>

              <div>
                <span className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Fuel className="w-4 h-4 text-orange-400" />
                  <span>Fuel Package</span>
                </span>
                <div className="flex bg-slate-950 rounded-xl p-1 border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setIncludeFuel(false)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                      !includeFuel ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    Without Fuel
                  </button>
                  <button
                    type="button"
                    onClick={() => setIncludeFuel(true)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                      includeFuel ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    Include Fuel
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Breakdown / Estimate Column */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
            
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                Instant Calculation Breakdown
              </span>
              <h3 className="text-lg font-black text-white">{selectedVehicle.name}</h3>
              <p className="text-xs text-slate-400">Daily rate: PKR {selectedVehicle.pricePerDay.toLocaleString()}</p>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Vehicle Base ({days} days):</span>
                <span className="font-semibold text-white">
                  PKR {calculation.baseCarTotalPkr.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Driver Allowance ({days} days):</span>
                <span className="font-semibold text-white">
                  {withDriver ? `PKR ${calculation.driverTotalPkr.toLocaleString()}` : 'Self-Drive (PKR 0)'}
                </span>
              </div>

              {includeFuel && (
                <div className="flex justify-between text-orange-300">
                  <span>Estimated Fuel ({dailyKm * days} km total):</span>
                  <span className="font-semibold">
                    PKR {calculation.fuelTotalPkr.toLocaleString()}
                  </span>
                </div>
              )}

              {calculation.discountPkr > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold border-t border-slate-800/80 pt-2">
                  <span>Multi-Day Discount:</span>
                  <span>- PKR {calculation.discountPkr.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Total Highlight */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/30 rounded-xl p-4 text-center space-y-1">
              <span className="text-[11px] uppercase font-bold text-slate-400">Net Estimated Cost</span>
              <p className="text-2xl sm:text-3xl font-black text-amber-400">
                {currency === 'USD' 
                  ? `$${calculation.finalUsd}` 
                  : `PKR ${calculation.finalPkr.toLocaleString('en-PK')}`}
              </p>
              <span className="text-[10px] text-slate-400 block">
                (Approx {currency === 'USD' ? `PKR ${calculation.finalPkr.toLocaleString()}` : `$${calculation.finalUsd} USD`})
              </span>
            </div>

            {/* Direct Booking CTA */}
            <button
              onClick={handleBookViaWhatsApp}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition hover:scale-102"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book this Estimate on WhatsApp</span>
            </button>

            <button
              onClick={() => onBookEstimated(selectedVehicle.id)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition"
            >
              Open Complete Booking Form
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
