---
name: AFK AI site
description: The warm local workbench. Real AFK AI windows on a warm bench, plain copy on paper, one dark action, closing on an ink band.
colors:
  paper: "#f8f7f3"
  material: "#eee8dc"
  ink: "#1f211d"
  support: "#5f625a"
  separator: "#d5d3ca"
  focus: "#435f8d"
  ink-raised: "#3a3d36"
  paper-pressed: "#e4e2dc"
  reversed-support: "#c8c9c2"
  reversed-focus: "#b9c7e2"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Segoe UI Variable Display, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5.6vw, 4.6rem)"
    fontWeight: 620
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bricolage Grotesque, Segoe UI Variable Display, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.6vw, 2.9rem)"
    fontWeight: 620
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline-close:
    fontFamily: "Bricolage Grotesque, Segoe UI Variable Display, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 4.4vw, 3.6rem)"
    fontWeight: 620
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  wordmark:
    fontFamily: "Bricolage Grotesque, Segoe UI Variable Display, Segoe UI, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 650
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Segoe UI Variable Text, Segoe UI, system-ui, -apple-system, Helvetica Neue, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 650
    lineHeight: 1.35
  lede:
    fontFamily: "Segoe UI Variable Text, Segoe UI, system-ui, -apple-system, Helvetica Neue, sans-serif"
    fontSize: "clamp(1.1rem, 1.6vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "Segoe UI Variable Text, Segoe UI, system-ui, -apple-system, Helvetica Neue, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  caption:
    fontFamily: "Segoe UI Variable Text, Segoe UI, system-ui, -apple-system, Helvetica Neue, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  machine:
    fontFamily: "IBM Plex Mono, Cascadia Mono, Consolas, monospace"
    fontSize: "0.86em"
    fontWeight: 400
    fontFeature: "tnum"
rounded:
  sm: "4px"
  md: "8px"
spacing:
  gutter: "clamp(1.25rem, 3.4vw, 2.75rem)"
  section: "clamp(3.5rem, 8vw, 6.5rem)"
  measure: "36rem"
  wrap: "78rem"
  target: "44px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "0.55rem 1.25rem"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.ink-raised}"
  button-compact:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "0.4rem 1rem"
  button-reversed:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0.55rem 1.25rem"
    height: "44px"
  button-reversed-hover:
    backgroundColor: "{colors.paper-pressed}"
  bench:
    backgroundColor: "{colors.material}"
    rounded: "{rounded.md}"
    padding: "clamp(0.6rem, 1.8vw, 1.5rem)"
  emphasis-section:
    backgroundColor: "{colors.material}"
    textColor: "{colors.ink}"
    padding: "{spacing.section} 0"
  closing-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.headline-close}"
    padding: "{spacing.section} 0"
  top-bar:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "4rem"
  nav-link:
    textColor: "{colors.support}"
    height: "44px"
  nav-link-hover:
    textColor: "{colors.ink}"
---

# Design System: AFK AI site

## Overview

**Creative North Star: "The Warm Local Workbench"**

A workbench, not a launch page. The product is shown by its own real windows, each resting on a warm material bench, with plain copy beside them on paper. The palette is the AFK AI app's own: warm paper, one warm material, near-black ink, a muted support ink, quiet separators and a single blue reserved for focus. There is one dark action per region, and the page closes on one ink band that holds the final download, an echo of the ALLUSIONS studio's single dark reversal.

Density is calm and document-like: generous section spacing, a readable measure, facts set as ruled rows rather than cards. Headings in Bricolage Grotesque tie the page to the ALLUSIONS family; everything else reads in the Windows UI face, because the product is a Windows app. The page is light only, static HTML and CSS with no JavaScript. Its one motion is the lead window sliding onto the bench once.

The world refuses the category defaults of gradient hero art, feature-icon grids, fake terminals and capability maps that stand in for the product. The captures are the imagery.

The legacy page at `/adaptive-media/` is outside this system and keeps its own older stylesheet (`public/assets/site.css`).

**Key Characteristics:**
- Real app captures on a warm bench are the only imagery; each carries a dated caption and documented provenance.
- One warm material, used in exactly two roles: the bench and the single emphasised section.
- One dark primary action per region; secondary actions are quiet underlined links.
- One ink reversal, at the end, as the page's close.
- Flat paper: no shadows. Depth comes from material and rules.
- Mono only inside running text, for machine strings.
- No homepage JavaScript; light scheme only; 44px targets; motion only when the visitor has not asked for less.

## Colors

A warm, low-chroma neutral world with one cool note, and that note is reserved for focus.

### Primary
- **Workbench Ink** (ink): text, the 2px rules that top list items, the primary action's fill, and the closing band. Reads 15.1:1 on paper and 13.3:1 on material.
- **Raised Ink** (ink-raised): the primary action's hover fill only.

