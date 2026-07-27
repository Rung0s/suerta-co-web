import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Zap, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';

export function CounterItem({ end, prefix = '', suffix = '', title, desc, icon: Icon, delay = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2200; // 2.2 saniye
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo for ultra smooth landing
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="luxury-card"
      style={{
        padding: '2.5rem 1.8rem',
        borderRadius: '24px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        width: '54px',
        height: '54px',
        borderRadius: '50%',
        background: 'rgba(255, 236, 175, 0.08)',
        border: '1px solid rgba(255, 236, 175, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        color: 'var(--color-gold)'
      }}>
        <Icon size={26} />
      </div>

      <div style={{
        fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
        fontWeight: '900',
        fontFamily: 'var(--font-main)',
        color: 'var(--color-text)',
        lineHeight: '1.1',
        marginBottom: '0.5rem',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center'
      }}>
        <span style={{ color: 'var(--color-gold)', marginRight: '2px' }}>{prefix}</span>
        <span>{count}</span>
        <span style={{ color: 'var(--color-accent)', marginLeft: '2px' }}>{suffix}</span>
      </div>

      <h3 style={{
        fontSize: '1.1rem',
        fontWeight: '700',
        color: 'var(--color-gold)',
        marginBottom: '0.6rem',
        letterSpacing: '1px',
        textTransform: 'uppercase'
      }}>
        {title}
      </h3>

      <p style={{
        fontSize: '0.9rem',
        color: 'rgba(255, 255, 255, 0.6)',
        lineHeight: '1.6',
        margin: 0
      }}>
        {desc}
      </p>
    </motion.div>
  );
}

export default function StatsSection() {
  const isMobile = useIsMobile(768);

  const stats = [
    {
      end: 98,
      suffix: '%',
      title: 'Müşteri Memnuniyeti',
      desc: 'Sıfır tavizle, butik ve kurumsal ölçekte kusursuz dijital deneyim garantisi.',
      icon: Award,
      delay: 0
    },
    {
      end: 50,
      suffix: '+',
      title: 'Başarılı Proje',
      desc: 'E-ticaretten özel yapay zeka entegrasyonlarına kadar tamamlanan elit işler.',
      icon: ShieldCheck,
      delay: 0.15
    },
    {
      end: 48,
      suffix: ' Sa',
      title: 'İlk Prototip Süresi',
      desc: 'Fikrinizi hayata geçirirken aylar değil, saatler içinde canlı konsept sunumu.',
      icon: Zap,
      delay: 0.3
    },
    {
      end: 10,
      prefix: 'x',
      title: 'Ortalama Büyüme',
      desc: 'Optimize edilmiş UX/UI ve altyapı ile markaların dijital dönüşüm hızı.',
      icon: TrendingUp,
      delay: 0.45
    }
  ];

  return (
    <section style={{
      position: 'relative',
      padding: isMobile ? '5rem 1rem' : '7rem 2rem',
      background: 'linear-gradient(180deg, #0a0a0c 0%, rgba(154, 22, 31, 0.03) 50%, #0a0a0c 100%)',
      zIndex: 10
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '4.5rem' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: '800',
            color: 'var(--color-text)',
            marginBottom: '0.8rem',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-main)'
          }}>
            Rakamlarla Rüştümüz
          </h2>
          <p style={{
            color: 'var(--color-gold)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            Somut Başarı & Kanıtlanmış Etki
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {stats.map((item, index) => (
            <CounterItem key={index} {...item} />
          ))}
        </div>

        {/* Editorial Architectural CTA Banner (Zero Emojis, Human-Designed) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            marginTop: '2rem',
            padding: isMobile ? '3.5rem 0' : '5rem 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            gap: isMobile ? '3rem' : '4rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ width: '35px', height: '1px', background: 'var(--color-gold)' }} />
              <span style={{ fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: '600', fontFamily: 'var(--font-main)' }}>
                KESİNTİSİZ HİZMET & SLA PROTOKOLÜ
              </span>
            </div>
            <h3 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              fontFamily: 'var(--font-heading)',
              fontWeight: '400',
              color: 'var(--color-text)',
              lineHeight: '1.15',
              margin: 0,
              maxWidth: '680px',
              letterSpacing: '-0.5px'
            }}>
              Bir sonraki büyük projenizi <br />
              <span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>birlikte inşa edelim.</span>
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '420px' }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '1.05rem', lineHeight: '1.8', margin: 0, fontWeight: '300', fontFamily: 'var(--font-main)' }}>
              Hazır şablonları reddeder, her markaya özel mimari geliştiririz. 48 saat içinde projenize özel stratejik analiz ve konsept prototipi almak üzere ekibimizle tanışın.
            </p>

            <div>
              <Link
                to="/iletisim"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.3rem 2.6rem',
                  background: 'transparent',
                  border: '1px solid rgba(255, 236, 175, 0.4)',
                  color: 'var(--color-text)',
                  borderRadius: '2px', // Mimari ve keskin editoryal çizgi
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-gold)';
                  e.currentTarget.style.borderColor = 'var(--color-gold)';
                  e.currentTarget.style.color = '#000';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255, 236, 175, 0.4)';
                  e.currentTarget.style.color = 'var(--color-text)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span>PROJEYİ BAŞLATIN</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
