import { chromium } from 'playwright';
import fs from 'node:fs';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('https://www.thelaunchcompany.cc/', { waitUntil: 'networkidle', timeout: 90000 });
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 150));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1200);

const geo = await page.evaluate(() => {
  const pick = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      sel, w: Math.round(r.width), h: Math.round(r.height),
      display: cs.display,
      gridTemplateColumns: cs.gridTemplateColumns,
      gridTemplateRows: cs.gridTemplateRows,
      gridAutoRows: cs.gridAutoRows,
      gap: cs.gap, padding: cs.padding, maxWidth: cs.maxWidth,
      bg: cs.backgroundColor, radius: cs.borderRadius, overflow: cs.overflow,
    };
  };

  const grids = [...document.querySelectorAll('*')]
    .filter((el) => getComputedStyle(el).display.includes('grid'))
    .map((el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        cls: (el.className || '').toString().slice(0, 90),
        cols: cs.gridTemplateColumns, rows: cs.gridTemplateRows,
        gap: cs.gap, w: Math.round(r.width), children: el.children.length,
      };
    });

  // work slotlarinin tek tek yerlesimi
  const slots = [...document.querySelectorAll('[class*="slot"]')].map((el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      cls: (el.className || '').toString().slice(0, 110),
      w: Math.round(r.width), h: Math.round(r.height),
      col: cs.gridColumn, row: cs.gridRow,
      radius: cs.borderRadius, bg: cs.backgroundColor,
      text: (el.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 60),
    };
  });

  const heroImg = document.querySelector('[class*="imageLayer"] img, [class*="Hero"] img');
  const heroLayer = document.querySelector('[class*="imageLayer"]');

  // gizli arka plan katmanlari (izgara halesi, ditherli kalabalik vb.)
  const layers = [...document.querySelectorAll('div,span,section')]
    .map((el) => {
      const cs = getComputedStyle(el);
      const bg = cs.backgroundImage;
      if (!bg || bg === 'none') return null;
      const r = el.getBoundingClientRect();
      if (r.height < 40) return null;
      return {
        cls: (el.className || '').toString().slice(0, 80),
        bg: bg.slice(0, 200), size: cs.backgroundSize,
        mask: (cs.maskImage || cs.webkitMaskImage || 'none').slice(0, 160),
        w: Math.round(r.width), h: Math.round(r.height),
      };
    })
    .filter(Boolean);

  return {
    heroSection: pick('[class*="Hero"]') || pick('section'),
    heroLayer: heroLayer ? {
      h: Math.round(heroLayer.getBoundingClientRect().height),
      style: getComputedStyle(heroLayer).cssText.slice(0, 0),
      maskImage: getComputedStyle(heroLayer).maskImage,
      position: getComputedStyle(heroLayer).position,
    } : null,
    heroImg: heroImg ? {
      src: heroImg.currentSrc, fit: getComputedStyle(heroImg).objectFit,
      w: Math.round(heroImg.getBoundingClientRect().width),
      h: Math.round(heroImg.getBoundingClientRect().height),
    } : null,
    grids, slots, layers: layers.slice(0, 25),
  };
});

fs.writeFileSync('ref-geo.json', JSON.stringify(geo, null, 2));
console.log('grids', geo.grids.length, 'slots', geo.slots.length, 'layers', geo.layers.length);
await browser.close();
