import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SignatureScene() {
  const containerRef = useRef(null);
  const signatureRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Animasyon daha erken başlar
          end: "center 40%", // Animasyon sayfanın ortalarında tamamen bitmiş olur
          scrub: 0.5, // Gecikme azaltıldı, daha tepkisel
        }
      });

      // El yazısının soldan sağa çizilme efekti (Clip Path animasyonu)
      tl.fromTo(signatureRef.current, 
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
        { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.5, ease: "power1.inOut" }
      )
      // Metnin devasa yükselişi
      .fromTo(textRef.current, 
        { y: 100, opacity: 0, scale: 0.8 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.7)" }, 
        "-=0.5"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
      fontFamily: "'Great Vibes', cursive",
      fontSize: 'clamp(5rem, 15vw, 12rem)',
      color: 'var(--color-gold)',
      lineHeight: '1',
      fontWeight: '400',
      textShadow: '0 0 20px rgba(255, 236, 175, 0.3)',
      // Clip path animasyonu için gerekli ayarlar
      paddingRight: '1rem', // Son harfin kesilmemesi için
      display: 'inline-block'
    },
    text: {
      fontSize: 'clamp(2.5rem, 8vw, 6rem)',
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
    <section ref={containerRef} style={styles.section}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        `}
      </style>
      <div style={styles.signatureContainer}>
        <div ref={signatureRef} style={styles.signatureText}>
          suerta
        </div>
      </div>
      
      <h2 ref={textRef} style={styles.text}>
        Markanızın <br/>
        <span style={styles.highlight}>Şansı</span>
      </h2>
    </section>
  );
}
