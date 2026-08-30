import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal, Item, TwoTone } from '../primitives';
import V2Layout from '../shell/V2Layout';
import PageHead from './PageHead';
import { useCopy, useLang } from '../i18n';
import { pathFor } from '../i18n/paths';
import Seo, { breadcrumb } from '../seo/Seo';
import { projectsFor } from '../data/content';

/* Isler sayfasi.
   Anasayfadaki "secili isler" bandi dort tuglayi gosteriyor ama tugla
   disariya, musterinin kendi sitesine gidiyordu; yaptigimiz isin ne
   oldugunu okuyacak bir yer yoktu. Buradaki her kart kendi detay
   sayfasina aciliyor, disari cikan baglanti orada duruyor. */
export default function WorkPage() {
  const c = useCopy();
  const { lang } = useLang();
  const projects = projectsFor(lang);

  return (
    <V2Layout>
      <Seo
        title={c.meta.work.title}
        description={c.meta.work.description}
        jsonLd={breadcrumb([
          { name: c.nav.home, path: pathFor('home', lang) },
          { name: c.pages.work.lead, path: pathFor('work', lang) },
        ])}
      />

      <PageHead
        label={c.nav.links.find((link) => link.key === 'work').label}
        lead={c.pages.work.lead}
        tail={c.pages.work.tail}
        intro={c.pages.work.intro}
      />

      <section className="v2-section" id="isler">
        <div className="v2-shell">
          <Reveal className="v2-cards">
            {projects.map((project) => (
              <Item key={project.id}>
                <Link className="v2-card" to={pathFor('workItem', lang, { id: project.id })}>
                  <span className="v2-card__shot">
                    <img
                      src={project.image}
                      alt={c.work.shot(project.name)}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className="v2-card__body">
                    <span className="v2-card__label">{project.category}</span>
                    <span className="v2-card__title">{project.name}</span>
                    <span className="v2-card__desc">{project.desc}</span>
                    {c.work.results[project.id] && (
                      <span className="v2-card__result">{c.work.results[project.id]}</span>
                    )}
                  </span>
                </Link>
              </Item>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="v2-section v2-svc-cta">
        <div className="v2-shell">
          <Reveal className="v2-svc-cta__box">
            <Item as="h2" className="v2-title">
              <TwoTone lead={c.pages.services.ctaLead} tail={c.pages.services.ctaTail} />
            </Item>
            <Item>
              <Link className="v2-btn v2-btn--primary" to={pathFor('contact', lang)}>
                {c.hero.ctaPrimary}
              </Link>
            </Item>
          </Reveal>
        </div>
      </section>
    </V2Layout>
  );
}
