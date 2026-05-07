/* global React */

const PARTNERS = ['CareCredit', 'Delta Dental', 'Cigna', 'MetLife', 'Aetna', 'Humana', 'ADA Member'];

function InsuranceStrip() {
  return (
    <section className="psd-insurance">
      <span className="psd-insurance__lbl">We accept most plans · Aceptamos la mayoría de los seguros</span>
      <div className="psd-insurance__row">
        {PARTNERS.map(p => (
          <span key={p} className="psd-insurance__chip">{p}</span>
        ))}
      </div>
    </section>
  );
}

window.InsuranceStrip = InsuranceStrip;
