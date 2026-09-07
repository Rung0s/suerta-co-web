import React, { useEffect, useRef } from 'react';
import { Reveal, Item, TwoTone } from '../primitives';
import { useCopy } from '../i18n';

const ASCII_RAMP = '-=+*#%@$&';

function asciiBlock(rows, cols, seed) {
  let out = '';
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const n = Math.sin((x + 1) * 12.9898 + (y + 1) * 78.233 + seed) * 43758.5453;
      const f = n - Math.floor(n);
      out += ASCII_RAMP[Math.floor(f * ASCII_RAMP.length)];
    }
    if (y < rows - 1) out += '\n';
  }
  return out;
}

/* Maske olarak markanin bas harfi. SVG data-URI, cunku tek bir harf icin
   ikili dosya tasimak israf ve harf her olcekte net kalmali. */
function glyphMask(letter) {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 130'>` +
    `<text x='50' y='104' text-anchor='middle' font-family='Inter,sans-serif' ` +
    `font-size='128' font-weight='700' fill='%23000'>${letter}</text></svg>`;
  return `url("data:image/svg+xml,${svg.replace(/#/g, '%23')}")`;
}

/* Bant kendi kendine saga iliyor. Onceki hali sayfa konumuna bagliydi ve
   yanlis hissettiriyordu: kullanici asagi kaydirdiginda bant da kayiyordu,
   yani sayfanin kendisi yerinden oynuyormus gibi oluyordu. Simdi sayfa tam
   yerinde duruyor, hareket eden tek sey bant.

   Surus rAF ile, sabit hizda ve tek yonde. Sona gelince basa donuyor;
   kartlar iki kez basildigi icin donus gorunmuyor.

   Herhangi bir mudahalede (tekerlek, parmak, klavye, ok) alti saniye
   devrediliyor — birinin okudugu yerden bandi cekmek, hareketin
   sagladigi her seyden kotudur. */
function useDriftingCarousel(ref) {
  const takeOverRef = useRef(() => {});

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    let raf = 0;
    let releaseTimer = 0;
    let paused = false;
    let last = 0;
    /* Saniyede piksel. Okunacak metin tasiyan bir bant icin yavas olmali;
       hizli olsaydi goz takip etmek zorunda kalirdi. */
    const SPEED = 26;

    const step = (now) => {
      raf = requestAnimationFrame(step);
      const delta = last ? (now - last) / 1000 : 0;
      last = now;
      if (paused || delta <= 0) return;

      /* Yarisi: kartlar iki kez basildi, ilk kopyanin sonuna gelince
         basa donuluyor ve kesinti gorunmuyor. */
      const half = node.scrollWidth / 2;
      if (half <= 0) return;

      let next = node.scrollLeft + SPEED * delta;
      if (next >= half) next -= half;
      node.scrollLeft = next;
    };

    const takeOver = () => {
      paused = true;
      clearTimeout(releaseTimer);
      releaseTimer = setTimeout(() => {
        paused = false;
      }, 6000);
    };

    const hold = () => {
      paused = true;
      clearTimeout(releaseTimer);
    };
    const release = () => {
      clearTimeout(releaseTimer);
      releaseTimer = setTimeout(() => {
        paused = false;
      }, 600);
    };

    takeOverRef.current = takeOver;
    raf = requestAnimationFrame(step);

    node.addEventListener('wheel', takeOver, { passive: true });
    node.addEventListener('touchstart', takeOver, { passive: true });
    node.addEventListener('keydown', takeOver);
    /* Uzerine gelince duruyor: okumak icin gelinmis demektir. */
    node.addEventListener('mouseenter', hold);
    node.addEventListener('mouseleave', release);
    node.addEventListener('focusin', hold);
    node.addEventListener('focusout', release);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(releaseTimer);
      node.removeEventListener('wheel', takeOver);
      node.removeEventListener('touchstart', takeOver);
      node.removeEventListener('keydown', takeOver);
      node.removeEventListener('mouseenter', hold);
      node.removeEventListener('mouseleave', release);
      node.removeEventListener('focusin', hold);
      node.removeEventListener('focusout', release);
    };
  }, [ref]);

  return takeOverRef;
}

/* Oklar kendi konum durumunu tutmuyor; bir kart genisligi kadar kaydiriyor
   ve durmayi tarayiciya birakiyor. Durum tutulsaydi kullanici parmakla
   kaydirdiginda sayac gercekle uyusmaz hale gelirdi. */
function scrollCarousel(ref, direction, takeOverRef) {
  const node = ref.current;
  if (!node) return;
  /* Ok da bir mudahale: surus devrediliyor ve ayni zamanlayiciyla geri
     aliniyor, yoksa ilk tiktan sonra bant bir daha hic kendiliginden
     ilerlemezdi. */
  takeOverRef?.current?.();

  const card = node.firstElementChild;
  const step = card ? card.getBoundingClientRect().width + 16 : node.clientWidth * 0.8;
  node.scrollBy({ left: step * direction, behavior: 'smooth' });
}

