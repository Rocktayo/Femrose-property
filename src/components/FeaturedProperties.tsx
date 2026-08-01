import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Property } from '../types';
import { COMPANY_INFO } from '../data/company';
import { 
  Building2, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  MapPin, 
  Eye, 
  Calendar, 
  MessageCircle, 
  SlidersHorizontal,
  RotateCcw,
  CheckCircle,
  Tag
} from 'lucide-react';

interface FeaturedPropertiesProps {
  properties: Property[];
  isDarkMode: boolean;
  onSelectProperty: (property: Property) => void;
  onOpenInspection: (propertyTitle: string) => void;
  searchFilter: { location: string; type: string; price: string };
  onResetSearchFilter: () => void;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  isDarkMode,
  onSelectProperty,
  onOpenInspection,
  searchFilter,
  onResetSearchFilter
}) => {
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedBeds, setSelectedBeds] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const types = ['All', 'Villa', 'Penthouse', 'Mansion', 'Apartment', 'Land'];
  const bedOptions = ['All', '1+', '3+', '5+'];

  // Apply filters
  const filteredProperties = properties.filter((prop) => {
    // Quick search location filter
    if (searchFilter.location && !prop.location.toLowerCase().includes(searchFilter.location.toLowerCase()) && !prop.address.toLowerCase().includes(searchFilter.location.toLowerCase())) {
      return false;
    }
    // Quick search type filter
    if (searchFilter.type && prop.type !== searchFilter.type) {
      return false;
    }
    // Quick search max price filter
    if (searchFilter.price && prop.price > parseInt(searchFilter.price)) {
      return false;
    }
    // Selected Type Tab
    if (selectedType !== 'All' && prop.type !== selectedType) {
      return false;
    }
    // Selected Beds
    if (selectedBeds !== 'All') {
      const minBeds = parseInt(selectedBeds);
      if (prop.bedrooms < minBeds) return false;
    }
    // Status Filter
    if (statusFilter !== 'All' && prop.status !== statusFilter) {
      return false;
    }

    return true;
  });

  const generateWhatsAppLink = (property: Property) => {
    const text = encodeURIComponent(
      `Hello ${COMPANY_INFO.name}, I am interested in inspecting the property "${property.title}" listed at ${property.formattedPrice} in ${property.location}. Please provide more details.`
    );
    return `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${text}`;
  };

  return (
    <section id="properties" className={`py-24 transition-colors ${
      isDarkMode ? 'bg-[#0A0A0B] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1A1C] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              <Building2 className="w-3.5 h-3.5" /> Featured Real Estate Collection
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight font-extrabold">
              Exclusive Luxury Properties
            </h2>
            <p className={`mt-3 text-sm sm:text-base max-w-xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Browse our curated portfolio of premium architectural villas, oceanfront mansions, and sky penthouses with verified titles.
            </p>
          </div>

          {/* Quick Active Search Status */}
          {(searchFilter.location || searchFilter.type || searchFilter.price) && (
            <div className="flex items-center gap-3 bg-[#1A1A1C] border border-[#D4AF37]/50 p-3 rounded-sm text-xs">
              <span className="text-[#D4AF37] font-semibold">Active Filter Applied</span>
              <button
                onClick={onResetSearchFilter}
                className="flex items-center gap-1 bg-[#D4AF37] text-black font-bold uppercase tracking-wider text-[11px] px-3 py-1 rounded-sm hover:bg-[#E5C158] transition"
              >
                <RotateCcw className="w-3 h-3" /> Reset Filter
              </button>
            </div>
          )}
        </motion.div>

        {/* Filter Bar */}
        <div className={`p-4 sm:p-5 rounded-sm border mb-10 transition ${
          isDarkMode ? 'bg-[#1A1A1C] border-[#2A2A2C]' : 'bg-white border-slate-200'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Type Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full lg:w-auto -mx-1 px-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mr-1 flex items-center gap-1 shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#D4AF37]" /> Category:
              </span>
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3.5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition shrink-0 min-h-[38px] ${
                    selectedType === type
                      ? 'bg-[#D4AF37] text-black shadow-lg'
                      : isDarkMode
                        ? 'bg-[#0A0A0B] text-slate-300 border border-[#2A2A2C] hover:border-[#D4AF37]'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Sub-Filters: Beds & Status */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-medium uppercase tracking-wider text-[11px]">Bedrooms:</span>
                {bedOptions.map((beds) => (
                  <button
                    key={beds}
                    onClick={() => setSelectedBeds(beds)}
                    className={`px-3 py-1 rounded-sm font-medium transition ${
                      selectedBeds === beds
                        ? 'bg-[#0A0A0B] text-[#D4AF37] font-bold border border-[#D4AF37]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {beds}
                  </button>
                ))}
              </div>

              <div className="h-4 w-px bg-[#2A2A2C] hidden sm:block" />

              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-medium uppercase tracking-wider text-[11px]">Status:</span>
                {['All', 'For Sale', 'For Lease'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 rounded-sm font-medium transition ${
                      statusFilter === status
                        ? 'bg-[#0A0A0B] text-[#D4AF37] font-bold border border-[#D4AF37]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length === 0 ? (
          <div className={`text-center py-16 rounded-sm border ${
            isDarkMode ? 'bg-[#1A1A1C] border-[#2A2A2C] text-slate-300' : 'bg-white border-slate-200 text-slate-600'
          }`}>
            <Building2 className="w-12 h-12 text-[#D4AF37] mx-auto mb-3 stroke-[1.5]" />
            <h3 className="text-lg font-serif font-bold text-white">No Properties Match Your Search</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Try adjusting your price filter or property category tab to view available listings.
            </p>
            <button
              onClick={() => {
                setSelectedType('All');
                setSelectedBeds('All');
                setStatusFilter('All');
                onResetSearchFilter();
              }}
              className="mt-4 bg-[#D4AF37] text-black font-bold uppercase tracking-wider text-xs px-5 py-2.5 rounded-sm"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProperties.map((prop, idx) => (
                <motion.div
                  key={prop.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -6 }}
                  className={`group rounded-sm border overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col ${
                    isDarkMode 
                      ? 'bg-[#1A1A1C] border-[#2A2A2C] hover:border-[#D4AF37]' 
                      : 'bg-white border-slate-200 hover:border-amber-400'
                  }`}
                >
                {/* Image & Badges Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-black/40" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-[#D4AF37] text-black font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-sm shadow">
                      {prop.status}
                    </span>
                    {prop.featured && (
                      <span className="bg-[#0A0A0B]/90 text-[#D4AF37] border border-[#D4AF37]/50 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-sm backdrop-blur">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Property Type Badge */}
                  <div className="absolute top-3 right-3 bg-[#0A0A0B]/90 text-slate-200 text-xs font-serif uppercase tracking-wider px-2.5 py-1 rounded-sm backdrop-blur border border-[#2A2A2C]">
                    {prop.type}
                  </div>

                  {/* Price overlay at bottom of image */}
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                    <span className="text-2xl font-bold font-serif text-[#D4AF37] tracking-tight drop-shadow-md">
                      {prop.formattedPrice}
                    </span>
                    <span className="text-[10px] text-slate-300 uppercase tracking-widest bg-[#0A0A0B]/80 px-2 py-1 rounded-sm border border-[#2A2A2C]">
                      #{prop.id.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold tracking-wide uppercase mb-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{prop.location}</span>
                    </div>

                    {/* Title */}
                    <h3 className={`text-lg font-bold font-serif line-clamp-1 mb-2 ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {prop.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-xs line-clamp-2 mb-4 leading-relaxed ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {prop.description}
                    </p>

                    {/* Key Stats Bar */}
                    <div className={`grid grid-cols-4 gap-2 py-3 px-2 rounded-sm mb-5 text-center text-xs border ${
                      isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-slate-300' : 'bg-slate-50 border-slate-100 text-slate-700'
                    }`}>
                      {prop.type !== 'Land' ? (
                        <>
                          <div className="flex flex-col items-center">
                            <span className="text-slate-500 text-[10px] uppercase">Beds</span>
                            <span className="font-bold flex items-center gap-1 mt-0.5 text-white">
                              <Bed className="w-3.5 h-3.5 text-[#D4AF37]" /> {prop.bedrooms}
                            </span>
                          </div>
                          <div className="flex flex-col items-center border-l border-[#2A2A2C]">
                            <span className="text-slate-500 text-[10px] uppercase">Baths</span>
                            <span className="font-bold flex items-center gap-1 mt-0.5 text-white">
                              <Bath className="w-3.5 h-3.5 text-[#D4AF37]" /> {prop.bathrooms}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="col-span-2 flex flex-col items-center">
                          <span className="text-slate-500 text-[10px] uppercase">Zoning</span>
                          <span className="font-bold text-[#D4AF37]">Residential</span>
                        </div>
                      )}

                      <div className="flex flex-col items-center border-l border-[#2A2A2C]">
                        <span className="text-slate-500 text-[10px] uppercase">Area</span>
                        <span className="font-bold flex items-center gap-1 mt-0.5 text-white">
                          <Square className="w-3.5 h-3.5 text-[#D4AF37]" /> {prop.areaSqFt.toLocaleString()} sqft
                        </span>
                      </div>

                      <div className="flex flex-col items-center border-l border-[#2A2A2C]">
                        <span className="text-slate-500 text-[10px] uppercase">Parking</span>
                        <span className="font-bold flex items-center gap-1 mt-0.5 text-white">
                          <Car className="w-3.5 h-3.5 text-[#D4AF37]" /> {prop.parkingSpaces}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons: View Details, Book Inspection, WhatsApp */}
                  <div className="space-y-2 pt-3 border-t border-[#2A2A2C]">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectProperty(prop)}
                        className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-sm font-bold uppercase tracking-wider text-[11px] border transition ${
                          isDarkMode
                            ? 'bg-[#0A0A0B] hover:bg-[#222224] border-[#2A2A2C] text-slate-200 hover:border-[#D4AF37]'
                            : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-800'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>View Details</span>
                      </button>

                      <button
                        onClick={() => onOpenInspection(prop.title)}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-sm font-bold uppercase tracking-wider text-[11px] bg-[#D4AF37] hover:bg-[#E5C158] text-black shadow transition"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Inspection</span>
                      </button>
                    </div>

                    {/* Direct WhatsApp Enquiry Button */}
                    <a
                      href={generateWhatsAppLink(prop)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-sm font-bold uppercase tracking-wider text-[11px] bg-emerald-700 hover:bg-emerald-600 text-white transition shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Enquiry</span>
                    </a>
                  </div>

                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
};
