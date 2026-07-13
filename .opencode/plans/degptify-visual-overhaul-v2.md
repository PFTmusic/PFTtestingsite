# PFT Site Visual Overhaul Plan

**Goal:** "Degptify" the site styling. Move from the current navy/mint/blue palette to a white-ground, orange/amber-accent design with red and black as supporting colours. Retain the frosted glass navigation and Instrument Sans font. Replace dark orbit visuals with SVG dot distribution patterns. Restyle the DNA sequence display as subtle ambient texture with keyword highlights. **All panels light -- no dark cards, no dark sections.** The "inky black card with gradient" is the single biggest signpost of a vibecoded site and is eliminated entirely.

**Reference influences (in order of visual weight):**
1. **Acrea** -- healthcare identity, clean compact layouts, Instrument Sans, balanced colour palette on white -- https://fontsinuse.com/uses/69921/acrea
2. **Arclin** -- bold orange accent, colour-coded sectors, industrial/scientific precision -- https://fontsinuse.com/uses/64741/arclin
3. **PSI** -- SVG dot/particle distribution as brand texture, dynamic particle identity -- https://fontsinuse.com/uses/63036/paul-scherrer-institute-psi
4. **Fermented Films** -- strong typographic contrast, all-caps display hierarchy, white backgrounds -- https://fontsinuse.com/uses/64040/fermented-films-1

**Constraint:** Hugo static site, zero new dependencies, vanilla CSS only. No framework changes.

**Design principle:** The entire site is white-ground. Contrast comes from typography weight, orange/red accents, and subtle border/line work -- never from dark background fills. Sector visual regions are light with SVG dot patterns as placeholders for future imagery/video.

---

## Stage 1: New Colour Palette

**File:** `assets/css/main.css` -- `:root` block (lines 10-31)

Replace all colour tokens:

| Token | Old | New | Purpose |
|---|---|---|---|
| `--ink` | `#071923` (navy) | `#0a0a0a` (near-black) | Primary text |
| `--ink-soft` | `#19313b` | `#3d3d3d` | Secondary text |
| `--paper` | `#f3f4ef` (warm off-white) | `#ffffff` (pure white) | Page background |
| `--paper-deep` | `#e6ebe5` | `#f8f8f7` | Footer, subtle sections |
| `--muted` | `#6b7b80` | `#7a7a7a` | Tertiary text |
| `--line` | `rgba(7,25,35,0.14)` | `rgba(0,0,0,0.08)` | Light borders |
| `--line-light` | `rgba(255,255,255,0.18)` | (remove) | No dark panels = not needed |
| `--white` | `#fbfcf8` | `#ffffff` | Text on dark bg |
| `--blue` | `#82a9ec` | (remove) | Old healthcare accent |
| `--mint` | `#9bd8c1` | (remove) | Old biotech accent |
| `--orange` | `#e99b73` | `#e8720c` | Primary accent (shifted to amber-orange) |
| `--yellow` | `#eacb86` | (remove) | Old consumer accent |

Add new tokens:

| Token | Value | Purpose |
|---|---|---|
| `--accent` | `#e8720c` | Alias for current sector accent |
| `--accent-deep` | `#c45f08` | Darker accent for hover/active |
| `--red` | `#c73e1d` | Secondary accent (biotech, motifs, emphasis) |
| `--red-soft` | `rgba(199,62,29,0.12)` | Subtle red tint for backgrounds |
| `--orange-soft` | `rgba(232,114,12,0.10)` | Subtle orange tint for backgrounds |

Also update `hugo.toml` line 12:
- `themeColor`: `'#071923'` --> `'#0a0a0a'`

---

## Stage 2: Propagate Palette Through All Selectors

**File:** `assets/css/main.css`

Go through every selector that references the old colour tokens and update. Key areas:

### 2a. Body & global (lines 44-54)
- `body` background: replace blue/mint radial gradients with a single subtle orange radial gradient on white:
  ```css
  background:
    radial-gradient(circle at 85% 10%, rgba(232,114,12,0.06), transparent 30rem),
    var(--paper);
  ```

