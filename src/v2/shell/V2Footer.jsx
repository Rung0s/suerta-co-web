import React from 'react';
import { Link } from 'react-router-dom';
import { V2_SOCIAL, CONTACT, resolveLink } from './nav-links';
import { useCopy, useLang } from '../i18n';

/* Kapanis bandi.
   Referans sayfayi tam genislik bir gorselle kapatiyor ve telif satirini
   onun uzerine serilen koyu gradyanda tasiyor.

   Duzen uc kolon, dev logotype, en altta telif ve yukari don. */
export default function V2Footer() {
  const { lang } = useLang();
  const c = useCopy();

  return (
    <footer className="v2-band">
      <div className="v2-band__foot">
        <div className="v2-shell">
          <div className="v2-fcols">
            <div className="v2-fcol">
              <span className="v2-fcol__title">{c.footer.menu}</span>
              {/* Alt bilgi her zaman gercek adrese gidiyor, anasayfada bile:
                  menu orada capa kullaniyor ve boylece anasayfa hicbir ic
                  sayfaya baglanti vermiyordu. */}
              {c.nav.links.map((link) => (
                <Link key={link.key} className="v2-fcol__link" to={resolveLink(link, lang, false)}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="v2-fcol">
              <span className="v2-fcol__title">{c.footer.social}</span>
              {V2_SOCIAL.map((item) => (
                <a
                  key={item.label}
                  className="v2-fcol__link"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="v2-fcol">
              <span className="v2-fcol__title">{c.footer.contact}</span>
              <a className="v2-fcol__link" href={`mailto:${CONTACT.mail}`}>
                {CONTACT.mail}
              </a>
              <span className="v2-fcol__link v2-fcol__link--plain">
                {c.footer.location}
              </span>
            </div>
          </div>

          {/* Logotype, baslik degil: sayfada ikinci bir h1 yaratmasin diye
              div ve role="img". */}
          <div className="v2-wordmark" role="img" aria-label="suerta.co">
            suerta<span className="v2-wordmark__dot">.co</span>
          </div>

          <div className="v2-band__bottom">
            <span className="v2-band__copy">{c.footer.copy(new Date().getFullYear())}</span>
            <button
              type="button"
              className="v2-totop"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {c.footer.toTop}
            </button>
          </div>
        </div>
      </div>

      {/* Sayfanin en alti: firlatma anini kutlayan kontrol odasi. Telif
          satirindan sonra geliyor, sayfa onun uzerinde kapaniyor.
          Halftone baski; koyu bantta ters cevriliyor (bkz. closing.css). */}
      <img
        className="v2-band__scene"
        src="/img/control.webp"
        alt=""
        aria-hidden="true"
        width="2400"
        height="837"
        decoding="async"
        loading="lazy"
      />
    </footer>
  );
}
