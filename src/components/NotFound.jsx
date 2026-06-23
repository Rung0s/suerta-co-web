import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import MagneticButton from './MagneticButton';
import PageTransition from './PageTransition';

export default function NotFound() {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      textAlign: 'center',
      padding: '2rem'
    },
    errorCode: {
      fontFamily: 'var(--font-hero)',
      fontSize: 'clamp(6rem, 15vw, 12rem)',
      fontWeight: '900',
      color: 'var(--color-gold)',
      lineHeight: '1',
      textShadow: '0 0 40px rgba(255, 236, 175, 0.3)',
      marginBottom: '1rem'
    },
    title: {
      fontFamily: 'var(--font-heading)',
      fontSize: '2rem',
      fontWeight: '700',
      marginBottom: '1rem'
    },
    desc: {
      color: 'var(--color-secondary)',
      fontSize: '1.2rem',
      maxWidth: '500px',
      marginBottom: '3rem',
      lineHeight: '1.6'
    }
  };

  return (
    <PageTransition>
      <div style={styles.container}>
        <div style={styles.errorCode}>404</div>
        <h1 style={styles.title}>Kayboldunuz Sanırım</h1>
        <p style={styles.desc}>Aradığınız sayfa uzay boşluğunda kaybolmuş olabilir veya hiçbir zaman var olmadı. Güvenli bölgeye dönmek için aşağıdaki butonu kullanabilirsiniz.</p>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <MagneticButton className="magnetic-btn-primary">
            <Home size={20} /> Ana Sayfaya Dön
          </MagneticButton>
        </Link>
      </div>
    </PageTransition>
  );
}
