---
title: CoastalCleans — All 7 Pages
type: reference
created: 2026-05-27
updated: 2026-05-27
tags: [project, coastalcleans, pages, html]
---

# All 7 Pages — Structure & Content

Complete breakdown of every page on the CoastalCleans site. Useful when editing a page or adding new sections.

---

## index.html — Home

**Route:** `/`

**Sections:**
1. **Nav** — sticky, burger drawer on mobile
2. **Hero** — full-bleed background (`assets/index1.jpg`), headline, two CTAs
3. **Stats strip** — 3 impact numbers: 1 beach · ~60 lbs plastic · 9 volunteers
4. **Who We Are** — jellyfish image (`assets/jellyfish.jpg`) + mission blurb
5. **Join section** — CTA with teal background
6. **Footer** — 3-col grid, social icons, dark mode toggle

**Key classes:** `.hero`, `.stat-grid`, `.join-section`

---

## mission.html — Mission

**Route:** `/mission.html`

**Sections:**
1. **Page hero** — banner with headline
2. **Mission statement** — `.mission-split` grid (text + `assets/seahorse.jpg` floating right)
3. **Impact strip** — same 3 stats as index.html (keep in sync)
4. **Join the mission CTA** — `assets/fish.jpg` floating left
5. **Footer**

**Key patterns:**
- `.mission-split` — `display:grid;grid-template-columns:1fr 1fr`, collapses to `1fr` at ≤768px
- Both animal images use `.float` class → `manatee-float` keyframes
- Floating variants (`.mission-whale`, `.hero-sticker`) defined in inline `<style>`

---

## team.html — Team

**Route:** `/team.html`

**Sections:**
1. **Page hero** — banner
2. **Team grid** — 4 cards, each with circular photo + name + role + bio
3. **Footer**

**Team members:**
| Name | Photo | Role |
|------|-------|------|
| Elizabeth Chojnacki | `assets/ElizabethChojnacki.jpg` | Co-founder |
| Yuktha Korlakunta | `assets/YukthaKorlakunta.jpg` | Co-founder |
| Leandro Plouz | `assets/LeandroPlouz.jpg` | Co-founder |
| Madison Lee | `assets/MadisonLee.jpg` | Co-founder |

Photos are pre-cropped circles. User will swap placeholder images manually.

---

## get-involved.html — Get Involved

**Route:** `/get-involved.html`

**Sections:**
1. **Page hero**
2. **3 Tracks** — Volunteer / Subscribe / Donate, each as a `.track` card
   - Volunteer track — SignupGenius integration placeholder; `assets/volunteer1–4.jpg` collage
   - Subscribe track — email input → name modal → Sender.net API
   - Donate track — `assets/lionfish.jpg`, links to `donate.html`
3. **Corporate Partners** — `assets/downtowntp.jpg` (light) / `assets/downtowntpDARK.jpg` (dark)
4. **Event Timeline** — upcoming events + Hillsborough County map (`assets/hillsboroughcounty.jpg`)
5. **Footer**

**Subscribe flow:**
1. User enters email in `#notify-email` input
2. JS checks email validity, shows name modal (`#name-modal`)
3. Modal: first name + last name inputs, teal "Subscribe" button
4. POSTs to `/.netlify/functions/subscribe-sender`
5. On `200 {success:true}` → shows `#notify-success` div with spam reminder

**Dark/light partner image swap:**
```css
.partner-img--dark  { display: none; }
[data-theme="dark"] .partner-img--light { display: none; }
[data-theme="dark"] .partner-img--dark  { display: block; }
```

**Track reverse pattern:** `.track--reverse` uses `direction: rtl` to visually flip column order; children reset with `direction: ltr`.

---

## history.html — History

**Route:** `/history.html`

**Sections:**
1. **Page hero**
2. **Timeline** — vertical list of milestones with dates
3. **Footer**

Add new milestones with the `/add-event` skill.

---

## contact.html — Contact

**Route:** `/contact.html`

**Sections:**
1. **Page hero**
2. **Contact form** — name, email, subject, message fields
3. **Footer**

**Form submission:** Netlify Forms — `<form name="contact" netlify>`. `contact.js` intercepts submit, validates, POSTs URL-encoded to `/`. Submissions appear in Netlify dashboard → Forms → contact.

**Validation pattern:** `.has-error` class added to `#group-{field}` wrapper to show red border + reveal `.form-error` span. Uses `setError('name', true/false)`.

---

## donate.html — Donate

**Route:** `/donate.html`

**Sections:**
1. **Page hero**
2. **Donation tiers** — 3 animated bubble cards
3. **Callout box** — nonprofit disclaimer
4. **Footer**

**Donation tiers:**
| Tier | Price | Image | Class |
|------|-------|-------|-------|
| Supporter | $25 | `assets/bubble25.png` | `.bubble-item.tier-card` |
| Steward | $50 | `assets/bubble50.png` | `.bubble-item.tier-card` (most popular, largest) |
| Guardian | $100 | `assets/bubble100.png` | `.bubble-item.tier-card` |

**Bubble interaction:**
1. Click → `.is-popping` scale burst
2. JS spawns `.bubble-particle` divs (teal/blue/white, iridescent)
3. `.is-selected` activates glow state
4. `donate.js` POSTs selected amount to `/.netlify/functions/create-checkout` → redirects to Stripe

**Callout box text:** Uses `style="color:#ffffff"` for legibility on dark navy background.

**Success redirect:** After Stripe payment, redirects to `donate.html?success=true`. JS detects query param and shows confirmation UI.

---

## Related Notes
- [[Overview]] — project-level summary
- [[CSS Architecture]] — styling system
- [[Integrations]] — Stripe + Sender.net flows
