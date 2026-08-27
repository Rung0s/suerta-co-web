import { chromium } from 'playwright';

const out = process.argv[2] || 'v2-desktop.png';
const width = Number(process.argv[3] || 1440);
const height = Number(process.argv[4] || 900);
const selector = process.argv[5] || null;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height },
  deviceScaleFactor: selector ? 2 : 1,
  isMobile: width < 700,
  hasTouch: width < 700,
});
await page.goto('http://localhost:5173/v2', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1200);

// scroll tetikli reveal'lari acmak icin bastan sona gez
await page.evaluate(async () => {
  const step = window.innerHeight * 0.5;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 160));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(900);

if (selector) {
  await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'center' }), selector);
  await page.waitForTimeout(1200);
  await (await page.$(selector)).screenshot({ path: out });
} else {
  await page.screenshot({ path: out, fullPage: true });
}

console.log('ok', out);
await browser.close();
