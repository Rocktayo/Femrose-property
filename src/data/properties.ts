import { Property } from '../types';

export const FEATURED_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    title: "The Glass Horizon Ocean Villa",
    price: 4850000,
    formattedPrice: "$4,850,000",
    location: "Malibu Coastal Road, CA",
    address: "28400 Pacific Coast Highway, Malibu, CA 90265",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 6200,
    parkingSpaces: 4,
    featured: true,
    status: "For Sale",
    yearBuilt: 2024,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "An architectural masterpiece perched directly above the Pacific Ocean. Features floor-to-ceiling motorized glass walls, zero-edge heated infinity pool, private subterranean wine cellar, and smart climate controls.",
    features: ["Panoramic Ocean View", "Heated Infinity Pool", "Smart Home Automation", "Subterranean Wine Cellar", "Private Beach Access", "Solar Energy System"]
  },
  {
    id: "prop-2",
    title: "Crown Heights Sky Penthouse",
    price: 3200000,
    formattedPrice: "$3,200,000",
    location: "Fifth Avenue, Manhattan, NY",
    address: "750 5th Avenue, Penthouse B, New York, NY 10019",
    type: "Penthouse",
    bedrooms: 4,
    bathrooms: 4,
    areaSqFt: 4100,
    parkingSpaces: 2,
    featured: true,
    status: "For Sale",
    yearBuilt: 2023,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Breathtaking multi-level penthouse offering 360-degree views of Central Park and Manhattan skyline. Designed with Italian Calacatta marble, custom Poliform cabinetry, and a private wraparound outdoor terrace with fire pit.",
    features: ["Central Park View", "Private Terrace & Outdoor Firepit", "Direct Elevator Access", "Concierge Service", "Poliform Kitchen", "Spa Bathroom"]
  },
  {
    id: "prop-3",
    title: "Bel-Air Botanical Modern Estate",
    price: 7900000,
    formattedPrice: "$7,900,000",
    location: "Bel-Air Crest, Los Angeles, CA",
    address: "10500 Bellagio Road, Los Angeles, CA 90077",
    type: "Mansion",
    bedrooms: 6,
    bathrooms: 8,
    areaSqFt: 9400,
    parkingSpaces: 6,
    featured: true,
    status: "For Sale",
    yearBuilt: 2025,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A private 2-acre sanctuary surrounded by lush botanical gardens and mature olive trees. Boasts a 12-seat Dolby Atmos screening room, wellness spa with sauna, tennis court, and guest house.",
    features: ["2-Acre Private Grounds", "Dolby Cinema Room", "Wellness Spa & Sauna", "Championship Tennis Court", "Detached Guest House", "Biometric Security Gate"]
  },
  {
    id: "prop-4",
    title: "The Aspen Ridge Timber Luxury Chalet",
    price: 5400000,
    formattedPrice: "$5,400,000",
    location: "Red Mountain, Aspen, CO",
    address: "410 Red Mountain Road, Aspen, CO 81611",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 5,
    areaSqFt: 5800,
    parkingSpaces: 3,
    featured: false,
    status: "For Sale",
    yearBuilt: 2022,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Ski-in/ski-out timber chalet featuring dramatic double-height stone fireplaces, heated driveway, outdoor cedar hot tub, and panoramic views of the Aspen snow peaks.",
    features: ["Ski-In / Ski-Out Access", "Heated Driveway", "Cedar Hot Tub", "Double-Height Fireplace", "Ski Equipment Locker", "Custom Oak Bar"]
  },
  {
    id: "prop-5",
    title: "Biscayne Bay Prime Waterfront Plot",
    price: 2100000,
    formattedPrice: "$2,100,000",
    location: "Star Island Drive, Miami, FL",
    address: "42 Star Island Drive, Miami Beach, FL 33139",
    type: "Land",
    bedrooms: 0,
    bathrooms: 0,
    areaSqFt: 18500,
    parkingSpaces: 0,
    featured: false,
    status: "For Sale",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Rare 0.42-acre cleared oceanfront development plot with 120 feet of deep-water dockage. Fully approved architectural plans for a 9,000 sq ft modern estate included.",
    features: ["Direct Deep-Water Dockage", "Approved Build Plans Included", "Seawall Installed", "Clean Title Clearance", "Private Gated Island Security"]
  },
  {
    id: "prop-6",
    title: "The Metropolitan Luxury Residence",
    price: 1850000,
    formattedPrice: "$1,850,000",
    location: "Brickell Ave, Miami, FL",
    address: "1421 Brickell Avenue, Unit 3804, Miami, FL 33131",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 2600,
    parkingSpaces: 2,
    featured: true,
    status: "For Lease",
    yearBuilt: 2024,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Sleek corner luxury apartment in Brickell's newest glass tower. Features floor-to-ceiling impact windows, Gaggenau kitchen appliances, and access to rooftop infinity pool and valet.",
    features: ["Rooftop Sky Pool", "24-Hour Valet Parking", "Gaggenau Appliances", "Fitness & Yoga Center", "Pet Spa", "Private Storage"]
  }
];
