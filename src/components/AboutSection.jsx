import React from 'react';
import { Award, ShieldCheck, Users, Zap } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import { CounterItem } from './StatsSection';
import { useLanguage } from '../context/LanguageContext';

export default function AboutSection() {
  const [ref1, isVisible1] = useScrollReveal();
  const [ref2, isVisible2] = useScrollReveal(0.2);
  const { isEN } = useLanguage();

  const styles = {
    section: {
      padding: '10rem 2rem',
      position: 'relative',
      backgroundColor: 'var(--color-bg)'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '8rem'
    },
    visionSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '3rem',
      maxWidth: '900px',
      margin: '0 auto',
      textAlign: 'center',
      opacity: isVisible1 ? 1 : 0,
      transform: isVisible1 ? 'translateY(0)' : 'translateY(40px)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
    },
    visionTitle: {
      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
      fontFamily: 'var(--font-heading)',
      color: 'var(--color-text)',
      lineHeight: '1.2'
    },
    visionHighlight: {
      color: 'var(--color-gold)',
      fontStyle: 'italic'
    },
    visionText: {
      fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
      lineHeight: '2',
      color: 'rgba(255, 255, 255, 0.7)',
      fontFamily: 'var(--font-main)',
      fontWeight: '300'
    }
  };

  return (
    <section id="about" style={styles.section}>
      <div style={styles.container}>
        
        {/* Vizyon ve Hakkımızda */}
        <div ref={ref1} style={styles.visionSection}>
          <h2 style={styles.visionTitle}>
            {isEN ? (
              <>
                An Aesthetic Rebellion <br />
                <span style={styles.visionHighlight}>Against Mediocrity</span>
              </>
            ) : (
              <>
                Sıradanlığa Karşı <br />
                <span style={styles.visionHighlight}>Estetik Bir İsyan</span>
              </>
            )}
          </h2>
          <p style={styles.visionText}>
            {isEN ? (
              <>
                The digital landscape is filled with copy-paste templates and soulless layouts. At <strong>suerta co.</strong>, we exist to bridge this aesthetic gap. We don't just write code; we build digital artworks that reflect your brand's unique identity. Our goal is not just to attract visitors, but to leave an indelible mark on them.
              </>
            ) : (
              <>
                Dijital dünya, birbirinin kopyası sıkıcı şablonlar ve ruhsuz tasarımlarla dolu. Biz <strong>suerta co.</strong> olarak bu gürültünün içinde piyasadaki o büyük estetik açığı kapatmak için varız. Sadece kod yazmıyoruz; markanızın karakterini yansıtan, kullanıcıyı içine çeken dijital sanat eserleri inşa ediyoruz. Amacımız ziyaretçilerinizi etkilemek değil, onlarda kalıcı bir iz bırakmak.
              </>
            )}
          </p>
        </div>

        {/* Canlı Sayaçlı Rüştümüz Kartları (Stats Section) */}
        <div ref={ref2} style={{
          opacity: isVisible2 ? 1 : 0,
          transform: isVisible2 ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '5rem 0'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h3 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontFamily: 'var(--font-heading)',
              color: 'var(--color-text)',
              marginBottom: '0.6rem',
              textTransform: 'uppercase'
            }}>
              {isEN ? 'PROVEN METRICS & IMPACT' : 'Rakamlarla Rüştümüz'}
            </h3>
            <p style={{
              color: 'var(--color-gold)',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontSize: '0.9rem',
              fontWeight: '600',
              margin: 0
            }}>
              {isEN ? 'No Templates. No Copies. Pure Craftsmanship.' : 'Şablon Yok. Kopyalama Yok. Sadece Saf Yaratıcılık.'}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem'
          }}>
            <CounterItem
              end={100}
              suffix="%"
              title={isEN ? 'Bespoke Architecture' : 'Bespoke Tasarım'}
              desc={isEN ? '100% custom-tailored interface architecture with zero generic templates.' : 'Hazır şablon veya kopyalama olmadan %100 markanıza özel arayüz mimarisi.'}
              icon={Award}
              delay={0}
            />
            <CounterItem
              end={50}
              suffix="+"
              title={isEN ? 'Delivered Projects' : 'Başarılı Proje'}
              desc={isEN ? 'Elite web, e-commerce, and custom software systems delivered globally.' : 'Web, e-ticaret ve operasyonel sistemlerde teslim edilen elit işler.'}
              icon={ShieldCheck}
              delay={0.15}
            />
            <CounterItem
              end={15}
              suffix="+"
              title={isEN ? 'Years Expertise' : 'Yıllık Uzmanlık'}
              desc={isEN ? 'Deep-rooted experience at the intersection of engineering and digital art.' : 'Mühendislik ve sanatın kesişiminde kazanılan köklü sektör tecrübesi.'}
              icon={Users}
              delay={0.3}
            />
            <CounterItem
              end={48}
              suffix={isEN ? ' Hours' : ' Sa'}
              title={isEN ? 'Rapid Concepting' : 'Hızlı Prototip'}
              desc={isEN ? 'Transitioning from idea to interactive prototype concept within 48 hours.' : 'Fikir aşamasından ilk interaktif konsept sunumuna 48 saatte geçiş.'}
              icon={Zap}
              delay={0.45}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
