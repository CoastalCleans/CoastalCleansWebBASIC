---
title: Netlify — Hosting & Functions
type: resource
created: 2026-05-27
updated: 2026-05-27
tags: [resource, netlify, hosting, functions, deployment]
---

# Netlify — Hosting & Functions

Reference for the Netlify deployment setup for coastalcleans.org.

---

## Deployment

- Auto-deploys from GitHub `main` branch
- No build step — Netlify serves the repo root as-is
- Functions deploy from `netlify/functions/`

---

## netlify.toml

Key configuration:
```toml
[build]
  functions = "netlify/functions"

[[plugins]]
  package = "@netlify/plugin-functions-install-core"
```

The `@netlify/plugin-functions-install-core` plugin is critical — it runs `npm install` inside the functions directory before bundling. Without it, the build fails with "Cannot find module 'stripe'".

---

## Environment Variables

All set in Netlify dashboard → Site settings → Environment variables.

| Variable | Purpose | Status |
|----------|---------|--------|
| `STRIPE_SECRET_KEY` | Stripe Checkout sessions | ⏳ Needs setup |
| `SENDER_API_KEY` | Sender.net subscriber API | ✅ Set |
| `SENDER_GROUP_ID` | Sender.net group ID (`dBvyON`) | ✅ Set |
| `SITE_URL` | Production URL for redirects | ✅ Set (`https://coastalcleans.org`) |
| `NOTIFY_ADMIN_KEY` | Auth key for old Brevo notify function | 🗂️ May be stale |

---

## Netlify Forms

Contact form works automatically — no setup needed.
- Form tag: `<form name="contact" netlify>`
- Hidden field: `<input name="form-name" value="contact">` (required for AJAX)
- Submissions: Netlify dashboard → Forms → contact

---

## Functions Directory

`netlify/functions/`:
- `create-checkout.js` — Stripe integration
- `subscribe-sender.js` — Sender.net subscriber (active)
- `subscribe.js` — Old Brevo (superseded)
- `send-event-notification.js` — Old Brevo (superseded)
- `package.json` — `{ "dependencies": { "stripe": "^22.1.0" } }`

Functions are available at `/.netlify/functions/<name>` in production and `http://localhost:8888/.netlify/functions/<name>` with Netlify Dev locally.

---

## Secrets Scanning

Netlify scans deployed source for hardcoded secrets. The build was once blocked by:
- `process.env.SENDER_GROUP_ID || 'dBvyON'` in `subscribe-sender.js:17`
- The literal env var value as a fallback triggered the scanner

**Rule:** Never use env var values as fallbacks in source code. Always fail loudly if the env var is missing.

---

## Deploy Checklist

Before pushing a change that touches functions:
1. Confirm `netlify/functions/package.json` has all dependencies listed
2. Confirm no hardcoded secrets or env var values in source
3. Confirm `netlify.toml` still has the functions-install plugin

---

## Related Notes
- [[01 Projects/CoastalCleans/Integrations]]
- [[03 Resources/Stripe]]
- [[03 Resources/Sender.net]]
