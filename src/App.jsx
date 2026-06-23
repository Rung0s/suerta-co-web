import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import Lenis from '@studio-freight/lenis';

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
import NotFound from './components/NotFound';
import LiquidGlassBlob from './components/LiquidGlassBlob';
import SignatureScene from './components/SignatureScene';
import TeamSection from './components/TeamSection';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <HeroSection />
            <SignatureScene />
            <ServicesSection />
            <ReferencesSection />
            <TestimonialsSection />
            <FAQSection />
          </PageTransition>
        } />
        <Route path="/about" element={<PageTransition><AboutSection /></PageTransition>} />
        <Route path="/team" element={<PageTransition><TeamSection /></PageTransition>} />
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

  useEffect(() => {
    // Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="app" style={{ position: 'relative' }}>
        {/* 3D Arka Plan Sahnesi - Tıklamaları Engellemez */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <LiquidGlassBlob />
          </Canvas>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <AnimatePresence mode="wait">
            {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
          </AnimatePresence>
          <CustomCursor />
          {!isLoading && (
            <>
              <Navbar />
              <main style={{ flex: 1 }}>
                <AnimatedRoutes />
              </main>
              <Footer />
              <WhatsAppButton />
            </>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
