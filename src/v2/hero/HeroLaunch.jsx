import React from 'react';
import { Link } from 'react-router-dom';
import { HERO_CARDS } from './card-list';
import { useCopy, useLang } from '../i18n';
import { pathFor } from '../i18n/paths';

/* ==========================================================================
   Firlatma sahnesi + alan kartlari
   --------------------------------------------------------------------------
   Once sabitlenen bir sahneydi: sayfa bolumun ustune geldiginde sahne
   ekrana yapisiyor, asagi kaydirmak sayfayi degil sahneyi ilerletiyordu.
   Alti kart, kart basina bir ekran yol, toplam 700vh.

   Kaldirildi. Sebep olcum: ilk musteri isine ulasmak yedi ekran suruyordu
   ve o yedi ekranin sonunda ziyaretcinin ogrendigi sey — "alti alanda
   calisiyoruz" — ayni sayfada iki kez daha, once metin listesinde sonra
   /hizmetlerimiz'de tekrar ediliyordu. Ustelik sahne tek seferde tek kart
   gosterdigi icin iki alani karsilastirmak icin geri kaydirmak gerekiyordu.

   Simdi alti kart tek ekranda, uc sutunlu bir izgarada duruyor. Kartlarin
   kendisi degismedi: her biri hizmeti adlandirmak yerine sonucunu gosteren
   cizilmis bir arayuz. Degisen tek sey, hepsinin ayni anda gorunmesi.

   Roket sahnesi kaldi ama artik kaydirmaya bagli degil: rampadaki roket
   duruyor. Havalanan ikinci baski (rocket-fly) kaldirildi — sahneyi
   ilerleten bir sey kalmayinca o baskinin gorunecegi an da kalmadi ve
   sayfada opaklik sifirla duran bir gorsel olarak asili kaliyordu.
   ========================================================================== */

export default function HeroLaunch() {
  const c = useCopy();
  const { lang } = useLang();

  return (
    <header className="v2-launch" id="top">
      <div className="v2-launch__stage">
        <div className="v2-halo" aria-hidden="true" />
        <div className="v2-castlight" aria-hidden="true" />

        <div className="v2-shell v2-launch__inner">
          <div className="v2-launch__copy">
            {/* Marka adi hero'da yaziyla geciyor: arama motoru da ziyaretci de
                sayfanin ilk ekraninda kimin konustugunu gormeli. */}
            <span className="v2-hero__brand">
              suerta<span className="v2-hero__brand-dot">.co</span>
            </span>
            <h1 className="v2-display">
              <span className="v2-tone-lead">{c.hero.lead}</span> {c.hero.tail}
            </h1>
            <div className="v2-hero__actions">
              <a className="v2-btn v2-btn--primary" href="#iletisim">
                {c.hero.ctaPrimary}
              </a>
              <a className="v2-btn v2-btn--ghost" href="#isler">
                {c.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </div>

        {/* Kalabalik sahnenin zemini: roketin olcegini veren ve bakisin
            nereye dondugunu soyleyen sey. */}
        <div className="v2-launch__scene">
          <img
            className="v2-launch__crowd"
            src="/img/crowd.webp"
            srcSet="/img/crowd-800.webp 800w, /img/crowd-1200.webp 1200w, /img/crowd.webp 2400w"
            sizes="100vw"
            alt=""
            aria-hidden="true"
            width="2400"
            height="455"
            decoding="async"
          />

          <img
            className="v2-launch__pad"
            src="/img/rocket-pad.webp"
            srcSet="/img/rocket-pad-360.webp 360w, /img/rocket-pad-600.webp 600w, /img/rocket-pad.webp 900w"
            sizes="(max-width: 900px) 190px, 380px"
            alt=""
            aria-hidden="true"
            width="900"
            height="1739"
            decoding="async"
          />
        </div>
      </div>

      {/* Alti alan, tek bakista.
          Baslik her kartin uzerinde: kart kendi basina hangi isten
          bahsettigini soylemekte zayif kaliyor. Sahne sirasinda tek bir
          baslik sirada olan karti adlandiriyordu; izgarada her kart kendi
          adini tasimak zorunda. */}
      <div className="v2-shell">
        <ul className="v2-launch__grid">
          {HERO_CARDS.map(({ key, Card, post }) => (
            <li className="v2-launch__cell" key={key}>
              <span className="v2-launch__cell-area">{c.cards[key].area}</span>
              {/* Kart bir baglanti: gordugun ekrani anlatan yaziya goturuyor.
                  Cerceve kartin kendisinde oldugu icin baglanti gorunmez
                  duruyor; altindaki satir nereye gidildigini yaziyla
                  soyluyor. */}
              <Link className="v2-launch__card-link" to={pathFor('blogItem', lang, { id: post })}>
                <Card />
                <span className="v2-launch__read">
                  {c.cards[key].read}
                  <span className="v2-launch__read-arrow" aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
