import Header from './components/layout/Header';
import HeroSection from './components/sections/HeroSection';
import PathsSection from './components/sections/PathsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ReelsSection from './components/sections/ReelsSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import TeamSection from './components/sections/TeamSection';
import FAQSection from './components/sections/FAQSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
import { WhatsAppFloating } from './components/ui/WhatsAppCTA';

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <PathsSection />
        <ProjectsSection />
        <ReelsSection />
        <TestimonialsSection />
        <TeamSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloating />
    </div>
  );
}
