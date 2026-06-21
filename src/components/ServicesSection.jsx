import React from 'react';
import { Monitor, Smartphone, ShieldCheck, Code, Zap } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function ServicesSection() {
  const [ref1, isVisible1] = useScrollReveal();
  const [ref2, isVisible2] = useScrollReveal(0.2);
  const [ref3, isVisible3] = useScrollReveal(0.2);
  const [ref4, isVisible4] = useScrollReveal(0.2);

  const styles = {
    section: {
      padding: '8rem 2rem',
      position: 'relative',
      zIndex: 1
    },
    header: {
      textAlign: 'center',
      marginBottom: '5rem',
      opacity: isVisible1 ? 1 : 0,
      transform: isVisible1 ? 'translateY(0)' : 'translateY(40px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
    },
    title: {
      fontSize: '2.5rem',
      marginBottom: '1rem'
    },
    subtitle: {
      color: 'var(--color-secondary)'
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
      borderRadius: '16px',
      padding: '3rem 2rem',
      transition: 'var(--transition-smooth)',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer'
    },
    iconBox: {
      width: '60px',
      height: '60px',
      borderRadius: '12px',
      background: 'rgba(255, 236, 175, 0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '2rem',
      color: 'var(--color-gold)',
      transition: 'var(--transition-smooth)'
    },
    cardTitle: {
      fontSize: '1.5rem',
      marginBottom: '1rem'
    },
    cardDesc: {
      color: 'var(--color-secondary)',
      lineHeight: '1.7',
      marginBottom: '2rem'
    },
    featureList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    featureItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      color: 'var(--color-text)',
      marginBottom: '1rem',
      fontSize: '0.95rem'
    }
  };

  const services = [
    {
      icon: <Monitor size={28} />,
      title: 'Dijital Vitrin (Web & UI/UX)',
      desc: 'Markanızın ilk intibası her şeydir. Ziyaretçilerinizi müşteriye dönüştüren, estetik açıdan kusursuz, hızlı ve mobil uyumlu kurumsal web siteleri tasarlıyoruz.',
      features: ['Karanlık Mod & Premium Estetik', 'SEO Uyumlu Altyapı', 'Pürüzsüz Animasyonlar', 'Yüksek Dönüşüm Oranlı (CRO) Tasarım'],
      ref: ref2,
      isVisible: isVisible2
    },
    {
      icon: <Code size={28} />,
      title: 'Operasyonel Yazılım',
      desc: 'İşletmenizin arka planında dönen karmaşık süreçleri dijitalleştiriyoruz. Restoranlar için QR menüler, oteller için rezervasyon sistemleri veya özel CRM çözümleri üretiyoruz.',
      features: ['Özel Fonksiyonel Çözümler', 'Sıfır Hata (Zero-Bug) Hedefi', 'Hızlı Entegrasyon', 'Kullanıcı Dostu Paneller'],
      ref: ref3,
      isVisible: isVisible3
    },
    {
      icon: <ShieldCheck size={28} />,
      title: 'Sürekli Gelişim & Güvenlik',
      desc: 'Teslim ettik bitti demiyoruz. Sisteminizi 7/24 izliyor, siber tehditlere karşı koruyor ve teknolojik yeniliklere anında adapte ederek güncel kalmasını sağlıyoruz.',
      features: ['Suerta Kalkanı Güvenlik Altyapısı', 'Aylık Düzenli Yedekleme', 'Performans Optimizasyonu', 'Sürekli Destek'],
      ref: ref4,
      isVisible: isVisible4
    }
  ];

  return (
    <section id="services" style={styles.section}>
      <div style={styles.header} ref={ref1}>
        <h2 style={styles.title}>Neler Yapıyoruz?</h2>
        <p style={styles.subtitle}>İşletmenizi bir üst seviyeye taşıyacak, uçtan uca dijital çözümler sunuyoruz.</p>
      </div>

      <div style={styles.grid}>
        {services.map((service, index) => (
          <div 
            key={index} 
            style={{...styles.card, opacity: service.isVisible ? 1 : 0, transform: service.isVisible ? 'translateY(0)' : 'translateY(40px)', transitionDelay: `${index * 0.1}s`}} 
            className="service-card"
            ref={service.ref}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = `translateY(-10px) ${service.isVisible ? '' : ''}`;
              e.currentTarget.style.background = 'rgba(255, 236, 175, 0.03)';
              e.currentTarget.style.borderColor = 'rgba(255, 236, 175, 0.2)';
              e.currentTarget.querySelector('.icon-box').style.background = 'var(--color-gold)';
              e.currentTarget.querySelector('.icon-box').style.color = '#111';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = `translateY(0) ${service.isVisible ? '' : ''}`;
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.querySelector('.icon-box').style.background = 'rgba(255, 236, 175, 0.05)';
              e.currentTarget.querySelector('.icon-box').style.color = 'var(--color-gold)';
            }}
          >
            <div style={styles.iconBox} className="icon-box">
              {service.icon}
            </div>
            <h3 style={styles.cardTitle}>{service.title}</h3>
            <p style={styles.cardDesc}>{service.desc}</p>
            
            <ul style={styles.featureList}>
              {service.features.map((feature, fIndex) => (
                <li key={fIndex} style={styles.featureItem}>
                  <Zap size={16} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
