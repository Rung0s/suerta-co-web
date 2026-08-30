/* Markanin sabitleri ve kurumsal semasi.
   --------------------------------------------------------------------------
   Onceki tasarimin Seo bileseninin icinde duruyordu; o dosya kaldirilinca
   buraya tasindi. Burada bilesen yok, yalnizca veri: hem sayfa etiketlerini
   yazan bilesen hem de site haritasi bunu okuyor.

   `knowsAbout` alani markanin ne yaptigini yapay zeka tarayicilarina
   sayarak soyluyor. Eskiden yalnizca otel ve ilan isini sayiyordu; site
   alti alanda calisiyor ve liste de bunu yansitmali. */

export const SITE_URL = 'https://suerta.co';
export const SITE_NAME = 'suerta co.';
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

const DESCRIPTION =
  'suerta co. (suerta.co) internet siteleri, e-ticaret, rezervasyon sistemleri, yapay zekâ otomasyonları ve SEO/GEO işleri yapan butik bir dijital stüdyo.';

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
  alternateName: ['suerta co', 'Suerta Co.', 'suerta.co', 'suertaco', 'Suerta'],
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/favicon-v2.svg`,
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