### Neutral
- **Warm Paper** (paper): the page ground, the top bar (at 94% over a 10px blur), and text on ink.
- **Bench Material** (material): the surface under every real window, and the background of the single emphasised section, "Where your data goes".
- **Support Ink** (support): secondary prose, captions, nav links, section notes and fact definitions. 5.8:1 on paper, 5.1:1 on material.
- **Quiet Separator** (separator): 1px section tops, fact-row rules and the top bar's lower edge. Structural only; never used for text.
- **Pressed Paper** (paper-pressed): the reversed button's hover inside the ink band.
- **Reversed Support** (reversed-support): secondary text inside the ink band (9.7:1).

### Focus
- **Workbench Blue** (focus): the 2px focus outline, offset 3px, on paper and material. Inside the ink band the outline switches to **Reversed Focus** (reversed-focus, 9.5:1 on ink).

### Named Rules
**The One Bench Rule.** Material appears in exactly two places: under real app windows and as the one emphasised section. No other card, panel or band uses it. A second emphasised section breaks the rule.

**The Blue Is Focus Rule.** The only chromatic colour on the page marks keyboard focus. It is never decoration, a link colour or a fill.

**The Reserved Green Rule.** Green belongs to a qualified success state, as in the app, and does not appear on the homepage. Do not use it for decoration or for "ready" claims the page cannot show.

## Typography

**Display Font:** Bricolage Grotesque, self-hosted variable 400 to 800 (with Segoe UI Variable Display, Segoe UI, system-ui)
**Body Font:** Segoe UI Variable Text (with Segoe UI, system-ui, -apple-system, Helvetica Neue)
**Machine Font:** IBM Plex Mono 400, self-hosted (with Cascadia Mono, Consolas)

**Character:** A slightly idiosyncratic grotesque, set tight at 620, carries the ALLUSIONS family voice in the headings; the Windows UI face carries everything a visitor reads for facts, so the page sounds like the app it sells.

### Hierarchy
- **Display** (620, clamp 2.6 to 4.6rem, 0.98, -0.035em, balanced): the single h1 in the intro.
- **Headline** (620, clamp 2 to 2.9rem, 1.02, -0.03em, balanced): section h2s.
- **Headline, close** (620, clamp 2.2 to 3.6rem): the h2 in the closing ink band only.
- **Wordmark** (650, 1.25rem, -0.01em): "AFK AI" beside the mark in the top bar.
- **Title** (body face, 650, 1.125rem, 1.35): h3s over steps and boundary columns, and fact terms. Titles stay in the body face; only h1, h2 and the wordmark use Bricolage.
- **Lede** (400, clamp 1.1 to 1.3rem, 1.55): the one intro paragraph.
- **Body** (400, 1.0625rem, 1.65): all prose. Intro copy holds a 36rem measure; section heads hold 44rem.
- **Caption** (400, 0.875rem, 1.5, support ink): figure captions, the installer line and the capture note.

### Named Rules
**The Machine Span Rule.** IBM Plex Mono appears only inline, at 0.86em with tabular figures, for strings a machine produced: the version (`0.2.0-rc1`), the installer filename and build IDs (`37cbaed`). It never sets a heading, a label, a section marker or a paragraph.

**The No Kicker Rule.** Headings stand on their own. No eyebrow, kicker, reference label or numbered section tag sits above them.

## Layout

A single centred column, `min(100% - 2 × gutter, 78rem)`, with a fluid gutter (1.25 to 2.75rem) and a fluid section rhythm (3.5 to 6.5rem top and bottom). Sections are separated by a 1px separator on top; the emphasised section drops that rule, and so does the section that follows it.

- **Top bar:** sticky, 4rem tall; mark and wordmark on the left, section links and a compact Download on the right. Below 48rem the section links hide and Download holds the right edge.
- **Intro:** stacked on small screens. At 64rem and up it becomes a 5:7 grid: copy on the left, the lead window on the right. The lead bench grows past the wrap to meet the **right page edge**, squaring its right corners and deepening its padding (1.25 to 2.5rem). The intro clips horizontal overflow so the bleed and its entrance never cause sideways scroll.
- **Steps:** three columns from 48rem, one before.
- **Window pair:** two columns from 64rem.
- **Fact sections:** a 4:7 two-column split from 56rem, heading and note on the left, content on the right. Fact rows become a 9rem term column plus definition from 40rem.
- **Boundary columns** (in the emphasised section): two columns from 40rem.
- **Closing band and footer:** two-column and three-column rows from 56rem.
- **Phone crops:** below 40rem each window swaps, through `picture`/`source`, to a portrait crop of the part that carries the evidence rather than shrinking the whole window.

