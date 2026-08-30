/* Iki dil, iki ayri adres agaci.
   --------------------------------------------------------------------------
   Turkce kok dizinde, Ingilizce /en altinda duruyor ve her sayfanin kendi
   dilinde bir adresi var (/hizmetlerimiz — /en/services). Tek adres uzerinde
   dil degistirmek daha kolay yazilirdi ama o zaman Ingilizce icerigin
   indekslenebilecegi bir adres olmaz: arama motoru ve yapay zeka
   tarayicilari sayfayi yalnizca varsayilan dilde gorur.

   Buradaki tablo tek dogru kaynak: rota tanimlari, dil degistirici,
   hreflang etiketleri, site haritasi ve prerender listesi hepsi bunu
   okuyor. */

export const LANGS = ['tr', 'en'];
export const DEFAULT_LANG = 'tr';

export const HTML_LANG = { tr: 'tr-TR', en: 'en' };

/* Anahtar = sayfanin kimligi. Deger = o sayfanin dildeki adresi.
   `:id` tasiyanlar liste sayfasinin altindaki detay sayfalari. */
export const PAGES = {
  home: { tr: '/', en: '/en' },
  services: { tr: '/hizmetlerimiz', en: '/en/services' },
  work: { tr: '/referanslar', en: '/en/work' },
  workItem: { tr: '/referanslar/:id', en: '/en/work/:id' },
  blog: { tr: '/blog', en: '/en/blog' },
  blogItem: { tr: '/blog/:id', en: '/en/blog/:id' },
  about: { tr: '/hakkimizda', en: '/en/about' },
  contact: { tr: '/iletisim', en: '/en/contact' },
};

/* Bir sayfanin adresi, gerekiyorsa `:id` yerine gercek deger konarak. */
export function pathFor(page, lang = DEFAULT_LANG, params) {
  const template = PAGES[page]?.[lang];
  if (!template) return PAGES.home[lang] ?? '/';
  if (!params) return template;
  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`:${key}`, String(value)),
    template
  );
}

/* Adresten dili okumak: /en ve /en/... Ingilizce, kalan her sey Turkce. */
export function langFromPath(pathname) {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : DEFAULT_LANG;
}

/* Ayni sayfanin diger dildeki karsiligi — dil degistiricinin ve hreflang
   etiketlerinin ihtiyaci olan sey. Detay sayfalarinda kimlik korunuyor:
   yazinin ya da projenin kimligi dilden bagimsiz. */
export function alternatePath(page, params) {
  return LANGS.reduce((acc, lang) => {
    acc[lang] = pathFor(page, lang, params);
    return acc;
  }, {});
}

/* Bulunulan adresin oteki dildeki karsiligi. Sayfa tablosunda eslesen bir
   kalip varsa onun karsiligi, yoksa oteki dilin anasayfasi — dil
   degistirici ziyaretciyi bos bir adrese birakmamali.

   Detay sayfalarinda kimlik korunuyor: yazinin ve projenin kimligi
   dilden bagimsiz, degisen yalnizca yolun kendisi. */
export function swapLangPath(pathname, lang, other) {
  for (const byLang of Object.values(PAGES)) {
    const template = byLang[lang];
    if (!template) continue;
    if (template === pathname) return byLang[other];

    if (template.includes(':id')) {
      const prefix = template.split(':id')[0];
      if (pathname.startsWith(prefix)) {
        const id = pathname.slice(prefix.length);
        if (id && !id.includes('/')) return byLang[other].replace(':id', id);
      }
    }
  }

  return PAGES.home[other];
}
