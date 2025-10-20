import React from 'react';
import Header from './components/layout/Header';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import ExpertServicesSection from './components/sections/ExpertServicesSection';
import PropertiesSection from './components/sections/PropertiesSection';
import AgentsSection from './components/sections/AgentsSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import FAQSection from './components/sections/FAQSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <ExpertServicesSection />
        <PropertiesSection />
        <AgentsSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
