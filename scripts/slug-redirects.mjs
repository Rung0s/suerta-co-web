// Eski yazi adreslerini yenisine baglayan yonlendirmeler.
// ---------------------------------------------------------------------------
// Ingilizce ve Italyanca yazilar Turkce adreslerde yayindaydi. Adres degisince
// eski adres olmeye birakilmaz: paylasilmis baglantilar, arama sonuclarindaki
// kayitlar ve varsa disaridan gelen baglantilar oraya isaret ediyor. 301, hem
// ziyaretciyi hem de arama motorunun biriktirdigi degeri yeni adrese tasir.
//
// Liste elle yazilmiyor; ceviri tablosundan uretiliyor ki yeni bir yazi
// eklendiginde yonlendirmesi unutulmasin.
import { readFileSync, writeFileSync } from 'node:fs';
import { slugRedirects } from '../src/v2/i18n/slugs.js';

const FILE = new URL('../vercel.json', import.meta.url);
const config = JSON.parse(readFileSync(FILE, 'utf8'));

/* Uretilen kurallar adresinden taniniyor: /en/blog/... ve /it/blog/...
   Kurala fazladan bir isaret alani konamaz — Vercel yapilandirmayi
   sematik dogruluyor ve tanimadigi alan dagitimi durdurur. */
const GENERATED = /^\/(en|it)\/blog\//;

const generated = slugRedirects().map(({ lang, from, to }) => ({
  source: `/${lang}/blog/${from}`,
  destination: `/${lang}/blog/${to}`,
  permanent: true,
}));

const manual = (config.redirects ?? []).filter((rule) => !GENERATED.test(rule.source));
config.redirects = [...manual, ...generated];

writeFileSync(FILE, `${JSON.stringify(config, null, 2)}\n`);
console.log(`${generated.length} yonlendirme yazildi, ${manual.length} elle yazilmis kural korundu.`);
