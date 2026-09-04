import React, { useEffect, useRef, useState } from 'react';
import { Reveal, Item, TwoTone } from '../primitives';
import { useCopy } from '../i18n';

/* Masanin basindaki yedi gorev.
   --------------------------------------------------------------------------
   Yukaridan bakilan yuvarlak masa; cevresinde yedi koltuk. Bolum ekrana
   gelince sayfa durur (sticky), kaydirma masayi cevirir: her STEP_PX
   kaydirma bir koltuk. Ibrenin altina gelen koltuk gorevini soyler. Yedi
   koltuk gecilince sayfa kaldigi yerden akar. Rulet gibi: nerede
   duracagi kaydirana bagli, ama her koltukta bir gorev var.

   Koltuk numarasi biriken deltadan degil, bolumun icindeki kaydirma
   konumundan turetiliyor: geri sarinca ayni koltuklar ayni sirayla geri
   gelir, sayfa yenilenince de kaldigi koltukta acilir.

   Figurler dort ayri kusbakisi cizim, alfa kanalli (arka plan yok); yedi
   koltuga dagitiliyor ve her biri masanin merkezine bakacak sekilde
   donduruluyor. */
const SEATS = 7;
const STEP = 360 / SEATS;
const SPRITES = [1, 2, 4, 2, 1, 4, 2];
/* Bir koltuk icin gereken kaydirma (px). CSS'teki --crew-step ile ayni. */
const STEP_PX = 160;

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

export default function CrewTable({ compact = false }) {
  const c = useCopy().crew;
  const [seat, setSeat] = useState(0);
  const holder = useRef(null);

  useEffect(() => {
    const node = holder.current;
    if (!node) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const top = node.getBoundingClientRect().top + window.scrollY;
      const raw = (window.scrollY - top) / STEP_PX;
      setSeat(clamp(Math.round(raw), 0, SEATS - 1));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /* Oklar sayfayi o koltugun kaydirma konumuna tasir; boylece ok ve
     tekerlek ayni durumu yonetir, ikisi birbirini ezmez. Azaltilmis
     harekette bolum sabitlenmedigi icin oklar dogrudan koltugu degistirir. */
  const goTo = (i) => {
    const next = clamp(i, 0, SEATS - 1);
    const node = holder.current;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!node || reduced) {
      setSeat(next);
      return;
    }
    const top = node.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + next * STEP_PX, behavior: 'smooth' });
  };

  const current = c.seats[seat];
  /* Ibre saat 12'de. Koltuk i masa uzerinde i*STEP derecede duruyor; onu
     ibreye getirmek icin masa -i*STEP donmeli. */
  const angle = -seat * STEP;

  return (
    <div className={`v2-crew${compact ? ' v2-crew--compact' : ''}`} ref={holder}>
      <div className="v2-crew__pin">
        <div className="v2-shell">
          <Reveal className="v2-crew__grid">
            {!compact && (
              <Item className="v2-crew__head">
                <h2 className="v2-title">
                  <TwoTone lead={c.lead} tail={c.tail} />
                </h2>
                <p className="v2-lead">{c.intro}</p>
              </Item>
            )}

            <Item className="v2-crew__stage">
              <span className="v2-crew__needle" aria-hidden="true" />
              <div
                className="v2-crew__table"
                style={{ transform: `rotate(${angle}deg)` }}
                aria-hidden="true"
              >
                <span className="v2-crew__top" />
                {c.seats.map((s, i) => (
                  <span
                    key={s.role}
                    className={`v2-crew__seat${i === seat ? ' is-live' : ''}`}
                    style={{ '--a': `${i * STEP}deg` }}
                  >
                    <img
                      className="v2-crew__figure"
                      src={`/img/crew/seat-${SPRITES[i]}.webp`}
                      alt=""
                      width="240"
                      height="240"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                ))}
              </div>
              <span className="v2-crew__hint">{c.hint}</span>
            </Item>

            <Item className="v2-crew__card" aria-live="polite">
              <span className="v2-crew__num">{c.seatLabel(seat + 1)}</span>
              <span className="v2-crew__role" key={`r${seat}`}>
                {current.role}
              </span>
              <span className="v2-crew__mission" key={`m${seat}`}>
                {current.mission}
              </span>
              <span className="v2-crew__dots" aria-hidden="true">
                {c.seats.map((s, i) => (
                  <i key={s.role} className={i === seat ? 'is-on' : ''} />
                ))}
              </span>
              <span className="v2-crew__nav">
                <button
                  type="button"
                  className="v2-arrow"
                  onClick={() => goTo(seat - 1)}
                  aria-label={c.prev}
                  disabled={seat === 0}
                >
                  ←
                </button>
                <button
                  type="button"
                  className="v2-arrow"
                  onClick={() => goTo(seat + 1)}
                  aria-label={c.next}
                  disabled={seat === SEATS - 1}
                >
                  →
                </button>
              </span>
            </Item>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
