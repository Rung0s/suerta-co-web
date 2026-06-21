import React, { useEffect, useState } from 'react';
import logoUrl from '../assets/suerta-logo.svg';

export default function Preloader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // Wait for fade out animation
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const styles = {
    overlay: {
      position: 'fixed',
      inset: 0,
      background: 'var(--color-bg)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'opacity 0.8s cubic-bezier(0.65, 0, 0.35, 1), transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'scale(1)' : 'scale(1.1)',
      pointerEvents: isVisible ? 'all' : 'none'
    },
    logoWrapper: {
      width: '150px',
      height: 'auto',
      animation: 'blobSpin 4s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite alternate'
    },
    progressContainer: {
      width: '200px',
      height: '2px',
      background: 'rgba(255,255,255,0.1)',
      marginTop: '3rem',
      borderRadius: '2px',
      overflow: 'hidden'
    },
    progressBar: {
      height: '100%',
      width: '0%',
      background: 'var(--color-gold)',
      animation: 'loadProgress 2.5s cubic-bezier(0.65, 0, 0.35, 1) forwards',
      boxShadow: '0 0 10px var(--color-gold)'
    }
  };

  return (
    <div style={styles.overlay}>
      <style>
        {`
          @keyframes loadProgress {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
        `}
      </style>
      <div style={styles.logoWrapper}>
        <img src={logoUrl} alt="Suerta Co" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 30px rgba(154, 22, 31, 0.5))' }} />
      </div>
      <div style={styles.progressContainer}>
        <div style={styles.progressBar} />
      </div>
      <div style={{ marginTop: '1rem', color: 'var(--color-gold)', fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase' }} className="animate-pulse">
        Sistem Başlatılıyor
      </div>
    </div>
  );
}
