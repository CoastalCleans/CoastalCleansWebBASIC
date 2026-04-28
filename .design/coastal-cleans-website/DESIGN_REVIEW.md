# Design Review: CoastalCleans Website

Reviewed against: `.design/coastal-cleans-website/DESIGN_BRIEF.md`  
Philosophy: Coastal Conservation Badge — vintage conservation poster meets modern nonprofit landing page  
Date: 2026-04-28

---

## Screenshots Captured

| Screenshot | Breakpoint | Description |
|---|---|---|
| `screenshots/review-home-desktop-1280.png` | Desktop 1280×900 | Full home page — hero, stats, who we are, get involved teaser, footer |
| `screenshots/review-home-tablet-768.png` | Tablet 768×1024 | Home page — burger nav active, single-column hero, stacked cards |
| `screenshots/review-home-mobile-375.png` | Mobile 375×812 | Home page — full mobile view, stat stack, footer collapse |
| `screenshots/review-mission-desktop-1280.png` | Desktop 1280×900 | Mission page — blockquote, pillar cards, impact strip |
| `screenshots/review-team-desktop-1280.png` | Desktop 1280×900 | Team page — founder cards, volunteer spotlight grid, CTA |
| `screenshots/review-history-desktop-1280.png` | Desktop 1280×900 | History page — full timeline, US map SVG, future chapters |
| `screenshots/review-donate-desktop-1280.png` | Desktop 1280×900 | Donate page — tier cards, Stripe placeholder, corporate section |
| `screenshots/review-contact-desktop-1280.png` | Desktop 1280×900 | Contact page — form card, info sidebar, corporate callout |
| `screenshots/review-contact-form-errors.png` | Desktop 1280×900 | Contact form empty submit — all three error states visible |

> All screenshots are in `.design/coastal-cleans-website/screenshots/`.

---

## Summary

The implementation faithfully delivers the Coastal Conservation Badge aesthetic — the cream canvas, Fredoka headlines, floating manatee, and coral CTA pill together create an unmistakably warm, trustworthy nonprofit feel that stands apart from generic charity templates. Three issues need attention before the site is share-ready: excess vertical whitespace on the contact page, low contrast on the US map state fills, and the hero wave rendering at mobile width leaves a brief white gap.

---

## Must Fix

1. **Contact page: large dead zone above the form.** `review-contact-desktop-1280.png` shows ~180px of empty cream between the wave divider and the form card. The page hero wave transitions into the section, but `section--light` adds `var(--section-padding-y)` (96px) on top of that gap. Reduce to `padding-top: var(--space-7)` on the contact layout section specifically.
   - File: `contact.html` — `<section class="section section--light">`
   - Fix: add `style="padding-top: var(--space-7);"` or a `.section--flush-top` utility class.