### 2b. Focus ring (lines 70-74)
- `a:focus-visible, button:focus-visible` outline: `var(--orange)` --> `var(--red)` (stronger visibility on white)

### 2c. Brand mark (lines 120-131)
- Keep `var(--ink)` background (black badge on white nav = high contrast, clean)

### 2d. Nav CTA and buttons (lines 183-318)
- `.nav-cta` background: `var(--ink)` --> `var(--accent)` (orange CTA button)
- `.nav-cta:hover` background: `var(--ink-soft)` --> `var(--accent-deep)`
- `.button-primary` background: `var(--ink)` --> `var(--accent)` (orange primary buttons)
- `.button-primary:hover` background: `var(--ink-soft)` --> `var(--accent-deep)`
- `.button-light:hover` background: stays orange family --> `var(--accent-deep)`

### 2e. Eyebrow dot (lines 246-253)
- `background: var(--orange)` stays (already orange)
- Update `box-shadow` rgba value to match new `--orange`

### 2f. Headings (lines 269-273)
- `h1 em, h2 em` colour: `var(--orange)` --> `var(--accent)` (stays orange via token)

### 2g. Sector card accents (lines 684-687)
```css
.sector-healthcare    { --accent: #e8720c; --accent-deep: #c45f08; }
.sector-biotechnology { --accent: #c73e1d; --accent-deep: #a33218; }
.sector-enterprise    { --accent: #0a0a0a; --accent-deep: #3d3d3d; }
.sector-consumer      { --accent: #e8720c; --accent-deep: #c45f08; }
```

### 2h. Panels: principles, feature, contact (lines 689-841)

All panels become light. No dark backgrounds anywhere on the site.

**Principles panel:**
- Background: `var(--ink)` --> `var(--paper)` (white) or `var(--paper-deep)` (near-white)
- Colour: `var(--white)` --> `var(--ink)` (dark text)
- Remove `::before` decorative dark circle entirely
- Add a left border accent: `border-left: 3px solid var(--accent);`
- `.principles-heading .eyebrow` colour: `var(--mint)` --> `var(--accent)` (orange)
- `.principles-heading > p:last-child` colour: `rgba(255,255,255,0.64)` --> `var(--muted)` (grey text on white)
- `.principles-list article` border-top: `var(--line-light)` --> `var(--line)` (dark border on light bg)
- `.principles-list p` colour: `rgba(255,255,255,0.58)` --> `var(--muted)`

**Feature panel:**
- Background: `var(--ink)` --> `var(--paper)` (white)
- Colour: `var(--white)` --> `var(--ink)`
- Remove `::before` decorative circle
- `.feature-copy > p` colour: `rgba(255,255,255,0.68)` --> `var(--muted)`
- `.feature-spec` background: `rgba(255,255,255,0.05)` --> `var(--paper-deep)` or `rgba(0,0,0,0.03)` (very faint grey)
- `.feature-spec` border: `rgba(255,255,255,0.16)` --> `var(--line)`
- `.feature-spec li` colour: `rgba(255,255,255,0.8)` --> `var(--ink-soft)`

**Contact panel:**
- Background: `var(--ink)` --> `var(--paper)` (white)
- Colour: `var(--white)` --> `var(--ink)`
- Remove `::before` decorative circle
- `.contact-copy p` colour: `rgba(255,255,255,0.68)` --> `var(--muted)`
- `.button-light` stays as-is (was light bg on dark, now becomes accent button or similar)

**Work cards:**
- `.work-card-featured` gradient: remove blue gradient, use subtle orange tint instead:
  ```css
  background: linear-gradient(145deg, rgba(232,114,12,0.06), rgba(255,255,255,0.35));
  ```

### 2i. Sequence motif (lines 920-931)
- See Stage 3 for full replacement of this block

---

## Stage 3: Restyle the DNA Sequence Display

**Files:** `assets/css/main.css` (lines 920-931), `layouts/index.html` (lines 23-31)

### 3a. CSS: Replace all three sequence iterations

Remove lines 920-931 entirely (fallback + v4 + v5). Replace with a single clean block.

