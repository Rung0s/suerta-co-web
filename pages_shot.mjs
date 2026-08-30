import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:\\Users\\songu\\AppData\\Local\\Temp\\claude\\C--Users-songu--gemini-antigravity-ide-scratch\\7bdf4bb5-ef6c-45dd-b050-ae853d15bd2f\\scratchpad\\";
const b = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--autoplay-policy=no-user-gesture-required", "--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
async function shot(path, name, scrollY=0, wait=1400) {
  await p.goto("http://localhost:5190" + path, { waitUntil: "networkidle2", timeout: 60000 });
  await p.evaluate(() => { try { window.lenis?.destroy(); } catch (e) {} document.documentElement.style.scrollBehavior = "auto"; document.querySelectorAll("img").forEach(i=>i.loading="eager"); });
  await new Promise(r=>setTimeout(r, wait));
  if (scrollY) { await p.evaluate(y=>window.scrollTo(0,y), scrollY); await new Promise(r=>setTimeout(r,1200)); }
  await p.screenshot({ path: OUT + name });
}
await shot("/stay", "page_stay.png");
await shot("/experience", "page_experience.png");
await shot("/adrasan", "page_adrasan.png");
await shot("/contact", "page_contact_hero.png");
await shot("/contact", "page_contact_details.png", 700);
await b.close();
console.log("done");
