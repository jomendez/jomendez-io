---
name: palm-springs-dental-design
description: Use this skill to generate well-branded interfaces and assets for Palm Springs Dental, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference

- **Brand:** Palm Springs Dental — bilingual neighborhood dental clinic, Hialeah, FL
- **Aesthetic:** Soft Coastal Apothecary — warm bone & cream surfaces, deep teal anchor, terracotta accent
- **Voice:** trusted neighbor who happens to be a dental professional. Bilingual EN/ES, never as afterthought.
- **Tokens:** all live in `colors_and_type.css` — import this file and use CSS custom properties (`--c-bone`, `--c-teal-deep`, `--c-terra`, etc.)
- **Type:** Fraunces (display) + Inter Tight (body, substitutes Söhne)
- **Components:** `ui_kits/website/` has React/JSX components for nav, hero, service grid, doctor card, reviews, offer card, footer
- **Icons:** Lucide, 1.5px stroke, Teal Deep — see `ICONOGRAPHY.md`

## Critical rules

- ❌ No emoji in UI · No tooth-shaped icons or molar flourishes · No "$59 SPECIAL!" starbursts
- ❌ No pure white backgrounds (use Bone `#F5EFE6`) · No blue gradients · No stock smile photography
- ✅ 60–30–10: Bone surfaces, Teal Deep type/structure, Terracotta accents/CTAs
- ✅ Bilingual headlines: English leads, Spanish follows in italic Fraunces at 0.55em, teal-fog
- ✅ Pill-shaped CTAs with terracotta tinted shadow
- ✅ Tabular figures for all prices, phones, hours
