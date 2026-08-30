import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { HERO_CARDS } from './card-list';

/* ==========================================================================
   Firlatma sahnesi — sabitlenen hero
   --------------------------------------------------------------------------
   Hero ve alan kartlari ayri iki blok degil, tek bir sahne. Sayfa bolumun
   ustune geldiginde sahne ekrana sabitleniyor (sticky) ve asagi kaydirmak
   artik sayfayi degil sahneyi ilerletiyor: yazi yukari cikiyor, kartlar
   sirayla saga kayiyor, roket rampadan havalaniyor. Alti kart bittiginde
   sabitleme birakiyor ve sayfa normal akisina donuyor.

   Neden boyle: kartlar onceden zamanlayiciyla donuyordu. Zamanlayici
   okuyucuyu beklemiyor — bir karti okurken digerine geciyordu. Burada
   ilerlemeyi okuyucu veriyor.

   Sahne yalnizca genis ekranda ve hareket kisitlamasi yokken sabitleniyor.
   Dar ekranda sabitleme dokunmatik kaydirmayla cakisiyor; orada yazi,
   roket ve kartlar sirayla normal akista duruyor.
   ========================================================================== */

const CARD_COUNT = HERO_CARDS.length;

/* Sahnenin bolumleri, ilerleme (0–1) uzerinden:
   0.00–0.10  yazi duruyor, roket rampada
   0.10–0.20  yazi yukari cikiyor, ilk kart geliyor
   0.20–0.92  kartlar sirayla geciyor, roket yukseliyor
   0.92–1.00  son kart ortada duruyor, sahne birakiliyor */
const COPY_OUT = 0.2;
/* Kartlar yazi tamamen cekildikten sonra giriyor. Onceden ikisi ayni anda
   ortadaydi ve kartlar paragrafin uzerine biniyordu. */
const CARDS_IN = 0.24;
const CARDS_OUT = 0.94;

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

/* Iki esik arasindaki konumu 0–1'e indiriyor. */
function span(value, from, to) {
  return clamp((value - from) / (to - from));
}

