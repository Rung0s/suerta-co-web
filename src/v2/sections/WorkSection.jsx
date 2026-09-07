import { Link } from 'react-router-dom';
import LazyVideo from '../media/LazyVideo';
import { shotSrcSet } from '../media/shot';
import { referencesData } from '../../data/references';
import { projectsFor } from '../data/content';
import { Reveal, Item, TwoTone } from '../primitives';
import { useCopy, useLang } from '../i18n';
import { pathFor } from '../i18n/paths';

function serviceLabels(project) {
  if (!project.details) return [];
  return [...project.details.matchAll(/\*\s+\*\*([^:*]+):/g)].map((m) => m[1].trim());
}

function WorkTile({ project, wide, result, film, copy, href }) {
  /* Film tuglalarinin "neler yaptik" listesi dil dosyasindan, musteri
     projelerininki proje metninden turuyor. */
  const labels = project.did ?? serviceLabels(project);
  /* Tugla musterinin sitesine degil, o isin kendi sayfasina gidiyor:
     disari cikan baglanti orada duruyor. Once her tugla dogrudan disari
     aciliyordu ve ziyaretci ne yaptigimizi okumadan siteden cikiyordu.

     Filmlerin gidilecek bir adresi yok; baglantisi olmayani <a> yapmak
     tiklanabilirmis gibi gosterir ve klavye ile bos bir durak yaratir. */
  const Shell = href ? Link : 'div';
  const linkProps = href ? { to: href } : {};


  return (
    <Shell
      className={`v2-tile${wide ? ' v2-tile--wide' : ''}${film ? ' v2-tile--film' : ''}${href ? '' : ' v2-tile--static'}`}
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
          <LazyVideo
            className="v2-film__media"
            src={project.video}
            poster={project.poster}
            alt={project.name}
          />

          <div className="v2-tv__overlay">
            <span className="v2-tv__overlay-label">{copy.didLabel}</span>
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
            <LazyVideo
              className="v2-tv__media v2-tv__media--video"
              src={project.video}
              poster={project.poster}
              alt={project.name}
            />
          ) : (
            <img
              className="v2-tv__media"
              src={project.image}
              srcSet={shotSrcSet(project.image)}
              sizes="(max-width: 900px) 92vw, 34vw"
              alt={copy.shot(project.name)}
              loading="lazy"
              decoding="async"
            />
          )}

          <span className="v2-tv__scan" aria-hidden="true" />
          <span className="v2-tv__glare" aria-hidden="true" />

          {/* Uzerine gelince ekrani o projede yaptigimiz isler kapliyor. */}
          <div className="v2-tv__overlay">
            <span className="v2-tv__overlay-label">{copy.didLabel}</span>
            <ul className="v2-tv__list">
              {labels.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
            {href && <span className="v2-tv__go">{copy.detail}</span>}
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

/* Sayfadaki her sayi, her yorum ve her film basligi dil dosyasindan
   geliyor; burada yalnizca hangi verinin nereye girdigi duruyor.

   Uc sayi, uc ayri musteri ve uc ayri is turu: rezervasyon, arsiv
   yazilimi ve teslim edilen proje sayisi. Onceden ucu de tek bir otel
   projesinin etrafinda donuyordu ve sayfa "otel yazilimi satan bir yer"
   gibi okunuyordu.

   Proje sayisi elle veriliyor: sitede dort referans gosteriliyor ama
   teslim edilen is sayisi daha fazla — sayiyi referans listesinden
   turetmek gercegi oldugundan kucuk gosteriyordu. */
function kpisFrom(copy) {
  return copy.kpis.map((kpi) => ({
    ...kpi,
    value: kpi.value ?? String(referencesData.length),
  }));
}

/* Video isleri: musteri sitesi degil, cektigimiz tanitim filmleri.
   Gorsel ve poster sabit, baslik ve "neler yaptik" listesi dile bagli. */
const FILM_MEDIA = {
  'film-kiralik': { video: '/video/reel.mp4', poster: '/video/reel-poster.webp' },
  'film-araz': { video: '/video/showcase.mp4', poster: '/video/showcase-poster.webp' },
};

function filmsFrom(copy) {
  return copy.films.map((film) => ({ ...film, ...FILM_MEDIA[film.id] }));
}

/* One cikan is: sonucu en net olculen proje. */
const FEATURED_ID = 1;

/* Yerlesim uc satir:
   1. Dort musteri projesi, esit dar tugla.
   2. Iki tanitim filmi, yarim genislikte. Bunlar site ekran goruntusu
      degil cekim; televizyon cercevesi goruntuyu kucultup uzerine cam,
      tarama cizgisi ve dugme koyuyordu. Film kendi ekraninda duruyor.
   3. Sayi seridi tam genislikte. */
function buildWorkLayout(copy, lang) {
  const projects = projectsFor(lang);
  const featured = projects.find((p) => p.id === FEATURED_ID);
  const clients = [
    ...projects.filter((p) => p !== featured),
    ...(featured ? [featured] : []),
  ];

  return { clients, films: filmsFrom(copy), featured };
}

/* Secili isler.
   --------------------------------------------------------------------------
   Anasayfanin ilk kanit bolumu: dort musteri isi, iki tanitim filmi ve
   altinda sayilar. Kartin kendisi (WorkTile) burada duruyor cunku baska
   hicbir yerde kullanilmiyor; is sayfasinin kendi duzeni var.

   Verinin sirasi ve hangi isin one cikacagi buradaki buildWorkLayout'ta
   kararlastiriliyor, ceviri dosyasinda degil: sira tasarim karari. */
export default function WorkSection() {
  const c = useCopy();
  const { lang } = useLang();
  const work = buildWorkLayout(c.work, lang);
  const kpis = kpisFrom(c.work);
  return (
    <section className="v2-section" id="isler">
      <div className="v2-shell">
        <Reveal>
          <Item className="v2-section__head">
            <h2 className="v2-title">
              <TwoTone lead={c.work.lead} tail={c.work.tail} />
            </h2>
          </Item>
        </Reveal>

        <Reveal className="v2-work">
          {work.clients.map((project) => (
            <Item key={project.id} className="v2-work__brick">
              <WorkTile
                project={project}
                result={c.work.results[project.id]}
                copy={c.work}
                href={pathFor('workItem', lang, { id: project.id })}
              />
            </Item>
          ))}

          {work.films.map((film) => (
            <Item key={film.id} className="v2-work__film">
              <WorkTile project={film} film copy={c.work} />
            </Item>
          ))}

          {/* Anasayfa dort isi gosteriyor; hepsi ve ayrintilari kendi
              sayfasinda. */}
          <Item className="v2-work__more">
            <Link className="v2-btn v2-btn--ghost" to={pathFor('work', lang)}>
              {c.work.all}
            </Link>
          </Item>

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
  );
}
