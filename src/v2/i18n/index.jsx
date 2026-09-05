/* eslint-disable react-refresh/only-export-components --
   Saglayici ve onu okuyan kancalar ayni dosyada duruyor: ikisi tek bir
   kavram ve ayrildiklarinda her cagri yeri iki ayri yerden ithal ederdi.
   Kural yalnizca gelistirmedeki sicak yenilemeyi ilgilendiriyor. */
import React, { createContext, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { tr } from './copy.tr';
import { en } from './copy.en';
import { it } from './copy.it';
import { DEFAULT_LANG, langFromPath, pathFor } from './paths';

/* Dil, adresin kendisinden geliyor — bir dugmeye basilinca degisen bir
   duruma degil. Boylece her dilin kendi adresi oluyor, geri tusu dogru
   calisiyor ve prerender her iki dili de statik olarak uretebiliyor. */

const DICTIONARIES = { tr, en, it };

const LangContext = createContext({ lang: DEFAULT_LANG, copy: tr });

export function LangProvider({ children }) {
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);

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
