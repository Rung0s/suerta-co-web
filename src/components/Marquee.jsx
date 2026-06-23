import React from 'react';

export default function Marquee() {
  const styles = {
    marqueeContainer: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      width: '100%',
      background: 'transparent',
      color: 'var(--color-gold)',
      padding: '0.6rem 0',
      borderTop: '1px solid rgba(255, 236, 175, 0.1)',
      borderBottom: '1px solid rgba(255, 236, 175, 0.1)',
      position: 'relative',
      zIndex: 10
    },
    marqueeContent: {
      display: 'inline-block',
      animation: 'marquee 40s linear infinite',
      fontSize: '0.9rem',
      fontWeight: '500',
      letterSpacing: '4px',
      textTransform: 'uppercase'
    },
    item: {
      margin: '0 2rem',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '1rem',
      opacity: 0.8
    },
    star: {
      color: 'rgba(255, 236, 175, 0.3)',
      fontSize: '1rem'
    }
  };

  const words = [
    "WEB TASARIMI",
    "YAPAY ZEKA ENTEGRASYONU",
    "E-TİCARET SİSTEMLERİ",
    "UI/UX MİMARİSİ",
    "MARKA KİMLİĞİ",
    "OTOMASYON"
  ];

  // Repeat the array to make the infinite loop seamless
  const duplicatedWords = [...words, ...words, ...words, ...words];

  return (
    <div style={styles.marqueeContainer}>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
      <div style={styles.marqueeContent}>
        {duplicatedWords.map((word, index) => (
          <span key={index} style={styles.item}>
            {word} <span style={styles.star}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
