import React from 'react';
import { Mail, Globe } from 'lucide-react';

export default function Footer() {
  const styles = {
    footer: {
      background: 'var(--color-bg)',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '4rem 2rem 2rem 2rem',
      marginTop: 'auto'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem'
    },
    logo: {
      fontSize: '2rem',
      fontWeight: '900',
      fontFamily: 'var(--font-hero)',
      letterSpacing: '-1px',
      color: 'var(--color-text)',
      textTransform: 'uppercase'
    },
    socialLinks: {
      display: 'flex',
      gap: '1.5rem',
      alignItems: 'center'
    },
    iconText: {
      color: 'var(--color-secondary)',
      transition: 'var(--transition-fast)',
      cursor: 'pointer',
      fontSize: '1.2rem',
      fontWeight: '600',
      textDecoration: 'none'
    },
    icon: {
      color: 'var(--color-secondary)',
      transition: 'var(--transition-fast)',
      cursor: 'pointer'
    },
    copyright: {
      color: 'var(--color-secondary)',
      fontSize: '0.9rem',
      marginTop: '2rem'
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.logo}>SUERTA <span style={{ color: 'var(--color-gold)' }}>CO.</span></div>
        <div style={styles.socialLinks}>
          <a href="#" style={styles.iconText} onMouseOver={e => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-secondary)'}>IG</a>
          <a href="#" style={styles.iconText} onMouseOver={e => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-secondary)'}>IN</a>
          <a href="#" style={styles.iconText} onMouseOver={e => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-secondary)'}>X</a>
          <a href="mailto:hello@suerta.co" style={styles.icon} onMouseOver={e => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-secondary)'}><Mail size={24} /></a>
        </div>
        <div style={styles.copyright}>
          &copy; {new Date().getFullYear()} Suerta Co. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
