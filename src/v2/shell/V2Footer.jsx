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
              © {new Date().getFullYear()} suerta.co — dijital ajans. İnternet siteleri,
              e-ticaret, rezervasyon sistemleri ve yapay zekâ otomasyonları. Tüm
              hakları saklıdır.
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

      {/* Sayfanin en alti: firlatma anini kutlayan kontrol odasi. Telif
          satirindan sonra geliyor, sayfa onun uzerinde kapaniyor.
          Halftone baski; koyu bantta ters cevriliyor (bkz. closing.css).
          Once bir drone videosu vardi — guzel bir cekimdi ama sayfanin
          diliyle konusmuyordu ve 3,5 MB indiriliyordu. */}
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
