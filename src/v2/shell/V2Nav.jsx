import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { V2_SOCIAL, resolveLink } from './nav-links';
import { useCopy, useLang } from '../i18n';
import { LANGS, pathFor, swapLangPath, LANG_NAMES } from '../i18n/paths';

/* Yuzen menu pili. Anasayfada baglantilar ayni sayfadaki bolumlere,
   diger sayfalarda gercek rotalara gidiyor.

   Dar ekranda baglantilar pile sigmiyor. Onceden orada yalnizca gizleniyor
   ve yerine hicbir sey konmuyordu: telefondan gelen ziyaretci hicbir
   bolume ulasamiyordu. Simdi ayni baglantilar tam ekran bir katmanda
   aciliyor. */
export default function V2Nav() {
  const { pathname } = useLocation();
  const { lang } = useLang();
  const c = useCopy();
  const home = pathFor('home', lang);
  const onHome = pathname === home;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    /* Baglantilar zaten kendileri kapatiyor; geri tusuyla gelen gezinme
       menuyu acik birakirdi. */
    const onPop = () => setOpen(false);

    window.addEventListener('keydown', onKey);
    window.addEventListener('popstate', onPop);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('popstate', onPop);
    };
  }, [open]);

  /* Markanin isareti: kirmizi yorungeli kure. Ayni dosya favicon olarak da
     kullaniliyor — sekme, arama sonucu ve menu ayni isareti gosteriyor.
     Yazi isaretin yanindan kaldirilmiyor: kure tek basina markayi
     okutmuyor. */
  const brand = (
    <>
      <img className="v2-nav__mark" src="/favicon-v2.svg" alt="" width="26" height="26" />
      <span>
        suerta<span className="v2-nav__brand-dot">.co</span>
      </span>
    </>
  );

  const close = () => setOpen(false);

  const renderLink = (link, className) => {
    const to = resolveLink(link, lang, onHome);
    const current = to === pathname;
    /* Ayni sayfadaki capa icin router'a gerek yok; Link kullanmak burada
       gereksiz bir gezinme kaydi birakirdi. */
    return to.startsWith('#') ? (
      <a key={link.key} className={className} href={to} onClick={close}>
        {link.label}
      </a>
    ) : (
      <Link
        key={link.key}
        className={className}
        to={to}
        aria-current={current ? 'page' : undefined}
        onClick={close}
      >
        {link.label}
      </Link>
    );
  };

  /* Dil degistirici ayni sayfanin oteki dildeki adresine gidiyor; detay
     sayfalarinda kimlik korunuyor. Anasayfaya atmak, okunan seyi
     kaybettirir. */
  const others = LANGS.filter((item) => item !== lang).map((item) => ({
    lang: item,
    to: swapLangPath(pathname, lang, item),
    label: LANG_NAMES[item],
  }));

  const cta = onHome ? (
    <a className="v2-btn v2-btn--primary" href="#iletisim" onClick={close}>
      {c.nav.cta}
    </a>
  ) : (
    <Link className="v2-btn v2-btn--primary" to={pathFor('contact', lang)} onClick={close}>
      {c.nav.cta}
    </Link>
  );

  return (
    <>
      <nav className="v2-nav" aria-label={c.nav.aria}>
        {onHome ? (
          <a className="v2-nav__brand" href="#top">
            {brand}
          </a>
        ) : (
          <Link className="v2-nav__brand" to={home}>
            {brand}
          </Link>
        )}

        <div className="v2-nav__links">
          {c.nav.links.map((link) => renderLink(link, 'v2-nav__link'))}
        </div>

        <span className="v2-nav__langs">
          {others.map((item) => (
            <Link
              key={item.lang}
              className="v2-nav__lang"
              to={item.to}
              hrefLang={item.lang}
              lang={item.lang}
              onClick={close}
            >
              {item.label}
            </Link>
          ))}
        </span>

        {cta}

        {/* Dar ekranin tek gezinme yolu. Genis ekranda gizli: orada
            baglantilar zaten pilin icinde duruyor. */}
        <button
          type="button"
          className={`v2-nav__toggle${open ? ' is-open' : ''}`}
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="v2-menu"
          aria-label={open ? c.nav.close : c.nav.open}
        >
          <span className="v2-nav__bar" aria-hidden="true" />
          <span className="v2-nav__bar" aria-hidden="true" />
        </button>
      </nav>

      <div id="v2-menu" className={`v2-menu${open ? ' is-open' : ''}`} hidden={!open}>
        <div className="v2-menu__links">
          {c.nav.links.map((link) => renderLink(link, 'v2-menu__link'))}
        </div>

        <div className="v2-menu__foot">
          {cta}

          <div className="v2-menu__social">
            {others.map((item) => (
              <Link
                key={item.lang}
                className="v2-menu__social-link"
                to={item.to}
                hrefLang={item.lang}
                lang={item.lang}
                onClick={close}
              >
                {item.label}
              </Link>
            ))}
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
