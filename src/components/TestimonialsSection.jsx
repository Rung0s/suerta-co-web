import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import useIsMobile from '../hooks/useIsMobile';

const testimonials = [
  { 
    id: 1, 
    text: "Otelimizin dijital dönüşümünde suerta co. ile çalışmak verdiğimiz en doğru karardı. Komisyonsuz rezervasyon sistemi sayesinde doğrudan satışlarımız %40 arttı. Tasarımın şıklığı gerçekten muazzam.", 
    author: "EMSA OTEL", 
    role: "Yönetim Kurulu"
  },
  { 
    id: 2, 
    text: "Eğitim platformumuzu dijitale taşırken hem öğrenci deneyimi hem de modern bir arayüz arıyorduk. Kusursuz UX tasarımı ve performans odaklı LMS altyapıları ile beklentimizin çok üstüne çıktılar.", 
    author: "RÖNESANS EDU", 
    role: "Kurucu Ortak"
  },
  { 
    id: 3, 
    text: "Evcil hayvan ürünleri sattığımız e-ticaret sitemiz, hem mobil alışveriş akışında hem de hızında inanılmaz bir seviyeye ulaştı. Özel sepet ve ödeme optimizasyonları dönüşüm oranımızı katladı.", 
    author: "PAWSEC SHOP", 
    role: "E-Ticaret Müdürü"
  },
  { 
    id: 4, 
    text: "Bir dijital ajans olarak kendi portfolyomuzu yansıtırken çok daha seçiciydik. suerta co., aradığımız premium 'dark mode' estetiğini mükemmel animasyonlarla birleştirerek harika bir iş çıkardı.", 
    author: "ARGÜMAN FABRİKASI", 
    role: "Ajans Başkanı"
  }
];

export default function TestimonialsSection() {
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const isMobile = useIsMobile(768);

  const paginate = useCallback((newDirection) => {
    setCurrentIndex(([prevIndex]) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return [nextIndex, newDirection];
    });
  }, []);

  // Otomatik dönme (Auto-play) zamanlayıcısı (5 saniyede bir)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, paginate]);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.95,
      filter: 'blur(8px)'
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (dir) => ({
      x: dir < 0 ? 120 : -120,
      opacity: 0,
      scale: 0.95,
      filter: 'blur(8px)',
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    })
  };

  const styles = {
    section: {
      position: 'relative',
      padding: isMobile ? '5rem 1rem' : '7rem 2rem',
      background: 'linear-gradient(to bottom, #0a0a0c 0%, rgba(255, 255, 255, 0.01) 50%, #0a0a0c 100%)',
      overflow: 'hidden',
      zIndex: 1
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      width: '100%'
    },
    header: {
      textAlign: 'center',
      marginBottom: isMobile ? '3.5rem' : '5rem',
      position: 'relative',
      zIndex: 20
    },
    title: {
      fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
      fontFamily: 'var(--font-main)',
      color: 'var(--color-text)',
      marginBottom: '0.8rem',
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: '-0.5px'
    },
    subtitle: {
      color: 'var(--color-gold)',
      letterSpacing: '3px',
      textTransform: 'uppercase',
      fontSize: '0.9rem',
      fontWeight: '600'
    },
    sliderWrapper: {
      position: 'relative',
      minHeight: isMobile ? '420px' : '320px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      maxWidth: '850px',
      margin: '0 auto',
    },
    card: {
      width: '100%',
      padding: isMobile ? '2.5rem 1.5rem' : '3.5rem 4rem',
      boxSizing: 'border-box',
      borderRadius: '30px',
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative'
    },
    quoteIcon: {
      color: 'var(--color-accent)', 
      marginBottom: '1.5rem',
      opacity: 0.8
    },
    text: {
      fontSize: isMobile ? '1.05rem' : '1.25rem',
      lineHeight: '1.8',
      fontFamily: 'var(--font-main)',
      color: 'var(--color-text)',
      marginBottom: '2.5rem',
      fontStyle: 'italic',
      fontWeight: '300',
      maxWidth: '700px'
    },
    authorBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.4rem'
    },
    authorName: {
      fontFamily: 'var(--font-main)',
      fontSize: isMobile ? '1.3rem' : '1.5rem',
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
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      marginTop: isMobile ? '2.5rem' : '3.5rem',
      position: 'relative',
      zIndex: 20
    },
    navButton: {
      width: '46px',
      height: '46px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      color: 'var(--color-text)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      outline: 'none'
    },
    dotsContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.8rem'
    },
    dot: {
      height: '10px',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      border: 'none',
      outline: 'none',
      padding: 0
    }
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section style={styles.section} id="testimonials">
      <div style={styles.container}>
        
        <div style={styles.header}>
          <h2 style={styles.title}>Ortaklıklar</h2>
          <div style={styles.subtitle}>Birlikte Büyüdüğümüz Markalar</div>
        </div>

        <div 
          style={styles.sliderWrapper}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="luxury-card"
              style={styles.card}
            >
              <Quote size={36} style={styles.quoteIcon} />
              <p style={styles.text}>"{currentTestimonial.text}"</p>
              
              <div style={styles.authorBox}>
                <div style={styles.authorName}>{currentTestimonial.author}</div>
                <div style={styles.authorRole}>{currentTestimonial.role}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Kontroller: Oklar ve Gösterge Noktaları */}
        <div style={styles.controls}>
          <button 
            style={styles.navButton}
            onClick={() => paginate(-1)}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-gold)';
              e.currentTarget.style.background = 'rgba(255, 236, 175, 0.1)';
              e.currentTarget.style.color = 'var(--color-gold)';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.color = 'var(--color-text)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label="Önceki Yorum"
          >
            <ChevronLeft size={22} />
          </button>

          <div style={styles.dotsContainer}>
            {testimonials.map((t, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    const dir = idx > currentIndex ? 1 : -1;
                    setCurrentIndex([idx, dir]);
                  }}
                  style={{
                    ...styles.dot,
                    width: isActive ? '32px' : '10px',
                    background: isActive ? 'var(--color-gold)' : 'rgba(255, 255, 255, 0.2)',
                    boxShadow: isActive ? '0 0 15px rgba(255, 236, 175, 0.6)' : 'none'
                  }}
                  aria-label={`${t.author} Yorumu`}
                />
              );
            })}
          </div>

          <button 
            style={styles.navButton}
            onClick={() => paginate(1)}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-gold)';
              e.currentTarget.style.background = 'rgba(255, 236, 175, 0.1)';
              e.currentTarget.style.color = 'var(--color-gold)';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.color = 'var(--color-text)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label="Sonraki Yorum"
          >
            <ChevronRight size={22} />
          </button>
        </div>

      </div>
    </section>
  );
}
