import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/company';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Mail, 
  Calendar, 
  ExternalLink, 
  ArrowLeft, 
  Building2, 
  Compass, 
  Clock, 
  CheckCircle2, 
  ShieldCheck,
  Car,
  Plane
} from 'lucide-react';

interface LocationMapPageProps {
  isDarkMode: boolean;
  onBackToHome: () => void;
  onOpenInspection: (propertyTitle?: string) => void;
}

interface LagosArea {
  id: string;
  name: string;
  category: string;
  mapQuery: string;
  description: string;
  keyFeatures: string[];
  avgPriceSqMeter: string;
  rentalYield: string;
}

const LAGOS_AREAS: LagosArea[] = [
  {
    id: 'vi',
    name: 'Victoria Island, Lagos',
    category: 'Corporate & Luxury HQ',
    mapQuery: 'Victoria Island, Lagos, Nigeria',
    description: 'The premier financial, diplomatic, and luxury business corridor of Lagos State, housing international corporate headquarters, luxury high-rises, and prime commercial real estate.',
    keyFeatures: ['Eko Atlantic City Connectivity', 'Financial & Banking Hub', 'Diplomatic Enclave', '5-Star Hospitality & Dining'],
    avgPriceSqMeter: '₦850,000 - ₦1,400,000',
    rentalYield: '12% - 16% p.a.'
  },
  {
    id: 'ikoyi',
    name: 'Ikoyi & Banana Island',
    category: 'Ultra-Luxury Residential',
    mapQuery: 'Banana Island, Ikoyi, Lagos, Nigeria',
    description: 'Nigeria’s most prestigious and high-value residential peninsula, famous for gated waterfront mansions, high-net-worth residences, and top-tier security.',
    keyFeatures: ['Private Waterfront Docks', 'Gated High-Security Zone', 'Golf Club & Marina Access', 'Highest Capital Appreciation'],
    avgPriceSqMeter: '₦1,200,000 - ₦2,200,000',
    rentalYield: '14% - 18% p.a.'
  },
  {
    id: 'lekki',
    name: 'Lekki Phase 1',
    category: 'Coastal & Urban Lifestyle',
    mapQuery: 'Lekki Phase 1, Lagos, Nigeria',
    description: 'A vibrant, rapidly growing residential and commercial corridor favored by tech leaders, young executives, luxury boutique developers, and premium retail establishments.',
    keyFeatures: ['Lekki-Ikoyi Link Bridge', 'Nightlife & Luxury Retail', 'High Rental Demand', 'Gated Smart Estates'],
    avgPriceSqMeter: '₦600,000 - ₦950,000',
    rentalYield: '13% - 17% p.a.'
  },
  {
    id: 'eko-atlantic',
    name: 'Eko Atlantic City',
    category: 'Future Smart Megacity',
    mapQuery: 'Eko Atlantic City, Victoria Island, Lagos, Nigeria',
    description: 'A state-of-the-art reclaimed oceanfront megacity featuring clean energy infrastructure, advanced sea defense walls, and international business towers.',
    keyFeatures: ['24/7 Independent Power & Water', 'Subsea Fiber Infrastructure', 'Great Wall of Lagos Sea Defense', 'Free Zone Tax Advantages'],
    avgPriceSqMeter: '₦1,500,000 - ₦3,000,000',
    rentalYield: '15% - 20% p.a.'
  },
  {
    id: 'ikeja-gra',
    name: 'Ikeja GRA (Mainland HQ)',
    category: 'Mainland Commercial Hub',
    mapQuery: 'Ikeja GRA, Lagos, Nigeria',
    description: 'The historic and serene Government Reserved Area of the Lagos Mainland, located minutes from the international airport and major government seats.',
    keyFeatures: ['Near Murtala Muhammed Airport', 'Serene Tree-Lined Avenues', 'Federal & State Legal Hubs', 'Stable Commercial Growth'],
    avgPriceSqMeter: '₦500,000 - ₦850,000',
    rentalYield: '10% - 14% p.a.'
  }
];

