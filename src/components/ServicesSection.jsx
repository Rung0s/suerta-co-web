import React from 'react';
import { Monitor, Smartphone, ShieldCheck, Code, Zap, Bot, ShoppingCart, LineChart } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function ServicesSection() {
  const [ref1, isVisible1] = useScrollReveal();
  const [ref2, isVisible2] = useScrollReveal(0.2);
  const [ref3, isVisible3] = useScrollReveal(0.2);
  const [ref4, isVisible4] = useScrollReveal(0.2);
  const [ref5, isVisible5] = useScrollReveal(0.2);
  const [ref6, isVisible6] = useScrollReveal(0.2);
  const [ref7, isVisible7] = useScrollReveal(0.2);

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
      padding: '3rem 2rem',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column'
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
    },
    {
      icon: <Bot size={28} />,
      title: 'Yapay Zekâ & Otomasyon',
      desc: 'Tekrarlayan işleri manuel süreçlerden çıkarıyor, işletmenize özel yapay zekâ destekli sistemler kuruyoruz. Müşteri iletişiminden içerik üretimine kadar zaman kaybettiren süreçleri daha hızlı ve ölçülebilir hâle getiriyoruz.',
      features: ['AI Chatbot ve Akıllı Asistanlar', 'WhatsApp ve Form Otomasyonları', 'Otomatik İçerik Sistemleri', 'İş Akışı Entegrasyonları'],
      ref: ref5,
      isVisible: isVisible5
    },
    {
      icon: <ShoppingCart size={28} />,
      title: 'E-Ticaret & Rezervasyon',
      desc: 'Müşterilerinizi aracı platformlara yönlendirmeden doğrudan satış ve rezervasyon alabileceğiniz dijital sistemler geliştiriyoruz. Süreci yalnızca estetik değil, dönüşüm odaklı tasarlıyoruz.',
      features: ['Komisyonsuz Rezervasyon Altyapısı', 'Shopify ve Ödeme Entegrasyonları', 'Mobil Uyumlu Satış Akışları', 'Sipariş ve Rezervasyon Yönetimi'],
      ref: ref6,
      isVisible: isVisible6
    },
    {
      icon: <LineChart size={28} />,
      title: 'Veri, Analitik & Büyüme',
      desc: 'Dijital sistemlerinizi yalnızca yayına almıyor, nasıl performans gösterdiğini de ölçüyoruz. Kullanıcı davranışlarını analiz ederek satış, rezervasyon ve iletişim dönüşümlerini düzenli olarak geliştiriyoruz.',
      features: ['Ziyaretçi ve Dönüşüm Takibi', 'Google Analytics ve Pixel Kurulumu', 'Dönüşüm Optimizasyonu', 'Performans ve Büyüme Raporları'],
      ref: ref7,
      isVisible: isVisible7
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
            style={{
              opacity: service.isVisible ? 1 : 0, 
              transform: service.isVisible ? 'translateY(0)' : 'translateY(60px)', 
              transition: 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${index * 0.15}s`,
              height: '100%'
            }}
            ref={service.ref}
          >
            <div style={styles.card} className="glass-panel service-card-fx">
              <div style={styles.iconBox} className="icon-box">
                {service.icon}
              </div>
              
              <div style={{ flex: 1 }}>
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
