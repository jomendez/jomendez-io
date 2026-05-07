/* global React */

function DoctorCard() {
  return (
    <section className="psd-section psd-doctor">
      <div className="psd-doctor__photo psd-photo">
        <span className="psd-photo__placeholder">Dr. portrait<br/><em>Three-quarter angle</em></span>
      </div>
      <div className="psd-doctor__copy">
        <span className="psd-eyebrow">Meet your dentist</span>
        <h2>Dr. Carolina Méndez, DMD</h2>
        <div className="psd-doctor__creds">UF College of Dentistry · 12 years in Hialeah · ADA member</div>
        <p className="psd-quote">
          “I grew up two blocks from this clinic. When neighbors come in, I want them
          to feel exactly what I'd want my abuela to feel — heard, unhurried, and clear
          about what comes next.”
        </p>
        <p className="psd-quote-es">
          “Crecí a dos cuadras de esta clínica. Quiero que cada vecino se sienta
          como me gustaría que se sintiera mi abuela.”
        </p>
        <div className="psd-doctor__sig">— Carolina</div>
      </div>
    </section>
  );
}

window.DoctorCard = DoctorCard;