export const LocationMapPage: React.FC<LocationMapPageProps> = ({
  isDarkMode,
  onBackToHome,
  onOpenInspection
}) => {
  const [selectedArea, setSelectedArea] = useState<LagosArea>(LAGOS_AREAS[0]);

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(selectedArea.mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  const externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedArea.mapQuery)}`;

  return (
    <div className={`min-h-screen animate-fadeIn ${isDarkMode ? 'bg-[#0A0A0B] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Top Breadcrumb Header Bar */}
      <div className="bg-[#101012] border-b border-[#2A2A2C] py-4 px-4 sm:px-8 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-[#E5C158] transition bg-[#1A1A1C] hover:bg-[#2A2A2C] border border-[#2A2A2C] px-3.5 py-2 rounded-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Main Website
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-serif">
            <span>Home</span>
            <span>/</span>
            <span className="text-white font-semibold">Lagos Location Map</span>
          </div>

          <button
            onClick={() => onOpenInspection()}
            className="bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold uppercase tracking-wider text-xs px-4 py-2 rounded-sm transition shadow-md"
          >
            Book Site Visit
          </button>
        </div>
      </div>

      {/* Main Banner / Title Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-[#2A2A2C] bg-gradient-to-b from-[#101012] to-[#0A0A0B]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#1A1A1C] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
            <MapPin className="w-3.5 h-3.5" /> Headquarters & Regional Office • Lagos, Nigeria
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
            LAGOS LOCATION & <span className="text-[#D4AF37]">INTERACTIVE MAP</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
            Explore our headquarters and prime real estate corridors across Lagos, Nigeria. Use the interactive map below to view locations in Victoria Island, Ikoyi, Lekki, Eko Atlantic, and Ikeja GRA.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Hotspot Location Selector Pills */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold font-serif uppercase tracking-[0.2em] text-[#D4AF37] flex items-center gap-2">
              <Compass className="w-4 h-4" /> Select Lagos Real Estate Zone
            </h2>
            <span className="text-xs text-slate-500 font-serif hidden sm:inline">Click any zone to update Google Map view</span>
          </div>

          <div className="flex overflow-x-auto pb-2 gap-2.5 sm:grid sm:grid-cols-3 lg:grid-cols-5 scrollbar-none -mx-1 px-1">
            {LAGOS_AREAS.map((area) => (
              <button
                key={area.id}
                onClick={() => setSelectedArea(area)}
                className={`p-3 text-left rounded-sm border transition-all shrink-0 w-[180px] sm:w-auto min-h-[52px] ${
                  selectedArea.id === area.id
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-lg font-bold'
                    : isDarkMode
                      ? 'bg-[#1A1A1C] border-[#2A2A2C] text-slate-300 hover:border-[#D4AF37]/50'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-[#D4AF37]'
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider block opacity-75 font-serif">{area.category}</span>
                <span className="text-xs font-bold block truncate mt-0.5">{area.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Embedded Map + Area Info Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Interactive Google Map Embed Container (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-sm overflow-hidden border border-[#2A2A2C] bg-[#101012] shadow-2xl">
              <iframe
                title={`Google Map - ${selectedArea.name}`}
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter contrast-[105%] grayscale-[10%]"
              />
              
              {/* Map Overlay Badge */}
              <div className="absolute top-4 left-4 bg-[#0A0A0B]/90 backdrop-blur-md border border-[#2A2A2C] px-3.5 py-2 rounded-sm text-xs font-bold text-white shadow-lg flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Showing: {selectedArea.name}</span>
              </div>
            </div>

            {/* Google Map Action Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-sm bg-[#1A1A1C] border border-[#2A2A2C] text-xs">
              <div className="flex items-center gap-2 text-slate-300 font-serif">
                <Navigation className="w-4 h-4 text-[#D4AF37]" />
                <span>Coordinate Target: <strong className="text-white">{selectedArea.mapQuery}</strong></span>
              </div>

              <a
                href={externalMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold uppercase tracking-wider px-4 py-2.5 rounded-sm transition shadow"
              >
                Open in Google Maps App <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Selected Area Insights Card (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-sm bg-[#1A1A1C] border border-[#2A2A2C] space-y-5 shadow-xl">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#D4AF37] block">{selectedArea.category}</span>
                <h3 className="text-xl font-bold font-serif text-white mt-1">{selectedArea.name}</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-serif">
                {selectedArea.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-[#2A2A2C]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Zone Highlights:</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedArea.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#2A2A2C] text-xs">
                <div className="p-2.5 rounded-sm bg-[#0A0A0B] border border-[#2A2A2C]">
                  <span className="text-[10px] text-slate-500 uppercase block font-serif">Avg Price / SQM</span>
                  <span className="font-bold text-[#D4AF37] text-xs block mt-0.5">{selectedArea.avgPriceSqMeter}</span>
                </div>
                <div className="p-2.5 rounded-sm bg-[#0A0A0B] border border-[#2A2A2C]">
                  <span className="text-[10px] text-slate-500 uppercase block font-serif">Est. Annual Yield</span>
                  <span className="font-bold text-emerald-400 text-xs block mt-0.5">{selectedArea.rentalYield}</span>
                </div>
              </div>

              <button
                onClick={() => onOpenInspection(selectedArea.name)}
                className="w-full bg-[#D4AF37] hover:bg-[#E5C158] text-black font-bold uppercase tracking-wider text-xs py-3 rounded-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" /> Book Inspection in {selectedArea.name.split(',')[0]}
              </button>
            </div>

            {/* Office Contact Desk Summary */}
            <div className="p-5 rounded-sm bg-[#101012] border border-[#2A2A2C] space-y-3 text-xs">
              <h4 className="font-bold font-serif uppercase tracking-wider text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#D4AF37]" /> Company Headquarters
              </h4>
              <p className="text-slate-300 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </p>
              <p className="text-slate-300 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>{COMPANY_INFO.phone}</span>
              </p>
              <p className="text-slate-300 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-white hover:text-[#D4AF37] transition">
                  {COMPANY_INFO.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Lagos Distance & Transit Overview */}
        <div className="p-8 rounded-sm bg-[#1A1A1C] border border-[#2A2A2C] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold font-serif text-white">Lagos Key Transport & Access Corridors</h3>
              <p className="text-xs text-slate-400 mt-1">Average travel times from Victoria Island / Ikoyi central business district</p>
            </div>
            <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Vetted Prime Locations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-sm bg-[#0A0A0B] border border-[#2A2A2C] space-y-2">
              <div className="flex items-center gap-2 text-[#D4AF37] font-bold uppercase tracking-wider">
                <Plane className="w-4 h-4" /> Murtala Muhammed Intl Airport
              </div>
              <p className="text-slate-300">~ 35-50 mins via Ikoyi - Maryland expressway link.</p>
            </div>

            <div className="p-4 rounded-sm bg-[#0A0A0B] border border-[#2A2A2C] space-y-2">
              <div className="flex items-center gap-2 text-[#D4AF37] font-bold uppercase tracking-wider">
                <Building2 className="w-4 h-4" /> Eko Atlantic Financial Centre
              </div>
              <p className="text-slate-300">~ 5-10 mins direct access from Ahmadu Bello Way, VI.</p>
            </div>

            <div className="p-4 rounded-sm bg-[#0A0A0B] border border-[#2A2A2C] space-y-2">
              <div className="flex items-center gap-2 text-[#D4AF37] font-bold uppercase tracking-wider">
                <Car className="w-4 h-4" /> Lekki-Epe Coastal Expressway
              </div>
              <p className="text-slate-300">Direct gateway to Lekki Phase 1, Chevron, and Dangote Free Trade Zone.</p>
            </div>
          </div>
        </div>

      </section>

      {/* Page Footer Note */}
      <footer className="border-t border-[#2A2A2C] py-8 text-center text-xs text-slate-500 font-serif">
        <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. Headquarters: {COMPANY_INFO.address}.</p>
      </footer>
    </div>
  );
};
