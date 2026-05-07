/* global React */
const { useState } = React;

function Nav() {
  const [lang, setLang] = useState('EN');
  return (
    <header className="psd-nav">
      <div className="psd-nav__utility">
        <span className="psd-nav__util-meta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Palm Springs Mile · Hialeah, FL
        </span>
        <span className="psd-nav__util-meta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          Mon–Fri 8a–6p · Sat 9a–2p
        </span>
        <div className="psd-nav__lang" role="group" aria-label="Language">
          <button onClick={() => setLang('EN')} className={lang==='EN'?'is-active':''}>EN</button>
          <span aria-hidden="true">|</span>
          <button onClick={() => setLang('ES')} className={lang==='ES'?'is-active':''}>ES</button>
        </div>
      </div>
      <div className="psd-nav__main">
        <a className="psd-nav__logo" href="#">
          <img src="../../assets/logo-full.png" alt="Palm Springs Dental" />
        </a>
        <nav className="psd-nav__links">
          <a href="#">Services</a>
          <a href="#">New patients</a>
          <a href="#">Our team</a>
          <a href="#">Insurance</a>
          <a href="#">Reviews</a>
        </nav>
        <div className="psd-nav__cta">
          <a className="psd-link-arrow" href="tel:+13055550117">(305) 555-0117</a>
          <button className="psd-btn psd-btn--primary">{lang==='EN'?'Book today':'Reservar cita'}</button>
        </div>
      </div>
    </header>
  );
}

window.Nav = Nav;
