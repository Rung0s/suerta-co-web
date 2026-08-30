import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { V2_HOME, V2_NAV_LINKS, V2_SOCIAL, resolveLink } from './nav-links';

/* Kapanis bandi.
   Referans sayfayi tam genislik bir gorselle kapatiyor ve telif satirini
   onun uzerine serilen koyu gradyanda tasiyor. Bizde o yeri tesisin drone
   cekimi tutuyor.

   Duzen ana sitedeki alt bilgiyle ayni: uc kolon, dev logotype, en altta
   telif ve yukari don. */
export default function V2Footer() {
  const { pathname } = useLocation();
  const onHome = pathname === V2_HOME;

  return (
    <footer className="v2-band">
      <video
        className="v2-band__video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/video/showcase-poster.jpg"
        aria-label="Bungalov tesisi drone çekimi"
      >
        <source src="/video/showcase.mp4" type="video/mp4" />
      </video>
      <div className="v2-band__dither" aria-hidden="true" />
      <div className="v2-band__foot">
        <div className="v2-shell">
          <div className="v2-fcols">
            <div className="v2-fcol">
              <span className="v2-fcol__title">Menü</span>
              {V2_NAV_LINKS.map((link) => {
                const to = resolveLink(link, onHome);
                return to.startsWith('#') ? (
                  <a key={link.label} className="v2-fcol__link" href={to}>
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} className="v2-fcol__link" to={to}>
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="v2-fcol">
              <span className="v2-fcol__title">Sosyal</span>
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
              <span className="v2-fcol__title">İletişim</span>
              <a className="v2-fcol__link" href="mailto:suerta.info@gmail.com">
                suerta.info@gmail.com
              </a>
              <span className="v2-fcol__link v2-fcol__link--plain">
                Eskişehir, Türkiye (Global)
              </span>
            </div>
          </div>

          {/* Logotype, baslik degil: sayfada ikinci bir h1 yaratmasin diye
              div ve role="img". */}
          <div className="v2-wordmark" role="img" aria-label="suerta.co">
            suerta<span className="v2-wordmark__dot">.co</span>
          </div>

          <div className="v2-band__bottom">
            <span className="v2-band__copy">
              © {new Date().getFullYear()} suerta.co — otel, kiralama, eğitim ve
              e-ticaret markaları için siteler. Tüm hakları saklıdır.
            </span>
            <button
              type="button"
              className="v2-totop"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Yukarı dön ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
