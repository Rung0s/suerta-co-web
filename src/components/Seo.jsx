import { useEffect } from 'react';

/**
 * suerta co. — merkezi SEO / GEO ayarları
 * Not: SPA olduğu için <head> etiketlerini imperatif (elle) yönetiyoruz;
 * böylece her route'ta tekilleştirilmiş (duplicate olmayan) doğru meta üretilir.
 * Statik prerender eklendiğinde bu etiketler üretilen HTML'e de yansır.
 */
export const SITE_URL = 'https://suerta.co';
export const SITE_NAME = 'suerta co.';
export const DEFAULT_TITLE = 'Eskişehir İnternet Sitesi Ajansı | Suerta Co. Web Tasarım & E-Ticaret';
export const DEFAULT_DESC = 'Suerta Co. — Eskişehir profesyonel web tasarım ve internet sitesi ajansı. Özel web yazılımı, e-ticaret altyapıları ve yapay zeka otomasyon çözümleri sunuyoruz.';
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.svg`;

// Global kurumsal kimlik ve yapay zeka (GEO) uyumlu işletme şeması
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'WebSiteAgency'],
  name: SITE_NAME,
  alternateName: ['Suerta Co.', 'Suerta Co. Dijital Web Ajansı', 'Suerta Web Tasarım'],
  url: SITE_URL,
  logo: `${SITE_URL}/favicon-v2.svg`,
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
  areaServed: ['Eskişehir', 'Türkiye', 'Global'],
  knowsAbout: [
    'Web Tasarım',
    'İnternet Sitesi Yapımı',
    'E-Ticaret Sistemleri',
    'Yapay Zeka Otomasyonu',
    'Eskişehir Ajans Hizmetleri',
    'Özel Yazılım Geliştirme'
  ],
  sameAs: ['https://instagram.com/suerta.co'],
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
  const fullTitle = title
    ? (title.includes('suerta') ? title : `${title} — suerta co.`)
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
  }, [fullTitle, description, canonical, imageAbs, type, includeOrganization, jsonLd]);

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
