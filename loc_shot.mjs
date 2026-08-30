import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:\\Users\\songu\\AppData\\Local\\Temp\\claude\\C--Users-songu--gemini-antigravity-ide-scratch\\7bdf4bb5-ef6c-45dd-b050-ae853d15bd2f\\scratchpad\\";
const b = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--autoplay-policy=no-user-gesture-required", "--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto("http://localhost:5190/", { waitUntil: "networkidle2", timeout: 60000 });
await p.evaluate(() => { try { window.lenis?.destroy(); } catch (e) {} document.documentElement.style.scrollBehavior = "auto"; document.querySelectorAll("img").forEach((i)=>i.loading="eager"); });
await new Promise((r) => setTimeout(r, 900));
const y = await p.evaluate(() => { const s=[...document.querySelectorAll("section")].find(x=>/Location|Konum|on one side|bir yanda/.test(x.textContent||"")); return s?s.getBoundingClientRect().top+window.scrollY:0; });
await p.evaluate((yy)=>window.scrollTo(0,yy-70), y);
await new Promise((r)=>setTimeout(r,2600));
await p.screenshot({ path: OUT + "location.png" });
// click beach point
await p.evaluate(() => { const btns=[...document.querySelectorAll('section button[aria-pressed]')].filter(b=>/Deniz|sea|Plaj|Beach/.test(b.textContent||"")); if(btns[0]) btns[0].click(); });
await new Promise((r)=>setTimeout(r,3000));
await p.screenshot({ path: OUT + "location_route.png" });
await b.close();
console.log("done", y);
