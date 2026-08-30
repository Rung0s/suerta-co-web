import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { V2_HOME, V2_NAV_LINKS, resolveLink } from './nav-links';

/* Yuzen menu pili. Anasayfada baglantilar ayni sayfadaki bolumlere,
   diger /v2 sayfalarinda gercek rotalara gidiyor. */
export default function V2Nav() {
  const { pathname } = useLocation();
  const onHome = pathname === V2_HOME;

  const brand = (
    <>
      suerta<span className="v2-nav__brand-dot">.co</span>
    </>
  );

  return (
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
        {V2_NAV_LINKS.map((link) => {
          const to = resolveLink(link, onHome);
          const current = link.path === pathname;
          /* Ayni sayfadaki capa icin router'a gerek yok; Link kullanmak
             burada gereksiz bir gezinme kaydi birakirdi. */
          return to.startsWith('#') ? (
            <a key={link.label} className="v2-nav__link" href={to}>
              {link.label}
            </a>
          ) : (
            <Link
              key={link.label}
              className="v2-nav__link"
              to={to}
              aria-current={current ? 'page' : undefined}
            >
              {link.label}
            </Link>
          );
        })}
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
    </nav>
  );
}