**Design intent:** Ambient texture. The sequence fills the right column of the hero grid as barely-there scrolling monospace text. Regular characters are very faint. PFT keyword motifs are slightly more visible in red -- the "signal in the noise" metaphor. No container, no card, no border. Just text as texture.

New CSS:
```css
/* DNA sequence texture */
.sequence-display {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.sequence-display::before,
.sequence-display::after {
  position: absolute;
  right: 0;
  left: 0;
  z-index: 1;
  height: 6rem;
  content: "";
  pointer-events: none;
}
.sequence-display::before {
  top: 0;
  background: linear-gradient(to bottom, var(--paper), transparent);
}
.sequence-display::after {
  bottom: 0;
  background: linear-gradient(to top, var(--paper), transparent);
}
.sequence-window {
  height: 100%;
  overflow: hidden;
}
.sequence-track {
  animation: pft-sequence-scroll 28s linear infinite;
  will-change: transform;
}
.sequence-row {
  display: flex;
  min-height: clamp(2.65rem, 5.6vh, 3.4rem);
  align-items: center;
  border-bottom: 1px solid var(--line);
}
.sequence-row__index {
  display: none;
}
.sequence-string {
  display: block;
  width: 100%;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.07);
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: clamp(1.05rem, 2.1vw, 1.55rem);
  letter-spacing: 0.07em;
  line-height: 1;
  white-space: nowrap;
}
.sequence-string .motif {
  color: rgba(199, 62, 29, 0.18);
  font-weight: 700;
}
@keyframes pft-sequence-scroll {
  to { transform: translateY(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .sequence-track { animation: none; }
}
@media (max-width: 640px) {
  .sequence-display { min-height: 20rem; }
  .sequence-row { min-height: 2.5rem; }
  .sequence-string {
    font-size: clamp(0.95rem, 4.5vw, 1.25rem);
    letter-spacing: 0.035em;
  }
}
```

Key values:
- Regular text: `rgba(0,0,0,0.07)` -- ~7% opacity, very faint on white
- Motif text: `rgba(199,62,29,0.18)` -- ~18% opacity red, visible but quiet
- Scroll speed: 28s (unchanged, accessible)
- Top/bottom fade gradients use `var(--paper)` so they blend into the page

### 3b. HTML: Static fallback with motif spans

**File:** `layouts/index.html`, lines 23-31

Current: 4 rows, no `.motif` spans.

**Important:** `sequence.js` (13 lines) already generates the full sequence dynamically at runtime -- it picks random positions, inserts keywords from an array, and duplicates rows for infinite scroll. The static HTML is only the no-JS fallback.

Update the static HTML to include a few `.motif` spans so the metaphor reads even without JS:

```html
<div class="sequence-display" role="img" aria-label="Scrolling DNA-like sequences with highlighted PFT keywords">
  <div class="sequence-window" aria-hidden="true">
    <div class="sequence-track" data-sequence-track>
      <div class="sequence-row"><span class="sequence-string">ACGTACGT<span class="motif">PRECISION</span>ACGTACGTACGT</span></div>
      <div class="sequence-row"><span class="sequence-string">TGCA<span class="motif">HEALTHCARE</span>TGCATGCATGCA</span></div>
      <div class="sequence-row"><span class="sequence-string">CGATCGATCGATCGATCGATCGATCGATCGAT</span></div>
      <div class="sequence-row"><span class="sequence-string">GCTA<span class="motif">BIOLOGY</span>GCTAGCTAGCTAGCTA</span></div>
    </div>
  </div>
</div>
```

### 3c. JS: Expand keyword array (optional)

**File:** `assets/js/sequence.js` (line 5)

Current keywords: `['PRECISION', 'BIOTECHNOLOGY', 'HEALTHCARE', 'FUTURE', 'TECHNOLOGY']`

Consider expanding to include more PFT-specific terms that match the site copy:
```js
const keywords = ['PRECISION', 'HEALTHCARE', 'BIOLOGY', 'SIGNAL', 'USEFUL', 'SYSTEMS', 'DESIGN', 'CLEAR', 'PFT'];
```

This is a small change but makes the motif hits feel more connected to the actual site content. The JS already handles random placement and the CSS targets `.motif` -- no other changes needed in the JS.

