import React from 'react';
import logoUrl from '../assets/suerta-logo.svg';

export default function Footer() {
  const styles = {
    footer: {
      padding: '4rem 2rem 2rem 2rem',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      background: '#111'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.8,
      width: '60px'
    },
    logoImage: {
      width: '100%',
      height: 'auto'
    },
    links: {
      display: 'flex',
      gap: '2rem'
    },
    link: {
      color: 'var(--color-secondary)',
      fontSize: '0.9rem',
      transition: 'var(--transition-fast)'
    },
    copy: {
      color: '#444',
      fontSize: '0.8rem',
      marginTop: '2rem'
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.logoContainer}>
          <img src={logoUrl} alt="Suerta Co" style={styles.logoImage} />
        </div>
        
        <div style={styles.links}>
          <a style={styles.link} href="mailto:hello@suerta.co" onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-secondary)'}>hello@suerta.co</a>
          <a style={styles.link} href="https://instagram.com/suerta.co" target="_blank" rel="noreferrer" onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-secondary)'}>@suerta.co</a>
        </div>

        <div style={styles.copy}>
          © {new Date().getFullYear()} Suerta Co. Eskişehir kökenli bir teknoloji stüdyosudur. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
