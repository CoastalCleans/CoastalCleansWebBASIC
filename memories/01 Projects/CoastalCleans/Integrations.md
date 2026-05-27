---
title: CoastalCleans — Integrations
type: reference
created: 2026-05-27
updated: 2026-05-27
tags: [project, coastalcleans, integrations, stripe, sender, netlify]
---

# Integrations

All external service integrations for coastalcleans.org. Deep-dives in `03 Resources/` — this note is the project-specific wiring.

---

## Stripe — Donations

**Status:** ⏳ Needs Stripe account + env vars — code is complete

**Function:** `netlify/functions/create-checkout.js`

**Flow:**
```
User selects tier (donate.html)
  → donate.js POSTs to /.netlify/functions/create-checkout
  → Function creates Stripe Checkout Session
  → Returns { url }
  → Browser redirects to Stripe hosted page
  → On payment success → donate.html?success=true
```

**Env vars needed in Netlify dashboard:**
```
STRIPE_SECRET_KEY   sk_test_... (testing) or sk_live_... (production)
SITE_URL            https://coastalcleans.org
```

**npm dep:** `stripe ^22.1.0` in `netlify/functions/package.json`
**Build plugin:** `@netlify/plugin-functions-install-core` in `netlify.toml` runs `npm install` inside functions dir

**Test card:** `4242 4242 4242 4242` with any future date and any CVV

Full reference → [[03 Resources/Stripe]]

---

## Sender.net — Email Subscribers

**Status:** ✅ Subscribe API live and verified in production

**Account:** `coastal.clean.30@gmail.com`
**Group:** "CoastalCleans Event Notifications" — ID `dBvyON`
**Function:** `netlify/functions/subscribe-sender.js`

**Subscribe flow:**
```
User enters email (get-involved.html)
  → JS validates → shows #name-modal
  → User fills first name + last name
  → POSTs to /.netlify/functions/subscribe-sender
  → {email, firstname, lastname, groups: ["dBvyON"]}
  → Sender API: POST https://api.sender.net/v2/subscribers
  → 200 {success:true} → shows #notify-success (with spam reminder)
```

**Env vars (all set in Netlify dashboard as of 2026-05-26):**
```
SENDER_API_KEY      Bearer token from app.sender.net → Settings → API Keys
SENDER_GROUP_ID     dBvyON
SITE_URL            https://coastalcleans.org
```

⚠️ If you see "Invalid or expired token" errors → regenerate `SENDER_API_KEY` in Sender dashboard and update Netlify env var.

**Sender free-plan API limits:**
- ✅ Subscriber creation/management
- ✅ Group creation/listing
- ❌ Campaign creation (requires paid plan)
- ❌ Workflow creation via API (use dashboard)
- ❌ Transactional email via API (use dashboard)

**Welcome email automation (one-time dashboard setup required):**
1. app.sender.net → Automations → New Automation
2. Trigger: "Subscriber joins a group" → select "CoastalCleans Event Notifications"
3. Action: "Send email"
4. Subject: `Welcome to CoastalCleans, {{firstname}}!`
5. From: `hq@coastalcleans.org`
6. Content: paste `assets/email-welcome.html`
7. Activate

**Sending event announcements:**
Run `/sender-email-flow` → generates branded HTML → paste into Sender dashboard → Campaigns → New Campaign → HTML editor → send to group `dBvyON`

Full reference → [[03 Resources/Sender.net]]

---

## Netlify Forms — Contact

**Status:** ✅ Works automatically on deploy — no setup needed

**Form:** `contact.html` — `<form name="contact" netlify>`
**Hidden input:** `<input name="form-name" value="contact">` (required for AJAX submit attribution)
**JS:** `js/contact.js` — intercepts submit, validates, POSTs URL-encoded to `/`
**View submissions:** Netlify dashboard → Forms → contact

---

## Netlify Functions

All functions in `netlify/functions/`. Netlify auto-deploys at `/.netlify/functions/<name>`.

| Function | Status | Notes |
|----------|--------|-------|
| `create-checkout.js` | ⏳ Ready, needs Stripe keys | Creates Stripe Checkout Session |
| `subscribe-sender.js` | ✅ Live | Adds to Sender group `dBvyON` |
| `subscribe.js` | 🗂️ Superseded | Old Brevo function — kept but unused |
| `send-event-notification.js` | 🗂️ Superseded | Old Brevo notify function — kept but unused |

---

## SignupGenius — Volunteer Signup

**Status:** ⏳ Not yet integrated

Placeholder exists on `get-involved.html` volunteer track. Needs iframe or link to a SignupGenius campaign.

---

## Related Notes
- [[03 Resources/Stripe]]
- [[03 Resources/Sender.net]]
- [[03 Resources/Netlify]]
