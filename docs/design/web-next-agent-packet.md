# Web sprint — next implementation packet

Status: AFK Product Utility repository reconciliation is complete enough to unblock web Packet A. Public AFK PR #22 is the clean reconciliation line; AFK Product Shell + app-owned Python remains separate product work and may proceed in parallel.

This document intentionally removes most historical context so the next pass can start quickly.

## Priority order

1. Allusions studio site
2. AFK web identity/terminology cleanup
3. Adaptive Media dedicated product site
4. ValClips public evidence/product surface
5. cross-site link/status normalization

Do not serialize unrelated product engineering behind the web sprint. AFK Product Shell, Adaptive Media, and ValClips work may continue in isolated lanes. Only pause a specific operation for an actual shared-machine or release-authority conflict.

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

### Prerequisite now satisfied

The previously blocking Product Utility repository reconciliation has a clean review line in AFK PR #22. Do not confuse that with completion of Product Shell + app-owned Python; those product changes are separate from this website identity pass.

### Work

- retire current `Friend Beta` copy in user-facing/canonical surfaces;
- choose one professional status format and apply consistently;
- point `Built by Allusions` to the live studio site once it exists;
- update metadata/tests/docs;
- inventory repository rename dependencies;
- execute public repo renames only as a separately reviewed operation after #22 disposition and link/download dependency verification.

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
