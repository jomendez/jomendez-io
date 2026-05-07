/* global React */

function BookingCTA() {
  return (
    <section className="psd-booking-cta">
      <div className="psd-booking-cta__inner">
        <h2 className="psd-booking-cta__head">
          Same-week appointments. No surprise pricing.
          <em className="psd-es psd-es--light">Cita esta semana. Sin sorpresas en el precio.</em>
        </h2>
        <div className="psd-booking-cta__actions">
          <button className="psd-btn psd-btn--primary">Book online</button>
          <a className="psd-btn psd-btn--ghost-light" href="tel:+13055550117">(305) 555-0117</a>
          <a className="psd-link-arrow psd-link-arrow--light">Text us instead</a>
        </div>
      </div>
    </section>
  );
}

window.BookingCTA = BookingCTA;
