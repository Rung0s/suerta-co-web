import React from 'react';

export default function SignatureScene() {
  const styles = {
    section: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      position: 'relative',
      zIndex: 1,
      overflow: 'hidden'
    },
    signatureContainer: {
      marginBottom: '2rem',
      position: 'relative'
    },
    signatureText: {
      fontFamily: 'var(--font-signature)',
      fontSize: 'clamp(10rem, 15vw, 13rem)',
      color: 'var(--color-gold)',
      lineHeight: '1',
      fontWeight: '400',
      textShadow: '0 0 20px rgba(255, 236, 175, 0.3)',
      paddingRight: '1rem', // Son harfin kesilmemesi için
      display: 'inline-block'
    },
    text: {
      fontSize: 'clamp(3rem, 8vw, 6rem)',
      fontFamily: 'var(--font-heading)',
      color: 'var(--color-text)',
      textAlign: 'center',
      lineHeight: '1.1',
      letterSpacing: '-2px',
      textTransform: 'uppercase',
      marginTop: '1rem'
    },
    highlight: {
      color: 'transparent',
      WebkitTextStroke: '2px var(--color-gold)',
      display: 'block',
      fontStyle: 'italic'
    }
  };

  return (
    <section id="signature" style={styles.section} className="signature-scene">
      <style>
        {`
          /* El yazısı soldan sağa çizilir */
          @keyframes sigDraw {
            from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
            to   { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
          }
          /* Başlık aşağıdan yükselir */
          @keyframes sigRise {
            from { opacity: 0; transform: translateY(60px) scale(0.92); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
          .sig-draw {
            animation: sigDraw 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
          }
          .sig-rise {
            animation: sigRise 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s both;
          }
          @media (prefers-reduced-motion: reduce) {
            .sig-draw, .sig-rise { animation: none; }
          }
          @media (max-width: 768px) {
            .signature-scene {
              min-height: 50vh !important;
              padding: 3rem 1.5rem !important;
            }
          }
        `}
      </style>
      <div style={styles.signatureContainer}>
        <div className="sig-draw" style={styles.signatureText}>
          suerta
        </div>
      </div>

      <h2 className="sig-rise" style={styles.text}>
        Markanızın <br />
        <span style={styles.highlight}>Şansı</span>
      </h2>
    </section>
  );
}
