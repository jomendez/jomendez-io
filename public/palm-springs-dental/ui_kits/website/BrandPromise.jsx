/* global React */

const PILLARS = [
  { en: 'Comfort',      es: 'Sin miedo, sin prisas',         body: 'Gentle, unhurried care from a team that listens.' },
  { en: 'Transparency', es: 'Precios claros desde el primer día', body: 'One clear price per service. No surprise add-ons.' },
  { en: 'Belonging',    es: 'Tu sonrisa sin perder tu esencia', body: 'Bilingual by design. Hialeah families, real faces.' },
];

function BrandPromise() {
  return (
    <section className="psd-promise">
      <div className="psd-promise__inner">
        <span className="psd-eyebrow psd-eyebrow--light">Our promise</span>
        <h2 className="psd-promise__head">A neighborhood clinic, designed around comfort.</h2>
        <div className="psd-promise__grid">
          {PILLARS.map(p => (
            <div key={p.en} className="psd-pillar">
              <div className="psd-pillar__title">{p.en}</div>
              <div className="psd-pillar__es">{p.es}</div>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.BrandPromise = BrandPromise;
