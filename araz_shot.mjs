import puppeteer from "puppeteer-core";
import { execFileSync } from "node:child_process";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = "http://localhost:5190/";
const OUT = "C:\\Users\\songu\\.gemini\\antigravity-ide\\scratch\\araz-site\\screenshots";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const shots = [
  { name: "desktop-1440", width: 1440, height: 900, mobile: false },
  { name: "mobile-390", width: 390, height: 844, mobile: true },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--hide-scrollbars", "--force-color-profile=srgb"],
});

for (const s of shots) {
  const page = await browser.newPage();
  await page.setViewport({
    width: s.width,
    height: s.height,
    deviceScaleFactor: 1,
    isMobile: s.mobile,
    hasTouch: s.mobile,
  });
  await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });

  // Neutralise the fixed header (would smear across tiles) and force-load images.
  await page.evaluate(async () => {
    const sl = (ms) => new Promise((r) => setTimeout(r, ms));
    document.documentElement.style.scrollBehavior = "auto"; // disable smooth scroll for capture
    if (window.lenis) window.lenis.destroy(); // stop smooth-scroll so tiles land exactly
    await document.fonts.ready;
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await sl(70);
    }
    window.scrollTo(0, 0);
    await sl(200);
    const imgs = [...document.querySelectorAll("img")];
    imgs.forEach((i) => {
      i.loading = "eager";
      if (!i.complete || i.naturalWidth === 0) {
        const src = i.currentSrc || i.src;
        if (src) { i.src = ""; i.src = src; }
      }
    });
    const t0 = Date.now();
    for (;;) {
      const pend = [...document.querySelectorAll("img")].filter((i) => !i.complete || i.naturalWidth === 0);
      if (!pend.length || Date.now() - t0 > 20000) break;
      await sl(250);
    }
    await Promise.allSettled([...document.querySelectorAll("img")].map((i) => i.decode().catch(() => {})));
  });

  // Pin the fixed header to page top so it doesn't smear across every tile.
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    const h = document.querySelector("header");
    if (h) { h.style.position = "absolute"; h.style.top = "0"; }
  });

  const total = await page.evaluate(() => document.body.scrollHeight);
  const step = s.height;
  const tiles = [];
  let idx = 0;
  for (let y = 0; y < total; y += step) {
    const got = await page.evaluate((yy) => {
      window.scrollTo(0, yy);
      return Math.round(window.scrollY);
    }, y);
    await sleep(220);
    const p = `${OUT}\\_tile_${s.name}_${String(idx).padStart(2, "0")}.png`;
    // plain viewport screenshot reflects the current scroll position
    await page.screenshot({ path: p });
    tiles.push(p);
    if (idx === 0) console.log("  scrollY check @0:", got);
    idx++;
  }
  await page.close();

  // stitch tiles vertically with a tiny python helper
  const py = `from PIL import Image\nimport sys\npaths=sys.argv[1:]\nims=[Image.open(p) for p in paths]\nW=max(i.width for i in ims); Ht=sum(i.height for i in ims)\nc=Image.new('RGB',(W,Ht),(244,239,230))\ny=0\nfor im in ims: c.paste(im,(0,y)); y+=im.height\nc.save(r'${OUT}\\\\home-${s.name}.png')\nprint('stitched ${s.name}', c.size)`;
  execFileSync("python", ["-c", py, ...tiles], { stdio: "inherit" });
  console.log("done", s.name, "tiles", tiles.length);
}

await browser.close();
console.log("all done");
