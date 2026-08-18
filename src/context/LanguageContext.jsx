import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('suerta_lang');
    if (saved && (saved === 'TR' || saved === 'EN')) return saved;
    // Otomatik dil tespiti: Tarayıcı dili Türkçe değilse varsayılan olarak EN yap!
    if (typeof navigator !== 'undefined' && navigator.language) {
      return navigator.language.toLowerCase().startsWith('tr') ? 'TR' : 'EN';
    }
    return 'TR';
  });

  const [showLanguageWelcome, setShowLanguageWelcome] = useState(() => {
    // Kullanıcı daha önce seçim yapmadıysa hoş geldin dil seçim modalını göster
    return !localStorage.getItem('suerta_lang_selected');
  });

  const setLanguage = (lang) => {
    if (lang === 'TR' || lang === 'EN') {
      setLanguageState(lang);
      localStorage.setItem('suerta_lang', lang);
      localStorage.setItem('suerta_lang_selected', 'true');
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'TR' ? 'EN' : 'TR';
    setLanguage(nextLang);
  };

  const dismissWelcomeModal = (chosenLang) => {
    if (chosenLang) setLanguage(chosenLang);
    setShowLanguageWelcome(false);
    localStorage.setItem('suerta_lang_selected', 'true');
  };

  // Nested objeler için 'nav.about' tarzı çeviri anahtarı getirme yardımcısı
  const t = (keyPath) => {
    const keys = keyPath.split('.');
    let current = translations[language];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to TR if missing
        let fallback = translations['TR'];
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) fallback = fallback[fk];
        }
        return typeof fallback === 'string' ? fallback : keyPath;
      }
    }
    return typeof current === 'string' ? current : keyPath;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      toggleLanguage,
      t,
      isEN: language === 'EN',
      showLanguageWelcome,
      dismissWelcomeModal
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
