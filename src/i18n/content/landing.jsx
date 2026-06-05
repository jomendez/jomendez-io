/**
 * Homepage (/) copy, in English and Spanish.
 *
 * Each key under `en` has a matching key under `es`. Values are plain
 * strings, JSX fragments (where the copy needs <em>, <br/> or <strong>),
 * or arrays for repeated items. The Landing component reads its slice
 * with useContent(landingContent).
 *
 * Spanish register: warm, direct "tú" — matches the founder-to-owner
 * tone of the English.
 */

const landingContent = {
  en: {
    meta: {
      title:
        'Jomendez Inc — Smart websites & AI-powered sales systems for local businesses.',
    },
    a11y: {
      primaryNav: 'Primary',
      mobileNav: 'Mobile navigation',
      homeLink: 'Jomendez Inc home',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      trust: 'Engineering experience',
      leaks: 'Three places where small businesses lose money',
      capabilities: 'What I build',
      auditDimensions: 'The 8 audit dimensions',
    },
    nav: {
      howItWorks: 'How It Works',
      whyItWorks: 'Why It Works',
      about: 'About',
    },
    cta: {
      freeAudit: 'Get free business audit',
      bookCall: 'Book a Strategy Call',
    },
    hero: {
      eyebrow: '— FRACTIONAL CTO / GROWTH SYSTEMS FOR LOCAL BUSINESSES',
      headline: (
        <>
          Smart <em>websites</em> that help local businesses capture and convert
          more leads.
        </>
      ),
      sub: 'I build the website, CRM, booking, AI chat, and automated follow-up system that helps you respond faster, stay organized, and turn more inquiries into customers — without adding more work to your day.',
      fineprint: 'Free business audit. No pitch, no obligation.',
      portraitTagline: (
        <>
          The system behind
          <br />
          your website.
        </>
      ),
    },
    trust: {
      label: (
        <>
          Disciplined engineering
          <br />
          background
        </>
      ),
    },
    problem: {
      eyebrow: 'THE REAL PROBLEM',
      heading: (
        <>
          A website alone doesn&apos;t capture and convert leads.
          <br />
          The <em>system behind it</em> does.
        </>
      ),
      body: [
        'Whether you already have a website, you’re replacing one that isn’t working, or you’re launching your business from scratch — the goal is the same: every lead captured, every inquiry followed up with, every appointment booked. Most businesses never get there because nobody built the system underneath.',
        'Inquiries arrive from referrals, social, ads, and walk-ins. They land in different places — phone, DMs, email, a sticky note — and the ones that don’t get a fast, organized response quietly disappear.',
        'What’s missing isn’t another pretty page. It’s one place to catch every lead, one clear process for following up, and the automation to keep it running while you focus on the work.',
      ],
      leaks: [
        {
          title: 'Leads that never get a reply',
          desc: 'Inquiries arrive while you’re with a customer, on a job, or asleep. With nothing set up to catch and respond, they quietly go to a competitor.',
        },
        {
          title: 'Hours lost to manual work',
          desc: 'Copying contacts between notebooks and apps, sending the same messages by hand, chasing no-shows, and juggling tools that don’t talk to each other.',
        },
        {
          title: 'Customers who never come back',
          desc: 'With no plan for follow-up, reviews, or reactivation, every customer is a one-and-done. Your best source of future revenue stays cold.',
        },
      ],
    },
    promise: {
      eyebrow: 'THE SYSTEM',
      heading: (
        <>
          A complete lead conversion system,{' '}
          <em>built around your business.</em>
        </>
      ),
      body: [
        'Not just a website. Your website, CRM, booking, AI chat, and automated follow-up all working together as one system — so every lead gets captured, every inquiry gets a fast response, and nothing falls through the cracks.',
        'Simple for your team. Powerful behind the scenes. You don’t need to learn any of it — that’s my job.',
      ],
      capabilities: [
        {
          label: 'CAPABILITY 01',
          title: 'Smart Business Websites',
          desc: 'Fast, professional sites built to capture leads — not just look good. Designed to turn visitors into booked appointments.',
        },
        {
          label: 'CAPABILITY 02',
          title: 'CRM & Lead Pipeline',
          desc: 'Every lead in one place, with a clear next step for each one. Real visibility into your pipeline — no spreadsheets, no guessing.',
        },
        {
          label: 'CAPABILITY 03',
          title: 'AI Chat & Automated Follow-Up',
          desc: 'Reply to new leads in seconds. Send reminders and follow-ups automatically. An AI assistant answers common questions 24/7.',
        },
        {
          label: 'CAPABILITY 04',
          title: 'Booking & Customer Reactivation',
          desc: 'Online booking, review collection, and win-back campaigns that bring quiet customers back — without you lifting a finger.',
        },
      ],
    },
    audit: {
      eyebrow: 'WHEN WE WORK TOGETHER',
      heading: (
        <>
          The 8-Point <em>Business Audit</em>
        </>
      ),
      body: [
        'When we start working together, the 8-Point Business Audit is the first thing we run. It’s a deep, tailored look at where your business stands across the eight dimensions that drive growth — the discovery work that shapes every system we build for you, so what you end up with fits your business and not a template.',
        'Different from the free instant audit, this one looks inside the business: operations, follow-up, retention, financial clarity, and the tools you already use — not just what’s visible on the web.',
      ],
      dimensions: [
        { name: 'Online Visibility', desc: 'Can the right customers actually find you?' },
        { name: 'Lead Capture', desc: 'Is your website turning visitors into contacts?' },
        { name: 'Lead Response', desc: 'How fast do new inquiries hear back from you?' },
        { name: 'Customer Retention', desc: 'Are past customers coming back — and sending referrals?' },
        { name: 'Operations & Time', desc: 'Where are the manual tasks eating your week?' },
        { name: 'Marketing Engine', desc: 'Is your content driving leads, or just creating busy work?' },
        { name: 'Financial Clarity', desc: 'Do you actually see your pipeline and your real numbers?' },
        { name: 'Tech Stack', desc: 'Are your tools working together, or fighting each other?' },
      ],
      ctaHeading: 'Ready to find what to build first?',
      ctaBody:
        'Book a short strategy call. If we’re a fit, the 8-Point Business Audit is the first thing we run together — and it shapes everything that comes after.',
    },
    why: {
      eyebrow: 'WHY THIS WORKS',
      heading: (
        <>
          Not a basic website.
          <br />
          Not a <em>generic agency.</em>
        </>
      ),
      body: [
        'Most agencies stop at the website. The result looks fine, but every lead still depends on you remembering to follow up. I build the operational system behind the website — capture, CRM, booking, follow-up, AI — so every inquiry moves through a clear process, automatically.',
        'My background is in professional software engineering, but my focus is simple: helping local businesses use technology to respond faster, stay organized, and close more opportunities. The same disciplined approach used to build reliable systems at scale — applied to your business at your scale.',
      ],
      stats: [
        {
          num: '15+ years',
          label: 'Building reliable systems',
          sub: 'across enterprise and high-growth startup environments.',
        },
        {
          num: 'Fractional CTO',
          label: 'For local businesses',
          sub: 'the technical partner most small businesses can’t justify hiring full-time.',
        },
        {
          num: 'Bilingual',
          label: 'US-based',
          sub: 'based in Miami, working with clients across the country.',
        },
      ],
    },
    about: {
      eyebrow: 'ABOUT',
      heading: (
        <>
          The technical partner most small businesses <em>never get.</em>
        </>
      ),
      body: [
        'I started my career as an intern in Cuba, building internal tools for a company that couldn’t afford anyone more experienced. Every job after that — Ecuador, Costa Rica, Miami, and into senior engineering work in the US — was the same pattern: walk into a business, find what’s broken, build the system that fixes it.',
        'Somewhere along the way I realized the businesses that need this work the most are the ones run by people who hustled and built something real with their hands. They have the customers. They have the craft. What they’re missing is the system behind it — the kind of digital operating system larger companies already use to capture, follow up, and convert.',
      ],
      bodyClosing: (
        <>
          I built <strong>jomendez.io</strong> to bring that system to local
          businesses.
        </>
      ),
    },
    path: {
      eyebrow: 'THE PATH',
      heading: (
        <>
          A clear path. <em>No surprises.</em>
        </>
      ),
      steps: [
        {
          label: 'STEP 01',
          title: 'Book a strategy call',
          desc: 'A free 20-minute conversation about your business, your goals, and what a complete system would look like for you — whether you’re launching, growing, or rebuilding.',
        },
        {
          label: 'STEP 02',
          title: 'Get your audit & plan',
          desc: 'We walk through the 8-Point Business Audit together — a deep, tailored look at where your business stands across the eight dimensions that drive growth. You leave with a clear map of what to fix first.',
        },
        {
          label: 'STEP 03',
          title: 'Build your growth system',
          desc: 'Pick what matters most. I scope, I build, I hand it off — or we keep working together long-term. You stay in business mode. I handle the technology.',
        },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      heading: (
        <>
          The questions <em>everyone asks.</em>
        </>
      ),
      items: [
        {
          q: 'Do I need to understand technology to work with you?',
          a: 'No — and that’s the whole point. You run your business; I handle the technology. You’ll never have to learn how a CRM works, set up an automation, or touch any code. If you can send a text message, you can use everything I build for you.',
        },
        {
          q: 'What do I actually get? Is it just a website?',
          a: 'It’s a lot more than a website. You get a complete system: a professional website, one organized place to track every lead, online booking, automatic text and email follow-ups, and an AI assistant that answers common questions for you. The website is just the front door — the real value is everything working behind it to turn visitors into paying customers.',
        },
        {
          q: 'How is this different from hiring a web designer or a marketing agency?',
          a: 'A web designer builds you a good-looking website and then they’re done. A marketing agency sends you traffic, but what happens to those leads is still up to you. I build the system that catches every lead, follows up with them right away, and helps turn them into booked appointments — so opportunities stop slipping through the cracks.',
        },
        {
          q: 'What if I don’t have a website yet — or I’m just starting my business?',
          a: 'That’s perfectly fine. Whether you’re starting from zero, replacing a website that isn’t working, or building on what you already have, we start from wherever you are. If anything, new businesses have an advantage: you get the right system in place from day one instead of fixing things later.',
        },
        {
          q: 'How long until everything is up and running?',
          a: 'Most projects take a few weeks, depending on how many pages you need and how much we’re putting together. Before we start, you’ll get a clear timeline — no vague promises and no surprises.',
        },
        {
          q: 'What happens after my website launches? Am I on my own?',
          a: 'Not at all. Every plan includes ongoing support and a set number of website updates each month, so your site keeps up as your business changes. When something needs adjusting, you send a message and it gets handled — you never have to touch anything technical.',
        },
        {
          q: 'How much does it cost?',
          a: 'Pricing depends on what we build for you — typically a one-time setup fee to put the system in place plus a flat monthly fee to keep it running and supported. We map the exact scope and cost together on a free strategy call. No obligation, no pressure — you’ll know the full picture before deciding anything.',
        },
      ],
    },
    final: {
      heading: (
        <>
          Stop losing leads. Start building a system that{' '}
          <em>converts them.</em>
        </>
      ),
      sub: 'Book a short strategy call. We’ll map the fastest path to a complete system — whether you’re starting from scratch, replacing what isn’t working, or filling in the gaps.',
    },
    footer: {
      builtIn: 'BUILT IN MIAMI',
    },
  },

  es: {
    meta: {
      title:
        'Jomendez Inc — Sitios web inteligentes y sistemas de ventas con IA para negocios locales.',
    },
    a11y: {
      primaryNav: 'Principal',
      mobileNav: 'Navegación móvil',
      homeLink: 'Inicio de Jomendez Inc',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      trust: 'Experiencia en ingeniería',
      leaks: 'Tres lugares donde los negocios pequeños pierden dinero',
      capabilities: 'Lo que construyo',
      auditDimensions: 'Las 8 dimensiones de la auditoría',
    },
    nav: {
      howItWorks: 'Cómo Funciona',
      whyItWorks: 'Por Qué Funciona',
      about: 'Sobre Mí',
    },
    cta: {
      freeAudit: 'Auditoría gratis',
      bookCall: 'Agenda una llamada',
    },
    hero: {
      eyebrow: '— CTO FRACCIONAL / SISTEMAS DE CRECIMIENTO PARA NEGOCIOS LOCALES',
      headline: (
        <>
          Sitios web <em>inteligentes</em> que ayudan a los negocios locales a
          captar y convertir más clientes.
        </>
      ),
      sub: 'Construyo el sistema completo —sitio web, CRM, agenda de citas, chat con IA y seguimiento automático— que te ayuda a responder más rápido, mantenerte organizado y convertir más consultas en clientes, sin sumar trabajo a tu día.',
      fineprint: 'Auditoría de negocio gratis. Sin presión, sin compromiso.',
      portraitTagline: (
        <>
          El sistema detrás
          <br />
          de tu sitio web.
        </>
      ),
    },
    trust: {
      label: (
        <>
          Experiencia sólida
          <br />
          en ingeniería
        </>
      ),
    },
    problem: {
      eyebrow: 'EL VERDADERO PROBLEMA',
      heading: (
        <>
          Un sitio web por sí solo no capta ni convierte clientes.
          <br />
          El <em>sistema detrás</em> sí.
        </>
      ),
      body: [
        'Ya sea que tengas un sitio web, que estés reemplazando uno que no funciona o que estés lanzando tu negocio desde cero, la meta es la misma: captar cada cliente, dar seguimiento a cada consulta y agendar cada cita. La mayoría de los negocios no lo logran porque nadie construyó el sistema que va por debajo.',
        'Las consultas llegan por recomendaciones, redes sociales, anuncios y clientes que pasan por tu puerta. Caen en lugares distintos —el teléfono, los mensajes directos, el correo, una nota pegada— y las que no reciben una respuesta rápida y organizada desaparecen sin que te des cuenta.',
        'Lo que falta no es otra página bonita. Es un solo lugar donde se capte cada cliente, un proceso claro de seguimiento y la automatización que lo mantiene andando mientras tú te enfocas en tu trabajo.',
      ],
      leaks: [
        {
          title: 'Clientes que nunca reciben respuesta',
          desc: 'Las consultas llegan mientras atiendes a un cliente, estás en un trabajo o duermes. Sin nada que las capte y responda, se van en silencio con la competencia.',
        },
        {
          title: 'Horas perdidas en trabajo manual',
          desc: 'Copiar contactos entre libretas y aplicaciones, enviar los mismos mensajes a mano, perseguir citas perdidas y hacer malabares con herramientas que no se comunican entre sí.',
        },
        {
          title: 'Clientes que nunca regresan',
          desc: 'Sin un plan de seguimiento, reseñas o reactivación, cada cliente es de una sola vez. Tu mejor fuente de ingresos futuros se queda fría.',
        },
      ],
    },
    promise: {
      eyebrow: 'EL SISTEMA',
      heading: (
        <>
          Un sistema completo de conversión,{' '}
          <em>diseñado en torno a tu negocio.</em>
        </>
      ),
      body: [
        'No solo un sitio web. Tu sitio web, CRM, agenda de citas, chat con IA y seguimiento automático funcionando juntos como un solo sistema, para que cada cliente quede captado, cada consulta reciba una respuesta rápida y nada se pierda en el camino.',
        'Simple para tu equipo. Potente por dentro. No necesitas aprender nada de esto: ese es mi trabajo.',
      ],
      capabilities: [
        {
          label: 'CAPACIDAD 01',
          title: 'Sitios Web Inteligentes',
          desc: 'Sitios rápidos y profesionales hechos para captar clientes, no solo para verse bien. Diseñados para convertir visitantes en citas agendadas.',
        },
        {
          label: 'CAPACIDAD 02',
          title: 'CRM y Embudo de Clientes',
          desc: 'Cada cliente en un solo lugar, con un próximo paso claro para cada uno. Visibilidad real de tu embudo, sin hojas de cálculo ni adivinanzas.',
        },
        {
          label: 'CAPACIDAD 03',
          title: 'Chat con IA y Seguimiento Automático',
          desc: 'Responde a clientes nuevos en segundos. Envía recordatorios y seguimientos de forma automática. Un asistente con IA responde las preguntas comunes 24/7.',
        },
        {
          label: 'CAPACIDAD 04',
          title: 'Agenda y Reactivación de Clientes',
          desc: 'Agenda en línea, recolección de reseñas y campañas de recuperación que traen de vuelta a los clientes inactivos, sin que muevas un dedo.',
        },
      ],
    },
    audit: {
      eyebrow: 'CUANDO TRABAJAMOS JUNTOS',
      heading: (
        <>
          La Auditoría de Negocio <em>de 8 Puntos</em>
        </>
      ),
      body: [
        'Cuando empezamos a trabajar juntos, la Auditoría de Negocio de 8 Puntos es lo primero que hacemos. Es un análisis profundo y a la medida de dónde está tu negocio en las ocho dimensiones que impulsan el crecimiento: el trabajo de descubrimiento que da forma a cada sistema que construimos para ti, para que lo que recibas se ajuste a tu negocio y no a una plantilla.',
        'A diferencia de la auditoría instantánea gratuita, esta mira dentro del negocio: operaciones, seguimiento, retención, claridad financiera y las herramientas que ya usas, no solo lo que se ve en internet.',
      ],
      dimensions: [
        { name: 'Visibilidad en Línea', desc: '¿Pueden los clientes correctos encontrarte de verdad?' },
        { name: 'Captación de Clientes', desc: '¿Tu sitio web convierte visitantes en contactos?' },
        { name: 'Respuesta a Clientes', desc: '¿Qué tan rápido respondes a las consultas nuevas?' },
        { name: 'Retención de Clientes', desc: '¿Tus clientes anteriores regresan y te recomiendan?' },
        { name: 'Operación y Tiempo', desc: '¿Dónde se te va la semana en tareas manuales?' },
        { name: 'Motor de Marketing', desc: '¿Tu contenido atrae clientes o solo te genera trabajo?' },
        { name: 'Claridad Financiera', desc: '¿Ves de verdad tu embudo y tus números reales?' },
        { name: 'Herramientas', desc: '¿Tus herramientas trabajan juntas o se pelean entre sí?' },
      ],
      ctaHeading: '¿Listo para descubrir qué construir primero?',
      ctaBody:
        'Agenda una llamada breve. Si encajamos, la Auditoría de Negocio de 8 Puntos es lo primero que hacemos juntos, y le da forma a todo lo que sigue.',
    },
    why: {
      eyebrow: 'POR QUÉ FUNCIONA',
      heading: (
        <>
          No es un sitio web básico.
          <br />
          No es una <em>agencia genérica.</em>
        </>
      ),
      body: [
        'La mayoría de las agencias se detienen en el sitio web. El resultado se ve bien, pero cada cliente sigue dependiendo de que tú te acuerdes de dar seguimiento. Yo construyo el sistema operativo detrás del sitio web —captación, CRM, agenda, seguimiento, IA— para que cada consulta avance por un proceso claro, de forma automática.',
        'Mi formación es en ingeniería de software profesional, pero mi enfoque es simple: ayudar a los negocios locales a usar la tecnología para responder más rápido, mantenerse organizados y cerrar más oportunidades. El mismo enfoque disciplinado con que se construyen sistemas confiables a gran escala, aplicado a tu negocio y a tu escala.',
      ],
      stats: [
        {
          num: 'Más de 15 años',
          label: 'Construyendo sistemas confiables',
          sub: 'en entornos empresariales y de startups de alto crecimiento.',
        },
        {
          num: 'CTO Fraccional',
          label: 'Para negocios locales',
          sub: 'el socio técnico que la mayoría de los pequeños negocios no puede contratar de tiempo completo.',
        },
        {
          num: 'Bilingüe',
          label: 'En Estados Unidos',
          sub: 'con base en Miami, trabajando con clientes en todo el país.',
        },
      ],
    },
    about: {
      eyebrow: 'SOBRE MÍ',
      heading: (
        <>
          El socio técnico que la mayoría de los pequeños negocios{' '}
          <em>nunca tiene.</em>
        </>
      ),
      body: [
        'Empecé mi carrera como pasante en Cuba, creando herramientas internas para una empresa que no podía pagar a alguien con más experiencia. Cada trabajo después de ese —Ecuador, Costa Rica, Miami, y hasta llegar a la ingeniería sénior en Estados Unidos— fue el mismo patrón: llegar a un negocio, encontrar lo que está roto y construir el sistema que lo arregla.',
        'En algún momento me di cuenta de que los negocios que más necesitan este trabajo son los que llevan personas que se esforzaron y construyeron algo real con sus manos. Tienen los clientes. Tienen el oficio. Lo que les falta es el sistema detrás: ese tipo de sistema operativo digital que las empresas grandes ya usan para captar, dar seguimiento y convertir.',
      ],
      bodyClosing: (
        <>
          Creé <strong>jomendez.io</strong> para llevar ese sistema a los
          negocios locales.
        </>
      ),
    },
    path: {
      eyebrow: 'EL PROCESO',
      heading: (
        <>
          Un proceso claro. <em>Sin sorpresas.</em>
        </>
      ),
      steps: [
        {
          label: 'PASO 01',
          title: 'Agenda una llamada',
          desc: 'Una conversación gratuita de 20 minutos sobre tu negocio, tus metas y cómo se vería un sistema completo para ti, ya sea que estés lanzando, creciendo o reconstruyendo.',
        },
        {
          label: 'PASO 02',
          title: 'Recibe tu auditoría y plan',
          desc: 'Recorremos juntos la Auditoría de Negocio de 8 Puntos: un análisis profundo y a la medida de dónde está tu negocio en las ocho dimensiones que impulsan el crecimiento. Te vas con un mapa claro de qué arreglar primero.',
        },
        {
          label: 'PASO 03',
          title: 'Construye tu sistema de crecimiento',
          desc: 'Elige lo que más importa. Yo lo planifico, lo construyo y te lo entrego, o seguimos trabajando juntos a largo plazo. Tú te enfocas en tu negocio. Yo me encargo de la tecnología.',
        },
      ],
    },
    faq: {
      eyebrow: 'PREGUNTAS FRECUENTES',
      heading: (
        <>
          Las preguntas <em>que todos hacen.</em>
        </>
      ),
      items: [
        {
          q: '¿Necesito saber de tecnología para trabajar contigo?',
          a: 'No, y ese es justamente el punto. Tú llevas tu negocio; yo me encargo de la tecnología. Nunca tendrás que aprender cómo funciona un CRM, configurar una automatización ni tocar código. Si sabes enviar un mensaje de texto, sabes usar todo lo que construyo para ti.',
        },
        {
          q: '¿Qué recibo en realidad? ¿Es solo un sitio web?',
          a: 'Es mucho más que un sitio web. Recibes un sistema completo: un sitio web profesional, un solo lugar organizado para dar seguimiento a cada cliente, agenda en línea, seguimientos automáticos por mensaje y correo, y un asistente con IA que responde las preguntas comunes por ti. El sitio web es solo la puerta de entrada; el verdadero valor es todo lo que trabaja detrás para convertir visitantes en clientes que pagan.',
        },
        {
          q: '¿En qué se diferencia esto de contratar a un diseñador web o una agencia de marketing?',
          a: 'Un diseñador web te hace un sitio bonito y ahí termina su trabajo. Una agencia de marketing te envía tráfico, pero lo que pasa con esos clientes sigue dependiendo de ti. Yo construyo el sistema que capta cada cliente, le da seguimiento de inmediato y ayuda a convertirlo en una cita agendada, para que las oportunidades dejen de perderse.',
        },
        {
          q: '¿Y si todavía no tengo sitio web, o apenas estoy empezando mi negocio?',
          a: 'No hay ningún problema. Ya sea que estés empezando desde cero, reemplazando un sitio que no funciona o ampliando lo que ya tienes, comenzamos desde donde estés. De hecho, los negocios nuevos tienen una ventaja: montas el sistema correcto desde el primer día en lugar de corregir cosas después.',
        },
        {
          q: '¿Cuánto tiempo pasa hasta que todo esté funcionando?',
          a: 'La mayoría de los proyectos toma unas semanas, según cuántas páginas necesites y cuánto estemos armando. Antes de empezar recibirás un cronograma claro: sin promesas vagas y sin sorpresas.',
        },
        {
          q: '¿Qué pasa después de que mi sitio web se publica? ¿Me quedo solo?',
          a: 'Para nada. Cada plan incluye soporte continuo y un número definido de actualizaciones del sitio cada mes, para que tu sitio avance al ritmo de tu negocio. Cuando algo necesita un ajuste, envías un mensaje y se resuelve; nunca tienes que tocar nada técnico.',
        },
        {
          q: '¿Cuánto cuesta?',
          a: 'El precio depende de lo que construyamos para ti: por lo general, un pago único de inicio para poner el sistema en marcha más una cuota mensual fija para mantenerlo funcionando y con soporte. Definimos el alcance y el costo exactos en una llamada estratégica gratuita. Sin compromiso, sin presión: vas a conocer todo el panorama antes de decidir.',
        },
      ],
    },
    final: {
      heading: (
        <>
          Deja de perder clientes. Empieza a construir un sistema que{' '}
          <em>los convierta.</em>
        </>
      ),
      sub: 'Agenda una llamada breve. Trazaremos el camino más rápido hacia un sistema completo, ya sea que empieces desde cero, reemplaces lo que no funciona o llenes los vacíos.',
    },
    footer: {
      builtIn: 'HECHO EN MIAMI',
    },
  },
}

export default landingContent
