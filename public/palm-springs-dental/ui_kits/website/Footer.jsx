/* global React */

function Footer() {
  return (
    <footer className="psd-footer">
      <div className="psd-footer__top">
        <div className="psd-footer__brand">
          <img src="../../assets/logo-full.png" alt="Palm Springs Dental" />
          <p>A neighborhood dental clinic for Hialeah families. Bilingual by design, gentle by practice.</p>
        </div>
        <div className="psd-footer__col">
          <div className="psd-footer__lbl">Visit</div>
          <p className="psd-footer__addr">
            1234 W 49th St<br/>
            Hialeah, FL 33012<br/>
            <a className="psd-link-arrow">Get directions</a>
          </p>
        </div>
        <div className="psd-footer__col">
          <div className="psd-footer__lbl">Contact</div>
          <p>
            <a href="tel:+13055550117" className="tnum">(305) 555-0117</a><br/>
            <a href="mailto:hola@palmspringsdental.com">hola@palmspringsdental.com</a>
          </p>
        </div>
        <div className="psd-footer__col">
          <div className="psd-footer__lbl">Hours</div>
          <p className="tnum">
            Mon–Fri 8:00a–6:00p<br/>
            Sat 9:00a–2:00p<br/>
            Sun closed
          </p>
        </div>
      </div>
      <div className="psd-footer__bottom">
        <span>© 2026 Palm Springs Dental</span>
        <em className="psd-es">Hecho con cariño en Hialeah.</em>
        <span className="psd-footer__lang">EN <span aria-hidden="true">|</span> ES</span>
      </div>
    </footer>
  );
}

window.Footer = Footer;
