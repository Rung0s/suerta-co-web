import React, { useState, useEffect } from 'react';
import { Menu, X, Clock, ArrowUpRight, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

import SuertaLogo from './SuertaLogo';
import useIsMobile from '../hooks/useIsMobile';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const isMobile = useIsMobile(768);

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
        const timeStr = new Date().toLocaleTimeString('tr-TR', { 
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
    const timer = setInterval(updateTime, 10000); // 10 saniyede bir güncelle
    return () => clearInterval(timer);
  }, []);

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
      background: isScrolled ? 'rgba(10, 10, 12, 0.85)' : 'transparent',
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
      gap: '2.5rem'
    },
    link: {
      color: 'var(--color-text)',
      textDecoration: 'none',
      fontSize: '0.9rem',
      fontWeight: '600',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      transition: 'var(--transition-fast)'
    },
    ctaButton: {
      padding: '0.8rem 1.8rem',
      background: 'transparent',
      color: 'var(--color-text)',
      border: '1px solid rgba(255, 236, 175, 0.3)',
      borderRadius: '50px',
      fontSize: '0.9rem',
      fontWeight: '600',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      cursor: 'pointer',
      transition: 'var(--transition-smooth)',
      display: 'inline-block',
      textDecoration: 'none'
    }
  };

  const mobileLinks = [
    { num: '01', title: 'HAKKIMIZDA', path: '/hakkimizda' },
    { num: '02', title: 'HİZMETLERİMİZ', path: '/hizmetlerimiz' },
    { num: '03', title: 'REFERANSLAR', path: '/referanslar' },
    { num: '04', title: 'BLOG', path: '/blog' },
    { num: '05', title: 'EKİBİMİZ', path: '/ekibimiz' },
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
        <Link style={navStyles.link} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'} to="/hakkimizda">Hakkımızda</Link>
        <Link style={navStyles.link} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'} to="/hizmetlerimiz">Hizmetler</Link>
        <Link style={navStyles.link} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'} to="/referanslar">Referanslar</Link>
        <Link style={navStyles.link} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'} to="/blog">Blog</Link>
        <Link style={navStyles.link} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'} to="/ekibimiz">Ekibimiz</Link>
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
          Bize Ulaşın
        </Link>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button 
        style={{
          display: 'none',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          width: '46px',
          height: '46px',
          color: 'var(--color-text)',
          cursor: 'pointer',
          zIndex: 1000,
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}
        className="mobile-menu-btn"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Menüyü Aç/Kapat"
      >
        {mobileMenuOpen ? <X size={24} color="var(--color-gold)" /> : <Menu size={24} />}
      </button>

      {/* Lüks Tam Ekran Mobil Menü (Luxury Mobile Experience) */}
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
        {/* Top Status: Canlı İstanbul Saati */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.6rem 1rem',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '50px',
          width: 'fit-content',
          alignSelf: 'center'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
          <Clock size={14} color="var(--color-gold)" />
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text)', letterSpacing: '1px', fontWeight: '600' }}>
            İSTANBUL {currentTime} GMT+3 | AKTİF
          </span>
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
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              padding: '1rem 2rem',
              background: 'var(--color-accent)',
              color: '#fff',
              borderRadius: '50px',
              fontWeight: '700',
              fontSize: '1.1rem',
              textDecoration: 'none',
              letterSpacing: '1px',
              boxShadow: '0 10px 25px rgba(154, 22, 31, 0.4)'
            }}
          >
            PROJENİZİ BAŞLATIN <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Bottom Contact & Social Shortcuts */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="https://wa.me/905060693525" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', textDecoration: 'none' }}>
              <Phone size={14} color="var(--color-gold)" /> +90 506 069 35 25
            </a>
            <a href="mailto:suerta.info@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', textDecoration: 'none' }}>
              <Mail size={14} color="var(--color-gold)" /> suerta.info@gmail.com
            </a>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginTop: '0.4rem' }}>
            <a href="https://instagram.com/suerta.co" target="_blank" rel="noreferrer" style={{ padding: '0.5rem 1.2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50px', color: 'var(--color-gold)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: '600', textDecoration: 'none' }} aria-label="Instagram">
              @suerta.co <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      <style>
        {`
          .navbar-logo-link {
            transform: scale(1);
            transform-origin: left center;
            transition: transform 0.3s ease;
          }
          @media (max-width: 992px) {
            .mobile-menu-btn {
              display: flex !important;
            }
          }
          @media (max-width: 768px) {
            nav {
              height: 70px !important;
              padding: 0 1.2rem !important;
            }
          }
        `}
      </style>
    </nav>
  );
}
