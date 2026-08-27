import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:5173/v2', { waitUntil: 'networkidle', timeout: 60000 });
await p.evaluate(() => document.querySelector('.v2-manifesto').scrollIntoView({ block: 'center' }));
await p.waitForTimeout(1000);

await (await p.$('.v2-altar')).screenshot({ path: 'coin-0.png' });
console.log('perde 0 not:', (await p.textContent('.v2-altar__note')).trim());

await p.click('.v2-coin');
await p.waitForTimeout(1600);
await (await p.$('.v2-altar')).screenshot({ path: 'coin-1.png' });
console.log('perde 1 sonuc:', (await p.textContent('.v2-altar__result')).trim(), '| not:', (await p.textContent('.v2-altar__note')).trim());

await p.click('.v2-coin');
await p.waitForTimeout(900);
await (await p.$('.v2-altar')).screenshot({ path: 'coin-2.png' });
console.log('perde 2 kart:', (await p.textContent('.v2-luckcard')).replace(/\s+/g, ' ').trim());
await b.close();
