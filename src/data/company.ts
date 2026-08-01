import { Service, Testimonial, GalleryItem } from '../types';

export const COMPANY_INFO = {
  name: "Femrose Properties and Investments",
  tagline: "Elevating Luxury Living, Securing Premier Investments",
  slogan: "Where Luxury Architecture Meets High-Yield Real Estate Investment",
  logoUrl: "https://i.imgur.com/Gj4vW38.png",
  logoFallback: "/images/logo.png",
  phone: "08131616366",
  phoneRaw: "+2348131616366",
  whatsapp: "08131616366",
  whatsappRaw: "2348131616366",
  email: "rocktaydgreat@gmail.com",
  address: "Victoria Island, Lagos State, Nigeria",
  officeHours: "Mon - Sat: 8:00 AM - 7:00 PM | Sun: By Appointment",
  socials: {
    instagram: "https://instagram.com/femroseproperties",
    linkedin: "https://linkedin.com/company/femroseproperties",
    facebook: "https://facebook.com/femroseproperties",
    twitter: "https://twitter.com/femroseprop",
    youtube: "https://youtube.com/@femroseproperties"
  },
  stats: [
    { label: "Happy Clients", value: "1,250+", num: 1250, suffix: "+" },
    { label: "Properties Sold", value: "$450M+", num: 450, prefix: "$", suffix: "M+" },
    { label: "Years Experience", value: "15+", num: 15, suffix: "+" },
    { label: "Projects Completed", value: "320+", num: 320, suffix: "+" }
  ]
};

export const SERVICES: Service[] = [
  {
    id: "prop-sales",
    title: "Luxury Property Sales",
    description: "Exclusive representation for high-net-worth sellers and discerning buyers seeking premium residential estates and architectural masterpieces.",
    iconName: "Home",
    highlights: ["Exclusive off-market listings", "Global buyer syndicate network", "Professional architectural photography"]
  },
  {
    id: "land-sales",
    title: "Prime Land Acquisition",
    description: "Strategic sourcing of high-value residential and commercial plots in rapidly appreciating prime urban and coastal corridors.",
    iconName: "MapPin",
    highlights: ["Topographical & zoning audit", "Clean title deed verification", "Feasibility & yield analysis"]
  },
  {
    id: "prop-mgmt",
    title: "Property Management",
    description: "End-to-end management for luxury residences, handling tenant vetting, concierge care, asset maintenance, and financial reporting.",
    iconName: "Building2",
    highlights: ["24/7 Concierge & maintenance", "Automated rental yield collection", "Quarterly asset condition audits"]
  },
  {
    id: "re-investment",
    title: "Real Estate Investment",
    description: "Tailored portfolio structuring for high ROI, fractional property funds, and joint-venture commercial real estate developments.",
    iconName: "TrendingUp",
    highlights: ["Targeted 14-22% annual ROI", "Risk-mitigated diversification", "Tax-efficient structuring"]
  },
  {
    id: "house-leasing",
    title: "Luxury House Leasing",
    description: "Bespoke long-term and executive rental placements for luxury villas, penthouses, and furnished diplomatic residences.",
    iconName: "KeyRound",
    highlights: ["Vetted high-profile tenants", "Turnkey luxury furnishings", "Flexible corporate leases"]
  },
  {
    id: "prop-doc",
    title: "Property Documentation",
    description: "Comprehensive legal assistance covering title search, Certificate of Occupancy (C of O), survey plan registration, and escrow safety.",
    iconName: "FileCheck",
    highlights: ["Government land registry filing", "C of O & Deed of Assignment clearance", "Zero-friction legal verification"]
  },
  {
    id: "estate-dev",
    title: "Estate Development",
    description: "Master-planned gated communities designed with green architecture, smart home infrastructure, and resort-grade amenities.",
    iconName: "HardHat",
    highlights: ["Sustainable eco-smart designs", "Underground utility infrastructure", "High-security perimeter systems"]
  },
  {
    id: "consultancy",
    title: "Real Estate Consultancy",
    description: "Data-backed advisory services for institutional investors, family offices, and developers seeking market intelligence.",
    iconName: "UserCheck",
    highlights: ["Custom market valuation reports", "Comparative pricing algorithms", "Investment exit strategy planning"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Victoria Sterling",
    role: "Tech Executive & Investor",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    comment: "Femrose Properties made purchasing our waterfront villa seamlessly fluid. Their transparency, off-market access, and title documentation speed were second to none.",
    propertyPurchased: "Bel-Air Horizon Modern Villa"
  },
  {
    id: "t2",
    name: "Marcus Vance",
    role: "Portfolio Manager",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    comment: "The ROI recommendations provided by the Femrose investment team yielded a 19.4% return on our multi-family parcel within 14 months. Highly trusted partners.",
    propertyPurchased: "Fifth Avenue Sky Penthouse"
  },
  {
    id: "t3",
    name: "Elena Rostova",
    role: "Architectural Designer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    rating: 5,
    comment: "From the initial virtual inspection to key handover, their professionalism and attention to luxury detailing set the standard for modern real estate.",
    propertyPurchased: "Malibu Coastal Cliff Estate"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Modernist Oceanfront Estate",
    category: "Exterior",
    imageUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    location: "Malibu, California"
  },
  {
    id: "g2",
    title: "Grand Marble Living Pavilion",
    category: "Interior",
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    location: "Beverly Hills, CA"
  },
  {
    id: "g3",
    title: "Infinity Pool Overlooking Sunset Boulevard",
    category: "Pools",
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    location: "Los Angeles, CA"
  },
  {
    id: "g4",
    title: "Duplex Penthouse Roof Terrace",
    category: "Penthouses",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    location: "Manhattan, NY"
  },
  {
    id: "g5",
    title: "Minimalist Master Suite Sanctuary",
    category: "Interior",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    location: "Miami Beach, FL"
  },
  {
    id: "g6",
    title: "Resort-Style Saltwater Pool & Cabana",
    category: "Pools",
    imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
    location: "Scottsdale, AZ"
  }
];
