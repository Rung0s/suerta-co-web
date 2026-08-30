import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LangProvider } from './v2/i18n';
import { LANGS, PAGES } from './v2/i18n/paths';

/* Uygulamanin tamami.
   --------------------------------------------------------------------------
   Iki dil, tek rota tablosu: adresler src/v2/i18n/paths.js'te duruyor ve
   buradaki dongu her sayfayi her dil icin bir kez baglıyor. Adresi elle
   yazmak, iki dilden birinde eksik kalan bir sayfa demek olur.

   Sayfalar tembel yukleniyor. Onceki hali her sayfayi tek bir pakete
   koyuyordu: bir yaziyi okumaya gelen ziyaretci anasayfanin sahne
   kodunu da indiriyordu. Ayirinca her sayfa yalnizca kendi parcasini
   getiriyor.

   Onceki tasarim (Navbar, 3D sahne, preloader) artik rotalarda degil;
   dosyalari git gecmisinde duruyor. */

const HomeV2 = lazy(() => import('./v2/HomeV2'));
const ServicesV2 = lazy(() => import('./v2/ServicesV2'));
const WorkPage = lazy(() => import('./v2/pages/WorkPage'));
const WorkDetailPage = lazy(() => import('./v2/pages/WorkDetailPage'));
const BlogPage = lazy(() => import('./v2/pages/BlogPage'));
const BlogDetailPage = lazy(() => import('./v2/pages/BlogDetailPage'));
const AboutPage = lazy(() => import('./v2/pages/AboutPage'));
const ContactPage = lazy(() => import('./v2/pages/ContactPage'));
const NotFoundPage = lazy(() => import('./v2/pages/NotFoundPage'));

const PAGE_COMPONENTS = {
  home: HomeV2,
  services: ServicesV2,
  work: WorkPage,
  workItem: WorkDetailPage,
  blog: BlogPage,
  blogItem: BlogDetailPage,
  about: AboutPage,
  contact: ContactPage,
};

export default function App() {
  return (
    <Router>
      {/* Dil adresten okunuyor, bu yuzden saglayici router'in icinde. */}
      <LangProvider>
        {/* Yukleme sirasinda bos bir yuzey: donen bir carka bakmak, bir
            an bekleyip sayfayi gormekten kotudur. */}
        <Suspense fallback={<div className="v2-boot" aria-hidden="true" />}>
          <Routes>
            {Object.entries(PAGE_COMPONENTS).flatMap(([page, Component]) =>
              LANGS.map((lang) => (
                <Route
                  key={`${page}-${lang}`}
                  path={PAGES[page][lang]}
                  element={<Component />}
                />
              ))
            )}

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </LangProvider>
    </Router>
  );
}
