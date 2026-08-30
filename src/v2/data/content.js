import { referencesData } from '../../data/references';
import { blogsData } from '../../data/blogs';
import { projectsEn } from './projects.en';
import { postsEn } from './posts.en';

/* Uzun icerik — proje anlatimlari ve blog yazilari — iki dilde ayri
   dosyalarda duruyor. Turkce dosyalar sitenin kaynagi; Ingilizce dosyalar
   ayni kimlikler uzerinden ceviriyi tasiyor.

   Ceviri eksikse Turkcesi gosteriliyor ve kayit `translated: false` ile
   isaretleniyor: yarim bir sayfa yayinlamak yerine, o sayfanin ustunde
   metnin henuz Turkce oldugunu soyleyen bir satir duruyor. Sessizce
   Turkce icerik gostermek okuyucuyu daha cok sasirtir. */

export function projectsFor(lang) {
  if (lang !== 'en') return referencesData.map((item) => ({ ...item, translated: true }));

  return referencesData.map((item) => {
    const override = projectsEn[item.id];
    return override
      ? { ...item, ...override, translated: true }
      : { ...item, translated: false };
  });
}

export function projectById(lang, id) {
  return projectsFor(lang).find((item) => String(item.id) === String(id));
}

export function postsFor(lang) {
  if (lang !== 'en') return blogsData.map((item) => ({ ...item, translated: true }));

  return blogsData.map((item) => {
    const override = postsEn[item.id];
    return override
      ? { ...item, ...override, translated: true }
      : { ...item, translated: false };
  });
}

export function postById(lang, id) {
  return postsFor(lang).find((item) => item.id === id);
}

/* Okuma suresi metinden turuyor. Elle yazilan bir sayi, yazi degistiginde
   yanlis kaliyor. Dakikada 200 kelime, yuvarlanmis. */
export function readingMinutes(post) {
  const words = String(post.content || '').trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
