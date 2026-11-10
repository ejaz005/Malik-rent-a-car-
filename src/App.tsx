import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FleetSection } from './components/FleetSection';
import { CarDetailModal } from './components/CarDetailModal';
import { TourPackages } from './components/TourPackages';
import { DestinationsGuide } from './components/DestinationsGuide';
import { PriceCalculator } from './components/PriceCalculator';
import { TravelTips } from './components/TravelTips';
import { AboutUs } from './components/AboutUs';
import { BookingInquirySection } from './components/BookingInquirySection';
import { Gallery } from './components/Gallery';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileStickyActions } from './components/MobileStickyActions';
import { FloatingLanguageSwitcher } from './components/FloatingLanguageSwitcher';
import { BookingModal } from './components/BookingModal';
import { ImageAnalyzerModal } from './components/ImageAnalyzerModal';
import { DeploymentGuideModal } from './components/DeploymentGuideModal';
import { Vehicle, FLEET_DATA } from './data/config';

function MainApp() {
  const { isRtl } = useLanguage();
  const [currency, setCurrency] = useState<'PKR' | 'USD'>('PKR');

  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedVehicleForBooking, setSelectedVehicleForBooking] = useState<string | undefined>(undefined);
  const [detailVehicle, setDetailVehicle] = useState<Vehicle | null>(null);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState(false);
  const [isDeploymentGuideOpen, setIsDeploymentGuideOpen] = useState(false);

  const toggleCurrency = () => {
    setCurrency(currency === 'PKR' ? 'USD' : 'PKR');
  };

  const handleOpenBooking = (vehicleId?: string) => {
    setSelectedVehicleForBooking(vehicleId || FLEET_DATA[0]?.id);
    setIsBookingOpen(true);
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans ${isRtl ? 'rtl' : 'ltr'}`}>
      
      {/* Navigation */}
      <Navbar
        onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
        onOpenBooking={(vId) => handleOpenBooking(vId)}
        currency={currency}
        onToggleCurrency={toggleCurrency}
      />

      {/* Main Sections */}
      <main className="flex-1 pb-16 sm:pb-0">
        {/* 1. Hero with Quick Booking Bar */}
        <Hero
          onOpenBooking={(vId) => handleOpenBooking(vId)}
          onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
        />

        {/* 2. Why Choose Us */}
        <WhyChooseUs />

        {/* 3. Our Fleet (Filterable grid with Prado, Hilux, Van, Sedan, Jeep) */}
        <FleetSection
          onBookVehicle={(vId) => handleOpenBooking(vId)}
          onSelectVehicleDetail={(vehicle) => setDetailVehicle(vehicle)}
          currency={currency}
        />

        {/* 4. Interactive Price Estimator Calculator */}
        <PriceCalculator
          onBookEstimated={(vId) => handleOpenBooking(vId)}
          currency={currency}
        />

        {/* 5. Tour Packages (Hunza, Skardu, Deosai, Fairy Meadows, Naltar, etc.) */}
        <TourPackages
          onInquirePackage={(tourTitle) => handleOpenBooking()}
          currency={currency}
        />

        {/* 6. Destinations Guide with road conditions & altitude */}
        <DestinationsGuide
          onBookForDestination={() => handleOpenBooking()}
        />

        {/* 7. Travel Tips & NOC Information for Foreigners */}
        <TravelTips />

        {/* 8. About Us & Company Legacy since 2020 */}
        <AboutUs />

        {/* 9. Booking & Inquiry Form */}
        <BookingInquirySection />

        {/* 10. Photo Gallery with Lightbox */}
        <Gallery />

        {/* 11. Customer Reviews & Google Ratings */}
        <ReviewsSection />

        {/* 12. SEO Blog Guides */}
        <BlogSection />

        {/* 13. Frequently Asked Questions */}
        <FaqSection />

        {/* 14. Contact & Map with 24/7 Hours and Payment Badges */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenDeploymentGuide={() => setIsDeploymentGuideOpen(true)}
        onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
      />

      {/* Mobile Sticky Quick Actions (Call / WhatsApp / Book Now) */}
      <MobileStickyActions
        onOpenBooking={() => handleOpenBooking()}
        onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
      />

      {/* Persistent Floating Language Switcher (English / Urdu RTL) */}
      <FloatingLanguageSwitcher />

      {/* Reusable Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedVehicleId={selectedVehicleForBooking}
        currency={currency}
      />

      {/* Vehicle Details Modal */}
      <CarDetailModal
        vehicle={detailVehicle}
        onClose={() => setDetailVehicle(null)}
        onBookNow={(vId) => {
          setDetailVehicle(null);
          handleOpenBooking(vId);
        }}
        currency={currency}
      />

      {/* Gemini 4 Argon AI Route & Car Advisor Modal */}
      <ImageAnalyzerModal
        isOpen={isAiAdvisorOpen}
        onClose={() => setIsAiAdvisorOpen(false)}
        onBookRecommendedCar={() => {
          setIsAiAdvisorOpen(false);
          handleOpenBooking();
        }}
      />

      {/* Domain Hosting and Content Customization Guide Modal */}
      <DeploymentGuideModal
        isOpen={isDeploymentGuideOpen}
        onClose={() => setIsDeploymentGuideOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
