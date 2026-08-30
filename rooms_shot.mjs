import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:\\Users\\songu\\AppData\\Local\\Temp\\claude\\C--Users-songu--gemini-antigravity-ide-scratch\\7bdf4bb5-ef6c-45dd-b050-ae853d15bd2f\\scratchpad\\";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--autoplay-policy=no-user-gesture-required", "--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto("http://localhost:5190/", { waitUntil: "networkidle2", timeout: 60000 });
await page.evaluate(() => { try { window.lenis?.destroy(); } catch (e) {} document.documentElement.style.scrollBehavior = "auto"; document.querySelectorAll("img").forEach((i)=>i.loading="eager"); });
const roomsY = await page.evaluate(() => { const s=[...document.querySelectorAll("section")].find((x)=>/Suites & Rooms|Odalar/.test(x.textContent||"")); return s?s.getBoundingClientRect().top+window.scrollY:3000; });
await page.evaluate((y)=>window.scrollTo(0,y-30), roomsY);
await new Promise(r=>setTimeout(r,1200));
// advance card 1 next twice, card 3 next once
await page.evaluate(() => {
  const nexts=[...document.querySelectorAll('button[aria-label="Next photo"]')];
  nexts[0]?.click(); nexts[0]?.click(); nexts[2]?.click();
});
await new Promise(r=>setTimeout(r,700));
// hover card 2
const cards = await page.$$('article');
if (cards[1]) await cards[1].hover();
await new Promise(r=>setTimeout(r,600));
await page.screenshot({ path: OUT+"rooms_gallery.png" });
await browser.close();
console.log("done", roomsY);
