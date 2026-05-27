---
title: Web Development — Area
type: area
created: 2026-05-27
updated: 2026-05-27
tags: [area, web-development, coastalcleans]
---

# Web Development

Ongoing responsibility: maintain and grow the CoastalCleans website.

---

## Active Project
→ [[01 Projects/CoastalCleans/Overview]]

---

## Dev Workflow

### Local Development
```bash
cd /Users/leandroplouz/Downloads/CoastalCleansBasicWeb
python3 -m http.server 9000
# Open http://localhost:9000
```

No build step. Edit an HTML/CSS/JS file → refresh browser. Changes are immediate.

### Testing a Change
1. Edit the specific page
2. `python3 -m http.server 9000` (if not running)
3. Open `http://localhost:9000/<page>.html` in browser
4. Test the edited page — **not** the full 7-page suite
5. Check dark mode if styles were changed
6. Check mobile/responsive if layout was changed

### Deploy
```bash
git add <specific files>
git commit -m "..."
git push origin main
```
Netlify auto-deploys from `main`. Live in ~1–2 minutes.

---

## Security Rules

- Never hardcode API keys, tokens, or credentials — always `process.env.*`
- Never use env var values as fallbacks (`process.env.X || 'hardcoded'` triggers Netlify secrets scanner)
- Run `/close-curtains` after any function changes
- All secrets managed in Netlify dashboard → Site settings → Environment variables

---

## Design Rules

- Accent color: teal `#6BB399` — never coral/orange
- Font: Lato for both display and body (Google Fonts)
- Dark mode: `data-theme="dark"` on `<html>`, handled by tokens.css
- `--color-text-inverse` stays light in dark mode (used on permanently-dark sections)
- No hardcoded color values — always `var(--token-name)`
- Page-specific styles in inline `<style>` block — never in shared CSS files

---

## Common Tasks

| Task | How |
|------|-----|
| Add an event | Run `/add-event` skill |
| Send event email | Run `/sender-email-flow` skill |
| Security audit | Run `/close-curtains` skill |
| Full design workflow | Run `/design-flow` skill |
| Update session log | Update `memory.md` and `01 Projects/CoastalCleans/Session Log.md` |

---

## Outstanding Work

| Item | Priority | Notes |
|------|----------|-------|
| Stripe donations live | High | Needs Stripe account + `STRIPE_SECRET_KEY` in Netlify |
| Welcome email automation | Medium | One-time Sender dashboard setup (~3 min) |
| SignupGenius volunteer integration | Low | Add iframe or link on `get-involved.html` |
