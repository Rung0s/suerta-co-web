import React, { useEffect, useState } from 'react';
import { Zap, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import StaggeredText from './StaggeredText';
import useIsMobile from '../hooks/useIsMobile';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile(768);

  useEffect(() => {
    // Mobil cihazlarda (dokunmatik ekranlarda) tıklamaların yazıyı kaydırmasını engellemek için parallax'ı devre dışı bırak
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  const styles = {
    section: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: isMobile ? '3vh' : '20vh', // Mobilde "çooook daha yukarı" olması için 12vh'den 3vh'ye düşürüldü
      paddingLeft: '2rem',
      paddingRight: '2rem',
      position: 'relative',
      overflow: 'hidden',
      perspective: '1000px'
    },
    blob1: {
      position: 'absolute',
      width: '800px',
      height: '800px',
      background: 'radial-gradient(circle, rgba(154, 22, 31, 0.3) 0%, rgba(26, 26, 29, 0) 70%)',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: -2,
      animation: 'blobSpin 20s linear infinite',
      pointerEvents: 'none'
    },
    blob2: {
      position: 'absolute',
      width: '600px',
      height: '600px',
      background: 'radial-gradient(circle, rgba(255, 236, 175, 0.1) 0%, rgba(26, 26, 29, 0) 60%)',
      top: '40%',
      left: '60%',
      transform: 'translate(-50%, -50%)',
      zIndex: -2,
      animation: 'blobSpin 15s linear infinite reverse',
      pointerEvents: 'none'
    },
    gridOverlay: {
      position: 'absolute',
      inset: 0,
      backgroundSize: '50px 50px',
      backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
      zIndex: -1,
      backgroundPosition: `${mousePosition.x * 2}px ${mousePosition.y * 2}px`
    },
    content: {
      position: 'absolute',
      // Mobilde dikeyde tam ortala (3D küre kaldırıldığı için başlık ortada dursun),
      // masaüstünde eski konum + parallax korunur.
      top: isMobile ? '50%' : '25%',
      left: '50%',
      width: '100%',
      textAlign: 'center',
      maxWidth: '900px',
      zIndex: 2,
      transform: isMobile
        ? 'translate(-50%, -50%)'
        : `translate(calc(-50% + ${mousePosition.x * -1}px), ${mousePosition.y * -1}px)`,
      transition: 'transform 0.1s ease-out',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    logoWrapper: {
      width: '160px',
      marginBottom: '2rem',
      filter: 'drop-shadow(0 0 30px rgba(154, 22, 31, 0.5))'
    },
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.6rem 1.5rem',
      background: 'linear-gradient(90deg, rgba(255,236,175,0.1), rgba(154,22,31,0.1))',
      border: '1px solid rgba(255, 236, 175, 0.3)',
      borderRadius: '50px',
      fontSize: '0.9rem',
      fontWeight: '700',
      marginBottom: '2rem',
      color: 'var(--color-gold)',
      boxShadow: '0 0 20px rgba(255,236,175,0.1)',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    title: {
      fontSize: 'clamp(3rem, 12vw, 9rem)',
      lineHeight: '1',
      marginBottom: '1.5rem',
      letterSpacing: '-2px',
      fontFamily: 'var(--font-hero)',
      fontWeight: '900',
      textTransform: 'uppercase'
    },
    subtitle: {
      fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
      color: 'var(--color-secondary)',
      marginBottom: '1.75rem',
      maxWidth: '700px',
      margin: '0 auto 3rem auto',
      fontWeight: '400',
      padding: '0 0.9rem',
      textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.6)' // Okunabilirliği artırdık
    },
    ctaRow: {
      display: 'flex',
      gap: '1.25rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center'
    },
    ctaPrimary: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem 2.5rem',
      background: 'var(--color-accent)',
      color: '#fff',
      borderRadius: '50px',
      fontWeight: '600',
      fontSize: '1rem',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      textDecoration: 'none',
      boxShadow: '0 10px 30px rgba(154, 22, 31, 0.3)',
      transition: 'all 0.3s ease'
    },
    ctaSecondary: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem 2.5rem',
      background: 'transparent',
      color: 'var(--color-text)',
      border: '1px solid rgba(255, 236, 175, 0.3)',
      borderRadius: '50px',
      fontWeight: '600',
      fontSize: '1rem',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      textDecoration: 'none',
      transition: 'all 0.3s ease'
    },
    scrollIndicator: {
      position: 'absolute',
      // Mobilde "Bize Ulaşın" ile çakışmaması için daha aşağıya alındı
      bottom: isMobile ? '0.5rem' : '1.5rem',
      left: isMobile ? '45%' : '48%', // Mobilde %45 (aynı kalır), PC'de hafif sol (%48)
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.2rem',
      cursor: 'pointer',
      zIndex: 10
    },
    scrollText: {
      fontSize: '0.75rem',
      letterSpacing: '3px',
      textTransform: 'uppercase',
      color: 'var(--color-secondary)',
      fontWeight: '600'
    },
    floatingCard1: {
      position: 'absolute',
      top: '20%',
      left: '15%',
      width: '250px',
      padding: '1.5rem',
      borderRadius: '16px',
      animation: 'float 6s ease-in-out infinite',
      transformStyle: 'preserve-3d',
      zIndex: 0
    },
    floatingCard2: {
      position: 'absolute',
      bottom: '25%',
      right: '10%',
      width: '280px',
      padding: '1.5rem',
      borderRadius: '16px',
      animation: 'floatReverse 8s ease-in-out infinite',
      transformStyle: 'preserve-3d',
      zIndex: 0
    }
  };

  return (
    <section id="home" style={styles.section} className="hero-section-container">
      <div style={styles.gridOverlay} className="hero-grid-overlay" />

      {/* Mobil: 3D küre yerine hafif bir arka plan videosu (küreden çok daha performanslı) */}
      {isMobile && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
          >
            <source src="/hero-mobile.webm" type="video/webm" />
            <source src="/hero-mobile.mp4" type="video/mp4" />
          </video>
          {/* Metnin okunması için karartma katmanı */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 45%, rgba(10,10,12,0.35) 0%, rgba(10,10,12,0.75) 70%, #0a0a0c 100%)' }} />
        </div>
      )}

      {/* 3D Floating Elements */}
      <div style={styles.floatingCard1} className="glass-card luxury-card floating-card-1 animate-slide-right delay-300">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={20} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-secondary)' }}>Delivery Speed</div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-text)' }}>48 Hours</div>
          </div>
        </div>
        <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', background: 'var(--color-gold)', boxShadow: '0 0 10px var(--color-gold)' }}></div>
        </div>
      </div>

      <div style={styles.floatingCard2} className="glass-card luxury-card floating-card-2 animate-slide-up delay-500">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-secondary)' }}>Vibe Check</span>
          <span style={{ color: 'var(--color-gold)', fontWeight: '800' }}>100%</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ height: '30px', flex: 1, background: `rgba(255, 236, 175, ${0.2 * i})`, borderRadius: '4px' }}></div>
          ))}
        </div>
      </div>

      <div style={styles.content} className="hero-content">
        <h1 style={styles.title} className="animate-slide-up delay-200">
          <StaggeredText text="SUERTA CO." delay={0.2} />
        </h1>

        <p style={styles.subtitle} className="animate-slide-up delay-200">
          Sıradan dijital varlıkları reddediyoruz. suerta co. ile markanızı, kullanıcıları içine çeken ve <strong style={{ color: '#fff' }}>iz bırakan bir deneyime</strong> dönüştürün.
        </p>

        <div style={styles.ctaRow} className="animate-slide-up delay-300 hero-cta-row">
          <Link
            to="/iletisim"
            style={styles.ctaPrimary}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(154, 22, 31, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(154, 22, 31, 0.3)';
            }}
          >
            Bize Ulaşın
          </Link>
          <Link
            to="/referanslar"
            style={styles.ctaSecondary}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-gold)';
              e.currentTarget.style.color = '#111';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--color-text)';
            }}
          >
            Portföyü Gör
          </Link>
        </div>
      </div>

      {/* Premium Scroll Down Indicator */}
      <div
        style={styles.scrollIndicator}
        className="scroll-indicator animate-slide-up delay-500"
        onClick={() => {
          const nextSection = document.getElementById('signature');
          if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span style={styles.scrollText}>Keşfet</span>
        <div className="scroll-arrow-anim">
          <ChevronDown size={24} color="var(--color-gold)" />
        </div>
      </div>
    </section>
  );
}
