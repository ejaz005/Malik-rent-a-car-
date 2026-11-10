import React, { useState } from 'react';
import { 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  Calendar, 
  Car, 
  MapPin, 
  Users, 
  User, 
  Phone, 
  Mail, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import { FLEET_DATA, SITE_CONFIG } from '../data/config';
import { buildWhatsAppBookingUrl } from '../utils/calculator';
import { useLanguage } from '../context/LanguageContext';

export const BookingInquirySection: React.FC = () => {
  const { language } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [carType, setCarType] = useState(FLEET_DATA[0].name);
  const [pickup, setPickup] = useState('Gilgit Airport');
  const [dropoff, setDropoff] = useState('Gilgit Airport');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [withDriver, setWithDriver] = useState(true);
  const [passengers, setPassengers] = useState(4);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const waLink = buildWhatsAppBookingUrl({
      phone: SITE_CONFIG.primaryPhone,
      carName: carType,
      startDate,
      endDate,
      pickupLocation: pickup,
      dropoffLocation: dropoff,
      withDriver,
      customerName: name,
    });

    setWhatsAppUrl(waLink);

    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          carName: carType,
          pickupLocation: pickup,
          dropoffLocation: dropoff,
          startDate,
          endDate,
          withDriver,
          passengers,
          message,
        }),
      });
    } catch (err) {
      console.warn('Inquiry endpoint log:', err);
    } finally {
      setIsSubmitting(false);
      setIsSent(true);
      window.open(waLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="inquiry" className="py-16 sm:py-20 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Direct Helpline & Trust */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Booking Desk</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {language === 'ur' ? 'آن لائن بکنگ اور استفسار فارم' : 'Book Your Gilgit-Baltistan Journey'}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Fill out this form and our dispatch coordinator will respond within minutes on WhatsApp with vehicle confirmation, driver assignment, and exact pricing.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Direct 24/7 Phone / WhatsApp</p>
                  <p className="text-sm font-bold text-white">{SITE_CONFIG.primaryPhone} / {SITE_CONFIG.secondaryPhone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Official Inquiries & Quotes</p>
                  <p className="text-sm font-bold text-white">{SITE_CONFIG.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Base Station & Hubs</p>
                  <p className="text-sm font-bold text-white">Gilgit Airport 15100 • Skardu Branch</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Free cancellation up to 48 hours prior to arrival.</span>
            </div>
          </div>

          {/* Right Column: Complete Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              
              {isSent ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Inquiry Sent Successfully!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    We have redirected your request to our 24/7 WhatsApp dispatch desk. If WhatsApp did not open automatically, click below:
                  </p>
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp Chat (+92 317 9236600)</span>
                  </a>
                  <button
                    onClick={() => setIsSent(false)}
                    className="block mx-auto text-xs text-slate-400 hover:text-white pt-2 underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-slate-200">
                  
                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="inquiry-name" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-amber-400" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        id="inquiry-name"
                        required
                        placeholder="e.g. Asad Ali"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="inquiry-phone" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>Phone / WhatsApp *</span>
                      </label>
                      <input
                        type="tel"
                        id="inquiry-phone"
                        required
                        placeholder="0300 0000000 or international"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Email & Car Choice */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="inquiry-email" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-amber-400" />
                        <span>Email Address</span>
                      </label>
                      <input
                        type="email"
                        id="inquiry-email"
                        placeholder="yourname@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="inquiry-car" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                        <Car className="w-3.5 h-3.5 text-amber-400" />
                        <span>Vehicle Selection</span>
                      </label>
                      <select
                        id="inquiry-car"
                        value={carType}
                        onChange={(e) => setCarType(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        {FLEET_DATA.map((v) => (
                          <option key={v.id} value={v.name}>
                            {v.name} ({v.models})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Pick-up and Drop-off */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="inquiry-pickup" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>Pick-up Location</span>
                      </label>
                      <input
                        type="text"
                        id="inquiry-pickup"
                        placeholder="e.g. Gilgit Airport"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="inquiry-dropoff" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-orange-400" />
                        <span>Drop-off Location</span>
                      </label>
                      <input
                        type="text"
                        id="inquiry-dropoff"
                        placeholder="e.g. Skardu or Gilgit"
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="inquiry-start" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>Start Date</span>
                      </label>
                      <input
                        type="date"
                        id="inquiry-start"
                        value={startDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="inquiry-end" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>Return Date</span>
                      </label>
                      <input
                        type="date"
                        id="inquiry-end"
                        value={endDate}
                        min={startDate || new Date().toISOString().split('T')[0]}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Driver Needed & Passengers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="block text-xs font-semibold text-slate-300 mb-1">
                        Driver Needed?
                      </span>
                      <div className="flex bg-slate-950 rounded-xl p-1 border border-slate-700">
                        <button
                          type="button"
                          onClick={() => setWithDriver(true)}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                            withDriver ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                          }`}
                        >
                          Yes (With Driver)
                        </button>
                        <button
                          type="button"
                          onClick={() => setWithDriver(false)}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                            !withDriver ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                          }`}
                        >
                          Self-Drive
                        </button>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="inquiry-passengers" className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        <span>Passenger Count</span>
                      </label>
                      <input
                        type="number"
                        id="inquiry-passengers"
                        min="1"
                        max="29"
                        value={passengers}
                        onChange={(e) => setPassengers(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="inquiry-message" className="block text-xs font-semibold text-slate-300 mb-1">
                      Message / Custom Tour Plan
                    </label>
                    <textarea
                      id="inquiry-message"
                      rows={2}
                      placeholder="Share your planned tour stops (Hunza, Skardu, Deosai) or flight arrival details..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-700/30 transition hover:scale-101 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Inquiry & Connect on WhatsApp'}</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
