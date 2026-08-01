import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/company';
import { GalleryItem } from '../types';
import { Camera, Maximize2, X, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface GallerySectionProps {
  isDarkMode: boolean;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ isDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Exterior', 'Interior', 'Pools', 'Penthouses'];

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const handleNextLightbox = () => {
    if (!lightboxItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === lightboxItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setLightboxItem(filteredItems[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!lightboxItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === lightboxItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxItem(filteredItems[prevIndex]);
  };

  return (
    <section id="gallery" className={`py-24 transition-colors ${
      isDarkMode ? 'bg-[#0A0A0B] text-white' : 'bg-white text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1C] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              <Camera className="w-3.5 h-3.5" /> Architectural Showcase
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white">
              Estate Photo Gallery
            </h2>
            <p className={`mt-2 text-sm sm:text-base max-w-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Immerse yourself in high-definition photography of our modern estates, interior pavilions, and resort infinity pools.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition ${
                  selectedCategory === cat
                    ? 'bg-[#D4AF37] text-black shadow-lg'
                    : isDarkMode
                      ? 'bg-[#1A1A1C] text-slate-300 border border-[#2A2A2C] hover:border-[#D4AF37]'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group relative aspect-[4/3] rounded-sm border border-[#2A2A2C] overflow-hidden cursor-pointer bg-black shadow-xl hover:border-[#D4AF37] transition-all duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/95 via-[#0A0A0B]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6" />

              {/* Hover Details overlay */}
              <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#D4AF37] text-black px-2.5 py-0.5 rounded-sm">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold font-serif text-white mt-1.5 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#D4AF37] flex items-center gap-1 mt-0.5 font-semibold">
                  <MapPin className="w-3.5 h-3.5" /> {item.location}
                </p>
              </div>

              {/* Zoom icon in top right */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-sm bg-[#0A0A0B]/80 border border-[#2A2A2C] text-[#D4AF37] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-lg animate-fadeIn">
          <button
            onClick={() => setLightboxItem(null)}
            className="absolute top-6 right-6 p-3 rounded-sm bg-[#1A1A1C] border border-[#2A2A2C] text-white hover:bg-[#D4AF37] hover:text-black transition z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev / Next Arrows */}
          <button
            onClick={handlePrevLightbox}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-sm bg-[#1A1A1C] border border-[#2A2A2C] text-white hover:bg-[#D4AF37] hover:text-black transition z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNextLightbox}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-sm bg-[#1A1A1C] border border-[#2A2A2C] text-white hover:bg-[#D4AF37] hover:text-black transition z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Image Container */}
          <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center space-y-4">
            <img
              src={lightboxItem.imageUrl}
              alt={lightboxItem.title}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto max-w-full rounded-sm object-contain shadow-2xl border border-[#2A2A2C]"
            />
            <div className="text-center text-white space-y-1">
              <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-widest">
                {lightboxItem.category}
              </span>
              <h3 className="text-2xl font-bold font-serif">{lightboxItem.title}</h3>
              <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {lightboxItem.location}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
