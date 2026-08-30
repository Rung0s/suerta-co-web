/* eslint-disable react-refresh/only-export-components --
   Bilesen ve urettigi sema yardimcilari ayni dosyada: semalar yalnizca bu
   bilesene veriliyor. Kural yalnizca sicak yenilemeyi ilgilendiriyor. */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { organizationSchema, SITE_URL, SITE_NAME } from './brand';
import { useLang } from '../i18n';
import { HTML_LANG, LANGS, swapLangPath } from '../i18n/paths';

/* Sayfa basligi, aciklamasi ve etiketleri.
   --------------------------------------------------------------------------
   Tek sayfa uygulamasi oldugu icin <head> elle yonetiliyor: her rotada ayni
   etiketler guncelleniyor, yenisi eklenmiyor. Statik prerender bu etiketleri
   uretilen HTML'e de yaziyor, boylece JavaScript calistirmayan tarayicilar
   (arama motorlari, yapay zeka tarayicilari) dogru basligi goruyor.

   Iki dilin en onemli parcasi hreflang: ayni sayfanin Turkce ve Ingilizce
   adresleri birbirini gosteriyor. Bu olmadan arama motoru iki adresi ayni
   icerigin kopyasi sanip birini eliyor. `x-default` Turkce sayfaya
   isaret ediyor — sitenin ana dili o. */

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

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setAlternates(alternates) {
  document.head
    .querySelectorAll('link[rel="alternate"][data-seo-alt]')
    .forEach((node) => node.remove());

  alternates.forEach(({ hrefLang, href }) => {
    const el = document.createElement('link');
    el.setAttribute('rel', 'alternate');
    el.setAttribute('hreflang', hrefLang);
    el.setAttribute('href', href);
    el.setAttribute('data-seo-alt', 'true');
    document.head.appendChild(el);
  });
}

function setJsonLd(schemas) {
  document.head
    .querySelectorAll('script[data-seo-jsonld]')
    .forEach((node) => node.remove());

  schemas.filter(Boolean).forEach((schema) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-jsonld', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

export default function Seo({ title, description, image, type = 'website', jsonLd, noindex = false }) {
  const { pathname } = useLocation();
  const { lang } = useLang();

  /* Paylasim gorseli dile bagli: karttaki cumle sayfanin dilinde olmali,
     yoksa Ingilizce bir baglantinin altinda Turkce bir kart cikiyor. */
  const card = image ?? (lang === 'en' ? '/og-image-en.png' : '/og-image.png');

  const fullTitle = title?.toLowerCase().includes('suerta')
    ? title
    : `${title} — ${SITE_NAME}`;
  const canonical = `${SITE_URL}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;
  const imageAbs = card.startsWith('http') ? card : `${SITE_URL}${card}`;
  const jsonLdKey = JSON.stringify(jsonLd ?? null);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    document.title = fullTitle;

    upsertMeta('name', 'description', description);
    upsertCanonical(canonical);

    /* Olmayan bir adres icin sunucu 200 donuyor (tek sayfa uygulamasi:
       eslesmeyen her yol index.html'e dusuyor). O yuzden sayfanin kendisi
       "beni indeksleme" demek zorunda; aksi halde arama motoru her hatali
       baglantiyi anasayfanin kopyasi olarak kaydediyor. */
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');

    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:image', imageAbs);
    /* Paylasim karti her zaman 1200x630 PNG: olculer sabit oldugu icin
       dogru. Proje ekran goruntuleri (webp, 1520x688) paylasim gorseli
       olarak kullanilmiyordu — bazi platformlar webp'yi cizmiyor ve
       sablondaki olcu de onlara uymuyordu. */
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');
    upsertMeta('property', 'og:image:alt', lang === 'en' ? 'suerta.co — digital studio' : 'suerta.co — dijital stüdyo');
    upsertMeta('property', 'og:locale:alternate', lang === 'en' ? 'tr_TR' : 'en_GB');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:locale', lang === 'en' ? 'en_GB' : 'tr_TR');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageAbs);

    /* Kendisi dahil her dilin adresi: Google ayni sayfanin oteki dilini
       ancak bu ciftle eslestirebiliyor. */
    const other = LANGS.find((item) => item !== lang);
    const alternates = [
      { hrefLang: HTML_LANG[lang], href: canonical },
      { hrefLang: HTML_LANG[other], href: `${SITE_URL}${swapLangPath(pathname, lang, other)}` },
      {
        hrefLang: 'x-default',
        href: `${SITE_URL}${lang === 'tr' ? pathname : swapLangPath(pathname, lang, 'tr')}`,
      },
    ];
    setAlternates(alternates);

    setJsonLd([organizationSchema, ...(Array.isArray(jsonLd) ? jsonLd : [jsonLd])]);
    /* jsonLd her cagri yerinde yeni bir nesne; referansina baglanirsak
       efekt her cizimde script'leri silip yeniden yaratiyor. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullTitle, description, canonical, imageAbs, type, lang, pathname, jsonLdKey, noindex]);

  return null;
}

/* Kirinti (breadcrumb) semasi: sayfanin site icindeki yeri. */
export function breadcrumb(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/* Sik sorulanlar semasi: yapay zeka yanitlarinda ve arama sonuclarinda
   dogrudan alintilanabilen tek yapi. */
export function faqPage(faqs) {
  if (!faqs?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q ?? faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.a ?? faq.answer },
    })),
  };
}

/* Tek yazi icin Article semasi.
   Tarih ISO 8601: sayfada gorunen "13 Temmuz 2026" bicimi schema.org icin
   gecersiz ve Search Console butun yazilari hatali isaretliyordu. Yazi
   verisinde iki alan var — `date` ekran icin, `iso` makine icin. */
export function articleSchema(post, url, lang) {
  const image = lang === 'en' ? '/og-image-en.png' : '/og-image.png';

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.desc,
    inLanguage: HTML_LANG[lang],
    datePublished: post.iso,
    /* Yazilar guncellendiginde bu alan da guncellenmeli; su an yayin
       tarihiyle ayni, cunku hicbiri revize edilmedi. */
    dateModified: post.iso,
    image: `${SITE_URL}${image}`,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}${url}`,
  };
}

/* Teslim edilmis is icin CreativeWork semasi. */
export function projectSchema(project, url, lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    description: project.metaDesc ?? project.desc,
    inLanguage: HTML_LANG[lang],
    creator: { '@id': `${SITE_URL}/#organization` },
    url: `${SITE_URL}${url}`,
  };
}
