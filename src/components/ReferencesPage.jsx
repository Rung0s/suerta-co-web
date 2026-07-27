import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { referencesData, categories } from '../data/references';

export default function ReferencesPage() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [selectedProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  const filteredData = activeCategory === "Tümü" 
    ? referencesData 
    : referencesData.filter(item => item.category === activeCategory);

  const styles = {
    wrapper: {
      padding: '120px 5vw 100px',
      minHeight: '100vh',
      background: 'var(--color-bg)',
    },
    header: {
      textAlign: 'center',
      marginBottom: '4rem'
    },
    title: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontFamily: 'var(--font-main)',
      color: 'var(--color-text)',
      fontWeight: '800',
      textTransform: 'uppercase',
      marginBottom: '1rem'
    },
    subtitle: {
      color: 'var(--color-secondary)',
      fontSize: '1.1rem',
      maxWidth: '600px',
      margin: '0 auto'
    },
    filterContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '1rem',
      marginBottom: '4rem'
    },
    filterBtn: (isActive) => ({
      padding: '0.6rem 1.5rem',
      background: isActive ? 'var(--color-gold)' : 'transparent',
      color: isActive ? '#111' : 'var(--color-text)',
      border: `1px solid ${isActive ? 'var(--color-gold)' : 'rgba(255,255,255,0.2)'}`,
      borderRadius: '50px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      outline: 'none'
    }),
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '2.5rem'
    },
    card: {
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '24px',
      overflow: 'hidden',
      cursor: 'pointer',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    },
    imageContainer: {
      width: '100%',
      aspectRatio: '16 / 9',
      overflow: 'hidden',
      position: 'relative'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'top center',
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
    },
    cardContent: {
      padding: '2rem'
    },
    categoryTag: {
      color: 'var(--color-gold)',
      fontSize: '0.75rem',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      marginBottom: '0.5rem',
      display: 'block'
    },
    cardTitle: {
      color: '#fff',
      fontSize: '1.5rem',
      fontFamily: 'var(--font-main)',
      fontWeight: '600',
      marginBottom: '0.5rem'
    },
    cardDesc: {
      color: 'var(--color-secondary)',
      fontSize: '0.9rem'
    },
    iconWrapper: {
      position: 'absolute',
      top: '1.5rem',
      right: '1.5rem',
      width: '40px',
      height: '40px',
      background: 'rgba(0,0,0,0.5)',
      backdropFilter: 'blur(10px)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      opacity: 0,
      transform: 'scale(0.8)',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h1 style={styles.title}>Projelerimiz</h1>
        <p style={styles.subtitle}>İmza attığımız seçkin projeler ve sağladığımız dijital çözümler.</p>
      </div>

      <div style={styles.filterContainer}>
        {categories.map(cat => (
          <button 
            key={cat}
            style={styles.filterBtn(activeCategory === cat)}
            onClick={() => setActiveCategory(cat)}
            onMouseEnter={(e) => {
              if (activeCategory !== cat) e.currentTarget.style.borderColor = 'var(--color-gold)';
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== cat) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout style={styles.grid}>
        <AnimatePresence>
          {filteredData.map(item => (
            <motion.div
              layoutId={`card-${item.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              key={item.id}
              className="luxury-card"
              onClick={() => {
                window.location.href = `/referanslar/${item.id}`;
              }}
              style={{...styles.card, textDecoration: 'none'}}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector('.card-img').style.transform = 'scale(1.08)';
                e.currentTarget.querySelector('.card-icon').style.opacity = '1';
                e.currentTarget.querySelector('.card-icon').style.transform = 'scale(1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.querySelector('.card-img').style.transform = 'scale(1)';
                e.currentTarget.querySelector('.card-icon').style.opacity = '0';
                e.currentTarget.querySelector('.card-icon').style.transform = 'scale(0.8)';
              }}
            >
              <div style={styles.imageContainer}>
                <img src={item.image} alt={item.name} loading="lazy" className="card-img" style={styles.image} />
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.75)', pointerEvents: 'none', zIndex: 1 }} />
                <div className="card-icon" style={{...styles.iconWrapper, zIndex: 2}}>
                  <ArrowUpRight size={20} />
                </div>
              </div>
              <div style={styles.cardContent}>
                <span style={styles.categoryTag}>{item.category}</span>
                <h3 style={styles.cardTitle}>{item.name}</h3>
                <p style={styles.cardDesc}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
