# Design Brief: CoastalCleans Website

## Problem

People who care about the ocean have no easy way to find, trust, or join a local coastal cleanup effort in Tampa Bay. Corporate partners and donors have no credible landing page to evaluate the organization before committing resources.

## Solution

A multi-page nonprofit website that feels both trustworthy and genuinely warm — like a local organization run by people who love the sea. Cartoony marine animal stickers signal approachability without sacrificing credibility. Every page answers one question clearly and moves the visitor toward a single action.

## Experience Principles

1. **Trustworthy first, playful second** — Solid structure and clear information hierarchy before decorative elements. The whale stickers delight; they do not distract.
2. **One action per page** — Each page has a primary CTA. No page tries to do everything.
3. **Built to grow** — Tampa Bay now, chapters worldwide later. The map and team sections are designed to expand without redesign.

## Aesthetic Direction

- **Philosophy**: Coastal nonprofit badge culture — clean, approachable, maritime heritage. Think vintage conservation poster meets modern nonprofit landing page.
- **Tone**: Warm, trustworthy, community-driven. Not corporate. Not childish.
- **Reference points**: TPV (Tortugas Playa Venao) site structure; National Park Service badge aesthetics; REI Co-op approachability.
- **Anti-references**: Generic charity template sites; neon/electric ocean aesthetics; overly corporate blue-suit vibes.

## Existing Patterns

- No prior codebase — greenfield static HTML/CSS/JS site.
- Logo: Circular badge, royal blue (#1A4FA8) outer ring, cream (#F5F1E8) inner oval, black whale silhouette, "COASTAL CLEANS / 2025 / SAVE OUR SEA". Dark outer glow to be cropped via CSS `object-fit` and circular clip.
- Typography direction: Rounded display font (Fredoka) + readable body (Nunito).

## Component Inventory

| Component | Status | Notes |
|-----------|--------|-------|
| Global nav | New | Logo left, links center, Donate CTA pill right, burger mobile |
| Footer | New | Links, social, tagline |
| Hero section | New | Full-width, wave SVG divider, headline + sub + CTA |
| Marine animal stickers | New | Inline SVG, blue/black manatee style |
| US map (Tampa highlight) | New | Inline SVG, static, Tampa Bay pin, expandable later |
| Team cards | New | Photo placeholder + name + role |
| Donate page | New | Stripe placeholder div + business contact form section |
| Contact form | New | Name, email, org, message; no backend yet |

## Key Interactions

- **Nav**: Sticky on scroll, burger menu on mobile slides in from right.
- **Donate button**: Coral/amber pill in nav, hover scales slightly, links to `/donate.html`.
- **Map**: Static SVG with Tampa Bay highlighted in accent color; tooltip on hover shows "Tampa Bay Chapter — Est. 2025".
- **Stickers**: Subtle float animation on hero stickers only.

## Responsive Behavior

- Mobile-first. Nav collapses to burger at 768px.
- Hero: Stacked on mobile, side-by-side on desktop.
- Team cards: 1 col mobile → 2 col tablet → 3 col desktop.

## Accessibility Requirements

- WCAG AA minimum contrast on all text.
- All interactive elements keyboard navigable.
- SVG animals have `aria-hidden="true"`.
- Skip-to-content link.

## Out of Scope

- Backend/CMS, actual Stripe integration, real team photos, social media feeds, blog/news section.
