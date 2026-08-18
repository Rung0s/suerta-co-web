import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { isEN } = useLanguage();
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
      fontSize: 'clamp(2.5rem, 12vw, 18rem)',
      fontFamily: 'var(--font-hero)',
      fontWeight: '900',
      lineHeight: '0.8',
      letterSpacing: '-1vw',
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
    <footer style={styles.footer} className="footer-section">
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
          @media (max-width: 768px) {
            .footer-section {
              padding: 4rem 1.5rem 2rem 1.5rem !important;
            }
            .footer-top-row {
              flex-direction: column !important;
              gap: 3rem !important;
              align-items: flex-start !important;
            }
            .footer-col {
              gap: 1rem !important;
              align-items: flex-start !important;
              width: 100% !important;
            }
            .footer-col-title {
              margin-bottom: 0.5rem !important;
              text-align: left !important;
            }
            .footer-link {
              text-align: left !important;
              justify-content: flex-start !important;
            }
            .footer-bottom-row {
              flex-direction: column !important;
              gap: 2rem !important;
              text-align: center !important;
            }
            .footer-giant-text {
              margin-top: 3rem !important;
            }
          }
        `}
      </style>
      <div style={styles.container}>
        
        {/* Üst Kısım: Menüler */}
        <div style={styles.topRow} className="footer-top-row">
          <div style={styles.col} className="footer-col">
            <div style={styles.colTitle} className="footer-col-title">{isEN ? 'Navigation' : 'Navigasyon'}</div>
            <Link to="/hizmetlerimiz" style={styles.link} className="footer-link">{isEN ? 'Services & Capabilities' : 'Uzmanlık Alanlarımız'}</Link>
            <Link to="/hakkimizda" style={styles.link} className="footer-link">{isEN ? 'Vision & About' : 'Vizyon'}</Link>
            <Link to="/referanslar" style={styles.link} className="footer-link">{isEN ? 'Portfolio' : 'Referanslar'}</Link>
          </div>
          
          <div style={styles.col} className="footer-col">
            <div style={styles.colTitle} className="footer-col-title">{isEN ? 'Social Networks' : 'Sosyal Ağlar'}</div>
            <a href="https://instagram.com/suerta.co" target="_blank" rel="noreferrer" style={styles.link} className="footer-link">Instagram <ArrowUpRight size={18} /></a>
          </div>

          <div style={styles.col} className="footer-col">
            <div style={styles.colTitle} className="footer-col-title">{isEN ? 'Direct Contact' : 'İletişim'}</div>
            <a href="mailto:suerta.info@gmail.com" style={styles.link} className="footer-link">suerta.info@gmail.com</a>
            <span style={{...styles.link, cursor: 'default', opacity: 0.7}} className="footer-link">Eskişehir, Türkiye (Global)</span>
          </div>
        </div>

        {/* Devasa Tipografi */}
        <div style={styles.giantTextContainer} className="footer-giant-text">
          <h1 style={styles.giantText}>SUERTA<span style={{marginLeft: '1.5vw'}}>CO</span><span style={{color: 'var(--color-accent)'}}>.</span></h1>
        </div>

        {/* Alt Bilgiler */}
        <div style={styles.bottomRow} className="footer-bottom-row">
          <div style={styles.copyright}>
            &copy; {new Date().getFullYear()} suerta co. {isEN ? 'Bespoke Digital Luxury. All Rights Reserved.' : 'Dijital Lüks. Tüm hakları saklıdır.'}
          </div>
          <MagneticButton style={styles.backToTop} className="back-to-top" onClick={scrollToTop}>
            {isEN ? 'Back to Top ↑' : 'Yukarı Dön ↑'}
          </MagneticButton>
        </div>

      </div>
    </footer>
  );
}
