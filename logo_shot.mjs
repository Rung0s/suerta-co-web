import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:\\Users\\songu\\AppData\\Local\\Temp\\claude\\C--Users-songu--gemini-antigravity-ide-scratch\\7bdf4bb5-ef6c-45dd-b050-ae853d15bd2f\\scratchpad\\";
const b = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--autoplay-policy=no-user-gesture-required", "--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 860 });
await p.goto("http://localhost:5190/", { waitUntil: "networkidle2", timeout: 60000 });
await p.evaluate(() => { try { window.lenis?.destroy(); } catch (e) {} document.documentElement.style.scrollBehavior = "auto"; document.querySelectorAll("img").forEach((i)=>i.loading="eager"); });
await new Promise((r) => setTimeout(r, 900));
await p.screenshot({ path: OUT + "logo_hero.png", clip: { x: 0, y: 0, width: 1440, height: 130 } });
// solid header
await p.evaluate(() => window.scrollTo(0, 1600));
await new Promise((r) => setTimeout(r, 800));
await p.screenshot({ path: OUT + "logo_solid.png", clip: { x: 0, y: 0, width: 1440, height: 130 } });
// footer
const h = await p.evaluate(() => document.body.scrollHeight);
await p.evaluate((hh) => window.scrollTo(0, hh), h);
await new Promise((r) => setTimeout(r, 900));
await p.screenshot({ path: OUT + "logo_footer.png" });
await b.close();
console.log("done");