Breakpoints in use: 40rem, 48rem, 56rem, 64rem.

## Elevation & Depth

Flat. There is no `box-shadow` anywhere in the system. Depth is tonal and structural: paper is the ground, material lifts a window or the emphasised section by colour alone, and ink closes the page. The single translucency is the sticky top bar: paper at 94% with a 10px backdrop blur where supported, so content passing beneath stays faintly legible without competing.

### Named Rules
**The Flat Paper Rule.** Nothing casts a shadow. If a surface needs to stand forward, it is material or it is ink.

**The Ink Close Rule.** The page has exactly one ink reversal, and it is the last section before the footer, holding the final download. It is the close, not a second emphasised section; nothing ink appears mid-page.

## Shapes

Restrained corners and straight rules. Actions and the skip link are gently rounded (4px). Benches are softer (8px) because they are material, not controls; the lead bench keeps only its left corners rounded where it bleeds off the right edge. Lines do the structural work: 1px separators between sections and fact rows, and a 2px ink rule over each step and each boundary column, marking where an item starts.

## Components

### Buttons
Solid, quiet and unmistakable.
- **Shape:** gently rounded (4px), inline-flex, at least 44px tall.
- **Primary:** ink fill, paper text, weight 600, padding 0.55rem 1.25rem. One per region: intro, top bar, closing band.
- **Hover / Focus:** fill shifts to raised ink over 140ms ease-out; no movement. Focus is the 2px blue outline offset 3px.
- **Compact:** the top-bar Download, 0.9375rem text, padding 0.4rem 1rem; it keeps the 44px target.
- **Reversed:** inside the ink band the button inverts to paper fill and ink text, with pressed paper on hover and the reversed focus outline.
- **Quiet link:** the secondary action beside a primary ("What to check first"), weight 600, underlined, 44px tall. It is never styled as a second button.

### Links
Inherit the text colour, underline at 1px offset 0.22em; hover thickens the underline to 2px. No colour change.

### Bench window (signature)
A real capture of the AFK AI app sitting on the material bench: the image is padded (0.6 to 1.5rem, 1.25 to 2.5rem on the lead) inside an 8px material surface, with a support-ink caption below at the reading measure. Captions date the capture and disclose the build it came from. Every raster is backed by `public/assets/captures/PROVENANCE.md`; nothing inside a window is drawn or retouched.

### Facts
A definition list set as ruled rows: 1px separator above the list and below each row, the term in 650 ink, the definition in support ink. From 40rem the term takes a 9rem column.

### Ruled items
Steps and boundary columns open with a 2px ink rule and 1rem of space, then an h3 title and support-ink prose. Order comes from the ordered list, not from drawn badges.

### Limits list
Unbulleted items where a bold ink lead sentence is followed by support-ink explanation in the same item.

### Navigation
Top bar links in support ink at 0.9375rem, 44px tall, turning ink on hover; hidden below 48rem. Footer links wrap in a row, each 44px tall. The maker credit to Allusions stays a quiet line in the footer.

### Skip link
Ink block (4px corners) with paper text, held above the viewport until focused.

### Motion
The lead window's image slides onto the bench once: from 2.5rem right and 40% opacity to rest, 700ms on `cubic-bezier(0.16, 1, 0.3, 1)`. It runs only under `prefers-reduced-motion: no-preference`, and the window is fully visible without it. Smooth anchor scrolling is switched off under `reduce`.

## Do's and Don'ts

### Do:
- **Do** show the product with real, dated captures on the material bench, and add each new raster to PROVENANCE.md.
- **Do** keep one dark primary action per region and pair it with a quiet link, not a second button.
- **Do** end the page on the single ink band that holds the final download.
- **Do** keep every interactive target at least 44px tall, including compact variants.
- **Do** serve a portrait crop through `picture`/`source` below 40rem instead of shrinking a wide window.
- **Do** gate any motion on `prefers-reduced-motion: no-preference` and keep content visible without it.
- **Do** keep fonts and assets self-hosted and styling in the stylesheet; the CSP allows same-origin only and no inline styles.

### Don't:
- **Don't** use material for anything except the bench and the one emphasised section.
- **Don't** add eyebrows, kickers, mono reference labels or numbered section tags above headings.
- **Don't** set anything but version strings, filenames and build IDs in IBM Plex Mono.
- **Don't** add shadows, gradients, glass panels beyond the top bar's blur, or a second ink band mid-page.
- **Don't** use blue for anything but focus, or green anywhere on the homepage.
- **Don't** replace captures with mock-ups, drawn UI, fake terminals, capability maps or feature-icon grids.
- **Don't** add JavaScript or a theme toggle to the homepage; it is static and light only.
