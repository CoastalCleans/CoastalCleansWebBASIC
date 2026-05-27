---
title: CoastalCleans — Session Log
type: log
created: 2026-05-27
updated: 2026-05-27
tags: [project, coastalcleans, log]
---

# Session Log

Chronological history of all Claude Code sessions on the CoastalCleans site. Captures what changed, what was decided, and why.

---

## 2026-05-27 — Obsidian Vault + QMD Search Setup

**Work done:**
- Installed QMD (`@tobilu/qmd`) globally as local search engine
- Created this Obsidian vault at `memories/` inside the repo
- Seeded vault with complete knowledge of the site: all 7 pages, CSS architecture, all integrations, resource docs
- Added `memories/` as QMD collection `coastalcleans`
- Configured QMD as Claude Code MCP server

**Decisions:**
- IPARAG folder structure (Inbox / Projects / Areas / Resources / Archive / Growth-Templates)
- Vault stays inside the repo so it's co-located with the code it documents
- QMD provides hybrid BM25 + semantic search locally — no cloud required

---

## 2026-05-26 (evening) — Subscriber Flow Live

**Problem:** Netlify builds were failing. `subscribe-sender.js` line 17 had `process.env.SENDER_GROUP_ID || 'dBvyON'` — the literal value of the env var as a fallback, triggering Netlify's secrets scanner.

**Fix:** Removed the fallback. Function now fails loudly if env var is missing (safer).

**Also:** Discovered `SENDER_API_KEY` had expired. User regenerated in Sender dashboard, updated Netlify env var.

**Verification:** Full end-to-end test via Playwright on live site confirmed `200 {success:true}`.

**Files changed:**
- `netlify/functions/subscribe-sender.js:17` — removed hardcoded fallback
- `get-involved.html:514` — updated `#notify-success` text with spam/promotions reminder

---

## 2026-05-26 (earlier) — Brevo → Sender.net Migration

**Why:** Brevo API integration had unresolved issues; Sender.net has a more generous free plan.

**Work done:**
- Created Sender group "CoastalCleans Event Notifications" (ID: `dBvyON`) via API
- Built `netlify/functions/subscribe-sender.js`
- Added name-collection modal to `get-involved.html` (blurred backdrop, side-by-side name inputs, teal button, focus trap, ESC closes)
- Created `assets/email-welcome.html` with `{{firstname}}` / `{{unsubscribe}}` Sender merge tags
- Created `.claude/skills/sender-email-flow/` skill for generating event campaign HTML

**Sender API limits discovered (free plan):**
- ✅ Subscriber/group CRUD
- ❌ Campaigns, workflows, transactional email → dashboard only

**Outstanding:** Welcome automation needs one-time Sender dashboard setup → see [[Integrations]]

---

## 2026-05-21 — SEO, Performance, Email

**SEO:**
- Added `<link rel="canonical">` to all 7 pages
- Added OpenGraph tags (`og:title`, `og:description`, `og:image`) to all 7 pages
- Created `sitemap.xml` and `robots.txt`

**Performance:**
- Async font loading: `<link rel="preload" as="style" onload="...">` pattern
- `defer` attribute on all `<script>` tags
- `loading="lazy"` on 15 below-fold images
- `<link rel="preload">` on `assets/index1.jpg` (hero LCP image)

**Email cleanup:**
- Replaced all 13 instances of `coastal.clean.30@gmail.com` with `hq@coastalcleans.org` across all HTML, JS, and functions files

**Repo cleanup:**
- Removed `.design/` directory from git tracking
- Updated `.gitignore`

---

## 2026-05-20 — Security & Automation Skills

**Created skills:**
- `close-curtains` — security audit, detects 18+ secret patterns, auto-extracts to `.env`
- `never-forget` — context preservation, updates CLAUDE.md after sessions
- Unified `design-flow` — orchestrates full design-to-deploy workflow including both skills

**Security audit baseline (full repo scan):**
- 0 secrets found — all credentials already use `process.env.*`
- `.env` already in `.gitignore`

---

## Earlier Sessions — Initial Build

**What was built:**
- All 7 static HTML pages
- CSS token system (`tokens.css`, `global.css`, `nav.css`, `footer.css`)
- Dark mode (`theme.js` + `data-theme` attribute pattern)
- Nav with burger drawer (`nav.js` + `nav.css`)
- Contact form with Netlify Forms (`contact.js`)
- Donation bubbles with Stripe Checkout (`donate.js` + `create-checkout.js`)
- Subscriber flow with Brevo → migrated to Sender.net
- Team photos, asset library
- Netlify deployment pipeline

**Design decisions locked in:**
- Teal `#6BB399` as accent, never coral/orange
- Both fonts are Lato (Google Fonts)
- `.float` class for animal animations
- `.track--reverse` using `direction: rtl` for visual flip
- `data:,` favicon on all pages (suppresses 404)
