import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/company';
import { 
  Building2, 
  Search, 
  ChevronRight, 
  Calendar, 
  PhoneCall, 
  ShieldCheck, 
  Award, 
  CheckCircle2,
  MapPin,
  Home
} from 'lucide-react';

interface HeroProps {
  onOpenInspection: (propertyTitle?: string) => void;
  onSearchSubmit: (query: { location: string; type: string; price: string }) => void;
  isDarkMode: boolean;
  onOpenCallDesk?: () => void;
}

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80",
];

export const Hero: React.FC<HeroProps> = ({
  onOpenInspection,
  onSearchSubmit,
  isDarkMode,
  onOpenCallDesk
}) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [locationInput, setLocationInput] = useState('');
  const [typeInput, setTypeInput] = useState('');
  const [priceInput, setPriceInput] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit({
      location: locationInput,
      type: typeInput,
      price: priceInput
    });
    const propSection = document.querySelector('#properties');
    if (propSection) {
      propSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden bg-[#0A0A0B] text-white">
      {/* Background Image Carousel Slider */}
      {HERO_IMAGES.map((imgUrl, idx) => (
        <div
          key={imgUrl}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentBgIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{ transitionProperty: 'opacity, transform', transitionDuration: '1.5s' }}
        >
          <img
            src={imgUrl}
            alt="Luxury Architecture"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark Gradient Overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/80 to-[#0A0A0B]/50" />
        </div>
      ))}

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 my-auto w-full">
        <div className="max-w-3xl space-y-6">
          {/* Badge / Eyebrow */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1C]/90 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-md shadow-lg"
          >
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>Excellence in Every Square Foot</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight font-extrabold tracking-tight"
          >
            Redefining Modern <br className="hidden sm:inline" />
            <span className="gold-gradient-text">Luxury Living</span>
          </motion.h1>

          {/* Slogan & Tagline */}
          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-[#E0E0E0] font-light max-w-2xl leading-relaxed opacity-90"
          >
            {COMPANY_INFO.slogan}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-wrap items-center gap-3 text-xs text-slate-300"
          >
            <span className="flex items-center gap-2 bg-[#1A1A1C]/90 px-3.5 py-2 rounded-sm border border-[#2A2A2C] backdrop-blur">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Guaranteed Title Documentation
            </span>
            <span className="flex items-center gap-2 bg-[#1A1A1C]/90 px-3.5 py-2 rounded-sm border border-[#2A2A2C] backdrop-blur">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Verified Premium Properties
            </span>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4 w-full"
          >
            <a
              href="#properties"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-sm shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
            >
              <Search className="w-4 h-4" />
              <span>View Properties</span>
            </a>

            <button
              onClick={() => onOpenInspection()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-sm backdrop-blur transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
            >
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Book Inspection</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenCallDesk ? onOpenCallDesk() : (window.location.href = `tel:${COMPANY_INFO.phoneRaw}`)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#D4AF37]/60 bg-[#1A1A1C]/90 hover:border-[#D4AF37] hover:bg-[#2A2A2C] text-[#D4AF37] text-xs uppercase tracking-wider font-extrabold px-6 py-3.5 rounded-sm backdrop-blur transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px] cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#D4AF37] animate-pulse" />
              <span>Call Desk ({COMPANY_INFO.phone})</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom Floating Quick Search Box */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.85 }}
        className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mb-12 w-full"
      >
        <div className={`rounded-sm shadow-2xl p-4 sm:p-6 border transition-all ${
          isDarkMode
            ? 'bg-[#1A1A1C] border-[#2A2A2C] text-white'
            : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#2A2A2C]">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="font-serif font-bold text-base sm:text-lg text-white">Find Your Haven</h2>
            </div>
            <span className="text-[11px] text-[#D4AF37] font-semibold uppercase tracking-[0.2em] hidden sm:inline-block">
              Verified Lagos Listings
            </span>
          </div>

          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Location input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Location
              </label>
              <input
                type="text"
                placeholder="Victoria Island, Lekki, Ikoyi..."
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-sm border text-xs outline-none transition min-h-[44px] ${
                  isDarkMode
                    ? 'bg-[#0A0A0B] border-[#2A2A2C] text-white placeholder-slate-600 focus:border-[#D4AF37]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                }`}
              />
            </div>

            {/* Property Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Home className="w-3.5 h-3.5 text-[#D4AF37]" /> Property Type
              </label>
              <select
                value={typeInput}
                onChange={(e) => setTypeInput(e.target.value)}
                className={`w-full px-3.5 py-3 rounded-sm border text-xs outline-none transition ${
                  isDarkMode
                    ? 'bg-[#0A0A0B] border-[#2A2A2C] text-white focus:border-[#D4AF37]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-500'
                }`}
              >
                <option value="">All Property Types</option>
                <option value="Villa">Luxury Villa</option>
                <option value="Penthouse">Sky Penthouse</option>
                <option value="Mansion">Estate Mansion</option>
                <option value="Apartment">Modern Apartment</option>
                <option value="Land">Prime Land / Plot</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Price Range</label>
              <select
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
                className={`w-full px-3.5 py-3 rounded-sm border text-xs outline-none transition ${
                  isDarkMode
                    ? 'bg-[#0A0A0B] border-[#2A2A2C] text-white focus:border-[#D4AF37]'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-500'
                }`}
              >
                <option value="">Any Budget</option>
                <option value="2000000">Up to $2,000,000</option>
                <option value="4000000">Up to $4,000,000</option>
                <option value="6000000">Up to $6,000,000</option>
                <option value="10000000">Up to $10,000,000+</option>
              </select>
            </div>

            {/* Search Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold uppercase tracking-widest text-xs py-3.5 rounded-sm shadow-lg transition transform active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>Search Properties</span>
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
};
