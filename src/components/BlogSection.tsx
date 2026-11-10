import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  Tag, 
  X 
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/config';
import { useLanguage } from '../context/LanguageContext';

export const BlogSection: React.FC = () => {
  const { language } = useLanguage();
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-16 sm:py-20 bg-slate-900/40 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'سفری بلاگ و رہنمائی' : 'Gilgit-Baltistan Travel Insights'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'ur' ? 'قراقرم اور ہمالیہ کے سفری راز' : 'Guides for the Adventurous Traveler'}
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
            Expert advice on road conditions, 4x4 rental choices, blossom seasons, and high-altitude safety.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-lg transition flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md text-amber-400 text-[11px] font-bold px-2.5 py-0.5 rounded border border-slate-800">
                    {post.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-blue-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setActiveArticle(post)}
                  className="w-full text-left text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center justify-between py-2 border-t border-slate-800/80 transition"
                >
                  <span>Read Complete Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-6 text-slate-100">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-56 sm:h-64 w-full bg-slate-950">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  {activeArticle.category} • {activeArticle.readTime}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">{activeArticle.title}</h3>
              </div>
            </div>

            <div className="p-6 space-y-4 text-sm text-slate-300 leading-relaxed max-h-80 overflow-y-auto">
              {activeArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <p className="text-xs font-bold text-amber-400">Need a reliable ride for this route?</p>
                <p className="text-xs text-slate-400">
                  Malik Rent A Car offers Toyota Prado TZ/TX and Hilux 4x4s starting from PKR 7,500/day. Contact us on WhatsApp (+92 317 9236600) for instant quotes.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 text-right">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
