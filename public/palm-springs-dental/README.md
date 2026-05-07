# Palm Springs Dental — Design System

**Version 1.0** · Bilingual neighborhood dental practice, Hialeah, FL · 2026

---

## About the brand

Palm Springs Dental is a family dental clinic on Palm Springs Mile in Hialeah, Florida, serving primarily Spanish/English bilingual families. The brand positions itself against three local categories of competitor:

- **Corporate chains** (Aspen Dental) — generic blue, stock smiles
- **Discount banner shops** (Rielo) — loud yellow "$59 SPECIAL!"
- **Specialist clinics** (Implant Center, Miami Dental Group) — cold authority, dense pricing tables

Palm Springs Dental's answer is **soft coastal apothecary**: bone & cream surfaces, deep teal anchors, terracotta warmth, real Hialeah photography, and Spanish set as a first-class language alongside English — never as an afterthought translation.

The three-pillar promise:

| Pillar | Spanish anchor | UI implication |
|---|---|---|
| **Comfort** | *Sin miedo, sin prisas* | Soft curves, generous whitespace, warm tones |
| **Transparency** | *Precios claros desde el primer día* | Honest typography, visible CTAs, no dark patterns |
| **Belonging** | *Tu sonrisa sin perder tu esencia* | Bilingual content, real patient faces, neighborhood imagery |

## Sources

This design system was built from a single brand-guidelines document (Markdown spec, v1.0, 2026, Jomendez Inc.). **No codebase, Figma, screenshots, or photography were provided** — meaning the UI kit is a fresh implementation of the spec, not a recreation of an existing live site. If the live `palmspringsdental.com` (or its equivalent) exists, please share it so we can reconcile this system against the production reality.

---

## Content fundamentals

The site speaks like a **trusted neighbor who happens to be a dental professional** — never corporate, never clinical-sterile, never aggressive-discount.

### Voice

- **Warm, not saccharine** — "Welcome back" not "We've been expecting you"
- **Direct, not pushy** — "Book today, see us this week" not "Limited spots — act now!"
- **Bilingual by design** — Spanish appears alongside English, not as an afterthought
- **Specific, not generic** — "Same-week appointments for tooth pain" beats "Call today!"

### Tone & casing

- **Sentence case** for everything — headlines, buttons, nav. Never ALL CAPS for paragraphs. Title Case is reserved for proper nouns (Palm Springs Dental, Invisalign, CareCredit) and section labels in micro-type.
- **Second person** — "your smile," "your visit," "your insurance." Never "the patient."
- **First-person plural for the clinic** — "we'll call you back," "we accept most plans." Avoid the royal "Palm Springs Dental will…"
- **No emoji** in core UI copy. The brand voice is warm without resorting to 🙂 / 🦷.
- **No exclamation points** in headlines. They read as forced cheer. Reserve for confirmations only ("Booked!").
- **Numbers always tabular** in prices, phone numbers, hours. Prices written `$129` not `129 dollars`.

### Bilingual pattern

English leads. Spanish follows immediately, set in italic Fraunces at ~55% the headline size, in `--c-teal-fog`. Spanish copy is **localized, not translated** — written by a native speaker and respecting Cuban-American Hialeah idiom.

```
Comfortable dental care
Cuidado dental con confianza
```

NOT a literal translation: ❌ *Cuidado dental cómodo*

### Specific copy examples (lifted from voice & tone rules)

| Surface | Don't | Do |
|---|---|---|
| Hero CTA | "Schedule Your Appointment Today!" | "Book today, see us this week" |
| Form error | "ERROR: Phone required" | "Please share your phone so we can confirm" |
| Required field | red asterisk | terracotta asterisk |
| Offer card | "$59 SPECIAL — LIMITED TIME!" | "New patient exam · $129 · includes x-rays" |
| Footer | "© 2026 Palm Springs Dental, LLC. All rights reserved." | Same line is fine, but pair with *"Hecho con cariño en Hialeah."* |

### What the brand is NOT

