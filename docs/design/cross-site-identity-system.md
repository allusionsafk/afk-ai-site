# Allusions cross-site identity system

Status: planning artifact. This defines family rules, not a shared component library.

## Principle

Allusions products should look related without looking cloned.

Family resemblance comes from behavior and editorial discipline:

- clear maker attribution;
- truthful status vocabulary;
- restrained typography;
- ruled/evidence-oriented composition;
- explicit product boundaries;
- semantic diagrams instead of fabricated UI;
- strong accessibility and privacy defaults.

Do not force every product into AFK's B2 instrument system or the Allusions D2 studio system.

## Naming hierarchy

### Studio

**Allusions**

Use as maker/umbrella identity.

### Products

- **AFK AI** — current public product name.
- **DemiMedia** — current public media-product name.
- **ValClips** — current product name; preserve capitalization consistently.

`Adaptive Media` is now a legacy/engineering repository identity where it remains in use (for example `allusionsafk/adaptive-media`), not the public product name. `Demi Player` is obsolete as a public-name candidate.

## Maker attribution

Every product site should include one quiet, consistent maker treatment:

> Built by Allusions.

The link target becomes the Allusions studio homepage once it exists.

Do not place a giant Allusions wordmark above every product. The product owns its page.

## Status vocabulary

Use only professional, literal states:

- Stable
- Beta
- Release candidate
- Preview
- In development
- Experimental / research

The exact version/tag is separate from the status label.

Examples:

- `AFK AI Beta · 0.1.7rc1`
- `DemiMedia · In development`
- `ValClips · In development`

Do not introduce `Friend Beta` in new work.

## Truth surfaces

Every product page should visually distinguish at least two of these when relevant:

- shipping now;
- known limitations;
- development direction;
- experimental/research work.

Roadmap copy must never be styled like an available feature.

## Shared navigation behavior

### Studio → product

The Allusions homepage links to the canonical public product site or, if none exists, to a truthful development/repository surface.

### Product → studio

Product footer/maker treatment links back to Allusions.

### Product → product

Do not add a persistent cross-product mega-nav unless user testing shows it helps. The studio homepage is the portfolio switchboard.

This keeps AFK AI, DemiMedia, and ValClips from looking like tabs in one application.

## Visual family traits

### Shared

- neutral base colors;
- one product-specific accent family;
- large but controlled display typography;
- mono/reference type for evidence/status labels;
- 1px rules and structural separators;
- meaningful dark bands rather than decorative dark sections;
- restrained animation;
- no glassmorphism/neon AI clichés;
- no fake dashboards.

### AFK AI

Keep the deployed B2 instrument identity:

- registration labels;
- hanging notation;
- setup/runtime schematics;
- paper-like light theme + dark proof sections;
- focus on setup/readiness/local boundaries.

### Allusions studio

D2-led modernist editorial identity:

- stronger wordmark;
- asymmetric project register;
- quieter copy;
- little or no product UI chrome;
- projects differentiated by typography/status/proof point.

### DemiMedia

Technical/cinematic identity:

- darker playback/telemetry surfaces;
- source → decode → render → display diagrams;
- state readouts;
- muted spectral accents tied to state;
- real media/player visuals only when current and clean.

### ValClips

Temporal/evidence identity:

- timeline bands;
- frame sequences;
- candidate windows;
- source → selected → rendered progression;
- more kinetic composition without decorative motion overload.

## Accessibility baseline

All sites must preserve:

- semantic landmarks;
- one clear page H1;
- ordered heading structure;
- visible focus;
- 44px-class primary controls where practical;
- reduced-motion support;
- AA contrast for body/functional text;
- no horizontal page overflow at 320px and reasonable zoom reflow;
- text alternatives for meaningful figures/media.

## Security/privacy baseline

Default:

- strict CSP;
- self-hosted fonts/assets;
- no analytics;
- no forms/accounts unless product need exists;
- no third-party executable scripts;
- no public screenshots containing usernames, local paths, tokens, private chat, or development tooling;
- downloads pinned/verified when the product distributes binaries.

## Repository/deployment identity

Brand names, GitHub repository names, internal packages, local paths, and deployment IDs are separate concerns.

A product rename does not require simultaneous internal/package/runtime renames.

When public repositories are renamed:

- preserve redirects where GitHub provides them;
- update canonical links deliberately;
- verify release/download URLs;
- avoid renaming deployment IDs in the same pass unless necessary;
- test external links after the migration.

For DemiMedia specifically, the public product name may be DemiMedia while the engineering repository remains `allusionsafk/adaptive-media` until a separate repository-identity decision is made.

## SEO/social identity

Each product gets its own:

- `<title>`;
- description;
- canonical URL;
- OG title/description/image;
- favicon/app mark;
- product-specific screenshot/graphic where truthful.

Allusions social cards should describe the studio, not reuse AFK artwork.

## Design-token policy

Do not create a shared npm/CSS package yet.

Keep a documented token vocabulary instead:

- neutral paper/background;
- neutral ink;
- muted evidence text;
- rule color;
- product accent;
- success/warn/error states;
- display/sans/mono roles;
- spacing and max-width principles.

Only extract a real shared package if duplication becomes operationally costly across multiple live sites.
