import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  MessageCircle, 
  Phone 
} from 'lucide-react';
import { FAQS, SITE_CONFIG } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

export const FaqSection: React.FC = () => {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-900/60 border-t border-slate-800 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'اکثر پوچھے جانے والے سوالات' : 'Frequently Asked Questions'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'ur' ? 'گاڑی اور ٹور سے متعلق عام سوالات' : 'Everything You Need to Know'}
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base">
            Transparent answers about self-drive permits, fuel policies, airport transfers, and emergency backup.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-white text-sm sm:text-base hover:text-amber-400 transition"
                  aria-expanded={isOpen}
                >
                  <span>{language === 'ur' ? faq.questionUrdu : faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-amber-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                    <p>{language === 'ur' ? faq.answerUrdu : faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Question Still Unanswered? */}
        <div className="mt-8 text-center p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm font-bold text-white">Have a specific question about your upcoming route?</p>
            <p className="text-xs text-slate-400">Our Gilgit dispatchers answer queries on WhatsApp 24/7.</p>
          </div>

          <a
            href="https://wa.me/923179236600"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
