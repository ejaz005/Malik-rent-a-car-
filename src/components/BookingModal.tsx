import React, { useState, useEffect } from 'react';
import { 
  X, 
  Car, 
  Calendar, 
  User, 
  Phone, 
  MapPin, 
  Users, 
  CheckCircle2, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { FLEET_DATA, SITE_CONFIG, Vehicle } from '../data/config';
import { calculateRentalCost, formatCurrency, buildWhatsAppBookingUrl } from '../utils/calculator';
import { useLanguage } from '../context/LanguageContext';

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedVehicleId?: string;
  currency?: 'PKR' | 'USD';
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedVehicleId,
  currency = 'PKR',
}) => {
  const { t, language } = useLanguage();

  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState(
    preselectedVehicleId || FLEET_DATA[0]?.id || ''
  );
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('Gilgit Airport');
  const [dropoffLocation, setDropoffLocation] = useState('Gilgit Airport');
  const [withDriver, setWithDriver] = useState(true);
  const [passengers, setPassengers] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');

  // Sync preselected vehicle when prop changes
  useEffect(() => {
    if (preselectedVehicleId) {
      setSelectedVehicleId(preselectedVehicleId);
    }
  }, [preselectedVehicleId]);

  // Set default dates if empty: today + 2 days
  useEffect(() => {
    if (!startDate) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 5);

      setStartDate(tomorrow.toISOString().split('T')[0]);
      setEndDate(nextWeek.toISOString().split('T')[0]);
    }
  }, []);

  if (!isOpen) return null;

  // Selected vehicle object
  const currentVehicle = FLEET_DATA.find((v) => v.id === selectedVehicleId) || FLEET_DATA[0];

  // Calculate rental duration in days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const calculatedDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1);

  // Price estimate
  const costEstimate = calculateRentalCost({
    dailyRatePkr: currentVehicle?.pricePerDay || 14000,
    days: calculatedDays,
    withDriver,
    currency,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const waUrl = buildWhatsAppBookingUrl({
      phone: SITE_CONFIG.primaryPhone,
      carName: `${currentVehicle.name} (${currentVehicle.models})`,
      startDate,
      endDate,
      days: calculatedDays,
      pickupLocation,
      dropoffLocation,
      withDriver,
      customerName: name,
    });

    setGeneratedWhatsAppUrl(waUrl);

    try {
      // Fire inquiry API on server to persist record
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          carName: currentVehicle.name,
          vehicleId: currentVehicle.id,
          startDate,
          endDate,
          days: calculatedDays,
          pickupLocation,
          dropoffLocation,
          withDriver,
          passengers,
          message: specialRequests,
          estimatedCostPkr: costEstimate.finalPkr,
        }),
      });
    } catch (err) {
      console.warn('Inquiry API note:', err);
    } finally {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      // Automatically direct to WhatsApp
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleReset = () => {
    setSubmittedSuccess(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-6 text-slate-100">
        
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-5 sm:p-6 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Instant Reservation • 24/7 Response</span>
          </div>

          <h2 id="booking-modal-title" className="text-xl sm:text-2xl font-extrabold text-white">
            {language === 'ur' ? 'گاڑی اور ٹور بکنگ' : 'Book Your Vehicle or Tour'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {language === 'ur' 
              ? 'چند سیکنڈ میں فارم پُر کریں اور واٹس ایپ پر فوری تصدیق حاصل کریں۔'
              : 'Fill in your trip details to confirm availability and receive instant WhatsApp confirmation.'}
          </p>
        </div>

        {/* Modal Body */}
        {submittedSuccess ? (
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">
                Booking Request Generated!
              </h3>
              <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                Thank you <strong className="text-amber-400">{name || 'Guest'}</strong>! Your booking inquiry for <strong className="text-white">{currentVehicle.name}</strong> from {startDate} to {endDate} ({calculatedDays} days) has been recorded.
              </p>
            </div>

            {/* Estimated breakdown card */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 text-left text-xs sm:text-sm space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Vehicle:</span>
                <span className="font-semibold text-white">{currentVehicle.name}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Duration:</span>
                <span className="font-semibold text-white">{calculatedDays} Days</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Driver Option:</span>
                <span className="font-semibold text-white">{withDriver ? 'With Professional Mountain Driver' : 'Self-Drive'}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Pick-up / Drop-off:</span>
                <span className="font-semibold text-white">{pickupLocation} ➔ {dropoffLocation}</span>
              </div>
              <div className="border-t border-slate-700 pt-2 flex justify-between font-bold text-base text-amber-400">
                <span>Estimated Total:</span>
                <span>{currency === 'USD' ? `$${costEstimate.finalUsd}` : `PKR ${costEstimate.finalPkr.toLocaleString('en-PK')}`}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={generatedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition hover:scale-102"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Chat Now</span>
              </a>

              <button
                onClick={handleReset}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            
            {/* Vehicle Selector */}
            <div>
              <label htmlFor="vehicle-select" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('selectCar')}</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <select
                  id="vehicle-select"
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  required
                >
                  {FLEET_DATA.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.models}) — PKR {v.pricePerDay.toLocaleString()}/day
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/60 rounded-xl border border-slate-700/60 text-xs">
                  <img
                    src={currentVehicle.image}
                    alt={currentVehicle.name}
                    className="w-12 h-10 object-cover rounded-lg shrink-0 border border-slate-700"
                  />
                  <div className="truncate">
                    <p className="font-semibold text-white truncate">{currentVehicle.name}</p>
                    <p className="text-slate-400">
                      {currentVehicle.seats} Seats • {currentVehicle.ac ? 'AC' : 'Non-AC'} • {currentVehicle.fuel}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Date Range & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="start-date" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('pickupDate')}</span>
                </label>
                <input
                  type="date"
                  id="start-date"
                  value={startDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="end-date" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('returnDate')}</span>
                </label>
                <input
                  type="date"
                  id="end-date"
                  value={endDate}
                  min={startDate || new Date().toISOString().split('T')[0]}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>

            {/* Pick-up and Drop-off Locations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="pickup-location" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('pickupLocation')}</span>
                </label>
                <select
                  id="pickup-location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Gilgit Airport">Gilgit Airport (GIL)</option>
                  <option value="Gilgit City / Hotel">Gilgit City / Hotel</option>
                  <option value="Skardu Airport">Skardu Airport (KDU)</option>
                  <option value="Skardu City / Hotel">Skardu City / Hotel</option>
                  <option value="Hunza (Karimabad)">Hunza Valley (Karimabad)</option>
                  <option value="Raikot Bridge (Fairy Meadows)">Raikot Bridge (Fairy Meadows)</option>
                  <option value="Chilas / Naran">Chilas / Naran Highway</option>
                  <option value="Islamabad / Rawalpindi">Islamabad / Rawalpindi</option>
                </select>
              </div>

              <div>
                <label htmlFor="dropoff-location" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>{t('dropoffLocation')}</span>
                </label>
                <select
                  id="dropoff-location"
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Gilgit Airport">Gilgit Airport (GIL)</option>
                  <option value="Gilgit City / Hotel">Gilgit City / Hotel</option>
                  <option value="Skardu Airport">Skardu Airport (KDU)</option>
                  <option value="Skardu City / Hotel">Skardu City / Hotel</option>
                  <option value="Hunza (Karimabad)">Hunza Valley (Karimabad)</option>
                  <option value="Khunjerab Pass / Sost">Khunjerab Pass / Sost Border</option>
                  <option value="Islamabad / Rawalpindi">Islamabad / Rawalpindi</option>
                </select>
              </div>
            </div>

            {/* Driver Option & Passengers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t('driverPreference')}
                </label>
                <div className="flex rounded-xl bg-slate-800 p-1 border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setWithDriver(true)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                      withDriver
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    With Driver (Rec.)
                  </button>
                  <button
                    type="button"
                    onClick={() => setWithDriver(false)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                      !withDriver
                        ? 'bg-amber-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Self-Drive
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="passenger-count" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>Passengers (Max {currentVehicle.seats})</span>
                </label>
                <input
                  type="number"
                  id="passenger-count"
                  min="1"
                  max={currentVehicle.seats}
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Customer Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label htmlFor="customer-name" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('fullName')} *</span>
                </label>
                <input
                  type="text"
                  id="customer-name"
                  placeholder="e.g. Tariq Ahmed"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="customer-phone" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('phoneNumber')} *</span>
                </label>
                <input
                  type="tel"
                  id="customer-phone"
                  placeholder="0300 1234567 or +92..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label htmlFor="special-notes" className="block text-xs font-semibold text-slate-300 mb-1">
                {t('specialNotes')} (Optional)
              </label>
              <textarea
                id="special-notes"
                rows={2}
                placeholder="Mention baby car seat, roof luggage carrier, flight number, or specific tour stops..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Live Pricing Summary Bar */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs text-slate-400">
                  Duration: <strong className="text-white">{calculatedDays} Days</strong>
                  {costEstimate.discountPkr > 0 && (
                    <span className="ml-2 text-emerald-400 font-semibold text-[11px]">
                      (Multi-day discount applied!)
                    </span>
                  )}
                </p>
                <p className="text-lg font-black text-amber-400">
                  {currency === 'USD' 
                    ? `$${costEstimate.finalUsd} Estimated Total` 
                    : `PKR ${costEstimate.finalPkr.toLocaleString('en-PK')} Estimated Total`}
                </p>
              </div>

              <div className="text-right text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-medium justify-end">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  No Advance Booking Fee
                </span>
                <span>Fuel: {currentVehicle.fuel}</span>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-slate-400 hover:text-white text-sm font-semibold transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-700/30 transition hover:scale-102 disabled:opacity-50"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isSubmitting ? 'Connecting...' : 'Confirm via WhatsApp (0317 9236600)'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