export default function HeroLaunch() {
  const outer = useRef(null);
  const [progress, setProgress] = useState(0);
  /* Ilk cizim her yerde ayni olmali: prerender masaustu genisliginde
     calisiyor, mod ancak tarayicida olculuyor. */
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 900px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const apply = () => setPinned(!narrow.matches && !reduced.matches);
    apply();

    narrow.addEventListener('change', apply);
    reduced.addEventListener('change', apply);
    return () => {
      narrow.removeEventListener('change', apply);
      reduced.removeEventListener('change', apply);
    };
  }, []);

  useEffect(() => {
    const node = outer.current;
    if (!node || !pinned) {
      setProgress(0);
      return undefined;
    }

    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      /* Kaydirilabilir mesafe = bolumun boyu eksi bir ekran. Sahne o mesafe
         boyunca sabit duruyor. */
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) {
        setProgress(0);
        return;
      }
      setProgress(clamp(-rect.top / travel));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pinned]);

  /* Kart treni: t=0 ilk kart ortada, t=1 son kart ortada. */
  const t = span(progress, CARDS_IN, CARDS_OUT);
  const head = t * (CARD_COUNT - 1);
  const active = Math.round(head);

  const copyOut = span(progress, 0.04, COPY_OUT);
  const lift = span(progress, 0.1, 1);

  /* Kartin sahnedeki yerine gitmek: nokta gostergesine basinca sayfa o
     kartin denk geldigi kaydirma konumuna gidiyor. */
  const goTo = (index) => {
    const node = outer.current;
    if (!node || !pinned) return;
    const travel = node.offsetHeight - window.innerHeight;
    const ratio = CARDS_IN + (index / (CARD_COUNT - 1)) * (CARDS_OUT - CARDS_IN);
    window.scrollTo({
      top: node.offsetTop + travel * ratio,
      behavior: 'smooth',
    });
  };

  const copy = (
    <div
      className="v2-launch__copy"
      style={
        pinned
          ? {
              opacity: 1 - copyOut,
              transform: `translateY(${copyOut * -56}px)`,
              pointerEvents: copyOut > 0.6 ? 'none' : 'auto',
            }
          : undefined
      }
    >
      {/* Marka adi hero'da yaziyla geciyor: arama motoru da ziyaretci de
          sayfanin ilk ekraninda kimin konustugunu gormeli. */}
      <span className="v2-hero__brand">
        suerta<span className="v2-hero__brand-dot">.co</span>
      </span>
      <h1 className="v2-display">
        <span className="v2-tone-lead">Ziyaretçiyi müşteriye çeviren</span> premium web
        siteleri.
      </h1>
      <div className="v2-hero__actions">
        <a className="v2-btn v2-btn--primary" href="#iletisim">
          Görüşme ayarla
        </a>
        <a className="v2-btn v2-btn--ghost" href="#isler">
          İşleri gör
        </a>
      </div>
    </div>
  );

  const deck = (
    /* Kartlar yazi cekilirken geliyor: ikisi ayni anda ortada durunca
       kartlar yazinin uzerine biniyordu. */
    <div className="v2-launch__deck" style={pinned ? { opacity: span(progress, 0.18, 0.28) } : undefined}>
      {HERO_CARDS.map(({ key, Card }, i) => {
        const offset = i - head;
        const distance = Math.abs(offset);

        const style = pinned
          ? {
              /* Komsu kartlar daha uzakta ve daha soluk: onceki araliklarda
                 yandaki kart roketin uzerine biniyor ve ikisi birbirini
                 okunmaz yapiyordu. */
              transform: `translate(-50%, -50%) translateX(${offset * 132}%) scale(${
                1 - Math.min(distance, 2) * 0.08
              })`,
              opacity: distance > 1.15 ? 0 : 1 - distance * 0.78,
              zIndex: Math.max(1, 10 - Math.round(distance * 10)),
              pointerEvents: i === active ? 'auto' : 'none',
            }
          : undefined;

        return (
          <div className="v2-launch__slot" key={key} style={style}>
            <Card />
          </div>
        );
      })}
    </div>
  );

  return (
    <header
      className={`v2-launch${pinned ? ' is-pinned' : ''}`}
      id="top"
      ref={outer}
      style={{ '--cards': CARD_COUNT }}
    >
      <div className="v2-launch__stage">
        <div className="v2-halo" aria-hidden="true" />
        <div className="v2-castlight" aria-hidden="true" />

        {/* Sahne: kalabalik ve roket. Yazidan sonra geliyor, boylece
            sabitleme kapaliyken (dar ekran) once yazi ve kartlar, sonra
            sahne okunuyor. */}
        <div className="v2-launch__scene">
          {/* Kalabalik sahnenin zemini: roketin olcegini veren ve bakisin
              nereye dondugunu soyleyen sey. */}
          <img
            className="v2-launch__crowd"
            src="/img/crowd.webp"
            alt=""
            aria-hidden="true"
            width="2400"
            height="455"
            decoding="async"
          />

          {/* Roket iki baski: rampadaki hali ve havalanmis hali. Sahne
              ilerledikce biri sonuyor, digeri yukari cikarak beliriyor.
              Onceki hali kodla cizilmis bir piksel roketti ve sayfadaki
              halftone baskilarin yaninda oyuncak gibi duruyordu. */}
          <img
            className="v2-launch__pad"
            src="/img/rocket-pad.webp"
            alt=""
            aria-hidden="true"
            width="900"
            height="1739"
            decoding="async"
            style={pinned ? { opacity: 1 - Math.min(1, lift * 2.4) } : undefined}
          />

          <img
            className="v2-launch__fly"
            src="/img/rocket-fly.webp"
            alt=""
            aria-hidden="true"
            width="900"
            height="1592"
            decoding="async"
            style={
              pinned
                ? {
                    opacity: Math.min(1, lift * 2.6),
                    transform: `translateY(${(1 - lift) * 24}%) scale(${0.92 + lift * 0.08})`,
                  }
                : { opacity: 0 }
            }
          />
        </div>

        <div className="v2-shell v2-launch__inner">
          {copy}
          {deck}
        </div>

        <div className="v2-launch__dots" role="tablist" aria-label="Çalışma alanları">
          {HERO_CARDS.map((card, i) => (
            <button
              key={card.key}
              type="button"
              role="tab"
              className={`v2-deck__dot${i === active ? ' is-active' : ''}`}
              aria-selected={i === active}
              aria-label={card.area}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        {/* Sahnenin kaydirmayla ilerledigini bir yerde soylemek gerekiyor;
            aksi halde sayfa donmus gibi duruyor. */}
        <motion.span
          className="v2-launch__hint"
          animate={{ opacity: progress > 0.08 ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          kaydır
        </motion.span>
      </div>
    </header>
  );
}
