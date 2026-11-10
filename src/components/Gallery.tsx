import React, { useState } from 'react';
import { 
  Camera, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Car, 
  Maximize2 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Gallery: React.FC = () => {
  const { language } = useLanguage();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const galleryImages = [
    {
      src: '/assets/aistudio/images__4__2a8814c6.jfif',
      title: 'Toyota Prado TX/TZ 4x4',
      caption: 'Executive 4x4 Prado ready for Karakoram Highway expedition in Gilgit.',
      category: 'Fleet',
    },
    {
      src: '/assets/aistudio/images__1__c9eee7f8.jfif',
      title: 'Toyota Prado White VIP',
      caption: 'Pearl white Prado 2018 model for luxury Hunza & Skardu family tours.',
      category: 'Fleet',
    },
    {
      src: '/assets/aistudio/images__2__b66922dd.jfif',
      title: 'Luxury Prado Cockpit Interior',
      caption: 'Leather interior, dual climate control AC, and panoramic visibility.',
      category: 'Interior',
    },
    {
      src: '/assets/aistudio/download__1__61644b06.jfif',
      title: 'Prado 4x4 Mountain Stance',
      caption: 'High clearance chassis built for rocky trails and river crossings.',
      category: 'Fleet',
    },
    {
      src: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&w=1000&q=80',
      title: 'Hunza Valley & Passu Cathedral',
      caption: 'Iconic serrated peaks of Passu along the Karakoram Highway.',
      category: 'Destinations',
    },
    {
      src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
      title: 'Shangrila Resort Skardu',
      caption: 'The famous Pagoda resort cottages surrounded by the Karakoram giants.',
      category: 'Destinations',
    },
    {
      src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
      title: 'Deosai National Park Wilderness',
      caption: 'Rolling green plateau at 4,114m — the world’s second highest plateau.',
      category: 'Off-Road',
    },
    {
      src: '/assets/aistudio/images_9e3e9388.jfif',
      title: 'Classic Prado TZ 4WD',
      caption: 'Legendary 1KZ 4WD Prado workhorse tackling steep mountain grades.',
      category: 'Fleet',
    },
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % galleryImages.length);
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'تصاویر گیلری' : 'Real Trips & Fleet Gallery'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === 'ur' ? 'ہماری گاڑیاں اور خوبصورت مناظر' : 'Moments from the Northern Frontiers'}
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base leading-relaxed">
            Real snapshots of our Toyota Prado fleet navigating Hunza, Skardu, Attabad Lake, and Deosai Plains.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {galleryImages.map((photo, index) => (
            <div
              key={index}
              onClick={() => setSelectedPhotoIndex(index)}
              className="relative group rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 aspect-4/3 cursor-pointer"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                <span className="self-end p-1.5 rounded-lg bg-slate-900/80 text-amber-400">
                  <Maximize2 className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 block">
                    {photo.category}
                  </span>
                  <p className="text-xs font-bold text-white truncate">{photo.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-200 hover:text-white transition z-20"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white transition z-20"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white transition z-20"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[selectedPhotoIndex].src}
              alt={galleryImages[selectedPhotoIndex].title}
              className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-slate-800"
            />
            <div className="text-center mt-3 text-white max-w-lg">
              <h3 className="text-lg font-bold">
                {galleryImages[selectedPhotoIndex].title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {galleryImages[selectedPhotoIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
