# Website UI Kit — Palm Springs Dental

A high-fidelity recreation of the Palm Springs Dental marketing site, built directly from the v1.0 brand spec. Components are intentionally cosmetic — they look right but don't carry production logic.

## Files

- `index.html` — runnable mock that boots a homepage with sticky nav, asymmetric hero, service grid, bilingual brand promise, doctor card, review carousel, offer band, insurance strip, booking CTA, footer
- `Nav.jsx` — sticky top nav with EN/ES utility toggle
- `Hero.jsx` — asymmetric hero with bilingual headline + photo placeholder
- `ServiceGrid.jsx` — six-tile service grid using Lucide icons
- `BrandPromise.jsx` — three-pillar bilingual band on Teal Deep
- `DoctorCard.jsx` — editorial doctor bio with photo placeholder
- `ReviewCarousel.jsx` — auto-advancing review pull-quotes
- `OfferBand.jsx` — new-patient offer card on Terra Wash band
- `InsuranceStrip.jsx` — credential / insurance logo bar
- `BookingCTA.jsx` — closing booking band on Teal Deep
- `Footer.jsx` — generous footer with bilingual sign-off

## Design width

1280px max content; the index.html mock is intended for desktop preview. Mobile responsiveness is sketched (stacks at <820px) but not the focus.

## What's faithful, what's substituted

- ✅ All color, type, spacing, radii, shadow tokens straight from `colors_and_type.css`
- ✅ Lucide icons, inline SVG, 1.5px stroke
- ✅ Bilingual headline pattern, terra CTA shadow, secondary outline button
- ⚠️ Photography is **placeholder** — soft sand tones with subtle grain, awaiting real Hialeah documentary photography
- ⚠️ Insurance logos are **wordmark text** — replace with real brand SVGs when available
