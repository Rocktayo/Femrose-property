import React, { useState } from 'react';
import { Property } from '../types';
import { COMPANY_INFO } from '../data/company';
import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Car, 
  Calendar, 
  MessageCircle, 
  Mail,
  CheckCircle2, 
  Calculator, 
  Shield, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  PhoneCall
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onOpenInspection: (propertyTitle: string) => void;
  isDarkMode: boolean;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  onOpenInspection,
  isDarkMode
}) => {
  if (!property) return null;

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const galleryList = property.gallery && property.gallery.length > 0 
    ? property.gallery 
    : [property.image];

  const handleNextImg = () => {
    setActiveImgIndex((prev) => (prev + 1) % galleryList.length);
  };

  const handlePrevImg = () => {
    setActiveImgIndex((prev) => (prev - 1 + galleryList.length) % galleryList.length);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const generateWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello ${COMPANY_INFO.name}, I am interested in inspecting the property "${property.title}" listed for ${property.formattedPrice} (${property.location}). Please provide availability.`
    );
    return `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${text}`;
  };

  // Rough mortgage estimate (20% down, 6.5% interest, 30 yrs)
  const principal = property.price * 0.8;
  const monthlyRate = 0.065 / 12;
  const numPayments = 360;
  const estimatedMonthly = Math.round(
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-sm shadow-2xl border my-auto transition-all ${
          isDarkMode ? 'bg-[#1A1A1C] border-[#2A2A2C] text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#2A2A2C]">
          <div>
            <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-[0.2em]">
              {property.type} • {property.status}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white line-clamp-1">
              {property.title}
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className={`p-2 rounded-sm border text-xs flex items-center gap-1 font-semibold uppercase tracking-wider transition ${
                isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-slate-300 hover:border-[#D4AF37]' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <Share2 className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className={`p-2 rounded-sm border transition ${
                isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-slate-300 hover:bg-[#D4AF37] hover:text-black' : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="max-h-[80vh] overflow-y-auto p-6 space-y-6">
          
          {/* Main Image View & Thumbnail Carousel */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] rounded-sm overflow-hidden bg-black border border-[#2A2A2C] shadow-md">
              <img
                src={galleryList[activeImgIndex]}
                alt={property.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/80 via-transparent to-transparent" />

              {/* Slider Arrows */}
              {galleryList.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImg}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-sm bg-[#0A0A0B]/80 border border-[#2A2A2C] text-white hover:bg-[#D4AF37] hover:text-black transition shadow"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImg}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-sm bg-[#0A0A0B]/80 border border-[#2A2A2C] text-white hover:bg-[#D4AF37] hover:text-black transition shadow"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Price Tag Overlay */}
              <div className="absolute bottom-4 left-4">
                <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold block">Listing Price</span>
                <span className="text-3xl font-serif font-extrabold text-white drop-shadow">
                  {property.formattedPrice}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {galleryList.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {galleryList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-20 h-14 rounded-sm overflow-hidden border transition-all flex-shrink-0 ${
                      activeImgIndex === idx ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]' : 'border-[#2A2A2C] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location & Quick Spec Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#2A2A2C]">
            <div className="flex items-center gap-1.5 text-[#D4AF37] font-bold text-sm">
              <MapPin className="w-4 h-4" />
              <span>{property.address}</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
              <span className={`px-3 py-1.5 rounded-sm border flex items-center gap-1.5 ${
                isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-slate-200' : 'bg-slate-100 border-slate-200'
              }`}>
                <Bed className="w-4 h-4 text-[#D4AF37]" /> {property.bedrooms} Beds
              </span>
              <span className={`px-3 py-1.5 rounded-sm border flex items-center gap-1.5 ${
                isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-slate-200' : 'bg-slate-100 border-slate-200'
              }`}>
                <Bath className="w-4 h-4 text-[#D4AF37]" /> {property.bathrooms} Baths
              </span>
              <span className={`px-3 py-1.5 rounded-sm border flex items-center gap-1.5 ${
                isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-slate-200' : 'bg-slate-100 border-slate-200'
              }`}>
                <Square className="w-4 h-4 text-[#D4AF37]" /> {property.areaSqFt.toLocaleString()} sqft
              </span>
              <span className={`px-3 py-1.5 rounded-sm border flex items-center gap-1.5 ${
                isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-slate-200' : 'bg-slate-100 border-slate-200'
              }`}>
                <Car className="w-4 h-4 text-[#D4AF37]" /> {property.parkingSpaces} Parking
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-base font-bold font-serif mb-2 text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#D4AF37]" /> Property Overview
            </h3>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {property.description}
            </p>
          </div>

          {/* Key Features & Amenities Grid */}
          <div>
            <h3 className="text-base font-bold font-serif mb-3 text-white">Key Features & Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {property.features.map((feat, i) => (
                <div 
                  key={i} 
                  className={`p-2.5 rounded-sm border text-xs font-medium flex items-center gap-2 ${
                    isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Estimated Mortgage Payment Summary Box */}
          <div className={`p-4 rounded-sm border flex flex-col sm:flex-row items-center justify-between gap-4 ${
            isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C]' : 'bg-amber-500/5 border-amber-500/20'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#1A1A1C] border border-[#2A2A2C] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Est. Monthly Mortgage</span>
                <span className="text-xl font-bold font-serif text-[#D4AF37]">
                  ${estimatedMonthly.toLocaleString()}<span className="text-xs font-normal text-slate-400">/mo</span>
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 max-w-xs text-center sm:text-right font-serif">
              Based on 20% down payment, 6.5% interest rate, and 30-year fixed loan term.
            </p>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 px-6 border-t border-[#2A2A2C] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-serif">
            <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Agent Desk: {COMPANY_INFO.phone}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <a
              href={`mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(`Enquiry: ${property.title}`)}&body=${encodeURIComponent(
                `Hello ${COMPANY_INFO.name},\n\nI am inquiring about the property listing "${property.title}" priced at ${property.formattedPrice}.\nAddress: ${property.address}\n\nPlease send me details and title document copies.\n\nThank you!`
              )}`}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#0A0A0B] hover:bg-[#1A1A1C] border border-[#2A2A2C] text-slate-200 hover:border-[#D4AF37] hover:text-[#D4AF37] font-bold uppercase tracking-wider text-xs py-3 px-4 rounded-sm shadow transition"
            >
              <Mail className="w-4 h-4 text-[#D4AF37]" />
              Email Enquiry
            </a>

            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold uppercase tracking-wider text-xs py-3 px-4 rounded-sm shadow transition"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenInspection(property.title);
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold uppercase tracking-wider text-xs py-3 px-4 rounded-sm shadow transition"
            >
              <Calendar className="w-4 h-4" />
              Book Inspection
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
