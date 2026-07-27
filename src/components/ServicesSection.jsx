import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useIsMobile from '../hooks/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1); // Start closed (-1)
  const isMobile = useIsMobile(1024);

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
      if (!isMobile) {
        // Desktop Pin & Scrub
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%", // Scroll mesafesini uzattık (kullanıcı biraz daha fazla kaydırmalı)
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const totalSteps = services.length + 1;
            const index = Math.floor(self.progress * totalSteps * 0.999) - 1;
            setActiveIndex(index);
          }
        });
      } else {
        // Mobile "Oturup Açılma" (Sit and Reveal) Animation
        const cards = gsap.utils.toArray('.mobile-service-card');
        cards.forEach((card) => {
          const content = card.querySelector('.mobile-card-content');
          
          // Initial state: hidden
          gsap.set(content, { height: 0, opacity: 0, overflow: 'hidden', paddingTop: 0 });

          ScrollTrigger.create({
            trigger: card,
            start: "top 75%", // Kart ekrana biraz daha girince başlasın
            end: "bottom 25%",
            onEnter: () => {
              gsap.to(content, { height: 'auto', opacity: 1, paddingTop: '1.5rem', duration: 0.6, ease: "power2.out" });
              gsap.to(card, { background: 'rgba(255,255,255,0.06)', duration: 0.4 });
            },
            onLeaveBack: () => {
              gsap.to(content, { height: 0, opacity: 0, paddingTop: 0, duration: 0.4, ease: "power2.in" });
              gsap.to(card, { background: 'rgba(255,255,255,0.03)', duration: 0.4 });
            }
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [services.length, isMobile]);

  const styles = {
    wrapper: {
      marginTop: isMobile ? '5rem' : '10rem',
      background: 'linear-gradient(to bottom, transparent, #0a0a0c 15rem, #0a0a0c 100%)',
      position: 'relative',
      zIndex: 1
    },
    section: {
      height: isMobile ? 'auto' : '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: isMobile ? 'flex-start' : 'center',
      padding: isMobile ? '3rem 1.5rem 5rem 1.5rem' : '5rem 5vw 0',
      overflow: 'hidden',
      position: 'relative'
    },
    header: {
      marginBottom: '1rem',
      marginTop: '2rem'
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
      fontFamily: 'var(--font-main)',
      marginTop: '1rem',
      letterSpacing: '2px',
      textTransform: 'uppercase'
    },
    contentLayout: {
      display: 'flex',
      gap: '5vw',
      height: '60vh',
      alignItems: 'center'
    },
    leftCol: {
      width: '35%',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    },
    rightCol: {
      width: '60%',
      position: 'relative',
      height: '100%',
      display: 'flex',
      alignItems: 'center'
    },
    menuItem: {
      fontSize: 'clamp(1.8rem, 3vw, 3rem)',
      fontFamily: 'var(--font-main)',
      fontWeight: '600',
      margin: 0,
      lineHeight: '1.1',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      letterSpacing: '-1px'
    },
    detailsContainer: {
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '24px',
      padding: 'clamp(2rem, 4vw, 4rem)',
      width: '100%',
      position: 'absolute'
    },
    descBlock: {
      fontSize: 'clamp(1rem, 1.2vw, 1.4rem)',
      color: 'var(--color-text)',
      lineHeight: '1.6',
      marginBottom: '2.5rem'
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
          <h2 style={styles.title}>Uzmanlık Alanlarımız</h2>
        </div>

        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
            {services.map((service, index) => (
              <div key={index} className="mobile-service-card luxury-card" style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '24px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                boxSizing: 'border-box',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}>
                <h3 style={{ 
                  color: 'var(--color-gold)', 
                  fontSize: '1.5rem', 
                  margin: 0, 
                  fontFamily: 'var(--font-main)',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  {service.title}
                  <span style={{ fontSize: '1rem', opacity: 0.5, fontWeight: '400', marginRight: '1rem' }}>0{index + 1}</span>
                </h3>
                
                {/* Bu kısım GSAP ile animasyonlanacak (açılıp kapanacak) */}
                <div className="mobile-card-content">
                  <p style={{ 
                    color: 'var(--color-text)', 
                    lineHeight: '1.6', 
                    margin: '0 0 1.5rem 0',
                    fontSize: '1rem',
                    opacity: 0.9,
                    paddingRight: '0.5rem' // Sağdan biraz daha boşluk vererek metnin yapışmasını önledik
                  }}>
                    {service.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
                    {service.features.map((feature, fIndex) => (
                      <span key={fIndex} style={{
                        padding: '0.4rem 1rem',
                        background: 'rgba(255, 236, 175, 0.05)',
                        border: '1px solid rgba(255, 236, 175, 0.1)',
                        borderRadius: '50px',
                        fontSize: '0.8rem',
                        color: 'var(--color-gold)',
                        fontWeight: '500'
                      }}>{feature}</span>
                    ))}
                  </div>
                  <Link to="/iletisim" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--color-accent)',
                    fontWeight: '600',
                    textDecoration: 'none',
                    fontSize: '0.95rem'
                  }}>
                    Daha Fazla Bilgi Al <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.contentLayout}>
            {/* Sol Kolon: Menü Listesi */}
            <div style={styles.leftCol}>
              {services.map((service, index) => {
                const isActive = index === activeIndex;
                return (
                  <h3
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    style={{
                      ...styles.menuItem,
                      color: isActive ? 'var(--color-gold)' : 'var(--color-secondary)',
                      opacity: isActive ? 1 : 0.3,
                      transform: isActive ? 'translateX(20px)' : 'translateX(0)',
                      // İtalik yazı stili kaldırıldı çünkü geçişte aniden kırılıyor
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
                    className="luxury-card"
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
                    <Link to="/iletisim" style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'var(--color-accent)',
                      fontWeight: '600',
                      textDecoration: 'none',
                      marginTop: '2.5rem',
                      fontSize: '1.1rem',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                    >
                      Daha Fazla Bilgi Al <ArrowRight size={20} />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {!isMobile && (
          <motion.div
            animate={{ opacity: activeIndex === -1 ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              bottom: '2.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.6rem',
              color: 'var(--color-secondary)',
              pointerEvents: 'none',
              zIndex: 5
            }}
          >
            <span style={{ fontSize: '0.8rem', letterSpacing: '3px', textTransform: 'uppercase' }}>Kaydırın</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '26px',
                height: '42px',
                border: '2px solid var(--color-secondary)',
                borderRadius: '14px',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '6px'
              }}
            >
              <div style={{ width: '4px', height: '8px', borderRadius: '2px', background: 'var(--color-gold)' }} />
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* Main CTA at the bottom */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0 6rem 0', position: 'relative', zIndex: 10 }}>
        <Link to="/iletisim" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1.2rem 3rem',
          background: 'var(--color-accent)',
          color: '#fff',
          borderRadius: '50px',
          fontWeight: '600',
          fontSize: 'clamp(1rem, 3vw, 1.2rem)',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          boxShadow: '0 10px 30px rgba(154, 22, 31, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(154, 22, 31, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(154, 22, 31, 0.3)';
        }}
        >
          Hizmet İçin İletişime Geç <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}
