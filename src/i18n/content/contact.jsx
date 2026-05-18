/**
 * /contact copy, in English and Spanish. See landing.jsx for the
 * conventions.
 *
 * `form.planBanner` is a function — it interpolates the selected-plan
 * label into copy whose word order differs between languages.
 * `form.planLabels` maps the URL plan slug to a localized display name
 * (it stays the lowercase slug when sent to the GHL form).
 */

const contactContent = {
  en: {
    meta: {
      title: 'Contact — Tell us about your business | Jomendez Inc',
      description:
        'Get in touch with Jomendez Inc. Tell us about your business and we’ll be in touch within one business day, or book a free strategy call.',
    },
    a11y: {
      primaryNav: 'Primary',
      homeLink: 'Jomendez Inc home',
    },
    nav: {
      back: '← Home',
    },
    hero: {
      eyebrow: 'CONTACT',
      headline: (
        <>
          Let’s start the <em>conversation.</em>
        </>
      ),
      sub: 'Tell us a bit about your business and we’ll get back to you within one business day. Prefer to talk first? Book a free strategy call instead.',
      ctaSend: 'Send a message',
      ctaBook: 'Book a Strategy Call',
    },
    form: {
      eyebrow: 'SEND A MESSAGE',
      heading: (
        <>
          Get in <em>touch.</em>
        </>
      ),
      sub: 'Fill out the form and we’ll be in touch within one business day.',
      planBanner: (label) => (
        <>
          You selected the <strong>{label}</strong> plan.
        </>
      ),
      planLabels: { starter: 'Starter', growth: 'Growth', pro: 'Pro' },
    },
    alt: {
      eyebrow: 'OTHER WAYS TO REACH US',
      heading: (
        <>
          Or skip the form <em>entirely.</em>
        </>
      ),
      bookCta: 'Book a Strategy Call',
      cards: [
        {
          meta: 'PREFER TO TALK',
          title: 'Book a 20-minute strategy call',
          body: 'A free conversation about your business — where you are, where you want to go, and whether we’re a fit. No pitch, no obligation.',
        },
        {
          meta: 'EMAIL DIRECTLY',
          title: 'Send us an email',
          body: 'Prefer to write? Drop us a note and we’ll get back to you within one business day.',
        },
      ],
    },
    footer: {
      builtIn: 'BUILT IN MIAMI',
    },
  },

  es: {
    meta: {
      title: 'Contacto — Cuéntanos sobre tu negocio | Jomendez Inc',
      description:
        'Ponte en contacto con Jomendez Inc. Cuéntanos sobre tu negocio y te responderemos en un día hábil, o agenda una llamada estratégica gratuita.',
    },
    a11y: {
      primaryNav: 'Principal',
      homeLink: 'Inicio de Jomendez Inc',
    },
    nav: {
      back: '← Inicio',
    },
    hero: {
      eyebrow: 'CONTACTO',
      headline: (
        <>
          Empecemos la <em>conversación.</em>
        </>
      ),
      sub: 'Cuéntanos un poco sobre tu negocio y te responderemos en un día hábil. ¿Prefieres hablar primero? Agenda una llamada estratégica gratuita.',
      ctaSend: 'Envía un mensaje',
      ctaBook: 'Agenda una llamada',
    },
    form: {
      eyebrow: 'ENVÍA UN MENSAJE',
      heading: (
        <>
          Ponte en <em>contacto.</em>
        </>
      ),
      sub: 'Llena el formulario y te responderemos en un día hábil.',
      planBanner: (label) => (
        <>
          Seleccionaste el plan <strong>{label}</strong>.
        </>
      ),
      planLabels: { starter: 'Inicial', growth: 'Crecimiento', pro: 'Pro' },
    },
    alt: {
      eyebrow: 'OTRAS FORMAS DE CONTACTARNOS',
      heading: (
        <>
          O sáltate el formulario <em>por completo.</em>
        </>
      ),
      bookCta: 'Agenda una llamada',
      cards: [
        {
          meta: 'PREFIERES HABLAR',
          title: 'Agenda una llamada de 20 minutos',
          body: 'Una conversación gratuita sobre tu negocio: dónde estás, a dónde quieres llegar y si encajamos. Sin discurso de ventas, sin compromiso.',
        },
        {
          meta: 'ESCRÍBENOS',
          title: 'Envíanos un correo',
          body: '¿Prefieres escribir? Envíanos una nota y te responderemos en un día hábil.',
        },
      ],
    },
    footer: {
      builtIn: 'HECHO EN MIAMI',
    },
  },
}

export default contactContent
