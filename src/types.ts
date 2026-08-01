export interface Property {
  id: string;
  title: string;
  price: number;
  formattedPrice: string;
  location: string;
  address: string;
  type: 'Villa' | 'Penthouse' | 'Mansion' | 'Apartment' | 'Land';
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  parkingSpaces: number;
  featured: boolean;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  status: 'For Sale' | 'For Lease' | 'Pending';
  yearBuilt?: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  propertyPurchased: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Exterior' | 'Interior' | 'Pools' | 'Penthouses';
  imageUrl: string;
  location: string;
}

export interface InspectionBooking {
  propertyId?: string;
  propertyName?: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  tourType: 'In-Person' | 'Virtual Video Tour';
  notes?: string;
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  propertyInterestedIn: string;
  message: string;
  recaptchaVerified: boolean;
}
