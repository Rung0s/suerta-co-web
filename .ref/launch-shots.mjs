import { chromium } from 'playwright';

/* Sabitlenen hero'yu birkac ilerleme noktasinda yakaliyor: tam sayfa
   goruntusu bu bolumde ise yaramiyor, cunku sahne kaydirmayla degisiyor. */

const width = Number(process.argv[2] || 1440);
const height = Number(process.argv[3] || 900);
const prefix = process.argv[4] || 'launch';
const stops = (process.argv[5] || '0,0.2,0.45,0.7,1').split(',').map(Number);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height },
  isMobile: width < 700,
  hasTouch: width < 700,
});

await page.goto('http://localhost:5173/v2', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1000);

for (const stop of stops) {
  await page.evaluate((p) => {
    const node = document.querySelector('.v2-launch');
    const travel = node.offsetHeight - window.innerHeight;
    window.scrollTo(0, node.offsetTop + travel * p);
  }, stop);
  await page.waitForTimeout(700);
  const name = `${prefix}-${String(stop).replace('.', '')}.png`;
  await page.screenshot({ path: name });
  console.log('ok', name);
}

await browser.close();
