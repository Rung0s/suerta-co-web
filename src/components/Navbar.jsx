import React, { useState, useEffect } from 'react';
import { Menu, X, Clock, ArrowUpRight, Phone, Mail, Globe, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import SuertaLogo from './SuertaLogo';
import useIsMobile from '../hooks/useIsMobile';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const isMobile = useIsMobile(768);
  const { language, setLanguage, toggleLanguage, t, isEN } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Canlı İstanbul Saati takibi
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Date().toLocaleTimeString(language === 'EN' ? 'en-US' : 'tr-TR', { 
          timeZone: 'Europe/Istanbul', 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        setCurrentTime(timeStr);
      } catch (e) {
        setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, [language]);

  // Mobil menü açıkken arkadaki sayfanın kaymasını engelle
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navStyles = {
    nav: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 5%',
      zIndex: 100,
      background: isScrolled ? 'rgba(10, 10, 12, 0.88)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'var(--transition-smooth)'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'transform 0.3s ease'
    },
    desktopMenu: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem'
    },
    link: {
      color: 'var(--color-text)',
      textDecoration: 'none',
      fontSize: '0.85rem',
      fontWeight: '600',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      transition: 'var(--transition-fast)'
    },
    ctaButton: {
      padding: '0.75rem 1.6rem',
      background: 'transparent',
      color: 'var(--color-text)',
      border: '1px solid rgba(255, 236, 175, 0.4)',
      borderRadius: '50px',
      fontSize: '0.85rem',
      fontWeight: '700',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      cursor: 'pointer',
      transition: 'var(--transition-smooth)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      textDecoration: 'none'
    },
    langBtn: {
      background: 'rgba(255, 255, 255, 0.06)',
      border: '1px solid rgba(255, 236, 175, 0.3)',
      color: 'var(--color-gold)',
      padding: '0.5rem 1rem',
      borderRadius: '30px',
      fontSize: '0.8rem',
      fontWeight: '800',
      letterSpacing: '1px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
      transition: 'all 0.3s ease'
    }
  };

  const mobileLinks = [
    { num: '01', title: isEN ? 'ABOUT US' : 'HAKKIMIZDA', path: '/hakkimizda' },
    { num: '02', title: isEN ? 'SERVICES' : 'HİZMETLERİMİZ', path: '/hizmetlerimiz' },
    { num: '03', title: isEN ? 'PORTFOLIO' : 'REFERANSLAR', path: '/referanslar' },
    { num: '04', title: isEN ? 'BLOG' : 'BLOG', path: '/blog' },
    { num: '05', title: isEN ? 'OUR TEAM' : 'EKİBİMİZ', path: '/ekibimiz' },
  ];

  return (
    <nav style={navStyles.nav}>
      <Link 
        to="/"
        onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}
        style={navStyles.logoContainer}
        className="navbar-logo-link"
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <SuertaLogo size={isMobile ? 65 : 100} animated={false} />
      </Link>

      {/* Desktop Menu */}
      <div style={navStyles.desktopMenu} className="desktop-menu">
        <Link style={navStyles.link} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'} to="/hakkimizda">{t('nav.about')}</Link>
        <Link style={navStyles.link} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'} to="/hizmetlerimiz">{t('nav.services')}</Link>
        <Link style={navStyles.link} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'} to="/referanslar">{t('nav.portfolio')}</Link>
        <Link style={navStyles.link} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'} to="/blog">{t('nav.blog')}</Link>
        
        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          style={navStyles.langBtn}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 236, 175, 0.2)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'}
          title={isEN ? 'Switch to Turkish' : 'Switch to English'}
        >
          <Globe size={14} />
          {isEN ? '🇬🇧 EN | TR' : '🇹🇷 TR | EN'}
        </button>

        {/* Primary CTA */}
        <Link 
          style={navStyles.ctaButton} 
          to="/iletisim"
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'var(--color-gold)';
            e.currentTarget.style.color = '#111';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }} 
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--color-text)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {t('hero.ctaPrimary')}
        </Link>
      </div>

      {/* Mobile Right Action Group */}
      <div style={{ display: 'none', gap: '0.5rem', alignItems: 'center' }} className="mobile-actions-group">
        <button
          onClick={toggleLanguage}
          style={{
            background: 'rgba(255, 236, 175, 0.1)',
            border: '1px solid var(--color-gold)',
            color: 'var(--color-gold)',
            padding: '0.4rem 0.8rem',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '800',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}
        >
          {isEN ? '🇬🇧 EN' : '🇹🇷 TR'}
        </button>

        {/* Mobile Menu Toggle Button */}
        <button 
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            width: '42px',
            height: '42px',
            color: 'var(--color-text)',
            cursor: 'pointer',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menüyü Aç/Kapat"
        >
          {mobileMenuOpen ? <X size={22} color="var(--color-gold)" /> : <Menu size={22} />}
        </button>
      </div>

      {/* Lüks Tam Ekran Mobil Menü */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(10, 10, 12, 0.98)',
          backdropFilter: 'blur(35px)',
          WebkitBackdropFilter: 'blur(35px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '6rem 2rem 2.5rem 2rem',
          zIndex: 999,
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          boxSizing: 'border-box'
        }}
      >
        {/* Top Status & Mobile Language Picker */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.6rem 1rem',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '50px',
            width: 'fit-content'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
            <Clock size={14} color="var(--color-gold)" />
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text)', letterSpacing: '1px', fontWeight: '600' }}>
              ISTANBUL {currentTime} GMT+3
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setLanguage('TR')}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                border: language === 'TR' ? '1px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.1)',
                background: language === 'TR' ? 'rgba(255, 236, 175, 0.2)' : 'transparent',
                color: '#fff',
                fontWeight: '700',
                fontSize: '0.8rem'
              }}
            >
              🇹🇷 Türkçe
            </button>
            <button
              onClick={() => setLanguage('EN')}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                border: language === 'EN' ? '1px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.1)',
                background: language === 'EN' ? 'rgba(255, 236, 175, 0.2)' : 'transparent',
                color: '#fff',
                fontWeight: '700',
                fontSize: '0.8rem'
              }}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        {/* Center Nav Links with Numbers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', margin: 'auto 0' }}>
          {mobileLinks.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                textDecoration: 'none',
                paddingBottom: '0.6rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                color: 'var(--color-text)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-gold)', fontWeight: '500', fontFamily: 'var(--font-main)' }}>
                  {item.num}
                </span>
                <span style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '1px', fontFamily: 'var(--font-main)' }}>
                  {item.title}
                </span>
              </div>
              <ArrowUpRight size={20} color="rgba(255,255,255,0.3)" />
            </Link>
          ))}

          <Link
            to="/iletisim"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.8rem',
              padding: '1.1rem',
              background: 'var(--color-accent)',
              color: '#fff',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '700',
              letterSpacing: '1px',
              fontSize: '1rem',
              marginTop: '1rem',
              boxShadow: '0 10px 25px rgba(154, 22, 31, 0.4)'
            }}
          >
            {t('hero.ctaPrimary')} <ArrowUpRight size={20} />
          </Link>
        </div>

        {/* Mobile Contact Quick Action Footer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
          <a 
            href={`https://wa.me/905060693525?text=${encodeURIComponent(t('whatsapp.message'))}`}
            target="_blank" 
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              color: '#25D366',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '0.9rem'
            }}
          >
            <MessageCircle size={18} /> {t('nav.quickWhatsApp')}
          </a>
        </div>
      </div>
    </nav>
  );
}
