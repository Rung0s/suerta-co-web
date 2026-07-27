import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogsData } from '../data/blogs';
import useIsMobile from '../hooks/useIsMobile';

const MotionLink = motion.create(Link);

export default function BlogSection({ limit }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isMobile = useIsMobile(768);

  // Ana sayfada sınırlı sayıda (limit) göster; /blog sayfasında hepsini göster.
  const displayedBlogs = limit ? blogsData.slice(0, limit) : blogsData;

  const styles = {
    section: {
      padding: '8rem 5vw',
      background: 'linear-gradient(to bottom, #0a0a0c, #0d0d12)',
      position: 'relative',
      zIndex: 1
    },
    header: {
      marginBottom: '5rem',
      textAlign: 'center'
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
      fontSize: '1rem',
      letterSpacing: '2px',
      textTransform: 'uppercase'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '2.5rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '24px',
      padding: isMobile ? '2rem 1.5rem' : '3rem 2.5rem',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      position: 'relative',
      overflow: 'hidden'
    },
    tag: {
      display: 'inline-block',
      padding: '0.5rem 1.2rem',
      background: 'rgba(255, 236, 175, 0.05)',
      border: '1px solid rgba(255, 236, 175, 0.1)',
      color: 'var(--color-gold)',
      borderRadius: '50px',
      fontSize: '0.8rem',
      fontWeight: '600',
      marginBottom: '2rem',
      alignSelf: 'flex-start'
    },
    cardTitle: {
      fontSize: '1.6rem',
      color: '#ffffff',
      fontFamily: 'var(--font-main)',
      marginBottom: '1.5rem',
      lineHeight: '1.4',
      fontWeight: '600',
      transition: 'color 0.3s ease',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    cardDesc: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: '1rem',
      lineHeight: '1.6',
      marginBottom: '1rem',
      flex: 1,
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      paddingTop: '1.5rem',
      marginTop: 'auto'
    },
    date: {
      fontSize: '0.85rem',
      color: 'rgba(255, 255, 255, 0.3)',
      fontWeight: '500'
    },
    iconWrapper: {
      display: 'flex',
      alignItems: 'center',
      color: 'var(--color-gold)',
      transition: 'gap 0.3s ease'
    }
  };

  return (
    <section id="blog" style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>Blog</h2>
        <div style={styles.subtitle}>Vaka Çalışmaları ve Dijital Trendler</div>
      </div>

      <div ref={ref} style={styles.grid}>
        {displayedBlogs.map((post, index) => (
          <MotionLink
            to={`/blog/${post.id}`}
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="luxury-card"
            style={{...styles.card, textDecoration: 'none'}}
            onMouseEnter={(e) => {
              const iconWrapper = e.currentTarget.querySelector('.icon-wrapper');
              if (iconWrapper) iconWrapper.style.gap = '0.5rem';
            }}
            onMouseLeave={(e) => {
              const iconWrapper = e.currentTarget.querySelector('.icon-wrapper');
              if (iconWrapper) iconWrapper.style.gap = '0rem';
            }}
          >
            <span style={{...styles.tag, marginBottom: isMobile ? '1rem' : '2rem'}}>{post.tag}</span>
            <h3 style={{...styles.cardTitle, fontSize: isMobile ? '1.2rem' : '1.6rem'}}>{post.title}</h3>
            <p style={{...styles.cardDesc, fontSize: isMobile ? '0.9rem' : '1rem'}}>{post.desc}</p>
            <div style={{...styles.footer, paddingTop: isMobile ? '0.5rem' : '1.5rem'}}>
              <span style={styles.date}>
                {post.date}
                {post.views != null && (
                  <span style={{ marginLeft: '0.6rem', color: 'rgba(255,236,175,0.5)' }}>
                    • {post.views.toLocaleString('tr-TR')} görüntülenme
                  </span>
                )}
              </span>
              <div className="icon-wrapper" style={styles.iconWrapper}>
                <ArrowUpRight size={20} strokeWidth={1.5} />
              </div>
            </div>
          </MotionLink>
        ))}
      </div>
      
      {/* Daha Fazlası Butonu — yalnızca ana sayfada (limit varsa) */}
      {limit && (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
        <Link to="/blog" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.8rem',
          padding: '1rem 2.5rem',
          background: 'transparent',
          color: 'var(--color-gold)',
          border: '1px solid var(--color-gold)',
          borderRadius: '50px',
          fontWeight: '600',
          fontSize: '1rem',
          textDecoration: 'none',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--color-gold)';
          e.currentTarget.style.color = '#111';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--color-gold)';
        }}
        >
          Tüm Blogları Keşfet <ArrowUpRight size={18} />
        </Link>
      </div>
      )}
    </section>
  );
}
