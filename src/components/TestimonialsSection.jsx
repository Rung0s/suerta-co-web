import React from 'react';
import { Quote } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function TestimonialsSection() {
  const [ref1, isVisible1] = useScrollReveal();

  const testimonials = [
    {
      id: 1,
      name: 'A. P.',
      company: 'Emsa Hotel',
      text: 'Otelimizin dijital dönüşümünde Suerta Co. ile çalışmak verdiğimiz en doğru karardı. Komisyonsuz rezervasyon sistemi sayesinde doğrudan satışlarımız %40 arttı. Tasarımın şıklığı ve sistemin hızı gerçekten muazzam.',
    },
    {
      id: 2,
      name: 'S. S.',
      company: 'Euromos Art',
      text: 'Sanat galerimiz için oluşturdukları dijital vitrin tek kelimeyle kusursuz. Eserlerimizi lüks ve zarif bir arayüzle sergilememizi sağladılar. Estetik vizyonları ve teknik becerileri çok üst düzeyde.',
    },
    {
      id: 3,
      name: 'M. K.',
      company: 'Nova Mimarlık',
      text: 'Projelerimizi sergilediğimiz portfolyo sitesi inanılmaz bir hıza ve pürüzsüz animasyonlara kavuştu. Kullanıcı deneyimine (UX) bu kadar odaklanan bir ekiple çalışmak çok keyifliydi.',
    }
  ];

  const styles = {
    section: {
      padding: '8rem 2rem',
      position: 'relative',
      zIndex: 1,
      background: 'rgba(154, 22, 31, 0.01)',
      borderTop: '1px solid rgba(255,255,255,0.02)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '4rem',
      opacity: isVisible1 ? 1 : 0,
      transform: isVisible1 ? 'translateY(0)' : 'translateY(40px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '1rem'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2.5rem',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    card: {
      padding: '3rem 2rem',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'var(--transition-liquid)'
    },
    quoteIcon: {
      color: 'var(--color-gold)',
      opacity: 0.3,
      marginBottom: '1.5rem'
    },
    text: {
      fontSize: '1.05rem',
      lineHeight: '1.8',
      color: 'var(--color-text)',
      marginBottom: '2rem',
      fontStyle: 'italic'
    },
    authorBox: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    avatar: {
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      background: 'rgba(255,236,175,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-gold)',
      fontWeight: '700',
      fontSize: '1.1rem'
    },
    authorName: {
      fontWeight: '700',
      fontSize: '1rem'
    },
    authorCompany: {
      color: 'var(--color-gold)',
      fontSize: '0.85rem',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.header} ref={ref1}>
        <h2 style={styles.title}>Ortaklarımızın Gözünden</h2>
        <p style={{ color: 'var(--color-secondary)' }}>Birlikte büyüdüğümüz ve dijital sahnede başarıya ulaştırdığımız markalar.</p>
      </div>

      <div style={styles.grid}>
        {testimonials.map((t, i) => (
          <div 
            key={t.id}
            className="glass-panel"
            style={{
              ...styles.card,
              opacity: isVisible1 ? 1 : 0,
              transform: isVisible1 ? 'translateY(0)' : 'translateY(40px)',
              transition: `opacity 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s, box-shadow 0.6s ease, border-color 0.6s ease`
            }}
          >
            <div>
              <Quote size={32} style={styles.quoteIcon} />
              <p style={styles.text}>"{t.text}"</p>
            </div>
            <div style={styles.authorBox}>
              <div style={styles.avatar}>{t.name.charAt(0)}</div>
              <div>
                <div style={styles.authorName}>{t.name}</div>
                <div style={styles.authorCompany}>{t.company}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
