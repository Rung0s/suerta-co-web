import React from 'react';
import { Globe, MessageCircle, X, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageWelcomeModal() {
  const { language, setLanguage, showLanguageWelcome, dismissWelcomeModal } = useLanguage();

  if (!showLanguageWelcome) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '90px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9990,
        width: '90%',
        maxWidth: '680px',
        background: 'rgba(15, 15, 18, 0.95)',
        backdropFilter: 'blur(25px)',
        border: '1px solid var(--color-gold)',
        borderRadius: '16px',
        padding: '1.2rem 1.8rem',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(255, 236, 175, 0.15)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.9rem',
        animation: 'fadeInDown 0.5s ease-out'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Globe size={20} color="var(--color-gold)" />
          <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
            Suerta Co. Global Experience / Dil Seçimi
          </span>
        </div>
        <button
          onClick={() => dismissWelcomeModal(language)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#888',
            cursor: 'pointer',
            padding: '0.3rem',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <X size={18} />
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '0.9rem', color: '#ccc', flex: 1, minWidth: '220px' }}>
          Welcome! Select your preferred language / Lütfen dili seçin:
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button
            onClick={() => dismissWelcomeModal('TR')}
            style={{
              padding: '0.5rem 1.2rem',
              borderRadius: '8px',
              border: language === 'TR' ? '2px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.15)',
              background: language === 'TR' ? 'rgba(255, 236, 175, 0.15)' : 'rgba(255,255,255,0.05)',
              color: '#fff',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease'
            }}
          >
            🇹🇷 Türkçe {language === 'TR' && <Check size={14} color="var(--color-gold)" />}
          </button>

          <button
            onClick={() => dismissWelcomeModal('EN')}
            style={{
              padding: '0.5rem 1.2rem',
              borderRadius: '8px',
              border: language === 'EN' ? '2px solid var(--color-gold)' : '1px solid rgba(255,255,255,0.15)',
              background: language === 'EN' ? 'rgba(255, 236, 175, 0.15)' : 'rgba(255,255,255,0.05)',
              color: '#fff',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease'
            }}
          >
            🇬🇧 English {language === 'EN' && <Check size={14} color="var(--color-gold)" />}
          </button>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.7rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: '#888' }}>
          {language === 'EN' ? 'Direct International Client Support' : 'Uluslararası & Yerel Müşteri Temsilcisi'}
        </span>
        <a
          href={`https://wa.me/905060693525?text=${encodeURIComponent(
            language === 'EN'
              ? 'Hello Suerta Co., I would like to get information regarding a project.'
              : 'Merhaba Suerta Co., projem için bilgi almak istiyorum.'
          )}`}
          target="_blank"
          rel="noreferrer"
          style={{
            color: '#25D366',
            fontWeight: '700',
            fontSize: '0.85rem',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
        >
          <MessageCircle size={16} /> 💬 {language === 'EN' ? 'Instant WhatsApp Chat →' : 'Doğrudan WhatsApp İletişim →'}
        </a>
      </div>
    </div>
  );
}
