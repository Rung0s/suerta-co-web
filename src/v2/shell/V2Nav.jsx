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
const LANG_CODES = { tr: 'TR', en: 'EN', it: 'IT' };

export default function V2Nav() {
  const { pathname } = useLocation();
  const { lang } = useLang();
  const c = useCopy();
  const home = pathFor('home', lang);
  const onHome = pathname === home;
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

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

  /* Dar ekrandaki dil acilir listesi: pilin disina tiklayinca ya da
     Escape'le kapaniyor. Ayri bir katman degil, kucuk bir popover
     oldugu icin body kilitlemiyor. */
  useEffect(() => {
    if (!langOpen) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setLangOpen(false);
    };
    const onClick = (event) => {
      if (!event.target.closest('.v2-nav__lang-mobile')) setLangOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [langOpen]);

  /* Menu koyu bir bolumun uzerinde mi?
     --------------------------------------------------------------------
     Pil beyaz ve sabit; koyu banda (.v2-section--dark) gelindiginde bandin
     ortasinda parlak bir levha gibi duruyor ve icindeki gri baglantilar
     koyu zemine karsi 4:1'in altina dusuyordu. Gozlemci, pilin durdugu ince
     yatay serit disindaki her seyi kirpiyor: bir bolum yalnizca tam o
     seride goruldugunde durum degisiyor.

     Olcu pilden okunuyor, sabit yazilmiyor: pil hem yuksekligi hem ust
     bosluguyla ekran genisligine gore degisiyor. */
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    /* Koyu yuzeyler: koyu bolumler ve footer bandi. Footer ilk yazildiginda
       disarida kalmisti ve beyaz pil koyu footer'in uzerinde ayni delik
       etkisini yapiyordu. */
    const sections = document.querySelectorAll('.v2-section--dark, .v2-band');
    if (!sections.length || !('IntersectionObserver' in window)) return undefined;

    let observer;
    const build = () => {
      observer?.disconnect();
      const pill = document.querySelector('.v2-nav');
      if (!pill) return;
      const rect = pill.getBoundingClientRect();
      const top = Math.round(rect.top);
      const bottom = Math.round(window.innerHeight - rect.bottom);
      if (top < 0 || bottom < 0) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setOnDark(true);
            else if (entry.boundingClientRect.top > 0 || entry.boundingClientRect.bottom < 0) {
              /* Serit disina cikan bolum: yalnizca hicbir koyu bolum seride
                 degmiyorsa kapaniyor. */
              const stillDark = [...sections].some((node) => {
                const box = node.getBoundingClientRect();
                return box.top <= rect.bottom && box.bottom >= rect.top;
              });
              setOnDark(stillDark);
            }
          });
        },
        { rootMargin: `-${top}px 0px -${bottom}px 0px`, threshold: 0 }
      );
      sections.forEach((node) => observer.observe(node));
    };

    build();
    window.addEventListener('resize', build);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', build);
    };
  }, [pathname]);

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
      <nav className={`v2-nav${onDark ? ' v2-nav--on-dark' : ''}`} aria-label={c.nav.aria}>
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

        {/* Uc dil de duruyor, icinde bulunulan isaretli.
            Onceden yalnizca oteki iki dil yaziyordu ("English Italiano") ve
            ziyaretci hangi dilde oldugunu goremiyordu — mobil secicide bu
            bilgi vardi, masaustunde yoktu. Tam adlar yerine kodlar: pil
            zaten marka, bes baglanti, iki dil ve eylemi tasiyor. */}
        <span className="v2-nav__langs">
          {LANGS.map((item) =>
            item === lang ? (
              <span key={item} className="v2-nav__lang is-current" aria-current="true">
                {LANG_CODES[item]}
              </span>
            ) : (
              <Link
                key={item}
                className="v2-nav__lang"
                to={swapLangPath(pathname, lang, item)}
                hrefLang={item}
                lang={item}
                aria-label={LANG_NAMES[item]}
                onClick={close}
              >
                {LANG_CODES[item]}
              </Link>
            )
          )}
        </span>

        {/* Dar ekranda tam dil adi sigmiyor; sag ustte tek dokunusla acilan
            kisa kod (TR/EN/IT) listesi kaliyor, hamburger menuye girmeden. */}
        <span className="v2-nav__lang-mobile">
          <button
            type="button"
            className="v2-nav__lang-current"
            onClick={() => setLangOpen((value) => !value)}
            aria-expanded={langOpen}
            aria-haspopup="listbox"
          >
            {LANG_CODES[lang]}
          </button>
          {langOpen && (
            <span className="v2-nav__lang-pop" role="listbox">
              {others.map((item) => (
                <Link
                  key={item.lang}
                  className="v2-nav__lang-opt"
                  to={item.to}
                  hrefLang={item.lang}
                  lang={item.lang}
                  onClick={() => {
                    setLangOpen(false);
                    close();
                  }}
                >
                  {LANG_CODES[item.lang]}
                </Link>
              ))}
            </span>
          )}
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
                rel="noopener noreferrer"
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
