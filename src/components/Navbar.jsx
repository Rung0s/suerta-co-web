import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
      zIndex: 100,
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'var(--transition-smooth)',
      background: isScrolled ? 'rgba(26, 26, 29, 0.9)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(15px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(255, 236, 175, 0.05)' : '1px solid transparent'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      cursor: 'pointer'
    },
    logoIcon: {
      position: 'relative',
      width: '45px',
      height: '45px',
      transition: 'transform 0.3s ease',
      filter: 'drop-shadow(0 0 10px rgba(154, 22, 31, 0.3))'
    },
    logoImage: {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    },
    logoText: {
      fontSize: '1.5rem',
      fontWeight: '800',
      letterSpacing: '-0.5px'
    },
    desktopMenu: {
      display: 'flex',
      gap: '2.5rem',
      alignItems: 'center'
    },
    link: {
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'var(--transition-fast)',
      cursor: 'pointer'
    },
    ctaButton: {
      padding: '0.6rem 1.2rem',
      background: 'var(--color-accent)',
      color: 'var(--color-text)',
      border: 'none',
      borderRadius: '4px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'var(--transition-fast)'
    }
  };

  return (
    <nav style={navStyles.nav}>
      <div 
        style={navStyles.logoContainer}
        onMouseOver={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1.1) rotate(5deg)'}
        onMouseOut={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1) rotate(0)'}
      >
        <div style={navStyles.logoIcon}>
          <img src={logoUrl} alt="Suerta Co Logo" style={navStyles.logoImage} />
        </div>
        <span style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-0.5px' }}>SUERTA CO.</span>
      </div>

      {/* Desktop Menu */}
      <div style={navStyles.desktopMenu} className="desktop-menu">
        <a style={navStyles.link} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'} href="#about">Hakkımızda</a>
        <a style={navStyles.link} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'} href="#services">Hizmetler</a>
        <a style={navStyles.link} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'} href="#references">Referanslar</a>
        <a style={navStyles.link} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={(e) => e.currentTarget.style.color = 'inherit'} href="#team">Ekibimiz</a>
        <a 
          style={{...navStyles.ctaButton, textDecoration: 'none', display: 'inline-block'}} 
          href="#contact"
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} 
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Bize Ulaşın
        </a>
      </div>
    </nav>
  );
}
