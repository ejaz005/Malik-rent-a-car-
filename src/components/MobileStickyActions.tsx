import React from 'react';
import { Phone, MessageCircle, Car, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

interface MobileStickyActionsProps {
  onOpenBooking: () => void;
  onOpenAiAdvisor: () => void;
}

export const MobileStickyActions: React.FC<MobileStickyActionsProps> = ({
  onOpenBooking,
  onOpenAiAdvisor,
}) => {
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2 sm:hidden shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        {/* Call Now button */}
        <a
          href={`tel:${SITE_CONFIG.primaryPhone.replace(/\s+/g, '')}`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-xs active:bg-slate-800"
          aria-label="Call Malik Rent A Car"
        >
          <Phone className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="truncate">Call Now</span>
        </a>

        {/* WhatsApp button */}
        <a
          href="https://wa.me/923179236600?text=Hi%20Malik%20Rent%20A%20Car,%20I%20want%20to%20book%20a%20car/tour%20in%20Gilgit%20Baltistan"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-700/30"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 shrink-0 fill-current" />
          <span className="truncate">WhatsApp</span>
        </a>

        {/* Book Now modal trigger */}
        <button
          onClick={onOpenBooking}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black text-xs shadow-md"
          aria-label="Open Booking Form"
        >
          <Car className="w-4 h-4 shrink-0 stroke-[2.2]" />
          <span className="truncate">{t('bookNow')}</span>
        </button>
      </div>
    </div>
  );
};
