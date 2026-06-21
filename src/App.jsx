import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import ReferencesSection from './components/ReferencesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';

function App() {
  const [loading, setLoading] = React.useState(true);

  return (
    <>
      <CustomCursor />
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease-in' }}>
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <ReferencesSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
