import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroLaunch from './hero/HeroLaunch';
import { referencesData } from '../data/references';
import { Reveal, Item, TwoTone } from './primitives';
import V2Layout from './shell/V2Layout';
import { SERVICES as services } from './data/services';
import { STEPS as steps, FAQS as faqs } from './data/process';

/* Firlatma sahnesi.
   Onceki hali tek parca bir roket silueti idi ve cikartma gibi duruyordu:
   ne oturdugu bir zemin ne de olcegini veren baska bir nesne vardi.
   Referansin hamlesi roketin kendisi degil, yanindaki kule — kule olmadan
   sey kucuk mu buyuk mu belli olmuyor.

   Bitmap degil SVG: her olcekte net kaliyor ve renkleri tokenlardan
   aliyor. Govde tek dolgu degil, kademeli: panel cizgileri ve kademe
   halkalari uzaklik hissini veren tek sey. */
/* Kapanisin roketi: hero'daki havalanan baskinin aynisi. Once kodla
   cizilmis bir SVG vardi ve sayfadaki halftone baskilarin yanina
   oturmuyordu. */
function LaunchScene() {
  return (
    <img
      className="v2-rocket"
      src="/img/rocket-fly.webp"
      width="900"
      height="1592"
      decoding="async"
      loading="lazy"
      alt="Havalanan roket"
    />
  );
}

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

/* Cumle karakter karakter aydinlaniyor. Kaydirma konumu bolumun kendi
   yuksekligine gore 0-1 arasina indiriliyor; kac karakter yanacagini o oran
   belirliyor. Boylece cumle okundugu hizda "yaziliyor".

   Kaydirma dinleyicisi rAF'e sikistiriliyor: her scroll olayinda yuzlerce
   sinif degistirmek karesiz birakir. */
function ScriptedLine({ text }) {
  const ref = useRef(null);
  const [lit, setLit] = useState(0);
  const chars = React.useMemo(() => Array.from(text), [text]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    /* Azaltilmis hareket tercihinde hic olcum yapmiyoruz; karakterleri
       tam kontrasta getirmeyi CSS zaten ustleniyor. */
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      /* Cumle ekranin alt ucundan girip ust ucune dogru ilerlerken doluyor.
         Payda viewport + eleman yuksekligi, cunku ikisi de yola dahil. */
      const travel = window.innerHeight + rect.height;
      const done = (window.innerHeight - rect.top) / travel;
      const eased = Math.min(1, Math.max(0, (done - 0.18) / 0.46));
      setLit(Math.round(eased * chars.length));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    /* Ilk olcum de rAF uzerinden: efekt govdesinde dogrudan setState
       cagirmak zincirleme render tetikliyor. */
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [chars.length]);

  return (
    <h2 className="v2-script" ref={ref}>
      {/* Gorsel olarak parcalanmis metin ekran okuyucuda harf harf okunur;
          erisilebilir isim butun cumleyi tasiyor. */}
      <span className="v2-sr-only">{text}</span>
      <span aria-hidden="true">
        {chars.map((char, i) =>
          char === ' ' ? (
            <span key={i} className="v2-script__space">
              {' '}
            </span>
          ) : (
            <span key={i} className={`v2-script__char${i < lit ? ' is-lit' : ''}`}>
              {char}
            </span>
          )
        )}
      </span>
    </h2>
  );
}

/* Referansin kirmizi butonunun karsiligi. Marka "suerta" — sans; obje de
   madeni para.

   Uc perde: para durur ("dokunma"), cevrilir (yazi ya da tura, gercekten
   rastgele), bir daha basilinca yerini kartvizit alir. Sira onemli — once
   sansi gostermek, sonra elinden almak. Sadece kart gosterilseydi cumle
   sadece bir slogan olurdu; parayi bir kez atmis olmak onu bir sonuca
   ceviriyor. */
