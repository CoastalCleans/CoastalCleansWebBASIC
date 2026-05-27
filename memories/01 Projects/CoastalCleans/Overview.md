---
title: CoastalCleans Website — Overview
type: project
created: 2026-05-27
updated: 2026-05-27
tags: [project, coastalcleans, website]
---

# CoastalCleans Website — Overview

A 7-page static nonprofit website for CoastalCleans, a volunteer beach cleanup organization in Tampa, FL (Hillsborough County). Built with vanilla HTML/CSS/JS. No framework, no build step.

---

## Quick Facts

| Field | Value |
|-------|-------|
| Live URL | https://coastalcleans.org |
| Repo | GitHub under CoastalCleans org |
| Hosting | Netlify (auto-deploy from `main`) |
| Stack | HTML + CSS + Vanilla JS |
| Dev server | `python3 -m http.server 9000` |
| Functions | `netlify/functions/` (Node.js) |
| CSS entry | `tokens.css → global.css → nav.css → footer.css → <style>` |

## Impact Numbers (as of founding)
- **1** beach cleaned
- **~60 lbs** plastic removed
- **9** volunteers

These appear in `index.html` (stats section) and `mission.html` (impact strip). Keep them in sync.

---

## The 7 Pages

| File | Route | Purpose |
|------|-------|---------|
| `index.html` | `/` | Hero, stats, who-we-are, join CTA |
| `mission.html` | `/mission.html` | Mission statement, impact strip, animals |
| `team.html` | `/team.html` | 4 team member cards with photos |
| `get-involved.html` | `/get-involved.html` | Volunteer/subscribe/donate tracks + event timeline |
| `history.html` | `/history.html` | Timeline of milestones |
| `contact.html` | `/contact.html` | Contact form (Netlify Forms) |
| `donate.html` | `/donate.html` | Donation bubble tiers → Stripe Checkout |

Full page details → [[Pages]]

---

## Key JS Files

| File | Loaded On | Purpose |
|------|-----------|---------|
| `js/nav.js` | Every page | Scroll shadow, active link detection, focus trap |
| `js/theme.js` | Every page | Dark/light toggle via `data-theme` on `<html>` |
| `js/contact.js` | contact.html only | Form validation + Netlify fetch submit |
| `js/donate.js` | donate.html only | Reads tier, POSTs to `create-checkout`, redirects to Stripe |

---

## Netlify Functions

| Function | Purpose |
|----------|---------|
| `create-checkout.js` | Creates Stripe Checkout Session → returns `{url}` |
| `subscribe-sender.js` | Adds subscriber to Sender.net group `dBvyON` |
| `subscribe.js` | Old Brevo function (superseded, still in repo) |
| `send-event-notification.js` | Old Brevo notify function (superseded) |

---

## Social Links (all 7 pages)
- Instagram: `https://www.instagram.com/coastal.cleanss/`
- LinkedIn: `https://www.linkedin.com/company/coastal-cleans/`

When updating footer links, update **all 7 HTML files**.

---

## What's Live / What's Pending

| Integration | Status |
|-------------|--------|
| Contact form (Netlify Forms) | ✅ Live |
| Email subscribers (Sender.net) | ✅ Live |
| Welcome email automation | ⏳ Needs Sender dashboard setup |
| Stripe donations | ⏳ Needs Stripe account + env vars |

---

## Related Notes
- [[Pages]] — detailed structure of each page
- [[CSS Architecture]] — token system, global components
- [[Integrations]] — Stripe, Sender.net, Netlify deep-dives
- [[Session Log]] — history of what changed and why
