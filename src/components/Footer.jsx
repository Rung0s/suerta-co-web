import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const styles = {
    footer: {
      background: '#050505',
      padding: '8rem 2rem 2rem 2rem',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '4rem'
    },
    topRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: '4rem'
    },
    col: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    colTitle: {
      fontSize: '1rem',
      color: 'var(--color-secondary)',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      marginBottom: '1rem',
      fontFamily: 'var(--font-main)'
    },
    link: {
      color: 'var(--color-text)',
      textDecoration: 'none',
      fontSize: '1.2rem',
      fontFamily: 'var(--font-main)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
      width: 'fit-content'
    },
    giantTextContainer: {
      width: '100%',
      textAlign: 'center',
      marginTop: '4rem',
      position: 'relative'
    },
    giantText: {
      fontSize: 'clamp(5rem, 15vw, 18rem)',
      fontFamily: 'var(--font-hero)',
      fontWeight: '900',
      lineHeight: '0.8',
      letterSpacing: '-2vw',
      color: 'var(--color-text)',
      opacity: '0.9',
      margin: 0,
      whiteSpace: 'nowrap',
      textTransform: 'uppercase'
    },
    bottomRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      paddingTop: '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    copyright: {
      color: 'var(--color-secondary)',
      fontSize: '0.9rem',
      fontFamily: 'var(--font-main)'
    },
    backToTop: {
      background: 'transparent',
      border: '1px solid rgba(255,255,255,0.2)',
      color: 'var(--color-text)',
      padding: '0.8rem 1.5rem',
      borderRadius: '50px',
      cursor: 'pointer',
      fontFamily: 'var(--font-main)',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <footer style={styles.footer}>
      <style>
        {`
          .footer-link:hover {
            color: var(--color-gold) !important;
            transform: translateX(10px);
          }
          .back-to-top:hover {
            background: var(--color-text) !important;
            color: #000 !important;
          }
        `}
      </style>
      <div style={styles.container}>
        
        {/* Üst Kısım: Menüler */}
        <div style={styles.topRow}>
          <div style={styles.col}>
            <div style={styles.colTitle}>Navigasyon</div>
            <a href="#services" style={styles.link} className="footer-link">Uzmanlık Alanlarımız</a>
            <a href="#about" style={styles.link} className="footer-link">Vizyon</a>
            <a href="#references" style={styles.link} className="footer-link">Referanslar</a>
          </div>
          
          <div style={styles.col}>
            <div style={styles.colTitle}>Sosyal Ağlar</div>
            <a href="https://instagram.com/suerta.co" target="_blank" rel="noreferrer" style={styles.link} className="footer-link">Instagram <ArrowUpRight size={18} /></a>
            <a href="#" style={styles.link} className="footer-link">Twitter / X <ArrowUpRight size={18} /></a>
            <a href="#" style={styles.link} className="footer-link">LinkedIn <ArrowUpRight size={18} /></a>
          </div>

          <div style={styles.col}>
            <div style={styles.colTitle}>İletişim</div>
            <a href="mailto:hello@suerta.co" style={styles.link} className="footer-link">hello@suerta.co</a>
            <span style={{...styles.link, cursor: 'default', opacity: 0.7}}>Eskişehir, Türkiye</span>
          </div>
        </div>

        {/* Devasa Tipografi */}
        <div style={styles.giantTextContainer}>
          <h1 style={styles.giantText}>SUERTA<span style={{marginLeft: '1.5vw'}}>CO</span><span style={{color: 'var(--color-accent)'}}>.</span></h1>
        </div>

        {/* Alt Bilgiler */}
        <div style={styles.bottomRow}>
          <div style={styles.copyright}>
            &copy; {new Date().getFullYear()} Suerta Co. Dijital Lüks. Tüm hakları saklıdır.
          </div>
          <MagneticButton>
            <button style={styles.backToTop} className="back-to-top" onClick={scrollToTop}>
              Yukarı Dön
            </button>
          </MagneticButton>
        </div>

      </div>
    </footer>
  );
}
