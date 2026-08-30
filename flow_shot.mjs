import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:\\Users\\songu\\AppData\\Local\\Temp\\claude\\C--Users-songu--gemini-antigravity-ide-scratch\\7bdf4bb5-ef6c-45dd-b050-ae853d15bd2f\\scratchpad\\";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--autoplay-policy=no-user-gesture-required", "--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 860, deviceScaleFactor: 1 });
await page.goto("http://localhost:5190/", { waitUntil: "networkidle2", timeout: 60000 });
await page.evaluate(() => { try { window.lenis?.destroy(); } catch (e) {} document.documentElement.style.scrollBehavior = "auto"; document.querySelectorAll("img").forEach((i) => (i.loading = "eager")); });
await new Promise((r) => setTimeout(r, 1000));

async function at(y, name, wait = 900) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await new Promise((r) => setTimeout(r, wait));
  await page.screenshot({ path: OUT + name });
}
await at(300, "flow_clouds.png");
await at(900, "flow_slogan.png");
// rooms section
const roomsY = await page.evaluate(() => {
  const secs = [...document.querySelectorAll("section")];
  const s = secs.find((x) => /Suites & Rooms|Odalar/.test(x.textContent || ""));
  return s ? s.getBoundingClientRect().top + window.scrollY : 3000;
});
await at(roomsY + 40, "flow_rooms.png", 1100);
// open lightbox — click first room cover button (aria-label starts with View/Fotoğraf)
await page.evaluate(() => {
  const b = [...document.querySelectorAll("button")].find((x) => /View photos|Fotoğraflar/.test(x.getAttribute("aria-label") || ""));
  if (b) b.click();
});
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: OUT + "flow_lightbox.png" });
await browser.close();
console.log("done", roomsY);
