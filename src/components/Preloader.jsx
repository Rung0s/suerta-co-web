import React, { useEffect, useState } from 'react';
import logoUrl from '../assets/suerta-logo.svg';

export default function Preloader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('suertaHasVisited');
    if (hasVisited) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('suertaHasVisited', 'true');
      setTimeout(onComplete, 500); // Wait for faster fade out animation
    }, 1500); // 1.5s display + 0.5s fade out = 2s total
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
    animationContainer: {
      position: 'relative',
      width: '150px',
      height: '150px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    circleTop: {
      position: 'absolute',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: 'var(--color-gold)',
      filter: 'blur(4px)',
      animation: 'topCircle 2s cubic-bezier(0.65, 0, 0.35, 1) forwards'
    },
    circleBottom: {
      position: 'absolute',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: 'var(--color-accent)',
      filter: 'blur(4px)',
      animation: 'bottomCircle 2s cubic-bezier(0.65, 0, 0.35, 1) forwards'
    },
    logoWrapper: {
      position: 'absolute',
      width: '120px',
      height: 'auto',
      animation: 'logoReveal 2.5s cubic-bezier(0.65, 0, 0.35, 1) forwards',
      zIndex: 10
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
          @keyframes topCircle {
            0% { transform: translateY(-50vh) scale(0.5); opacity: 0; }
            40% { transform: translateY(0) scale(1); opacity: 0.8; }
            55% { transform: scale(1.5); opacity: 0; }
            100% { transform: scale(1.5); opacity: 0; }
          }
          @keyframes bottomCircle {
            0% { transform: translateY(50vh) scale(0.5); opacity: 0; }
            40% { transform: translateY(0) scale(1); opacity: 0.8; }
            55% { transform: scale(1.5); opacity: 0; }
            100% { transform: scale(1.5); opacity: 0; }
          }
          @keyframes logoReveal {
            0%, 50% { opacity: 0; transform: scale(0.8); }
            70% { opacity: 1; transform: scale(1.1); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes loadProgress {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
          }
        `}
      </style>
      <div style={styles.animationContainer}>
        <div style={styles.circleTop} />
        <div style={styles.circleBottom} />
        <div style={styles.logoWrapper}>
          <img src={logoUrl} alt="Suerta Co" style={{ width: '100%', height: 'auto', filter: 'drop-shadow(0 0 20px rgba(255, 236, 175, 0.4))' }} />
        </div>
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
