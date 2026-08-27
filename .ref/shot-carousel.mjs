import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto('http://localhost:5173/v2', { waitUntil: 'networkidle', timeout: 60000 });
await p.evaluate(() => document.querySelector('.v2-partners').scrollIntoView({ block: 'center' }));
await p.waitForTimeout(1400);
// ucuncu karti gostermek icin karuseli sona kaydir
await p.evaluate(() => { const c = document.querySelector('.v2-carousel'); c.scrollLeft = c.scrollWidth; });
await p.waitForTimeout(1200);
await (await p.$('.v2-partners')).screenshot({ path: 'v2-partners-end.png' });
console.log('ok');
await b.close();
