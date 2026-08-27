import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Bu dizi hem görünür SSS bölümünü hem de ana sayfanın FAQPage şemasını besler.
export const faqs = [
  {
    id: 1,
    question: "BOOKING VE AIRBNB KOMİSYONUNDAN KURTULMAK İÇİN KENDİ SİTEM YETERLİ Mİ?",
    answer: "Tek başına bir tanıtım sitesi yetmez; misafirin rezervasyonu siteniz üzerinden tamamlayabilmesi gerekir. Bunun için müsaitlik takvimi, fiyatlandırma, ödeme altyapısı ve onay e-postalarını içeren bir rezervasyon motoru kuruyoruz. OTA kanallarını kapatmak yerine, doğrudan gelen rezervasyonun payını artırmayı hedefliyoruz; her doğrudan rezervasyon komisyon ödenmeyen rezervasyondur."
  },
  {
    id: 2,
    question: "MEVCUT CHANNEL MANAGER VEYA PMS SİSTEMİMLE ENTEGRE OLUR MU?",
    answer: "Evet. Kullandığınız channel manager, PMS veya takvim sistemiyle iki yönlü senkronizasyon kuruyoruz; böylece bir kanaldan gelen rezervasyon diğerlerinde otomatik olarak müsaitlikten düşer ve çifte rezervasyon riski ortadan kalkar. Sisteminiz API sunmuyorsa iCal senkronizasyonu ile çözüyoruz."
  },
  {
    id: 3,
    question: "İLAN SAYISI ARTINCA SİTE YAVAŞLAR MI?",
    answer: "İlan ve oda sayfaları görsel ağırlıklı olduğu için performans en kritik başlık. Görselleri AVIF ve WebP formatlarında, boyuta göre türetilmiş sürümlerle sunuyor; galerileri tembel yükleme (lazy loading) ile kuruyoruz. Harita, filtre ve takvim gibi ağır bileşenler yalnızca gerektiğinde yükleniyor. Hedefimiz kırk fotoğraflı bir oda sayfasında bile Core Web Vitals eşiklerinin altında kalmak."
  },
  {
    id: 4,
    question: "SİTE KAÇ DİLDE VE PARA BİRİMİNDE ÇALIŞIR?",
    answer: "Yabancı misafir alan tesislerde çok dilli yapı zorunlu. İlan başlıkları, açıklamaları, oda özellikleri ve iptal koşulları dil bazında ayrı yönetilir; fiyatlar seçilen para biriminde gösterilir. Her dil için ayrı URL ve hreflang etiketleri kuruyoruz, böylece sayfalar ilgili ülkelerin aramalarında da görünür."
  },
  {
    id: 5,
    question: "NE KADAR SÜREDE TESLİM EDİYORSUNUZ?",
    answer: "Kapsama göre değişir. Rezervasyon formu ve oda sayfalarını içeren bir otel sitesi ortalama 4-6 hafta; filtreleme, harita araması ve yönetim paneli içeren bir ilan platformu 8-12 hafta sürer. Süreci fazlara bölüyoruz ve her fazın sonunda çalışan bir sürüm görüyorsunuz."
  },
  {
    id: 6,
    question: "İLANLARI VE FİYATLARI KENDİM GÜNCELLEYEBİLİR MİYİM?",
    answer: "Evet. Kod bilgisi gerektirmeyen bir yönetim paneli teslim ediyoruz: ilan ekleme, fotoğraf yükleme, sezonluk fiyat ve müsaitlik güncelleme, iptal koşulu düzenleme hepsi panelden yapılır. Teslimatta ekibinize eğitim veriyor ve kayıt altına alıyoruz."
  },
  {
    id: 7,
    question: "OTEL, KİRALAMA VE EMLAK DIŞINDA PROJE ALIYOR MUSUNUZ?",
    answer: "Alıyoruz, ancak uzmanlığımız rezervasyon ve ilan siteleri. Türkiye ve yurt dışındaki müşterilerle tamamen uzaktan çalışıyoruz; süreç çevrimiçi proje yönetimiyle şeffaf ilerlediği için konum fark etmiyor."
  }
];

export default function FAQSection() {
  const [openId, setOpenId] = useState(null);

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const styles = {
    section: {
      backgroundColor: 'transparent',
      padding: '10rem 2rem',
      position: 'relative',
      zIndex: 1
    },
    container: {
      maxWidth: '1000px',
      margin: '0 auto'
    },
    title: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontFamily: 'var(--font-main)',
      fontWeight: '800',
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: '5rem',
      textTransform: 'uppercase',
      letterSpacing: '2px'
    },
    accordionItem: {
      backdropFilter: 'blur(40px)',
      WebkitBackdropFilter: 'blur(40px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '20px',
      marginBottom: '1rem',
      overflow: 'hidden',
      transition: 'background 0.3s ease',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
    },
    questionHeader: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '2rem',
      background: 'transparent',
      border: 'none',
      color: 'var(--color-text)',
      cursor: 'pointer',
      textAlign: 'left'
    },
    questionText: {
      fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
      fontFamily: 'var(--font-main)',
      fontWeight: '600',
      transition: 'color 0.3s ease',
      letterSpacing: '1px'
    },
    iconWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.4s ease',
      flexShrink: 0,
      marginLeft: '1rem'
    },
    answerContainer: {
      padding: '0 2rem 2rem 2rem'
    },
    answerText: {
      fontSize: '1.1rem',
      lineHeight: '1.8',
      color: 'rgba(255, 255, 255, 0.7)',
      fontFamily: 'var(--font-main)',
      margin: 0
    }
  };

  return (
    <section style={styles.section} id="faq">
      <div style={styles.container}>
        <h2 style={styles.title}>Aklınıza Takılanlar</h2>
        
        <div>
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id} 
                style={{
                  ...styles.accordionItem,
                  background: isOpen ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)'
                }}
              >
                <button 
                  style={styles.questionHeader}
                  onClick={() => toggleOpen(faq.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector('.q-text').style.color = 'var(--color-gold)';
                    e.currentTarget.querySelector('.q-icon').style.borderColor = 'var(--color-gold)';
                    e.currentTarget.querySelector('.q-icon').style.backgroundColor = 'rgba(255, 236, 175, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector('.q-text').style.color = isOpen ? 'var(--color-gold)' : 'var(--color-text)';
                    e.currentTarget.querySelector('.q-icon').style.borderColor = isOpen ? 'var(--color-gold)' : 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.querySelector('.q-icon').style.backgroundColor = isOpen ? 'var(--color-gold)' : 'transparent';
                  }}
                >
                  <span 
                    className="q-text" 
                    style={{
                      ...styles.questionText,
                      color: isOpen ? 'var(--color-gold)' : 'var(--color-text)'
                    }}
                  >
                    {faq.question}
                  </span>
                  
                  <div 
                    className="q-icon"
                    style={{
                      ...styles.iconWrapper,
                      borderColor: isOpen ? 'var(--color-gold)' : 'rgba(255, 255, 255, 0.2)',
                      backgroundColor: isOpen ? 'var(--color-gold)' : 'transparent',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                    }}
                  >
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L7 7L13 1" stroke={isOpen ? '#000000' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 }
                      }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div style={styles.answerContainer}>
                        <p style={styles.answerText}>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
