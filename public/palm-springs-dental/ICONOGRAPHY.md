# Iconography — Palm Springs Dental

## Strategy

Palm Springs Dental uses **inline SVG icons** sourced from [Lucide](https://lucide.dev) — a 1.5px stroke, rounded-line-cap, open-shape set whose visual DNA matches the spec exactly. We chose Lucide over hand-drawing custom icons because:

1. The spec's icon brief (1.5px weight, 24px grid, rounded caps, open shapes, no fills except stars/checks) is **verbatim Lucide's own design rules**.
2. Lucide is MIT-licensed, CDN-available, and has every icon required for launch.
3. Inline SVG gives us full color control via `currentColor` and AA-compliant accessibility.

## How to load

### Vanilla HTML

```html
<!-- Inline SVG (recommended for production) -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="1.5"
     stroke-linecap="round" stroke-linejoin="round"
     aria-hidden="true">
  <!-- paste path from https://lucide.dev/icons/calendar -->
</svg>

<!-- OR use the Lucide runtime for prototypes -->
<i data-lucide="calendar"></i>
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>
```

### React / JSX

```bash
npm install lucide-react
```

```jsx
import { Calendar, Phone, MessageCircle, MapPin, Clock,
         Shield, CreditCard, Heart, Star, Check, ArrowRight,
         Globe, Menu, X } from 'lucide-react';

<Calendar size={24} strokeWidth={1.5} color="var(--c-teal-deep)" />
```

## Color rules

| Icon role | Color | Notes |
|---|---|---|
| Default UI | `--c-teal-deep` `#1F3D3A` | Nav, service cards, feature blocks |
| Muted / meta | `--c-teal-fog` `#6B8C87` | Captions, footer meta |
| On dark sections | `--c-shell` `#FAF6EF` | Inverted contexts |
| **Stars (only)** | `--c-ochre` `#C8924A`, **filled** | Review ratings — the one filled icon |
| **Checks (only)** | `--c-success` `#4A7C59`, filled | Confirmations, "what's included" lists |
| **Errors (only)** | `--c-alert` `#A33D2E` | Form validation |

All other icons are **stroked, never filled**.

## Sizing

| Context | Size | Stroke |
|---|---:|---|
| Nav, inline labels | 20px | 1.5 |
| Form fields, small UI | 18px | 1.5 |
| Service cards | 32px | 1.5 |
| Feature blocks | 48px | 1.5 |
| Hero accents | 64–96px | 1.5 |

Icons sit **beside** text labels at ~20% optical larger than the text x-height. Icons go **before** the label in LTR — `<icon> Label`.

## Required icon set for launch

From Lucide:

`calendar` · `phone` · `message-circle` (or `message-square`) · `map-pin` · `clock` · `shield` · `credit-card` · `heart` · `star` · `check` · `check-circle-2` · `arrow-right` · `chevron-right` · `globe` · `menu` · `x` · `mail` · `circle-dot` (used minimally as the only "service-category-tooth" stand-in)

## Things we do NOT do

- ❌ **No emoji** in UI surfaces. The brand voice is warm without resorting to 🦷 / 🙂.
- ❌ **No icon fonts** (FontAwesome, Material Icons) — color control and a11y are inferior to inline SVG.
- ❌ **No cartoon molars, tooth flourishes, or starburst-shaped badges.**
- ❌ **No filled icons** except stars (Ochre) and check marks (Success). A filled Lucide icon defeats the open-shape voice of the system.
- ❌ **No multi-color icons.** Every icon is monochrome (`currentColor`).

## Logo

The Palm Springs Dental wordmark lives at `assets/logo.svg`. It sets the brand name in Fraunces small-caps weight 500 with a single Terracotta dot above the "i" — the only "flourish" in the system. On dark surfaces, use `assets/logo-light.svg` (Shell typography). On Bone backgrounds, use the default (Teal Deep).

The wordmark is the only logo. There is no separate "P" mark or icon-only lockup; resist the temptation to invent one without brand approval.
