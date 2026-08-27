import { useEffect } from 'react';

/**
 * suerta co. — merkezi SEO / GEO ayarları
 * Not: SPA olduğu için <head> etiketlerini imperatif (elle) yönetiyoruz;
 * böylece her route'ta tekilleştirilmiş (duplicate olmayan) doğru meta üretilir.
 * Statik prerender eklendiğinde bu etiketler üretilen HTML'e de yansır.
 */
export const SITE_URL = 'https://suerta.co';
export const SITE_NAME = 'suerta co.';
export const DEFAULT_TITLE = 'suerta co. — Otel, Airbnb & Emlak Siteleri Stüdyosu';
export const DEFAULT_DESC = 'suerta co. (suerta.co) — otel, günlük kiralık ve emlak markaları için rezervasyon ve ilan siteleri kuran butik dijital stüdyo. Komisyonsuz direkt rezervasyon, çok dilli listing, hızlı görsel altyapı.';
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

// Global kurumsal kimlik ve yapay zeka (GEO) uyumlu işletme şeması.
// Not: ProfessionalService bir LocalBusiness alt tipidir ve markayı yerel
// işletme olarak konumlandırıyordu; sade Organization'a geçildi. Adres
// kalıyor — Organization adres taşıyabilir, bu yerel pakete sokmaz.
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: SITE_NAME,
  // Marka sorgularının (suerta.co / suerta co / suertaco) tek bir varlığa
  // çözülebilmesi için tüm yazım varyantları burada listeleniyor.
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
  description: DEFAULT_DESC,
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
    'Otel Web Sitesi',
    'Otel Rezervasyon Sistemi',
    'Direct Booking Engine',
    'Airbnb ve Kısa Dönem Kiralama Sitesi',
    'Vacation Rental Website',
    'Emlak İlan Sitesi',
    'Real Estate Listing Platform',
    'Channel Manager Entegrasyonu',
    'Çok Dilli İlan Yönetimi',
    'Web Performans Optimizasyonu',
  ],
  sameAs: ['https://instagram.com/suerta.co'],
};

/** Hizmetler sayfası için Service + OfferCatalog şeması */
export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Otel, Airbnb ve emlak markaları için rezervasyon ve ilan sitesi geliştirme',
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: [
    { '@type': 'Country', name: 'Türkiye' },
    { '@type': 'Place', name: 'Worldwide' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Hizmetler',
    itemListElement: [
      'Otel web sitesi ve komisyonsuz direkt rezervasyon',
      'Airbnb / günlük kiralık listing sitesi',
      'Emlak ilan platformu ve portföy paneli',
      'Rezervasyon motoru, channel manager ve ödeme entegrasyonları',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name },
    })),
  },
};

/** Head içindeki bir <meta>'yı bul/oluştur ve içeriğini güncelle */
function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/** data-seo-jsonld ile işaretli tüm schema script'lerini yenile */
function setJsonLd(schemas) {
  document.head
    .querySelectorAll('script[data-seo-jsonld]')
    .forEach((n) => n.remove());
  const list = Array.isArray(schemas) ? schemas : [schemas];
  list.filter(Boolean).forEach((schema) => {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.setAttribute('data-seo-jsonld', 'true');
    s.textContent = JSON.stringify(schema);
    document.head.appendChild(s);
  });
}

export default function Seo({
  title,
  description = DEFAULT_DESC,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd,
  includeOrganization = true,
}) {
  // Marka her başlıkta geçmeli. Kontrol büyük/küçük harfe duyarsız: eskisi
  // "Suerta" içeren başlıkları kaçırıyor ve markayı iki kez ekliyordu.
  const fullTitle = title
    ? (title.toLowerCase().includes('suerta') ? title : `${title} — ${SITE_NAME}`)
    : DEFAULT_TITLE;
  const canonical = `${SITE_URL}${path === '/' ? '/' : path.replace(/\/$/, '')}`;
  const imageAbs = image?.startsWith('http') ? image : `${SITE_URL}${image}`;

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta('name', 'description', description);
    upsertLink('canonical', canonical);

    // Open Graph
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:image', imageAbs);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', 'tr_TR');

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageAbs);

    const schemas = [];
    if (includeOrganization) schemas.push(organizationSchema);
    if (jsonLd) schemas.push(...(Array.isArray(jsonLd) ? jsonLd : [jsonLd]));
    setJsonLd(schemas);
    // jsonLd her çağrı yerinde yeni bir nesne olarak kuruluyor. Referansına
    // bağlanırsak efekt her render'da script'leri silip yeniden yaratıyor.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullTitle, description, canonical, imageAbs, type, includeOrganization, JSON.stringify(jsonLd)]);

  return null;
}

/** Yardımcı: kırıntı (breadcrumb) şeması üretir */
export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

/** Yardımcı: FAQ şeması üretir */
export function faqSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}
