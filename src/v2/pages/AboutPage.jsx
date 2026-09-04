import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal, Item } from '../primitives';
import V2Layout from '../shell/V2Layout';
import PageHead from './PageHead';
import CrewTable from '../sections/CrewTable';
import { useCopy, useLang } from '../i18n';
import { pathFor } from '../i18n/paths';
import Seo, { breadcrumb } from '../seo/Seo';

/* Hakkimizda.
   Anasayfadaki manifesto tek cumle soyluyor; burada o cumlenin ardindaki
   calisma bicimi ve ekip duruyor. Ekip verisi tek kaynaktan (data/team.js)
   geliyor, rol aciklamalari dil dosyasindan. */
export default function AboutPage() {
  const c = useCopy();
  const { lang } = useLang();

  return (
    <V2Layout>
      <Seo
        title={c.meta.about.title}
        description={c.meta.about.description}
        jsonLd={breadcrumb([
          { name: c.nav.home, path: pathFor('home', lang) },
          { name: c.nav.links.find((link) => link.key === 'about').label, path: pathFor('about', lang) },
        ])}
      />

      <PageHead
        label={c.nav.links.find((link) => link.key === 'about').label}
        lead={c.pages.about.lead}
        tail={c.pages.about.tail}
        intro={c.pages.about.intro}
      >
        <Link className="v2-btn v2-btn--primary" to={pathFor('contact', lang)}>
          {c.hero.ctaPrimary}
        </Link>
        <Link className="v2-btn v2-btn--ghost" to={pathFor('work', lang)}>
          {c.work.all}
        </Link>
      </PageHead>

      <section className="v2-section" id="hakkimizda">
        <div className="v2-shell">
          <Reveal>
            <Item className="v2-section__head">
              <h2 className="v2-title">{c.pages.about.valuesTitle}</h2>
            </Item>
          </Reveal>

          <Reveal className="v2-values">
            {c.pages.about.values.map((value) => (
              <Item key={value.title} className="v2-value">
                <span className="v2-value__title">{value.title}</span>
                <span className="v2-value__desc">{value.desc}</span>
              </Item>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="v2-section v2-section--crew" id="ekip">
        <CrewTable />
      </section>
    </V2Layout>
  );
}
