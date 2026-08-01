import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { FeaturedProperties } from './components/FeaturedProperties';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { InspectionModal } from './components/InspectionModal';
import { CallDeskModal } from './components/CallDeskModal';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GallerySection } from './components/GallerySection';
import { MortgageCalculator } from './components/MortgageCalculator';
import { ContactSection } from './components/ContactSection';
import { FloatingActions } from './components/FloatingActions';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModal';
import { LocationMapPage } from './components/LocationMapPage';
import { FEATURED_PROPERTIES } from './data/properties';
import { Property } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'map'>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('femrose_theme') || localStorage.getItem('auracrest_theme');
    return saved ? saved === 'dark' : true; // Default dark theme for luxury real estate
  });

  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  
  const [inspectionModalOpen, setInspectionModalOpen] = useState<boolean>(false);
  const [inspectionPropertyTitle, setInspectionPropertyTitle] = useState<string>('');

  const [callDeskModalOpen, setCallDeskModalOpen] = useState<boolean>(false);

  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const [searchFilter, setSearchFilter] = useState<{
    location: string;
    type: string;
    price: string;
  }>({
    location: '',
    type: '',
    price: ''
  });

  useEffect(() => {
    localStorage.setItem('femrose_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Section Observer for navbar active highlighting
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'properties', 'gallery', 'calculator', 'testimonials', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenInspection = (propertyTitle?: string) => {
    setInspectionPropertyTitle(propertyTitle || '');
    setInspectionModalOpen(true);
  };

  const handleSearchSubmit = (filter: { location: string; type: string; price: string }) => {
    setSearchFilter(filter);
  };

  const handleResetSearchFilter = () => {
    setSearchFilter({ location: '', type: '', price: '' });
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-amber-500 selection:text-slate-950 transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
    }`}>
      {/* Sticky Navigation */}
      <Navbar
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenInspection={handleOpenInspection}
        onOpenCallDesk={() => setCallDeskModalOpen(true)}
        activeSection={activeSection}
        currentPage={currentPage}
        onOpenMapPage={() => setCurrentPage('map')}
        onNavigateHome={() => setCurrentPage('home')}
      />

      {currentPage === 'map' ? (
        /* Dedicated Google Map Page for Lagos, Nigeria */
        <LocationMapPage
          isDarkMode={isDarkMode}
          onBackToHome={() => setCurrentPage('home')}
          onOpenInspection={handleOpenInspection}
        />
      ) : (
        /* Main Home Multi-Section Landing Page */
        <>
          {/* Hero Section */}
          <Hero
            onOpenInspection={handleOpenInspection}
            onSearchSubmit={handleSearchSubmit}
            isDarkMode={isDarkMode}
            onOpenCallDesk={() => setCallDeskModalOpen(true)}
          />

          {/* Featured Properties Grid & Filters */}
          <FeaturedProperties
            properties={FEATURED_PROPERTIES}
            isDarkMode={isDarkMode}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            onOpenInspection={handleOpenInspection}
            searchFilter={searchFilter}
            onResetSearchFilter={handleResetSearchFilter}
          />

          {/* About Us */}
          <AboutSection isDarkMode={isDarkMode} />

          {/* Our Services */}
          <ServicesSection
            isDarkMode={isDarkMode}
            onOpenInspection={handleOpenInspection}
          />

          {/* Why Choose Us & Stat Counters */}
          <WhyChooseUs isDarkMode={isDarkMode} />

          {/* Photo Gallery & Lightbox */}
          <GallerySection isDarkMode={isDarkMode} />

          {/* Mortgage & Financial Calculator */}
          <MortgageCalculator
            isDarkMode={isDarkMode}
            onOpenInspection={handleOpenInspection}
          />

          {/* Testimonials Slider */}
          <TestimonialsSection isDarkMode={isDarkMode} />

          {/* Contact Section & Form */}
          <ContactSection
            isDarkMode={isDarkMode}
            onOpenMapPage={() => setCurrentPage('map')}
            onOpenCallDesk={() => setCallDeskModalOpen(true)}
          />
        </>
      )}

      {/* Floating Action Buttons */}
      <FloatingActions onOpenCallDesk={() => setCallDeskModalOpen(true)} />

      {/* Footer */}
      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenInspection={handleOpenInspection}
        onOpenMapPage={() => setCurrentPage('map')}
        onOpenCallDesk={() => setCallDeskModalOpen(true)}
      />

      {/* Property Details Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onOpenInspection={handleOpenInspection}
        isDarkMode={isDarkMode}
      />

      {/* Inspection Scheduler Modal */}
      <InspectionModal
        isOpen={inspectionModalOpen}
        onClose={() => setInspectionModalOpen(false)}
        initialPropertyTitle={inspectionPropertyTitle}
        isDarkMode={isDarkMode}
      />

      {/* Executive Call Desk Modal */}
      <CallDeskModal
        isOpen={callDeskModalOpen}
        onClose={() => setCallDeskModalOpen(false)}
        isDarkMode={isDarkMode}
      />

      {/* Privacy / Terms Modal */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
