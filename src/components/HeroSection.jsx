import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap, ChevronRight } from 'lucide-react';

import logoUrl from '../assets/suerta-logo.svg';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const styles = {
    section: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 2rem',
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
      transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
      transition: 'transform 0.1s ease-out'
    },
    content: {
      textAlign: 'center',
      maxWidth: '900px',
      zIndex: 1,
      transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)`,
      transition: 'transform 0.1s ease-out',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
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
      fontSize: 'clamp(5rem, 12vw, 9rem)',
      lineHeight: '1',
      marginBottom: '1.5rem',
      letterSpacing: '-4px',
      textShadow: '0 20px 40px rgba(0,0,0,0.5)',
      fontFamily: '"Inter", sans-serif'
    },
    subtitle: {
      fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
      color: 'var(--color-secondary)',
      marginBottom: '4rem',
      maxWidth: '700px',
      margin: '0 auto 4rem auto',
      fontWeight: '300'
    },
    ctaGroup: {
      display: 'flex',
      gap: '1.5rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    btnPrimary: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '1.2rem 2.5rem',
      background: 'linear-gradient(135deg, var(--color-gold), #e0c870)',
      color: '#111',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: '800',
      cursor: 'pointer',
      transition: 'var(--transition-smooth)',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(255,236,175,0.3)'
    },
    btnSecondary: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '1.2rem 2.5rem',
      background: 'rgba(255,255,255,0.03)',
      color: 'var(--color-text)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'var(--transition-smooth)',
      backdropFilter: 'blur(10px)'
    },
    floatingCard1: {
      position: 'absolute',
      top: '20%',
      left: '10%',
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
    <section style={styles.section}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />
      <div style={styles.gridOverlay} />

      {/* 3D Floating Elements */}
      <div style={styles.floatingCard1} className="glass-card animate-slide-right delay-300">
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

      <div style={styles.floatingCard2} className="glass-card animate-slide-up delay-500">
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

      <div style={styles.content}>
        <div style={styles.badge} className="animate-slide-up delay-100">
          <Zap size={16} />
          <span>Yeni Nesil Dijital Stüdyo</span>
        </div>
        
        <h1 style={styles.title} className="animate-slide-up delay-200">
          SUERTA <span className="text-spark">CO.</span>
        </h1>
        
        <p style={styles.subtitle} className="animate-slide-up delay-200">
          Sıradan dijital varlıkları reddediyoruz. Suerta Co. ile markanızı, kullanıcıları içine çeken ve <strong>iz bırakan bir deneyime</strong> dönüştürün.
        </p>
        
        <div style={styles.ctaGroup} className="animate-slide-up delay-300">
          <button 
            style={styles.btnPrimary} 
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,236,175,0.5)';
            }} 
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(255,236,175,0.3)';
            }}
          >
            Vizyonunuzu Paylaşın <ArrowRight size={20} />
          </button>
          
          <button 
            style={styles.btnSecondary}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,236,175,0.5)';
            }} 
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            }}
          >
            Kreasyonlarımızı İncele <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
