/* /v2 kabugunun tek link kaynagi. Menu ve alt bilgi ayni diziden okuyor;
   ikisi ayri yazildiginda biri guncellenip digeri unutuluyordu.

   `hash` tek sayfa anasayfadaki bolume, `path` o bolumun kendi sayfasina
   isaret ediyor. Bir bolumun sayfasi henuz yoksa `path` bos kalir ve link
   anasayfadaki bolume duser. */
export const V2_HOME = '/v2';

export const V2_NAV_LINKS = [
  { label: 'İşler', hash: '#isler', path: null },
  { label: 'Hizmetler', hash: '#hizmetler', path: '/v2/hizmetlerimiz' },
  { label: 'Süreç', hash: '#surec', path: null },
  { label: 'SSS', hash: '#sss', path: null },
];

export const V2_SOCIAL = [
  { label: 'Instagram ↗', href: 'https://instagram.com/suerta.co' },
  { label: 'WhatsApp ↗', href: 'https://wa.me/905060693525' },
];

/* Anasayfadayken menu ici çapa, baska sayfadayken tam yol uretiyor.
   Bolumun kendi sayfasi varsa oraya, yoksa anasayfanin ilgili bolumune. */
export function resolveLink(link, onHome) {
  /* Anasayfada menu hep ayni sayfadaki bolume gidiyor: tek sayfa akisi
     bolunmesin. Bolumun kendi sayfasina gecis, o bolumun kendi icindeki
     baglantidan yapiliyor. */
  if (onHome) return link.hash;
  if (link.path) return link.path;
  return `${V2_HOME}${link.hash}`;
}
