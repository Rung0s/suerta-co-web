/* Yazi adresleri, her dilde kendi dilinde.
   --------------------------------------------------------------------------
   Yazinin kimligi (`id`) Turkce ve degismiyor: kapak gorseli, ceviri
   tablolari, site haritasi tarihleri ve ic baglantilar hep onun uzerinden
   calisiyor. Degisen sey yalnizca adreste gorunen parca.

   Neden: /en/blog/web-sitesi-maliyeti-2026 adresinde Ingilizce bir yazi
   duruyordu. Arama motoru adresteki kelimeleri sayfanin konusuna dair bir
   isaret sayar; Ingilizce arayan birine Turkce bir adres gosterildiginde
   hem eslesme zayiflar hem de baglanti paylasildiginda okunmaz durur.

   Turkce dilin adresi kimligin kendisi — bu tablo yalnizca digerlerini
   tasiyor. */

export const POST_SLUGS = {
  'web-sitesi-maliyeti-2026': { en: 'website-cost-2026', it: 'costo-sito-web-2026' },
  'shopify-mi-woocommerce-mi': { en: 'shopify-or-woocommerce', it: 'shopify-o-woocommerce' },
  'yeni-site-seo-checklist': { en: 'new-website-seo-checklist', it: 'checklist-seo-nuovo-sito' },
  'otel-rezervasyon-hizi': { en: 'hotel-booking-speed', it: 'velocita-prenotazione-hotel' },
  'karanlik-mod-premium': { en: 'dark-mode-premium-trust', it: 'modalita-scura-premium' },
  'ozel-yazilim-vs-hazir-paketler': {
    en: 'custom-software-vs-off-the-shelf',
    it: 'software-su-misura-o-pacchetti',
  },
  'fotograf-cekimi': { en: 'professional-photography', it: 'servizio-fotografico-professionale' },
  'mobil-optimizasyon': { en: 'mobile-optimisation', it: 'ottimizzazione-mobile' },
  'google-ads-donusum': {
    en: 'google-ads-conversion-tracking',
    it: 'tracciamento-conversioni-google-ads',
  },
  'google-isletme-profili': { en: 'google-business-profile', it: 'profilo-attivita-google' },
  'whatsapp-chatbot': { en: 'whatsapp-chatbot', it: 'chatbot-whatsapp' },
  'telegram-sinav-botu': { en: 'telegram-exam-bot', it: 'bot-esami-telegram' },
  'geo-yapay-zeka-gorunurluk': {
    en: 'what-is-geo-ai-visibility',
    it: 'cos-e-la-geo-visibilita-ai',
  },
};

/* Kimlikten adrese. Ceviri yoksa kimlik oldugu gibi kaliyor: adresi
   olmayan bir sayfa birakmaktansa Turkce adres daha iyi. */
export function slugFor(id, lang) {
  return POST_SLUGS[id]?.[lang] ?? String(id);
}

/* Adresten kimlige. Eski Turkce adres hala tanininiyor cunku tabloda
   bulunamayan deger kimligin kendisi kabul ediliyor; boylece yonlendirme
   bir sebeple calismasa da sayfa 404 vermiyor. */
export function idFromSlug(slug, lang) {
  if (lang === 'tr') return slug;
  for (const [id, byLang] of Object.entries(POST_SLUGS)) {
    if (byLang[lang] === slug) return id;
  }
  return slug;
}

/* Yonlendirme listesi uretenlerin ihtiyaci: eski adres yeni adresten
   farkliysa cift, degilse hicbir sey. */
export function slugRedirects() {
  const out = [];
  for (const [id, byLang] of Object.entries(POST_SLUGS)) {
    for (const [lang, slug] of Object.entries(byLang)) {
      if (slug !== id) out.push({ lang, from: id, to: slug });
    }
  }
  return out;
}
