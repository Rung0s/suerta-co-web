import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import ReferencesSection from './components/ReferencesSection';
import ContactSection from './components/ContactSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/PageTransition';
import Marquee from './components/Marquee';
import NotFound from './components/NotFound';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <HeroSection />
            <Marquee />
            <ServicesSection />
            <ReferencesSection />
            <TestimonialsSection />
            <FAQSection />
          </PageTransition>
        } />
        <Route path="/about" element={<PageTransition><AboutSection /></PageTransition>} />
        <Route path="/services" element={<PageTransition><ServicesSection /></PageTransition>} />
        <Route path="/references" element={<PageTransition><ReferencesSection /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactSection /></PageTransition>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <CustomCursor />
      {isLoading ? (
        <Preloader onComplete={() => setIsLoading(false)} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <AnimatedRoutes />
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      )}
    </Router>
  );
}

export default App;
