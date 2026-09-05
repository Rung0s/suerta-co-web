import { referencesData } from '../../data/references';
import { blogsData } from '../../data/blogs';
import { projectsEn } from './projects.en';
import { postsEn } from './posts.en';
import { projectsIt } from './projects.it';
import { postsIt } from './posts.it';

/* Uzun icerik — proje anlatimlari ve blog yazilari — her dilde ayri
   dosyada duruyor. Turkce dosyalar sitenin kaynagi; diger diller ayni
   kimlikler uzerinden ceviriyi tasiyor.

   Ceviri eksikse en yakin dil gosteriliyor ve kayit `translated: false`
   ile isaretleniyor: yarim bir sayfa yayinlamak yerine, o sayfanin ustunde
   metnin baska dilde oldugunu soyleyen bir satir duruyor. Italyanca icin
   en yakin dil Ingilizce: Italyan okuyucu icin Ingilizce metin Turkceden
   cok daha okunur. */

const PROJECTS = { en: projectsEn, it: projectsIt };
const POSTS = { en: postsEn, it: postsIt };

/* Dilin kendi cevirisi, yoksa Ingilizce; ikisi de yoksa Turkce. */
function pick(tables, lang, key) {
  const own = tables[lang]?.[key];
  if (own) return { override: own, translated: true };
  const fallback = lang !== 'en' ? tables.en?.[key] : null;
  return { override: fallback, translated: false };
}

export function projectsFor(lang) {
  if (lang === 'tr') return referencesData.map((item) => ({ ...item, translated: true }));

  return referencesData.map((item) => {
    const { override, translated } = pick(PROJECTS, lang, item.id);
    return override ? { ...item, ...override, translated } : { ...item, translated: false };
  });
}

export function projectById(lang, id) {
  return projectsFor(lang).find((item) => String(item.id) === String(id));
}

export function postsFor(lang) {
  if (lang === 'tr') return blogsData.map((item) => ({ ...item, translated: true }));

  return blogsData.map((item) => {
    const { override, translated } = pick(POSTS, lang, item.id);
    return override ? { ...item, ...override, translated } : { ...item, translated: false };
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
