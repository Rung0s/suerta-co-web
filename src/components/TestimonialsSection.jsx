import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  { 
    id: 1, 
    text: "Otelimizin dijital dönüşümünde Suerta Co. ile çalışmak verdiğimiz en doğru karardı. Komisyonsuz rezervasyon sistemi sayesinde doğrudan satışlarımız %40 arttı. Tasarımın şıklığı gerçekten muazzam.", 
    author: "EMSA OTEL", 
    role: "Yönetim Kurulu"
  },
  { 
    id: 2, 
    text: "Sanat galerimiz için oluşturdukları dijital vitrin tek kelimeyle kusursuz. Eserlerimizi lüks ve zarif bir arayüzle sergilememizi sağladılar. Estetik vizyonları çok üst düzeyde.", 
    author: "ROASTERS", 
    role: "Kurucu Ortak"
  },
  { 
    id: 3, 
    text: "Projelerimizi sergilediğimiz portfolyo sitesi inanılmaz bir hıza ve pürüzsüz animasyonlara kavuştu. Kullanıcı deneyimine (UX) bu kadar odaklanan bir ekiple çalışmak çok keyifliydi.", 
    author: "NOVA MİMARLIK", 
    role: "Baş Mimar"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const styles = {
    section: {
      backgroundColor: 'transparent',
      padding: '10rem 2rem',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative'
    },
    header: {
      textAlign: 'center',
      marginBottom: '4rem'
    },
    title: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontFamily: 'var(--font-main)',
      color: 'var(--color-text)',
      marginBottom: '1rem',
      fontWeight: '800',
      textTransform: 'uppercase'
    },
    subtitle: {
      color: 'var(--color-gold)',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      fontSize: '0.9rem'
    },
    sliderWrapper: {
      position: 'relative',
      height: '500px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    card: {
      position: 'absolute',
      width: '100%',
      maxWidth: '700px',
      padding: '4rem 3rem',
      borderRadius: '30px',
      background: 'rgba(20, 20, 20, 0.4)', // Cam taban
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      // Backdrop filter is applied via motion style to animate blur
    },
    quoteIcon: {
      color: 'var(--color-accent)', // Bordo
      marginBottom: '2rem',
      opacity: 0.8
    },
    text: {
      fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
      lineHeight: '1.8',
      fontFamily: 'var(--font-main)',
      color: 'var(--color-text)',
      marginBottom: '3rem',
      fontStyle: 'italic',
      fontWeight: '300'
    },
    authorBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem'
    },
    authorName: {
      fontFamily: 'var(--font-main)',
      fontSize: '1.5rem',
      fontWeight: '800',
      color: 'var(--color-gold)',
      letterSpacing: '2px',
      textTransform: 'uppercase'
    },
    authorRole: {
      fontSize: '0.85rem',
      color: 'rgba(255, 255, 255, 0.5)',
      textTransform: 'uppercase',
      letterSpacing: '2px'
    },
    controls: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      marginTop: '3rem'
    },
    button: {
      background: 'transparent',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-text)',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <section style={styles.section} id="testimonials">
      <div style={styles.container}>
        
        <div style={styles.header}>
          <h2 style={styles.title}>Ortaklıklar</h2>
          <div style={styles.subtitle}>Birlikte Büyüdüğümüz Markalar</div>
        </div>

        <div style={styles.sliderWrapper}>
          <AnimatePresence initial={false}>
            {testimonials.map((t, index) => {
              // Göreceli konumu hesapla: 0 (aktif), -1 (sol), 1 (sağ)
              let offset = index - currentIndex;
              if (offset < -1) offset += testimonials.length;
              if (offset > 1) offset -= testimonials.length;

              const isActive = offset === 0;

              return (
                <motion.div
                  key={t.id}
                  initial={{ 
                    x: offset > 0 ? 300 : -300, 
                    opacity: 0, 
                    scale: 0.8 
                  }}
                  animate={{
                    x: offset * 400, // Sağdaki 400px sağa, soldaki 400px sola
                    opacity: isActive ? 1 : 0.4,
                    scale: isActive ? 1 : 0.85,
                    zIndex: isActive ? 10 : 5,
                    filter: isActive ? 'blur(0px)' : 'blur(10px)',
                    backdropFilter: isActive ? 'blur(20px)' : 'blur(5px)'
                  }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  style={{
                    ...styles.card,
                    borderTop: isActive ? '2px solid var(--color-accent)' : '1px solid rgba(255, 255, 255, 0.05)',
                    // Eğer aktif değilse arkadaki kartların tıklamalarını devre dışı bırak
                    pointerEvents: isActive ? 'auto' : 'none'
                  }}
                >
                  <Quote size={40} style={styles.quoteIcon} />
                  <p style={styles.text}>"{t.text}"</p>
                  
                  <div style={styles.authorBox}>
                    <div style={styles.authorName}>{t.author}</div>
                    <div style={styles.authorRole}>{t.role}</div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Kontroller */}
        <div style={styles.controls}>
          <button 
            style={styles.button} 
            onClick={handlePrev}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-accent)';
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.color = 'var(--color-text)';
            }}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            style={styles.button} 
            onClick={handleNext}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-accent)';
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.color = 'var(--color-text)';
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

      </div>
    </section>
  );
}