2. **US map state fills too faint against cream background.** `review-history-desktop-1280.png` shows the state paths in `--color-bg-tertiary` (#EDE8D8) on the `--color-bg-secondary` (#FDFAF4) background — very low contrast. The map reads as a near-invisible blob at this scale.
   - File: `history.html` — `.us-map .state { fill: ... }`
   - Fix: Change state fill to `#C8C0A8` (`--raw-cream-500`) or the explicit hex, giving clear definition without coloring them competitively against Florida.

3. **Hero wave leaves white seam on mobile.** `review-home-mobile-375.png` shows a thin white strip between the hero bottom and the stats section. The hero wave is `position:absolute; bottom:0` but `min-height: 70vh` pushes the hero shorter while the absolute wave can overlap the section below.
   - File: `index.html` — `.hero` and `.hero-wave`
   - Fix: Add `padding-bottom: 80px` to `.hero` so it always reserves space for the wave overlay.

---

## Should Fix

1. **Mission page blockquote not responsive on narrow screens.** The two-column grid (`grid-template-columns: 1fr 1fr`) containing the blockquote and manatee sticker has the responsive class `.mission-split` wired, but at 768px tablet the columns compress the blockquote text to a very narrow column. The right column (manatee sticker) should already collapse at ≤768px via `.mission-split` in `mission.html`'s style block — verify the media query is firing correctly.
   - File: `mission.html` — `.mission-split` at 768px

2. **Hero section doesn't highlight home link in nav.** Active link detection in `nav.js` checks `pathname.split('/').pop() || 'index.html'`. When the URL is `http://localhost:9000/` (trailing slash, no filename), `pop()` returns an empty string, which correctly falls back to `'index.html'`. But when served as `index.html` explicitly, the match works. Worth verifying the `||` fallback also handles `''` from the localhost root path.
   - File: `js/nav.js` line 14 — already handles this, but worth a live test at `/` not just `/index.html`.

3. **Donate page "Most Popular" badge overflow clip risk.** The `.tier-featured-badge` uses `top: -13px` to sit above the card border. If the parent `.tiers-grid` ever has `overflow: hidden` added, this will clip. Currently renders correctly (`review-donate-desktop-1280.png`), but fragile.
   - File: `donate.html` — add `overflow: visible` explicitly to `.tiers-grid` as a guard.

4. **Missing favicon causes a 404 on every page load.** Low severity but shows in DevTools and slightly delays initial connection.
   - Fix: Add `<link rel="icon" href="data:," />` to each page's `<head>` as a zero-byte no-op favicon, or add a real `.ico`/`.svg` to assets.

---

## Could Improve

1. **Timeline year badges could use `aria-label` dates.** The abbreviated labels ("Mar", "May", "Aug", "Now", "Next") are visually clear but screen readers would benefit from the full month and year on each badge. Add `aria-label="January 2025"` etc. to each `.year-badge`.

2. **Volunteer spotlight cards could use a hover lift.** The leader team cards hover with `translateY(-4px)` but the spotlight cards don't. Adding the same transition to `.spotlight-card` would make the section feel consistent.

3. **Get Involved page track visuals are mostly empty at desktop.** The large illustrated icon placeholders have `opacity: 0.25` which makes them very ghostly. Consider bumping to `0.4` or adding a second decorative element (a subtle wave or badge watermark) so the track visual boxes don't feel like empty containers.

4. **The "Who we are" manatee sticker on the home page has no float animation** (correctly, per the brief — float only on hero). However the `who-sticker svg` wrapper has no hover feedback at all. A subtle `transform: rotate(-3deg)` on hover would add delight without breaking the "float only on hero" rule.

5. **Pillar card hover state is missing.** The three Clean/Protect/Educate cards on the mission page don't have the `.card:hover` lift applied — they use `.pillar-card` not `.card`. Add `transition` and `:hover { transform: translateY(-4px); box-shadow: ... }` to `.pillar-card` for consistency.

6. **Map tooltip text overlaps Florida at small viewport sizes.** The SVG tooltip text (`Tampa Bay Chapter — Est. 2025`) is positioned at `x=670, y=424` which sits inside the Florida shape at narrow viewport widths. Consider repositioning it above the pin or using an HTML-layer tooltip instead.

---

## What Works Well

- **The aesthetic is immediately recognizable.** Fredoka + Nunito + cream canvas + coral CTA delivers the exact Coastal Conservation Badge feel from the brief. Anyone looking at this for 3 seconds knows it's a warm, local, trust-worthy nonprofit — not a corporate charity template.

- **The manatee SVG is genuinely charming.** The float animation on the hero is subtle and delightful without being distracting. The whisker lines, flipper detail, and eye highlight give it personality above a simple silhouette.

- **The wave dividers create beautiful coastal rhythm.** The three-layer SVG wave transitions between sections feel editorial and coastal without relying on photography.

- **Active nav state works correctly.** `review-team-desktop-1280.png` shows "Our Team" correctly underlined; `review-contact-desktop-1280.png` shows "Contact Us" correctly underlined. The JS filename detection is solid.

- **Form validation is clean and accessible.** `review-contact-form-errors.png` shows all three fields correctly marked with red borders and inline error messages that don't jump layout. The `has-error` class approach is robust.

- **Donation tier cards have excellent hierarchy.** The "Most Popular" badge, the Fredoka price display, the bold impact copy, and the select button create a clear visual flow that guides the decision.

- **The history timeline alternates effectively.** The left/right alternation with the gradient spine line is reminiscent of conservation report layouts — exactly the NPS badge aesthetic target.

- **Token usage is consistent throughout.** No spot-checked hardcoded colors found in page styles — all values reference `var(--...)` tokens, so a color palette swap would cascade cleanly across all 7 pages.

- **Dark mode tokens are ready.** Both `[data-theme="dark"]` and `prefers-color-scheme: dark` are wired. No implementation gaps found; dark mode will apply immediately if a toggle is added.
