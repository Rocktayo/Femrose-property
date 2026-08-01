import React from 'react';
import { COMPANY_INFO } from '../data/company';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
  isDarkMode: boolean;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose, isDarkMode }) => {
  if (!type) return null;

  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions';
  const Icon = type === 'privacy' ? ShieldCheck : FileText;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className={`relative w-full max-w-2xl rounded-sm shadow-2xl border overflow-hidden transition-all ${
          isDarkMode ? 'bg-[#1A1A1C] border-[#2A2A2C] text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#2A2A2C]">
          <div className="flex items-center gap-2 text-[#D4AF37] font-bold font-serif text-lg">
            <Icon className="w-5 h-5" />
            <span>{title}</span>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-sm border transition ${
              isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-slate-300 hover:bg-[#D4AF37] hover:text-black' : 'bg-slate-100 border-slate-200 text-slate-800'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4 text-xs leading-relaxed text-slate-300 font-serif">
          {type === 'privacy' ? (
            <>
              <p>
                At <strong>{COMPANY_INFO.name}</strong>, we strictly safeguard the confidentiality and privacy of personal information submitted by our real estate clients, investors, and website visitors.
              </p>
              <h4 className="text-sm font-bold text-white mt-3 uppercase tracking-wider text-[#D4AF37]">1. Information Collection</h4>
              <p>
                We collect information provided directly through inquiry forms, inspection bookings, and newsletter subscriptions (e.g., Full Name, Email, Phone Number, and Property Preferences).
              </p>
              <h4 className="text-sm font-bold text-white mt-3 uppercase tracking-wider text-[#D4AF37]">2. Use of Data</h4>
              <p>
                Your data is exclusively used to facilitate property site visits, convey title documentation details, issue ROI financial statements, and respond to direct client queries.
              </p>
              <h4 className="text-sm font-bold text-white mt-3 uppercase tracking-wider text-[#D4AF37]">3. Data Protection Guarantee</h4>
              <p>
                We do not sell, rent, or lease your personal data to third-party marketers. All sensitive financial disclosures remain encrypted and securely stored.
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to <strong>{COMPANY_INFO.name}</strong>. By accessing our platform and scheduling property inspections, you agree to comply with our client advisory terms.
              </p>
              <h4 className="text-sm font-bold text-white mt-3 uppercase tracking-wider text-[#D4AF37]">1. Listing Accuracy & Pricing</h4>
              <p>
                While property prices, availability, and floor plans are updated regularly, final sale conditions are subject to executed contract deeds and escrow verification.
              </p>
              <h4 className="text-sm font-bold text-white mt-3 uppercase tracking-wider text-[#D4AF37]">2. Site Inspections</h4>
              <p>
                Scheduled property site visits require pre-confirmation by an assigned {COMPANY_INFO.name} advisory officer to ensure safety and security compliance.
              </p>
              <h4 className="text-sm font-bold text-white mt-3 uppercase tracking-wider text-[#D4AF37]">3. Intellectual Property</h4>
              <p>
                All architectural renderings, photography, and site plans on this website remain the sole property of {COMPANY_INFO.name}.
              </p>
            </>
          )}
        </div>

        <div className="p-4 px-6 border-t border-[#2A2A2C] text-right bg-[#0A0A0B]">
          <button
            onClick={onClose}
            className="bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold uppercase tracking-wider text-xs py-2.5 px-5 rounded-sm shadow transition"
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );
};