- ❌ Stock-photo perfect smiles on blue gradients
- ❌ Tooth-shaped icons or molar-themed flourishes (one exception: a single neutral tooth-outline icon is permitted *only* for service-category navigation, used minimally)
- ❌ Yellow "$59 SPECIAL!" starbursts
- ❌ Generic corporate sans-serif (Inter, Roboto, Open Sans) for display
- ❌ Cold clinical photography of instruments and gloved hands

---

## Visual foundations

### Colors

The 60-30-10 system:

- **60–70% Bone / Shell** (`#F5EFE6` / `#FAF6EF`) — page backgrounds and surfaces
- **30% Teal Deep** (`#1F3D3A`) — typography, dark sections, navigation, structure
- **10% Terracotta** (`#B8593C`) — primary CTAs, key links, accent rules

Ochre (`#C8924A`) is reserved for stars, small badges, and link underlines — never CTAs or headlines. Pure white (`#FFFFFF`) is reserved for modals only; everywhere else, surfaces are warm bone or shell.

All pairings meet WCAG AA minimum; key combos (Teal Deep on Bone 11.8:1, Ink on Bone 15.2:1) clear AAA.

### Type

A two-family system: editorial serif against humanist sans.

- **Fraunces** (Google Fonts) — display, headlines, Spanish italic subtitles. Optical sizing at `'opsz' 144` for display, soft variation `'SOFT' 100` and `'WONK' 1` for italic Spanish quotes. Letter-spacing `-0.02em` at sizes ≥40px.
- **Inter Tight** (Google Fonts) — body and UI. **Substituted for licensed Söhne** which the spec calls for; flagged below.
- Modular 1.25 (major third) scale anchored at 17px body. Display at 72px, H1 56, H2 40, H3 28, H4 22, lead 20, body 17, small 15, micro 13.

### Spacing & layout

- **4px base unit**, scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192
- **Max content width** 1280px (clinic feels approachable, not corporate-wide)
- **Max reading width** 680px for body
- **Gutters** 24 mobile / 32 tablet / 48 desktop
- **Section rhythm** 96px between major sections, 48px within
- **Asymmetric heroes** — headline left at ~60% width with photo bleeding off-screen right
- **Generous whitespace** — 48px minimum between text and CTAs

### Backgrounds & surfaces

- Bone (`#F5EFE6`) is the default page background — never pure white.
- Cards sit on Shell (`#FAF6EF`) with a 1px Linen border and 8px radius (subtle, not playful).
- Dark sections invert: Teal Deep background, Shell typography.
- **No gradients** as decorative backgrounds. The aesthetic is matte and tactile.
- **Warm-tone overlay** (`#F5EFE6` at 4% opacity) blended over all photography to unify the palette.
- **Subtle film grain** (3% opacity) on hero images for tactile warmth — used only on hero photography, never on UI surfaces.

### Borders, radii & shadows

- **Radii**: 6px small (inputs), 8px medium (cards), 16px large (callouts), 999px pill (buttons, tags). The pill is a brand signature — buttons are always fully rounded.
- **Borders**: 1px Linen for warm dividers, 1.5px Teal Deep for emphasized borders (secondary buttons, focus rings).
- **Shadows are warm and teal-tinted**, never neutral grey. Three elevations:
  - `--shadow-sm` — 0 1px 2px rgba(31,61,58,.06) for resting cards
  - `--shadow-md` — 0 8px 24px -8px rgba(31,61,58,.12) for hover
  - `--shadow-lg` — 0 24px 48px -12px rgba(31,61,58,.18) for modals
- **CTA shadows** carry terracotta tint: `0 1px 0 rgba(184,89,60,.3), 0 8px 24px -8px rgba(184,89,60,.4)`. Lifts on hover.

### Motion

Calm, considered, never flashy. Three durations and two easings cover everything:

- `--d-fast` 160ms — hovers, focus
- `--d-base` 240ms — most UI
- `--d-slow` 480ms — section reveals
- `--ease-out` `cubic-bezier(0.2, 0.8, 0.2, 1)` for exits and reveals
- `--ease-in-out` `cubic-bezier(0.65, 0, 0.35, 1)` for transitions

### Hover states

