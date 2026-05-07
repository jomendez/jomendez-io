/* global React */

function OfferBand() {
  return (
    <section className="psd-offer-band">
      <div className="psd-offer-band__copy">
        <span className="psd-eyebrow">For new patients</span>
        <h2>Start with a clear plan, not a sales pitch.<em className="psd-es">Empieza con un plan claro, sin presión.</em></h2>
        <p>Our new-patient visit includes everything you need to make a confident decision.</p>
      </div>
      <article className="psd-offer-card">
        <span className="psd-offer-card__tag">New patient</span>
        <div className="psd-offer-card__price tnum">$129<small>· includes x-rays</small></div>
        <ul className="psd-offer-card__list">
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12-1.4-1.4z"/></svg>Comprehensive exam &amp; oral cancer screening</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12-1.4-1.4z"/></svg>Full digital x-rays</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12-1.4-1.4z"/></svg>Bilingual treatment plan, in writing</li>
          <li><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19l12-12-1.4-1.4z"/></svg>CareCredit financing if you need it</li>
        </ul>
        <button className="psd-btn psd-btn--primary">Book today →</button>
      </article>
    </section>
  );
}

window.OfferBand = OfferBand;
