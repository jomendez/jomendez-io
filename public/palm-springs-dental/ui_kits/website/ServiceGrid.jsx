/* global React */

const SERVICES = [
  { en: 'New patient exam',    es: 'Examen para pacientes nuevos', icon: 'calendar' },
  { en: 'Emergency dentist',   es: 'Dentista de emergencia',       icon: 'heart' },
  { en: 'Implants',            es: 'Implantes dentales',           icon: 'shield' },
  { en: 'Invisalign',          es: 'Invisalign',                   icon: 'sparkles' },
  { en: 'Cosmetic & whitening',es: 'Estética y blanqueamiento',    icon: 'star' },
  { en: 'Family dentistry',    es: 'Odontología familiar',         icon: 'users' },
];

const ICONS = {
  calendar:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  heart:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  shield:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  sparkles:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>,
  star:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7 7 .6-5.3 4.6 1.6 7L12 17.5 5.7 21.2l1.6-7L2 9.6 9 9z"/></svg>,
  users:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
};

function ServiceGrid() {
  return (
    <section className="psd-section">
      <div className="psd-section__head">
        <span className="psd-eyebrow">What we do</span>
        <h2>Care for the whole family<em className="psd-es">Atención para toda la familia</em></h2>
      </div>
      <div className="psd-service-grid">
        {SERVICES.map(s => (
          <article key={s.en} className="psd-service-card">
            <div className="psd-service-card__icon">{ICONS[s.icon]}</div>
            <h4>{s.en}<em className="psd-es psd-es--sm">{s.es}</em></h4>
            <a className="psd-link-arrow">Learn more</a>
          </article>
        ))}
      </div>
    </section>
  );
}

window.ServiceGrid = ServiceGrid;
