import React from 'react';
import { Link } from 'react-router-dom';
import { referencesData } from '../data/references';
import { Reveal, Item, TwoTone } from './primitives';
import V2Layout from './shell/V2Layout';
import { useCopy, useLang } from './i18n';
import { pathFor } from './i18n/paths';
import Seo, { breadcrumb, faqPage } from './seo/Seo';
import './services.css';

/* /v2 kabugunun ilk ic sayfasi.
   Anasayfadaki hizmet listesi alti alanin adini soyluyor ama bir alanin ne
   icerdigini soylemiyor. Bu sayfa her alani ayni iskeletle aciyor: kime
   uygun, ne teslim ediliyor, o alanda hangi is yapildi. */

function proofProjects(ids) {
  return ids
    .map((id) => referencesData.find((project) => project.id === id))
    .filter(Boolean);
}

function ServiceCard({ service, index, copy }) {
  const proof = proofProjects(service.proof);

  return (
    <Reveal className="v2-svc" id={service.slug}>
      <Item as="span" className="v2-svc__num">{String(index + 1).padStart(2, '0')}</Item>
      <Item as="h2" className="v2-svc__title">{service.title}</Item>
      <Item as="p" className="v2-svc__desc">{service.desc}</Item>

      <Item className="v2-svc__meta">
        <span className="v2-label">{copy.audienceLabel}</span>
        <p className="v2-svc__audience">{service.audience}</p>
      </Item>

      <Item className="v2-svc__meta">
        <span className="v2-label">{copy.deliverablesLabel}</span>
        <ul className="v2-svc__list">
          {service.deliverables.map((item) => (
            <li key={item} className="v2-svc__item">
              {item}
            </li>
          ))}
        </ul>
      </Item>

      <Item className="v2-tags v2-svc__tags">
        {service.tags.map((tag) => (
          <span key={tag} className="v2-tag">
            {tag}
          </span>
        ))}
      </Item>

      {/* Kaniti olmayan alan sessiz kaliyor: uydurma referans yerine hic
          referans. */}
      {proof.length > 0 && (
        <Item className="v2-svc__proof">
          <span className="v2-label">{copy.pageProofLabel}</span>
          {proof.map((project) => (
            <a
              key={project.id}
              className="v2-svc__proof-link"
              href={project.link}
              target="_blank"
              rel="noreferrer"
            >
              {project.name} ↗
            </a>
          ))}
        </Item>
      )}
    </Reveal>
  );
}

export default function ServicesV2() {
  const c = useCopy();
  const { lang } = useLang();
  const home = pathFor('home', lang);

  return (
    <V2Layout>
      <Seo
        title={c.meta.services.title}
        description={c.meta.services.description}
        jsonLd={[
          faqPage(c.faq.items),
          breadcrumb([
            { name: c.nav.home, path: home },
            { name: c.pages.services.label, path: pathFor('services', lang) },
          ]),
        ]}
      />

      <header className="v2-section v2-pagehead" id="top">
        <div className="v2-halo" aria-hidden="true" />
        <div className="v2-shell">
          <Reveal className="v2-pagehead__inner">
            <Item>
              <span className="v2-label">{c.pages.services.label}</span>
            </Item>
            <Item as="h1" className="v2-display">
              <TwoTone lead={c.pages.services.lead} tail={c.pages.services.tail} />
            </Item>
            <Item as="p" className="v2-lead">
              {c.pages.services.intro}
            </Item>
            <Item className="v2-pagehead__actions">
              <Link className="v2-btn v2-btn--primary" to={`${home}#iletisim`}>
                {c.hero.ctaPrimary}
              </Link>
              <Link className="v2-btn v2-btn--ghost" to={`${home}#isler`}>
                {c.hero.ctaSecondary}
              </Link>
            </Item>
          </Reveal>
        </div>
      </header>

      {/* Alti alan ---------------------------------------------------------- */}
      <section className="v2-section" id="hizmetler">
        <div className="v2-shell">
          <div className="v2-svc-grid">
            {c.services.items.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
                copy={{ ...c.services, pageProofLabel: c.pages.services.proofLabel }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Surec -------------------------------------------------------------- */}
      <section className="v2-section" id="surec">
        <div className="v2-shell">
          <Reveal>
            <Item className="v2-section__head">
              <h2 className="v2-title">
                <TwoTone lead={c.pages.services.processLead} tail={c.pages.services.processTail} />
              </h2>
            </Item>
          </Reveal>

          <Reveal className="v2-steps">
            {c.process.steps.map((step) => (
              <Item key={step.num} className="v2-step">
                <span className="v2-step__num">{step.num}</span>
                <span className="v2-step__title">{step.title}</span>
                <span className="v2-step__desc">{step.desc}</span>
              </Item>
            ))}
          </Reveal>
        </div>
      </section>

      {/* SSS ---------------------------------------------------------------- */}
      <section className="v2-section" id="sss">
        <div className="v2-shell">
          <Reveal>
            <Item className="v2-section__head">
              <h2 className="v2-title">
                <TwoTone lead={c.faq.lead} tail={c.faq.tail} />
              </h2>
            </Item>
          </Reveal>

          <Reveal className="v2-faq">
            {c.faq.items.map((faq) => (
              <Item key={faq.q} as="details" className="v2-faq__item">
                <summary className="v2-faq__q">
                  {faq.q}
                  <span className="v2-faq__sign" aria-hidden="true" />
                </summary>
                <p className="v2-faq__a">{faq.a}</p>
              </Item>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Kapanis cagrisi ---------------------------------------------------- */}
      <section className="v2-section v2-svc-cta">
        <div className="v2-shell">
          <Reveal className="v2-svc-cta__box">
            <Item as="h2" className="v2-title">
              <TwoTone lead={c.pages.services.ctaLead} tail={c.pages.services.ctaTail} />
            </Item>
            <Item as="p" className="v2-muted">
              {c.pages.services.ctaText}
            </Item>
            <Item>
              <Link className="v2-btn v2-btn--primary" to={`${home}#iletisim`}>
                {c.hero.ctaPrimary}
              </Link>
            </Item>
          </Reveal>
        </div>
      </section>
    </V2Layout>
  );
}
