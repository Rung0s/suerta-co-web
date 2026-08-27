import { chromium } from 'playwright';
import fs from 'node:fs';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('https://www.thelaunchcompany.cc/', { waitUntil: 'networkidle', timeout: 90000 });
const out = await p.evaluate(() => {
  const el = document.querySelector('[class*="gridHalo"]');
  const cs = getComputedStyle(el);
  return {
    backgroundImage: cs.backgroundImage,
    backgroundSize: cs.backgroundSize,
    backgroundPosition: cs.backgroundPosition,
    maskImage: cs.maskImage || cs.webkitMaskImage,
    maskSize: cs.maskSize || cs.webkitMaskSize,
    maskComposite: cs.maskComposite || cs.webkitMaskComposite,
    opacity: cs.opacity,
    inset: [cs.top, cs.right, cs.bottom, cs.left].join(' '),
  };
});
fs.writeFileSync('.ref/grid-halo.json', JSON.stringify(out, null, 2));
console.log('ok');
await b.close();
