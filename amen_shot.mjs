import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:\\Users\\songu\\AppData\\Local\\Temp\\claude\\C--Users-songu--gemini-antigravity-ide-scratch\\7bdf4bb5-ef6c-45dd-b050-ae853d15bd2f\\scratchpad\\";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--autoplay-policy=no-user-gesture-required", "--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto("http://localhost:5190/", { waitUntil: "networkidle2", timeout: 60000 });
await page.evaluate(() => { try { window.lenis?.destroy(); } catch (e) {} document.documentElement.style.scrollBehavior = "auto"; document.querySelectorAll("img").forEach((i)=>i.loading="eager"); });
await new Promise(r=>setTimeout(r,1000));
async function at(y,name,w=900){ await page.evaluate(yy=>window.scrollTo(0,yy),y); await new Promise(r=>setTimeout(r,w)); await page.screenshot({path:OUT+name}); }
// cloud-up check: near hero bottom, should be clean (no pale blob)
await at(120,"chk_top.png");
// amenities section + sticky bar
const amenY = await page.evaluate(()=>{ const s=[...document.querySelectorAll("section")].find(x=>/small world|küçük bir dünya/.test(x.textContent||"")); return s?s.getBoundingClientRect().top+window.scrollY:4000; });
await at(amenY-90,"amenities.png",1200);
await browser.close();
console.log("done", amenY);
