import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:\\Users\\songu\\AppData\\Local\\Temp\\claude\\C--Users-songu--gemini-antigravity-ide-scratch\\7bdf4bb5-ef6c-45dd-b050-ae853d15bd2f\\scratchpad\\";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--autoplay-policy=no-user-gesture-required", "--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 860, deviceScaleFactor: 1 });
await page.goto("http://localhost:5190/", { waitUntil: "networkidle2", timeout: 60000 });
await page.evaluate(() => { try { window.lenis?.destroy(); } catch (e) {} document.documentElement.style.scrollBehavior = "auto"; });
await new Promise((r) => setTimeout(r, 1200));
async function shot(idx, name) {
  await page.evaluate((i) => { const b=[...document.querySelectorAll('section button[aria-pressed]')]; b[i]?.click(); }, idx);
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: OUT + name });
}
await shot(1, "scene_wooden.png");
await shot(3, "scene_adrasan.png");
await browser.close();
console.log("done");
