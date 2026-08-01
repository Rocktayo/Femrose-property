import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/company';
import { MessageCircle, Phone, Mail, ArrowUp } from 'lucide-react';

interface FloatingActionsProps {
  onOpenCallDesk?: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenCallDesk }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent(
    "Hello, I saw your website and I am interested in your real estate services."
  );

  const emailSubject = encodeURIComponent("Property Enquiry & Booking Inquiry");

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end space-y-2.5 pointer-events-none">
      
      {/* Scroll-To-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="pointer-events-auto w-11 h-11 flex items-center justify-center rounded-full bg-slate-900/90 text-amber-400 border border-slate-700 shadow-xl hover:bg-slate-800 transition transform hover:-translate-y-1 backdrop-blur"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating Call Desk Button */}
      <button
        type="button"
        onClick={() => {
          if (onOpenCallDesk) {
            onOpenCallDesk();
          } else {
            window.location.href = `tel:${COMPANY_INFO.phoneRaw}`;
          }
        }}
        aria-label="Activate Call Desk"
        className="pointer-events-auto min-h-[44px] flex items-center gap-2 bg-[#0A0A0B] hover:bg-[#1A1A1C] text-[#D4AF37] font-semibold text-xs py-2.5 px-3.5 sm:px-4 rounded-full shadow-2xl border border-[#D4AF37]/60 backdrop-blur transition transform hover:scale-105"
      >
        <Phone className="w-4 h-4 text-[#D4AF37] animate-pulse" />
        <span className="hidden sm:inline font-bold">Call Desk (08131616366)</span>
        <span className="sm:hidden font-bold">Call Desk</span>
      </button>

      {/* Floating Email Button */}
      <a
        href={`mailto:${COMPANY_INFO.email}?subject=${emailSubject}`}
        aria-label="Send Email to Company Owner"
        className="pointer-events-auto min-h-[44px] flex items-center gap-2 bg-[#0A0A0B] hover:bg-[#1A1A1C] text-[#D4AF37] font-bold text-xs py-2.5 px-3.5 sm:px-4 rounded-full shadow-2xl border border-[#D4AF37]/50 transition transform hover:scale-105"
      >
        <Mail className="w-4 h-4 text-[#D4AF37]" />
        <span className="hidden sm:inline">Email Us</span>
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto min-h-[44px] flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3.5 sm:px-4 rounded-full shadow-2xl transition transform hover:scale-105"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-xs">WhatsApp</span>
      </a>

    </div>
  );
};
