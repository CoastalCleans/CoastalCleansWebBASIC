---
title: CoastalCleans — CSS Architecture
type: reference
created: 2026-05-27
updated: 2026-05-27
tags: [project, coastalcleans, css, design-tokens]
---

# CSS Architecture & Design Tokens

The visual system for coastalcleans.org — tokens, load order, components, and dark mode rules.

---

## CSS Load Order (every page)

```html
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/global.css">
<link rel="stylesheet" href="css/nav.css">
<link rel="stylesheet" href="css/footer.css">
<style>
  /* page-specific rules — NEVER in shared CSS files */
</style>
```

Page-specific styles live in the inline `<style>` block inside each page's `<head>`. Never add page-specific rules to the shared CSS files.

---

## Design Token System (`css/tokens.css`)

Single source of truth for all visual values.

### Color Tokens
```css
--color-bg-primary
--color-bg-secondary
--color-text-primary
--color-text-secondary
--color-text-inverse     /* stays light (#E8E2D4) even in dark mode — used on dark sections */
--color-accent-primary   /* TEAL: #6BB399 — never coral/orange */
--color-border
--card-bg
--card-border
--input-border
```

**Raw teal tokens:** `--raw-teal-400`, `--raw-teal-500`, `--raw-teal-600`, `--raw-teal-700`

### Typography
Both display and body fonts are **Lato** (Google Fonts):
```css
--font-family-display   /* Lato */
--font-family-body      /* Lato */
```

### Spacing Scale
4px base unit, `--space-1` through `--space-12`.

### Motion
```css
--duration-fast
--easing-bounce
```

---

## Dark Mode

Toggle: dark mode button in footer (`js/theme.js`) sets `data-theme="dark"` on `<html>`.

**Dual selectors in tokens.css:**
```css
[data-theme="dark"] { /* explicit toggle */ }
@media (prefers-color-scheme: dark) { /* OS preference */ }
```

**Critical rule:** `--color-text-inverse` **stays light (`#E8E2D4`) in dark mode**. All usages are on permanently-dark sections (hero, page-hero, join-section, footer). Do not change this to a dark value.

---

## Global Components (`css/global.css`)

Reusable utility classes available on every page:

| Class | Description |
|-------|-------------|
| `.container` | Max-width centered wrapper |
| `.section` | Standard vertical padding |
| `.card` | Rounded card with shadow |
| `.cta-pill` | Pill-shaped call-to-action button |
| `.stat-grid` | 3-column stats display |
| `.form-group` | Input + label + error wrapper |
| `.wave-divider` | SVG wave section separator |
| `.float` | Applies `manatee-float` keyframe animation |

---

## Key Layout Patterns

### Mission Split Grid
```html
<div class="mission-split" style="display:grid;grid-template-columns:1fr 1fr">
```
Collapses to `grid-template-columns: 1fr !important` at ≤768px via page inline style.

### Track Reverse (get-involved.html)
```css
.track--reverse { direction: rtl; }
.track--reverse > * { direction: ltr; }
```
Visually flips column order without changing DOM order.

### Dark/Light Image Swap
```css
.partner-img--dark  { display: none; }
[data-theme="dark"] .partner-img--light { display: none; }
[data-theme="dark"] .partner-img--dark  { display: block; }
```

### Bubble Float Animation
```css
/* page-specific variant defined in inline <style> */
@keyframes bubble-float { ... }
```
`.bubble-particle` elements: teal/blue/white (iridescent soap bubble effect).

---

## Navigation (`css/nav.css` + `js/nav.js`)

- Sticky nav, z-indexed above content
- `is-scrolled` class toggles on `site-nav` at `scrollY > 8` → adds scroll shadow
- Active link: matches `pathname.split('/').pop() || 'index.html'` against each link's `href`
- Burger drawer: slides in from right, focus-trapped while open, Escape closes it
- All in `js/nav.js` loaded on every page

---

## Assets Reference

| Asset | Used On | Purpose |
|-------|---------|---------|
| `assets/logo.jpg` | Every page (nav) | Circular badge logo |
| `assets/index1.jpg` | index.html | Hero background (LCP — preloaded) |
| `assets/jellyfish.jpg` | index.html | Who We Are section |
| `assets/seahorse.jpg` | mission.html | Floats right of mission statement |
| `assets/fish.jpg` | mission.html | Floats left of Join CTA |
| `assets/lionfish.jpg` | get-involved.html | Donate track |
| `assets/downtowntp.jpg` | get-involved.html | Corporate partner (light mode) |
| `assets/downtowntpDARK.jpg` | get-involved.html | Corporate partner (dark mode) |
| `assets/hillsboroughcounty.jpg` | get-involved.html | FL map, red Hillsborough highlight |
| `assets/volunteer1–4.jpg` | get-involved.html | Volunteer collage |
| `assets/bubble25/50/100.png` | donate.html | Donation tier bubbles |
| `assets/ElizabethChojnacki.jpg` | team.html | Pre-cropped circle photo |
| `assets/YukthaKorlakunta.jpg` | team.html | Pre-cropped circle photo |
| `assets/LeandroPlouz.jpg` | team.html | Pre-cropped circle photo |
| `assets/MadisonLee.jpg` | team.html | Pre-cropped circle photo |
| `assets/email-welcome.html` | Sender.net automation | Welcome email template |

All images are placeholder — owner will swap manually. Never generate or source replacement images.

---

## Related Notes
- [[Overview]] — project-level summary
- [[Pages]] — per-page section breakdown
