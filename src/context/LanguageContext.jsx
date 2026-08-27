import React, { createContext, useContext, useState } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

// localStorage Safari gizli modda / depolama engelliyken exception fırlatır.
// Bu sarmalayıcılar olmadan uygulama boş sayfayla açılıyor.
const safeGet = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSet = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* depolama yoksa sessizce geç */
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    // Prerender (puppeteer) en-US locale ile koşuyor. Dil tespitini yapmadan
    // TR'ye sabitlemezsek üretilen statik HTML'in tamamı İngilizce oluyor,
    // meta ve JSON-LD ise tr-TR diyor.
    if (typeof navigator !== 'undefined' && navigator.webdriver === true) return 'TR';

    const saved = safeGet('suerta_lang');
    if (saved === 'TR' || saved === 'EN') return saved;
    // Otomatik dil tespiti: Tarayıcı dili Türkçe değilse varsayılan olarak EN yap!
    if (typeof navigator !== 'undefined' && navigator.language) {
      return navigator.language.toLowerCase().startsWith('tr') ? 'TR' : 'EN';
    }
    return 'TR';
  });

  const setLanguage = (lang) => {
    if (lang === 'TR' || lang === 'EN') {
      setLanguageState(lang);
      safeSet('suerta_lang', lang);
      safeSet('suerta_lang_selected', 'true');
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'TR' ? 'EN' : 'TR';
    setLanguage(nextLang);
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
      isEN: language === 'EN'
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
