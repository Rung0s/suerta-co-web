import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import logoUrl from '../assets/suerta-logo.svg';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      background: isScrolled ? 'rgba(10, 10, 12, 0.8)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      transition: 'var(--transition-smooth)'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      cursor: 'pointer',
      textDecoration: 'none'
    },
    logoText: {
      fontSize: '1.5rem',
      fontWeight: '900',
      letterSpacing: '2px',
      color: 'var(--color-text)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
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

  return (
    <nav style={navStyles.nav}>
      <Link 
        to="/"
        style={navStyles.logoContainer}
        onMouseOver={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1.1) rotate(5deg)'}
        onMouseOut={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1) rotate(0deg)'}
      >
        <img src={logoUrl} alt="Suerta Logo" style={{ width: '40px', height: 'auto', transition: 'var(--transition-smooth)' }} />
        <div style={navStyles.logoText}>
          SUERTA <span style={{ color: 'var(--color-gold)' }}>CO.</span>
        </div>
      </Link>

      {/* Desktop Menu */}
      <div style={navStyles.desktopMenu} className="desktop-menu">
        <Link style={navStyles.link} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'} to="/about">Hakkımızda</Link>
        <Link style={navStyles.link} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'} to="/services">Hizmetler</Link>
        <Link style={navStyles.link} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'} to="/references">Referanslar</Link>
        <Link style={navStyles.link} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'} to="/about#team">Ekibimiz</Link>
        <Link 
          style={navStyles.ctaButton} 
          to="/contact"
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
    </nav>
  );
}
