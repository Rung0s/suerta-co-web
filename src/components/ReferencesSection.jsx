import React, { useState, useEffect } from 'react';
import { X, ExternalLink, ChevronRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function ReferencesSection() {
  const [ref, isVisible] = useScrollReveal();
  const [selectedRef, setSelectedRef] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedRef) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedRef]);

  const styles = {
    section: {
      padding: '8rem 2rem',
      background: 'rgba(154, 22, 31, 0.02)',
      borderTop: '1px solid rgba(255,255,255,0.02)',
      borderBottom: '1px solid rgba(255,255,255,0.02)',
      position: 'relative'
    },
    header: {
      textAlign: 'center',
      marginBottom: '4rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
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
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '2rem',
      maxWidth: '1000px',
      margin: '0 auto',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s'
    },
    card: {
      width: '240px',
      height: '140px',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-secondary)',
      transition: 'var(--transition-smooth)',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    },
    cardName: {
      fontSize: '1.2rem',
      fontWeight: '700',
      color: 'var(--color-text)',
      marginBottom: '0.5rem'
    },
    cardDesc: {
      fontSize: '0.8rem',
      opacity: 0.7
    },
    modalOverlay: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(10, 10, 12, 0.8)',
      backdropFilter: 'blur(20px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: selectedRef ? 1 : 0,
      pointerEvents: selectedRef ? 'all' : 'none',
      transition: 'opacity 0.4s ease'
    },
    modalContent: {
      width: '90%',
      maxWidth: '1000px',
      height: '80vh',
      background: 'var(--color-bg)',
      border: '1px solid rgba(255, 236, 175, 0.1)',
      borderRadius: '24px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      transform: selectedRef ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
      overflow: 'hidden'
    },
    modalHeader: {
      padding: '2rem',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    closeBtn: {
      background: 'rgba(255,255,255,0.05)',
      border: 'none',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-text)',
      cursor: 'pointer',
      transition: 'background 0.2s'
    },
    modalBody: {
      display: 'flex',
      flex: 1,
      overflow: 'hidden'
    },
    modalSidebar: {
      width: '350px',
      padding: '2rem',
      borderRight: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      overflowY: 'auto'
    },
    modalBrowser: {
      flex: 1,
      background: '#0a0a0c',
      padding: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    },
    browserWindow: {
      width: '100%',
      height: '100%',
      background: '#151517',
      borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
    },
    browserTopbar: {
      height: '40px',
      background: '#1a1a1d',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 1rem',
      gap: '0.5rem'
    },
    browserDot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.2)'
    },
    browserContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      background: 'linear-gradient(45deg, #111, #1a1a1d)'
    }
  };

  const references = [
    { 
      id: 1, 
      name: "Emsa Otel", 
      desc: "Otel Rezervasyon Sistemi",
      year: "2024",
      service: "Web Tasarım & Yazılım",
      longDesc: "Eskişehir'in köklü otellerinden Emsa Otel için tamamen sıfırdan, komisyonsuz ve doğrudan rezervasyon alabilen özel bir dijital altyapı inşa ettik. Mobil uyumlu arayüzü ve hızlı ödeme adımları ile dönüşüm oranları %40 artırıldı.",
      tags: ["Web Tasarım", "React", "Rezervasyon Motoru"],
      link: "emsaotel.com.tr"
    },
    { 
      id: 2, 
      name: "Roasters Coffee", 
      desc: "QR Menü & Masa Sipariş",
      year: "2024",
      service: "Operasyonel Altyapı",
      longDesc: "Yeni nesil kahve dükkanı Roasters için, müşterilerin masalarından kalkmadan sipariş verebildiği, dinamik güncellenebilen ve arka planda stok takibi yapan entegre bir QR menü sistemi geliştirdik.",
      tags: ["QR Menü", "Mobil Arayüz", "Otomasyon"],
      link: "roasters.menu"
    },
    { 
      id: 3, 
      name: "GastroPub Esk", 
      desc: "Kurumsal Web & Etkinlik",
      year: "2023",
      service: "Dijital Vitrin",
      longDesc: "GastroPub'ın dijital vitrinini baştan yarattık. Etkinlik takvimi, dinamik galeri ve rezervasyon formu ile mekanın enerjisini dijital dünyaya taşıdık.",
      tags: ["UI/UX Tasarım", "SEO", "Etkinlik Yönetimi"],
      link: "gastropubesk.com"
    },
    { 
      id: 4, 
      name: "Klinik Art", 
      desc: "Estetik Kliniği Platformu",
      year: "2023",
      service: "Web Tasarım & Kurumsal",
      longDesc: "Sağlık turizmi ve yerel hastalar için tasarlanmış, çoklu dil destekli, SEO odaklı ve online randevu alınabilen güvenilir bir kurumsal kimlik projesi.",
      tags: ["Çoklu Dil", "Kurumsal Kimlik", "Randevu Sistemi"],
      link: "klinikart.com"
    },
    { 
      id: 5, 
      name: "Nova Mimarlık", 
      desc: "Portfolyo ve UI/UX",
      year: "2024",
      service: "Tasarım & Geliştirme",
      longDesc: "Ödüllü mimarlık ofisi Nova için projelerini estetik ve minimalist bir şekilde sergileyebilecekleri, yüksek performanslı ve pürüzsüz geçişlere sahip bir portfolyo sitesi hazırladık.",
      tags: ["UI/UX", "Portfolyo", "Animasyon"],
      link: "novamimarlik.com"
    },
    { 
      id: 6, 
      name: "FitLife Studio", 
      desc: "Online Randevu & Takip",
      year: "2023",
      service: "Operasyonel Altyapı",
      longDesc: "Butik spor salonu FitLife için üyelerin ders programlarını takip edebildiği, online rezervasyon yapabildiği ve antrenörlerin müşteri yönetebildiği özel bir sistem kurduk.",
      tags: ["Randevu Sistemi", "Web App", "Veritabanı"],
      link: "fitlife.studio"
    }
  ];

  return (
    <>
      <section id="references" style={styles.section}>
        <div style={styles.header} ref={ref}>
          <h2 style={styles.title}>Referanslarımız</h2>
          <p style={styles.subtitle}>Bize güvenen ve dijital dönüşümlerini birlikte inşa ettiğimiz markalar.</p>
        </div>

        <div style={styles.grid}>
          {references.map((refItem) => (
            <div 
              key={refItem.id} 
              style={styles.card}
              onClick={() => setSelectedRef(refItem)}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-gold)';
                e.currentTarget.style.background = 'rgba(255,236,175,0.05)';
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(255,236,175,0.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', fontSize: '0.75rem', color: 'var(--color-gold)', fontWeight: '600', padding: '0.2rem 0.6rem', background: 'rgba(255,236,175,0.1)', borderRadius: '4px' }}>
                {refItem.year}
              </div>
              <div style={styles.cardName}>{refItem.name}</div>
              <div style={styles.cardDesc}>{refItem.service}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.2rem' }}>{refItem.desc}</div>
              <div style={{ marginTop: '1rem', opacity: 0.5 }}>
                <ChevronRight size={20} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Overlay */}
      <div style={styles.modalOverlay} onClick={() => setSelectedRef(null)}>
        <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
          <div style={styles.modalHeader}>
            <div>
              <h3 style={{ fontSize: '1.8rem', margin: 0 }}>{selectedRef?.name}</h3>
              <div style={{ color: 'var(--color-gold)', fontSize: '0.9rem', marginTop: '0.25rem' }}>{selectedRef?.desc}</div>
            </div>
            <button 
              style={styles.closeBtn} 
              onClick={() => setSelectedRef(null)}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            >
              <X size={24} />
            </button>
          </div>
          
          <div style={styles.modalBody}>
            {/* Sidebar Details */}
            <div style={styles.modalSidebar}>
              <div>
                <h4 style={{ color: 'var(--color-secondary)', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Proje Özeti</h4>
                <p style={{ lineHeight: '1.7', fontSize: '1.05rem' }}>{selectedRef?.longDesc}</p>
              </div>
              
              <div>
                <h4 style={{ color: 'var(--color-secondary)', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Teknolojiler & Kapsam</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {selectedRef?.tags.map((tag, i) => (
                    <span key={i} style={{ padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50px', fontSize: '0.85rem' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <a 
                  href={`https://${selectedRef?.link}`} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold)', textDecoration: 'none', fontWeight: '600' }}
                >
                  Canlı Projeyi İncele <ExternalLink size={18} />
                </a>
              </div>
            </div>

            {/* Browser Preview Area */}
            <div style={styles.modalBrowser}>
              <div style={styles.browserWindow}>
                <div style={styles.browserTopbar}>
                  <div style={{...styles.browserDot, background: '#ff5f56'}} />
                  <div style={{...styles.browserDot, background: '#ffbd2e'}} />
                  <div style={{...styles.browserDot, background: '#27c93f'}} />
                  <div style={{ marginLeft: '1rem', flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                    {selectedRef?.link}
                  </div>
                </div>
                <div style={styles.browserContent}>
                  <div style={{ fontSize: '3rem', fontWeight: '900', opacity: 0.1, letterSpacing: '5px' }}>{selectedRef?.name.toUpperCase()}</div>
                  <div style={{ marginTop: '1rem', color: 'var(--color-gold)', fontSize: '1.2rem' }}>UI/UX Önizleme Simülasyonu</div>
                  <p style={{ marginTop: '1rem', color: 'var(--color-secondary)', maxWidth: '400px' }}>Bu alanda projenin bitmiş hali, ekran görüntüleri veya canlı bir iframe önizlemesi yer alacaktır.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
