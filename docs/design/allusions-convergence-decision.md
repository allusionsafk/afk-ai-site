# Allusions studio visual convergence decision

Status: visual direction selected for production port. This does not authorize deployment from the AFK site repository.

## Decision

Use `prototypes/allusions-studio/candidate.html` as the production-source direction.

It is the D2 Studio-led convergence candidate: stronger than D2 Quiet, but more controlled and legible than the original D2 Studio prototype.

## Browser evidence

The three source candidates were rendered in headless Chromium at 390, 768, and 1440 CSS pixels using the checked-in prototype HTML/CSS.

Measured document widths matched every requested viewport exactly:

| Candidate | 390 | 768 | 1440 |
|---|---:|---:|---:|
| D2 Studio | 390 | 768 | 1440 |
| D2 Quiet | 390 | 768 | 1440 |
| Convergence candidate | 390 | 768 | 1440 |

No horizontal page overflow was observed at those widths.

Measured full-page heights:

| Candidate | 390 | 768 | 1440 |
|---|---:|---:|---:|
| D2 Studio | 2620 | 2248 | 2004 |
| D2 Quiet | 2393 | 2156 | 1786 |
| Convergence candidate | 2650 | 2275 | 1840 |

The height numbers are evidence about current layout density, not performance targets.

## Why the convergence candidate wins

### Stronger product hierarchy

The original D2 Studio is visually distinctive, but its asymmetric media row and `Demi / Adaptive Media` label become too dominant and awkward at desktop scale. The convergence candidate uses the current canonical `Adaptive Media` name and keeps all three products legible as peers.

### Better studio positioning

`Software that takes responsibility for the machinery.` communicates the common product philosophy more precisely than `Tools that absorb complexity.` while avoiding generic software-company language.

The supporting line remains short and domain-specific: local AI, difficult media, and gameplay production.

### Better maturity/truth handling

The selected candidate keeps literal status labels next to each product:

- AFK AI — Beta
- Adaptive Media — In development
- ValClips — In development

It does not create a ValClips download CTA and does not present unreleased Adaptive Media behavior as shipping.

### Better mobile identity

At 390px:

- the Allusions wordmark remains intact;
- top navigation fits without horizontal overflow;
- hero hierarchy remains strong;
- product entries collapse into a readable single-column sequence;
- the dark working-standard band remains visually separate without becoming the whole page.

### Better balance than D2 Quiet

D2 Quiet is the shortest and calmest variant, but it loses too much of the portfolio/studio character. The convergence candidate retains the stronger Allusions identity and editorial register while borrowing restraint from D2 Quiet.

## Production changes still required

Before moving this into the dedicated `allusions-site` repository:

1. remove prototype/status disclaimers that exist only for internal review;
2. preserve the current copy/status registry and re-verify product truth immediately before launch;
3. use self-hosted font assets or an intentional system-font stack;
4. add production CSP/security headers and `robots.txt`;
5. add canonical/OG metadata once the deployment origin is known;
6. preserve skip-link, focus-visible, reduced-motion, semantic headings, and responsive behavior;
7. run 320px and 195px/reflow stress checks in addition to the completed 390/768/1440 pass;
8. perform a final privacy/path/secret scan;
9. deploy only from the dedicated Allusions repository, never from AFK's production deployment.

## Art-direction closeout

Do not generate a fourth clean-sheet Allusions direction unless a concrete production constraint invalidates this candidate.

The next Allusions work is implementation/productionization, not more art-direction exploration.
