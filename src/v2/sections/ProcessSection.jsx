import { Reveal, Item, TwoTone } from '../primitives';
import { useCopy } from '../i18n';

/* Surec: dort adim.
   Icerigin tamami ceviri dosyasindan geliyor, burada yalnizca duzen var. */
export default function ProcessSection() {
  const c = useCopy();
  const steps = c.process.steps;

  return (
    <section className="v2-section" id="surec">
      <div className="v2-shell">
        <Reveal>
          <Item className="v2-section__head">
            <h2 className="v2-title">
              <TwoTone lead={c.process.lead} tail={c.process.tail} />
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
  );
}
