import React, { useState } from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/company';
import { ContactFormData } from '../types';
import { submitToFormspree } from '../lib/formspree';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Clock, 
  Building2,
  Sparkles,
  Loader2
} from 'lucide-react';

interface ContactSectionProps {
  isDarkMode: boolean;
  onOpenMapPage?: () => void;
  onOpenCallDesk?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isDarkMode, onOpenMapPage, onOpenCallDesk }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    subject: 'Property Purchase Enquiry',
    propertyInterestedIn: 'General Portfolio',
    message: '',
    recaptchaVerified: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [recaptchaLoading, setRecaptchaLoading] = useState(false);

  const handleRecaptchaClick = () => {
    if (formData.recaptchaVerified) return;
    setRecaptchaLoading(true);
    setTimeout(() => {
      setRecaptchaLoading(false);
      setFormData((prev) => ({ ...prev, recaptchaVerified: true }));
    }, 900);
  };

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(`Enquiry: ${formData.subject}`);
    const body = encodeURIComponent(
      `Hello ${COMPANY_INFO.name},\n\n` +
      `I am submitting an enquiry via your website:\n\n` +
      `• Full Name: ${formData.fullName}\n` +
      `• Email: ${formData.email}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Subject: ${formData.subject}\n` +
      `• Property Interested In: ${formData.propertyInterestedIn}\n\n` +
      `Message Details:\n${formData.message}\n\n` +
      `Best regards,\n${formData.fullName}`
    );
    return `mailto:${COMPANY_INFO.email}?subject=${subject}&body=${body}`;
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill out all required fields marked with *');
      return;
    }
    if (!formData.recaptchaVerified) {
      setErrorMsg('Please check the reCAPTCHA security verification box.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    const res = await submitToFormspree({
      formName: 'Direct Contact Message',
      data: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        propertyInterestedIn: formData.propertyInterestedIn,
        message: formData.message
      }
    });

    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMsg(res.error || 'Failed to transmit message via Formspree. Please try again or use WhatsApp/Email.');
    }
  };

  const handleWhatsAppSubmit = () => {
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMsg('Please provide your name and phone number to send via WhatsApp.');
      return;
    }
    setErrorMsg('');
    const text = encodeURIComponent(
      `Hello ${COMPANY_INFO.name},\n` +
      `• Name: ${formData.fullName}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Email: ${formData.email}\n` +
      `• Subject: ${formData.subject}\n` +
      `• Property Interested In: ${formData.propertyInterestedIn}\n` +
      `• Message: ${formData.message}`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className={`py-24 transition-colors relative ${
      isDarkMode ? 'bg-[#0A0A0B] text-white' : 'bg-white text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1C] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em]">
            <Mail className="w-3.5 h-3.5" /> Direct Client Inquiries
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white">
            Connect With Our Executive Team
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Have questions about a property listing, land title registration, or investment partnership? Get in touch today.
          </p>
        </motion.div>

        {/* 2-Column Grid: Office Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards & Info (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6"
          >
            
            <div className={`p-6 sm:p-8 rounded-sm border space-y-6 ${
              isDarkMode ? 'bg-[#1A1A1C] border-[#2A2A2C]' : 'bg-slate-50 border-slate-200'
            }`}>
              <h3 className="text-xl font-bold font-serif mb-4 text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#D4AF37]" /> Executive Headquarters
              </h3>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#0A0A0B] border border-[#2A2A2C] text-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white font-serif">Office Location</h4>
                  <p className={`text-xs mt-0.5 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {COMPANY_INFO.address}
                  </p>
                  {onOpenMapPage && (
                    <button
                      type="button"
                      onClick={onOpenMapPage}
                      className="mt-2 inline-flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#E5C158] text-black text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm shadow transition"
                    >
                      <MapPin className="w-3.5 h-3.5" /> View Interactive Google Map
                    </button>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#0A0A0B] border border-[#2A2A2C] text-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white font-serif">Executive Call Desk</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-xs text-[#D4AF37] font-bold tracking-wider hover:underline block font-mono">
                      {COMPANY_INFO.phone}
                    </a>
                    <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Active</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Direct Line & Priority Advisory</span>
                  <button
                    type="button"
                    onClick={() => onOpenCallDesk ? onOpenCallDesk() : (window.location.href = `tel:${COMPANY_INFO.phoneRaw}`)}
                    className="mt-2 inline-flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#E5C158] text-black text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-sm shadow transition"
                  >
                    <Phone className="w-3.5 h-3.5" /> Launch Call Desk Console
                  </button>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-emerald-950/50 border border-emerald-700/50 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white font-serif">WhatsApp Fast Desk</h4>
                  <a 
                    href={`https://wa.me/${COMPANY_INFO.whatsappRaw}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs text-emerald-400 font-bold tracking-wider hover:underline block"
                  >
                    {COMPANY_INFO.whatsapp}
                  </a>
                  <span className="text-[11px] text-slate-400">Instant agent chat 24/7</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-[#0A0A0B] border border-[#2A2A2C] text-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white font-serif">Official Email</h4>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-xs text-[#D4AF37] font-bold tracking-wider hover:underline block">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-[#2A2A2C]">
                <div className="w-10 h-10 rounded-sm bg-[#0A0A0B] border border-[#2A2A2C] text-slate-300 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white font-serif">Office Hours</h4>
                  <p className="text-xs text-slate-400">{COMPANY_INFO.officeHours}</p>
                </div>
              </div>
            </div>

            {/* Google Maps View Embed Box */}
            <div className="rounded-sm overflow-hidden border border-[#2A2A2C] shadow-lg aspect-[16/9] relative bg-black">
              <iframe
                title="Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215707164104!2d-73.97607782342898!3d40.76387097138547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f97bf1db8b%3A0xe549a1734bc1499b!2s750%205th%20Ave%2C%20New%20York%2C%20NY%2010019!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </motion.div>

          {/* Right Column: Interactive Form (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className={`p-8 rounded-sm border shadow-2xl transition-all ${
              isDarkMode ? 'bg-[#1A1A1C] border-[#2A2A2C]' : 'bg-slate-50 border-slate-200'
            }`}>
              <h3 className="text-2xl font-bold font-serif mb-2 text-white">Send Us a Direct Message</h3>
              <p className={`text-xs mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Fill out the secure form below to transmit your enquiry directly to the executive managing desk.
              </p>

              {submitted ? (
                <div className="py-8 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center mx-auto border border-[#D4AF37]/40">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold font-serif text-white">Message Prepared & Dispatched!</h4>
                  <p className={`text-xs max-w-md mx-auto leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    Thank you <strong className="text-[#D4AF37]">{formData.fullName}</strong>. Your enquiry message regarding <strong>"{formData.subject}"</strong> has been addressed to the company owner (<strong className="text-white">{COMPANY_INFO.email}</strong>).
                  </p>

                  <div className="p-4 rounded-sm border bg-[#0A0A0B] border-[#2A2A2C] max-w-lg mx-auto text-left text-xs space-y-3">
                    <p className="font-semibold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-[#D4AF37]" /> Send Directly to Company Owner
                    </p>
                    <p className="text-slate-400">
                      If your default email app did not open automatically, click below to launch your email client (Gmail, Outlook, Mail) with your pre-filled enquiry:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                      <a
                        href={generateMailtoUrl()}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold uppercase tracking-wider text-xs px-4 py-3 rounded-sm shadow-md transition"
                      >
                        <Mail className="w-4 h-4" /> Launch Email App
                      </a>
                      <button
                        type="button"
                        onClick={handleWhatsAppSubmit}
                        className="flex-1 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold uppercase tracking-wider text-xs px-4 py-3 rounded-sm shadow-md transition"
                      >
                        <MessageCircle className="w-4 h-4" /> Send via WhatsApp
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData((prev) => ({ ...prev, message: '' }));
                    }}
                    className="bg-[#1A1A1C] hover:bg-[#2A2A2C] border border-[#2A2A2C] text-slate-300 hover:text-white font-bold uppercase tracking-wider text-xs px-6 py-2.5 rounded-sm shadow-md transition mt-2"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3.5 rounded-sm bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eleanor Vance"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-sm border text-xs outline-none ${
                          isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-white focus:border-[#D4AF37] placeholder-slate-600' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-sm border text-xs outline-none ${
                          isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-white focus:border-[#D4AF37] placeholder-slate-600' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Email & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="eleanor@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-sm border text-xs outline-none ${
                          isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-white focus:border-[#D4AF37] placeholder-slate-600' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-sm border text-xs outline-none ${
                          isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-white focus:border-[#D4AF37]' : 'bg-white border-slate-200 text-slate-900'
                        }`}
                      >
                        <option value="Property Purchase Enquiry">Property Purchase Enquiry</option>
                        <option value="Land Plot Acquisition">Land Plot Acquisition</option>
                        <option value="Investment Advisory">Real Estate Investment Advisory</option>
                        <option value="Property Management Request">Property Management Request</option>
                        <option value="Schedule Site Visit">Schedule Site Inspection</option>
                      </select>
                    </div>
                  </div>

                  {/* Property Interested In */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Property Interested In</label>
                    <input
                      type="text"
                      placeholder="e.g. Glass Horizon Ocean Villa / General Portfolio"
                      value={formData.propertyInterestedIn}
                      onChange={(e) => setFormData({ ...formData, propertyInterestedIn: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-sm border text-xs outline-none ${
                        isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-white focus:border-[#D4AF37] placeholder-slate-600' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Message *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your requirements, preferred timelines, or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-sm border text-xs outline-none ${
                        isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-white focus:border-[#D4AF37] placeholder-slate-600' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>

                  {/* Google reCAPTCHA Verification Simulation */}
                  <div className={`p-3.5 rounded-sm border flex items-center justify-between cursor-pointer transition ${
                    isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C]' : 'bg-white border-slate-200'
                  }`}
                  onClick={handleRecaptchaClick}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-sm border flex items-center justify-center transition ${
                        formData.recaptchaVerified 
                          ? 'bg-[#D4AF37] border-[#D4AF37] text-black' 
                          : 'border-slate-600'
                      }`}>
                        {recaptchaLoading ? (
                          <div className="w-3 h-3 border-2 border-slate-400 border-t-[#D4AF37] rounded-full animate-spin" />
                        ) : formData.recaptchaVerified ? (
                          <CheckCircle2 className="w-4 h-4 text-black" />
                        ) : null}
                      </div>
                      <span className="text-xs text-slate-300 font-medium">I'm not a robot</span>
                    </div>

                    <div className="flex items-center gap-1 text-[10px] text-slate-500 font-serif">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> reCAPTCHA Security
                    </div>
                  </div>

                  {/* Dual Submit Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold uppercase tracking-wider text-xs py-3.5 rounded-sm shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          <span>Sending via Formspree...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold uppercase tracking-wider text-xs py-3.5 rounded-sm shadow-lg transition"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                    </button>
                  </div>

                </form>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
