import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto('http://localhost:5173/v2', { waitUntil: 'networkidle', timeout: 60000 });
await p.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 140)); }
});
await p.waitForTimeout(900);
await p.evaluate(() => document.querySelector('#isler').scrollIntoView({ block: 'center' }));
await p.waitForTimeout(900);
await p.hover('.v2-tile');
await p.waitForTimeout(900);
await (await p.$('#isler')).screenshot({ path: 'v2-isler.png' });
await p.evaluate(() => document.querySelector('.v2-band').scrollIntoView({ block: 'center' }));
await p.waitForTimeout(1400);
await (await p.$('.v2-band')).screenshot({ path: 'v2-band.png' });
await p.evaluate(() => document.querySelector('.v2-close').scrollIntoView({ block: 'center' }));
await p.waitForTimeout(1200);
await (await p.$('.v2-close')).screenshot({ path: 'v2-close.png' });
console.log('ok');
await b.close();
