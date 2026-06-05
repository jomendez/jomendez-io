/**
 * /case-studies copy, in English and Spanish. See landing.jsx for the
 * conventions.
 *
 * Content shape:
 *   - `cases` is an array of 5 detailed case studies, each with hero
 *     stats, narrative, key benefits, results bullets, and a reference
 *     to a hero/results image hosted under /landing/case-studies/.
 *   - `briefCases` is an array of 4 short stat-card case studies that
 *     don't have a detailed PDF backing them — they show up on the
 *     page as compact 3-stat cards under "More wins" below the
 *     detailed grid.
 *
 * Generic framing: industries are named at a category level (e.g.
 * "Dental practice", "Tree-cutting service") without specific business
 * names or cities, to keep the client privacy promise from the
 * homepage teaser consistent across the full page.
 */

const caseStudiesContent = {
  en: {
    meta: {
      title:
        'Case Studies — Real Local-SEO Results in Days, Not Quarters | Jomendez Inc',
      description:
        'How the SEO AI Agent I deploy moved local businesses from invisible to top-ranking in 20–30 days. Heatmaps, before/after rankings, real numbers across 9 industries.',
    },
    a11y: {
      primaryNav: 'Primary',
      homeLink: 'Jomendez Inc home',
      casesLabel: 'Detailed client case studies',
      briefCasesLabel: 'Additional wins',
    },
    nav: {
      back: '← Home',
    },
    hero: {
      eyebrow: 'CLIENT CASE STUDIES',
      headline: (
        <>
          Real <em>results</em> from real local businesses.
        </>
      ),
      sub: 'Nine local businesses, nine industries, the same playbook: smart local SEO automation that turns the website into a steady stream of inquiries. Below are the before/after heatmaps, the keyword positions, and the call volume — the actual numbers behind each win.',
      fineprint:
        'Industries are shown without business names to respect client privacy. Stats and visuals are taken directly from the live ranking dashboards.',
    },
    cases: [
      // 1 — Dental practice
      {
        slug: 'dental',
        industry: 'Dental Practice',
        timeframe: '20 days',
        location: 'Highly competitive metro area',
        heroStats: [
          { value: '9↑', label: 'Better average ranking position' },
          { value: '84%', label: 'Of tracked pins now ranking' },
          { value: '7×', label: 'More keywords in top positions' },
        ],
        intro:
          'A dental office with over a decade of experience serving its neighborhood. State-of-the-art equipment, strong patient reviews, and a roster of returning families — but in a saturated metro market, new patients searching “dentist near me” couldn’t find them on the map.',
        strategyHeading: 'Harnessing the SEO AI Agent for local search',
        strategyBody:
          'I integrated the SEO AI Agent into the practice’s digital ecosystem with the goal of better ranking for “dentist near me” across a 2-mile radius and beyond. We used the local SEO heatmap to track each pin in the service area and re-ran the scan every few days to measure real movement — not guesses.',
        keyBenefits: [
          {
            title: 'Added missing keywords',
            body: 'The agent automatically identified and integrated related search terms the site was missing, expanding the practice’s footprint across long-tail queries.',
          },
          {
            title: 'NLP-aware copy',
            body: 'Natural-language processing terms were layered into the on-page content so the site matched conversational search queries, not just exact-match keywords.',
          },
          {
            title: 'Schema markup',
            body: 'Local-business and medical-organization schema was added so search engines could parse the practice’s services, hours, and location cleanly.',
          },
        ],
        resultsHeading: 'Results in 20 days',
        resultsBullets: [
          'Average ranking position across all tracked pins improved from 18.8 to 9.5 — a gain of more than 9 points.',
          'Before the rollout, 82% of pins weren’t ranking at all. After: 84% were ranking.',
          'Pins in the top 3 positions jumped from 1 to 7. Pins in the top 10 jumped from 2 to 13.',
        ],
        image: '/landing/case-studies/dental.webp',
        imageAlt:
          'Before-and-after local SEO heatmap for the dental practice, with the percentage of pins ranking shown as a donut chart.',
        imageCaption:
          'Local-SEO heatmap progression — pins ranking shown by color and the share of ranked pins shown in the donut.',
      },

      // 2 — Chiropractic center
      {
        slug: 'chiropractic',
        industry: 'Chiropractic Center',
        timeframe: '3 weeks',
        location: 'Established multi-practitioner clinic',
        heroStats: [
          { value: '12↑', label: 'Better average ranking position' },
          { value: '97.44%', label: 'Of tracked pins now ranking' },
          { value: '41%', label: 'Pins ranking in top positions' },
        ],
        intro:
          'A chiropractic center with more than 40 years of experience, focused on identifying and treating the root causes of pain. The team had grown to include several registered massage therapists and a registered acupuncturist — the operation was strong, but local visibility had stalled.',
        strategyHeading: 'Local discoverability via GBP automation',
        strategyBody:
          'The goal was to lift discoverability and ranking for “chiropractic center” across the service area. The SEO AI Agent posted 6 Q&A entries per week on Google Business Profile for 3 weeks straight, while the local SEO heatmap tracked each pin to record real movement.',
        keyBenefits: [
          {
            title: 'Automated SEO optimization',
            body: 'Streamlines the whole optimization process, removing the manual work and freeing the team to focus on patients.',
          },
          {
            title: 'Greater conversion',
            body: 'Substantial growth in the metrics that matter — calls, contact forms, and quote requests.',
          },
          {
            title: 'Enhanced local visibility',
            body: 'Higher local-search rankings and broader visibility, driving more organic traffic to the website.',
          },
        ],
        resultsHeading: 'Results in 3 weeks',
        resultsBullets: [
          'Average ranking across all pins improved from 18.7 to 6.3 — a gain of 12.4 points.',
          'Before, the business wasn’t ranking for 85% of the pins. After: 97% of the pins were ranking.',
          'Pins in the top 10 positions jumped from 4 to 24, with 18 of those landing in the top 3.',
        ],
        image: '/landing/case-studies/chiropractic.webp',
        imageAlt:
          'Before-and-after local SEO heatmap for the chiropractic center across 3 weeks, with pins ranking shown by color.',
        imageCaption:
          'Before / after heatmap — pin ranking by color, with the share of ranked pins as a donut chart.',
      },

      // 3 — Tree cutting service
      {
        slug: 'treecutting',
        industry: 'Tree-Cutting Service',
        timeframe: '3 weeks',
        location: 'Family-owned, high-competition urban area',
        heroStats: [
          { value: '8↑', label: 'Better average ranking position' },
          { value: '89.74%', label: 'Of tracked pins now ranking' },
          { value: '90%', label: 'Pins ranking in top positions' },
        ],
        intro:
          'A family-owned tree-cutting service with more than a decade of work behind it — strong word of mouth, a real referral network, competitive rates. The business was excellent at execution, but in a saturated metro market new homeowners couldn’t find them online.',
        strategyHeading: 'Unleashing local SEO across two keywords',
        strategyBody:
          'The goal was to boost discoverability and ranking for two keywords: “tree pruning” and “tree service and removal” across the service area. The SEO AI Agent added 6 Q&A posts per week on Google Business Profile for 3 weeks, while the heatmap recorded the response on each pin.',
        keyBenefits: [
          {
            title: 'Automated SEO optimization',
            body: 'Streamlines the entire SEO workflow so the crew can stay on the job instead of in the dashboard.',
          },
          {
            title: 'Greater conversion',
            body: 'More calls, more quote requests, more booked work — the metrics tied directly to revenue.',
          },
          {
            title: 'Enhanced local visibility',
            body: 'Higher rankings and broader coverage across the metro, bringing more organic traffic to the website.',
          },
        ],
        resultsHeading: 'Results in 3 weeks',
        resultsBullets: [
          'Average ranking across all pins improved from 18.9 to 13.1 — a gain of 5.8 points.',
          'Before, the business wasn’t ranking for 71% of pins. After: 79% of pins were ranking.',
          'On the second keyword: top-3 pin share jumped from 41% to 90%, with most of those landing at rank 1.',
        ],
        image: '/landing/case-studies/treecutting.webp',
        imageAlt:
          'Before-and-after local SEO heatmap for the tree-cutting service across 3 weeks of optimization.',
        imageCaption:
          'Before / after heatmap on the primary keyword — pin ranking by color, with the share of ranked pins as a donut chart.',
      },

      // 4 — Lighting & home decor
      {
        slug: 'lightingdecor',
        industry: 'Lighting & Home-Decor Retail',
        timeframe: '4 weeks',
        location: 'Multi-generation luxury showroom',
        heroStats: [
          { value: '12↑', label: 'Better average ranking position' },
          { value: '69.23%', label: 'More pins ranking' },
          { value: '5×', label: 'More pins in top positions' },
        ],
        intro:
          'A lighting and home-decor business spanning four generations and over 20 luxury showrooms. They build high-end custom lighting at price points that compete with mass retail — a strong story that wasn’t reaching homeowners online.',
        strategyHeading: 'Activating local SEO across two long-tail keywords',
        strategyBody:
          'The goal was to win local rankings for two product-level keywords: “fans” (40 Q&A posts/week for 4 weeks) and “hugger fans” (30 Q&A posts/week for 3 weeks). The local SEO heatmap tracked each pin across the service area on both keywords in parallel.',
        keyBenefits: [
          {
            title: 'Automated SEO optimization',
            body: 'The agent handled the optimization workflow end-to-end, so the showroom team could stay focused on selling.',
          },
          {
            title: 'Greater conversion',
            body: 'More calls, more web inquiries, more in-store traffic from people actively shopping the product line.',
          },
          {
            title: 'Enhanced local visibility',
            body: 'Higher rankings across both keywords, broader visibility across the metro, and more organic traffic to the site.',
          },
        ],
        resultsHeading: 'Results in 4 weeks',
        resultsBullets: [
          'Average ranking across all pins improved from 13.1 to 6.8 — a gain of 6.3 points.',
          'Before, the business wasn’t ranking (or ranked badly) for 49% of pins. After: 100% of pins were ranking.',
          'Pins ranking in the top 10 jumped from 16 to 29, with 8 of those landing in the top 3.',
        ],
        image: '/landing/case-studies/lightingdecor.webp',
        imageAlt:
          'Before-and-after local SEO heatmap for the lighting and home-decor showroom across 4 weeks.',
        imageCaption:
          'Before / after heatmap on the primary keyword — pin ranking by color, with the share of ranked pins as a donut chart.',
      },

      // 5 — Auto glass repair
      {
        slug: 'autoglass',
        industry: 'Auto Glass Repair',
        timeframe: '30 days',
        location: 'Certified independent repair shop',
        heroStats: [
          { value: '+159.74%', label: 'Calls from SEO efforts' },
          { value: '+126.42%', label: 'Website impressions' },
          { value: '+69.23%', label: 'Website clicks' },
        ],
        intro:
          'A certified auto-glass repair shop founded by experienced mechanics, with a team that stays current on the latest techniques and materials. The shop already had a strong reputation in person — but the SEO spend was opaque, the tooling fragmented, and the results impossible to attribute.',
        strategyHeading: 'Consolidating fragmented SEO tooling',
        strategyBody:
          'The shop had been paying for multiple specialist SEO tools — each with its own dashboard, each with partial data, none giving a coherent read on what was actually working. I replaced the stack with the SEO AI Agent so the team could see real-time rankings, automate the recurring tasks, and act on a single source of truth.',
        keyBenefits: [
          {
            title: 'Streamlined GBP posting',
            body: 'Scheduled Google Business Profile posts weeks in advance — consistent, timely updates without manual effort.',
          },
          {
            title: 'Mass SEO changes in minutes',
            body: 'Site-wide changes that used to take hours (updating headers across a 50-page site, refreshing meta titles) now complete in under 30 minutes.',
          },
          {
            title: 'Weekly tasks + suggestions',
            body: 'A continuous feed of recommendations kept the shop ahead — refining strategy as competitors moved, not after they pulled ahead.',
          },
        ],
        resultsHeading: 'Results in 30 days',
        resultsBullets: [
          '1,091 calls in the measurement month — up from 975 the month before and 683 the same month a year prior.',
          'Over 100 contact-form submissions and quote requests in the same window.',
          'Clicks rose from 143 to 242, impressions from 10.6k to 13.4k, CTR from 1.3% to 1.8%, and average keyword position from 22.9 to 19.6.',
          'A 10% month-over-month increase in GBP call volume.',
        ],
        image: '/landing/case-studies/autoglass.webp',
        imageAlt:
          'Google Search Console dashboard showing the increase in clicks, impressions, CTR, and average ranking position across the 30-day measurement window.',
        imageCaption:
          'Search Console dashboard — clicks, impressions, average CTR, and average ranking position over the 30-day window.',
      },
    ],
    briefSection: {
      eyebrow: 'MORE WINS',
      heading: 'Other industries, same playbook.',
      body: 'Four more cases — same approach, same speed, different verticals. Industries shown without business names.',
    },
    briefCases: [
      {
        industry: 'DUI Law Firm',
        timeframe: '4 weeks',
        stats: [
          { value: '100%', label: 'Pins improved' },
          { value: '17.5↑', label: 'Better avg. ranking position' },
          { value: '88%', label: 'Pins in top positions' },
        ],
        summary:
          'Significant lift across every tracked location after the SEO AI Agent took over the optimization workflow — and hundreds of hours of manual SEO work eliminated.',
      },
      {
        industry: 'Cleaning Service',
        timeframe: '4 weeks',
        stats: [
          { value: '100%', label: 'Pins ranking' },
          { value: '13↑', label: 'Better avg. ranking position' },
          { value: '46%', label: 'Pins in top positions' },
        ],
        summary:
          'Now ranks across a wide service area without paying for ads — strong inquiry flow at a fraction of the previous cost.',
      },
      {
        industry: 'Full-service Transactional Law Firm',
        timeframe: '4 weeks',
        stats: [
          { value: '87%', label: 'Pins improved' },
          { value: '100%', label: 'Pins ranking top 6' },
          { value: '85%', label: 'Pins ranking top 3' },
        ],
        summary:
          'From mid-pack visibility to dominating the local 3-pack across the service area, at a cost the firm could actually justify month over month.',
      },
      {
        industry: 'Cardiologist & Internist',
        timeframe: '3 weeks',
        stats: [
          { value: '82%', label: 'Pins improved' },
          { value: '+16', label: 'Pins ranking top 3' },
          { value: '55.13%', label: 'Total pins in top 3' },
        ],
        summary:
          'Two priority keywords lifted into top-3 positions across the service area in just three weeks — substantial time savings over manual SEO work.',
      },
    ],
    finalCta: {
      eyebrow: 'YOUR TURN',
      heading: (
        <>
          Want these kinds of <em>numbers</em> for your business?
        </>
      ),
      body: 'Book a strategy call. We’ll talk through where leads come from today, what the search-landscape looks like in your area, and what we’d need to put in place to see the same kind of lift. No obligation.',
      bookLabel: 'Book a Strategy Call',
      auditLabel: 'Get a free instant audit',
    },
    footer: {
      builtIn: 'BUILT IN MIAMI',
    },
  },

  es: {
    meta: {
      title:
        'Casos de éxito — Resultados reales de SEO local en días, no meses | Jomendez Inc',
      description:
        'Cómo el SEO AI Agent que despliego movió a negocios locales de invisibles al top en 20–30 días. Mapas de calor, posiciones antes/después y números reales en 9 industrias.',
    },
    a11y: {
      primaryNav: 'Principal',
      homeLink: 'Inicio de Jomendez Inc',
      casesLabel: 'Casos de estudio detallados de clientes',
      briefCasesLabel: 'Casos adicionales',
    },
    nav: {
      back: '← Inicio',
    },
    hero: {
      eyebrow: 'CASOS DE ÉXITO DE CLIENTES',
      headline: (
        <>
          Resultados <em>reales</em> de negocios locales reales.
        </>
      ),
      sub: 'Nueve negocios locales, nueve industrias, el mismo método: automatización inteligente de SEO local que convierte el sitio web en una fuente constante de consultas. Abajo están los mapas de calor antes/después, las posiciones por palabra clave y el volumen de llamadas — los números reales detrás de cada caso.',
      fineprint:
        'Las industrias se muestran sin nombres de empresa para respetar la privacidad del cliente. Las cifras y visualizaciones provienen directamente de los paneles de posicionamiento en vivo.',
    },
    cases: [
      // 1 — Consultorio dental
      {
        slug: 'dental',
        industry: 'Consultorio Dental',
        timeframe: '20 días',
        location: 'Área metropolitana altamente competitiva',
        heroStats: [
          { value: '9↑', label: 'Mejor posición promedio' },
          { value: '84%', label: 'De pins ahora posicionados' },
          { value: '7×', label: 'Más keywords en el top' },
        ],
        intro:
          'Un consultorio dental con más de una década atendiendo a su comunidad. Tecnología de punta, reseñas sólidas y una base estable de familias que vuelven — pero en un mercado metropolitano saturado, los nuevos pacientes que buscaban "dentista cerca de mí" no los encontraban en el mapa.',
        strategyHeading: 'El SEO AI Agent aplicado al search local',
        strategyBody:
          'Integré el SEO AI Agent al ecosistema digital del consultorio con un objetivo claro: mejorar el ranking de "dentista cerca de mí" en un radio de 2 millas y más allá. Usamos el mapa de calor de SEO local para rastrear cada pin del área de servicio y repetimos el escaneo cada pocos días para medir movimiento real, no estimaciones.',
        keyBenefits: [
          {
            title: 'Keywords faltantes incorporadas',
            body: 'El agente identificó e integró automáticamente los términos relacionados que faltaban en el sitio, ampliando la huella del consultorio en consultas long-tail.',
          },
          {
            title: 'Lenguaje natural en el contenido',
            body: 'Se incorporaron términos de NLP en el contenido on-page para que el sitio respondiera a búsquedas conversacionales y no solo a coincidencias exactas.',
          },
          {
            title: 'Schema markup',
            body: 'Se añadió schema de negocio local y organización médica para que los buscadores leyeran limpiamente los servicios, los horarios y la ubicación.',
          },
        ],
        resultsHeading: 'Resultados en 20 días',
        resultsBullets: [
          'La posición promedio en todos los pins rastreados mejoró de 18.8 a 9.5 — más de 9 puntos de mejora.',
          'Antes del despliegue, el 82% de los pins no posicionaba. Después: el 84% posicionaba.',
          'Los pins en las primeras 3 posiciones subieron de 1 a 7. Los pins en el top 10 subieron de 2 a 13.',
        ],
        image: '/landing/case-studies/dental.webp',
        imageAlt:
          'Mapa de calor de SEO local antes y después para el consultorio dental, con el porcentaje de pins posicionados en un gráfico de dona.',
        imageCaption:
          'Progresión del mapa de calor de SEO local — el color del pin muestra el ranking y la dona muestra el porcentaje de pins posicionados.',
      },

      // 2 — Centro quiropráctico
      {
        slug: 'chiropractic',
        industry: 'Centro Quiropráctico',
        timeframe: '3 semanas',
        location: 'Clínica multi-profesional ya establecida',
        heroStats: [
          { value: '12↑', label: 'Mejor posición promedio' },
          { value: '97.44%', label: 'De pins ahora posicionados' },
          { value: '41%', label: 'Pins en las mejores posiciones' },
        ],
        intro:
          'Un centro quiropráctico con más de 40 años de experiencia, enfocado en identificar y tratar las causas raíz del dolor. El equipo había crecido para incluir varios masajistas registrados y un acupunturista certificado — la operación era sólida, pero la visibilidad local se había estancado.',
        strategyHeading: 'Visibilidad local vía automatización en GBP',
        strategyBody:
          'El objetivo era subir la visibilidad y el ranking para "centro quiropráctico" en toda el área de servicio. El SEO AI Agent publicó 6 Q&A por semana en Google Business Profile durante 3 semanas seguidas, mientras el mapa de calor de SEO local rastreaba cada pin para registrar el movimiento real.',
        keyBenefits: [
          {
            title: 'Optimización SEO automatizada',
            body: 'Simplifica todo el proceso de optimización, eliminando el trabajo manual y liberando al equipo para enfocarse en los pacientes.',
          },
          {
            title: 'Mayor conversión',
            body: 'Crecimiento sustancial en las métricas que importan: llamadas, formularios y solicitudes de cotización.',
          },
          {
            title: 'Mayor visibilidad local',
            body: 'Mejores rankings en búsqueda local y más visibilidad, llevando más tráfico orgánico al sitio.',
          },
        ],
        resultsHeading: 'Resultados en 3 semanas',
        resultsBullets: [
          'La posición promedio en todos los pins mejoró de 18.7 a 6.3 — una mejora de 12.4 puntos.',
          'Antes, el negocio no posicionaba para el 85% de los pins. Después: el 97% de los pins posicionaba.',
          'Los pins en el top 10 saltaron de 4 a 24, con 18 de ellos llegando al top 3.',
        ],
        image: '/landing/case-studies/chiropractic.webp',
        imageAlt:
          'Mapa de calor de SEO local antes y después para el centro quiropráctico en 3 semanas, con los pins coloreados por su ranking.',
        imageCaption:
          'Mapa de calor antes / después — ranking del pin por color, con el porcentaje de pins posicionados en una dona.',
      },

      // 3 — Servicio de tala de árboles
      {
        slug: 'treecutting',
        industry: 'Servicio de Tala de Árboles',
        timeframe: '3 semanas',
        location: 'Negocio familiar, zona urbana de alta competencia',
        heroStats: [
          { value: '8↑', label: 'Mejor posición promedio' },
          { value: '89.74%', label: 'De pins ahora posicionados' },
          { value: '90%', label: 'Pins en las mejores posiciones' },
        ],
        intro:
          'Un servicio de tala familiar con más de una década de trabajo a sus espaldas — fuerte recomendación de boca en boca, red de referidos real, tarifas competitivas. El negocio era excelente ejecutando, pero en un mercado metropolitano saturado los dueños nuevos de casa no los encontraban en línea.',
        strategyHeading: 'SEO local en dos keywords',
        strategyBody:
          'El objetivo era impulsar la visibilidad y el ranking para dos palabras clave: "poda de árboles" y "servicio y remoción de árboles" en toda el área. El SEO AI Agent añadió 6 Q&A por semana en Google Business Profile durante 3 semanas, mientras el mapa de calor registraba la respuesta en cada pin.',
        keyBenefits: [
          {
            title: 'Optimización SEO automatizada',
            body: 'Simplifica todo el flujo de SEO para que la cuadrilla esté en el trabajo y no en el panel de control.',
          },
          {
            title: 'Mayor conversión',
            body: 'Más llamadas, más solicitudes de cotización, más trabajos agendados — las métricas directamente ligadas a los ingresos.',
          },
          {
            title: 'Mayor visibilidad local',
            body: 'Mejores rankings y más cobertura en el área metro, llevando más tráfico orgánico al sitio.',
          },
        ],
        resultsHeading: 'Resultados en 3 semanas',
        resultsBullets: [
          'La posición promedio en todos los pins mejoró de 18.9 a 13.1 — una mejora de 5.8 puntos.',
          'Antes, el negocio no posicionaba para el 71% de los pins. Después: el 79% de los pins posicionaba.',
          'En la segunda keyword: la participación de pins en el top 3 saltó del 41% al 90%, la mayoría en el puesto 1.',
        ],
        image: '/landing/case-studies/treecutting.webp',
        imageAlt:
          'Mapa de calor de SEO local antes y después para el servicio de tala de árboles en 3 semanas de optimización.',
        imageCaption:
          'Mapa de calor antes / después en la keyword principal — color del pin por ranking, dona con el porcentaje de pins posicionados.',
      },

      // 4 — Iluminación y decoración del hogar
      {
        slug: 'lightingdecor',
        industry: 'Iluminación y Decoración del Hogar',
        timeframe: '4 semanas',
        location: 'Showroom de lujo multi-generacional',
        heroStats: [
          { value: '12↑', label: 'Mejor posición promedio' },
          { value: '69.23%', label: 'Más pins posicionando' },
          { value: '5×', label: 'Más pins en las mejores posiciones' },
        ],
        intro:
          'Un negocio de iluminación y decoración con cuatro generaciones de historia y más de 20 showrooms de lujo. Construyen iluminación a medida de alta gama a precios que compiten con el retail masivo — una historia fuerte que no estaba llegando a los dueños de casa en línea.',
        strategyHeading: 'SEO local activado en dos keywords long-tail',
        strategyBody:
          'El objetivo era ganar rankings locales en dos keywords a nivel producto: "fans" (40 Q&A/semana durante 4 semanas) y "hugger fans" (30 Q&A/semana durante 3 semanas). El mapa de calor de SEO local rastreó cada pin en el área de servicio en ambas keywords en paralelo.',
        keyBenefits: [
          {
            title: 'Optimización SEO automatizada',
            body: 'El agente manejó el flujo de optimización de extremo a extremo, dejando al equipo del showroom enfocado en vender.',
          },
          {
            title: 'Mayor conversión',
            body: 'Más llamadas, más consultas web y más tráfico en tienda de personas que estaban activamente buscando la línea de producto.',
          },
          {
            title: 'Mayor visibilidad local',
            body: 'Mejores rankings en ambas keywords, mayor visibilidad metropolitana y más tráfico orgánico al sitio.',
          },
        ],
        resultsHeading: 'Resultados en 4 semanas',
        resultsBullets: [
          'La posición promedio en todos los pins mejoró de 13.1 a 6.8 — una mejora de 6.3 puntos.',
          'Antes, el negocio no posicionaba (o posicionaba mal) en el 49% de los pins. Después: el 100% de los pins posicionaba.',
          'Los pins en el top 10 saltaron de 16 a 29, con 8 de ellos llegando al top 3.',
        ],
        image: '/landing/case-studies/lightingdecor.webp',
        imageAlt:
          'Mapa de calor de SEO local antes y después para el showroom de iluminación y decoración en 4 semanas.',
        imageCaption:
          'Mapa de calor antes / después en la keyword principal — color del pin por ranking, dona con el porcentaje de pins posicionados.',
      },

      // 5 — Taller de auto glass
      {
        slug: 'autoglass',
        industry: 'Taller de Auto Glass',
        timeframe: '30 días',
        location: 'Taller independiente certificado',
        heroStats: [
          { value: '+159.74%', label: 'Llamadas desde SEO' },
          { value: '+126.42%', label: 'Impresiones del sitio' },
          { value: '+69.23%', label: 'Clics al sitio' },
        ],
        intro:
          'Un taller certificado de reemplazo de cristales fundado por mecánicos con años de oficio, con un equipo que se mantiene al día con técnicas y materiales. El taller ya tenía una reputación sólida en persona — pero el gasto en SEO era opaco, las herramientas estaban fragmentadas y los resultados imposibles de atribuir.',
        strategyHeading: 'Consolidando un stack de SEO fragmentado',
        strategyBody:
          'El taller estaba pagando varias herramientas especializadas — cada una con su propio panel, cada una con datos parciales, ninguna dando una lectura coherente de qué estaba funcionando. Reemplacé el stack con el SEO AI Agent para que el equipo pudiera ver rankings en tiempo real, automatizar las tareas recurrentes y actuar sobre una sola fuente de verdad.',
        keyBenefits: [
          {
            title: 'Publicación de GBP simplificada',
            body: 'Posts de Google Business Profile programados semanas por adelantado — actualizaciones consistentes y oportunas sin esfuerzo manual.',
          },
          {
            title: 'Cambios masivos de SEO en minutos',
            body: 'Cambios a nivel sitio que antes tomaban horas (actualizar encabezados en 50 páginas, refrescar meta titles) ahora se completan en menos de 30 minutos.',
          },
          {
            title: 'Tareas y sugerencias semanales',
            body: 'Un flujo continuo de recomendaciones mantuvo al taller adelante — refinando la estrategia mientras la competencia se movía, no después.',
          },
        ],
        resultsHeading: 'Resultados en 30 días',
        resultsBullets: [
          '1.091 llamadas en el mes de medición — desde 975 el mes anterior y 683 el mismo mes del año previo.',
          'Más de 100 formularios de contacto y solicitudes de cotización en el mismo periodo.',
          'Los clics subieron de 143 a 242, las impresiones de 10.6k a 13.4k, el CTR de 1.3% a 1.8% y la posición promedio de 22.9 a 19.6.',
          'Un aumento del 10% mes a mes en el volumen de llamadas vía GBP.',
        ],
        image: '/landing/case-studies/autoglass.webp',
        imageAlt:
          'Panel de Google Search Console mostrando el aumento en clics, impresiones, CTR y posición promedio en el periodo de medición de 30 días.',
        imageCaption:
          'Panel de Search Console — clics, impresiones, CTR promedio y posición promedio durante el periodo de 30 días.',
      },
    ],
    briefSection: {
      eyebrow: 'MÁS RESULTADOS',
      heading: 'Otras industrias, mismo método.',
      body: 'Cuatro casos más — mismo enfoque, misma velocidad, distintos rubros. Industrias mostradas sin nombres de empresa.',
    },
    briefCases: [
      {
        industry: 'Bufete de Abogados (DUI)',
        timeframe: '4 semanas',
        stats: [
          { value: '100%', label: 'Pins mejorados' },
          { value: '17.5↑', label: 'Mejor posición promedio' },
          { value: '88%', label: 'Pins en las mejores posiciones' },
        ],
        summary:
          'Mejora notable en cada ubicación rastreada tras desplegar el SEO AI Agent en el flujo de optimización — y cientos de horas de trabajo SEO manual eliminadas.',
      },
      {
        industry: 'Servicio de Limpieza',
        timeframe: '4 semanas',
        stats: [
          { value: '100%', label: 'Pins posicionando' },
          { value: '13↑', label: 'Mejor posición promedio' },
          { value: '46%', label: 'Pins en las mejores posiciones' },
        ],
        summary:
          'Ahora posiciona en un área de servicio amplia sin pagar publicidad — flujo de consultas sólido a una fracción del costo anterior.',
      },
      {
        industry: 'Bufete Transaccional (servicios completos)',
        timeframe: '4 semanas',
        stats: [
          { value: '87%', label: 'Pins mejorados' },
          { value: '100%', label: 'Pins en top 6' },
          { value: '85%', label: 'Pins en top 3' },
        ],
        summary:
          'De visibilidad media a dominar el pack local de 3 en toda el área de servicio, a un costo que el bufete podía justificar mes a mes.',
      },
      {
        industry: 'Cardiólogo e Internista',
        timeframe: '3 semanas',
        stats: [
          { value: '82%', label: 'Pins mejorados' },
          { value: '+16', label: 'Pins en top 3' },
          { value: '55.13%', label: 'Total de pins en top 3' },
        ],
        summary:
          'Dos keywords prioritarias subieron a las posiciones top 3 en toda el área de servicio en solo tres semanas — un ahorro sustancial frente al SEO manual.',
      },
    ],
    finalCta: {
      eyebrow: 'TU TURNO',
      heading: (
        <>
          ¿Quieres este tipo de <em>números</em> para tu negocio?
        </>
      ),
      body: 'Agenda una llamada estratégica. Hablaremos de dónde vienen tus clientes hoy, cómo se ve el panorama de búsqueda en tu área y qué tendríamos que poner en marcha para ver el mismo tipo de mejora. Sin compromiso.',
      bookLabel: 'Agenda una llamada',
      auditLabel: 'Auditoría instantánea gratis',
    },
    footer: {
      builtIn: 'HECHO EN MIAMI',
    },
  },
}

export default caseStudiesContent