Keep `role="img"` and `aria-label` on the container. Keep `aria-hidden="true"` on the inner div.

---

## Stage 4: Replace Sector Visual Orbits with SVG Dot Patterns

**Files:** `layouts/partials/sector-page.html`, `assets/css/main.css`

### 4a. HTML: Replace sector-visual contents

**File:** `layouts/partials/sector-page.html` (lines 15-27)

Current contents of `.sector-visual`:
- `.sector-visual-grid` (grid overlay)
- `.sector-scan-header` (monospace header bar)
- `.sector-code-panel` (central info card with backdrop blur)
- `.sector-scan-lines` (decorative lines)
- Three `.visual-label` pills
- `.visual-footnote`

Replace all inner content with an inline SVG dot distribution:

```html
<div class="sector-visual" role="img" aria-label="{{ .Params.visualLabel }}">
  <svg class="dot-pattern" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <!-- ~50 circles scattered across the viewBox -->
    <!-- Varying cx, cy, r (1-4), fill using --accent and --red at varying opacities -->
    <circle cx="120" cy="80" r="2.5" fill="var(--accent)" opacity="0.45"/>
    <circle cx="340" cy="150" r="1.5" fill="var(--accent)" opacity="0.25"/>
    <circle cx="560" cy="90" r="3" fill="var(--red)" opacity="0.35"/>
    <!-- ... ~47 more circles ... -->
    <!-- Cluster some near centre, scatter others peripherally -->
    <!-- A few larger circles (r=4) at low opacity for depth -->
    <!-- One or two very small high-opacity accent dots for visual anchors -->
  </svg>
</div>
```

The exact circle positions should be hand-placed for a natural, non-uniform distribution. Aim for:
- 55% of dots using `fill="var(--accent)"` (sector colour)
- 30% using `fill="var(--red)"` (accent contrast)
- 15% using `fill="var(--ink)"` at very low opacity 0.05-0.10 (subtle depth)
- Cluster density higher toward centre, sparser at edges
- Varied sizes: mostly r=1-2, a few r=3-4

### 4b. CSS: Clean up sector-visual styles

Remove all orbit-related CSS:
- `.orbit-system, .sector-orbit` (line 392-400)
- `.orbit, .sector-ring` (line 402-408)
- `.orbit-one/two/three, .sector-ring-one/two/three` (lines 410-424)
- `.orbit-one/two/three` animations (lines 426-436)
- `.orbit-core, .sector-core` (lines 438-463)
- `.orbit-node, .sector-node` and position classes (lines 488-504)
- `.sector-visual-grid` (lines 370-390)
- `.sector-scan-header` (line 929)
- `.sector-code-panel` and all children (line 929)
- `.sector-scan-lines` (line 929)
- `.visual-label, .visual-label-one/two/three` (lines 803-806)
- `.visual-footnote` (line 807)
- All `@keyframes spin-*` (lines 843-845)

Update `.sector-visual`:
```css
.sector-visual {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  min-height: clamp(27rem, 47vw, 38rem);
  border-radius: 2rem;
  background: var(--paper-deep);
  border: 1px solid var(--line);
}
.dot-pattern {
  width: 100%;
  height: 100%;
}
```

Keep `.sector-visual` in the hero grid -- it still occupies the right column on sector pages.

### 4c. Per-sector SVG colour mapping

| Sector | `--accent` | Dot primary | Dot secondary |
|---|---|---|---|
| Healthcare | `#e8720c` | orange | red |
| Biotechnology | `#c73e1d` | red | orange |
| Enterprise | `#0a0a0a` | black/near-black | orange |
| Consumer | `#e8720c` | orange | red |

Since each sector page already applies a class (`.sector-healthcare` etc.) that sets `--accent`, the SVG circles using `fill="var(--accent)"` will automatically pick up the correct colour. All dots are on light background now -- no white-on-dark needed.

---

## Stage 5: Homepage Hero (No Structural Change)

**File:** `layouts/index.html`

The hero section's 2-column grid (`.hero-shell`) already has:
- Left: `.hero-copy`
- Right: `.sequence-display`

