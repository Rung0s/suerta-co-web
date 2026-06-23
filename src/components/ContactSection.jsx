import React from 'react';
import { Mail, MapPin, ArrowRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import MagneticButton from './MagneticButton';

export default function ContactSection() {
  const [ref1, isVisible1] = useScrollReveal();
  const [ref2, isVisible2] = useScrollReveal(0.2);

  const styles = {
    section: {
      padding: '8rem 2rem',
      position: 'relative',
      background: 'linear-gradient(to top, rgba(154, 22, 31, 0.05), transparent)'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '4rem',
      alignItems: 'center'
    },
    infoBlock: {
      opacity: isVisible1 ? 1 : 0,
      transform: isVisible1 ? 'translateX(0)' : 'translateX(-40px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
    },
    title: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      lineHeight: '1.1',
      marginBottom: '1.5rem',
      letterSpacing: '-1px'
    },
    subtitle: {
      color: 'var(--color-secondary)',
      fontSize: '1.2rem',
      marginBottom: '3rem',
      maxWidth: '400px'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '1.5rem',
      fontSize: '1.1rem',
      color: 'var(--color-text)',
      textDecoration: 'none',
      transition: 'color 0.2s'
    },
    iconBox: {
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      background: 'rgba(255, 236, 175, 0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-gold)'
    },
    formBlock: {
      borderRadius: '24px',
      padding: '3rem',
      opacity: isVisible2 ? 1 : 0,
      transform: isVisible2 ? 'translateX(0)' : 'translateX(40px)',
      transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s'
    },
    inputGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.9rem',
      color: 'var(--color-secondary)'
    },
    input: {
      width: '100%',
      padding: '1rem',
      background: 'rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      color: 'var(--color-text)',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s'
    },
    textarea: {
      width: '100%',
      padding: '1rem',
      background: 'rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      color: 'var(--color-text)',
      fontSize: '1rem',
      outline: 'none',
      minHeight: '120px',
      resize: 'vertical',
      transition: 'border-color 0.3s'
    },
    submitBtn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      width: '100%',
      padding: '1.2rem',
      background: 'linear-gradient(135deg, var(--color-gold), #e0c870)',
      color: '#111',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: '800',
      cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s'
    }
  };

  return (
    <section id="contact" style={styles.section}>
      <style>
        {`
          .contact-input:focus {
            border-color: var(--color-gold) !important;
          }
          @media (max-width: 768px) {
            .contact-grid {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
            .form-block {
              padding: 2rem !important;
            }
          }
        `}
      </style>
      <div style={styles.container} className="contact-grid">
        <div style={styles.infoBlock} ref={ref1}>
          <h2 style={styles.title}>Birlikte <span style={{ color: 'var(--color-gold)' }}>Yaratalım.</span></h2>
          <p style={styles.subtitle}>İşletmenizin dijital potansiyelini açığa çıkarmak için kahve içmeye bekleriz.</p>
          
          <div style={{ marginTop: '3rem' }}>
            <a href="mailto:hello@suerta.co" style={styles.contactItem} onMouseOver={e => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text)'}>
              <div style={styles.iconBox}><Mail size={20} /></div>
              hello@suerta.co
            </a>
            <a href="https://instagram.com/suerta.co" target="_blank" rel="noreferrer" style={styles.contactItem} onMouseOver={e => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-text)'}>
              <div style={styles.iconBox}>IG</div>
              @suerta.co
            </a>
            <div style={styles.contactItem}>
              <div style={styles.iconBox}><MapPin size={20} /></div>
              Eskişehir, Türkiye
            </div>
          </div>
        </div>

        <div style={styles.formBlock} className="form-block" ref={ref2}>
          <form onSubmit={e => e.preventDefault()}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Adınız Soyadınız</label>
              <input type="text" style={styles.input} className="contact-input" placeholder="John Doe" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>E-posta Adresiniz</label>
              <input type="email" style={styles.input} className="contact-input" placeholder="hello@example.com" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Projenizden Bahsedin</label>
              <textarea style={styles.textarea} className="contact-input" placeholder="Hayalinizdeki projeyi kısaca anlatın..."></textarea>
            </div>
            <MagneticButton 
              style={styles.submitBtn}
              className="magnetic-btn-primary"
            >
              Mesaj Gönder <ArrowRight size={20} />
            </MagneticButton>
          </form>
        </div>
      </div>
    </section>
  );
}
