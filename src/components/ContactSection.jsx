import React, { useState } from 'react';
import { Mail, MapPin, ArrowRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import MagneticButton from './MagneticButton';

export default function ContactSection() {
  const [ref1, isVisible1] = useScrollReveal();
  const [ref2, isVisible2] = useScrollReveal(0.2);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    const form = e.target;
    const formData = new FormData(form);

    try {
      // AJAX ile gönderim yapıyoruz (sayfa değişmesin diye /ajax/ kullanılıyor)
      const response = await fetch("https://formsubmit.co/ajax/suerta.info@gmail.com", {
        method: "POST",
        headers: { 
            'Accept': 'application/json'
        },
        body: formData
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
      } else {
        setSubmitStatus('idle');
        alert("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    } catch (error) {
      setSubmitStatus('idle');
      alert("Bağlantı hatası oluştu, lütfen tekrar deneyin.");
    }
  };

  const styles = {
    section: {
      padding: '10rem 2rem',
      position: 'relative',
      background: 'linear-gradient(to top, rgba(154, 22, 31, 0.08), transparent)'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: '6rem',
      alignItems: 'center'
    },
    infoBlock: {
      opacity: isVisible1 ? 1 : 0,
      transform: isVisible1 ? 'translateX(0)' : 'translateX(-40px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
    },
    title: {
      fontSize: 'clamp(3rem, 6vw, 5.5rem)',
      fontFamily: 'var(--font-heading)',
      lineHeight: '1.1',
      marginBottom: '1.5rem',
      color: 'var(--color-text)'
    },
    subtitle: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '1.2rem',
      fontFamily: 'var(--font-main)',
      marginBottom: '4rem',
      maxWidth: '450px',
      lineHeight: '1.6'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      marginBottom: '2rem',
      fontSize: '1.2rem',
      fontFamily: 'var(--font-main)',
      color: 'var(--color-text)',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    iconBox: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: 'linear-gradient(145deg, rgba(154,22,31,0.2), rgba(255,236,175,0.05))',
      border: '1px solid rgba(154,22,31,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-gold)',
      transition: 'all 0.3s ease'
    },
    formBlock: {
      borderRadius: '30px',
      padding: '4rem',
      background: 'rgba(20, 20, 20, 0.4)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
      opacity: isVisible2 ? 1 : 0,
      transform: isVisible2 ? 'translateX(0)' : 'translateX(40px)',
      transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s'
    },
    inputGroup: {
      marginBottom: '2rem',
      position: 'relative'
    },
    input: {
      width: '100%',
      padding: '1.5rem 0 1rem 0',
      background: 'transparent',
      border: 'none',
      borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
      color: 'var(--color-text)',
      fontSize: '1.2rem',
      fontFamily: 'var(--font-main)',
      outline: 'none',
      transition: 'border-color 0.3s'
    },
    submitBtn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      width: '100%',
      padding: '1.5rem',
      background: 'var(--color-accent)', // Bordo
      color: '#fff',
      border: 'none',
      borderRadius: '50px',
      fontSize: '1.2rem',
      fontFamily: 'var(--font-main)',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '2rem',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <section id="contact" style={styles.section}>
      <style>
        {`
          .contact-input::placeholder {
            color: rgba(255, 255, 255, 0.3);
          }
          .contact-input:focus {
            border-bottom-color: var(--color-gold) !important;
          }
          .contact-link:hover .contact-icon {
            transform: scale(1.1) rotate(5deg);
            background: var(--color-accent);
            color: #fff;
          }
          .contact-btn:hover {
            background: #ffecaf !important;
            color: #111 !important;
          }
          @media (max-width: 992px) {
            .contact-grid {
              grid-template-columns: 1fr !important;
              gap: 4rem !important;
            }
            .form-block {
              padding: 2.5rem !important;
            }
          }
        `}
      </style>
      <div style={styles.container} className="contact-grid">
        
        {/* Sol Kolon - Bilgi */}
        <div style={styles.infoBlock} ref={ref1}>
          <h2 style={styles.title}>Birlikte <br/><span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Yaratalım.</span></h2>
          <p style={styles.subtitle}>
            Bir fikriniz mi var? Veya markanızı dijital dünyada baştan yaratmak mı istiyorsunuz? Kahveler bizden, sohbet sizden.
          </p>
          
          <div style={{ marginTop: '4rem' }}>
            <a href="mailto:hello@suerta.co" style={styles.contactItem} className="contact-link">
              <div style={styles.iconBox} className="contact-icon"><Mail size={24} /></div>
              hello@suerta.co
            </a>
            <a href="https://instagram.com/suerta.co" target="_blank" rel="noreferrer" style={styles.contactItem} className="contact-link">
              <div style={styles.iconBox} className="contact-icon" style={{...styles.iconBox, fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '1.2rem'}}>IG</div>
              @suerta.co
            </a>
            <div style={styles.contactItem} className="contact-link">
              <div style={styles.iconBox} className="contact-icon"><MapPin size={24} /></div>
              Eskişehir, Türkiye
            </div>
          </div>
        </div>

        {/* Sağ Kolon - Form */}
        <div style={styles.formBlock} className="form-block" ref={ref2}>
          {submitStatus === 'success' ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
                <Mail size={40} color="#fff" />
              </div>
              <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Mesajınız İletildi!</h3>
              <p style={{ color: 'var(--color-secondary)', fontSize: '1.1rem' }}>En kısa sürede sizinle iletişime geçeceğiz. Kahveler hazır!</p>
              <button 
                onClick={() => setSubmitStatus('idle')}
                style={{...styles.submitBtn, width: 'auto', padding: '1rem 2rem', margin: '3rem auto 0 auto', background: 'transparent', border: '1px solid var(--color-gold)'}}
              >
                Yeni Mesaj Gönder
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Konu Başlığı */}
              <input type="hidden" name="_subject" value="Suerta Co. Websitesi'nden Yeni Bir Mesaj Var!" />
              {/* Captcha Kapatma */}
              <input type="hidden" name="_captcha" value="false" />
              {/* E-posta Şablonu */}
              <input type="hidden" name="_template" value="table" />
              
              <div style={styles.inputGroup}>
                <input type="text" name="name" style={styles.input} className="contact-input" placeholder="Adınız Soyadınız" required />
              </div>
              <div style={styles.inputGroup}>
                <input type="email" name="email" style={styles.input} className="contact-input" placeholder="E-posta Adresiniz" required />
              </div>
              <div style={styles.inputGroup}>
                <textarea 
                  name="message"
                  style={{...styles.input, minHeight: '100px', resize: 'vertical'}} 
                  className="contact-input" 
                  placeholder="Projenizden bahsedin..."
                  required
                />
              </div>
              <MagneticButton 
                style={{...styles.submitBtn, opacity: submitStatus === 'loading' ? 0.7 : 1, cursor: submitStatus === 'loading' ? 'not-allowed' : 'pointer'}}
                className="contact-btn"
                disabled={submitStatus === 'loading'}
              >
                {submitStatus === 'loading' ? 'Gönderiliyor...' : 'Mesajı Gönder'} <ArrowRight size={20} />
              </MagneticButton>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
