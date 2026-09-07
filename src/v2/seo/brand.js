/* Markanin sabitleri ve kurumsal semasi.
   --------------------------------------------------------------------------
   Onceki tasarimin Seo bileseninin icinde duruyordu; o dosya kaldirilinca
   buraya tasindi. Burada bilesen yok, yalnizca veri: hem sayfa etiketlerini
   yazan bilesen hem de site haritasi bunu okuyor.

   `knowsAbout` alani markanin ne yaptigini yapay zeka tarayicilarina
   sayarak soyluyor. Eskiden yalnizca otel ve ilan isini sayiyordu; site
   alti alanda calisiyor ve liste de bunu yansitmali. */

export const SITE_URL = 'https://www.suerta.co';
/* Marka her yerde `suerta.co` yaziliyor — kullanicinin degismez kurali.
   Diger yazimlar (suerta co., Suerta Co.) yalnizca `alternateName` icinde,
   arama motoru bu varyantlari ayni varliga cozebilsin diye. */
export const SITE_NAME = 'suerta.co';
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const DESCRIPTION =
  'suerta.co, internet siteleri, e-ticaret, rezervasyon sistemleri, yapay zekâ otomasyonları ve SEO/GEO işleri yapan butik bir dijital stüdyo.';

/* Organization, LocalBusiness degil: marka yerel bir isletme paketine
   sokulmadan da adres tasiyabiliyor. */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: SITE_NAME,
  /* Marka sorgularinin (suerta.co / suerta co / suertaco) tek bir varliga
     cozulebilmesi icin butun yazim varyantlari. */
  alternateName: ['suerta co.', 'suerta co', 'Suerta Co.', 'suertaco', 'Suerta'],
  url: SITE_URL,
  /* Google'in logo yonergesi SVG kabul etmiyor (JPG/PNG/GIF); SVG verilince
     logo sessizce yok sayiliyor. `npm run og` ile uretilen PNG. */
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/logo-512.png`,
    width: 512,
    height: 512,
  },
  image: DEFAULT_IMAGE,
  slogan: 'Markanızın Şansı',
  email: 'suerta.info@gmail.com',
  telephone: '+905060693525',
  description: DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Eskişehir',
    addressCountry: 'TR',
  },
  areaServed: [
    { '@type': 'Country', name: 'Türkiye' },
    { '@type': 'Place', name: 'Worldwide' },
  ],
  knowsAbout: [
    'İnternet Sitesi Tasarımı',
    'Website Design and Development',
    'E-Ticaret Kurulumu',
    'E-Commerce Development',
    'Shopify Kurulumu',
    'Yapay Zekâ Otomasyonu',
    'WhatsApp Chatbot',
    'Telegram Bot Geliştirme',
    'Otel Web Sitesi',
    'Otel Rezervasyon Sistemi',
    'Direct Booking Engine',
    'Airbnb ve Kısa Dönem Kiralama Sitesi',
    'Emlak İlan Sitesi',
    'Channel Manager Entegrasyonu',
    'Teknik SEO',
    'GEO (Generative Engine Optimization)',
    'Web Performans Optimizasyonu',
  ],
  sameAs: ['https://instagram.com/suerta.co'],
};

/* Sitenin kendisi bir varlik olarak.
   --------------------------------------------------------------------------
   Organization "bu marka kim" diyor; WebSite "bu adres o markanin sitesi"
   diyor ve ikisini `publisher` uzerinden birbirine bagliyor. Bu bag olmadan
   arama motoru sayfalari markaya baglamak icin tahmin yuruyor.

   Icinde arama kutusu olan siteler buraya `potentialAction` da koyuyor;
   burada site ici arama yok, o yuzden uydurma bir uc nokta tarif etmiyoruz. */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: DESCRIPTION,
  inLanguage: ['tr-TR', 'en', 'it'],
  publisher: { '@id': `${SITE_URL}/#organization` },
};
