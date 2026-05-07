/* global React */
const { useState, useEffect } = React;

const REVIEWS = [
  { body: 'Me explicaron todo en español, sin prisa. Salí sin miedo y con un plan claro.', author: 'María R.', city: 'Hialeah' },
  { body: 'First dentist that gave me an honest price up front. Booked my whole family the same week.', author: 'Jorge L.', city: 'Hialeah' },
  { body: 'La doctora trata a mi mamá como familia. Y los precios son claros desde la primera visita.', author: 'Ana M.', city: 'Hialeah Gardens' },
];

function ReviewCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(x => (x + 1) % REVIEWS.length), 7000);
    return () => clearInterval(t);
  }, []);
  const r = REVIEWS[i];
  return (
    <section className="psd-section psd-reviews">
      <div className="psd-reviews__head">
        <span className="psd-eyebrow">From your neighbors</span>
        <div className="psd-reviews__rating">
          <div className="psd-stars">
            {[0,1,2,3,4].map(n => (
              <svg key={n} width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7 7 .6-5.3 4.6 1.6 7L12 17.5 5.7 21.2l1.6-7L2 9.6 9 9z"/></svg>
            ))}
          </div>
          <span className="psd-reviews__count tnum">4.9 · 61+ Google reviews</span>
        </div>
      </div>
      <blockquote className="psd-review-card">
        <div className="psd-review-card__quote">“</div>
        <p>{r.body}</p>
        <footer>— {r.author} · <span className="psd-review-card__city">{r.city}</span></footer>
      </blockquote>
      <div className="psd-reviews__dots" role="tablist">
        {REVIEWS.map((_, n) => (
          <button key={n} className={'psd-dot' + (n===i?' is-active':'')} onClick={() => setI(n)} aria-label={`Review ${n+1}`}/>
        ))}
      </div>
    </section>
  );
}

window.ReviewCarousel = ReviewCarousel;
