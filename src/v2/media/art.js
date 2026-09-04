/* Halftone cizimler — hangi icerik hangi gorseli tasiyor.
   --------------------------------------------------------------------------
   Kapaklar yaziya degil konuya bagli: ayni konudaki iki yazi ayni kapagi
   paylasir. On uc yazi icin on uc ayri gorsel uretmek yerine alti tema;
   yeni bir yazi geldiginde buraya bir satir ekleniyor, gorsel uretilmiyor. */
const COVER_OF = {
  'web-sitesi-maliyeti-2026': 'budget',
  'google-ads-donusum': 'budget',
  'shopify-mi-woocommerce-mi': 'ecommerce',
  'ozel-yazilim-vs-hazir-paketler': 'ecommerce',
  'yeni-site-seo-checklist': 'seo',
  'mobil-optimizasyon': 'seo',
  'google-isletme-profili': 'seo',
  'karanlik-mod-premium': 'seo',
  'fotograf-cekimi': 'hotel',
  'otel-rezervasyon-hizi': 'hotel',
  'whatsapp-chatbot': 'bot',
  'telegram-sinav-botu': 'bot',
  'geo-yapay-zeka-gorunurluk': 'geo',
};

export function coverFor(postId) {
  const key = COVER_OF[postId] || 'seo';
  return {
    src: `/img/blog/${key}-1200.webp`,
    srcSet: `/img/blog/${key}-600.webp 600w, /img/blog/${key}-1200.webp 1200w`,
  };
}

/* Hizmet satirlarinin nesneleri: alan basina tek obje. */
const OBJECT_OF = {
  'internet-siteleri': 'terminal',
  'e-ticaret': 'cart',
  'yapay-zeka-otomasyon': 'robot',
  'otel-rezervasyon': 'key',
  'emlak-kiralama': 'house',
  'gorunurluk-buyume': 'telescope',
};

export function objectFor(slug) {
  return `/img/svc/${OBJECT_OF[slug] || 'terminal'}.webp`;
}
