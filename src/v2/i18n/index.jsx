/* eslint-disable react-refresh/only-export-components --
   Saglayici ve onu okuyan kancalar ayni dosyada duruyor: ikisi tek bir
   kavram ve ayrildiklarinda her cagri yeri iki ayri yerden ithal ederdi.
   Kural yalnizca gelistirmedeki sicak yenilemeyi ilgilendiriyor. */
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { tr } from './copy.tr';
import { en } from './copy.en';
import { it } from './copy.it';
import { DEFAULT_LANG, langFromPath, pathFor, swapLangPath } from './paths';

/* Dil, adresin kendisinden geliyor — bir dugmeye basilinca degisen bir
   duruma degil. Boylece her dilin kendi adresi oluyor, geri tusu dogru
   calisiyor ve prerender her iki dili de statik olarak uretebiliyor. */

const DICTIONARIES = { tr, en, it };

const LangContext = createContext({ lang: DEFAULT_LANG, copy: tr });

const AUTO_REDIRECT_KEY = 'suerta_lang_auto';

/* Ilk ziyarette tarayici diline gore adres onerisi. Yalnizca Turkce
   anasayfaya cikan ve daha once hic dil secmemis ziyaretciyi ilgilendiriyor
   — dogrudan /en veya /it'e gelen, ya da bir yazi/proje linkiyle gelen
   ziyaretcinin adresine dokunulmuyor.

   `navigator.webdriver` kontrolu prerender ve arama botlarini disarida
   birakiyor: puppeteer'in varsayilan tarayici dili en-US, o kontrol
   olmasa her /'in prerender'i /en'e yonlenip Turkce siniflari asla
   uretilmezdi. */
function useAutoLangRedirect(lang, pathname) {
  const navigate = useNavigate();

  useEffect(() => {
    if (lang !== DEFAULT_LANG || pathname !== '/') return;
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;
    if (navigator.webdriver) return;

    let alreadyChecked;
    try {
      alreadyChecked = window.localStorage.getItem(AUTO_REDIRECT_KEY);
    } catch {
      alreadyChecked = '1';
    }
    if (alreadyChecked) return;
    try {
      window.localStorage.setItem(AUTO_REDIRECT_KEY, '1');
    } catch {
      /* Gizli sekme vb. — sorun degil, yalnizca her ziyarette tekrar dener. */
    }

    const codes = (navigator.languages?.length ? navigator.languages : [navigator.language])
      .filter(Boolean)
      .map((code) => code.slice(0, 2).toLowerCase());
    const detected = codes.find((code) => code === 'it' || code === 'en');
    if (!detected) return;

    navigate(swapLangPath(pathname, lang, detected), { replace: true });
  }, [lang, pathname, navigate]);
}

export function LangProvider({ children }) {
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);

  useAutoLangRedirect(lang, pathname);

  const value = useMemo(
    () => ({ lang, copy: DICTIONARIES[lang] ?? tr }),
    [lang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/* Metin agaci. Bilesenler `const c = useCopy()` deyip `c.hero.lead` gibi
   okuyor; anahtar iki dilde de ayni. */
export function useCopy() {
  return useContext(LangContext).copy;
}

/* Gecerli dildeki adres. Sayfalar arasi her baglanti bundan geciyor ki
   Ingilizce sayfadan Turkce sayfaya dusulmesin. */
export function useHref() {
  const { lang } = useLang();
  return (page, params) => pathFor(page, lang, params);
}

export { DEFAULT_LANG, langFromPath, pathFor };
