---
title: Session Memory Log
type: log
created: 2026-05-27
updated: 2026-05-27
tags: [log, sessions]
---

# Session Memory Log

Running log of decisions, discoveries, and patterns across all Claude Code sessions. Each entry captures the *why* behind decisions so future sessions can build on them without re-deriving context.

---

## 2026-05-27 — mission.html Redesign + Vault Expansion

**What changed:**
- Redesigned `mission.html` with 7 sections (added 3 new data/context sections, removed duplicate impact strip)
- Added scrolling underline animation on key heading words (GWC-inspired)
- Added SVG donut chart (80% plastic) + CSS species bar chart with IntersectionObserver scroll animations
- Added marine-life crisis stats section (700+ species, 80%, 11M+, 32% turtles) — sourced from NOAA + EPA
- Added Tampa Bay context section — sourced from TBEP Trash Free Waters + Florida DEP
- Expanded vault: `03 Resources/Design References/Girls Who Code — About Us.md`, `03 Resources/Research/Marine Life Statistics.md`, `03 Resources/Research/Tampa Bay Coastal Data.md`
- Updated vault `CLAUDE.md` and project `CLAUDE.md` to document /defuddle, /obsidian-markdown, /obiqmd-guider skills

**Design decisions:**
- Removed "Results since founding" impact strip — it duplicated index.html stats exactly
- New stats use credible .org/.gov sources only (NOAA, EPA, TBEP)
- Scrolling underline uses CSS `background-size` transition from 0→100%, triggered by IntersectionObserver
- Donut chart uses inline SVG with animated `stroke-dashoffset` (no charting library)
- All animations respect `prefers-reduced-motion: reduce`

**Status:** ✅ Deployed to GitHub main

---

## 2026-05-27 — Obsidian Vault + QMD Setup

**What changed:**
- Created this Obsidian vault at `memories/` inside the CoastalCleans repo
- Installed QMD (`@tobilu/qmd`) globally for local semantic search
- Seeded vault with complete CoastalCleans website knowledge
- Added `memories/` as a QMD collection named `coastalcleans`
- Configured QMD as Claude Code MCP server for in-session search

**Structure created:**
```
memories/
  Home.md                          ← MOC home note
  CLAUDE.md                        ← vault-level Claude context
  memory.md                        ← this file
  00 Inbox/                        ← fleeting captures
  01 Projects/CoastalCleans/       ← full website knowledge
  02 Areas/                        ← ongoing responsibilities
  03 Resources/                    ← tool/integration reference
  04 Archive/                      ← completed work
  05 Templates/                    ← note skeletons
```

**Why:** Creates a searchable, persistent, structured second brain that survives context resets and lets Claude query project history via `qmd query`.

---

## 2026-05-26 (evening) — Subscriber Flow Live

- Fixed Netlify build: removed hardcoded `'dBvyON'` fallback from `subscribe-sender.js:17`
- Regenerated `SENDER_API_KEY` after discovering it had expired
- Verified full end-to-end subscriber flow on live site via Playwright
- Updated `#notify-success` text to remind users to check Spam/Promotions

**Status:** Subscriber flow fully live at `https://coastalcleans.org/get-involved.html`

---

## 2026-05-26 (earlier) — Brevo → Sender.net Migration

- Replaced Brevo with Sender.net as email/subscriber platform
- Created Sender group "CoastalCleans Event Notifications" (ID: `dBvyON`)
- Built `netlify/functions/subscribe-sender.js`
- Added name-collection modal to `get-involved.html`
- Created `assets/email-welcome.html` — branded welcome template with `{{firstname}}`
- Created `.claude/skills/sender-email-flow/` skill

**Sender free-plan limits discovered:**
- ✅ Subscriber/group CRUD works via API
- ❌ Campaign/workflow/transactional creation → requires paid plan or dashboard

**Outstanding:** Welcome automation needs one-time Sender dashboard setup (see `03 Resources/Sender.net.md`)

---

## 2026-05-21 — SEO, Performance, Email Cleanup

- Added canonical tags, OpenGraph, sitemap.xml, robots.txt to all 7 pages
- Async font loading, `defer` on scripts, `loading="lazy"` on 15 below-fold images
- Replaced all 13 instances of `coastal.clean.30@gmail.com` → `hq@coastalcleans.org`
- Removed `.design/` from git tracking

---

## 2026-05-20 — Security & Automation Skills

- Created `close-curtains` security audit skill (18+ secret patterns)
- Created `never-forget` context preservation skill
- Unified `design-flow` to include security + context phases
- All skills are local: `./.claude/skills/`
