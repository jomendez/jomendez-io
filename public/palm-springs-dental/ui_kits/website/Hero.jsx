/* global React */

function Hero() {
  return (
    <section className="psd-hero">
      <div className="psd-hero__copy">
        <span className="psd-eyebrow">Hialeah · Bilingual neighborhood clinic</span>
        <h1 className="psd-hero__headline">
          Comfortable dental care
          <em className="psd-hero__headline-es">Cuidado dental con confianza</em>
        </h1>
        <p className="psd-hero__lead">
          Same-week appointments, transparent pricing, and a real bilingual team.
          We treat your smile without losing who you are.
        </p>
        <div className="psd-hero__ctas">
          <button className="psd-btn psd-btn--primary">Book today, see us this week</button>
          <button className="psd-btn psd-btn--secondary">View our services</button>
        </div>
        <div className="psd-hero__trust">
          <div className="psd-stars" aria-label="4.9 of 5 stars">
            {[0,1,2,3,4].map(i => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7 7 .6-5.3 4.6 1.6 7L12 17.5 5.7 21.2l1.6-7L2 9.6 9 9z"/></svg>
            ))}
          </div>
          <span>4.9 · 61+ Google reviews from your neighbors</span>
        </div>
      </div>
      <div className="psd-hero__visual" aria-hidden="true">
        <div className="psd-photo psd-photo--hero">
          <span className="psd-photo__placeholder">Documentary photo<br/><em>Real team, natural light</em></span>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
