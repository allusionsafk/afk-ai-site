# Web sprint — next implementation packet

Status: handoff for the next coding agent after AFK Product Utility stack reconciliation. This document intentionally removes most historical context so the next pass can start quickly.

## Priority order

1. Allusions studio site
2. AFK web identity/terminology cleanup
3. Adaptive Media dedicated product site
4. ValClips public evidence/product surface
5. cross-site link/status normalization

Do not resume broad product engineering in the middle of this web sprint unless a product release dependency blocks truthful website work.

## Packet A — Allusions studio

### Inputs already prepared

- `allusions-studio-site-brief.md`
- `allusions-production-blueprint.md`
- `product-status-registry.md`
- `cross-site-identity-system.md`
- `web-launch-matrix.md`
- `prototypes/allusions-studio/d2-studio.html`
- `prototypes/allusions-studio/d2-quiet.html`
- `prototypes/allusions-studio/candidate.html`

### Objective

Render the three Allusions candidates in a real browser at 390 / 768 / 1440 and select/converge one production direction. The expected winner is D2 Studio-led unless rendering exposes a concrete problem.

### Important constraints

- no third clean-sheet direction;
- no deployment from the AFK site repo;
- production Allusions code goes to a dedicated `allusions-site` repository;
- semantic HTML/CSS/minimal JS;
- strict CSP;
- self-hosted assets;
- no analytics;
- no fake product screenshots;
- product status re-verified immediately before launch.

### Stop point

Stop for visual approval after a production-ready dedicated-repo branch and screenshot set. Do not deploy without explicit approval.

## Packet B — AFK identity cleanup

### Objective

Keep the deployed B2 design intact. Change identity/terminology only.

### Work

- retire current `Friend Beta` copy in user-facing/canonical surfaces;
- choose one professional status format and apply consistently;
- point `Built by Allusions` to the live studio site once it exists;
- update metadata/tests/docs;
- inventory repository rename dependencies;
- if the AFK stack is clean, execute public repo renames only as a separately reviewed operation.

### Do not

- redesign B2;
- repin the installer as a side effect;
- rename internal Python packages/CLI because public repos changed names;
- rename Cloudflare Worker at the same time unless required.

## Packet C — Adaptive Media site

### Inputs

- `adaptive-media-site-brief.md`
- `prototypes/product-sites/adaptive-media.html`
- canonical public repo `allusionsafk/adaptive-media`

### Objective

Create a dedicated product site/preview that explains playback-path evidence, reference-first behavior, runtime truth, and current release/development state.

### Blockers to resolve first

- product presentation name (`Adaptive Media` unless Demi rename explicitly approved);
- standalone release authority;
- current clean screenshots if imagery is used.

### Do not

- imply universal Dolby Vision correctness;
- turn historical shared-repo prereleases into current standalone releases;
- conflate compatibility export with native playback.

## Packet D — ValClips site

### Inputs

- `valclips-site-brief.md`
- `prototypes/product-sites/valclips.html`
- private product repo

### Objective

Build an evidence-led public prototype around source → candidate → decision → render, without pretending there is a public download if there is not.

### Blockers to resolve first

- public product/distribution decision;
- cleared real clip examples;
- privacy scrub of gameplay/user identifiers;
- fresh network/upload boundary audit.

### Do not

- expose the private repository as a consumer CTA;
- claim guaranteed virality;
- use cherry-picked metrics as causal proof.

## Packet E — Cross-site closeout

Once all public surfaces exist:

- normalize maker links;
- normalize status vocabulary;
- verify canonical URLs/OG metadata;
- verify product-to-studio navigation;
- run privacy/path/secret scan on all public repos;
- verify CSP/accessibility/mobile gates;
- verify redirects after any repo/domain rename.

## Model/effort guidance

Use the cheapest capable model for mechanical implementation.

Escalate only for:

- visual convergence judgement;
- non-trivial cross-repo rename/integrity problems;
- release/deployment blockers;
- ambiguous product-truth conflicts.

Do not spend high/ultra effort rerunning already settled art-direction exploration.
