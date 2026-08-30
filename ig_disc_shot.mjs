import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:\\Users\\songu\\AppData\\Local\\Temp\\claude\\C--Users-songu--gemini-antigravity-ide-scratch\\7bdf4bb5-ef6c-45dd-b050-ae853d15bd2f\\scratchpad\\";
const b = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--autoplay-policy=no-user-gesture-required", "--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto("http://localhost:5190/", { waitUntil: "networkidle2", timeout: 60000 });
await p.evaluate(() => { try { window.lenis?.destroy(); } catch (e) {} document.documentElement.style.scrollBehavior = "auto"; document.querySelectorAll("img").forEach((i)=>i.loading="eager"); });
await new Promise((r) => setTimeout(r, 900));
async function shotSection(re, name) {
  const y = await p.evaluate((rs) => { const R=new RegExp(rs); const s=[...document.querySelectorAll("section")].find(x=>R.test(x.textContent||"")); return s?s.getBoundingClientRect().top+window.scrollY:0; }, re);
  await p.evaluate((yy)=>window.scrollTo(0,yy-70), y);
  await new Promise((r)=>setTimeout(r,1200));
  await p.screenshot({ path: OUT + name });
  return y;
}
await shotSection("@arazwoodenconcept|Follow along", "ig_real.png");
await shotSection("Discover what|Yakınlarda", "discover.png");
await b.close();
console.log("done");
