# Information Architecture: CoastalCleans

## Site Map

- Home `/index.html`
- Our Mission `/mission.html`
- Our Team `/team.html`
- Get Involved `/get-involved.html`
- Our History `/history.html`
- Contact Us `/contact.html`
- Donate `/donate.html`

## Navigation Model

- **Primary navigation**: Logo (left) | Our Mission · Our Team · Get Involved · Our History · Contact Us (center) | Donate (right, CTA pill)
- **Secondary navigation**: None — flat site.
- **Utility navigation**: Social icons in footer.
- **Mobile navigation**: Burger icon → full-screen slide-in drawer with stacked links + Donate button.

## Content Hierarchy

### Home
1. Hero — tagline "Cleaning coastlines, saving sea life" + Join Us CTA
2. Mission snapshot — 3-stat row (beaches cleaned, lbs trash, volunteers)
3. Who we are — short paragraph + cartoony manatee sticker
4. Get Involved teaser — 3 cards (Volunteer, Donate, Partner)
5. Footer

### Our Mission
1. Mission statement headline
2. Core values (3 pillars: Clean, Protect, Educate) with marine icons
3. Impact stats
4. CTA → Get Involved

### Our Team
1. Founder/leadership cards
2. Volunteer spotlight
3. Join the team CTA

### Get Involved
1. Three tracks: Volunteer, Donate, Corporate Partner
2. Each track has description + primary action button
3. Upcoming events list (placeholder)

### Our History
1. Timeline: 2025 founding → present
2. US map with Tampa Bay chapter pin
3. "Future chapters" teaser section

### Contact Us
1. Contact form (name, email, org, message, submit)
2. Business/corporate inquiries callout box
3. Email address display

### Donate
1. Hero: "Every dollar cleans a coastline"
2. Donation tier cards (placeholder amounts)
3. Stripe integration placeholder div (clearly labeled)
4. Corporate/large donation contact section

## User Flows

### Visitor wants to volunteer
1. Lands on Home → sees "Get Involved" card → clicks → `/get-involved.html` → clicks Volunteer button → scrolls to form/contact

### Corporate donor evaluates org
1. Lands on Home → clicks Our Mission → clicks Our Team → clicks Donate → sees corporate contact section

### General donor gives
1. Clicks Donate in nav → lands on `/donate.html` → selects tier → Stripe placeholder

## Naming Conventions

| Concept | Label in UI | Notes |
|---------|-------------|-------|
| Primary action | Donate | Always this word, never "Give" or "Fund" |
| Participation | Get Involved | Not "Join" or "Volunteer" (encompasses all tracks) |
| Organization history | Our History | Not "About" — distinct from mission |
| Chapters | Chapters | Future-proof; Tampa Bay is "Tampa Bay Chapter" |

## Component Reuse Map

| Component | Used on | Behavior differences |
|-----------|---------|---------------------|
| Global nav | All pages | Active state on current page link |
| Footer | All pages | None |
| Section wave divider | Home, Mission, History | Color varies |
| Marine sticker (manatee) | Home, Mission | Position varies |
| CTA button (coral) | All pages | Label and href vary |

## URL Strategy

- Pattern: flat `/page-name.html`
- No dynamic segments for v1
- All internal links use relative paths