The `.sequence-display` replaces the old `.hero-stage` as the right-column visual. No HTML structural change needed. CSS changes in Stage 3 handle the transformation from "dark orbit stage" to "ambient sequence texture on white."

Verify the grid works:
```css
.hero-shell {
  grid-template-columns: minmax(0, 1fr) minmax(22rem, 0.92fr);
}
```
The left column has hero text. The right column has faint scrolling DNA texture. On the white background, the sequence acts as subtle visual texture -- present but not competing with the copy.

---

## Stage 6: Base Meta Update

**File:** `hugo.toml`
- Line 12: `themeColor = '#071923'` --> `themeColor = '#0a0a0a'`

**File:** `layouts/_default/baseof.html`
- No changes needed (already reads `themeColor` from params via `{{ site.Params.themeColor }}`)

---

## Stage 7: Responsive Breakpoint Audit

**File:** `assets/css/main.css`

### 980px breakpoint (lines 852-870)
- `.hero-shell` goes single-column -- sequence texture should fill full width behind/around hero copy
- `.sector-visual` (now SVG dot pattern) should maintain aspect ratio at `width: min(100%, 40rem)`
- Sector grid collapses to 2 columns (no change needed)
- Light panels stack to single column (no change needed)

### 640px breakpoint (lines 872-918)
- `.sequence-display`: `min-height: 20rem`, `font-size: clamp(0.95rem, 4.5vw, 1.25rem)`
- `.sector-visual`: `min-height: 24rem; border-radius: 1.4rem;` (keep)
- Verify all updated `rgba()` values don't have mobile overrides still referencing old colours
- `.sequence-display::before/::after` fade gradients: ensure they still blend with `var(--paper)` at mobile widths

---

## Stage 8: Build and Verify

1. Run `hugo server` and check every page:
   - Homepage: hero with sequence texture, sector cards, principles panel, work grid, contact panel
   - `/healthcare/`: hero with orange SVG dot pattern, focus cards, feature panel, principles, CTA
   - `/biotechnology/`: same structure, red accent
   - `/enterprise/`: same structure, black/white accent
   - `/consumer/`: same structure, orange accent
   - Footer on all pages
2. Check frosted glass nav on scroll (should still work with updated rgba values)
3. Check mobile at 640px and 375px widths
4. Check `prefers-reduced-motion` (sequence should stop scrolling)
5. Verify no old colour tokens remain -- search CSS for: `#071923`, `#19313b`, `#82a9ec`, `#9bd8c1`, `#eacb86`, `#e99b73`
6. Verify no dark panel backgrounds remain -- search CSS for `var(--ink)` as a `background` value (should only appear on `.brand-mark` and `.skip-link`)

---

## Files Changed (Summary)

| File | Change |
|---|---|
| `assets/css/main.css` | Full palette swap, sequence restyle, orbit removal, all panels to light, sector visual cleanup |
| `layouts/index.html` | Add `.motif` spans to static sequence fallback |
| `layouts/partials/sector-page.html` | Replace orbit/code-panel HTML with inline SVG dot patterns |
| `assets/js/sequence.js` | Optional: expand keyword array |
| `hugo.toml` | Update `themeColor` |

**Files NOT changed:** `baseof.html`, `site-nav.html`, `site-footer.html`, all content `.md` files.

---

## What's Retained

- Hugo framework, zero new dependencies
- Instrument Sans font (self-hosted woff2)
- Frosted glass navigation header (same technique, updated rgba)
- All layout grid and responsive logic
- All HTML structure and accessibility attributes
- DNA sequence concept (restyled as ambient texture, not removed)
- PFT keyword motif highlights (core visual metaphor)
- All animation infrastructure (scroll keyframes, reduced-motion fallback)
- Content and copy across all pages

## What's Eliminated

- All dark panel backgrounds (principles, feature, contact, sector visuals, hero stage)
- Orbit animations and all related CSS (orbit rings, nodes, cores, keyframes)
- Sector scanner panel (code panel, scan header, scan lines, visual labels, footnote)
- Grid overlay pattern on dark sections
- `--blue`, `--mint`, `--yellow` tokens
- `--line-light` token (was for borders on dark backgrounds)
