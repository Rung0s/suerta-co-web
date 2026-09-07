import { Reveal, Item, TwoTone } from '../primitives';
import { useCopy } from '../i18n';

/* Sik sorulanlar.
   FAQPage semasi bilerek burada degil: ayni alti soru hem anasayfada hem
   /hizmetlerimiz sayfasinda sema olarak dururken ikisi ayni yanitin rakip
   kaynagi oluyordu. Sema orada, gorunur akordeon burada. */
export default function FaqSection() {
  const c = useCopy();
  const faqs = c.faq.items;

  return (
    <section className="v2-section" id="sss">
      <div className="v2-shell">
        <Reveal>
          <Item className="v2-section__head">
            <h2 className="v2-title">
              <TwoTone lead={c.faq.lead} tail={c.faq.tail} />
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
  );
}
