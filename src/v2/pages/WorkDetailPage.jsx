import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Reveal, Item } from '../primitives';
import V2Layout from '../shell/V2Layout';
import Prose from './Prose';
import NotFoundPage from './NotFoundPage';
import { useCopy, useLang } from '../i18n';
import { pathFor } from '../i18n/paths';
import Seo, { breadcrumb, faqPage, projectSchema } from '../seo/Seo';
import { projectById } from '../data/content';
import { shotSrcSet } from '../media/shot';

/* Tek bir isin sayfasi: ne yapildi, sonucu ne oldu, o projede sorulan
   sorular. Musterinin kendi sitesine giden baglanti burada duruyor —
   listede degil: listede her tugla disari cikinca sitede kalan bir yol
   kalmiyordu. */
export default function WorkDetailPage() {
  const c = useCopy();
  const { lang } = useLang();
  const { id } = useParams();
  const project = projectById(lang, id);

  if (!project) return <NotFoundPage />;

  const url = pathFor('workItem', lang, { id: project.id });

  return (
    <V2Layout>
      <Seo
        title={`${project.name} — ${project.desc}`}
        description={project.metaDesc ?? project.desc}
        jsonLd={[
          projectSchema(project, url, lang),
          faqPage(project.faqs),
          breadcrumb([
            { name: c.nav.home, path: pathFor('home', lang) },
            { name: c.nav.links.find((link) => link.key === 'work').label, path: pathFor('work', lang) },
            { name: project.name, path: url },
          ]),
        ]}
      />

      <header className="v2-section v2-pagehead" id="top">
        <div className="v2-halo" aria-hidden="true" />
        <div className="v2-shell">
          <Reveal className="v2-pagehead__inner">
            <Item>
              <Link className="v2-back" to={pathFor('work', lang)}>
                {c.pages.work.detailBack}
              </Link>
            </Item>
            <Item>
              <span className="v2-label">{project.category}</span>
            </Item>
            <Item as="h1" className="v2-display">
              {project.name}
            </Item>
            <Item as="p" className="v2-lead">
              {project.desc}
            </Item>
            {c.work.results[project.id] && (
              <Item>
                <span className="v2-tile__result">{c.work.results[project.id]}</span>
              </Item>
            )}
            {!project.translated && (
              <Item>
                <span className="v2-note">{c.pages.blog.untranslated}</span>
              </Item>
            )}
            {project.link && (
              <Item className="v2-pagehead__actions">
                <a
                  className="v2-btn v2-btn--primary"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {c.pages.work.detailVisit}
                </a>
              </Item>
            )}
          </Reveal>
        </div>
      </header>

      <section className="v2-section">
        <div className="v2-shell v2-shell--narrow">
          <Reveal>
            <Item>
              <img
                className="v2-detail__shot"
                src={project.image}
                srcSet={shotSrcSet(project.image)}
                sizes="(max-width: 900px) 92vw, 56rem"
                alt={c.work.shot(project.name)}
                loading="lazy"
                decoding="async"
              />
            </Item>
            <Item>
              <Prose text={project.details} />
            </Item>
          </Reveal>
        </div>
      </section>

      {project.faqs?.length > 0 && (
        <section className="v2-section" id="sss">
          <div className="v2-shell v2-shell--narrow">
            <Reveal>
              <Item className="v2-section__head">
                <h2 className="v2-title">{c.pages.work.detailFaq}</h2>
              </Item>
            </Reveal>

            <Reveal className="v2-faq">
              {project.faqs.map((faq) => (
                <Item key={faq.question} as="details" className="v2-faq__item">
                  <summary className="v2-faq__q">
                    {faq.question}
                    <span className="v2-faq__sign" aria-hidden="true" />
                  </summary>
                  <p className="v2-faq__a">{faq.answer}</p>
                </Item>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      <section className="v2-section v2-svc-cta">
        <div className="v2-shell">
          <Reveal className="v2-svc-cta__box">
            <Item as="h2" className="v2-title">
              {c.contact.heading}
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
