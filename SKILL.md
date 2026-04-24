---
name: meet-bg-design
description: Use this skill to generate well-branded interfaces and assets for Meet-BG, a Bulgarian social dining platform connecting Bulgarians worldwide. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping both the marketing site (meet-bg.com) and the dark-mode social app (app.meet-bg.com).
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick Reference

**Brand:** Meet-BG — Bulgarian social dining platform
**Domains:** meet-bg.com (marketing) · app.meet-bg.com (app) · meet-bg.uk · meet-bg.de · meet-bg.us

**Colors:**
- Graphite Black: `#1E1E1E` (marketing primary)
- Warm Gold: `#C9A24D` (brand accent)
- Cream White: `#F7F4EF` (light backgrounds)
- App Orange: `#F47A20` (app accent)
- App BG: `#0D0D0D` (app background)
- App Surface: `#1F1F1F` (app cards)

**Fonts:** Cormorant Garamond (display/headlines) + Inter (UI/body)
Load via: `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap`

**Logo:** SVG symbol in `assets/logo-symbol.svg` (gold) and `assets/logo-symbol-white.svg` (white)

**CSS tokens:** `colors_and_type.css` — import this for all variables

**UI Kits:**
- Marketing site → `ui_kits/marketing/index.html`
- App (dark mode) → `ui_kits/app/index.html`

**Voice:** Warm, premium, human. Bulgarian primary. No emoji in UI. CTAs like "Резервирай място" not "Sign up".
