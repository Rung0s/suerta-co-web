/* Olcum.
   --------------------------------------------------------------------------
   Umami: cerezsiz, kisiyi tanimlamiyor, parmak izi cikarmiyor. Bu yuzden
   KVKK/GDPR icin onay bandi gerekmiyor ve site onay penceresi olmadan
   olculebiliyor. Script ~2KB.

   Anahtar ortam degiskeninden geliyor (VITE_UMAMI_ID). Yoksa dosya sessizce
   hicbir sey yapmiyor: kimsenin makinesinde "analytics yuklenemedi" hatasi
   cikmasin, anahtari olmayan bir fork da calissin diye.

   Uc yerde bilerek kapali:
   - localhost / 127.0.0.1: gelistirirken kendi ziyaretlerimiz sayilmasin.
   - navigator.webdriver: prerender ve ekran goruntusu scriptleri Puppeteer
     ile sayfayi geziyor; onlarin her build'de sahte trafik yaratmasi olcumu
     bozar.
   - Do Not Track acikken.

   Sayfa gecislerini Umami kendi izliyor (history.pushState'i dinliyor), bu
   yuzden rota degisiminde ayrica bir sey cagirmak gerekmiyor. Elle
   gonderdigimiz sey yalnizca olaylar: iletisim formu, WhatsApp, dil. */

const WEBSITE_ID = import.meta.env.VITE_UMAMI_ID;
const SRC = import.meta.env.VITE_UMAMI_SRC || 'https://cloud.umami.is/script.js';

function izinVar() {
  if (typeof window === 'undefined') return false;
  if (!WEBSITE_ID) return false;
  if (navigator.webdriver) return false;
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return false;

  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local')) return false;

  return true;
}

export function initAnalytics() {
  if (!izinVar()) return;
  if (document.querySelector('script[data-website-id]')) return;

  const script = document.createElement('script');
  script.src = SRC;
  script.defer = true;
  script.setAttribute('data-website-id', WEBSITE_ID);
  document.head.appendChild(script);
}

/* Olay gonderimi.
   Script henuz inmemis olabilir ya da hic yuklenmemis olabilir; her iki
   durumda da cagiran tarafin bunu bilmesi gerekmiyor, burada sessizce
   dusuyor. Olay adlari kisa ve sabit: panelde kendi aralarinda
   karsilastirilabilsinler diye serbest metin uretmiyoruz. */
export function track(event, data) {
  if (typeof window === 'undefined') return;
  const umami = window.umami;
  if (!umami || typeof umami.track !== 'function') return;

  try {
    if (data) umami.track(event, data);
    else umami.track(event);
  } catch {
    /* Olcum hicbir zaman sayfayi bozmamali. */
  }
}
