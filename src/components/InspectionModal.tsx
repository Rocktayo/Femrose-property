import React, { useState, useEffect } from 'react';
import { InspectionBooking } from '../types';
import { COMPANY_INFO } from '../data/company';
import { submitToFormspree } from '../lib/formspree';
import { X, Calendar, Clock, User, Mail, Phone, Video, MapPin, CheckCircle, MessageCircle, AlertCircle, Loader2 } from 'lucide-react';

interface InspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPropertyTitle?: string;
  isDarkMode: boolean;
}

export const InspectionModal: React.FC<InspectionModalProps> = ({
  isOpen,
  onClose,
  initialPropertyTitle = '',
  isDarkMode
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<InspectionBooking>({
    propertyName: initialPropertyTitle || 'General Portfolio Inspection',
    fullName: '',
    email: '',
    phone: '',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time: '10:00 AM',
    tourType: 'In-Person',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialPropertyTitle) {
      setFormData((prev) => ({ ...prev, propertyName: initialPropertyTitle }));
    }
  }, [initialPropertyTitle]);

  const generateInspectionMailtoUrl = () => {
    const subject = encodeURIComponent(`Property Inspection Booking: ${formData.propertyName}`);
    const body = encodeURIComponent(
      `Hello ${COMPANY_INFO.name},\n\n` +
      `I would like to book a property inspection tour:\n\n` +
      `• Target Property: ${formData.propertyName}\n` +
      `• Tour Format: ${formData.tourType}\n` +
      `• Preferred Date: ${formData.date}\n` +
      `• Preferred Time Slot: ${formData.time}\n\n` +
      `Client Details:\n` +
      `• Full Name: ${formData.fullName}\n` +
      `• Email: ${formData.email}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Special Requests / Notes: ${formData.notes || 'None'}\n\n` +
      `Best regards,\n${formData.fullName}`
    );
    return `mailto:${COMPANY_INFO.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please complete all required fields (Name, Email, and Phone Number).');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    const res = await submitToFormspree({
      formName: 'Property Inspection Booking',
      data: {
        propertyName: formData.propertyName,
        tourType: formData.tourType,
        date: formData.date,
        time: formData.time,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        notes: formData.notes || 'N/A'
      }
    });

    setIsSubmitting(false);

    if (res.success) {
      setSubmitted(true);
    } else {
      setErrorMsg(res.error || 'Failed to submit booking via Formspree. Please try again.');
    }
  };

  const handleWhatsAppConfirm = () => {
    const text = encodeURIComponent(
      `Hello ${COMPANY_INFO.name}, I would like to confirm my property inspection booking:\n` +
      `• Property: ${formData.propertyName}\n` +
      `• Date: ${formData.date} at ${formData.time}\n` +
      `• Tour Type: ${formData.tourType}\n` +
      `• Client: ${formData.fullName} (${formData.phone})`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-sm shadow-2xl border my-auto transition-all ${
          isDarkMode ? 'bg-[#1A1A1C] border-[#2A2A2C] text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-[#2A2A2C]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#0A0A0B] border border-[#2A2A2C] text-[#D4AF37] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-lg font-serif text-white">Schedule Property Inspection</h3>
              <p className="text-xs text-slate-400 font-serif">Book a private tour with our senior real estate advisor</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className={`p-2 rounded-sm border transition ${
              isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-slate-300 hover:bg-[#D4AF37] hover:text-black' : 'bg-slate-100 border-slate-200 text-slate-800'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold font-serif text-white">Inspection Reserved!</h4>
              <p className={`text-xs max-w-md mx-auto leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Thank you <strong className="text-[#D4AF37]">{formData.fullName}</strong>. Your inspection request for <strong>"{formData.propertyName}"</strong> on <strong>{formData.date} at {formData.time}</strong> ({formData.tourType}) has been logged.
              </p>

              <div className="p-4 rounded-sm border bg-[#0A0A0B] border-[#2A2A2C] text-left text-xs space-y-3">
                <p className="font-semibold text-[#D4AF37] flex items-center gap-1.5 uppercase tracking-wider">
                  <Mail className="w-4 h-4 text-[#D4AF37]" /> Send Booking Directly to Owner
                </p>
                <p className="text-slate-400">
                  Choose your preferred option to send this booking summary directly to the company owner (<strong className="text-white">{COMPANY_INFO.email}</strong>):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={generateInspectionMailtoUrl()}
                    className="flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold uppercase tracking-wider text-xs py-3 px-3 rounded-sm shadow transition"
                  >
                    <Mail className="w-4 h-4" />
                    Send via Email App
                  </a>
                  <button
                    onClick={handleWhatsAppConfirm}
                    className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold uppercase tracking-wider text-xs py-3 px-3 rounded-sm shadow transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Confirm via WhatsApp
                  </button>
                </div>
              </div>

              <button
                onClick={resetAndClose}
                className="w-full bg-[#0A0A0B] hover:bg-[#2A2A2C] border border-[#2A2A2C] text-white font-bold uppercase tracking-wider text-xs py-3 rounded-sm transition"
              >
                Done / Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-sm bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Property name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Target Property</label>
                <input
                  type="text"
                  value={formData.propertyName}
                  onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-sm border text-sm outline-none font-medium ${
                    isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-white focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  placeholder="e.g. Bel-Air Modern Villa"
                />
              </div>

              {/* Tour Type Selector */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Tour Format</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tourType: 'In-Person' })}
                    className={`flex items-center justify-center gap-2 p-3 rounded-sm border text-xs font-bold uppercase tracking-wider transition ${
                      formData.tourType === 'In-Person'
                        ? 'bg-[#D4AF37] border-[#D4AF37] text-black'
                        : isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <MapPin className="w-4 h-4" /> In-Person Site Visit
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, tourType: 'Virtual Video Tour' })}
                    className={`flex items-center justify-center gap-2 p-3 rounded-sm border text-xs font-bold uppercase tracking-wider transition ${
                      formData.tourType === 'Virtual Video Tour'
                        ? 'bg-[#D4AF37] border-[#D4AF37] text-black'
                        : isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <Video className="w-4 h-4" /> 4K Live Video Tour
                  </button>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-sm border text-xs outline-none ${
                      isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-white focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Preferred Slot
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-sm border text-xs outline-none ${
                      isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-white focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="09:00 AM">09:00 AM Morning</option>
                    <option value="11:30 AM">11:30 AM Midday</option>
                    <option value="02:00 PM">02:00 PM Afternoon</option>
                    <option value="04:30 PM">04:30 PM Sunset Tour</option>
                  </select>
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-3 pt-2">
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-sm border text-xs outline-none ${
                      isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-white placeholder-slate-600 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-sm border text-xs outline-none ${
                        isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-white placeholder-slate-600 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>

                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="Phone / WhatsApp *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-sm border text-xs outline-none ${
                        isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-white placeholder-slate-600 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>
                </div>

                {/* Optional Notes */}
                <textarea
                  rows={2}
                  placeholder="Special Requests / Additional Questions (Optional)"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className={`w-full px-4 py-2 rounded-sm border text-xs outline-none ${
                    isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-white placeholder-slate-600 focus:border-[#D4AF37]' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold uppercase tracking-wider text-xs py-3.5 rounded-sm shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>Transmitting Booking to Formspree...</span>
                  </>
                ) : (
                  <span>Confirm Inspection Slot</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
