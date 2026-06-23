import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function AboutSection() {
  const [ref1, isVisible1] = useScrollReveal();
  const [ref2, isVisible2] = useScrollReveal(0.2);
  const [ref3, isVisible3] = useScrollReveal(0.2);

  const styles = {
    section: {
      padding: '8rem 2rem',
      position: 'relative'
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
      fontSize: '2.5rem',
      marginBottom: '1rem'
    },
    subtitle: {
      color: 'var(--color-gold)',
      fontWeight: '600',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      fontSize: '0.9rem',
      marginBottom: '1rem',
      display: 'block'
    },
    contentBox: {
      borderRadius: '16px',
      padding: '4rem',
      opacity: isVisible2 ? 1 : 0,
      transform: isVisible2 ? 'translateY(0)' : 'translateY(40px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
    },
    paragraph: {
      fontSize: '1.2rem',
      lineHeight: '1.8',
      color: 'var(--color-text)',
      marginBottom: '1.5rem',
      textAlign: 'justify'
    },
    highlight: {
      color: 'var(--color-gold)',
      fontWeight: '600'
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem',
      opacity: isVisible3 ? 1 : 0,
      transform: isVisible3 ? 'translateY(0)' : 'translateY(40px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
    },
    memberCard: {
      borderRadius: '16px',
      padding: '2.5rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    avatarPlaceholder: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(255,236,175,0.1), rgba(154,22,31,0.1))',
      border: '2px solid rgba(255,236,175,0.3)',
      margin: '0 auto 1.5rem auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2.5rem',
      color: 'var(--color-gold)',
      fontWeight: '800'
    },
    memberName: {
      fontSize: '1.5rem',
      marginBottom: '0.5rem'
    },
    memberRole: {
      color: 'var(--color-gold)',
      fontWeight: '600',
      marginBottom: '1rem',
      fontSize: '0.9rem',
      letterSpacing: '1px',
      textTransform: 'uppercase'
    },
    memberDesc: {
      color: 'var(--color-secondary)',
      fontSize: '0.9rem',
      lineHeight: '1.6',
      marginBottom: '1.5rem'
    },
    socialLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem'
    },
    socialIcon: {
      color: 'var(--color-secondary)',
      transition: 'color 0.2s',
      cursor: 'pointer'
    }
  };

  const team = [
    {
      name: 'Sunay',
      role: 'Frontend / AI Mimarı',
      desc: 'Pixel-perfect UI ve yapay zeka destekli Vibe Coding entegrasyonu.',
      initial: 'S'
    },
    {
      name: 'Erdem',
      role: 'Backend / Veritabanı',
      desc: 'Ölçeklenebilir sistem mimarisi ve kusursuz veri akışı yönetimi.',
      initial: 'E'
    },
    {
      name: 'Tunahan',
      role: 'Ürün / Tasarım',
      desc: 'Kullanıcı deneyimi, yaratıcı strateji ve müşteri iletişimi köprüsü.',
      initial: 'T'
    }
  ];

  return (
    <section id="about" style={styles.section}>
      <div style={styles.container}>


        <div ref={ref3} id="team" style={{ paddingTop: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ekibimiz</h3>
            <p style={{ color: 'var(--color-secondary)' }}>T-Tipi Organizasyon yapımızla hızlı, esnek ve dikey uzmanlık odaklı çalışıyoruz.</p>
          </div>
          <div style={styles.teamGrid}>
            {team.map((member, idx) => (
              <div 
                key={idx} 
                style={styles.memberCard}
                className="glass-panel service-card-fx"
              >
                <div style={styles.avatarPlaceholder}>{member.initial}</div>
                <h4 style={styles.memberName}>{member.name}</h4>
                <div style={styles.memberRole}>{member.role}</div>
                <p style={styles.memberDesc}>{member.desc}</p>
                
                <div style={styles.socialLinks}>
                  <a href="#" style={styles.socialIcon} onMouseOver={e => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-secondary)'}>GitHub</a>
                  <a href="#" style={styles.socialIcon} onMouseOver={e => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-secondary)'}>LinkedIn</a>
                  <a href="#" style={styles.socialIcon} onMouseOver={e => e.currentTarget.style.color = 'var(--color-gold)'} onMouseOut={e => e.currentTarget.style.color = 'var(--color-secondary)'}>Instagram</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