function LuckCoin() {
  /* Yarim tur cinsinden. Cift toplam tura, tek toplam yazi verir; her
     basista 9 ya da 10 yarim tur eklendigi icin sonuc gercekten rastgele
     ama para hep ayni yonde donuyor, geri sarma hissi olmuyor. */
  const [halfTurns, setHalfTurns] = useState(0);
  const [stage, setStage] = useState(0);
  const [spinning, setSpinning] = useState(false);
  /* Dokunulmadan once para kaydirmayla donuyor: bolum ekrandan gecerken
     kendi ekseninde yarim turdan biraz fazla aliyor. Duran bir daireyi
     kimse cevrilebilir sanmiyordu; donen bir sey ise elle durdurulmak
     istiyor. Donme miktari kaydirma konumundan geliyor, zamanlayicidan
     degil: okuyucu durursa para da duruyor. */
  const altar = useRef(null);
  const [drift, setDrift] = useState(0);

  useEffect(() => {
    const node = altar.current;
    if (!node) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const travel = window.innerHeight + rect.height;
      /* 0 = bolum ekranin altindan giriyor, 1 = ustunden cikiyor. */
      const ratio = (window.innerHeight - rect.top) / travel;
      setDrift(Math.min(1, Math.max(0, ratio)));
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
  }, []);

  const press = () => {
    if (stage === 0) {
      setHalfTurns((n) => n + 9 + Math.round(Math.random()));
      setStage(1);
      setSpinning(true);
      return;
    }
    setStage(2);
  };

  const side = halfTurns % 2 === 0 ? 'Tura' : 'Yazı';

  /* Dokunulmamis para hicbir sey yapmiyorsa dokunulmuyor. Arada bir kendi
     ekseninde sallaniyor: "bu cevrilebilir" demenin yaziyla degil hareketle
     soylenmis hali. */
  const idle = stage === 0 && !spinning;
  /* Kaydirmadan gelen donus yalnizca el degmemis parada; para bir kez
     atildiktan sonra sonucu okunabilir kalmali. */
  const driftTurn = idle ? drift * 220 - 40 : 0;

  if (stage === 2) {
    return (
      <div className="v2-altar">
        <div className="v2-halo v2-halo--altar" aria-hidden="true" />
        <div className="v2-luckcard" role="group" aria-label="suerta.co kartviziti">
          <p className="v2-luckcard__line">İşini şansa bırakma.</p>
          <p className="v2-luckcard__brand">
            suerta<span className="v2-luckcard__dot">.co</span>
          </p>
          <p className="v2-luckcard__tag">markanızın şansı</p>
          <a className="v2-btn v2-btn--primary v2-luckcard__cta" href="#iletisim">
            Görüşme ayarla
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`v2-altar${spinning ? ' is-spinning' : ''}`} ref={altar}>
      <div className="v2-halo v2-halo--altar" aria-hidden="true" />
      <span className="v2-altar__glow" aria-hidden="true" />

      <button
        type="button"
        className={`v2-coin${idle ? ' is-idle' : ''}`}
        onClick={press}
        onTransitionEnd={() => setSpinning(false)}
        style={
          idle
            ? { transform: `rotateY(${driftTurn}deg)` }
            : { transform: `rotateY(${halfTurns * 180}deg)` }
        }
        aria-label={stage === 0 ? 'Parayı çevir' : 'Bir daha bas'}
      >
        <span className="v2-coin__face" aria-hidden="true">
          <span className="v2-coin__mark">s</span>
        </span>
        <span className="v2-coin__face v2-coin__face--back" aria-hidden="true">
          <span className="v2-coin__mark v2-coin__mark--small">suerta.co</span>
        </span>
      </button>

      <span className="v2-pedestal" aria-hidden="true" />

      {/* Ok notu paraya baglar; yalniz metin, yaninda duran bir cumle olarak
          okunuyordu. */}
      <p className="v2-altar__note">
        <svg
          className="v2-altar__arrow"
          width="42"
          height="30"
          viewBox="0 0 42 30"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M40 28C31 26 23.5 21 17 13.5 13.4 9.4 9.8 5.2 6 2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M2.5 9.5L5 1.5l8 1.6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {stage === 0 ? 'bu paraya dokunma' : 'bir daha bas'}
      </p>

      <p className="v2-altar__result" aria-live="polite">
        {stage === 1 ? `${side} geldi.` : ''}
      </p>
    </div>
  );
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

/* Iletisim.
   Arkada sunucu yok, o yuzden form "gonderiliyor" numarasi yapmiyor:
   alanlari duzenli bir mesaja cevirip WhatsApp'ta aciyor. Sahte bir
   basari ekrani gostermektense mesajin nereye gittigini gormek daha
   durust ve pratikte daha hizli donuyor. */
const PROJECT_TYPES = [
  'Otel & rezervasyon',
  'Emlak & kiralama',
  'İnternet sitesi',
  'E-ticaret',
  'Yapay zekâ otomasyonu',
  'Görünürlük & büyüme',
  'Henüz emin değilim',
];

const WHATSAPP = '905060693525';

function ArrowGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 12L12 4M12 4H5.5M12 4v6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactSection() {
  const [type, setType] = useState(PROJECT_TYPES[0]);
  const [sent, setSent] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      'Merhaba suerta.co,',
      '',
      `Ad: ${data.get('ad') || '—'}`,
      `Marka: ${data.get('marka') || '—'}`,
      `İletişim: ${data.get('iletisim') || '—'}`,
      `Proje tipi: ${type}`,
      '',
      data.get('mesaj') || '',
    ];
    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`,
      '_blank',
      'noopener'
    );
    setSent(true);
  };

  return (
    <section className="v2-section v2-close v2-contact" id="iletisim">
      <div className="v2-halo" aria-hidden="true" />
      <div className="v2-shell">
        {/* Kapanis ve iletisim ayri iki bolumdu ve ikisi de ayni basligi
            tasiyip ayni seyi istiyordu. Tek perde halinde birlestiler:
            once sahne ve kontenjan, hemen ardindan doldurulacak alan. */}
        <Reveal className="v2-close__inner">
          <Item>
            <LaunchScene />
          </Item>
          <Item as="h2" className="v2-display">
            Ne inşa ettiğinizi anlatın
          </Item>
          <Item>
            <span className="v2-ticket">
              <span className="v2-ticket__num">2</span>
              <span className="v2-ticket__label">yer · bu ay</span>
            </span>
          </Item>
          <Item className="v2-status">
            <span className="v2-status__dot" aria-hidden="true" />
            Bu hafta yanıt süresi: birkaç saat
          </Item>
        </Reveal>

        <Reveal className="v2-contact__grid">
          <Item>
            {sent ? (
              <div className="v2-form">
                <div className="v2-form__sent">
                  <p className="v2-form__sent-title">WhatsApp’ta açıldı.</p>
                  <p className="v2-form__note">
                    Pencere açılmadıysa engellenmiş olabilir; aşağıdaki kanallardan
                    doğrudan yazabilirsiniz.
                  </p>
                  <button
                    type="button"
                    className="v2-btn v2-btn--ghost"
                    onClick={() => setSent(false)}
                  >
                    Formu tekrar aç
                  </button>
                </div>
              </div>
            ) : (
              <form className="v2-form" onSubmit={submit}>
                <div className="v2-form__row">
                  <label className="v2-field">
                    <span className="v2-field__label">Ad</span>
                    <input name="ad" type="text" placeholder="Adınız" required />
                  </label>
                  <label className="v2-field">
                    <span className="v2-field__label">Marka</span>
                    <input name="marka" type="text" placeholder="İşletme veya marka adı" />
                  </label>
                </div>

                <label className="v2-field">
                  <span className="v2-field__label">Telefon veya e-posta</span>
                  <input
                    name="iletisim"
                    type="text"
                    placeholder="Size nereden dönelim?"
                    required
                  />
                </label>

                <fieldset className="v2-field" style={{ border: 0, padding: 0, margin: 0 }}>
                  <legend className="v2-field__label">Proje tipi</legend>
                  <div className="v2-choices">
                    {PROJECT_TYPES.map((option) => (
                      <label className="v2-choice" key={option}>
                        <input
                          type="radio"
                          name="tip"
                          value={option}
                          checked={type === option}
                          onChange={() => setType(option)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <label className="v2-field">
                  <span className="v2-field__label">Mesaj</span>
                  <textarea
                    name="mesaj"
                    placeholder="Ne yapmak istediğinizi birkaç cümleyle anlatın."
                  />
                </label>

                <div className="v2-form__foot">
                  <p className="v2-form__note">
                    Form WhatsApp’ta açılır; hiçbir bilgi burada saklanmaz.
                  </p>
                  <button type="submit" className="v2-btn v2-btn--primary">
                    Gönder
                  </button>
                </div>
              </form>
            )}
          </Item>

          <Item className="v2-channels">
            <a
              className="v2-channel"
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="v2-channel__icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 2a8 8 0 110 16 8 8 0 01-4.2-1.2l-.4-.2-2.5.7.7-2.4-.3-.4A8 8 0 0112 4zm-3.3 4c-.2 0-.5 0-.7.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.2.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.2.2-1.3l-.6-.3-1.8-.9c-.3-.1-.5-.2-.7.1l-.7.9c-.1.2-.3.2-.5.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.1-.3 0-.4.1-.5l.5-.5.3-.5v-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4z" />
                </svg>
              </span>
              <span className="v2-channel__body">
                <span className="v2-channel__name">WhatsApp</span>
                <span className="v2-channel__meta">En hızlı yol — genelde birkaç saat</span>
              </span>
              <span className="v2-channel__go">
                <ArrowGlyph />
              </span>
            </a>

            <a className="v2-channel" href="mailto:suerta.info@gmail.com">
              <span className="v2-channel__icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2.5" y="5" width="19" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M3.5 7l8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </span>
              <span className="v2-channel__body">
                <span className="v2-channel__name">E-posta</span>
                <span className="v2-channel__meta">suerta.info@gmail.com</span>
              </span>
              <span className="v2-channel__go">
                <ArrowGlyph />
              </span>
            </a>

            <a
              className="v2-channel"
              href="https://instagram.com/suerta.co"
              target="_blank"
              rel="noreferrer"
            >
              <span className="v2-channel__icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
                </svg>
              </span>
              <span className="v2-channel__body">
                <span className="v2-channel__name">Instagram</span>
                <span className="v2-channel__meta">@suerta.co — işleri buradan da görebilirsiniz</span>
              </span>
              <span className="v2-channel__go">
                <ArrowGlyph />
              </span>
            </a>

            <div className="v2-reply">
              <span className="v2-reply__head">
                <span className="v2-status__dot" aria-hidden="true" />
                Yanıt süresi
              </span>
              <p className="v2-reply__text">
                Hafta içi mesajlara aynı gün, hafta sonu ertesi iş günü dönüyoruz. Üç
                kişilik bir ekibiz; size yazan da işi yapan kişi oluyor.
              </p>
            </div>
          </Item>
        </Reveal>
      </div>
    </section>
  );
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
function serviceLabels(project) {
  if (!project.details) return [];
  return [...project.details.matchAll(/\*\s+\*\*([^:*]+):/g)].map((m) => m[1].trim());
}

function WorkTile({ project, wide, result, film }) {
  const labels = serviceLabels(project);
  /* Filmlerin gidilecek bir adresi yok; baglantisi olmayani <a> yapmak
     tiklanabilirmis gibi gosterir ve klavye ile bos bir durak yaratir. */
  const Shell = project.link ? 'a' : 'div';
  const linkProps = project.link
    ? { href: project.link, target: '_blank', rel: 'noreferrer' }
    : {};

  return (
    <Shell
      className={`v2-tile${wide ? ' v2-tile--wide' : ''}${film ? ' v2-tile--film' : ''}${project.link ? '' : ' v2-tile--static'}`}
      {...linkProps}
    >
      {/* Musteri projesi bir televizyonun icinde: cerceve, kavisli cam,
          tarama cizgileri ve dugmeler. Referans bunu sahnelenmis fotografla
          yapiyor; bizde nesne cizilerek kuruluyor, ama okunusu ayni —
          site bir yerde, bir seyin icinde duruyor.

          Filmde cerceve yok. Cekimin kendisi is; onu bir cihazin icine
          koymak "bu bir ekran goruntusu" diyor ve goruntuyu kucultuyor. */}
      {film ? (
        <div className="v2-film">
          <video
            className="v2-film__media"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={project.poster}
          >
            <source src={project.video} type="video/mp4" />
          </video>

          <div className="v2-tv__overlay">
            <span className="v2-tv__overlay-label">Neler yaptık</span>
            <ul className="v2-tv__list">
              {labels.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
      <div className="v2-tv">
        <div className="v2-tv__screen">
          {project.video ? (
            <video
              className="v2-tv__media v2-tv__media--video"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={project.poster}
            >
              <source src={project.video} type="video/mp4" />
            </video>
          ) : (
            <img
              className="v2-tv__media"
              src={project.image}
              alt={`${project.name} projesinden ekran görüntüsü`}
              loading="lazy"
              decoding="async"
            />
          )}

          <span className="v2-tv__scan" aria-hidden="true" />
          <span className="v2-tv__glare" aria-hidden="true" />

          {/* Uzerine gelince ekrani o projede yaptigimiz isler kapliyor. */}
          <div className="v2-tv__overlay">
            <span className="v2-tv__overlay-label">Neler yaptık</span>
            <ul className="v2-tv__list">
              {labels.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
            {project.link && <span className="v2-tv__go">Siteyi gör ↗</span>}
          </div>
        </div>

        <div className="v2-tv__chin">
          <span className="v2-tv__brand">suerta.co</span>
          <span className="v2-tv__knobs" aria-hidden="true">
            <i />
            <i />
          </span>
        </div>
      </div>
      )}

      <div className="v2-tile__foot">
        <span className="v2-tile__name">
          {project.name}
          <VerifiedMark />
        </span>
        <span className="v2-tile__desc">{project.desc}</span>
        {result && <span className="v2-tile__result">{result}</span>}
      </div>
    </Shell>
  );
}

function Laurel({ side }) {
  return (
    <svg
      className={`v2-laurel${side === 'right' ? ' v2-laurel--right' : ''}`}
      width="26"
      height="46"
      viewBox="0 0 26 46"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22.4 2.6c-6.9 2-12 6.4-14.8 12.4C4.7 21.1 4.4 28 6.7 35.6l1.1 3.7 1.8-.6-1-3.6c-2.1-7-1.9-13.2.6-18.6C11.6 11.1 16.1 7.2 22.4 5.3V2.6z" />
      <path d="M18.4 8.6c-2.7.2-4.9 1.3-6.4 3.2 2 1.2 4.2 1.3 6.4.4V8.6zM14.9 15.6c-2.5.6-4.4 2-5.5 4.2 2.2.8 4.3.5 6.2-.9l-.7-3.3zM12.9 23.9c-2.3 1-3.9 2.7-4.6 5.1 2.3.4 4.3-.3 5.8-2l-1.2-3.1zM13.1 32.4c-2 1.4-3.2 3.3-3.4 5.8 2.3-.1 4.1-1.2 5.2-3.2l-1.8-2.6z" />
    </svg>
  );
}

/* Metin yazilir gibi belirir, ok cizilir gibi. Yolun gercek uzunlugunu
   olcup dasharray'e veriyoruz; sabit bir sayi verilirse farkli ekranlarda
   cizgi ya erken bitiyor ya da yarim kaliyor. */
function Annotation({ text }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const path = node.querySelector('path');
    if (path) node.style.setProperty('--len', path.getTotalLength().toFixed(1));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={`v2-anno${shown ? ' is-in' : ''}`} aria-hidden="true">
      <span className="v2-anno__text">{text}</span>
      <svg className="v2-anno__arrow" width="46" height="34" viewBox="0 0 46 34" fill="none">
        <path d="M2 3c8.5 1.2 15.6 5.2 21.3 12 3.2 3.8 6.4 8.2 9.6 13.2" />
        <path d="M26.4 28.8l7 1 1.4-7" />
      </svg>
    </span>
  );
}

/* Hero sahnesi.
   Arkada rampadaki roket, onunde alti alanin kartlari. Kart yigini sayfa
   kaydikca yatayda kayiyor: sabit dursaydi altindaki roketle iliskisi
   olmayan, uzerine yapistirilmis bir kutu gibi dururdu. Kayma sayfa
   hareketine bagli, kendi kendine donen bir karusel degil — kullanici
   durdugunda o da duruyor.

   Kartlar ayrica belirli araliklarla degisiyor, cunku alti alanin hepsini
   ayni anda gostermenin yolu yok ve tek alani gostermek digerlerini yokmus
   gibi yapiyor. */
function VerifiedMark() {
  return (
    <svg
      className="v2-verified"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l2.4 1.8 3-.2.9 2.9 2.4 1.8-1.2 2.7 1.2 2.7-2.4 1.8-.9 2.9-3-.2L12 22l-2.4-1.8-3 .2-.9-2.9L3.3 15.7l1.2-2.7-1.2-2.7 2.4-1.8.9-2.9 3 .2L12 2zm-1 13.3l5.2-5.2-1.4-1.4-3.8 3.8-1.8-1.8L7.8 12l3.2 3.3z" />
    </svg>
  );
}

/* Uc sayi, uc ayri musteri ve uc ayri is turu: rezervasyon, arsiv
   yazilimi ve teslim edilen proje sayisi. Onceden ucu de tek bir otel
   projesinin etrafinda donuyordu ve sayfa "otel yazilimi satan bir yer"
   gibi okunuyordu. Sayilar referanslardaki musteri yorumlarindan
   geliyor. */
const kpis = [
  { unit: '%', value: '40', label: 'Emsa Otel’de doğrudan rezervasyon artışı' },
  { value: '1.000+', label: 'Argüman Fabrikası’nda aranabilir arşiv kaydı' },
  {
    value: String(referencesData.length),
    label: 'Farklı sektörde teslim edilen proje',
    laurel: true,
  },
];

/* Her tugla kendi sonucunu tasiyor. Tek projenin sonucu one cikarilinca
   digerleri "isim listesi" gibi kaliyordu; oysa dordunun de olculebilir
   bir ciktisi var. Anahtar references.js'teki proje id'si. */
const WORK_RESULTS = {
  1: 'Doğrudan rezervasyon %40 arttı',
  2: 'Kontenjan takibi 7/24 otomatik',
  3: 'Sıfırdan e-ticaret, tek akışta ödeme',
  4: '1.000+ konu aranabilir arşive dönüştü',
};

/* Video isleri.
   Bunlar musteri sitesi degil, cektigimiz tanitim filmleri — hizmet
   listesinde zaten fotograf ve icerik uretimi var. Site ekran goruntusuymus
   gibi sunmak yaniltici olurdu; kendi girdileri olarak duruyorlar ve
   `details` alani ayni kalibi kullandigi icin hover listesi de otomatik
   dogru cikiyor. */
const mediaWorks = [
  {
    id: 'film-kiralik',
    name: 'Kiralık Daire Tanıtımı',
    desc: 'Roma · Tanıtım Filmi & Görsel İçerik',
    video: '/video/reel.mp4',
    poster: '/video/reel-poster.jpg',
    details: `
*   **Mekân Çekimi:** Daire ve çevresi misafirin göreceği sırayla çekildi.
*   **Kurgu ve Renk:** Listing sayfasında döngüde oynayacak şekilde kurgulandı.
*   **Web İçin Optimizasyon:** Sayfayı yavaşlatmayacak boyuta indirildi.
*   **Listing Entegrasyonu:** Rezervasyon sayfasına gömüldü.
    `,
  },
  {
    id: 'film-araz',
    name: 'Araz Wooden Concept',
    desc: 'Adrasan · Drone Çekimi & Tesis Tanıtımı',
    video: '/video/showcase.mp4',
    poster: '/video/showcase-poster.jpg',
    details: `
*   **Drone Çekimi:** Tesisin bütünü ve konumu havadan gösterildi.
*   **Ünite Çekimleri:** Her bungalov tipi ayrı ayrı kaydedildi.
*   **Kurgu:** Ana sayfada sessiz döngü için hazırlandı.
*   **Web İçin Optimizasyon:** Mobilde de akıcı oynayacak şekilde sıkıştırıldı.
    `,
  },
];

/* One cikan is: sonucu en net olcülen proje. */
const FEATURED_ID = 1;

/* Yerlesim uc satir:
   1. Dort musteri projesi, esit dar tugla. Emsa en sona alindi; one cikan
      genis tugla oldugu surece Arguman Fabrikasi'ndan uzaktaydi, artik
      yaninda duruyor.
   2. Iki tanitim filmi, yarim genislikte. Bunlar site ekran goruntusu
      degil cekim; televizyon cercevesi goruntuyu kucultup uzerine cam,
      tarama cizgisi ve dugme koyuyordu. Film kendi ekraninda duruyor.
   3. Sayi seridi tam genislikte. */
function buildWorkLayout() {
  const featured = referencesData.find((p) => p.id === FEATURED_ID);
  const clients = [
    ...referencesData.filter((p) => p !== featured),
    ...(featured ? [featured] : []),
  ];

  return { clients, films: mediaWorks, featured };
}

/* Ne yaptigimiz. Etiketler somut teslimat, sifat degil.

   Emlak, gunluk kiralik ve Airbnb ayri hatlar degil: musteri acisindan
   ucu de "mulkumu doldurmak" isi. Ayri ayri yazmak uc farkli hizmet
   satiyormus gibi gosteriyordu; tek baslikta toplandi. */
/* Baslik sayiyi elle tasiyordu ve hizmet eklenince yalan soyluyordu; artik
   diziden turuyor. */
const NUMBER_WORDS = ['sıfır', 'tek', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz'];

/* Dort gercek proje, dordu de references.js'te. Her yorum o projede fiilen
   yapilan ise dayaniyor — genel ovgu cumlesi yazmak yerine teslim edilen
   seyi soyletmek hem daha inandirici hem de dogru. */
const quotes = [
  {
    brand: 'Emsa Otel',
    letter: 'E',
    tint: '#9a3b32',
    seed: 11,
    text:
      'Otelimizin dijital dönüşümünde suerta.co ile çalışmak verdiğimiz en doğru karardı. Komisyonsuz rezervasyon sistemi sayesinde doğrudan satışlarımız %40 arttı.',
    role: 'Yönetim Kurulu',
  },
  {
    brand: 'Rönesans Edu',
    letter: 'R',
    tint: '#5c9cd8',
    seed: 29,
    text:
      'Sınav kontenjanı takibi elle imkânsızdı. Kurdukları Telegram botu kontenjan açıldığı an haber veriyor; öğrencilerimiz artık fırsat kaçırmıyor.',
    role: 'Kurucu Ortak',
  },
  {
    brand: 'Pawsec Shop',
    letter: 'P',
    tint: '#4f8f6a',
    seed: 53,
    text:
      'Sıfırdan e-ticaret kurduk. Sepetten ödemeye kadar tek akışta ilerliyor ve ürünlerimi kendim güncelliyorum — her değişiklik için kimseye dönmem gerekmiyor.',
    role: 'Marka Sahibi',
  },
  {
    brand: 'Argüman Fabrikası',
    letter: 'A',
    tint: '#c08a2e',
    seed: 71,
    text:
      'Binden fazla münazara konusunu aranabilir bir arşive çevirdiler. Reklam ve SEO tarafını da yürüttükleri için içerik gerçekten karşılığını buldu.',
    role: 'Kurucu',
  },
];

export default function HomeV2() {
  const work = buildWorkLayout();
  const carousel = useRef(null);
  const carouselTakeOver = useDriftingCarousel(carousel);

  return (
    <V2Layout>
      <HeroLaunch />

      {/* Secili isler ----------------------------------------------------- */}
      <section className="v2-section" id="isler">
        <div className="v2-shell">
          <Reveal>
            <Item className="v2-section__head">
              <h2 className="v2-title">
                <TwoTone lead="Seçili" tail="işler." />
              </h2>
            </Item>
          </Reveal>

          <Reveal className="v2-work">
            {work.clients.map((project) => (
              <Item key={project.id} className="v2-work__brick">
                <WorkTile
                  project={project}
                  result={WORK_RESULTS[project.id]}
                />
              </Item>
            ))}

            {work.films.map((film) => (
              <Item key={film.id} className="v2-work__film">
                <WorkTile project={film} film />
              </Item>
            ))}

            <Item className="v2-work__stats">
              <div className="v2-kpi">
                {kpis.map((kpi) => (
                  <div className="v2-kpi__row" key={kpi.label}>
                    <span className="v2-kpi__value">
                      {kpi.laurel && <Laurel />}
                      <span>
                        {kpi.unit && <span className="v2-kpi__unit">{kpi.unit}</span>}
                        {kpi.value}
                      </span>
                      {kpi.laurel && <Laurel side="right" />}
                    </span>
                    <span className="v2-kpi__label">{kpi.label}</span>
                  </div>
                ))}
              </div>
            </Item>
          </Reveal>
        </div>
      </section>

      {/* Ne yapiyoruz ----------------------------------------------------- */}
      <section className="v2-section" id="hizmetler">
        <div className="v2-shell">
          <Reveal>
            <Item className="v2-section__head">
              <h2 className="v2-title">
                <TwoTone
                  lead={`${NUMBER_WORDS[services.length] ?? services.length} alanda`}
                  tail="çalışıyoruz."
                />
              </h2>
              <Annotation text="hepsinde aynı mesele: aracıyı aradan çıkarmak" />
            </Item>
          </Reveal>

          <Reveal className="v2-list">
            {services.map((service, i) => (
              <Item key={service.title} className="v2-row">
                <span className="v2-row__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="v2-row__title">{service.title}</h3>
                <div className="v2-row__body">
                  <p className="v2-row__desc">{service.desc}</p>
                  <div className="v2-tags">
                    {service.tags.map((tag) => (
                      <span key={tag} className="v2-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Item>
            ))}
          </Reveal>

          {/* Alanlarin ayrintisi kendi sayfasinda: burada alti satir, orada
              kime uygun oldugu ve ne teslim edildigi. */}
          <Reveal className="v2-list__more">
            <Item>
              <Link className="v2-btn v2-btn--ghost" to="/v2/hizmetlerimiz">
                Hizmetlerin ayrıntısı
              </Link>
            </Item>
          </Reveal>
        </div>
      </section>

      {/* Surec ------------------------------------------------------------ */}
      <section className="v2-section" id="surec">
        <div className="v2-shell">
          <Reveal>
            <Item className="v2-section__head">
              <h2 className="v2-title">
                <TwoTone lead="İlk görüşmeden" tail="yayına kadar." />
              </h2>
            </Item>
          </Reveal>

          <Reveal className="v2-steps">
            {steps.map((step) => (
              <Item key={step.num} className="v2-step">
                <span className="v2-step__num">{step.num}</span>
                <span className="v2-step__title">{step.title}</span>
                <span className="v2-step__desc">{step.desc}</span>
              </Item>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Referans yorumlari (koyu) ---------------------------------------- */}
      <section className="v2-section v2-section--dark v2-partners">
        <div className="v2-halo v2-halo--dark" aria-hidden="true" />
        <div className="v2-shell">
          <Reveal>
            <Item className="v2-partners__head">
              <h2 className="v2-title">
                <TwoTone lead="Çalıştığımız" tail="markalar ne diyor." />
              </h2>
              <div className="v2-carousel-nav">
                <button
                  type="button"
                  className="v2-arrow"
                  onClick={() => scrollCarousel(carousel, -1, carouselTakeOver)}
                  aria-label="Önceki referans"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="v2-arrow"
                  onClick={() => scrollCarousel(carousel, 1, carouselTakeOver)}
                  aria-label="Sonraki referans"
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
                    <span className="v2-pcard__brand">Ayrılmış</span>
                    <p className="v2-pcard__open-text">
                      Bu alan sizinle kuracağımız iş için ayrıldı.
                    </p>
                    <a className="v2-btn v2-btn--primary" href="#iletisim" tabIndex={pass === 1 ? -1 : undefined}>
                      Görüşme ayarla
                    </a>
                  </div>
                  <PartnerPortrait letter="?" tint="#d0aa64" seed={47} />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Biz kimiz -------------------------------------------------------- */}
      <section className="v2-section v2-manifesto" id="hakkimizda">
        <div className="v2-shell">
          <div className="v2-manifesto__grid">
            <ScriptedLine text="Biz suerta.co'yuz. Otel, kiralama, eğitim ve e-ticaret markalarına ziyaretçiyi müşteriye çeviren siteler kuruyoruz." />
            <LuckCoin />
          </div>
        </div>
      </section>

      {/* Kapanis + iletisim ------------------------------------------------ */}
      <ContactSection />

      {/* SSS -------------------------------------------------------------- */}
      <section className="v2-section" id="sss">
        <div className="v2-shell">
          <Reveal>
            <Item className="v2-section__head">
              <h2 className="v2-title">
                <TwoTone lead="Görüşmeden önce" tail="merak edilenler." />
              </h2>
            </Item>
          </Reveal>

          <Reveal className="v2-faq">
            {faqs.map((faq) => (
              <Item key={faq.q} as="details" className="v2-faq__item">
                <summary className="v2-faq__q">
                  {faq.q}
                  <span className="v2-faq__sign" aria-hidden="true" />
                </summary>
                <p className="v2-faq__a">{faq.a}</p>
              </Item>
            ))}
          </Reveal>
        </div>
      </section>

    </V2Layout>
  );
}
