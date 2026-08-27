import React, { useState } from 'react';
import { Mail, MapPin, ArrowRight, MessageCircle, Check, ChevronRight, ChevronLeft, Globe, ShoppingBag, Bot, Code, Send } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import { useLanguage } from '../context/LanguageContext';

export default function ContactSection() {
  const { isEN } = useLanguage();
  const [ref1, isVisible1] = useScrollReveal();
  const [ref2, isVisible2] = useScrollReveal(0.2);
  const [submitStatus, setSubmitStatus] = useState('idle');

  // Mod Toggle: 'wizard' (Proje Yapılandırıcı) vs 'classic' (Klasik Form)
  const [activeTab, setActiveTab] = useState('wizard');

  // Wizard Adım Yönetimi (1, 2, 3)
  const [step, setStep] = useState(1);

  // Wizard seçimlerini dile bağlı metinlerle değil, id/indeks ile tutuyoruz.
  // Metinle tutulunca dil değiştirildiğinde tüm seçimler sessizce kayboluyordu.
  const [selectedServiceIds, setSelectedServiceIds] = useState(['web']);
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(1);
  const [selectedBudgetIndex, setSelectedBudgetIndex] = useState(1);
  // Bir kez üretilir. Render sırasında üretilince her tuş vuruşunda değişiyordu.
  const [referenceNumber] = useState(() => Math.floor(1000 + Math.random() * 9000));
  const [wizardName, setWizardName] = useState('');
  const [wizardContact, setWizardContact] = useState('');
  const [wizardNote, setWizardNote] = useState('');

  // Hizmet Seçenekleri
  const serviceOptions = [
    {
      id: 'web',
      title: isEN ? 'Bespoke Web Design & UI/UX' : 'Web Tasarım & Arayüz',
      desc: isEN ? 'Custom-coded high impact digital architecture & smooth motion design.' : 'Markanıza özel sıfırdan tasarım ve animasyonlu mimari.',
      icon: Globe
    },
    {
      id: 'ecom',
      title: isEN ? 'E-Commerce & High-Conversion' : 'E-Ticaret & Dönüşüm',
      desc: isEN ? 'Ultra-fast custom checkout & global payment gateway integrations.' : 'Yüksek hızlı, özel ödeme ve sepet altyapıları.',
      icon: ShoppingBag
    },
    {
      id: 'ai',
      title: isEN ? 'AI Agents & Automation' : 'Yapay Zeka & Otomasyon',
      desc: isEN ? 'Smart AI assistants, workflow automation & intelligent bots.' : 'AI ajanlar, akıllı asistanlar ve iş süreçleri otomasyonu.',
      icon: Bot
    },
    {
      id: 'custom',
      title: isEN ? 'Custom Software Platforms' : 'Özel Yazılım Platformu',
      desc: isEN ? 'Tailored LMS, CRM, booking systems & enterprise platforms.' : 'LMS, rezervasyon, CRM ve özel operasyonel sistemler.',
      icon: Code
    },
  ];

  const timelineOptions = isEN
    ? ['Express (2-4 Weeks)', 'Standard (1-2 Months)', 'Enterprise (3+ Months)']
    : ['Acil (2-4 Hafta)', 'Standart (1-2 Ay)', 'Kapsamlı (3+ Ay)'];

  const budgetOptions = isEN
    ? ['$3,000 - $5,000 USD', '$5,000 - $10,000 USD', '$10,000 - $25,000 USD', '$25,000+ USD']
    : ['5.000 - 10.000 TL', '10.000 - 20.000 TL', '20.000 - 50.000 TL', '50.000+ TL'];

  // Gönderim ve özet için seçimleri o anki dildeki metne çeviriyoruz.
  const selectedServices = serviceOptions
    .filter((option) => selectedServiceIds.includes(option.id))
    .map((option) => option.title);
  const selectedTimeline = timelineOptions[selectedTimelineIndex];
  const selectedBudget = budgetOptions[selectedBudgetIndex];

  const toggleService = (id) => {
    setSelectedServiceIds((previous) => {
      if (!previous.includes(id)) return [...previous, id];
      // En az bir hizmet seçili kalmalı
      return previous.length > 1 ? previous.filter((item) => item !== id) : previous;
    });
  };

  // WhatsApp'a Anında Formatted Gönderim
  const handleWhatsAppSend = () => {
    if (!wizardName || !wizardContact) {
      alert("Lütfen adınızı ve iletişim bilginizi giriniz.");
      return;
    }
    const text = `Merhaba Suerta Co. Ekibi. Web üzerinden teknik proje spesifikasyonu oluşturdum:
- Marka / Ad: ${wizardName}
- İletişim: ${wizardContact}
- Seçilen Hizmetler: ${selectedServices.join(', ')}
- Zaman Çizelgesi: ${selectedTimeline}
- Bütçe Aralığı: ${selectedBudget}
${wizardNote ? `- Ek Notlar: ${wizardNote}` : ''}

Proje analizi ve stratejik ön görüşme talep ediyorum.`;

    const url = `https://wa.me/905060693525?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // E-Posta (AJAX) Gönderimi
  const handleWizardEmailSubmit = async (e) => {
    e.preventDefault();
    if (!wizardName || !wizardContact) {
      alert("Lütfen adınızı ve iletişim bilginizi giriniz.");
      return;
    }
    setSubmitStatus('loading');

    const formData = new FormData();
    formData.append('_subject', `Yeni Teknik Proje Spesifikasyonu: ${wizardName}`);
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');
    formData.append('Marka / Ad', wizardName);
    formData.append('İletişim', wizardContact);
    formData.append('Hizmet Modülleri', selectedServices.join(', '));
    formData.append('Zaman Çizelgesi', selectedTimeline);
    formData.append('Yatırım Aralığı', selectedBudget);
    formData.append('Ek Notlar', wizardNote || 'Belirtilmedi');

    try {
      const response = await fetch("https://formsubmit.co/ajax/suerta.info@gmail.com", {
        method: "POST",
        headers: { 'Accept': 'application/json' },
        body: formData
      });
      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('idle');
        alert("Bir hata oluştu, lütfen tekrar deneyin veya WhatsApp üzerinden iletin.");
      }
    } catch {
      setSubmitStatus('idle');
      alert("Bağlantı hatası oluştu, lütfen WhatsApp üzerinden iletin.");
    }
  };

  // Klasik Form Gönderimi
  const handleClassicSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');
    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/suerta.info@gmail.com", {
        method: "POST",
        headers: { 'Accept': 'application/json' },
        body: formData
      });
      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
      } else {
        setSubmitStatus('idle');
        alert("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    } catch {
      setSubmitStatus('idle');
      alert("Bağlantı hatası oluştu, lütfen tekrar deneyin.");
    }
  };

  const styles = {
    section: {
      padding: '10rem 2rem',
      position: 'relative',
      background: 'linear-gradient(to top, rgba(154, 22, 31, 0.08), transparent)'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: '5rem',
      alignItems: 'start'
    },
    infoBlock: {
      opacity: isVisible1 ? 1 : 0,
      transform: isVisible1 ? 'translateX(0)' : 'translateX(-40px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      position: 'sticky',
      top: '8rem'
    },
    title: {
      fontSize: 'clamp(3rem, 6vw, 5.5rem)',
      fontFamily: 'var(--font-heading)',
      lineHeight: '1.1',
      marginBottom: '1.5rem',
      color: 'var(--color-text)'
    },
    subtitle: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '1.2rem',
      fontFamily: 'var(--font-main)',
      marginBottom: '3.5rem',
      maxWidth: '450px',
      lineHeight: '1.6'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      marginBottom: '1.8rem',
      fontSize: '1.15rem',
      fontFamily: 'var(--font-main)',
      color: 'var(--color-text)',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    iconBox: {
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      background: 'linear-gradient(145deg, rgba(154,22,31,0.2), rgba(255,236,175,0.05))',
      border: '1px solid rgba(154,22,31,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-gold)',
      transition: 'all 0.3s ease'
    },
    formBlock: {
      borderRadius: '8px', // Mimari keskin/hafif yuvarlatılmış editoryal hat
      padding: '3.5rem',
      background: 'rgba(15, 15, 18, 0.75)',
      backdropFilter: 'blur(25px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
      opacity: isVisible2 ? 1 : 0,
      transform: isVisible2 ? 'translateX(0)' : 'translateX(40px)',
      transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s'
    },
    inputGroup: {
      marginBottom: '2rem',
      position: 'relative'
    },
    input: {
      width: '100%',
      padding: '1.4rem 0 0.8rem 0',
      background: 'transparent',
      border: 'none',
      borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
      color: 'var(--color-text)',
      fontSize: '1.05rem',
      fontFamily: 'var(--font-main)',
      outline: 'none',
      transition: 'border-color 0.3s'
    },
    submitBtn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      width: '100%',
      padding: '1.4rem',
      background: 'var(--color-accent)',
      color: '#fff',
      border: 'none',
      borderRadius: '2px', // Keskin editoryal buton karesi
      fontSize: '0.95rem',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      fontFamily: 'var(--font-main)',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '1.5rem',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <section id="contact" style={styles.section}>
      <style>
        {`
          .contact-input::placeholder {
            color: rgba(255, 255, 255, 0.25);
          }
          .contact-input:focus {
            border-bottom-color: var(--color-gold) !important;
          }
          .contact-link:hover .contact-icon {
            transform: scale(1.1) rotate(5deg);
            background: var(--color-accent);
            color: #fff;
          }
          .contact-btn:hover {
            background: #ffecaf !important;
            color: #111 !important;
          }
          .wizard-card {
            padding: 1.8rem;
            border-radius: 4px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.07);
            border-left: 3px solid transparent;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            align-items: flex-start;
            gap: 1.5rem;
          }
          .wizard-card:hover {
            border-color: rgba(255, 236, 175, 0.3);
            background: rgba(255, 255, 255, 0.04);
            transform: translateY(-2px);
          }
          .wizard-card.active {
            border-color: rgba(255, 236, 175, 0.3);
            border-left-color: var(--color-gold);
            background: rgba(255, 236, 175, 0.06);
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          }
          .tag-btn {
            padding: 1rem 1.6rem;
            border-radius: 2px;
            border: 1px solid rgba(255,255,255,0.12);
            background: rgba(255,255,255,0.02);
            color: rgba(255,255,255,0.7);
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9rem;
            font-weight: 500;
            letter-spacing: 0.5px;
          }
          .tag-btn:hover {
            border-color: rgba(255,236,175,0.5);
            color: #fff;
          }
          .tag-btn.active {
            background: var(--color-gold);
            border-color: var(--color-gold);
            color: #000;
            font-weight: 700;
          }
          @media (max-width: 992px) {
            .contact-grid {
              grid-template-columns: 1fr !important;
              gap: 4rem !important;
            }
            .form-block {
              padding: 2.5rem 1.5rem !important;
            }
          }
        `}
      </style>
      <div style={styles.container} className="contact-grid">
        
        {/* Sol Kolon - İnteraktif Yapılandırıcı & Form */}
        <div style={styles.formBlock} className="form-block" ref={ref2}>
          
          {/* Editoryal Minimalist Sekme (Tab) Seçicisi - Zero AI Look */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '3rem',
            gap: '2.5rem'
          }}>
            <button
              type="button"
              onClick={() => { setActiveTab('wizard'); setSubmitStatus('idle'); }}
              style={{
                padding: '0 0 1rem 0',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'wizard' ? '2px solid var(--color-gold)' : '2px solid transparent',
                color: activeTab === 'wizard' ? '#fff' : 'rgba(255,255,255,0.4)',
                fontWeight: activeTab === 'wizard' ? '600' : '400',
                fontSize: '0.85rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}
            >
              <span>01 / PROJE YAPILANDIRICI</span>
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('classic'); setSubmitStatus('idle'); }}
              style={{
                padding: '0 0 1rem 0',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'classic' ? '2px solid var(--color-gold)' : '2px solid transparent',
                color: activeTab === 'classic' ? '#fff' : 'rgba(255,255,255,0.4)',
                fontWeight: activeTab === 'classic' ? '600' : '400',
                fontSize: '0.85rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}
            >
              <span>02 / DOĞRUDAN FORM</span>
            </button>
          </div>

          {submitStatus === 'success' ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '2px', background: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
                <Check size={40} color="#fff" />
              </div>
              <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Teknik Şartnamemize Ulaştı.</h3>
              <p style={{ color: 'var(--color-secondary)', fontSize: '1.1rem', fontWeight: '300', lineHeight: '1.7' }}>
                Seçimlerinizi detaylıca analiz edip 48 saat içinde markanıza özel stratejik ön prototip ve yatırım planıyla dönüş yapacağız.
              </p>
              <button 
                onClick={() => { setSubmitStatus('idle'); setStep(1); }}
                style={{...styles.submitBtn, width: 'auto', padding: '1.2rem 2.5rem', margin: '3rem auto 0 auto', background: 'transparent', border: '1px solid var(--color-gold)', color: 'var(--color-text)'}}
              >
                YENİ SPESİFİKASYON OLUŞTUR
              </button>
            </div>
          ) : activeTab === 'wizard' ? (
            /* ================= 3-ADIMLI İNTERAKTİF PROJE YAPILANDIRICI ================= */
            <div>
              {/* Progress & Adım Başlığı */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1.2rem' }}>
                <div>
                  <span style={{ color: 'var(--color-gold)', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
                    ADIM 0{step} / 03 — {step === 1 ? 'MİMARİ MODÜLLER' : step === 2 ? 'KAPSAM & YATIRIM' : 'ŞARTNAME PROTOKOLÜ'}
                  </span>
                  <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-heading)', margin: 0, fontWeight: '400', color: '#fff' }}>
                    {step === 1 && 'Hangi dijital altyapılara ihtiyacınız var?'}
                    {step === 2 && 'Zaman çizelgesi ve hedef yatırım bütçesi'}
                    {step === 3 && 'Teknik Spesifikasyon & Ön Görüşme'}
                  </h3>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3].map((s) => (
                    <div key={s} style={{
                      width: s === step ? '28px' : '6px',
                      height: '3px',
                      background: s <= step ? 'var(--color-gold)' : 'rgba(255,255,255,0.1)',
                      transition: 'all 0.4s ease'
                    }} />
                  ))}
                </div>
              </div>

              {/* Adım 1: Hizmet Seçimi */}
              {step === 1 && (
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', marginBottom: '2rem', fontWeight: '300' }}>
                    Markanız için entegre edilecek modülleri belirleyin (Birden fazla seçilebilir):
                  </p>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {serviceOptions.map((item) => {
                      const Icon = item.icon;
                      const isSelected = selectedServiceIds.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          role="checkbox"
                          tabIndex={0}
                          aria-checked={isSelected}
                          className={`wizard-card ${isSelected ? 'active' : ''}`}
                          onClick={() => toggleService(item.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              toggleService(item.id);
                            }
                          }}
                        >
                          <div style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '2px',
                            background: isSelected ? 'var(--color-gold)' : 'rgba(255,255,255,0.03)',
                            color: isSelected ? '#000' : 'var(--color-gold)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            border: '1px solid rgba(255,255,255,0.05)',
                            transition: 'all 0.3s ease'
                          }}>
                            <Icon size={20} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                              <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '600', color: isSelected ? '#fff' : 'rgba(255,255,255,0.85)' }}>{item.title}</h4>
                              <span style={{
                                fontSize: '0.7rem',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                color: isSelected ? 'var(--color-gold)' : 'rgba(255,255,255,0.2)',
                                fontWeight: isSelected ? '700' : '400'
                              }}>
                                {isSelected ? '[ SEÇİLDİ ]' : '[ EKLE ]'}
                              </span>
                            </div>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: '1.5', fontWeight: '300' }}>{item.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (selectedServices.length === 0) {
                        alert("Lütfen en az 1 modül seçiniz.");
                        return;
                      }
                      setStep(2);
                    }}
                    style={{...styles.submitBtn, marginTop: '2.5rem'}}
                    className="contact-btn"
                  >
                    <span>SONRAKİ ADIM: ZAMAN & BÜTÇE PROTOKOLÜ</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}

              {/* Adım 2: Süre & Bütçe */}
              {step === 2 && (
                <div>
                  <div style={{ marginBottom: '3rem' }}>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600', marginBottom: '1.2rem' }}>
                      01. HEDEFLENEN TESLİMAT SÜRESİ
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                      {timelineOptions.map((option, index) => (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={selectedTimelineIndex === index}
                          className={`tag-btn ${selectedTimelineIndex === index ? 'active' : ''}`}
                          onClick={() => setSelectedTimelineIndex(index)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '3rem' }}>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '600', marginBottom: '1.2rem' }}>
                      02. YATIRIM VE BÜTÇE ARALIĞI
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                      {budgetOptions.map((option, index) => (
                        <button
                          key={option}
                          type="button"
                          aria-pressed={selectedBudgetIndex === index}
                          className={`tag-btn ${selectedBudgetIndex === index ? 'active' : ''}`}
                          onClick={() => setSelectedBudgetIndex(index)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      style={{ ...styles.submitBtn, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', width: 'auto', padding: '1.4rem 2rem' }}
                    >
                      <ChevronLeft size={18} /> GERİ
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      style={{ ...styles.submitBtn, flex: 1, marginTop: 0 }}
                      className="contact-btn"
                    >
                      <span>TEKNİK ŞARTNAMEYİ OLUŞTUR</span>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* Adım 3: Teknik Spesifikasyon (Zero AI Look, Editorial Specification Receipt) */}
              {step === 3 && (
                <div>
                  {/* Mimari Teknik Şartname Özet Kutu */}
                  <div style={{
                    padding: '2rem',
                    background: 'rgba(0, 0, 0, 0.45)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderLeft: '2px solid var(--color-gold)',
                    marginBottom: '2.5rem',
                    fontFamily: 'var(--font-main)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.8rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-gold)', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '600' }}>
                        — PROJE SPESİFİKASYON ÖZETİ
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>
                        REF #SC-{referenceNumber}
                      </span>
                    </div>
                    
                    <div style={{ display: 'grid', gap: '1rem', fontSize: '0.95rem', color: '#fff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem', alignItems: 'baseline' }}>
                        <span style={{ color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', flexShrink: 0 }}>Seçilen Modüller:</span>
                        <span style={{ fontWeight: '600', textAlign: 'right', color: 'var(--color-gold)', fontSize: '0.95rem' }}>{selectedServices.join(' + ')}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem', alignItems: 'baseline' }}>
                        <span style={{ color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Hedeflenen Süre:</span>
                        <span style={{ fontWeight: '500', textAlign: 'right' }}>{selectedTimeline}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem', alignItems: 'baseline' }}>
                        <span style={{ color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Yatırım Aralığı:</span>
                        <span style={{ fontWeight: '500', textAlign: 'right' }}>{selectedBudget}</span>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.04)', fontStyle: 'italic' }}>
                      * Bu parametreler 48 saat içinde hazırlanacak mimari analiz ve strateji sunumu için temel alınacaktır.
                    </div>
                  </div>

                  <div style={styles.inputGroup}>
                    <input
                      type="text"
                      style={styles.input}
                      className="contact-input"
                      placeholder="Markanız / Adınız Soyadınız *"
                      value={wizardName}
                      onChange={(e) => setWizardName(e.target.value)}
                      required
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <input
                      type="text"
                      style={styles.input}
                      className="contact-input"
                      placeholder="Kurumsal E-posta veya Telefon Numarası *"
                      value={wizardContact}
                      onChange={(e) => setWizardContact(e.target.value)}
                      required
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <input
                      type="text"
                      style={{...styles.input, fontSize: '0.95rem'}}
                      className="contact-input"
                      placeholder="Geliştirilecek proje hakkında eklemek istediğiniz özel bir not (Opsiyonel)"
                      value={wizardNote}
                      onChange={(e) => setWizardNote(e.target.value)}
                    />
                  </div>

                  {/* Lüks Editoryal Butonlar (Zero AI Green/Round Pill Aesthetics) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2.5rem' }}>
                    <button
                      type="button"
                      onClick={handleWhatsAppSend}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.8rem',
                        width: '100%',
                        padding: '1.3rem',
                        background: 'var(--color-gold)',
                        color: '#000',
                        border: 'none',
                        borderRadius: '2px', // Keskin editoryal mimari buton
                        fontSize: '0.9rem',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-main)',
                        fontWeight: '700',
                        cursor: 'pointer',
                        boxShadow: '0 10px 30px rgba(255, 236, 175, 0.15)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(255, 236, 175, 0.3)'; e.currentTarget.style.background = '#fff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 236, 175, 0.15)'; e.currentTarget.style.background = 'var(--color-gold)'; }}
                    >
                      <MessageCircle size={18} />
                      <span>WHATSAPP İLE ŞARTNAMEYİ İLET</span>
                      <ArrowRight size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={handleWizardEmailSubmit}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.8rem',
                        width: '100%',
                        padding: '1.2rem',
                        background: 'transparent',
                        color: 'rgba(255,255,255,0.7)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '2px',
                        fontSize: '0.85rem',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-main)',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-gold)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.background = 'transparent'; }}
                    >
                      <Send size={16} />
                      <span>E-POSTA İLE PROTOKOL GÖNDER</span>
                    </button>
                  </div>

                  <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      ← PARAMETRELERİ DÜZENLE
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ================= KLASİK İLETİŞİM FORMU ================= */
            <form onSubmit={handleClassicSubmit}>
              <input type="hidden" name="_subject" value="Suerta Co. Websitesi'nden Yeni Bir Mesaj Var!" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              
              <div style={styles.inputGroup}>
                <input type="text" name="name" style={styles.input} className="contact-input" placeholder="Adınız Soyadınız" required />
              </div>
              <div style={styles.inputGroup}>
                <input type="email" name="email" style={styles.input} className="contact-input" placeholder="E-posta Adresiniz" required />
              </div>
              <div style={styles.inputGroup}>
                <textarea 
                  name="message"
                  style={{...styles.input, minHeight: '100px', resize: 'vertical'}} 
                  className="contact-input" 
                  placeholder="Projenizden bahsedin..."
                  required
                />
              </div>
              
              <button
                type="submit"
                style={{...styles.submitBtn, opacity: submitStatus === 'loading' ? 0.7 : 1, cursor: submitStatus === 'loading' ? 'not-allowed' : 'pointer'}}
                className="contact-btn"
                disabled={submitStatus === 'loading'}
              >
                {submitStatus === 'loading' ? 'GÖNDERİLİYOR...' : 'MESAJI GÖNDER'} <ArrowRight size={18} />
              </button>

              <div style={{ textAlign: 'center', margin: '1.5rem 0', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', fontStyle: 'italic', letterSpacing: '1px' }}>
                — VEYA —
              </div>
              
              <a 
                href="https://wa.me/905060693525" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.8rem',
                  width: '100%',
                  padding: '1.2rem',
                  background: 'transparent',
                  color: 'var(--color-gold)',
                  border: '1px solid rgba(255, 236, 175, 0.3)',
                  borderRadius: '2px',
                  fontSize: '0.9rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-main)',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-gold)';
                  e.currentTarget.style.color = '#000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--color-gold)';
                }}
              >
                <MessageCircle size={18} /> WHATSAPP İLE DOĞRUDAN BAĞLAN
              </a>
            </form>
          )}
        </div>

        {/* Sağ Kolon - Bilgi & Otorite */}
        <div style={styles.infoBlock} ref={ref1}>
          <h2 style={styles.title}>Birlikte <br/><span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Yaratalım.</span></h2>
          <p style={styles.subtitle}>
            Bir fikriniz mi var? Veya markanızı dijital dünyada baştan yaratmak mı istiyorsunuz? Teknik proje yapılandırıcı üzerinden şartnamenizi iletin veya doğrudan bize yazın. Kahveler bizden, sohbet sizden.
          </p>
          
          <div>
            <a href="mailto:suerta.info@gmail.com" style={styles.contactItem} className="contact-link">
              <div style={styles.iconBox} className="contact-icon"><Mail size={24} /></div>
              suerta.info@gmail.com
            </a>
            <a href="https://instagram.com/suerta.co" target="_blank" rel="noreferrer" style={styles.contactItem} className="contact-link">
              <div className="contact-icon" style={{...styles.iconBox, fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: '1.2rem'}}>IG</div>
              @suerta.co
            </a>
            <a href="https://wa.me/905060693525" target="_blank" rel="noreferrer" style={styles.contactItem} className="contact-link">
              <div style={styles.iconBox} className="contact-icon"><MessageCircle size={24} /></div>
              +90 506 069 35 25
            </a>
            <div style={styles.contactItem} className="contact-link">
              <div style={styles.iconBox} className="contact-icon"><MapPin size={24} /></div>
              Eskişehir, Türkiye
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
