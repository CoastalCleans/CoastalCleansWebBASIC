---
title: Sender.net — Email & Subscriber Platform
type: resource
created: 2026-05-27
updated: 2026-05-27
tags: [resource, sender, email, subscribers, integrations]
---

# Sender.net — Email & Subscribers

Reference for the Sender.net integration (replaced Brevo on 2026-05-26).

---

## Status

✅ **Subscriber API live and verified in production**
⏳ Welcome email automation needs one-time Sender dashboard setup

---

## Account

| Field | Value |
|-------|-------|
| Account email | `coastal.clean.30@gmail.com` |
| Dashboard | app.sender.net |
| Group name | CoastalCleans Event Notifications |
| Group ID | `dBvyON` |
| API endpoint | `https://api.sender.net/v2/subscribers` |

---

## Env Vars (Netlify dashboard)

```
SENDER_API_KEY      Bearer token from app.sender.net → Settings → API Keys
SENDER_GROUP_ID     dBvyON
SITE_URL            https://coastalcleans.org
```

⚠️ If you see "Invalid or expired token" errors → regenerate `SENDER_API_KEY` in Sender dashboard and update Netlify env var immediately.

---

## Subscribe Flow (technical)

`netlify/functions/subscribe-sender.js`:
```json
POST https://api.sender.net/v2/subscribers
Authorization: Bearer <SENDER_API_KEY>
{
  "email": "user@example.com",
  "firstname": "Jane",
  "lastname": "Doe",
  "groups": ["dBvyON"]
}
```

Returns `200 { "success": true }` on success. Handles duplicates gracefully.

---

## Free Plan API Limits (discovered 2026-05-26)

| Capability | Status |
|-----------|--------|
| Subscriber creation/management | ✅ Works |
| Group creation/listing | ✅ Works |
| Campaign creation | ❌ Requires paid plan (returns 302) |
| Workflow creation via API | ❌ Returns 405 — use dashboard |
| Transactional email via API | ❌ Returns 405 — use dashboard |

---

## Welcome Email Automation Setup (one-time, ~3 min)

1. Go to **app.sender.net → Automations → New Automation**
2. Trigger: **"Subscriber joins a group"** → select **CoastalCleans Event Notifications**
3. Action: **"Send email"**
4. Fill in:
   - Subject: `Welcome to CoastalCleans, {{firstname}}!`
   - From name: `CoastalCleans`
   - From email: `hq@coastalcleans.org`
   - Content type: **HTML**
   - Paste contents of `assets/email-welcome.html`
5. **Activate** the automation

Sender automatically replaces `{{firstname}}` and `{{unsubscribe}}` merge tags.

---

## Sending Event Announcements

Run `/sender-email-flow` skill → it collects event details, adds the event card to `get-involved.html`, and generates branded campaign HTML → paste into Sender dashboard → Campaigns → New Campaign → HTML editor → send to group `dBvyON`.

---

## Welcome Email Template

Location: `assets/email-welcome.html`

Uses Sender merge tags:
- `{{firstname}}` — subscriber's first name
- `{{unsubscribe}}` — auto-generated unsubscribe link

---

## Old Brevo Functions (superseded)

`netlify/functions/subscribe.js` and `send-event-notification.js` are the old Brevo functions. They remain in the repo but are not used. Do not delete them yet — they may need cleanup later.

---

## Related Notes
- [[01 Projects/CoastalCleans/Integrations]]
- [[01 Projects/CoastalCleans/Pages]] (get-involved.html section)
