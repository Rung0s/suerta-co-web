import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    id: 1,
    question: "PROJE SÜREÇLERİ NASIL İŞLİYOR?",
    answer: "Öncelikle markanızın vizyonunu ve dijital hedeflerini dinlediğimiz bir keşif toplantısı yapıyoruz. Ardından strateji, tasarım (UX/UI) ve geliştirme fazlarını şeffaf bir şekilde yöneterek projenizi yayına alıyoruz."
  },
  {
    id: 2,
    question: "E-TİCARET ALTYAPISI OLARAK NE KULLANIYORSUNUZ?",
    answer: "İhtiyaçlarınıza göre Shopify, WooCommerce veya tamamen size özel (custom) çözümler geliştiriyoruz. Entegrasyonlar ve komisyonsuz satış altyapıları konusunda uzmanız."
  },
  {
    id: 3,
    question: "SADECE TASARIM MI YAPIYORSUNUZ?",
    answer: "Hayır, Suerta Co. tam kapsamlı bir dijital ajanstır. Konsept tasarımdan başlayarak, yazılım geliştirme, yapay zeka entegrasyonları ve performans optimizasyonlarına kadar uçtan uca hizmet veriyoruz."
  },
  {
    id: 4,
    question: "NE KADAR SÜREDE TESLİM EDİYORSUNUZ?",
    answer: "Projenin kapsamına göre değişmekle birlikte, standart bir kurumsal web sitesi veya butik e-ticaret platformu ortalama 4 ila 8 hafta içerisinde kusursuz bir şekilde yayına hazır hale gelir."
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
      background: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      marginBottom: '1rem',
      overflow: 'hidden',
      transition: 'background 0.3s ease'
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
                  background: isOpen ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)'
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
