/**
 * /strategy-call copy, in English and Spanish. See landing.jsx for the
 * conventions.
 *
 * Layout: form-dominant two-column lead — compact copy sidebar + GHL
 * survey form card. The form sits above the fold at every viewport,
 * so the headline / sub / bullets stay short and the new `form` block
 * supplies the bridging "what filling out this form does" beat.
 */

const strategyCallContent = {
  en: {
    meta: {
      title: 'Book a Strategy Call | Jomendez Inc',
      description:
        'A free 20-minute call about your business — where leads come from and what to fix first. No pitch.',
    },
    a11y: {
      primaryNav: 'Primary',
      homeLink: 'Jomendez Inc home',
      bulletsLabel: 'What we’ll cover',
      formIframeTitle: 'Strategy call intake survey',
    },
    nav: {
      back: '← Home',
    },
    hero: {
      eyebrow: 'STRATEGY CALL',
      headline: (
        <>
          Map your fastest path to <em>more leads.</em>
        </>
      ),
      sub: 'A free 20-minute conversation. No pitch, no pressure — just a clear read on where the biggest wins are.',
      bullets: [
        'Where your leads come from — or could come from',
        'Where they slip away before they convert',
        'What to build first to fix it',
      ],
    },
    form: {
      eyebrow: 'TELL ME ABOUT YOUR BUSINESS',
      heading: (
        <>
          Two minutes — <em>then we talk.</em>
        </>
      ),
      microcopy:
        'Your answers stay private. I’ll review them before our call so we can skip the small talk.',
      reassure: '~2 MIN · NO SPAM · I REPLY PERSONALLY',
    },
    after: {
      eyebrow: 'WHAT HAPPENS NEXT',
      heading: (
        <>
          A short, useful call — <em>nothing else.</em>
        </>
      ),
      body: 'You pick a time. I show up prepared. We talk through your business and what could move the needle fastest. If working together makes sense, we’ll talk about that. If it doesn’t, you still walk away with a clearer picture of where to focus.',
      freeAuditCta: 'Want a free instant audit first? →',
    },
    footer: {
      builtIn: 'BUILT IN MIAMI',
    },
  },

  es: {
    meta: {
      title: 'Agenda una llamada estratégica | Jomendez Inc',
      description:
        'Una llamada gratuita de 20 minutos sobre tu negocio: de dónde vienen tus clientes y qué arreglar primero.',
    },
    a11y: {
      primaryNav: 'Principal',
      homeLink: 'Inicio de Jomendez Inc',
      bulletsLabel: 'Lo que cubriremos',
      formIframeTitle: 'Cuestionario para la llamada estratégica',
    },
    nav: {
      back: '← Inicio',
    },
    hero: {
      eyebrow: 'LLAMADA ESTRATÉGICA',
      headline: (
        <>
          Traza tu camino más rápido a <em>más clientes.</em>
        </>
      ),
      sub: 'Una conversación gratuita de 20 minutos. Sin discurso de ventas — solo una lectura clara de dónde están las mayores oportunidades.',
      bullets: [
        'De dónde vienen tus clientes — o de dónde podrían venir',
        'Dónde se escapan antes de convertir',
        'Qué construir primero para arreglarlo',
      ],
    },
    form: {
      eyebrow: 'CUÉNTAME SOBRE TU NEGOCIO',
      heading: (
        <>
          Dos minutos — <em>y luego hablamos.</em>
        </>
      ),
      microcopy:
        'Tus respuestas son privadas. Las reviso antes de la llamada para ir directo al grano.',
      reassure: '~2 MIN · SIN SPAM · TE RESPONDO YO',
    },
    after: {
      eyebrow: 'QUÉ SIGUE DESPUÉS',
      heading: (
        <>
          Una llamada corta y útil, <em>nada más.</em>
        </>
      ),
      body: 'Tú eliges un horario. Yo llego preparado. Hablamos de tu negocio y de qué podría marcar la diferencia más rápido. Si tiene sentido trabajar juntos, lo hablamos. Si no, igual te vas con una idea más clara de dónde enfocarte.',
      freeAuditCta: '¿Quieres primero una auditoría instantánea gratis? →',
    },
    footer: {
      builtIn: 'HECHO EN MIAMI',
    },
  },
}

export default strategyCallContent
