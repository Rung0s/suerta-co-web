import puppeteer from "puppeteer-core";
const CHROME="C:\Program Files\Google\Chrome\Application\chrome.exe";
const b=await puppeteer.launch({executablePath:CHROME,headless:"new",args:["--autoplay-policy=no-user-gesture-required","--no-sandbox"]});
const p=await b.newPage(); await p.setViewport({width:1440,height:860});
await p.goto("http://localhost:5190/",{waitUntil:"networkidle2",timeout:60000});
await new Promise(r=>setTimeout(r,1000));
// try real click on POOL button via bounding box
const btns=await p.$$('section button[aria-pressed]');
const box=await btns[2].boundingBox();
await p.mouse.click(box.x+box.width/2, box.y+box.height/2);
await new Promise(r=>setTimeout(r,900));
const pressed=await p.evaluate(()=>[...document.querySelectorAll('section button[aria-pressed]')].map(x=>x.getAttribute('aria-pressed')));
console.log("pressed states:",pressed.join(","));
await b.close();
