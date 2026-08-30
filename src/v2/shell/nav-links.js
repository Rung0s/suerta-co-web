import { pathFor } from '../i18n/paths';

/* Menunun tek link kaynagi. Etiketler dil dosyalarindan (copy.tr / copy.en)
   geliyor; burada yalnizca o etiketin nereye gittigi hesaplaniyor.

   Bir baglanti iki yere birden isaret edebiliyor: anasayfadaki bolume
   (`hash`) ve o bolumun kendi sayfasina (`key` ile PAGES tablosuna). Ayni
   sayfadayken capa, baska sayfadayken tam adres kullaniliyor — boylece
   anasayfanin tek parca akisi bolunmuyor. */

export const V2_SOCIAL = [
  { label: 'Instagram ↗', href: 'https://instagram.com/suerta.co' },
  { label: 'WhatsApp ↗', href: 'https://wa.me/905060693525' },
];

export const CONTACT = {
  mail: 'suerta.info@gmail.com',
  whatsapp: '905060693525',
  instagram: 'https://instagram.com/suerta.co',
};

export function resolveLink(link, lang, onHome) {
  if (onHome && link.hash) return link.hash;
  const path = pathFor(link.key, lang);
  return link.hash && path === pathFor('home', lang) ? `${path}${link.hash}` : path;
}
