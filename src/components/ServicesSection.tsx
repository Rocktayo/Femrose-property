import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data/company';
import { Service } from '../types';
import { 
  Home, 
  MapPin, 
  Building2, 
  TrendingUp, 
  KeyRound, 
  FileCheck, 
  HardHat, 
  UserCheck, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  X,
  PhoneCall
} from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface ServicesSectionProps {
  isDarkMode: boolean;
  onOpenInspection: (title?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  isDarkMode,
  onOpenInspection
}) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home': return Home;
      case 'MapPin': return MapPin;
      case 'Building2': return Building2;
      case 'TrendingUp': return TrendingUp;
      case 'KeyRound': return KeyRound;
      case 'FileCheck': return FileCheck;
      case 'HardHat': return HardHat;
      case 'UserCheck': return UserCheck;
      default: return Home;
    }
  };

  return (
    <section id="services" className={`py-24 transition-colors relative ${
      isDarkMode ? 'bg-[#0A0A0B] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1C] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" /> Comprehensive Real Estate Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white">
            Our World-Class Services
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Whether buying your dream oceanfront mansion, securing prime development land, or expanding your investment portfolio, we provide end-to-end expertise.
          </p>
        </motion.div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((serv, idx) => {
            const IconComponent = getIcon(serv.iconName);
            const numStr = String(idx + 1).padStart(2, '0');
            return (
              <motion.div
                key={serv.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedService(serv)}
                className={`group cursor-pointer p-6 rounded-sm border transition-all duration-300 flex flex-col justify-between ${
                  isDarkMode 
                    ? 'bg-[#1A1A1C] border-[#2A2A2C] hover:border-[#D4AF37]' 
                    : 'bg-white border-slate-200 hover:border-amber-400 hover:shadow-xl'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-sm bg-[#0A0A0B] border border-[#2A2A2C] text-[#D4AF37] flex items-center justify-center shadow group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[#D4AF37] italic font-serif text-2xl font-bold opacity-80 group-hover:opacity-100">
                      {numStr}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-serif mb-2 text-white group-hover:text-[#D4AF37] transition-colors">
                    {serv.title}
                  </h3>

                  <p className={`text-xs line-clamp-3 leading-relaxed mb-4 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {serv.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#2A2A2C] flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#D4AF37] group-hover:text-[#E5C158]">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Service Detail Modal Drawer */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              className={`relative w-full max-w-lg rounded-sm shadow-2xl border p-6 space-y-5 transition-all ${
                isDarkMode ? 'bg-[#1A1A1C] border-[#2A2A2C] text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
            <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2C]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center">
                  {React.createElement(getIcon(selectedService.iconName), { className: "w-5 h-5" })}
                </div>
                <h3 className="font-bold text-lg font-serif text-white">{selectedService.title}</h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className={`p-2 rounded-sm border transition ${
                  isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {selectedService.description}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Service Highlights</h4>
              {selectedService.highlights.map((high, i) => (
                <div key={i} className={`p-3 rounded-sm border text-xs font-medium flex items-center gap-2 ${
                  isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>{high}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#2A2A2C] flex items-center justify-between gap-3">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-bold uppercase tracking-wider"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Advisory Desk</span>
              </a>

              <button
                onClick={() => {
                  const sTitle = selectedService.title;
                  setSelectedService(null);
                  onOpenInspection(`Consultation for ${sTitle}`);
                }}
                className="bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-sm shadow transition"
              >
                Book Service Consultation
              </button>
            </div>
          </motion.div>
        </div>
      )}
      </AnimatePresence>
    </section>
  );
};
