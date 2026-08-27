import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import StaggeredText from './StaggeredText';
import useIsMobile from '../hooks/useIsMobile';
import { useLanguage } from '../context/LanguageContext';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile(768);
  const { t, isEN } = useLanguage();

  useEffect(() => {
    // Mobilde parallax yok: dokunmatikte imleç yok ve kaydırmayı bozuyor.
    if (isMobile) return;

    const node = sectionRef.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Parallax'ı React state yerine CSS değişkeniyle sürüyoruz. State kullanınca
    // her mousemove olayı tüm hero'yu yeniden render ediyordu.
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;

    const handleMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth) * 20 - 10;
      targetY = (e.clientY / window.innerHeight) * 20 - 10;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      node.style.setProperty('--hero-parallax-x', `${currentX}px`);
      node.style.setProperty('--hero-parallax-y', `${currentY}px`);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, [isMobile]);

  const headline = isEN
    ? 'Websites that turn visitors into customers.'
    : 'Ziyaretçiyi müşteriye çeviren premium web siteleri.';

  const styles = {
    section: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: isMobile ? '3vh' : '20vh',
      paddingLeft: '2rem',
      paddingRight: '2rem',
      position: 'relative',
      overflow: 'hidden',
      perspective: '1000px'
    },
    gridOverlay: {
      position: 'absolute',
      inset: 0,
      backgroundSize: '50px 50px',
      backgroundImage:
        'linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
      zIndex: -1,
      backgroundPosition:
        'calc(var(--hero-parallax-x, 0px) * 2) calc(var(--hero-parallax-y, 0px) * 2)'
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '100%',
      textAlign: 'center',
      maxWidth: '900px',
      zIndex: 2,
      transform: isMobile
        ? 'translate(-50%, -50%)'
        : 'translate(calc(-50% - var(--hero-parallax-x, 0px)), calc(-50% - var(--hero-parallax-y, 0px)))',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    eyebrow: {
      fontSize: '0.75rem',
      letterSpacing: '3px',
      textTransform: 'uppercase',
      color: 'var(--color-gold)',
      fontWeight: '600',
      marginBottom: '1.75rem'
    },
    title: {
      fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
      lineHeight: '1.02',
      marginBottom: '1.5rem',
      letterSpacing: '-0.03em',
      fontFamily: 'var(--font-hero)',
      fontWeight: '900',
      maxWidth: '15ch'
    },
    subtitle: {
      fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
      color: 'var(--color-secondary)',
      maxWidth: '620px',
      margin: '0 auto 3rem auto',
      fontWeight: '400',
      padding: '0 0.9rem',
      textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.6)'
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
      transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
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
      transition: 'background 0.2s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
    },
    scrollIndicator: {
      position: 'absolute',
      bottom: isMobile ? '2rem' : '2.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.2rem',
      cursor: 'pointer',
      zIndex: 10,
      background: 'none',
      border: 'none',
      padding: 0
    },
    scrollText: {
      fontSize: '0.75rem',
      letterSpacing: '3px',
      textTransform: 'uppercase',
      color: 'var(--color-secondary)',
      fontWeight: '600'
    }
  };

  return (
    <section id="home" ref={sectionRef} style={styles.section} className="hero-section-container">
      <div style={styles.gridOverlay} className="hero-grid-overlay" />

      {/* Mobilde 3D küre kapalı; yerine hafif bir atmosfer katmanı */}
      {isMobile && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            background:
              'radial-gradient(circle at 50% 38%, rgba(154,22,31,0.22) 0%, rgba(10,10,12,0.85) 58%, #0a0a0c 100%)'
          }}
        />
      )}

      <div style={styles.content} className="hero-content">
        <p style={styles.eyebrow} className="animate-slide-up delay-100">
          suerta co. · suerta.co
        </p>

        <h1 style={styles.title} className="animate-slide-up delay-200">
          <StaggeredText text={headline} delay={0.2} />
        </h1>

        <p style={styles.subtitle} className="animate-slide-up delay-300">
          {isEN ? (
            <>
              For <strong style={{ color: '#fff' }}>hotels, short-term rentals and real estate brands</strong>. Booking
              and listing sites that earn direct reservations instead of paying commission.
            </>
          ) : (
            <>
              <strong style={{ color: '#fff' }}>Otel, kiralama ve emlak markaları</strong> için. Komisyon ödemek yerine
              doğrudan rezervasyon kazandıran rezervasyon ve ilan siteleri.
            </>
          )}
        </p>

        <div style={styles.ctaRow} className="animate-slide-up delay-500 hero-cta-row">
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
            {t('hero.ctaPrimary')}
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
            {t('hero.ctaSecondary')}
          </Link>
        </div>
      </div>

      <button
        type="button"
        style={styles.scrollIndicator}
        className="scroll-indicator animate-slide-up delay-500"
        aria-label={isEN ? 'Scroll to next section' : 'Sonraki bölüme kaydır'}
        onClick={() => {
          const nextSection = document.getElementById('signature');
          if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span style={styles.scrollText}>{t('hero.scroll')}</span>
        <span className="scroll-arrow-anim">
          <ChevronDown size={24} color="var(--color-gold)" />
        </span>
      </button>
    </section>
  );
}
