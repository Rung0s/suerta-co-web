import React, { useState } from 'react';
import { Reveal, Item } from '../primitives';
import { useCopy } from '../i18n';

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

/* Iletisim.
   Arkada sunucu yok, o yuzden form "gonderiliyor" numarasi yapmiyor:
   alanlari duzenli bir mesaja cevirip WhatsApp'ta aciyor. Sahte bir
   basari ekrani gostermektense mesajin nereye gittigini gormek daha
   durust ve pratikte daha hizli donuyor. */
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

export default function ContactSection() {
  const c = useCopy().contact;
  const [type, setType] = useState(c.types[0]);
  const [sent, setSent] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
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
            {c.heading}
          </Item>
          <Item>
            <span className="v2-ticket">
              <span className="v2-ticket__num">2</span>
              <span className="v2-ticket__label">{c.slots}</span>
            </span>
          </Item>
          <Item className="v2-status">
            <span className="v2-status__dot" aria-hidden="true" />
            {c.status}
          </Item>
        </Reveal>

        <Reveal className="v2-contact__grid">
          <Item>
            {sent ? (
              <div className="v2-form">
                <div className="v2-form__sent">
                  <p className="v2-form__sent-title">{c.sentTitle}</p>
                  <p className="v2-form__note">{c.sentNote}</p>
                  <button
                    type="button"
                    className="v2-btn v2-btn--ghost"
                    onClick={() => setSent(false)}
                  >
                    {c.reopen}
                  </button>
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

                <div className="v2-form__foot">
                  <p className="v2-form__note">{c.formNote}</p>
                  <button type="submit" className="v2-btn v2-btn--primary">
                    {c.submit}
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
                <span className="v2-channel__meta">{c.whatsappMeta}</span>
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
