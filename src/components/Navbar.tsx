import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_INFO } from '../data/company';
import { 
  Building2, 
  Phone, 
  MessageCircle, 
  Mail,
  Sun, 
  Moon, 
  Menu, 
  X, 
  Calendar,
  Sparkles,
  MapPin
} from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenInspection: (propertyTitle?: string) => void;
  onOpenCallDesk?: () => void;
  activeSection: string;
  onOpenMapPage?: () => void;
  onNavigateHome?: () => void;
  currentPage?: 'home' | 'map';
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  onToggleDarkMode,
  onOpenInspection,
  onOpenCallDesk,
  activeSection,
  onOpenMapPage,
  onNavigateHome,
  currentPage = 'home'
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Properties', href: '#properties' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Calculator', href: '#calculator' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (currentPage !== 'home' && onNavigateHome) {
      onNavigateHome();
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Top Banner Bar */}
      <div className="bg-[#0A0A0B] text-slate-300 text-xs py-2 px-4 hidden md:block border-b border-[#222224]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-[#D4AF37] font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              Premier Luxury Real Estate & Advisory
            </span>
            <span className="text-slate-700">|</span>
            <button 
              type="button"
              onClick={() => onOpenCallDesk ? onOpenCallDesk() : (window.location.href = `tel:${COMPANY_INFO.phoneRaw}`)}
              className="flex items-center gap-1 hover:text-[#D4AF37] transition font-semibold"
            >
              <Phone className="w-3 h-3 text-[#D4AF37] animate-pulse" />
              <span>Call Desk ({COMPANY_INFO.phone})</span>
            </button>
            <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-1 hover:text-[#D4AF37] transition">
              <Mail className="w-3 h-3 text-[#D4AF37]" />
              {COMPANY_INFO.email}
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">{COMPANY_INFO.officeHours}</span>
            <button
              onClick={() => onOpenInspection()}
              className="bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold uppercase tracking-wider px-3 py-1 rounded text-[10px] transition"
            >
              Book Inspection
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? isDarkMode
              ? 'bg-[#0A0A0B]/95 backdrop-blur-md shadow-2xl border-b border-[#2A2A2C] py-3'
              : 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-3'
            : isDarkMode
              ? 'bg-[#0A0A0B]/80 backdrop-blur-sm py-4 border-b border-[#222224]'
              : 'bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group"
          >
            <div className="h-10 sm:h-12 flex items-center justify-center">
              <img 
                src={COMPANY_INFO.logoUrl} 
                alt={COMPANY_INFO.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = 'true';
                    target.src = COMPANY_INFO.logoFallback;
                  }
                }}
                className="h-full w-auto object-contain max-h-12 group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <span className={`font-serif text-lg sm:text-xl font-bold tracking-wider block leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                FEM<span className="text-[#D4AF37]">ROSE</span>
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-semibold text-[#D4AF37] block mt-1">
                PROPERTIES & INVESTMENTS
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = currentPage === 'home' && activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 rounded text-xs uppercase tracking-widest font-medium transition-all ${
                    isActive
                      ? 'text-[#D4AF37] bg-[#D4AF37]/10 font-bold border border-[#D4AF37]/30'
                      : isDarkMode
                        ? 'text-slate-300 hover:text-[#D4AF37] hover:bg-[#1A1A1C]'
                        : 'text-slate-700 hover:text-amber-600 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}

            {/* Separate Lagos Map Page Button */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenMapPage) onOpenMapPage();
              }}
              className={`px-3 py-2 rounded text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-1.5 ${
                currentPage === 'map'
                  ? 'text-black bg-[#D4AF37] shadow-md'
                  : 'text-[#D4AF37] bg-[#1A1A1C] border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-black'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Lagos Map</span>
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={onToggleDarkMode}
              aria-label="Toggle Theme"
              className={`p-2.5 rounded border transition-all ${
                isDarkMode
                  ? 'bg-[#1A1A1C] border-[#2A2A2C] text-[#D4AF37] hover:border-[#D4AF37]'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Book Inspection CTA */}
            <button
              onClick={() => onOpenInspection()}
              className="hidden sm:flex items-center gap-2 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-xs uppercase tracking-widest font-bold px-5 py-2.5 transition-all transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Inspection</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2.5 rounded border transition ${
                isDarkMode
                  ? 'bg-[#1A1A1C] border-[#2A2A2C] text-slate-200'
                  : 'bg-slate-100 border-slate-200 text-slate-800'
              }`}
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="fixed inset-0 top-[60px] z-50 lg:hidden flex flex-col bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className={`w-full max-h-[85vh] overflow-y-auto px-5 pt-4 pb-8 space-y-4 border-b shadow-2xl ${
                  isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
              <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2C]">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] font-serif">
                  Navigation Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-sm bg-[#1A1A1C] text-slate-400 hover:text-white border border-[#2A2A2C]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`min-h-[44px] flex items-center px-3.5 py-2.5 rounded-sm text-xs uppercase tracking-widest font-semibold border transition ${
                      isDarkMode
                        ? 'border-[#2A2A2C] bg-[#1A1A1C] hover:bg-[#2A2A2C] text-slate-200'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenMapPage) onOpenMapPage();
                  }}
                  className="min-h-[44px] px-3.5 py-2.5 rounded-sm text-xs uppercase tracking-widest font-bold border border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Lagos Map</span>
                </button>
              </div>
              
              <div className="pt-2 border-t border-[#2A2A2C] space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInspection();
                  }}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold uppercase tracking-widest text-xs py-3 rounded-sm shadow-md transition"
                >
                  <Calendar className="w-4 h-4" />
                  Book Property Inspection
                </button>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 font-serif pt-2">
                  <button 
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenCallDesk) onOpenCallDesk();
                      else window.location.href = `tel:${COMPANY_INFO.phoneRaw}`;
                    }} 
                    className="p-2.5 rounded-sm bg-[#1A1A1C] border border-[#2A2A2C] flex items-center justify-center gap-1.5 text-slate-300 font-bold hover:text-[#D4AF37]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" /> Call Desk
                  </button>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="p-2.5 rounded-sm bg-[#1A1A1C] border border-[#2A2A2C] flex items-center justify-center gap-1.5 text-slate-300 truncate">
                    <Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> Email Us
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        </AnimatePresence>
      </header>
    </>
  );
};
