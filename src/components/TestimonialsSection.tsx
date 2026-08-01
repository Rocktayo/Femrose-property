import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/company';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, Building } from 'lucide-react';

interface TestimonialsSectionProps {
  isDarkMode: boolean;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ isDarkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className={`py-24 transition-colors relative ${
      isDarkMode ? 'bg-[#0A0A0B] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1C] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em]">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37]" /> Client Experiences & Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white">
            Trusted By High-Net-Worth Buyers
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Read firsthand accounts from homeowners, estate developers, and portfolio managers who partnered with Femrose Properties and Investments.
          </p>
        </div>

        {/* Testimonial Card Slider */}
        <div className="max-w-4xl mx-auto">
          <div className={`relative p-8 sm:p-12 rounded-sm border shadow-2xl transition-all ${
            isDarkMode 
              ? 'bg-[#1A1A1C] border-[#2A2A2C]' 
              : 'bg-white border-slate-200'
          }`}>
            <Quote className="w-16 h-16 text-[#D4AF37]/15 absolute top-6 right-8 pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {/* Star Rating */}
              <div className="flex items-center space-x-1">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>

              {/* Quote Comment */}
              <p className={`text-lg sm:text-2xl font-serif italic leading-relaxed ${
                isDarkMode ? 'text-slate-100' : 'text-slate-800'
              }`}>
                "{activeTestimonial.comment}"
              </p>

              {/* Client Profile Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#2A2A2C]">
                <div className="flex items-center space-x-4">
                  <img
                    src={activeTestimonial.avatar}
                    alt={activeTestimonial.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37] shadow-md"
                  />
                  <div>
                    <h4 className="font-bold text-base font-serif text-white flex items-center gap-1.5">
                      {activeTestimonial.name}
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    </h4>
                    <p className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider">{activeTestimonial.role}</p>
                  </div>
                </div>

                {/* Property Purchased Tag */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-xs font-medium ${
                  isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <Building className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Acquired: <strong className="text-white">{activeTestimonial.propertyPurchased}</strong></span>
                </div>
              </div>

            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-end space-x-2 mt-6 pt-4 border-t border-[#2A2A2C]">
              <span className="text-xs text-slate-400 font-serif mr-2">
                {currentIndex + 1} of {TESTIMONIALS.length}
              </span>
              <button
                onClick={handlePrev}
                aria-label="Previous Review"
                className={`p-2.5 rounded-sm border transition ${
                  isDarkMode 
                    ? 'bg-[#0A0A0B] border-[#2A2A2C] text-slate-200 hover:bg-[#D4AF37] hover:text-black' 
                    : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Review"
                className={`p-2.5 rounded-sm border transition ${
                  isDarkMode 
                    ? 'bg-[#0A0A0B] border-[#2A2A2C] text-slate-200 hover:bg-[#D4AF37] hover:text-black' 
                    : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
