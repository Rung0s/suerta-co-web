import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1); // Start closed (-1)

  const services = [
    {
      title: 'WEB & UI/UX',
      desc: 'Markanızın ilk intibası her şeydir. Ziyaretçilerinizi müşteriye dönüştüren, estetik açıdan kusursuz, hızlı ve mobil uyumlu kurumsal web siteleri tasarlıyoruz.',
      features: ['Karanlık Mod & Premium Estetik', 'SEO Uyumlu Altyapı', 'Pürüzsüz Animasyonlar', 'Yüksek Dönüşüm Oranlı Tasarım']
    },
    {
      title: 'E-TİCARET',
      desc: 'Müşterilerinizi aracı platformlara yönlendirmeden doğrudan satış alabileceğiniz dijital sistemler geliştiriyoruz. Süreci yalnızca estetik değil, dönüşüm odaklı tasarlıyoruz.',
      features: ['Shopify ve Özel Entegrasyonlar', 'Mobil Uyumlu Satış Akışları', 'Sipariş Yönetimi', 'Ödeme Sistemleri']
    },
    {
      title: 'OPERASYONEL',
      desc: 'İşletmenizin arka planında dönen karmaşık süreçleri dijitalleştiriyoruz. Restoranlar için QR menüler, oteller için rezervasyon sistemleri veya özel CRM çözümleri üretiyoruz.',
      features: ['Sıfır Hata (Zero-Bug) Hedefi', 'Kullanıcı Dostu Paneller', 'Özel Fonksiyonel Çözümler']
    },
    {
      title: 'YAPAY ZEKA',
      desc: 'Tekrarlayan işleri manuel süreçlerden çıkarıyor, işletmenize özel yapay zekâ destekli sistemler kuruyoruz. Zaman kaybettiren süreçleri daha hızlı ve ölçülebilir hâle getiriyoruz.',
      features: ['AI Chatbotlar', 'WhatsApp Otomasyonları', 'İçerik Sistemleri', 'İş Akışı Entegrasyonları']
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section and scrub through the services
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // Kaydırma uzunluğu
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          // Progress 0 ile 1 arasında değişir.
          // -1'den (hepsi kapalı) başlayıp hizmet sayısı kadar gitmesi için scale ediyoruz.
          // Toplam kademe: 1 (hepsi kapalı) + services.length
          const totalSteps = services.length + 1;
          const index = Math.floor(self.progress * totalSteps * 0.999) - 1;
          setActiveIndex(index);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [services.length]);

  const styles = {
    wrapper: {
      marginTop: '10rem',
      background: 'linear-gradient(to bottom, transparent, #0a0a0c 15rem, #0a0a0c 100%)',
      position: 'relative',
      zIndex: 1
    },
    section: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '5rem 5vw 0',
      overflow: 'hidden'
    },
    header: {
      marginBottom: '2rem', // Uzaklık azaltıldı
      marginTop: '2rem'
    },
    mainTitle: {
      fontSize: 'clamp(1rem, 2vw, 1.5rem)',
      color: 'var(--color-secondary)',
      textTransform: 'uppercase',
      letterSpacing: '2px'
    },
    contentLayout: {
      display: 'flex',
      gap: '5vw',
      height: '60vh',
      alignItems: 'center'
    },
    leftCol: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    },
    rightCol: {
      flex: '1.5',
      position: 'relative',
      height: '100%',
      display: 'flex',
      alignItems: 'center'
    },
    menuItem: {
      fontSize: 'clamp(2rem, 4vw, 4rem)',
      fontFamily: 'var(--font-heading)',
      margin: 0,
      lineHeight: '1',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      letterSpacing: '-1px'
    },
    detailsContainer: {
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '24px',
      padding: '4rem',
      width: '100%',
      position: 'absolute'
    },
    descBlock: {
      fontSize: 'clamp(1.2rem, 1.8vw, 2rem)',
      color: 'var(--color-text)',
      lineHeight: '1.5',
      marginBottom: '3rem'
    },
    featuresBlock: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    featureTag: {
      padding: '0.8rem 1.5rem',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '50px',
      fontSize: '0.9rem',
      color: 'var(--color-gold)',
      letterSpacing: '0.5px'
    }
  };

  return (
    <div style={styles.wrapper}>
      <section ref={containerRef} id="services" style={styles.section}>
        <div style={styles.header}>
          <h2 style={styles.mainTitle}>Uzmanlık Alanlarımız</h2>
        </div>

        <div style={styles.contentLayout}>
          {/* Sol Kolon: Menü Listesi */}
          <div style={styles.leftCol}>
            {services.map((service, index) => {
              const isActive = index === activeIndex;
              return (
                <h3 
                  key={index}
                  style={{
                    ...styles.menuItem,
                    color: isActive ? 'var(--color-gold)' : 'var(--color-secondary)',
                    opacity: isActive ? 1 : 0.3,
                    transform: isActive ? 'translateX(20px)' : 'translateX(0)',
                    fontStyle: isActive ? 'italic' : 'normal'
                  }}
                >
                  {service.title}
                </h3>
              );
            })}
          </div>

          {/* Sağ Kolon: Detaylar */}
          <div style={styles.rightCol}>
            <AnimatePresence mode="wait">
              {activeIndex >= 0 && (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={styles.detailsContainer}
                >
                  <div style={styles.descBlock}>
                    {services[activeIndex].desc}
                  </div>
                  <div style={styles.featuresBlock}>
                    {services[activeIndex].features.map((feature, fIndex) => (
                      <div key={fIndex} style={styles.featureTag}>
                        {feature}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
