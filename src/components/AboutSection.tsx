import React from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../data/company';
import { 
  Building2, 
  Target, 
  Eye, 
  ShieldCheck, 
  Award, 
  Users, 
  TrendingUp,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface AboutSectionProps {
  isDarkMode: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ isDarkMode }) => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "100% Title Guarantee",
      desc: "Every property in our portfolio undergoes thorough government land registry search, Certificate of Occupancy audit, and clean deed clearance."
    },
    {
      icon: TrendingUp,
      title: "High-Yield ROI Strategy",
      desc: "We analyze capital growth trajectories to offer institutional-grade investment portfolios delivering 14%–22% projected annual returns."
    },
    {
      icon: Award,
      title: "Bespoke Luxury Standard",
      desc: "Architectural precision, resort-inspired amenities, and high-security gated communities built for modern luxury living."
    },
    {
      icon: Users,
      title: "Dedicated Advisory Desk",
      desc: "Personalized concierge support for high-net-worth buyers, diplomats, and international investors from contract to key handover."
    }
  ];

  return (
    <section id="about" className={`py-24 transition-colors relative overflow-hidden ${
      isDarkMode ? 'bg-[#111112] text-white' : 'bg-white text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1C] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" /> About {COMPANY_INFO.name}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white">
            Redefining Luxury Real Estate Excellence
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-slate-300 opacity-90' : 'text-slate-600'}`}>
            Established over 15 years ago, {COMPANY_INFO.name} stands as a premier real estate advisory, land development, and property management firm committed to delivering architectural splendor and secure property investments.
          </p>
        </motion.div>

        {/* 2-Column Grid: Image Showcase & Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          
          {/* Visual Showcase Stack */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-sm overflow-hidden shadow-2xl border border-[#2A2A2C] aspect-[4/3]">
              <img
                src="https://i.imgur.com/a2bhN0S.png"
                alt="15+ Years of Trust & Integrity - Femrose Properties and Investments"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = 'true';
                    target.src = '/images/trust_and_integrity.png';
                  }
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-sm bg-[#0A0A0B]/90 border border-[#2A2A2C] backdrop-blur text-white">
                <p className="text-xs font-serif font-bold text-[#D4AF37] uppercase tracking-wider">15+ Years of Trust & Integrity</p>
                <p className="text-xs text-slate-300 mt-1">Over $450 Million in prime real estate assets successfully brokered and managed globally.</p>
              </div>
            </div>

            {/* Overlapping Floating Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`absolute -bottom-6 -right-4 sm:right-6 p-5 rounded-sm shadow-2xl border flex items-center gap-4 ${
                isDarkMode ? 'bg-[#1A1A1C] border-[#2A2A2C] text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="w-12 h-12 bg-[#D4AF37] flex items-center justify-center text-black font-bold text-xl rounded-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-bold font-serif text-[#D4AF37] block">320+</span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Completed Projects</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Mission & Vision Tabs */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold font-serif mb-3 text-white">Our Legacy & History</h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                Founded with a singular vision to bridge the gap between discerning investors and verified luxury properties, {COMPANY_INFO.name} has grown from a boutique brokerage into a multi-faceted real estate conglomerate handling residential developments, land banking, and high-yield commercial portfolios.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Mission Card */}
              <div className={`p-5 rounded-sm border transition ${
                isDarkMode ? 'bg-[#1A1A1C] border-[#2A2A2C]' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="w-9 h-9 rounded-sm bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center mb-3">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base font-serif mb-1 text-white">Our Mission</h4>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  To provide transparent, secure, and stress-free real estate transactions while designing world-class living spaces that appreciate over time.
                </p>
              </div>

              {/* Vision Card */}
              <div className={`p-5 rounded-sm border transition ${
                isDarkMode ? 'bg-[#1A1A1C] border-[#2A2A2C]' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="w-9 h-9 rounded-sm bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center mb-3">
                  <Eye className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base font-serif mb-1 text-white">Our Vision</h4>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  To remain the most trusted luxury real estate brand globally, recognized for unrivaled legal security, architectural innovation, and client satisfaction.
                </p>
              </div>
            </div>

            {/* Quick Points */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Zero legal ambiguity on property land titles</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Transparent escrow transaction handling</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Seamless virtual video tours & global remote inspection</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* 4 Key Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pil, idx) => {
            const Icon = pil.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className={`p-6 rounded-sm border transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-[#1A1A1C] border-[#2A2A2C] hover:border-[#D4AF37]' 
                    : 'bg-slate-50 border-slate-200 hover:border-amber-400 hover:shadow-lg'
                }`}
              >
                <div className="w-12 h-12 rounded-sm bg-[#0A0A0B] border border-[#2A2A2C] text-[#D4AF37] flex items-center justify-center mb-4 shadow">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-base font-serif mb-2 text-white">{pil.title}</h4>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {pil.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
