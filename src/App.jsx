import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import Lenis from '@studio-freight/lenis';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import ReferencesSection from './components/ReferencesSection';
import ReferencesPage from './components/ReferencesPage';
import ContactSection from './components/ContactSection';
import TestimonialsSection from './components/TestimonialsSection';
import StatsSection from './components/StatsSection';
import FAQSection from './components/FAQSection';
import BlogSection from './components/BlogSection';
import BlogPage from './components/BlogPage';
import BlogDetail from './components/BlogDetail';
import ProjectDetail from './components/ProjectDetail';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/PageTransition';
import NotFound from './components/NotFound';
import LiquidGlassBlob from './components/LiquidGlassBlob';
import SignatureScene from './components/SignatureScene';
import TeamSection from './components/TeamSection';
import Seo, { SITE_URL, breadcrumbSchema } from './components/Seo';
import useIsMobile from './hooks/useIsMobile';

// Ana sayfa için WebSite şeması (arama motorları / AI için site kimliği)
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'suerta co.',
  url: SITE_URL,
  inLanguage: 'tr-TR',
};

// Lenis smooth-scroll örneğini, sayfa geçişlerinde scroll'u sıfırlayabilmek
// için modül seviyesinde paylaşıyoruz.
let lenisInstance = null;

function AnimatedRoutes() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollPositions = useRef({});
  const currentKeyRef = useRef(location.key);

  // Tarayıcının kendi scroll geri yükleme davranışını kapat; biz yöneteceğiz
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Kullanıcı kaydırdıkça mevcut sayfanın scroll konumunu sürekli kaydet
  useEffect(() => {
    const handleScroll = () => {
      scrollPositions.current[currentKeyRef.current] = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Geri/ileri (POP) navigasyonunda kaldığı yere dön; yeni bir sayfaya
  // geçişte (PUSH) en tepeden başla
  useEffect(() => {
    currentKeyRef.current = location.key;
    const saved = scrollPositions.current[location.key];

    // Lenis aktifken salt window.scrollTo yetmez: Lenis kendi hedef scroll
    // değerini bir sonraki karede geri yazar. Kısa bir sayfaya geçildiğinde
    // eski (büyük) değer alt sınıra kırpılır ve sayfa footer'da açılır.
    // Bu yüzden Lenis'i de birlikte sıfırlıyoruz.
    const scrollTo = (top) => {
      if (lenisInstance) {
        try { lenisInstance.resize(); } catch { /* yoksay */ }
        try { lenisInstance.scrollTo(top, { immediate: true, force: true }); } catch { /* yoksay */ }
      }
      window.scrollTo({ top, left: 0, behavior: 'instant' });
    };

    const target = (navigationType === 'POP' && saved) ? saved : 0;

    // Ağır bileşenler (3D, görseller) yüklenirken sayfa yüksekliği anlık
    // olarak yetersiz olabilir; hedefe ulaşana kadar birkaç kez dene.
    const timers = [];
    let attempts = 0;
    const apply = () => {
      scrollTo(target);
      attempts += 1;
      if (Math.abs(window.scrollY - target) > 2 && attempts < 12) {
        timers.push(setTimeout(apply, 60));
      }
    };
    apply();
    return () => timers.forEach(clearTimeout);
  }, [location.pathname, location.key, navigationType]);

  return (
    <Routes>
        <Route path="/" element={
          <PageTransition>
            <Seo path="/" jsonLd={websiteSchema} />
            <HeroSection />
            <SignatureScene />
            <ServicesSection />
            <StatsSection />
            <ReferencesSection />
            <TestimonialsSection />
            <BlogSection limit={3} />
            <FAQSection />
          </PageTransition>
        } />
        <Route path="/hakkimizda" element={<PageTransition>
          <Seo path="/hakkimizda" title="Hakkımızda & Vizyon"
            description="suerta co. — dijital lüks anlayışıyla markalara web tasarım, e-ticaret, operasyonel yazılım ve yapay zeka çözümleri üreten Eskişehir merkezli dijital ajans. Vizyonumuz ve çalışma prensiplerimiz."
            jsonLd={breadcrumbSchema([{ name: 'Ana Sayfa', path: '/' }, { name: 'Hakkımızda', path: '/hakkimizda' }])} />
          <AboutSection /></PageTransition>} />
        <Route path="/ekibimiz" element={<PageTransition>
          <Seo path="/ekibimiz" title="Uzman Ekibimiz"
            description="suerta co.'nun tasarım, yazılım ve dijital pazarlama uzmanlarından oluşan ekibiyle tanışın. Markanızın dijital dönüşümünü birlikte yürütüyoruz."
            jsonLd={breadcrumbSchema([{ name: 'Ana Sayfa', path: '/' }, { name: 'Ekibimiz', path: '/ekibimiz' }])} />
          <TeamSection /></PageTransition>} />
        <Route path="/hizmetlerimiz" element={<PageTransition>
          <Seo path="/hizmetlerimiz" title="Hizmetlerimiz & Çözümler"
            description="Web tasarım & arayüz, e-ticaret & dönüşüm, operasyonel sistemler (QR menü, rezervasyon, CRM) ve yapay zeka otomasyonları. suerta co. ile markanıza özel dijital çözümler."
            jsonLd={breadcrumbSchema([{ name: 'Ana Sayfa', path: '/' }, { name: 'Hizmetlerimiz', path: '/hizmetlerimiz' }])} />
          <ServicesSection /></PageTransition>} />
        <Route path="/referanslar" element={<PageTransition>
          <Seo path="/referanslar" title="Referanslar & Projeler"
            description="Emsa Otel, Rönesans Edu, Pawsec ve Argüman Fabrikası — suerta co.'nun hayata geçirdiği web tasarım, e-ticaret ve özel yazılım projeleri."
            jsonLd={breadcrumbSchema([{ name: 'Ana Sayfa', path: '/' }, { name: 'Referanslar', path: '/referanslar' }])} />
          <ReferencesPage /></PageTransition>} />
        <Route path="/referanslar/:id" element={<PageTransition><ProjectDetail /></PageTransition>} />
        <Route path="/blog" element={<PageTransition>
          <Seo path="/blog" title="Blog & İçerikler"
            description="Web sitesi maliyeti, e-ticaret platformları, SEO, yapay zeka görünürlüğü ve dijital pazarlama üzerine suerta co. rehber içerikleri."
            jsonLd={breadcrumbSchema([{ name: 'Ana Sayfa', path: '/' }, { name: 'Blog', path: '/blog' }])} />
          <BlogPage /></PageTransition>} />
        <Route path="/blog/:id" element={<PageTransition><BlogDetail /></PageTransition>} />
        <Route path="/iletisim" element={<PageTransition>
          <Seo path="/iletisim" title="İletişim & Bize Ulaşın"
            description="Projenizi başlatmak için suerta co. ile iletişime geçin. Teknik proje yapılandırıcı, e-posta (suerta.info@gmail.com) veya WhatsApp üzerinden hızlı dönüş."
            jsonLd={breadcrumbSchema([{ name: 'Ana Sayfa', path: '/' }, { name: 'İletişim', path: '/iletisim' }])} />
          <ContactSection /></PageTransition>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showCanvas, setShowCanvas] = useState(true);
  const isMobile = useIsMobile(768);

  useEffect(() => {
    const handleScroll = () => {
      // Sadece sayfanın en üstünde (Hero Section'da) Canvas'ı göster,
      // aşağı kaydırınca gizleyerek GPU'yu rahatlat.
      const shouldShow = window.scrollY <= window.innerHeight * 1.5;
      setShowCanvas(prev => (prev === shouldShow ? prev : shouldShow));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

    lenisInstance = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return (
    <Router>
      <div className="app" style={{ position: 'relative' }}>
        {/* Lüks Sinematik Film Dokusu (Grain Overlay) */}
        <div className="noise-overlay" />
        
        {/* Atmosferik Arka Plan Işık Huzmeleri (Mesh Glows) */}
        <div className="ambient-glow ambient-glow-gold" />
        <div className="ambient-glow ambient-glow-crimson" />

        {/* 3D Arka Plan Sahnesi - Performans için scroll ile duraklatılır */}
        <div
          className="bg-3d-canvas-container"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: showCanvas ? 1 : 0,
            visibility: showCanvas ? 'visible' : 'hidden',
            transition: 'opacity 1s ease, visibility 1s ease'
          }}
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} frameloop={showCanvas ? 'always' : 'never'}>
            <LiquidGlassBlob />
          </Canvas>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <AnimatePresence mode="wait">
            {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
          </AnimatePresence>
          {!isMobile && <CustomCursor />}
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
