// Statik prerender: dist/ içindeki SPA'yı gerçek tarayıcıda (puppeteer) render edip
// her route için tam HTML (Seo head etiketleri + içerik) üretir.
// JS çalıştırmayan arama/AI tarayıcıları (GPTBot, PerplexityBot vb.) içeriği
// doğrudan HTML'de görür. Kullanıcılar yine SPA'yı alır (React devralır).
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Ortama göre tarayıcı: Vercel/serverless'te @sparticuz/chromium (sistem
// kütüphanesi gerektirmeyen Chromium), yerelde puppeteer'ın kendi Chromium'u.
const IS_SERVERLESS = !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY);

async function launchBrowser() {
  if (IS_SERVERLESS) {
    const chromium = (await import('@sparticuz/chromium')).default;
    const puppeteer = (await import('puppeteer-core')).default;
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  }
  const puppeteer = (await import('puppeteer')).default;
  return puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const PORT = 4599;

const ROUTES = [
  '/', '/hakkimizda', '/ekibimiz', '/hizmetlerimiz', '/referanslar', '/blog', '/iletisim',
  '/referanslar/1', '/referanslar/2', '/referanslar/3', '/referanslar/4',
  '/blog/web-sitesi-maliyeti-2026', '/blog/shopify-mi-woocommerce-mi', '/blog/yeni-site-seo-checklist',
  '/blog/otel-rezervasyon-hizi', '/blog/karanlik-mod-premium', '/blog/ozel-yazilim-vs-hazir-paketler',
  '/blog/fotograf-cekimi', '/blog/mobil-optimizasyon', '/blog/google-ads-donusum',
  '/blog/google-isletme-profili', '/blog/whatsapp-chatbot', '/blog/telegram-sinav-botu',
  '/blog/geo-yapay-zeka-gorunurluk',
];

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.mjs': 'application/javascript',
  '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2',
};

// dist/ klasörünü SPA fallback ile sunan minimal statik sunucu
function startServer() {
  return new Promise((resolve) => {
    const server = createServer(async (req, res) => {
      try {
        let urlPath = decodeURIComponent(req.url.split('?')[0]);
        let filePath = join(DIST, urlPath);
        if (!extname(urlPath) || !existsSync(filePath)) {
          // uzantısız yollar → SPA index.html
          if (!extname(urlPath)) filePath = join(DIST, 'index.html');
        }
        if (!existsSync(filePath)) filePath = join(DIST, 'index.html');
        const data = await readFile(filePath);
        res.setHeader('Content-Type', MIME[extname(filePath)] || 'application/octet-stream');
        res.end(data);
      } catch (e) {
        res.statusCode = 500;
        res.end('err: ' + e.message);
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function run() {
  const server = await startServer();
  const browser = await launchBrowser();
  let ok = 0;
  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 900 });
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 45000 });
      // Preloader bitip içerik (main) gelene ve metin dolana kadar bekle
      await page.waitForFunction(
        () => document.querySelector('main') && document.body.innerText.replace(/\s/g, '').length > 400,
        { timeout: 30000 }
      );
      // Seo useEffect'inin head etiketlerini yazması için kısa bekleme
      await new Promise((r) => setTimeout(r, 700));

      let html = await page.content();
      // React'in yeniden render sırasında flash'ı azaltmak için body'yi tekrar temizlemesi normaldir.
      html = '<!doctype html>\n' + html.replace(/^<!doctype html>/i, '').trim();

      const outDir = route === '/' ? DIST : join(DIST, route);
      if (route !== '/') await mkdir(outDir, { recursive: true });
      await writeFile(join(outDir, 'index.html'), html, 'utf-8');
      await page.close();
      ok += 1;
      console.log(`  ✓ prerendered ${route}`);
    }
  } finally {
    await browser.close();
    server.close();
  }
  console.log(`\nPrerender tamamlandı: ${ok}/${ROUTES.length} route.`);
}

// Prerender başarısız olsa bile deploy'u düşürme: SPA yine yayınlanır.
// (Tarayıcı başlatılamazsa statik HTML üretilmez ama site çalışır.)
run().catch((e) => {
  console.warn('\n⚠ Prerender atlandı (build devam ediyor):', e.message);
  process.exit(0);
});
