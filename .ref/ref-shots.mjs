import { chromium } from 'playwright';

/* Referans siteden belirli bolgelerin goruntusu. Tam sayfa PNG zaten
   .ref/ref-full.png'de; buradaki amac tek tek bolumleri buyuk almak. */

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('https://www.thelaunchcompany.cc/', { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(2500);

await page.screenshot({ path: 'ref-hero.png' });

const height = await page.evaluate(() => document.body.scrollHeight);
const step = 900;
let i = 1;
for (let y = 700; y < height; y += step) {
  await page.evaluate((top) => window.scrollTo(0, top), y);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `ref-scroll-${i}.png` });
  i += 1;
  if (i > 8) break;
}

await browser.close();
console.log('done', height);
