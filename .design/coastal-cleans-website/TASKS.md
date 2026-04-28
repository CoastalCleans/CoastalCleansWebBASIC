# Build Tasks: CoastalCleans Website

Generated from: .design/coastal-cleans-website/DESIGN_BRIEF.md
Date: 2026-04-27

Philosophy: Coastal Conservation Badge — vintage conservation poster meets modern nonprofit landing page.
Stack: Static HTML/CSS/JS. Tokens: `css/tokens.css` (complete).

---

## Foundation

- [ ] **Base HTML shell**: Create `_base.html` as a reference template with `<head>` (charset, viewport, Google Fonts import for Fredoka + Nunito, tokens.css link, global.css link), skip-to-content link, `<body data-theme>`, nav placeholder, main landmark, footer placeholder. _New. All pages derive from this shell._
- [ ] **Global stylesheet**: Create `css/global.css` — container utility (`.container`, `--max-width-page`), section padding helper (`.section`), typography scale (h1–h4 using `--font-family-display`, p using `--font-family-body`), utility classes (`.sr-only`, `.cta-pill`, `.cta-secondary`). _Consumes: tokens.css. New._

## Core Shared Components

- [ ] **Global nav**: Build `css/nav.css` + `js/nav.js` — sticky header at `--nav-height: 64px`; logo image left (circular clip, `object-fit: cover`); center links (Our Mission · Our Team · Get Involved · Our History · Contact Us); Donate coral pill CTA right; active-page link highlighted with `--nav-link-color-active`; burger icon (☰) visible below 768px; slide-in drawer from right on mobile with stacked links + Donate button; close on outside click and Escape key. _New component, used on all 7 pages._
- [ ] **Footer**: Build `css/footer.css` — dark navy background (`--color-bg-footer`), three-column layout (logo + tagline | nav links | social icon placeholders), copyright line, collapses to single column on mobile. _New component, used on all 7 pages._

## Hero & Home Page

- [ ] **Hero section**: Build the `index.html` hero — full-width navy background (`--hero-bg`), headline "Cleaning coastlines, saving sea life" in Fredoka 4xl–5xl, subline in Nunito, "Join Us" coral CTA pill, wave SVG divider at bottom transitioning to cream page background. _Visual priority task — establishes the aesthetic direction for the whole site. New._
- [ ] **Marine animal sticker (manatee SVG)**: Create an inline SVG manatee sticker in the blue/black illustrative style described in the brief; apply `aria-hidden="true"`; add `@keyframes float` CSS animation (subtle vertical bob, 3s ease-in-out infinite) using `--easing-bounce` and `--duration-slower`; animation only active on hero, paused elsewhere. _New. Reused on Mission page._
- [ ] **Home: Mission snapshot row**: Three-stat block (beaches cleaned / lbs trash removed / volunteers) in bold Fredoka numbers with Nunito labels; full-width cream section with `--shadow-sm` card treatment. _New. Depends on: hero._
- [ ] **Home: Who we are + Get Involved teaser**: Short intro paragraph with manatee sticker positioned right; three card row below (Volunteer / Donate / Partner) using `--card-bg`, `--card-radius`, `--card-shadow`; each card has icon placeholder, headline, body copy, and a CTA link. _New. Depends on: sticker SVG._

## Interior Pages

- [ ] **Mission page** (`mission.html`): Mission statement headline; three pillars (Clean / Protect / Educate) with marine icon placeholders, title, and body; impact stats row (reuse stat style from Home); wave divider; "Get Involved" coral CTA section at bottom. _New page._
- [ ] **Team cards component + Team page** (`team.html`): Reusable `.team-card` — circular photo placeholder (grey fill), name in Fredoka md, role in Nunito sm, optional bio snippet; grid layout (1-col mobile → 2-col tablet → 3-col desktop); volunteer spotlight section below leadership grid; "Join the Team" CTA. _New component + new page._
- [ ] **Get Involved page** (`get-involved.html`): Three track sections (Volunteer / Donate / Corporate Partner) each with icon, heading, description, and primary action button; upcoming events placeholder list (3 items with date, location, title); styling differentiates the three tracks visually without using color alone. _New page._
- [ ] **History page — timeline** (`history.html`): Vertical timeline (2025 founding to present) with alternating left/right entries on desktop, single-column on mobile; each entry has year badge (navy circle, Fredoka), event title, and short description; "Future chapters" teaser section at bottom. _New page._
- [ ] **History page — US map SVG**: Inline SVG of the contiguous US states; Tampa Bay highlighted in `--color-accent-primary` (coral); all other states in muted `--color-bg-tertiary`; tooltip on hover: "Tampa Bay Chapter — Est. 2025" using a CSS tooltip (no JS dependency); map scales responsively and is `aria-hidden="true"` with a visible text fallback below. _New. Depends on: history page shell._
- [ ] **Contact page** (`contact.html`): Form (name / email / org / message / submit) styled with `--input-bg`, `--input-border`, `--input-border-focus`, `--input-shadow-focus`; client-side required-field validation with visible error messages; business inquiries callout box (navy background, cream text); email address display. _New page._
- [ ] **Donate page** (`donate.html`): Hero section "Every dollar cleans a coastline"; three donation tier cards (placeholder amounts $25 / $50 / $100) with active/selected state; clearly labeled Stripe integration placeholder div (dashed border, explanatory text); corporate/large donation contact section that mirrors the contact callout box style. _New page._

## Interactions & Polish

- [ ] **Nav interactions**: Verify sticky behavior on scroll (add `box-shadow` when scrolled > 0px via scroll event listener); confirm burger drawer opens/closes correctly; confirm Escape key closes drawer; confirm focus is trapped inside open drawer (keyboard nav). _Depends on: global nav._
- [ ] **Donate button micro-interaction**: `transform: scale(1.04)` on hover with `transition: transform var(--duration-fast) var(--easing-bounce)`; confirm on all pages. _Depends on: global nav._
- [ ] **Form validation states**: Error state styling for invalid inputs (red border using `--color-status-error`, inline error message below field); success state after submission (replace form with confirmation message). _Depends on: contact page._

## Responsive & Accessibility

- [ ] **Responsive pass — all pages**: Verify at 375px (mobile), 768px (tablet, nav collapse breakpoint), 1024px (small desktop), 1280px (desktop). Check: nav burger works, hero stacks, team grid changes columns, history timeline goes single-column, map scales, stat row wraps gracefully. _Touches all pages._
- [ ] **Accessibility pass**: Confirm skip-to-content link visible on focus; all interactive elements keyboard-navigable with visible focus ring (`--shadow-focus`); all SVGs have `aria-hidden="true"` or appropriate `role`/`aria-label`; form inputs have `<label>` associations; color contrast ≥ 4.5:1 for normal text, ≥ 3:1 for large text (WCAG AA). _Touches all pages._

## Review

- [ ] **Design review**: Run `/design-review` against the brief.
