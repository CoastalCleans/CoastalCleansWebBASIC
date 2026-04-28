# Design Brief: Dark Mode Toggle

## Problem
Users browsing the site in low-light environments have no way to switch to dark mode manually — they're at the mercy of their system preference. The tokens are ready but the toggle doesn't exist.

## Solution
A sun/moon icon button in the footer that instantly flips the site between light and dark mode. Removing the copyright clutter from the bottom bar and surfacing the EIN creates a cleaner, more credible nonprofit footer.

## Experience Principles
1. Invisible until needed — sits in the footer bottom bar, always accessible but never distracting
2. Instant response — no transition delay on the toggle itself, the page theme transitions handle the feel
3. Honest controls — the icon always shows the current mode's symbol (sun = light active, moon = dark active)

## Aesthetic Direction
- **Philosophy**: Coastal Conservation Badge — matches existing site identity
- **Tone**: Calm, credible, minimal
- **Reference points**: Current footer aesthetic (dark navy, cream text)
- **Anti-references**: Animated toggle switches, pill toggles, anything that draws attention away from content

## Existing Patterns
- Typography: Fredoka (display) + Nunito (body) → being updated to Lato
- Colors: footer uses `--color-bg-footer` (navy), `--color-text-inverse` (cream)
- Motion: `--duration-fast` (150ms), `--easing-default`, `--easing-bounce`
- Components: `.footer-bottom`, `.footer-copy`, `.footer-email`, `.social-icon`

## Component Inventory
| Component | Status | Notes |
|---|---|---|
| `.theme-toggle` button | New | Icon-only, 40×40px, circular like `.social-icon` |
| Sun SVG icon | New | Inline SVG, shown in light mode |
| Moon SVG icon | New | Inline SVG, shown in dark mode |
| `.footer-bottom` | Modify | Remove copyright `.footer-copy`, add EIN text, add toggle |
| `nav.js` or new `theme.js` | New | Toggle `data-theme` on `<html>`, no localStorage |

## Key Interactions
- User clicks toggle → `data-theme` flips on `<html>` → CSS variables cascade instantly
- Icon rotates 180° over `--duration-fast` on click (using `transform: rotate(180deg)`)
- Focus ring uses `--shadow-focus` (brand blue glow)

## Responsive Behavior
- Toggle visible at all breakpoints (mobile, tablet, desktop)
- Sits in `.footer-bottom` flex row, wraps naturally on mobile

## Accessibility Requirements
- `aria-label="Switch to dark mode"` / `"Switch to light mode"` (updates dynamically)
- `aria-pressed` reflects current state
- Keyboard-accessible, focus ring visible

## Out of Scope
- localStorage persistence
- Nav-level placement
- Animated transition on the toggle button itself (only icon rotation)
