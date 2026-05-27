---
title: Stripe — Donations Integration
type: resource
created: 2026-05-27
updated: 2026-05-27
tags: [resource, stripe, payments, integrations]
---

# Stripe — Donations

Reference for the Stripe Checkout integration on `donate.html`.

---

## Status

⏳ **Code complete — needs Stripe account + env vars to go live**

---

## Architecture

```
donate.html  →  js/donate.js  →  /.netlify/functions/create-checkout
                                       ↓
                               Stripe Checkout Session created
                                       ↓
                               Browser → Stripe hosted page
                                       ↓
                               donate.html?success=true
```

---

## Donation Tiers

| Tier | Amount | Image |
|------|--------|-------|
| Supporter | $25 | `assets/bubble25.png` |
| Steward | $50 | `assets/bubble50.png` (most popular) |
| Guardian | $100 | `assets/bubble100.png` |

`donate.js` reads the selected tier by finding the `.tier-card` div with `aria-checked="true"`.

---

## Setup Checklist

1. Create a Stripe account at stripe.com (free)
2. Stripe dashboard → Developers → API Keys → copy `sk_test_...`
3. Set in Netlify dashboard → Site settings → Environment variables:
   - `STRIPE_SECRET_KEY` → `sk_test_...` (test) or `sk_live_...` (production)
   - `SITE_URL` → `https://coastalcleans.org`
4. Test with card `4242 4242 4242 4242`, any future date, any CVV
5. Swap to `sk_live_...` when ready to accept real payments

---

## Function Details (`netlify/functions/create-checkout.js`)

- Reads `STRIPE_SECRET_KEY` from env
- Reads `SITE_URL` from env for redirect URLs
- Creates Stripe Checkout Session with selected `price_id` or amount
- Returns `{ url }` for redirect

**npm dependency:** `stripe ^22.1.0` in `netlify/functions/package.json`

**Build fix:** `@netlify/plugin-functions-install-core` plugin in `netlify.toml` runs `npm install` inside the functions directory before bundling. Without it, build fails with "Cannot find module 'stripe'".

---

## Test Mode vs Live Mode

| Mode | Key prefix | Charges real cards? |
|------|-----------|---------------------|
| Test | `sk_test_...` | No |
| Live | `sk_live_...` | Yes |

Always test with test keys before switching to live.

---

## Related Notes
- [[01 Projects/CoastalCleans/Integrations]]
- [[01 Projects/CoastalCleans/Pages]] (donate.html section)
