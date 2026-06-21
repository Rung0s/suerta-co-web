import React from 'react';
import { PenTool, Layout, Rocket } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function ProcessSection() {
  const [ref1, isVisible1] = useScrollReveal();
  const [ref2, isVisible2] = useScrollReveal(0.2);
  const [ref3, isVisible3] = useScrollReveal(0.2);
  const [ref4, isVisible4] = useScrollReveal(0.2);

  const styles = {
    section: {
      padding: '8rem 2rem',
      background: 'linear-gradient(to bottom, transparent, rgba(154, 22, 31, 0.05))'
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
      color: 'var(--color-secondary)',
      maxWidth: '600px',
      margin: '0 auto'
    },
    timeline: {
      maxWidth: '800px',
      margin: '0 auto',
      position: 'relative'
    },
    line: {
      position: 'absolute',
      left: '50px',
      top: 0,
      bottom: 0,
      width: '2px',
      background: 'rgba(255,255,255,0.1)'
    },
    step: {
      display: 'flex',
      gap: '2rem',
      marginBottom: '4rem',
      position: 'relative',
      zIndex: 1,
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
    },
    iconBox: {
      width: '100px',
      height: '100px',
      flexShrink: 0,
      background: 'var(--color-bg)',
      border: '2px solid rgba(255, 236, 175, 0.3)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--color-gold)',
      boxShadow: '0 0 20px rgba(255, 236, 175, 0.1)'
    },
    content: {
      paddingTop: '1rem'
    },
    stepTitle: {
      fontSize: '1.5rem',
      marginBottom: '0.5rem'
    },
    stepDesc: {
      color: 'var(--color-secondary)',
      lineHeight: '1.6'
    }
  };

  return (
    <section id="process" style={styles.section}>
      <div style={styles.header} ref={ref1}>
        <h2 style={styles.title}>Kreatif Yaklaşımımız</h2>
        <p style={styles.subtitle}>Sıradan kod yazmıyoruz. İşletmenizin dijital kimliğini baştan sona, stratejik bir mükemmellikle inşa ediyoruz.</p>
      </div>

      <div style={styles.timeline}>
        <div style={styles.line}></div>
        
        <div style={{ ...styles.step, opacity: isVisible2 ? 1 : 0, transform: isVisible2 ? 'translateY(0)' : 'translateY(30px)' }} ref={ref2}>
          <div style={styles.iconBox}><PenTool size={32} /></div>
          <div style={styles.content}>
            <h3 style={styles.stepTitle}>1. Stratejik Keşif</h3>
            <p style={styles.stepDesc}>İşletmenizin ruhunu (vibe) ve hedeflerini anlamak için derinlemesine bir analiz yapıyoruz. Doğru görsel dili ve hedef kitle mesajını belirliyoruz.</p>
          </div>
        </div>

        <div style={{ ...styles.step, opacity: isVisible3 ? 1 : 0, transform: isVisible3 ? 'translateY(0)' : 'translateY(30px)' }} ref={ref3}>
          <div style={styles.iconBox}><Layout size={32} /></div>
          <div style={styles.content}>
            <h3 style={styles.stepTitle}>2. Estetik & Mimari Tasarım</h3>
            <p style={styles.stepDesc}>Premium karanlık mod, pürüzsüz animasyonlar ve modern tipografi ile rakiplerinizden ayrışan, kusursuz bir arayüz tasarlıyoruz.</p>
          </div>
        </div>

        <div style={{ ...styles.step, marginBottom: 0, opacity: isVisible4 ? 1 : 0, transform: isVisible4 ? 'translateY(0)' : 'translateY(30px)' }} ref={ref4}>
          <div style={styles.iconBox}><Rocket size={32} /></div>
          <div style={styles.content}>
            <h3 style={styles.stepTitle}>3. Kusursuz İcra & MRR</h3>
            <p style={styles.stepDesc}>İleri seviye otomasyonlar ve sağlam altyapılarla projenizi yayına alıyoruz. Suerta Kalkanı ile sürekli güncel ve güvende kalmanızı sağlıyoruz.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
