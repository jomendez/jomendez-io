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
    cardLabels: {
      scoreLabel: 'Keyword Ranking Score',
      tiers: {
        good: 'Good',
        medium: 'Medium',
        bad: 'Bad',
        unranked: 'Not ranking',
      },
      pins: (n) => (n === 1 ? '1 pin' : `${n} pins`),
    },
    hero: {
      eyebrow: 'CLIENT CASE STUDIES',
      headline: (
        <>
          From invisible online — to <em>fully booked</em>, in weeks.
        </>
      ),
      sub: 'Every business below was watching customers go to the competitor down the street — not because they did anything wrong, but because nobody could find them on Google. Here’s what changed, and how fast.',
      fineprint:
        'Industries are shown without business names to respect client privacy. Numbers and visuals are pulled directly from the live ranking dashboards.',
    },
    cases: [
      // 1 — Dental practice
      {
        slug: 'dental',
        industry: 'Dental Practice',
        timeframe: '20 days',
        location: 'Highly competitive metro area',
        heroStats: [
          { value: '7×', label: 'More new-patient searches landing on them' },
          { value: '84%', label: 'Of the neighborhood now sees them' },
          { value: '20 days', label: 'From invisible to the top of the map' },
        ],
        intro:
          'Decade of happy patients. Strong reviews. Good people. But every "dentist near me" search in the area was sending new patients to the corporate chain four blocks over. The practice was watching its new-patient calendar dry up — not because anything was broken, but because nobody could find them online.',
        strategyHeading: 'The pain we fixed',
        strategyBody:
          'For 20 days the family watched their map presence go from red to green. Not by rebuilding the website, not by burning months on SEO consultants, not by adding more to the front-desk team’s plate. We put the system in place once. Twenty days later the practice was the top result across the 2-mile radius around the office — the same searches that used to send patients to the chain.',
        keyBenefits: [
          {
            title: 'New patients can finally find them',
            body: 'When someone in the neighborhood searches "dentist near me," the practice is the result they see first. The phone rings instead of going dark.',
          },
          {
            title: 'A decade of reputation finally gets to work',
            body: 'The reviews, the referrals, the relationships — all of it was being held back by being invisible online. Now the visibility matches the reputation.',
          },
          {
            title: 'Zero added work for the team',
            body: 'No new dashboards to learn. No SEO homework. No "make sure to post on Google every Friday." The system runs in the background while the practice runs itself.',
          },
        ],
        resultsHeading: 'What changed in 20 days',
        resultsBullets: [
          'From 1 location ranking in the top 3 to 7 — a 7× jump in the search results that actually drive calls.',
          'Top-10 visibility grew from 2 locations to 13 — that\'s 6× more of the neighborhood seeing the practice when they search.',
          'Across the whole service area, the share of locations not ranking at all dropped from 82% to 16%. The map went from red to green.',
          'Twenty days. Not twenty weeks. Every week of waiting was patients walking into the chain instead.',
        ],
        imageEyebrow: 'RANKING HEATMAP · 20 DAYS',
        images: [
          {
            map: '/landing/case-studies/maps/dental_1.webp',
            alt: 'Local SEO heatmap for the dental practice at day 1: most pins are red (not ranking).',
            label: 'DAY 1',
            keyword: 'dentist near me',
            score: '18.8',
            legend: [
              { tier: 'good', pins: 1, percent: 3 },
              { tier: 'medium', pins: 2, percent: 5 },
              { tier: 'bad', pins: 4, percent: 10 },
              { tier: 'unranked', pins: 32, percent: 82 },
            ],
          },
          {
            map: '/landing/case-studies/maps/dental_2.webp',
            alt: 'Local SEO heatmap for the dental practice at day 10: a mix of red, orange, and green pins as rankings improve.',
            label: 'DAY 10',
            keyword: 'dentist near me',
            score: '14.3',
            legend: [
              { tier: 'good', pins: 4, percent: 10 },
              { tier: 'medium', pins: 7, percent: 18 },
              { tier: 'bad', pins: 14, percent: 36 },
              { tier: 'unranked', pins: 14, percent: 36 },
            ],
          },
          {
            map: '/landing/case-studies/maps/dental_3.webp',
            alt: 'Local SEO heatmap for the dental practice at day 20: green and orange pins dominate, signalling top rankings.',
            label: 'DAY 20',
            keyword: 'dentist near me',
            score: '9.5',
            legend: [
              { tier: 'good', pins: 7, percent: 18 },
              { tier: 'medium', pins: 13, percent: 33 },
              { tier: 'bad', pins: 13, percent: 33 },
              { tier: 'unranked', pins: 6, percent: 15 },
            ],
          },
        ],
        imageCaption:
          'Each pin is one tracked location across the service area. The donut shows the share of pins in each ranking tier — green for top positions, orange for mid, light red for low, dark red for unranked.',
      },

      // 2 — Chiropractic center
      {
        slug: 'chiropractic',
        industry: 'Chiropractic Center',
        timeframe: '3 weeks',
        location: 'Established multi-practitioner clinic',
        heroStats: [
          { value: '6×', label: 'More new patients can find them' },
          { value: '97%', label: 'Of the service area now sees them' },
          { value: '3 weeks', label: 'From buried to top of search' },
        ],
        intro:
          'Forty years of expertise. A team of practitioners that actually fixes the root cause of pain — not just the symptom. Loyal patients who refer their families. Everything about the business was strong, except one thing: nobody new could find them. Younger, sleeker competitors were eating the local market while the people who actually needed care kept clicking the wrong website.',
        strategyHeading: 'The pain we fixed',
        strategyBody:
          'For 3 weeks the center had been watching their best months as a "back when" memory. We put the system in place and let it work. No new dashboards for the team. No "you need to post on Google three times a week." Three weeks later, the practice was dominating the local search results their competitors had been holding hostage.',
        keyBenefits: [
          {
            title: 'The reputation finally has reach',
            body: 'Forty years of expertise should not lose to a clinic with a slicker website. Now the search results match the expertise — and the new patient calls follow.',
          },
          {
            title: 'No more bleeding to younger competitors',
            body: 'When someone in pain searches "chiropractic center," they find the practice that\'s actually been doing this for decades — not the one that\'s best at marketing.',
          },
          {
            title: 'Hands off the marketing wheel',
            body: 'The team focuses on patients. The system handles the visibility in the background. The owner stops being a part-time SEO manager.',
          },
        ],
        resultsHeading: 'What changed in 3 weeks',
        resultsBullets: [
          'Top-10 visibility went from 4 locations to 24 — six times as much of the service area now sees the practice when they search.',
          'Of those 24, 18 landed in the top 3 results — the only spots people actually click on.',
          'Before: invisible across 85% of the neighborhood. After: visible across 97%. The map went from a sea of red to a wall of green.',
          'Three weeks. Decades of trust finally have the discoverability to match.',
        ],
        imageEyebrow: 'RANKING HEATMAP · 3 WEEKS',
        images: [
          {
            map: '/landing/case-studies/maps/chiropractic_before.webp',
            alt: 'Local SEO heatmap before optimization: most pins are red (not ranking).',
            label: 'BEFORE',
            keyword: 'chiropractic center',
            score: '18.7',
            legend: [
              { tier: 'good', pins: 2, percent: 5 },
              { tier: 'medium', pins: 2, percent: 5 },
              { tier: 'bad', pins: 2, percent: 5 },
              { tier: 'unranked', pins: 33, percent: 85 },
            ],
          },
          {
            map: '/landing/case-studies/maps/chiropractic_after.webp',
            alt: 'Local SEO heatmap after 3 weeks: green and orange pins dominate, with the donut showing 46% ranking in top positions.',
            label: 'AFTER · 3 WEEKS',
            keyword: 'chiropractic center',
            score: '6.3',
            legend: [
              { tier: 'good', pins: 18, percent: 46 },
              { tier: 'medium', pins: 6, percent: 15 },
              { tier: 'bad', pins: 14, percent: 36 },
              { tier: 'unranked', pins: 1, percent: 3 },
            ],
          },
        ],
        imageCaption:
          'Each pin is one tracked location across the service area. The donut shows the share of pins in each ranking tier — green for top positions, orange for mid, light red for low, dark red for unranked.',
      },

      // 3 — Tree cutting service
      {
        slug: 'treecutting',
        industry: 'Tree-Cutting Service',
        timeframe: '3 weeks',
        location: 'Family-owned, high-competition urban area',
        heroStats: [
          { value: '90%', label: 'Of searches now go to them, not the franchise' },
          { value: '+19', label: 'New top-3 positions across the metro' },
          { value: '3 weeks', label: 'From outranked to outranking' },
        ],
        intro:
          'Family-owned. Decade in the business. Real expertise — they actually know what they\'re doing on a tree. But the bigger franchise chains were running ads, dominating every "tree pruning" and "tree removal" search in the city, and scooping up jobs that should have been theirs. The phone rang when referrals sent someone — and went dead when they didn\'t.',
        strategyHeading: 'The pain we fixed',
        strategyBody:
          'Word of mouth has a ceiling. The franchise chains had broken through it. We put the system in place and let the family stay on the job. Three weeks later, when somebody in the metro searched for tree services, the family business was the first result — not the franchise spending six figures on ads.',
        keyBenefits: [
          {
            title: 'Calls keep coming while the crew\'s on the truck',
            body: 'You don\'t need to be at the office to win the job. People search, they call, you call them back from the next site. The pipeline runs whether you\'re running it or not.',
          },
          {
            title: 'Beat the franchises at their own game',
            body: 'The chains have budget. You have trust, expertise, and a real reputation. The system gives the small business the visibility to compete on the only field that matters — search.',
          },
          {
            title: 'Stop trading work for marketing time',
            body: 'Every hour spent fighting Google is an hour not spent on a job. The system runs in the background while you do what you\'re actually paid for.',
          },
        ],
        resultsHeading: 'What changed in 3 weeks',
        resultsBullets: [
          'Share of top-3 positions across the service area jumped from 41% to 90% — most of those at rank 1. The franchises stopped being the default answer.',
          'Across the whole metro, the share of locations not ranking dropped from 71% to 21%. The map went from red to green.',
          'Three weeks. Faster than the franchise chains can buy ad space.',
        ],
        imageEyebrow: 'RANKING HEATMAP · 3 WEEKS',
        images: [
          {
            map: '/landing/case-studies/maps/treecutting_before.webp',
            alt: 'Local SEO heatmap before optimization on the secondary keyword: mixed orange and green pins, with the donut showing 41% in top positions.',
            label: 'BEFORE',
            keyword: 'bronx tree service',
            score: '4',
            legend: [
              { tier: 'good', pins: 16, percent: 41 },
              { tier: 'medium', pins: 21, percent: 54 },
              { tier: 'bad', pins: 2, percent: 5 },
              { tier: 'unranked', pins: 0, percent: 0 },
            ],
          },
          {
            map: '/landing/case-studies/maps/treecutting_after.webp',
            alt: 'Local SEO heatmap after 3 weeks: green pins dominate, with the donut showing 90% ranking in top positions.',
            label: 'AFTER · 3 WEEKS',
            keyword: 'bronx tree service',
            score: '1.7',
            legend: [
              { tier: 'good', pins: 35, percent: 90 },
              { tier: 'medium', pins: 4, percent: 10 },
              { tier: 'bad', pins: 0, percent: 0 },
              { tier: 'unranked', pins: 0, percent: 0 },
            ],
          },
        ],
        imageCaption:
          'Each pin is one tracked location across the service area. The donut shows the share of pins in each ranking tier — green for top positions, orange for mid, light red for low, dark red for unranked.',
      },

      // 4 — Lighting & home decor
      {
        slug: 'lightingdecor',
        industry: 'Lighting & Home-Decor Retail',
        timeframe: '4 weeks',
        location: 'Multi-generation luxury showroom',
        heroStats: [
          { value: '100%', label: 'Of the metro now sees the showroom' },
          { value: '+13', label: 'New top-10 spots driving foot traffic' },
          { value: '4 weeks', label: 'From invisible to in front of buyers' },
        ],
        intro:
          'Four generations of craftsmanship. Over twenty luxury showrooms. Premium custom lighting at prices that actually compete with mass retail — a real story to tell. But online, the cheap mass-market brands were getting every "fans" search. Showroom visits dropping. Premium product losing to commodity. The website looked fine; it just didn\'t bring anyone in.',
        strategyHeading: 'The pain we fixed',
        strategyBody:
          'Premium product needs premium visibility. We put the system in place and let four generations of brand do what it does — without making anyone in the showroom learn a new dashboard. Four weeks later, when someone in the metro searched for the actual products this business sells, they found the showroom — not the discount retailer two clicks away.',
        keyBenefits: [
          {
            title: 'The premium product gets premium reach',
            body: 'When someone searches for a quality product, they find the place that actually sells one — not the algorithm-gaming discount brand that out-spent for the spot.',
          },
          {
            title: 'Foot traffic comes back',
            body: 'Search drives traffic. Traffic drives walk-ins. Walk-ins drive sales. The showroom fills back up with people who came in because they could finally find the place.',
          },
          {
            title: 'Brand reputation matched with brand visibility',
            body: 'Four generations of craft does not deserve to lose to a paid ad. Now the search results match the brand.',
          },
        ],
        resultsHeading: 'What changed in 4 weeks',
        resultsBullets: [
          'Across the entire service area, 100% of tracked locations now rank — up from just 51% before. The map went from invisible to visible everywhere.',
          'Top-10 visibility nearly doubled (16 → 29 locations). That\'s where people decide which showroom to drive to.',
          'Eight of those 29 landed in the top 3 — the only spots that actually pull foot traffic.',
          'Four weeks. Faster than the discount brand can reorder inventory.',
        ],
        imageEyebrow: 'RANKING HEATMAP · 4 WEEKS',
        images: [
          {
            map: '/landing/case-studies/maps/lightingdecor_before.webp',
            alt: 'Local SEO heatmap before optimization on the primary keyword: mixed pins with the donut showing 49% unranked.',
            label: 'BEFORE',
            keyword: 'fans',
            score: '13.1',
            legend: [
              { tier: 'good', pins: 8, percent: 21 },
              { tier: 'medium', pins: 8, percent: 21 },
              { tier: 'bad', pins: 4, percent: 10 },
              { tier: 'unranked', pins: 19, percent: 49 },
            ],
          },
          {
            map: '/landing/case-studies/maps/lightingdecor_after.webp',
            alt: 'Local SEO heatmap after 4 weeks: green and orange pins dominate.',
            label: 'AFTER · 4 WEEKS',
            keyword: 'fans',
            score: '6.8',
            legend: [
              { tier: 'good', pins: 8, percent: 21 },
              { tier: 'medium', pins: 21, percent: 54 },
              { tier: 'bad', pins: 10, percent: 26 },
              { tier: 'unranked', pins: 0, percent: 0 },
            ],
          },
        ],
        imageCaption:
          'Each pin is one tracked location across the service area. The donut shows the share of pins in each ranking tier — green for top positions, orange for mid, light red for low, dark red for unranked.',
      },

      // 5 — Auto glass repair
      {
        slug: 'autoglass',
        industry: 'Auto Glass Repair',
        timeframe: '30 days',
        location: 'Certified independent repair shop',
        heroStats: [
          { value: '1,091', label: 'Calls in the first month — vs 683 the year before' },
          { value: '+160%', label: 'More calls from search than the year prior' },
          { value: '30 days', label: 'From opaque SEO spend to attributable pipeline' },
        ],
        intro:
          'Certified mechanics. Honest pricing. Excellent reputation in person. But online, the shop was bleeding money — paying for four or five SEO tools, each with its own dashboard, each showing a different story, none of them telling the owner whether the money was actually working. National chains were running aggressive ads. Customer calls were stuck at "OK." The owner had no idea what to cancel and what to keep paying for.',
        strategyHeading: 'The pain we fixed',
        strategyBody:
          'The shop didn\'t need more SEO tools — it needed fewer, and one that actually moved the needle. We pulled the plug on the fragmented stack, put one system in place, and let it run for 30 days. The call volume answered the question the dashboards never had.',
        keyBenefits: [
          {
            title: 'The phone rings — and you know why',
            body: 'Calls went from "we hope it\'s the SEO" to "yes, it\'s the SEO." One dashboard. One source of truth. No more guessing whether the marketing is working.',
          },
          {
            title: 'Beat the national chains on the only field that matters',
            body: 'Chains spend more on ads than the shop earns in revenue. The shop won the search rankings anyway — without buying a single ad.',
          },
          {
            title: 'Hours back every week',
            body: 'No more juggling 4-5 SEO tools. No more "did I post on Google today?" The owner gets time back to actually run the shop.',
          },
        ],
        resultsHeading: 'What changed in 30 days',
        resultsBullets: [
          '1,091 calls in the measurement month. Same month a year earlier: 683. That\'s 408 more customers reaching out — in one month.',
          'Over 100 contact-form submissions and quote requests on top of the calls. The pipeline filled up.',
          'Website clicks jumped from 143 to 242 (+69%). Impressions from 10.6k to 13.4k (+26%). The shop got found more, and clicked more — both up.',
          'A 10% month-over-month bump in call volume that kept compounding. Not a one-month spike. A new floor.',
        ],
        imageEyebrow: 'SEARCH CONSOLE · 30-DAY WINDOW',
        images: [
          {
            fullImage: '/landing/case-studies/autoglass.webp',
            alt: 'Google Search Console dashboard showing the increase in clicks, impressions, CTR, and average ranking position across the 30-day measurement window.',
            label: null,
          },
        ],
        imageCaption:
          'Search Console comparison view — clicks, impressions, average CTR, and average ranking position over the 30-day window vs the prior period.',
      },
    ],
    briefSection: {
      eyebrow: 'MORE WINS',
      heading: 'Different business. Same pain. Same fix.',
      body: 'Four more local businesses that were losing customers to better-marketed competitors — until they weren\'t. Same playbook, different verticals.',
    },
    briefCases: [
      {
        industry: 'DUI Law Firm',
        timeframe: '4 weeks',
        stats: [
          { value: '88%', label: 'Of urgent searches now go to them' },
          { value: '+17', label: 'Top spots in 4 weeks' },
          { value: '4 weeks', label: 'From buried to first call' },
        ],
        summary:
          'When someone gets arrested at 2am, they search "DUI lawyer near me" and call the first result. This firm was the third or fourth result. Now they\'re the first call — across 88% of the service area.',
      },
      {
        industry: 'Cleaning Service',
        timeframe: '4 weeks',
        stats: [
          { value: '100%', label: 'Of the metro now sees them' },
          { value: '13↑', label: 'Places higher in local search' },
          { value: '0', label: 'Dollars spent on ads' },
        ],
        summary:
          'They were paying for Facebook ads to fill the schedule. Now the schedule fills from organic search across the whole metro — and the ad budget went to a service tech instead.',
      },
      {
        industry: 'Full-Service Law Firm',
        timeframe: '4 weeks',
        stats: [
          { value: '85%', label: 'Top-3 dominance across the area' },
          { value: '100%', label: 'Top-6 across every tracked spot' },
          { value: '4 weeks', label: 'From mid-pack to default choice' },
        ],
        summary:
          'When prospective clients searched, the firm wasn\'t the obvious answer. Now they own the local 3-pack — the only results that get clicked — and they\'re the default choice in the area.',
      },
      {
        industry: 'Cardiologist & Internist',
        timeframe: '3 weeks',
        stats: [
          { value: '55%', label: 'Top-3 share on priority keywords' },
          { value: '+16', label: 'New first-page positions' },
          { value: '3 weeks', label: 'From invisible to first choice' },
        ],
        summary:
          'Two of the highest-stakes searches in any patient\'s life — and the practice wasn\'t showing up. Three weeks later they were the first result on both. Patients who need real care can find them now.',
      },
    ],
    finalCta: {
      eyebrow: 'YOUR TURN',
      heading: (
        <>
          Your business — but with the <em>phone ringing.</em>
        </>
      ),
      body: 'If you\'re watching customers go to competitors who showed up first on Google, or paying for ads just to stay visible, or burning hours every week on marketing that may or may not be working — we should talk. Twenty minutes. Free. No pitch. Just a clear read on what would change for your business, and how fast.',
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
    cardLabels: {
      scoreLabel: 'Puntaje de Posicionamiento',
      tiers: {
        good: 'Top',
        medium: 'Medio',
        bad: 'Bajo',
        unranked: 'Sin posicionar',
      },
      pins: (n) => (n === 1 ? '1 pin' : `${n} pins`),
    },
    hero: {
      eyebrow: 'CASOS DE ÉXITO DE CLIENTES',
      headline: (
        <>
          De invisibles en línea — a <em>la agenda llena</em>, en semanas.
        </>
      ),
      sub: 'Cada negocio aquí abajo estaba viendo cómo sus clientes se iban con la competencia — no porque hicieran algo mal, sino porque nadie los encontraba en Google. Esto fue lo que cambió, y qué tan rápido.',
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
          { value: '7×', label: 'Más búsquedas de pacientes nuevos llegan a ellos' },
          { value: '84%', label: 'Del barrio ya los ve en el mapa' },
          { value: '20 días', label: 'De invisibles al top del mapa' },
        ],
        intro:
          'Una década de pacientes felices. Reseñas sólidas. Buena gente. Pero cada búsqueda de "dentista cerca de mí" en la zona enviaba a los pacientes nuevos a la cadena corporativa que está a cuatro cuadras. La agenda de pacientes nuevos se estaba secando — no por hacer algo mal, sino porque nadie podía encontrarlos en línea.',
        strategyHeading: 'El dolor que arreglamos',
        strategyBody:
          'Durante 20 días, el consultorio vio su presencia en el mapa pasar de roja a verde. Sin rehacer el sitio web. Sin meses con consultores de SEO. Sin sumarle nada a la recepcionista. Pusimos el sistema en marcha una vez. Veinte días después, el consultorio era el primer resultado en el radio de 2 millas — las mismas búsquedas que antes se llevaba la cadena.',
        keyBenefits: [
          {
            title: 'Los pacientes nuevos por fin los encuentran',
            body: 'Cuando alguien del barrio busca "dentista cerca de mí," el consultorio es el primer resultado. El teléfono suena en vez de quedarse en silencio.',
          },
          {
            title: 'Una década de reputación por fin trabaja',
            body: 'Las reseñas, los referidos, las relaciones — todo eso estaba frenado por la invisibilidad en línea. Ahora la visibilidad coincide con la reputación.',
          },
          {
            title: 'Cero trabajo extra para el equipo',
            body: 'Sin paneles nuevos que aprender. Sin tareas de SEO. Sin "recordatorio: postear en Google los viernes." El sistema corre en segundo plano mientras el consultorio funciona.',
          },
        ],
        resultsHeading: 'Lo que cambió en 20 días',
        resultsBullets: [
          'De 1 ubicación en el top 3 pasó a 7 — un salto de 7× en los resultados de búsqueda que realmente generan llamadas.',
          'La visibilidad en el top 10 creció de 2 a 13 ubicaciones — 6 veces más del barrio viendo al consultorio cuando buscan.',
          'En toda el área de servicio, la fracción de ubicaciones sin posicionar bajó del 82% al 16%. El mapa pasó de rojo a verde.',
          'Veinte días. No veinte semanas. Cada semana de espera era un paciente entrando a la cadena en vez del consultorio.',
        ],
        imageEyebrow: 'MAPA DE CALOR · 20 DÍAS',
        images: [
          {
            map: '/landing/case-studies/maps/dental_1.webp',
            alt: 'Mapa de calor de SEO local para el consultorio dental en el día 1: la mayoría de los pins están rojos (sin posicionar).',
            label: 'DÍA 1',
            keyword: 'dentist near me',
            score: '18.8',
            legend: [
              { tier: 'good', pins: 1, percent: 3 },
              { tier: 'medium', pins: 2, percent: 5 },
              { tier: 'bad', pins: 4, percent: 10 },
              { tier: 'unranked', pins: 32, percent: 82 },
            ],
          },
          {
            map: '/landing/case-studies/maps/dental_2.webp',
            alt: 'Mapa de calor en el día 10: mezcla de pins rojos, naranjas y verdes a medida que mejoran las posiciones.',
            label: 'DÍA 10',
            keyword: 'dentist near me',
            score: '14.3',
            legend: [
              { tier: 'good', pins: 4, percent: 10 },
              { tier: 'medium', pins: 7, percent: 18 },
              { tier: 'bad', pins: 14, percent: 36 },
              { tier: 'unranked', pins: 14, percent: 36 },
            ],
          },
          {
            map: '/landing/case-studies/maps/dental_3.webp',
            alt: 'Mapa de calor en el día 20: predominan los pins verdes y naranjas, indicando posiciones top.',
            label: 'DÍA 20',
            keyword: 'dentist near me',
            score: '9.5',
            legend: [
              { tier: 'good', pins: 7, percent: 18 },
              { tier: 'medium', pins: 13, percent: 33 },
              { tier: 'bad', pins: 13, percent: 33 },
              { tier: 'unranked', pins: 6, percent: 15 },
            ],
          },
        ],
        imageCaption:
          'Cada pin es una ubicación rastreada en el área de servicio. La dona muestra el porcentaje de pins por nivel — verde para posiciones top, naranja para medias, rojo para sin posicionar.',
      },

      // 2 — Centro quiropráctico
      {
        slug: 'chiropractic',
        industry: 'Centro Quiropráctico',
        timeframe: '3 semanas',
        location: 'Clínica multi-profesional ya establecida',
        heroStats: [
          { value: '6×', label: 'Más pacientes nuevos pueden encontrarlos' },
          { value: '97%', label: 'Del área de servicio ahora los ve' },
          { value: '3 semanas', label: 'De enterrados al top del buscador' },
        ],
        intro:
          'Cuarenta años de experiencia. Un equipo que de verdad trata la raíz del dolor — no solo el síntoma. Pacientes leales que refieren a su familia. Todo era fuerte en el negocio, menos una cosa: nadie nuevo los encontraba. Competidores más jóvenes y con mejor sitio se estaban llevando el mercado local, mientras la gente que en realidad necesitaba el tratamiento hacía clic en el sitio equivocado.',
        strategyHeading: 'El dolor que arreglamos',
        strategyBody:
          'Por 3 semanas el centro estaba viendo sus mejores meses como un "esos eran otros tiempos." Pusimos el sistema en marcha y lo dejamos trabajar. Sin paneles nuevos para el equipo. Sin "tienes que postear en Google tres veces a la semana." Tres semanas después, el consultorio dominaba los resultados locales que la competencia tenía secuestrados.',
        keyBenefits: [
          {
            title: 'La reputación por fin tiene alcance',
            body: 'Cuarenta años de experiencia no debería perderle a una clínica con sitio web más bonito. Ahora los resultados de búsqueda van con la experiencia — y las llamadas de pacientes nuevos vienen detrás.',
          },
          {
            title: 'Dejar de perder pacientes con la competencia más joven',
            body: 'Cuando alguien con dolor busca "centro quiropráctico," encuentra al consultorio que de verdad lleva décadas en esto — no al que es mejor haciendo marketing.',
          },
          {
            title: 'Soltar el volante del marketing',
            body: 'El equipo se enfoca en los pacientes. El sistema maneja la visibilidad en segundo plano. El dueño deja de ser un gerente de SEO de medio tiempo.',
          },
        ],
        resultsHeading: 'Lo que cambió en 3 semanas',
        resultsBullets: [
          'La visibilidad en el top 10 pasó de 4 ubicaciones a 24 — seis veces más del área de servicio ahora ve al consultorio cuando buscan.',
          'De esas 24, 18 llegaron al top 3 — los únicos puestos en los que la gente realmente hace clic.',
          'Antes: invisibles en el 85% del barrio. Después: visibles en el 97%. El mapa pasó de un mar de rojo a una pared verde.',
          'Tres semanas. Décadas de confianza por fin con la visibilidad para acompañarla.',
        ],
        imageEyebrow: 'MAPA DE CALOR · 3 SEMANAS',
        images: [
          {
            map: '/landing/case-studies/maps/chiropractic_before.webp',
            alt: 'Mapa de calor antes de la optimización: la mayoría de los pins están rojos (sin posicionar).',
            label: 'ANTES',
            keyword: 'chiropractic center',
            score: '18.7',
            legend: [
              { tier: 'good', pins: 2, percent: 5 },
              { tier: 'medium', pins: 2, percent: 5 },
              { tier: 'bad', pins: 2, percent: 5 },
              { tier: 'unranked', pins: 33, percent: 85 },
            ],
          },
          {
            map: '/landing/case-studies/maps/chiropractic_after.webp',
            alt: 'Mapa de calor después de 3 semanas: predominan los pins verdes y naranjas, con la dona mostrando 46% en las mejores posiciones.',
            label: 'DESPUÉS · 3 SEMANAS',
            keyword: 'chiropractic center',
            score: '6.3',
            legend: [
              { tier: 'good', pins: 18, percent: 46 },
              { tier: 'medium', pins: 6, percent: 15 },
              { tier: 'bad', pins: 14, percent: 36 },
              { tier: 'unranked', pins: 1, percent: 3 },
            ],
          },
        ],
        imageCaption:
          'Cada pin es una ubicación rastreada en el área de servicio. La dona muestra el porcentaje de pins por nivel — verde para posiciones top, naranja para medias, rojo para sin posicionar.',
      },

      // 3 — Servicio de tala de árboles
      {
        slug: 'treecutting',
        industry: 'Servicio de Tala de Árboles',
        timeframe: '3 semanas',
        location: 'Negocio familiar, zona urbana de alta competencia',
        heroStats: [
          { value: '90%', label: 'De las búsquedas ahora van a ellos, no a la franquicia' },
          { value: '+19', label: 'Nuevos puestos top 3 en toda la metro' },
          { value: '3 semanas', label: 'De ser superados a superar' },
        ],
        intro:
          'Negocio familiar. Una década en el oficio. Conocimiento real — saben de verdad lo que hacen arriba de un árbol. Pero las franquicias grandes corrían anuncios, dominaban toda búsqueda de "poda de árboles" o "remoción de árboles" en la ciudad, y se llevaban trabajos que deberían haber sido suyos. El teléfono sonaba cuando los referidos los enviaban — y se quedaba en silencio cuando no.',
        strategyHeading: 'El dolor que arreglamos',
        strategyBody:
          'El boca a boca tiene techo. Las franquicias ya lo habían roto. Pusimos el sistema en marcha y dejamos a la familia en el trabajo. Tres semanas después, cuando alguien en la metro buscaba un servicio de árboles, el negocio familiar era el primer resultado — no la franquicia que se gasta seis cifras en anuncios.',
        keyBenefits: [
          {
            title: 'Las llamadas entran mientras la cuadrilla está en el camión',
            body: 'No tienes que estar en la oficina para ganar el trabajo. La gente busca, llama, y tú devuelves la llamada desde el siguiente sitio. El pipeline corre lo manejes o no.',
          },
          {
            title: 'Ganarles a las franquicias en su propio juego',
            body: 'Las cadenas tienen presupuesto. Tú tienes confianza, oficio y reputación real. El sistema le da al negocio chico la visibilidad para competir en el único campo que importa — el buscador.',
          },
          {
            title: 'Dejar de cambiar trabajo por tiempo de marketing',
            body: 'Cada hora peleando con Google es una hora que no estás en un trabajo. El sistema corre en segundo plano mientras tú haces aquello por lo que de verdad te pagan.',
          },
        ],
        resultsHeading: 'Lo que cambió en 3 semanas',
        resultsBullets: [
          'La participación de top 3 en toda el área de servicio saltó del 41% al 90% — la mayoría en el puesto 1. Las franquicias dejaron de ser la respuesta por defecto.',
          'En toda la metro, la fracción de ubicaciones sin posicionar bajó del 71% al 21%. El mapa pasó de rojo a verde.',
          'Tres semanas. Más rápido de lo que las franquicias tardan en comprar espacios publicitarios.',
        ],
        imageEyebrow: 'MAPA DE CALOR · 3 SEMANAS',
        images: [
          {
            map: '/landing/case-studies/maps/treecutting_before.webp',
            alt: 'Mapa de calor antes de la optimización en la keyword secundaria: pins naranjas y verdes mezclados, dona mostrando 41% en posiciones top.',
            label: 'ANTES',
            keyword: 'bronx tree service',
            score: '4',
            legend: [
              { tier: 'good', pins: 16, percent: 41 },
              { tier: 'medium', pins: 21, percent: 54 },
              { tier: 'bad', pins: 2, percent: 5 },
              { tier: 'unranked', pins: 0, percent: 0 },
            ],
          },
          {
            map: '/landing/case-studies/maps/treecutting_after.webp',
            alt: 'Mapa de calor después de 3 semanas: dominan los pins verdes con la dona mostrando 90% en las mejores posiciones.',
            label: 'DESPUÉS · 3 SEMANAS',
            keyword: 'bronx tree service',
            score: '1.7',
            legend: [
              { tier: 'good', pins: 35, percent: 90 },
              { tier: 'medium', pins: 4, percent: 10 },
              { tier: 'bad', pins: 0, percent: 0 },
              { tier: 'unranked', pins: 0, percent: 0 },
            ],
          },
        ],
        imageCaption:
          'Cada pin es una ubicación rastreada en el área de servicio. La dona muestra el porcentaje de pins por nivel — verde para posiciones top, naranja para medias, rojo para sin posicionar.',
      },

      // 4 — Iluminación y decoración del hogar
      {
        slug: 'lightingdecor',
        industry: 'Iluminación y Decoración del Hogar',
        timeframe: '4 semanas',
        location: 'Showroom de lujo multi-generacional',
        heroStats: [
          { value: '100%', label: 'De la metro ya ve el showroom' },
          { value: '+13', label: 'Nuevos puestos top 10 que generan tráfico' },
          { value: '4 semanas', label: 'De invisibles a estar al frente del comprador' },
        ],
        intro:
          'Cuatro generaciones de oficio. Más de veinte showrooms de lujo. Iluminación a medida de alta gama a precios que de verdad compiten con el retail masivo — una historia real para contar. Pero en línea, las marcas baratas se llevaban cada búsqueda de "fans." Visitas al showroom cayendo. El producto premium perdiéndole al commodity. El sitio web se veía bien; simplemente no traía a nadie.',
        strategyHeading: 'El dolor que arreglamos',
        strategyBody:
          'Producto premium necesita visibilidad premium. Pusimos el sistema en marcha y dejamos que cuatro generaciones de marca hicieran lo que hacen — sin obligar a nadie del showroom a aprender un panel nuevo. Cuatro semanas después, cuando alguien en la metro buscaba los productos que de verdad vende este negocio, encontraba el showroom — no la tienda de descuento dos clics más allá.',
        keyBenefits: [
          {
            title: 'El producto premium recibe alcance premium',
            body: 'Cuando alguien busca calidad, encuentra al lugar que de verdad la vende — no a la marca de descuento que se sacó el primer puesto con presupuesto publicitario.',
          },
          {
            title: 'Vuelve el tráfico al showroom',
            body: 'Las búsquedas traen tráfico. El tráfico trae visitas. Las visitas traen ventas. El showroom se llena otra vez con gente que entró porque por fin pudo encontrar el lugar.',
          },
          {
            title: 'Reputación de marca acompañada por visibilidad de marca',
            body: 'Cuatro generaciones de oficio no merece perderle a un anuncio pagado. Ahora los resultados de búsqueda van con la marca.',
          },
        ],
        resultsHeading: 'Lo que cambió en 4 semanas',
        resultsBullets: [
          'En toda el área de servicio, el 100% de las ubicaciones rastreadas ahora posicionan — desde apenas el 51% antes. El mapa pasó de invisible a visible en todas partes.',
          'La visibilidad en el top 10 casi se duplicó (16 → 29 ubicaciones). Ahí es donde la gente decide a qué showroom manejar.',
          'Ocho de esas 29 llegaron al top 3 — los únicos puestos que en serio mueven tráfico al showroom.',
          'Cuatro semanas. Más rápido de lo que la marca de descuento tarda en reabastecer inventario.',
        ],
        imageEyebrow: 'MAPA DE CALOR · 4 SEMANAS',
        images: [
          {
            map: '/landing/case-studies/maps/lightingdecor_before.webp',
            alt: 'Mapa de calor antes de la optimización en la keyword principal: pins mezclados con la dona mostrando 49% sin posicionar.',
            label: 'ANTES',
            keyword: 'fans',
            score: '13.1',
            legend: [
              { tier: 'good', pins: 8, percent: 21 },
              { tier: 'medium', pins: 8, percent: 21 },
              { tier: 'bad', pins: 4, percent: 10 },
              { tier: 'unranked', pins: 19, percent: 49 },
            ],
          },
          {
            map: '/landing/case-studies/maps/lightingdecor_after.webp',
            alt: 'Mapa de calor después de 4 semanas: dominan los pins verdes y naranjas.',
            label: 'DESPUÉS · 4 SEMANAS',
            keyword: 'fans',
            score: '6.8',
            legend: [
              { tier: 'good', pins: 8, percent: 21 },
              { tier: 'medium', pins: 21, percent: 54 },
              { tier: 'bad', pins: 10, percent: 26 },
              { tier: 'unranked', pins: 0, percent: 0 },
            ],
          },
        ],
        imageCaption:
          'Cada pin es una ubicación rastreada en el área de servicio. La dona muestra el porcentaje de pins por nivel — verde para posiciones top, naranja para medias, rojo para sin posicionar.',
      },

      // 5 — Taller de auto glass
      {
        slug: 'autoglass',
        industry: 'Taller de Auto Glass',
        timeframe: '30 días',
        location: 'Taller independiente certificado',
        heroStats: [
          { value: '1.091', label: 'Llamadas el primer mes — vs 683 el año anterior' },
          { value: '+160%', label: 'Más llamadas desde búsqueda que el año previo' },
          { value: '30 días', label: 'De gasto SEO opaco a pipeline medible' },
        ],
        intro:
          'Mecánicos certificados. Precios honestos. Excelente reputación en persona. Pero en línea, el taller estaba sangrando dinero — pagando por cuatro o cinco herramientas de SEO, cada una con su propio panel, cada una contando una historia distinta, ninguna diciéndole al dueño si el dinero estaba funcionando. Las cadenas nacionales corrían anuncios agresivos. Las llamadas se mantenían en "más o menos." El dueño no sabía qué cancelar y qué seguir pagando.',
        strategyHeading: 'El dolor que arreglamos',
        strategyBody:
          'El taller no necesitaba más herramientas de SEO — necesitaba menos, y una que sí moviera la aguja. Cancelamos el stack fragmentado, pusimos un solo sistema en marcha, y lo dejamos correr 30 días. El volumen de llamadas respondió la pregunta que los paneles nunca contestaron.',
        keyBenefits: [
          {
            title: 'El teléfono suena — y sabes por qué',
            body: 'Las llamadas pasaron de "esperamos que sea el SEO" a "sí, es el SEO." Un panel. Una fuente de verdad. Sin más adivinanzas sobre si el marketing está funcionando.',
          },
          {
            title: 'Ganarles a las cadenas nacionales en lo único que importa',
            body: 'Las cadenas gastan en anuncios más de lo que el taller factura. El taller ganó las posiciones igual — sin comprar un solo anuncio.',
          },
          {
            title: 'Horas que vuelven cada semana',
            body: 'Sin malabares con 4-5 herramientas de SEO. Sin "¿posteé hoy en Google?" El dueño recupera tiempo para de verdad correr el taller.',
          },
        ],
        resultsHeading: 'Lo que cambió en 30 días',
        resultsBullets: [
          '1.091 llamadas en el mes de medición. El mismo mes un año antes: 683. Eso son 408 clientes más contactando — en un solo mes.',
          'Más de 100 formularios de contacto y solicitudes de cotización además de las llamadas. El pipeline se llenó.',
          'Clics al sitio: de 143 a 242 (+69%). Impresiones: de 10.6k a 13.4k (+26%). El taller se hizo más visible, y la gente hizo más clic — ambos arriba.',
          'Un aumento del 10% mes a mes en llamadas que siguió componiéndose. No fue un mes pico. Fue un nuevo piso.',
        ],
        imageEyebrow: 'SEARCH CONSOLE · VENTANA DE 30 DÍAS',
        images: [
          {
            fullImage: '/landing/case-studies/autoglass.webp',
            alt: 'Panel de Google Search Console mostrando el aumento en clics, impresiones, CTR y posición promedio en el periodo de medición de 30 días.',
            label: null,
          },
        ],
        imageCaption:
          'Vista comparativa de Search Console — clics, impresiones, CTR promedio y posición promedio durante los 30 días vs el periodo previo.',
      },
    ],
    briefSection: {
      eyebrow: 'MÁS RESULTADOS',
      heading: 'Distinto negocio. Mismo dolor. Misma cura.',
      body: 'Cuatro negocios locales más que estaban perdiendo clientes con competidores mejor posicionados — hasta que dejaron de perderlos. Mismo método, distintos rubros.',
    },
    briefCases: [
      {
        industry: 'Bufete de Abogados (DUI)',
        timeframe: '4 semanas',
        stats: [
          { value: '88%', label: 'De las búsquedas urgentes ahora van a ellos' },
          { value: '+17', label: 'Puestos top en 4 semanas' },
          { value: '4 semanas', label: 'De enterrados a primera llamada' },
        ],
        summary:
          'Cuando alguien lo arrestan a las 2 de la mañana, busca "abogado DUI cerca de mí" y llama al primer resultado. Este bufete era el tercero o cuarto. Ahora son la primera llamada — en el 88% del área de servicio.',
      },
      {
        industry: 'Servicio de Limpieza',
        timeframe: '4 semanas',
        stats: [
          { value: '100%', label: 'De la metro ahora los ve' },
          { value: '13↑', label: 'Puestos más arriba en búsqueda local' },
          { value: '0', label: 'Dólares gastados en anuncios' },
        ],
        summary:
          'Estaban pagando anuncios en Facebook para llenar la agenda. Ahora la agenda se llena con búsqueda orgánica en toda la metro — y el presupuesto de anuncios se fue a contratar un técnico más.',
      },
      {
        industry: 'Bufete de Servicios Completos',
        timeframe: '4 semanas',
        stats: [
          { value: '85%', label: 'Dominio del top 3 en el área' },
          { value: '100%', label: 'Top 6 en cada ubicación rastreada' },
          { value: '4 semanas', label: 'De pelotón a opción por defecto' },
        ],
        summary:
          'Cuando los clientes potenciales buscaban, el bufete no era la respuesta obvia. Ahora dominan el pack local de 3 — los únicos resultados en los que se hace clic — y son la opción por defecto en el área.',
      },
      {
        industry: 'Cardiólogo e Internista',
        timeframe: '3 semanas',
        stats: [
          { value: '55%', label: 'Top 3 en las keywords prioritarias' },
          { value: '+16', label: 'Nuevos puestos en primera página' },
          { value: '3 semanas', label: 'De invisibles a primera opción' },
        ],
        summary:
          'Dos de las búsquedas más críticas en la vida de cualquier paciente — y la práctica no aparecía. Tres semanas después eran el primer resultado en las dos. Los pacientes que necesitan cuidado real ya los pueden encontrar.',
      },
    ],
    finalCta: {
      eyebrow: 'TU TURNO',
      heading: (
        <>
          Tu negocio — pero con el <em>teléfono sonando.</em>
        </>
      ),
      body: 'Si estás viendo cómo tus clientes se van con competidores que aparecieron primero en Google, o pagando anuncios solo para mantenerte visible, o quemando horas cada semana en marketing que puede o no puede estar funcionando — deberíamos hablar. Veinte minutos. Gratis. Sin discurso de ventas. Solo una lectura clara de qué cambiaría para tu negocio, y qué tan rápido.',
      bookLabel: 'Agenda una llamada',
      auditLabel: 'Auditoría instantánea gratis',
    },
    footer: {
      builtIn: 'HECHO EN MIAMI',
    },
  },
}

export default caseStudiesContent