- **Primary CTA**: terra → terra-soft, lifts 1px (`translateY(-1px)`), shadow blooms.
- **Secondary CTA**: transparent fill → teal-deep fill, text inverts to shell.
- **Cards**: lift 2px, border darkens from linen to terra, shadow upgrades sm → md.
- **Text links**: ochre underline darkens to terra; arrow `→` after link translates 4px right.

### Press states

- Buttons return to baseline `translateY(0)` and shadow downgrades; no inset/depressed effect.
- Cards do not press — they are not buttons.

### Transparency & blur

Used sparingly. The sticky top nav transitions from transparent (over the hero) to bone-with-shadow on scroll. Modals use a `rgba(31,61,58,0.4)` teal scrim with no backdrop-blur — the brand reads better as matte and grounded than glassy.

### Imagery vibe

Documentary-warm. Natural light, warm white balance. Real staff and (consenting) patients, real Hialeah neighborhood. Never ring-light medical glare; never gloved-hand-and-tool clinical anxiety triggers; never stock "perfect smile" close-ups.

### Layout rules

- **Top nav sticky** with bilingual EN | ES toggle in utility row above main nav.
- **Footer is generous** — 96px top padding, address with map, hours, phone, EN/ES toggle, "Hecho con cariño en Hialeah" sign-off.
- **Forms are single column**, max 480px wide, labels above inputs (never floating).
- **Pricing is editorial**, not tabular: one clear price per service, with "what's included" bullets — never a dense pricing matrix.

### Accessibility floor

WCAG AA throughout, AAA on body text. All animations honor `prefers-reduced-motion: reduce`. Bilingual pages mark `<html lang>` and per-block `lang` attributes. Keyboard navigable with visible focus rings (1.5px Terra outline, 3px offset).

---

## Iconography

See [`ICONOGRAPHY.md`](./ICONOGRAPHY.md) for the icon strategy. Short version:

- **Lucide Icons** (CDN) is the default set — 1.5px stroke, rounded line caps, open shapes match the spec exactly. Loaded via `<script src="https://unpkg.com/lucide@latest">`.
- Color: Teal Deep (`--c-teal-deep`) by default. Ochre fill for stars only. Success-green fill for check marks only.
- Sized 20–24px in nav, 32px in service cards, 48px in feature blocks. Icons sit beside text labels at ~20% optical larger than the text x-height.
- **No emoji** in UI. **No icon fonts** (FontAwesome, Material Icons) — accessibility and color control are better with inline SVG.
- The single permitted "tooth" icon is `lucide:circle-dot` styled as a service-category marker, used minimally. We do not use cartoon molars or flourishes.

---

## Index

| File / folder | What's inside |
|---|---|
| `README.md` | This document — brand context, voice, visual foundations, iconography summary |
| `colors_and_type.css` | All design tokens (color, type, spacing, radii, shadow, motion) as CSS custom properties + base element styles |
| `ICONOGRAPHY.md` | Icon strategy, sizing, color rules, the Lucide CDN approach |
| `SKILL.md` | Cross-compatible Agent Skill manifest for use in Claude Code |
| `assets/` | Logos, brand marks, illustrations |
| `preview/` | Per-asset cards rendered in the Design System tab (colors, type, spacing, components) |
| `ui_kits/website/` | Marketing website UI kit — homepage, service page, booking page mock with reusable JSX components |

---

## Caveats & substitutions

- **Söhne → Inter Tight.** The spec calls for Söhne (licensed) with Inter Tight as the fallback; we ship with Inter Tight as primary because Söhne requires a paid license. If you've licensed Söhne, drop the WOFF2 files into `fonts/` and update `--f-body` in `colors_and_type.css`.
- **No real photography.** All imagery slots are placeholders. Per the spec, photography must be documentary-warm shots of real staff, real Hialeah patients (with consent), and the actual clinic — not stock. We've left annotated placeholders so the photographer can drop assets in directly.
- **No live URL or codebase provided.** The UI kit is a faithful implementation of the v1.0 spec, not a recreation of a deployed site. If the production site exists, share it for reconciliation.