function PartnerPortrait({ letter, tint, seed }) {

  return (
    <div className="v2-pcard__portrait" style={{ '--tint': tint }}>
      <div className="v2-ascii-mask" style={{ '--glyph': glyphMask(letter) }} aria-hidden="true">
        {/* Blok paneli her yonden asiyor; maskenin altinda karakter bitmesin
            diye. Tasan kisim zaten kirpiliyor. */}
        <pre className="v2-ascii">{asciiBlock(46, 52, seed)}</pre>
      </div>
      <span className="v2-pcard__glow" aria-hidden="true" />
      <span className="v2-pcard__foil" aria-hidden="true" />
    </div>
  );
}

/* Her projede ne yaptigimiz zaten references.js'teki `details` metninde
   kalin basliklar halinde duruyor ("*   **Shopify Entegrasyonu:** ...").
   Ayri bir liste tutmak yerine oradan cikariyoruz: tek kaynak kaliyor ve
   proje guncellenince kart kendiliginden dogru sayiyor. */

/* Yorumun yanindaki portrenin rengi ve dokusu markaya bagli, metni dile.
   Dort gercek proje, dordu de references.js'te; her yorum o projede
   fiilen yapilan ise dayaniyor. */
const QUOTE_ART = {
  'Emsa Otel': { letter: 'E', tint: '#9a3b32', seed: 11 },
  'Rönesans Edu': { letter: 'R', tint: '#5c9cd8', seed: 29 },
  'Pawsec Shop': { letter: 'P', tint: '#4f8f6a', seed: 53 },
  'Argüman Fabrikası': { letter: 'A', tint: '#c08a2e', seed: 71 },
};

function quotesFrom(copy) {
  return copy.quotes.map((quote) => ({ ...quote, ...QUOTE_ART[quote.brand] }));
}

/* Referans yorumlari — koyu bant.
   --------------------------------------------------------------------------
   Kendi kendine kayan bir bant. Kartlar iki kez basiliyor: bant sona gelince
   basa donuyor ve kopya sayesinde donus gorunmuyor.

   Portreler bitmap degil: markanin bas harfi maske, altinda ASCII dokusu.
   Elde fotograf olmayan bir marka icin stok gorsel koymaktansa kendi
   isaretini uretmek daha durust duruyor. */
export default function PartnersSection() {
  const c = useCopy();
  const quotes = quotesFrom(c.partners);
  const carousel = useRef(null);
  const carouselTakeOver = useDriftingCarousel(carousel);
  return (
    <section className="v2-section v2-section--dark v2-partners">
      <div className="v2-halo v2-halo--dark" aria-hidden="true" />
      <div className="v2-shell">
        <Reveal>
          <Item className="v2-partners__head">
            <h2 className="v2-title">
              <TwoTone lead={c.partners.lead} tail={c.partners.tail} />
            </h2>
            <div className="v2-carousel-nav">
              <button
                type="button"
                className="v2-arrow"
                onClick={() => scrollCarousel(carousel, -1, carouselTakeOver)}
                aria-label={c.partners.prev}
              >
                ←
              </button>
              <button
                type="button"
                className="v2-arrow"
                onClick={() => scrollCarousel(carousel, 1, carouselTakeOver)}
                aria-label={c.partners.next}
              >
                →
              </button>
            </div>
          </Item>
        </Reveal>
      </div>

      <div className="v2-shell">
        {/* Kartlar iki kez basiliyor: bant sona gelince basa donuyor ve
            kopya sayesinde donus gorunmuyor. Ikinci tur erisilebilirlik
            agacindan gizli, yoksa okuyucu her yorumu iki kez okuyor. */}
        <div className="v2-carousel" ref={carousel}>
          {[0, 1].map((pass) => (
            <React.Fragment key={pass}>
              {quotes.map((quote) => (
                <figure
                  className="v2-pcard"
                  key={`${pass}-${quote.brand}`}
                  aria-hidden={pass === 1 ? 'true' : undefined}
                >
                  <div className="v2-pcard__body">
                    <span className="v2-pcard__brand">{quote.brand}</span>
                    <blockquote className="v2-pcard__quote">“{quote.text}”</blockquote>
                    {/* Marka adi zaten ustte; alt satirda tekrarlamak
                        yerine konusanin kim oldugu duruyor. */}
                    <figcaption className="v2-pcard__by">
                      <strong>{quote.role}</strong>
                      <span className="v2-pcard__role">{quote.brand}</span>
                    </figcaption>
                  </div>
                  <PartnerPortrait letter={quote.letter} tint={quote.tint} seed={quote.seed} />
                </figure>
              ))}

              {/* Referans son slotu bos birakmiyor, teklife ceviriyor. */}
              <div
                className="v2-pcard v2-pcard--open"
                key={`${pass}-open`}
                aria-hidden={pass === 1 ? 'true' : undefined}
              >
                <div className="v2-pcard__body">
                  <span className="v2-pcard__brand">{c.partners.openBrand}</span>
                  <p className="v2-pcard__open-text">{c.partners.openText}</p>
                  <a className="v2-btn v2-btn--primary" href="#iletisim" tabIndex={pass === 1 ? -1 : undefined}>
                    {c.partners.openCta}
                  </a>
                </div>
                <PartnerPortrait letter="?" tint="#d0aa64" seed={47} />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
