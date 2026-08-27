import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:5173/v2', { waitUntil: 'networkidle', timeout: 60000 });
await p.evaluate(() => document.querySelector('.v2-manifesto').scrollIntoView({ block: 'center' }));
await p.waitForTimeout(1000);

const before = await p.getAttribute('.v2-coin', 'style');
const noteBefore = await p.textContent('.v2-altar__result');
await p.click('.v2-coin');
await p.waitForTimeout(450);
await (await p.$('.v2-manifesto')).screenshot({ path: 'v2-coin-mid.png' });
await p.waitForTimeout(1200);
const after = await p.getAttribute('.v2-coin', 'style');
const noteAfter = await p.textContent('.v2-altar__result');
await (await p.$('.v2-manifesto')).screenshot({ path: 'v2-manifesto.png' });

console.log('before:', before, '|', noteBefore);
console.log('after :', after, '|', noteAfter);
await b.close();
