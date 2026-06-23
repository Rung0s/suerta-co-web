import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function AboutSection() {
  const [ref1, isVisible1] = useScrollReveal();
  const [ref2, isVisible2] = useScrollReveal(0.2);
  const [ref3, isVisible3] = useScrollReveal(0.2);

  const styles = {
    section: {
      padding: '10rem 2rem',
      position: 'relative',
      backgroundColor: 'var(--color-bg)'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '8rem'
    },
    visionSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '3rem',
      maxWidth: '900px',
      margin: '0 auto',
      textAlign: 'center',
      opacity: isVisible1 ? 1 : 0,
      transform: isVisible1 ? 'translateY(0)' : 'translateY(40px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
    },
    visionTitle: {
      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
      fontFamily: 'var(--font-heading)',
      color: 'var(--color-text)',
      lineHeight: '1.2'
    },
    visionHighlight: {
      color: 'var(--color-gold)',
      fontStyle: 'italic'
    },
    visionText: {
      fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
      lineHeight: '2',
      color: 'rgba(255, 255, 255, 0.7)',
      fontFamily: 'var(--font-main)',
      fontWeight: '300'
    },
    statsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
      opacity: isVisible2 ? 1 : 0,
      transform: isVisible2 ? 'translateY(0)' : 'translateY(40px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      padding: '4rem 0'
    },
    statBox: {
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '3.5rem',
      fontFamily: 'var(--font-heading)',
      color: 'var(--color-accent)',
      marginBottom: '0.5rem'
    },
    statLabel: {
      fontSize: '0.9rem',
      color: 'var(--color-gold)',
      letterSpacing: '2px',
      textTransform: 'uppercase'
    },
    teamSection: {
      opacity: isVisible3 ? 1 : 0,
      transform: isVisible3 ? 'translateY(0)' : 'translateY(40px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
    },
    teamHeader: {
      textAlign: 'center',
      marginBottom: '4rem'
    },
    teamTitle: {
      fontSize: '3rem',
      fontFamily: 'var(--font-heading)',
      marginBottom: '1rem'
    },
    teamSubtitle: {
      color: 'var(--color-secondary)',
      fontSize: '1.1rem'
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2.5rem'
    },
    memberCard: {
      borderRadius: '24px',
      padding: '3rem 2rem',
      textAlign: 'center',
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      transition: 'all 0.4s ease'
    },
    avatarPlaceholder: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(255,236,175,0.1), rgba(154,22,31,0.15))',
      border: '1px solid rgba(255,236,175,0.2)',
      margin: '0 auto 2rem auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      color: 'var(--color-gold)',
      fontFamily: 'var(--font-heading)',
      fontStyle: 'italic'
    },
    memberName: {
      fontSize: '1.5rem',
      fontFamily: 'var(--font-main)',
      fontWeight: '500',
      marginBottom: '0.5rem'
    },
    memberRole: {
      color: 'var(--color-accent)',
      fontWeight: '600',
      marginBottom: '1.5rem',
      fontSize: '0.85rem',
      letterSpacing: '2px',
      textTransform: 'uppercase'
    },
    memberDesc: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.95rem',
      lineHeight: '1.6'
    }
  };

  const team = [
    {
      name: 'Sunay',
      role: 'Frontend / AI Mimarı',
      desc: 'Pixel-perfect UI ve yapay zeka destekli kod mimarisinin ardındaki zeka.',
      initial: 'S'
    },
    {
      name: 'Erdem',
      role: 'Backend / Veritabanı',
      desc: 'Ölçeklenebilir sistem mimarisi ve kusursuz veri akışı yönetiminin beyni.',
      initial: 'E'
    },
    {
      name: 'Tunahan',
      role: 'Ürün / Tasarım',
      desc: 'Kullanıcı deneyimi, yaratıcı strateji ve estetik vizyonun kalbi.',
      initial: 'T'
    }
  ];

  return (
    <section id="about" style={styles.section}>
      <div style={styles.container}>
        
        {/* Vizyon ve Hakkımızda */}
        <div ref={ref1} style={styles.visionSection}>
          <h2 style={styles.visionTitle}>
            Sıradanlığa Karşı <span style={styles.visionHighlight}>Estetik Bir İsyan</span>
          </h2>
          <p style={styles.visionText}>
            Dijital dünya, birbirinin kopyası sıkıcı şablonlar ve ruhsuz tasarımlarla dolu. Biz <strong>Suerta Co.</strong> olarak bu gürültünün içinde piyasadaki o büyük estetik açığı kapatmak için varız. Sadece kod yazmıyoruz; markanızın karakterini yansıtan, kullanıcıyı içine çeken "Site of the Year" (SOTY) standartlarında dijital sanat eserleri inşa ediyoruz. Amacımız ziyaretçilerinizi etkilemek değil, onlarda kalıcı bir iz bırakmak.
          </p>
        </div>

        {/* Ara İstatistikler / Vurgular */}
        <div ref={ref2} style={styles.statsContainer}>
          <div style={styles.statBox}>
            <div style={styles.statNumber}>100%</div>
            <div style={styles.statLabel}>Bespoke Tasarım</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statNumber}>SOTY</div>
            <div style={styles.statLabel}>Estetik Vizyon</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statLabel} style={{...styles.statLabel, marginTop: '2rem'}}>Şablon Yok. Kopyalama Yok. Sadece Saf Yaratıcılık.</div>
          </div>
        </div>

      </div>
    </section>
  );
}
