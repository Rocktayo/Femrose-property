import React, { useState, useEffect, useRef } from 'react';
import { COMPANY_INFO } from '../data/company';
import { 
  Users, 
  Building2, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  CheckCircle,
  FileText
} from 'lucide-react';

interface WhyChooseUsProps {
  isDarkMode: boolean;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ isDarkMode }) => {
  const [counts, setCounts] = useState({
    clients: 0,
    sold: 0,
    years: 0,
    projects: 0
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateStats();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateStats = () => {
    const duration = 2000;
    const steps = 50;
    const intervalTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        clients: Math.min(1250, Math.floor(1250 * progress)),
        sold: Math.min(450, Math.floor(450 * progress)),
        years: Math.min(15, Math.floor(15 * progress)),
        projects: Math.min(320, Math.floor(320 * progress))
      });

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);
  };

  const statItems = [
    {
      icon: Users,
      label: "Happy Clients",
      value: `${counts.clients.toLocaleString()}+`,
      sub: "High-net-worth buyers & investors"
    },
    {
      icon: TrendingUp,
      label: "Properties Sold",
      value: `$${counts.sold}M+`,
      sub: "Verified asset transaction volume"
    },
    {
      icon: Award,
      label: "Years of Experience",
      value: `${counts.years}+`,
      sub: "Unrivaled real estate market leadership"
    },
    {
      icon: Building2,
      label: "Projects Completed",
      value: `${counts.projects}+`,
      sub: "Luxury residential & commercial estates"
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className={`py-24 transition-colors relative overflow-hidden ${
        isDarkMode ? 'bg-[#111112] text-white' : 'bg-slate-950 text-white'
      }`}
    >
      {/* Abstract Background Accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A1C] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em]">
            <ShieldCheck className="w-3.5 h-3.5" /> Proven Track Record
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif tracking-tight text-white">
            Why Choose {COMPANY_INFO.name}?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Backed by numbers, verified titles, and zero-risk legal frameworks. We deliver architectural perfection and lasting capital growth.
          </p>
        </div>

        {/* 4 Counter Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {statItems.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-sm bg-[#1A1A1C] border border-[#2A2A2C] backdrop-blur text-center space-y-3 shadow-xl hover:border-[#D4AF37] transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-sm bg-[#0A0A0B] border border-[#2A2A2C] text-[#D4AF37] flex items-center justify-center mx-auto shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-4xl sm:text-5xl font-extrabold font-serif text-[#D4AF37] tracking-tight">
                  {stat.value}
                </h3>
                <h4 className="font-bold text-base text-white font-serif">{stat.label}</h4>
                <p className="text-xs text-slate-400 leading-normal">{stat.sub}</p>
              </div>
            );
          })}
        </div>

        {/* 3 Guarantees Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#2A2A2C]">
          <div className="flex items-start gap-3.5 p-5 rounded-sm bg-[#0A0A0B] border border-[#2A2A2C]">
            <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-white font-serif">Full Legal Due Diligence</h4>
              <p className="text-xs text-slate-400 mt-1">
                Zero title dispute record. Every C of O and Deed of Assignment is thoroughly vetted before listing.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-5 rounded-sm bg-[#0A0A0B] border border-[#2A2A2C]">
            <Clock className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-white font-serif">Rapid Key Handover</h4>
              <p className="text-xs text-slate-400 mt-1">
                Streamlined legal closing process ensures document handover within 14 business days.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-5 rounded-sm bg-[#0A0A0B] border border-[#2A2A2C]">
            <FileText className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-white font-serif">Flexible Payment Structures</h4>
              <p className="text-xs text-slate-400 mt-1">
                Tailored installment plans available for off-plan luxury estate developments.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
