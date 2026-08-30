import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal, Item } from '../primitives';
import V2Layout from '../shell/V2Layout';
import { useCopy, useLang } from '../i18n';
import { pathFor } from '../i18n/paths';
import Seo from '../seo/Seo';

/* Olmayan adres. Ziyaretciyi bos bir sayfada birakmak yerine ana sayfaya
   ve isler sayfasina yol veriyor. */
export default function NotFoundPage() {
  const c = useCopy();
  const { lang } = useLang();

  return (
    <V2Layout>
      {/* Tek sayfa uygulamasinda olmayan bir adres de 200 donuyor: eslesmeyen
          her yol index.html'e dusuyor. Sayfa bu yuzden kendisi "beni
          indeksleme" demek zorunda, yoksa arama motoru her hatali baglantiyi
          anasayfanin bir kopyasi olarak kaydediyor. */}
      <Seo
        title={c.pages.notFound.title}
        description={c.pages.notFound.intro}
        noindex
      />

      <header className="v2-section v2-pagehead" id="top">
        <div className="v2-halo" aria-hidden="true" />
        <div className="v2-shell">
          <Reveal className="v2-pagehead__inner">
            <Item>
              <span className="v2-label">404</span>
            </Item>
            <Item as="h1" className="v2-display">
              {c.pages.notFound.title}
            </Item>
            <Item as="p" className="v2-lead">
              {c.pages.notFound.intro}
            </Item>
            <Item className="v2-pagehead__actions">
              <Link className="v2-btn v2-btn--primary" to={pathFor('home', lang)}>
                {c.pages.notFound.cta}
              </Link>
              <Link className="v2-btn v2-btn--ghost" to={pathFor('work', lang)}>
                {c.work.all}
              </Link>
            </Item>
          </Reveal>
        </div>
      </header>
    </V2Layout>
  );
}
