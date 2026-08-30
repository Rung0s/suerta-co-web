import React from 'react';
import { Link } from 'react-router-dom';
import { referencesData } from '../data/references';
import { Reveal, Item, TwoTone } from './primitives';
import V2Layout from './shell/V2Layout';
import { SERVICES } from './data/services';
import { STEPS, FAQS } from './data/process';
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

function ServiceCard({ service, index }) {
  const proof = proofProjects(service.proof);

  return (
    <Reveal className="v2-svc" id={service.slug}>
      <Item as="span" className="v2-svc__num">{String(index + 1).padStart(2, '0')}</Item>
      <Item as="h2" className="v2-svc__title">{service.title}</Item>
      <Item as="p" className="v2-svc__desc">{service.desc}</Item>

      <Item className="v2-svc__meta">
        <span className="v2-label">Kimin için</span>
        <p className="v2-svc__audience">{service.audience}</p>
      </Item>

      <Item className="v2-svc__meta">
        <span className="v2-label">Teslim edilenler</span>
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
          <span className="v2-label">Bu alanda</span>
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
  return (
    <V2Layout>
      <header className="v2-section v2-pagehead" id="top">
        <div className="v2-halo" aria-hidden="true" />
        <div className="v2-shell">
          <Reveal className="v2-pagehead__inner">
            <Item>
              <span className="v2-label">Hizmetler</span>
            </Item>
            <Item as="h1" className="v2-display">
              <TwoTone lead="Altı alanda" tail="çalışıyoruz." />
            </Item>
            <Item as="p" className="v2-lead">
              Hepsi tek bir işe çıkıyor: ziyaretçiyi müşteriye çevirmek. Aşağıda her
              alanın kime uygun olduğu, ne teslim ettiğimiz ve o alanda yaptığımız iş
              yazıyor.
            </Item>
            <Item className="v2-pagehead__actions">
              <Link className="v2-btn v2-btn--primary" to="/v2#iletisim">
                Görüşme ayarla
              </Link>
              <Link className="v2-btn v2-btn--ghost" to="/v2#isler">
                İşleri gör
              </Link>
            </Item>
          </Reveal>
        </div>
      </header>

      {/* Alti alan ---------------------------------------------------------- */}
      <section className="v2-section" id="hizmetler">
        <div className="v2-shell">
          <div className="v2-svc-grid">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
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
                <TwoTone lead="Hangi alan olursa olsun" tail="süreç aynı." />
              </h2>
            </Item>
          </Reveal>

          <Reveal className="v2-steps">
            {STEPS.map((step) => (
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
                <TwoTone lead="Görüşmeden önce" tail="merak edilenler." />
              </h2>
            </Item>
          </Reveal>

          <Reveal className="v2-faq">
            {FAQS.map((faq) => (
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
              <TwoTone lead="Hangi alanda olduğunuzu" tail="15 dakikada netleştirelim." />
            </Item>
            <Item as="p" className="v2-muted">
              Ne sattığınızı, kime sattığınızı ve neyin eksik olduğunu konuşuyoruz.
              Görüşme ücretsiz, kapsam ve fiyat sonrasında yazılı geliyor.
            </Item>
            <Item>
              <Link className="v2-btn v2-btn--primary" to="/v2#iletisim">
                Görüşme ayarla
              </Link>
            </Item>
          </Reveal>
        </div>
      </section>
    </V2Layout>
  );
}
