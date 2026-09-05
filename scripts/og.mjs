// Paylasim gorselini (Open Graph / Twitter kart) uretir.
// ---------------------------------------------------------------------------
// Elle cizilmis bir gorsel, site degistiginde sessizce yanlis oluyor: onceki
// kart hala "Otel · Gunluk Kiralik · Emlak" yaziyordu, oysa site alti alanda
// calisiyor ve zemini de artik acik kagit.
//
// Kart, sitenin kendi tokenlariyla bir tarayicida ciziliyor ve ekran
// goruntusu aliniyor: boylece paylasilan gorsel sayfanin kendisiyle ayni
// tipografiyi ve ayni rengi tasiyor.
import { writeFile, readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');

const CARDS = [
  {
    file: 'og-image.png',
    lang: 'tr',
    lead: 'Ziyaretçiyi müşteriye çeviren',
    tail: 'premium sistemler.',
    areas: 'İnternet siteleri · E-ticaret · Yapay zekâ otomasyonları · Rezervasyon · SEO',
  },
  {
    file: 'og-image-en.png',
    lang: 'en',
    lead: 'Premium systems that turn',
    tail: 'visitors into customers.',
    areas: 'Websites · E-commerce · AI automation · Booking systems · SEO',
  },
  {
    file: 'og-image-it.png',
    lang: 'it',
    lead: 'Sistemi premium che trasformano',
    tail: 'i visitatori in clienti.',
    areas: 'Siti web · E-commerce · Automazioni con IA · Prenotazioni · SEO',
  },
];

function markup({ lang, lead, tail, areas }, logo) {
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..700&display=swap" rel="stylesheet" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: 1200px;
        height: 630px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 72px;
        background-color: #f6f5f2;
        background-image:
          radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 60%),
          linear-gradient(rgb(250,250,248) 0%, rgb(244,243,239) 100%);
        font-family: Inter, -apple-system, 'Segoe UI', system-ui, sans-serif;
        color: #111110;
      }
      .brand { display: flex; align-items: center; gap: 14px; font-size: 28px; font-weight: 600; }
      .brand img { width: 44px; height: 44px; }
      .dot { color: #9a161f; }
      h1 { font-size: 74px; line-height: 1.06; letter-spacing: -0.03em; font-weight: 600; max-width: 20ch; }
      .lead { color: #6b6a66; }
      .areas { font-size: 24px; color: #6b6a66; letter-spacing: -0.01em; }
      .rule { height: 1px; background: rgba(17,17,16,0.12); margin-bottom: 26px; }
    </style>
  </head>
  <body>
    <div class="brand">
      <img src="${logo}" alt="" />
      <span>suerta<span class="dot">.co</span></span>
    </div>
    <h1><span class="lead">${lead}</span> ${tail}</h1>
    <div>
      <div class="rule"></div>
      <div class="areas">${areas}</div>
    </div>
  </body>
</html>`;
}

const puppeteer = (await import('puppeteer')).default;
const logoSvg = await readFile(join(PUBLIC, 'favicon-v2.svg'), 'utf8');
const logo = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString('base64')}`;

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
try {
  for (const card of CARDS) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
    await page.setContent(markup(card, logo), { waitUntil: 'networkidle0' });
    /* Yazi tipi inmeden cekilen kart sistem fontuyla cikiyor. */
    await page.evaluateHandle('document.fonts.ready');
    const shot = await page.screenshot({ type: 'png' });
    await writeFile(join(PUBLIC, card.file), shot);
    console.log(`${card.file} yazildi (${(shot.length / 1024).toFixed(0)} KB)`);
    await page.close();
  }
} finally {
  await browser.close();
}
