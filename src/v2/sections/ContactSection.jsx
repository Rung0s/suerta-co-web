import React, { useState } from 'react';
import { Reveal, Item } from '../primitives';
import { useCopy } from '../i18n';
import { track } from '../analytics';

/* Kapanisin roketi: hero'daki havalanan baskinin aynisi. Once kodla
   cizilmis bir SVG vardi ve sayfadaki halftone baskilarin yanina
   oturmuyordu. */
function LaunchScene() {
  return (
    <img
      className="v2-rocket"
      src="/img/rocket-fly.webp"
      srcSet="/img/rocket-fly-360.webp 360w, /img/rocket-fly-600.webp 600w, /img/rocket-fly.webp 900w"
      sizes="(max-width: 900px) 190px, 380px"
      width="900"
      height="1592"
      decoding="async"
      loading="lazy"
      alt="Havalanan roket"
    />
  );
}

/* Iletisim.
   --------------------------------------------------------------------------
   Form artik gercekten gonderiliyor: alanlar Formspree'ye POST ediliyor ve
   mesaj e-postaya dusuyor. Onceki hali alanlari bir metne cevirip WhatsApp'i
   aciyordu; o yol durusttu ama iz birakmiyordu — pencere engellenirse ya da
   ziyaretci masaustunde WhatsApp Web'e girmek istemezse talep kayboluyordu ve
   geriye sayilabilecek hicbir sey kalmiyordu.

   WhatsApp kaybolmadi, ikinci yol olarak duruyor: hem hata ekraninda hem de
   yandaki kanal listesinde. Anahtar tanimli degilse (VITE_FORMSPREE_ID bos)
   dosya eski davranisina donuyor, yani yerelde ve anahtarsiz bir fork'ta form
   yine calisiyor. */
const WHATSAPP = '905060693525';
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;
const FORMSPREE_URL = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : null;

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

/* Alanlari WhatsApp mesajina ceviren yardimci: hem anahtar yokken ana yol,
   hem de gonderim hata verdiginde cikis kapisi. */
