import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function TeamSection() {
  const [ref1, isVisible1] = useScrollReveal();
  const [ref2, isVisible2] = useScrollReveal(0.2);

  const styles = {
    section: {
      padding: '10rem 2rem',
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg)'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '5rem'
    },
    header: {
      textAlign: 'center',
      opacity: isVisible1 ? 1 : 0,
      transform: isVisible1 ? 'translateY(0)' : 'translateY(40px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
    },
    title: {
      fontSize: 'clamp(3rem, 6vw, 5rem)',
      fontFamily: 'var(--font-heading)',
      color: 'var(--color-text)',
      marginBottom: '1rem',
      letterSpacing: '-1px'
    },
    subtitle: {
      fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
      color: 'rgba(255, 255, 255, 0.7)',
      fontFamily: 'var(--font-main)',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: '1.6'
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2.5rem',
      opacity: isVisible2 ? 1 : 0,
      transform: isVisible2 ? 'translateY(0)' : 'translateY(40px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
    },
    memberCard: {
      borderRadius: '24px',
      padding: '4rem 2rem',
      textAlign: 'center',
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      transition: 'all 0.4s ease',
      cursor: 'pointer'
    },
    avatarPlaceholder: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(255,236,175,0.1), rgba(154,22,31,0.15))',
      border: '1px solid rgba(255,236,175,0.2)',
      margin: '0 auto 2.5rem auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2.5rem',
      color: 'var(--color-gold)',
      fontFamily: 'var(--font-heading)',
      fontStyle: 'italic',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    },
    memberName: {
      fontSize: '1.8rem',
      fontFamily: 'var(--font-main)',
      fontWeight: '600',
      marginBottom: '0.8rem',
      color: 'var(--color-text)'
    },
    memberRole: {
      color: 'var(--color-accent)',
      fontWeight: '700',
      marginBottom: '1.5rem',
      fontSize: '0.9rem',
      letterSpacing: '2px',
      textTransform: 'uppercase'
    },
    memberDesc: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '1rem',
      lineHeight: '1.6',
      fontFamily: 'var(--font-main)'
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
    <section id="team" style={styles.section}>
      <div style={styles.container}>
        
        <div ref={ref1} style={styles.header}>
          <h2 style={styles.title}>Ekibimiz</h2>
          <p style={styles.subtitle}>
            T-Tipi Organizasyon yapımızla hızlı, esnek ve dikey uzmanlık odaklı çalışan <strong>Çekirdek Kadromuz.</strong>
          </p>
        </div>
        
        <div ref={ref2} style={styles.teamGrid}>
          {team.map((member, idx) => (
            <div 
              key={idx} 
              style={styles.memberCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-gold)';
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.6)';
                e.currentTarget.querySelector('.avatar').style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.querySelector('.avatar').style.transform = 'scale(1)';
              }}
            >
              <div style={{...styles.avatarPlaceholder, transition: 'transform 0.4s ease'}} className="avatar">
                {member.initial}
              </div>
              <h4 style={styles.memberName}>{member.name}</h4>
              <div style={styles.memberRole}>{member.role}</div>
              <p style={styles.memberDesc}>{member.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
