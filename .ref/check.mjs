import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:5173/v2', { waitUntil: 'networkidle', timeout: 60000 });
await p.waitForTimeout(1200);
const info = await p.evaluate(() => {
  const el = document.querySelector('.v2-hero__brand');
  if (!el) return 'YOK';
  const r = el.getBoundingClientRect();
  const nav = document.querySelector('.v2-nav').getBoundingClientRect();
  return { text: el.innerText, top: Math.round(r.top), bottom: Math.round(r.bottom), navBottom: Math.round(nav.bottom), opacity: getComputedStyle(el).opacity };
});
console.log(JSON.stringify(info));
await b.close();
