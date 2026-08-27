import { chromium } from 'playwright';
import fs from 'node:fs';

const URL = 'https://www.thelaunchcompany.cc/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const requests = [];
page.on('response', (r) => {
  const t = r.request().resourceType();
  if (['image', 'font', 'media', 'script', 'stylesheet'].includes(t)) {
    requests.push({ type: t, url: r.url(), status: r.status() });
  }
});

await page.goto(URL, { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(2500);

// tum lazy/scroll tetikli icerigi ac
await page.evaluate(async () => {
  const step = window.innerHeight * 0.5;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 220));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1500);

const report = await page.evaluate(() => {
  const px = (v) => Math.round(parseFloat(v) * 100) / 100;

  // --- Bolum haritasi ---------------------------------------------------
  const sections = [...document.querySelectorAll('body > *, main > *, main section, body section')]
    .filter((el) => el.offsetHeight > 120)
    .map((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(),
        cls: (el.className || '').toString().slice(0, 120),
        id: el.id || null,
        top: Math.round(r.top + window.scrollY),
        height: Math.round(r.height),
        bg: cs.backgroundColor,
        padTop: px(cs.paddingTop),
        padBottom: px(cs.paddingBottom),
        text: (el.innerText || '').trim().slice(0, 260).replace(/\s+/g, ' '),
      };
    });

  // --- Tipografi envanteri ---------------------------------------------
  const typeMap = new Map();
  document.querySelectorAll('h1,h2,h3,h4,h5,p,a,span,li,button,blockquote,small,div').forEach((el) => {
    if (!el.innerText || !el.innerText.trim()) return;
    if (el.children.length > 0 && el.tagName === 'DIV') return;
    const cs = getComputedStyle(el);
    const key = [
      el.tagName.toLowerCase(),
      cs.fontFamily.split(',')[0].replace(/["']/g, ''),
      px(cs.fontSize),
      cs.fontWeight,
      px(cs.lineHeight),
      cs.letterSpacing,
      cs.color,
      cs.textTransform,
    ].join(' | ');
    if (!typeMap.has(key)) {
      typeMap.set(key, { spec: key, sample: el.innerText.trim().slice(0, 70), count: 1 });
    } else typeMap.get(key).count++;
  });

  // --- Renk envanteri ---------------------------------------------------
  const colors = new Map();
  document.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el);
    [cs.color, cs.backgroundColor, cs.borderTopColor].forEach((c) => {
      if (!c || c === 'rgba(0, 0, 0, 0)') return;
      colors.set(c, (colors.get(c) || 0) + 1);
    });
  });

  // --- Yaricap / golge / gecis ------------------------------------------
  const radii = new Map();
  const shadows = new Map();
  const transitions = new Map();
  document.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.borderRadius && cs.borderRadius !== '0px') radii.set(cs.borderRadius, (radii.get(cs.borderRadius) || 0) + 1);
    if (cs.boxShadow && cs.boxShadow !== 'none') shadows.set(cs.boxShadow, (shadows.get(cs.boxShadow) || 0) + 1);
    if (cs.transition && cs.transition !== 'all 0s ease 0s') transitions.set(cs.transition, (transitions.get(cs.transition) || 0) + 1);
  });

  // --- Gorseller ---------------------------------------------------------
  const images = [...document.querySelectorAll('img')].map((img) => ({
    src: img.currentSrc || img.src,
    alt: img.alt,
    w: img.naturalWidth,
    h: img.naturalHeight,
    dispW: Math.round(img.getBoundingClientRect().width),
    dispH: Math.round(img.getBoundingClientRect().height),
    fit: getComputedStyle(img).objectFit,
    radius: getComputedStyle(img).borderRadius,
  }));

  const videos = [...document.querySelectorAll('video')].map((v) => ({
    src: v.currentSrc || v.src || [...v.querySelectorAll('source')].map((s) => s.src).join(','),
    w: v.videoWidth, h: v.videoHeight,
    autoplay: v.autoplay, loop: v.loop, muted: v.muted,
    poster: v.poster,
  }));

  // --- Animasyon izleri --------------------------------------------------
  const animated = [];
  document.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.animationName !== 'none' || cs.transform !== 'none' || cs.willChange !== 'auto') {
      const r = el.getBoundingClientRect();
      if (r.height < 4) return;
      animated.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className || '').toString().slice(0, 80),
        anim: cs.animationName,
        dur: cs.animationDuration,
        timing: cs.animationTimingFunction,
        transform: cs.transform.slice(0, 60),
        willChange: cs.willChange,
      });
    }
  });

  // --- Baslik hiyerarsisi ------------------------------------------------
  const headings = [...document.querySelectorAll('h1,h2,h3,h4')].map((h) => ({
    level: h.tagName,
    text: h.innerText.trim().replace(/\s+/g, ' ').slice(0, 140),
    size: px(getComputedStyle(h).fontSize),
  }));

  const body = getComputedStyle(document.body);

  return {
    pageHeight: document.body.scrollHeight,
    bodyFont: body.fontFamily,
    bodyBg: body.backgroundColor,
    bodyColor: body.color,
    sections,
    headings,
    type: [...typeMap.values()].sort((a, b) => b.count - a.count).slice(0, 45),
    colors: [...colors.entries()].sort((a, b) => b[1] - a[1]).slice(0, 22),
    radii: [...radii.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12),
    shadows: [...shadows.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10),
    transitions: [...transitions.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12),
    images,
    videos,
    animated: animated.slice(0, 40),
    fullText: document.body.innerText.replace(/\n{3,}/g, '\n\n'),
  };
});

report.network = {
  fonts: [...new Set(requests.filter((r) => r.type === 'font').map((r) => r.url))],
  media: [...new Set(requests.filter((r) => r.type === 'media').map((r) => r.url))],
  scripts: [...new Set(requests.filter((r) => r.type === 'script').map((r) => r.url))].slice(0, 30),
  images: [...new Set(requests.filter((r) => r.type === 'image').map((r) => r.url))],
};

fs.writeFileSync('ref-report.json', JSON.stringify(report, null, 2));

// gorsel kayit
await page.screenshot({ path: 'ref-full.png', fullPage: true });
const mob = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await mob.goto(URL, { waitUntil: 'networkidle', timeout: 90000 });
await mob.waitForTimeout(2000);
await mob.screenshot({ path: 'ref-mobile.png', fullPage: true });

console.log('pageHeight', report.pageHeight);
console.log('sections', report.sections.length, 'images', report.images.length, 'videos', report.videos.length);
console.log('fonts', report.network.fonts.length, 'media', report.network.media.length);
await browser.close();
