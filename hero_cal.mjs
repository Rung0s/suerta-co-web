import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:\\Users\\songu\\AppData\\Local\\Temp\\claude\\C--Users-songu--gemini-antigravity-ide-scratch\\7bdf4bb5-ef6c-45dd-b050-ae853d15bd2f\\scratchpad\\";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--autoplay-policy=no-user-gesture-required", "--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 860, deviceScaleFactor: 1 });
await page.goto("http://localhost:5190/", { waitUntil: "networkidle2", timeout: 60000 });
await page.evaluate(() => { try { window.lenis?.destroy(); } catch (e) {} document.documentElement.style.scrollBehavior = "auto"; });
await new Promise((r) => setTimeout(r, 1200));
// click the date range trigger
await page.evaluate(() => {
  const btns = [...document.querySelectorAll("button")];
  const t = btns.find((b) => /Check in|Giriş/.test(b.textContent || ""));
  if (t) t.click();
});
await new Promise((r) => setTimeout(r, 700));
await page.screenshot({ path: OUT + "hero_cal.png" });
// pick a range: click day 22 then 26 in current month grid
await page.evaluate(() => {
  const days = [...document.querySelectorAll("button")].filter((b) => /^\d{1,2}$/.test((b.textContent || "").trim()) && !b.disabled);
  const d22 = days.find((b) => b.textContent.trim() === "22");
  if (d22) d22.click();
});
await new Promise((r) => setTimeout(r, 300));
await page.evaluate(() => {
  const days = [...document.querySelectorAll("button")].filter((b) => /^\d{1,2}$/.test((b.textContent || "").trim()) && !b.disabled);
  const d26 = days.find((b) => b.textContent.trim() === "26");
  if (d26) d26.click();
});
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: OUT + "hero_cal_range.png" });
await browser.close();
console.log("done");
