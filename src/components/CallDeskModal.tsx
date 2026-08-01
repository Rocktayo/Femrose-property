import React, { useState, useEffect, useRef } from 'react';
import { COMPANY_INFO } from '../data/company';
import { submitToFormspree } from '../lib/formspree';
import { 
  Phone, 
  PhoneCall, 
  PhoneOff, 
  MessageCircle, 
  Clock, 
  CheckCircle2, 
  X, 
  Mic, 
  MicOff, 
  Volume2, 
  ShieldCheck, 
  User, 
  Send, 
  Sparkles,
  Headphones,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface CallDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const CallDeskModal: React.FC<CallDeskModalProps> = ({
  isOpen,
  onClose,
  isDarkMode
}) => {
  const [activeTab, setActiveTab] = useState<'dialer' | 'webcall' | 'callback'>('dialer');
  
  // Web Call states
  const [callState, setCallState] = useState<'idle' | 'dialing' | 'connected' | 'ended'>('idle');
  const [callDuration, setCallDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeaker, setIsSpeaker] = useState<boolean>(true);
  
  // Callback Form states
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackInquiry, setCallbackInquiry] = useState('Property Purchase');
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [callbackSubmitting, setCallbackSubmitting] = useState(false);
  const [callbackError, setCallbackError] = useState('');

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const ringIntervalRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  // Stop web audio ringing sound
  const stopRingingSound = () => {
    if (ringIntervalRef.current) {
      clearInterval(ringIntervalRef.current);
      ringIntervalRef.current = null;
    }
    if (oscillatorRef.current) {
      try { oscillatorRef.current.stop(); } catch { /* ignore */ }
      oscillatorRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      try { audioCtxRef.current.close(); } catch { /* ignore */ }
      audioCtxRef.current = null;
    }
  };

  // Sound generator for dial ring using Web Audio API
  const startRingingSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const playTone = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.frequency.setValueAtTime(440, ctx.currentTime); // 440 Hz
        osc2.frequency.setValueAtTime(480, ctx.currentTime); // 480 Hz
        
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 1.8);
        osc2.stop(ctx.currentTime + 1.8);
      };

      playTone();
      ringIntervalRef.current = window.setInterval(playTone, 3000);
    } catch {
      // Audio fallback
    }
  };

  const handleStartWebCall = () => {
    setCallState('dialing');
    setCallDuration(0);
    startRingingSound();

    // Connect after 3.5 seconds
    setTimeout(() => {
      stopRingingSound();
      setCallState('connected');

      // Start call duration timer
      timerIntervalRef.current = window.setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }, 3500);
  };

  const handleEndCall = () => {
    stopRingingSound();
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setCallState('ended');
    setTimeout(() => {
      setCallState('idle');
      setCallDuration(0);
    }, 1500);
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleEndCall();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Clean up Web Call audio and intervals on unmount or tab change
  useEffect(() => {
    return () => {
      stopRingingSound();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  if (!isOpen) return null;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDirectCallNow = () => {
    try {
      window.location.href = `tel:${COMPANY_INFO.phoneRaw}`;
    } catch {
      // ignore
    }
    setActiveTab('webcall');
    handleStartWebCall();
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName.trim() || !callbackPhone.trim()) {
      setCallbackError('Please provide both your name and phone number.');
      return;
    }

    setCallbackError('');
    setCallbackSubmitting(true);

    const res = await submitToFormspree({
      formName: 'Advisor Callback Request',
      data: {
        fullName: callbackName,
        phone: callbackPhone,
        inquiryArea: callbackInquiry
      }
    });

    setCallbackSubmitting(false);

    if (res.success) {
      setCallbackSubmitted(true);
    } else {
      setCallbackError(res.error || 'Failed to transmit callback request via Formspree. Please try again.');
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Femrose Call Desk, I am calling regarding ${callbackInquiry || 'a property inquiry'}.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className={`relative w-full max-w-lg rounded-sm overflow-hidden shadow-2xl border transition-all ${
          isDarkMode ? 'bg-[#0A0A0B] border-[#2A2A2C] text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-5 border-b border-[#2A2A2C] bg-[#1A1A1C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex items-center justify-center rounded-sm bg-[#0A0A0B] border border-[#2A2A2C] p-1 shadow-md">
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
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-white leading-tight">
                  Call Desk Console
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Active
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <span>{COMPANY_INFO.name}</span> • <span>08131616366</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              handleEndCall();
              onClose();
            }}
            className="p-2 rounded-sm bg-[#0A0A0B] text-slate-400 hover:text-white border border-[#2A2A2C] transition"
            aria-label="Close Call Desk"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-3 border-b border-[#2A2A2C] bg-[#0A0A0B]">
          <button
            onClick={() => setActiveTab('dialer')}
            className={`py-3 text-xs font-bold uppercase tracking-wider transition border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'dialer' 
                ? 'border-[#D4AF37] text-[#D4AF37] bg-[#1A1A1C]' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            Direct Dial
          </button>

          <button
            onClick={() => setActiveTab('webcall')}
            className={`py-3 text-xs font-bold uppercase tracking-wider transition border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'webcall' 
                ? 'border-[#D4AF37] text-[#D4AF37] bg-[#1A1A1C]' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            Web Call
          </button>

          <button
            onClick={() => setActiveTab('callback')}
            className={`py-3 text-xs font-bold uppercase tracking-wider transition border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'callback' 
                ? 'border-[#D4AF37] text-[#D4AF37] bg-[#1A1A1C]' 
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Callback
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* TAB 1: DIRECT DIAL & WHATSAPP */}
          {activeTab === 'dialer' && (
            <div className="space-y-6 text-center">
              <div className="p-6 rounded-sm bg-[#1A1A1C] border border-[#2A2A2C] space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] block">
                  Official Phone Desk Line
                </span>
                <div className="text-3xl font-extrabold font-mono tracking-wider text-white">
                  {COMPANY_INFO.phone}
                </div>
                <p className="text-xs text-slate-400">
                  International Dial Format: <span className="text-white font-mono">{COMPANY_INFO.phoneRaw}</span>
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 font-medium pt-1">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Mon - Sat: 8:00 AM - 7:00 PM | Instant Response</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleDirectCallNow}
                  className="w-full flex items-center justify-center gap-3 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-extrabold uppercase tracking-widest text-xs py-4 rounded-sm shadow-xl transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <PhoneCall className="w-5 h-5 animate-bounce" />
                  <span>Call Desk Now ({COMPANY_INFO.phone})</span>
                </button>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded-sm shadow-lg transition"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Call or Chat via WhatsApp</span>
                </a>
              </div>

              <div className="p-3.5 rounded-sm bg-[#0A0A0B] border border-[#2A2A2C] text-left flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Need priority assistance with luxury villa bookings, land title verification, or site inspection? Our direct desk is actively monitored by senior advisors.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE WEB AUDIO CALL */}
          {activeTab === 'webcall' && (
            <div className="space-y-6 text-center">
              {callState === 'idle' && (
                <div className="py-6 space-y-5">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#1A1A1C] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-xl">
                    <Headphones className="w-10 h-10" />
                  </div>

                  <div>
                    <h4 className="text-xl font-bold font-serif text-white">
                      Live Web Call Console
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      Connect directly through your browser to Femrose Call Desk line <strong className="text-white">08131616366</strong> without cellular charges.
                    </p>
                  </div>

                  <button
                    onClick={handleStartWebCall}
                    className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold uppercase tracking-widest text-xs py-4 rounded-sm shadow-2xl transition transform hover:scale-[1.02]"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Start Web Call (08131616366)</span>
                  </button>
                </div>
              )}

              {callState === 'dialing' && (
                <div className="py-8 space-y-6 animate-fadeIn">
                  <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 animate-ping" />
                    <div className="relative w-24 h-24 rounded-full bg-[#1A1A1C] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                      <PhoneCall className="w-10 h-10 animate-bounce" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold font-serif text-white">
                      Dialing 08131616366...
                    </h4>
                    <p className="text-xs text-[#D4AF37] animate-pulse mt-1">
                      Ringing Femrose Properties Executive Call Desk
                    </p>
                  </div>

                  <button
                    onClick={handleEndCall}
                    className="flex items-center justify-center gap-2 mx-auto bg-rose-700 hover:bg-rose-600 text-white font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-full shadow-lg transition"
                  >
                    <PhoneOff className="w-4 h-4" /> Cancel Call
                  </button>
                </div>
              )}

              {callState === 'connected' && (
                <div className="py-6 space-y-6 animate-fadeIn">
                  <div className="w-20 h-20 mx-auto rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center shadow-2xl">
                    <Headphones className="w-9 h-9" />
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30 uppercase tracking-widest mb-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Live Connected
                    </div>
                    <h4 className="text-2xl font-mono font-bold text-white">
                      {formatTimer(callDuration)}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Call Desk Senior Advisor Active • Line 08131616366
                    </p>
                  </div>

                  {/* Audio Wave Visualization */}
                  <div className="flex items-center justify-center gap-1.5 h-8">
                    {[40, 70, 30, 90, 60, 100, 50, 80, 40, 70].map((h, i) => (
                      <div
                        key={i}
                        className="w-1.5 bg-[#D4AF37] rounded-full animate-pulse"
                        style={{
                          height: `${h}%`,
                          animationDelay: `${i * 0.15}s`
                        }}
                      />
                    ))}
                  </div>

                  {/* Call Controls */}
                  <div className="flex items-center justify-center gap-4 pt-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className={`p-3.5 rounded-full border transition ${
                        isMuted 
                          ? 'bg-rose-950 text-rose-400 border-rose-800' 
                          : 'bg-[#1A1A1C] text-slate-200 border-[#2A2A2C] hover:border-[#D4AF37]'
                      }`}
                      aria-label="Mute Microphone"
                    >
                      {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>

                    <button
                      onClick={handleEndCall}
                      className="p-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-2xl transition transform hover:scale-110"
                      aria-label="End Call"
                    >
                      <PhoneOff className="w-6 h-6" />
                    </button>

                    <button
                      onClick={() => setIsSpeaker(!isSpeaker)}
                      className={`p-3.5 rounded-full border transition ${
                        isSpeaker 
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800' 
                          : 'bg-[#1A1A1C] text-slate-200 border-[#2A2A2C]'
                      }`}
                      aria-label="Toggle Speaker"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {callState === 'ended' && (
                <div className="py-8 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#1A1A1C] text-slate-400 flex items-center justify-center border border-[#2A2A2C]">
                    <PhoneOff className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold font-serif text-white">Call Disconnected</h4>
                  <p className="text-xs text-slate-400">
                    Thank you for contacting Femrose Call Desk (08131616366).
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CALLBACK REQUEST FORM */}
          {activeTab === 'callback' && (
            <div>
              {callbackSubmitted ? (
                <div className="py-8 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/40">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold font-serif text-white">
                    Callback Ticket Logged!
                  </h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Our Senior Call Desk Advisor will phone your line (<strong className="text-[#D4AF37]">{callbackPhone}</strong>) within 5 minutes.
                  </p>
                  <div className="p-3 bg-[#1A1A1C] border border-[#2A2A2C] rounded text-left text-xs text-slate-400 space-y-1">
                    <p><strong className="text-white">Client:</strong> {callbackName}</p>
                    <p><strong className="text-white">Subject:</strong> {callbackInquiry}</p>
                    <p><strong className="text-white">Call Desk Ref:</strong> 08131616366-CD-{Math.floor(1000 + Math.random() * 9000)}</p>
                  </div>
                  <button
                    onClick={() => {
                      setCallbackSubmitted(false);
                      setCallbackName('');
                      setCallbackPhone('');
                    }}
                    className="bg-[#1A1A1C] hover:bg-[#2A2A2C] text-slate-300 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded border border-[#2A2A2C] transition"
                  >
                    Request Another Callback
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-4">
                  {callbackError && (
                    <div className="p-3 rounded-sm bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{callbackError}</span>
                    </div>
                  )}

                  <div className="text-left space-y-1">
                    <h4 className="font-serif font-bold text-sm text-white">
                      Request Immediate Advisor Callback
                    </h4>
                    <p className="text-xs text-slate-400">
                      Enter your phone number below and our Call Desk at <strong className="text-[#D4AF37]">08131616366</strong> will initiate a priority callback.
                    </p>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Your Full Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Chief Adeleke"
                        value={callbackName}
                        onChange={(e) => setCallbackName(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-sm bg-[#1A1A1C] border border-[#2A2A2C] text-xs text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Your Phone Number *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 08012345678 or +234..."
                        value={callbackPhone}
                        onChange={(e) => setCallbackPhone(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 rounded-sm bg-[#1A1A1C] border border-[#2A2A2C] text-xs text-white outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Inquiry Area</label>
                    <select
                      value={callbackInquiry}
                      onChange={(e) => setCallbackInquiry(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-sm bg-[#1A1A1C] border border-[#2A2A2C] text-xs text-white outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Property Purchase">Luxury Property Purchase</option>
                      <option value="Land Sourcing">Prime Land Plots in Lagos</option>
                      <option value="Inspection Booking">Schedule Private Inspection</option>
                      <option value="Investment Advisory">High-Yield Investment Advisory</option>
                      <option value="Documentation Clearance">Title Deed & C of O Verification</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={callbackSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-extrabold uppercase tracking-widest text-xs py-3.5 rounded-sm shadow-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {callbackSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        <span>Transmitting to Formspree...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Callback Alert to Desk (08131616366)</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
