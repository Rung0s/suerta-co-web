// Site haritasini uretir: dist/sitemap.xml
// ---------------------------------------------------------------------------
// Elle yazilan bir sitemap, ikinci yazidan sonra yalan soylemeye basliyor.
// Bu dosya adresleri rota tablosundan okuyor ve her adresin yanina oteki
// dildeki karsiligini (hreflang) yaziyor — iki dilli bir sitede arama
// motorunun iki adresi ayni icerigin kopyasi saymamasi icin gereken sey bu.
import { writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { allRoutes, alternatesOf, LANGS } from './routes.mjs';

const SITE = 'https://suerta.co';
const HTML_LANG = { tr: 'tr-TR', en: 'en' };
const __dirname = dirname(fileURLToPath(import.meta.url));

/* Sayfa turune gore tazelik ve onem. Blog listesi sik degisiyor, iletisim
   sayfasi neredeyse hic. */
const WEIGHT = {
  home: { changefreq: 'weekly', priority: '1.0' },
  services: { changefreq: 'monthly', priority: '0.9' },
  work: { changefreq: 'monthly', priority: '0.9' },
  workItem: { changefreq: 'monthly', priority: '0.7' },
  blog: { changefreq: 'weekly', priority: '0.8' },
  blogItem: { changefreq: 'monthly', priority: '0.6' },
  about: { changefreq: 'monthly', priority: '0.7' },
  contact: { changefreq: 'yearly', priority: '0.7' },
};

export function buildSitemap(today) {
  const entries = allRoutes().map((route) => {
    const alternates = alternatesOf(route);
    const weight = WEIGHT[route.page];

    const links = LANGS.map(
      (lang) =>
        `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[lang]}" href="${SITE}${alternates[lang]}" />`
    ).join('\n');

    return [
      '  <url>',
      `    <loc>${SITE}${route.path}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>${weight.changefreq}</changefreq>`,
      `    <priority>${weight.priority}</priority>`,
      links,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${alternates.tr}" />`,
      '  </url>',
    ].join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');
}

const today = new Date().toISOString().slice(0, 10);
const xml = buildSitemap(today);
const out = join(__dirname, '..', 'dist', 'sitemap.xml');
await writeFile(out, xml, 'utf8');
console.log(`Site haritasi yazildi: ${out} (${xml.split('<url>').length - 1} adres)`);
