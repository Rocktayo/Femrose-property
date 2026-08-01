import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/company';
import { submitToFormspree } from '../lib/formspree';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Instagram, 
  Linkedin, 
  Facebook, 
  Twitter, 
  Youtube, 
  Send, 
  CheckCircle2,
  ShieldCheck,
  Loader2
} from 'lucide-react';

interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'terms') => void;
  onOpenInspection: (title?: string) => void;
  onOpenMapPage?: () => void;
  onOpenCallDesk?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenInspection, onOpenMapPage, onOpenCallDesk }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setIsSubmitting(true);
    const res = await submitToFormspree({
      formName: 'Newsletter Subscription',
      data: { email: newsletterEmail }
    });
    setIsSubmitting(false);

    if (res.success) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Services', href: '#services' },
    { name: 'Featured Properties', href: '#properties' },
    { name: 'Photo Gallery', href: '#gallery' },
    { name: 'Mortgage Calculator', href: '#calculator' },
    { name: 'Client Testimonials', href: '#testimonials' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <footer className="bg-[#0A0A0B] text-slate-300 border-t border-[#2A2A2C] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#home" className="flex items-center gap-3">
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
                  className="h-full w-auto object-contain max-h-12"
                />
              </div>
              <div>
                <span className="font-bold text-xl tracking-wider text-white block leading-none font-serif">
                  FEM<span className="text-[#D4AF37]">ROSE</span>
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#D4AF37] block mt-1">
                  PROPERTIES & INVESTMENTS
                </span>
              </div>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed">
              {COMPANY_INFO.tagline}. Exclusive real estate advisory, land acquisition, luxury residential sales, and guaranteed title documentation.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-slate-400">
              <a href={COMPANY_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-sm bg-[#1A1A1C] border border-[#2A2A2C] hover:text-[#D4AF37] hover:border-[#D4AF37] transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={COMPANY_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-sm bg-[#1A1A1C] border border-[#2A2A2C] hover:text-[#D4AF37] hover:border-[#D4AF37] transition">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={COMPANY_INFO.socials.facebook} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-sm bg-[#1A1A1C] border border-[#2A2A2C] hover:text-[#D4AF37] hover:border-[#D4AF37] transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={COMPANY_INFO.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-sm bg-[#1A1A1C] border border-[#2A2A2C] hover:text-[#D4AF37] hover:border-[#D4AF37] transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={COMPANY_INFO.socials.youtube} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-sm bg-[#1A1A1C] border border-[#2A2A2C] hover:text-[#D4AF37] hover:border-[#D4AF37] transition">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white font-serif tracking-[0.15em] uppercase">Navigation</h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-400 hover:text-[#D4AF37] transition flex items-center gap-1.5">
                    <span className="text-[#D4AF37] font-bold">•</span> {link.name}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => onOpenMapPage && onOpenMapPage()}
                  className="text-[#D4AF37] font-bold hover:underline transition flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" /> Lagos Location Map
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Summary (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white font-serif tracking-[0.15em] uppercase">Contact</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <span>{COMPANY_INFO.address}</span>
                  {onOpenMapPage && (
                    <button
                      type="button"
                      onClick={onOpenMapPage}
                      className="block text-[#D4AF37] hover:underline text-[11px] font-bold mt-1"
                    >
                      → Open Interactive Google Map
                    </button>
                  )}
                </div>
              </div>
              <button 
                type="button"
                onClick={() => onOpenCallDesk ? onOpenCallDesk() : (window.location.href = `tel:${COMPANY_INFO.phoneRaw}`)}
                className="flex items-center gap-1.5 hover:text-[#D4AF37] transition font-semibold text-left"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 animate-pulse" />
                <span>Call Desk: {COMPANY_INFO.phone}</span>
              </button>
              <p className="flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{COMPANY_INFO.whatsapp}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="truncate hover:text-[#D4AF37] transition">
                  {COMPANY_INFO.email}
                </a>
              </p>
            </div>
          </div>

          {/* Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white font-serif tracking-[0.15em] uppercase">Private Insights</h4>
            <p className="text-xs text-slate-400">
              Subscribe to receive confidential off-market real estate listings and quarterly investment reports.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 rounded-sm bg-[#1A1A1C] border border-[#2A2A2C] text-xs text-white placeholder-slate-500 outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-label="Subscribe"
                  className="absolute right-1 top-1 bottom-1 px-3 rounded-sm bg-[#D4AF37] hover:bg-[#E5C158] text-black flex items-center justify-center transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-black" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#D4AF37] flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3 h-3" /> Subscribed to private market reports!
                </p>
              )}
            </form>

            <button
              onClick={() => onOpenInspection()}
              className="w-full mt-2 bg-[#1A1A1C] hover:bg-[#2A2A2C] text-[#D4AF37] font-bold text-xs uppercase tracking-wider py-3 rounded-sm border border-[#D4AF37]/40 transition"
            >
              Book Private Inspection
            </button>
          </div>

        </div>

        {/* Bottom Rights & Legal */}
        <div className="pt-8 border-t border-[#2A2A2C] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. All Rights Reserved.</p>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-[#D4AF37] transition"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-[#D4AF37] transition"
            >
              Terms & Conditions
            </button>
            <span className="flex items-center gap-1 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> Secure SSL Encrypted
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