function whatsappLink(c, data, type) {
  const lines = [
    c.greeting,
    '',
    `${c.fieldName}: ${data.get('ad') || '—'}`,
    `${c.fieldBrand}: ${data.get('marka') || '—'}`,
    `${c.fieldReach}: ${data.get('iletisim') || '—'}`,
    `${c.fieldType}: ${type}`,
    '',
    data.get('mesaj') || '',
  ];
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`;
}

/* `as`: bolum anasayfada bir bolum (h2), kendi sayfasinda ise sayfanin
   kendisi (h1). Sayfa basligi kaldirilinca /iletisim h1'siz kalmisti. */
export default function ContactSection({ as = 'h2' }) {
  const c = useCopy().contact;
  const [type, setType] = useState(c.types[0]);
  /* Bes durum: 'idle' | 'sending' | 'sent' | 'wa' | 'error'.
     'wa' ayri duruyor cunku metni farkli: mesaj bize ulasmadi, yalnizca
     WhatsApp'ta acildi ve gondermesi hala ziyaretcide. */
  const [state, setState] = useState('idle');
  const [fallback, setFallback] = useState(null);

  const submit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    /* Bal kupu: gorunmez alan. Insan doldurmaz, basit botlar doldurur.
       Doluysa gonderiyormus gibi yapip birakiyoruz — bota "yakalandin"
       demek, bir daha denemesini sagliyor.

       Adi `_gotcha`: Formspree bu adi taniyor ve dolu gelen gonderiyi kendi
       tarafinda da eliyor. Iki katman, tek alan. */
    if (data.get('_gotcha')) {
      setState('sent');
      return;
    }

    const wa = whatsappLink(c, data, type);
    setFallback(wa);

    if (!FORMSPREE_URL) {
      window.open(wa, '_blank', 'noopener');
      setState('wa');
      track('contact_whatsapp', { tip: type });
      return;
    }

    setState('sending');
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!response.ok) throw new Error(String(response.status));
      setState('sent');
      track('contact_submit', { tip: type });
    } catch {
      setState('error');
      track('contact_error', { tip: type });
    }
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
          <Item as={as} className="v2-display">
            {c.heading}
          </Item>
          {/* Once burada "bu ay 2 yer" yazan yirtik bir bilet duruyordu.
              Kontenjan numarasi baski yapiyor ve dogrulanamiyor; yerine
              isin neden yapildigini soyleyen duz bir cumle var. */}
          <Item as="p" className="v2-close__line">
            {c.vision}
          </Item>
          <Item className="v2-status">
            <span className="v2-status__dot" aria-hidden="true" />
            {c.status}
          </Item>
        </Reveal>

        <Reveal className="v2-contact__grid">
          <Item>
            {state === 'sent' || state === 'wa' || state === 'error' ? (
              <div className="v2-form">
                {/* Durum degistiginde ekran okuyucu da haber alsin: gonderim
                    tamamlandiginda odak formda kaliyor ve gorsel geri bildirim
                    tek basina yetmiyor. */}
                <div className="v2-form__sent" role="status" aria-live="polite">
                  <p className="v2-form__sent-title">
                    {state === 'error'
                      ? c.errorTitle
                      : state === 'wa'
                        ? c.sentTitle
                        : c.sentTitleMail}
                  </p>
                  <p className="v2-form__note">
                    {state === 'error'
                      ? c.errorNote
                      : state === 'wa'
                        ? c.sentNote
                        : c.sentNoteMail}
                  </p>
                  <div className="v2-form__after">
                    <button
                      type="button"
                      className="v2-btn v2-btn--ghost"
                      onClick={() => setState('idle')}
                    >
                      {state === 'error' ? c.retry : c.reopen}
                    </button>
                    {/* Hatada mesaj zaten yazilmis durumda; ziyaretciyi bastan
                        yazmaya zorlamak yerine ayni metni WhatsApp'a tasiyan
                        bir baglanti veriyoruz. */}
                    {state === 'error' && fallback ? (
                      <a
                        className="v2-btn v2-btn--primary"
                        href={fallback}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track('contact_whatsapp_fallback')}
                      >
                        {c.whatsappAlt}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : (
              <form className="v2-form" onSubmit={submit}>
                <div className="v2-form__row">
                  <label className="v2-field">
                    <span className="v2-field__label">{c.nameLabel}</span>
                    <input name="ad" type="text" placeholder={c.namePlaceholder} required />
                  </label>
                  <label className="v2-field">
                    <span className="v2-field__label">{c.brandLabel}</span>
                    <input name="marka" type="text" placeholder={c.brandPlaceholder} />
                  </label>
                </div>

                <label className="v2-field">
                  <span className="v2-field__label">{c.reachLabel}</span>
                  <input
                    name="iletisim"
                    type="text"
                    placeholder={c.reachPlaceholder}
                    required
                  />
                </label>

                <fieldset className="v2-field" style={{ border: 0, padding: 0, margin: 0 }}>
                  <legend className="v2-field__label">{c.typeLabel}</legend>
                  <div className="v2-choices">
                    {c.types.map((option) => (
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
                  <span className="v2-field__label">{c.messageLabel}</span>
                  <textarea name="mesaj" placeholder={c.messagePlaceholder} />
                </label>

                {/* Bal kupu. Ekran okuyucudan ve klavye sirasindan cikarilmis;
                    yalnizca formu tarayan bot goruyor. */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }}
                />

                {/* Formspree'nin e-posta konusu: gelen kutusunda hangi formdan
                    geldigi ve proje tipi tek satirda gorunsun. */}
                <input type="hidden" name="_subject" value={`suerta.co — ${type}`} />
                <input type="hidden" name="tip" value={type} />

                <div className="v2-form__foot">
                  <p className="v2-form__note">
                    {FORMSPREE_URL ? c.formNoteMail : c.formNote}
                  </p>
                  <button
                    type="submit"
                    className="v2-btn v2-btn--primary"
                    disabled={state === 'sending'}
                  >
                    {state === 'sending' ? c.sending : c.submit}
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
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_click', { yer: 'iletisim' })}
            >
              <span className="v2-channel__icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 2a8 8 0 110 16 8 8 0 01-4.2-1.2l-.4-.2-2.5.7.7-2.4-.3-.4A8 8 0 0112 4zm-3.3 4c-.2 0-.5 0-.7.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.2.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.2.2-1.3l-.6-.3-1.8-.9c-.3-.1-.5-.2-.7.1l-.7.9c-.1.2-.3.2-.5.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.1-.3 0-.4.1-.5l.5-.5.3-.5v-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4z" />
                </svg>
              </span>
              <span className="v2-channel__body">
                <span className="v2-channel__name">WhatsApp</span>
                <span className="v2-channel__meta">{c.whatsappMeta}</span>
              </span>
              <span className="v2-channel__go">
                <ArrowGlyph />
              </span>
            </a>

            <a
              className="v2-channel"
              href="mailto:suerta.info@gmail.com"
              onClick={() => track('mail_click', { yer: 'iletisim' })}
            >
              <span className="v2-channel__icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="2.5" y="5" width="19" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M3.5 7l8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </span>
              <span className="v2-channel__body">
                <span className="v2-channel__name">{c.mailLabel}</span>
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
              rel="noopener noreferrer"
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
                <span className="v2-channel__meta">{c.instagramMeta}</span>
              </span>
              <span className="v2-channel__go">
                <ArrowGlyph />
              </span>
            </a>

            <div className="v2-reply">
              <span className="v2-reply__head">
                <span className="v2-status__dot" aria-hidden="true" />
                {c.replyTitle}
              </span>
              <p className="v2-reply__text">{c.replyText}</p>
            </div>
          </Item>
        </Reveal>
      </div>
    </section>
  );
}
