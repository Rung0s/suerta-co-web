// Sitenin butun adresleri, tek yerden.
// ---------------------------------------------------------------------------
// Prerender ve site haritasi ayni listeyi okuyor. Iki ayri elle yazilmis liste,
// yeni bir yazi eklendiginde birinde unutulur ve o sayfa ya statik uretilmez ya
// da haritada gorunmez.
//
// Liste, uygulamanin kendi rota tablosundan (src/v2/i18n/paths.js) ve icerik
// dosyalarindan turuyor; burada elle yazilan tek sey yok.
import { PAGES, LANGS } from '../src/v2/i18n/paths.js';
import { referencesData } from '../src/data/references.js';
import { blogsData } from '../src/data/blogs.js';

/* Detay sayfalarinin kimlikleri. Dilden bagimsiz: bir proje ya da yazi iki
   dilde de ayni kimlikle duruyor. */
const IDS = {
  workItem: referencesData.map((project) => String(project.id)),
  blogItem: blogsData.map((post) => post.id),
};

/* Her adres, hangi sayfanin hangi dildeki hali oldugu bilgisiyle birlikte.
   Site haritasi hreflang ciftlerini bu bilgiden kuruyor. */
export function allRoutes() {
  const routes = [];

  for (const [page, byLang] of Object.entries(PAGES)) {
    for (const lang of LANGS) {
      const template = byLang[lang];
      if (!template) continue;

      if (template.includes(':id')) {
        for (const id of IDS[page] ?? []) {
          routes.push({ page, lang, id, path: template.replace(':id', id) });
        }
      } else {
        routes.push({ page, lang, id: null, path: template });
      }
    }
  }

  return routes;
}

/* Ayni sayfanin butun dillerdeki adresleri — hreflang icin. */
export function alternatesOf(route) {
  return LANGS.reduce((acc, lang) => {
    const template = PAGES[route.page][lang];
    acc[lang] = route.id ? template.replace(':id', route.id) : template;
    return acc;
  }, {});
}

export { LANGS };
