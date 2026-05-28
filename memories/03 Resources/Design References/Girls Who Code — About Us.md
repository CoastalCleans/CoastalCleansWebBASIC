---
title: Girls Who Code — About Us
type: reference
created: 2026-05-27
updated: 2026-05-27
tags: [design-reference, nonprofit, layout, animation, typography]
aliases: [GWC about page, Girls Who Code design patterns]
---

# Girls Who Code — About Us

Design reference captured from [https://girlswhocode.com/about-us](https://girlswhocode.com/about-us). Analyzed for layout, typography, animation, and nonprofit storytelling patterns applicable to CoastalCleans.

---

## Key Design Patterns

### 1. Hero Statement — Large Bold Mission
- Full-bleed hero with a single, punchy mission line in **very large, heavy type**
- White text on a teal/brand-color background
- No decoration — the statement IS the design
- Lesson: mission pages don't need hero images if the words are strong enough

### 2. Stat Blocks — Numbers as Anchors
Three-column grid of outsized numbers with short descriptive labels beneath:
```
860,000          425,000          10,000
Served           Alumni           AI Students
```
- Numbers use display-size font (60px+), weight 700–900
- Labels are small caps or sentence-case, muted color
- Brief context sentence below the grid
- Lesson: large numbers stop the scroll; pairs well with supporting copy

### 3. Scrolling Underline Animation
Key words and phrases in headings receive a **teal underline that draws in from left to right** as the element enters the viewport.

**Implementation:**
```css
.underline-reveal {
  background-image: linear-gradient(currentColor, currentColor);
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: 0% 3px;
  transition: background-size 0.85s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  padding-bottom: 3px;
}
.underline-reveal.is-visible {
  background-size: 100% 3px;
}
```

**Trigger via IntersectionObserver:**
```javascript
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.underline-reveal').forEach(el => io.observe(el));
```

Accessibility: add `@media (prefers-reduced-motion: reduce) { .underline-reveal { background-size: 100% 3px !important; } }`

### 4. Section Alternation (Color Rhythm)
Alternating white and light-grey section backgrounds create visual breathing room:
- White → Light Grey → White → Light Grey
- No hard dividers needed; background color is the separator
- Lesson: `.section--light` / `.section--cream` pattern already in CoastalCleans — double down on it

### 5. Values Grid — Icon + Heading + Short Copy
3-column grid of values (Bravery, Sisterhood, Activism):
- SVG icon at top (simple line icon)
- H3 heading
- 2–3 sentence description
- Cards have no border or shadow — just whitespace separation
- Lesson: pillars section on CoastalCleans follows this pattern

### 6. Organizational Transparency
- "Read Our Statement" link prominently placed
- Annual reports displayed as image thumbnails in a row
- Lesson: shows accountability; CoastalCleans could add nonprofit filings link

### 7. Data Visualization — Trend Chart
A simple line chart showing "% of women in Computer Science over time":
- Clearly sourced data
- Brief axis labels
- Takeaway stated in bold above the chart
- Not decorative — it's an argument
- Lesson: charts earn trust; always cite the source

---

## Layout Structures Observed

| Section | Layout |
|---------|--------|
| Hero | Full-bleed, single-column, centered text |
| AI stats | 3-column stat grid |
| Gender gap body copy | Single-column, ~65ch max-width |
| Gender gap chart | Inline chart below prose |
| "Changing the game" stats | 3-column stat grid |
| Values | 3-column card grid |

---

## Motion Concepts

- **Underline draw-in** — most distinctive; triggered on scroll
- **Number count-up** — not used here, but common on nonprofit stat sections
- **Image hover subtle zoom** — on annual report thumbnails
- No parallax, no heavy entrance animations — clean and purposeful

---

## Typography Notes

- Display type: very heavy weight (900), large size, tight leading
- Body: regular weight (400), comfortable measure (~65ch)
- Stats: display weight, color matches brand accent
- Labels below stats: small, muted, often all-caps or semibold
- The hierarchy is stark — display vs. body with very little in between

---

## UX Decisions

- **One primary CTA** per section — not competing actions
- **Source credibility** shown by linking to data ("1995, 37% of computer scientists were women" is a citable fact)
- **No hero image** needed when the mission statement is strong
- **Short sections** — easy to scroll through; nothing overstays its welcome

---

## Nonprofit Storytelling Techniques

1. **Open with impact, not history** — start with what you do, not when you were founded
2. **Quantify the problem, then quantify your solution** — "the gap is getting worse" → "we're closing it"
3. **Make the values concrete** — not "we care about equity" but "over 50% of our students come from underrepresented groups"
4. **Transparency builds trust** — annual reports visible, easy to access
5. **End with urgency** — "by 2030" gives readers a timeline to care about

---

## Applied to CoastalCleans

| GWC Pattern | CoastalCleans Equivalent |
|-------------|--------------------------|
| Gender gap line chart | Plastic % of marine debris donut chart |
| "860,000 served" stat block | 700+ species impacted, 80% from land |
| Values grid | Pillars: Clean / Protect / Educate |
| Underline draw-in animation | Applied to key section headings |
| Organizational transparency | NOAA + TBEP source citations |

---

## Related Notes
- [[../Research/Marine Life Statistics|Marine Life Statistics]] — data to use in stat sections
- [[../Research/Tampa Bay Coastal Data|Tampa Bay Coastal Data]] — local context
- [[../../01 Projects/CoastalCleans/Pages|CoastalCleans Pages]] — where patterns are applied
