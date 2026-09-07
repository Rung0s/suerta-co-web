import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { objectFor } from '../media/art';
import { Reveal, Item, TwoTone } from '../primitives';
import { useCopy, useLang } from '../i18n';
import { pathFor } from '../i18n/paths';

/* Metin yazilir gibi belirir, ok cizilir gibi. Yolun gercek uzunlugunu
   olcup dasharray'e veriyoruz; sabit bir sayi verilirse farkli ekranlarda
   cizgi ya erken bitiyor ya da yarim kaliyor. */
function Annotation({ text }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const path = node.querySelector('path');
    if (path) node.style.setProperty('--len', path.getTotalLength().toFixed(1));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);


  return (
    <span ref={ref} className={`v2-anno${shown ? ' is-in' : ''}`} aria-hidden="true">
      <span className="v2-anno__text">{text}</span>
      <svg className="v2-anno__arrow" width="46" height="34" viewBox="0 0 46 34" fill="none">
        <path d="M2 3c8.5 1.2 15.6 5.2 21.3 12 3.2 3.8 6.4 8.2 9.6 13.2" />
        <path d="M26.4 28.8l7 1 1.4-7" />
      </svg>
    </span>
  );
}

/* Ne yapiyoruz.
   --------------------------------------------------------------------------
   Alti alanin adi ve tek cumlelik tarifi; ayrintisi /hizmetlerimiz
   sayfasinda. Yanindaki el yazisi not (Annotation) yalnizca burada
   kullaniliyor. */
export default function ServicesSection() {
  const c = useCopy();
  const { lang } = useLang();
  const services = c.services.items;
  return (
    <section className="v2-section" id="hizmetler">
      <div className="v2-shell">
        <Reveal>
          <Item className="v2-section__head">
            <h2 className="v2-title">
              <TwoTone
                lead={c.services.headLead(services.length)}
                tail={c.services.headTail}
              />
            </h2>
            <Annotation text={c.services.annotation} />
          </Item>
        </Reveal>

        <Reveal className="v2-list">
          {services.map((service, i) => (
            <Item key={service.title} className="v2-row">
              <span className="v2-row__num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="v2-row__title">{service.title}</h3>
              <img
                className="v2-row__art"
                src={objectFor(service.slug)}
                alt=""
                width="360"
                height="360"
                loading="lazy"
                decoding="async"
              />
              <div className="v2-row__body">
                <p className="v2-row__desc">{service.desc}</p>
                <div className="v2-tags">
                  {service.tags.map((tag) => (
                    <span key={tag} className="v2-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Item>
          ))}
        </Reveal>

        {/* Alanlarin ayrintisi kendi sayfasinda: burada alti satir, orada
            kime uygun oldugu ve ne teslim edildigi. */}
        <Reveal className="v2-list__more">
          <Item>
            <Link className="v2-btn v2-btn--ghost" to={pathFor('services', lang)}>
              {c.services.more}
            </Link>
          </Item>
        </Reveal>
      </div>
    </section>
  );
}
