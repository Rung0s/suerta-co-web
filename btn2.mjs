import puppeteer from "puppeteer-core";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "C:\\Users\\songu\\AppData\\Local\\Temp\\claude\\C--Users-songu--gemini-antigravity-ide-scratch\\7bdf4bb5-ef6c-45dd-b050-ae853d15bd2f\\scratchpad\\";
const b = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--autoplay-policy=no-user-gesture-required", "--no-sandbox"] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 860 });
await p.goto("http://localhost:5190/", { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 1000));
const btns = await p.$$('section button[aria-pressed]');
const box = await btns[2].boundingBox();
await p.mouse.click(box.x + box.width / 2, box.y + box.height / 2); // real mouse click on POOL
await new Promise((r) => setTimeout(r, 900));
const pressed = await p.evaluate(() => [...document.querySelectorAll('section button[aria-pressed]')].map((x) => x.getAttribute("aria-pressed")).join(","));
await p.screenshot({ path: OUT + "btn_test.png" });
console.log("pressed:", pressed);
await b.close();
