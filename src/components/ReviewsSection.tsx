import React, { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  ExternalLink, 
  ThumbsUp, 
  Car 
} from 'lucide-react';
import { TESTIMONIALS, Review, SITE_CONFIG } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

export const ReviewsSection: React.FC = () => {
  const { language } = useLanguage();
  const [reviewsList, setReviewsList] = useState<Review[]>(TESTIMONIALS);

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-slate-900/40 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Google Reviews Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{language === 'ur' ? 'مسافروں کے ریویوز' : 'Verified Guest Testimonials'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {language === 'ur' ? 'ہمارے معزز سیاحوں کی رائے' : 'Loved by Travelers Across Pakistan & Abroad'}
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Authentic reviews from families, couples, and expedition groups who chose Malik Rent A Car.
            </p>
          </div>

          {/* Google Reviews Badge Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center font-black text-xl text-slate-900 shadow">
              <span className="text-blue-600">G</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-base">4.9 / 5.0</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-400">Based on 140+ verified Google Reviews</p>
              <a
                href="https://www.google.com/maps/search/Malik+Rent+A+Car+Gilgit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-amber-400 font-bold hover:underline flex items-center gap-1 mt-0.5"
              >
                <span>Read Google Reviews</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 shadow-lg flex flex-col justify-between transition"
            >
              <div className="space-y-3">
                {/* Rating and date */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{rev.date}</span>
                </div>

                {/* Comment */}
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm">{rev.author}</h4>
                    <p className="text-xs text-slate-400">{rev.city}</p>
                  </div>
                </div>

                <div className="text-right text-[11px] text-slate-400 flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">{rev.vehicleUsed}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leave a review button */}
        <div className="mt-8 text-center">
          <a
            href="https://www.google.com/maps/search/Malik+Rent+A+Car+Gilgit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs sm:text-sm border border-slate-700 transition"
          >
            <Star className="w-4 h-4 text-amber-400 fill-current" />
            <span>Leave a Review on Google for Malik Rent A Car</span>
          </a>
        </div>

      </div>
    </section>
  );
};
