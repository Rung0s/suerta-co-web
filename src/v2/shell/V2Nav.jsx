import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { V2_HOME, V2_NAV_LINKS, V2_SOCIAL, resolveLink } from './nav-links';

/* Yuzen menu pili. Anasayfada baglantilar ayni sayfadaki bolumlere,
   diger /v2 sayfalarinda gercek rotalara gidiyor.

   Dar ekranda baglantilar pile sigmiyor. Onceden orada yalnizca gizleniyor
   ve yerine hicbir sey konmuyordu: telefondan gelen ziyaretci Isler,
   Hizmetler, Surec ve SSS'e hicbir yoldan ulasamiyordu. Simdi ayni
   baglantilar tam ekran bir katmanda aciliyor. */
export default function V2Nav() {
  const { pathname, hash } = useLocation();
  const onHome = pathname === V2_HOME;
  const [open, setOpen] = useState(false);

  /* Menu acikken arkadaki sayfa kaymamali; bir baglantiya basildiginda
     ya da rota degistiginde kendiliginden kapaniyor. */
  useEffect(() => setOpen(false), [pathname, hash]);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const brand = (
    <>
      suerta<span className="v2-nav__brand-dot">.co</span>
    </>
  );

  const renderLink = (link, className) => {
    const to = resolveLink(link, onHome);
    const current = link.path === pathname;
    /* Ayni sayfadaki capa icin router'a gerek yok; Link kullanmak
       burada gereksiz bir gezinme kaydi birakirdi. */
    return to.startsWith('#') ? (
      <a
        key={link.label}
        className={className}
        href={to}
        onClick={() => setOpen(false)}
      >
        {link.label}
      </a>
    ) : (
      <Link
        key={link.label}
        className={className}
        to={to}
        aria-current={current ? 'page' : undefined}
        onClick={() => setOpen(false)}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <>
      <nav className="v2-nav" aria-label="Ana menü">
        {onHome ? (
          <a className="v2-nav__brand" href="#top">
            {brand}
          </a>
        ) : (
          <Link className="v2-nav__brand" to={V2_HOME}>
            {brand}
          </Link>
        )}

        <div className="v2-nav__links">
          {V2_NAV_LINKS.map((link) => renderLink(link, 'v2-nav__link'))}
        </div>

        {onHome ? (
          <a className="v2-btn v2-btn--primary" href="#iletisim">
            Görüşme ayarla
          </a>
        ) : (
          <Link className="v2-btn v2-btn--primary" to={`${V2_HOME}#iletisim`}>
            Görüşme ayarla
          </Link>
        )}

        {/* Dar ekranin tek gezinme yolu. Genis ekranda gizli: orada
            baglantilar zaten pilin icinde duruyor. */}
        <button
          type="button"
          className={`v2-nav__toggle${open ? ' is-open' : ''}`}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="v2-menu"
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
        >
          <span className="v2-nav__bar" aria-hidden="true" />
          <span className="v2-nav__bar" aria-hidden="true" />
        </button>
      </nav>

      <div
        id="v2-menu"
        className={`v2-menu${open ? ' is-open' : ''}`}
        hidden={!open}
      >
        <div className="v2-menu__links">
          {V2_NAV_LINKS.map((link) => renderLink(link, 'v2-menu__link'))}
        </div>

        <div className="v2-menu__foot">
          {onHome ? (
            <a
              className="v2-btn v2-btn--primary"
              href="#iletisim"
              onClick={() => setOpen(false)}
            >
              Görüşme ayarla
            </a>
          ) : (
            <Link
              className="v2-btn v2-btn--primary"
              to={`${V2_HOME}#iletisim`}
              onClick={() => setOpen(false)}
            >
              Görüşme ayarla
            </Link>
          )}

          <div className="v2-menu__social">
            {V2_SOCIAL.map((item) => (
              <a
                key={item.label}
                className="v2-menu__social-link"
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
