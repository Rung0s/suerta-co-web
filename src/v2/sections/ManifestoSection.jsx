import React, { useEffect, useRef, useState } from 'react';
import { useCopy } from '../i18n';

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
  const c = useCopy().manifesto;
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

  const side = halfTurns % 2 === 0 ? c.heads : c.tails;

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
          <p className="v2-luckcard__line">{c.cardLine}</p>
          <p className="v2-luckcard__brand">
            suerta<span className="v2-luckcard__dot">.co</span>
          </p>
          <p className="v2-luckcard__tag">{c.cardTag}</p>
          <a className="v2-btn v2-btn--primary v2-luckcard__cta" href="#iletisim">
            {c.cardCta}
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
        aria-label={stage === 0 ? c.coinFlip : c.coinAgain}
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
        {stage === 0 ? c.noteIdle : c.noteAgain}
      </p>

      <p className="v2-altar__result" aria-live="polite">
        {stage === 1 ? `${side} ${c.resultSuffix}` : ''}
      </p>
    </div>
  );
}

/* Biz kimiz.
   --------------------------------------------------------------------------
   Iki parca: kaydirmayla harf harf aydinlanan cumle ve cevrilebilen madeni
   para. Ikisi de yalnizca burada kullaniliyor. */
export default function ManifestoSection() {
  const c = useCopy();
  return (
    <section className="v2-section v2-manifesto" id="hakkimizda">
      <div className="v2-shell">
        <div className="v2-manifesto__grid">
          <ScriptedLine text={c.manifesto.line} />
          <LuckCoin />
        </div>
      </div>
    </section>
  );
}
