# Web sprint — next implementation packet

Status: AFK Product Utility repository reconciliation is complete enough to unblock web work. Public AFK PR #22 is the clean reconciliation line; AFK Product Shell + app-owned Python remains separate product work and may proceed in parallel.

Allusions visual convergence is also complete: the checked-in `candidate.html` direction was rendered in Chromium at 390 / 768 / 1440, showed no horizontal overflow at those widths, and is now the selected production-source direction. See `allusions-convergence-decision.md`.

This document intentionally removes most historical context so the next pass can start quickly.

## Priority order

1. Allusions studio productionization
2. AFK web identity/terminology cleanup
3. Adaptive Media dedicated product site
4. ValClips public evidence/product surface
5. cross-site link/status normalization

Do not serialize unrelated product engineering behind the web sprint. AFK Product Shell, Adaptive Media, and ValClips work may continue in isolated lanes. Only pause a specific operation for an actual shared-machine or release-authority conflict.

## Packet A — Allusions studio productionization

### Inputs already prepared

- `allusions-studio-site-brief.md`
- `allusions-production-blueprint.md`
- `allusions-convergence-decision.md`
- `product-status-registry.md`
- `cross-site-identity-system.md`
- `web-launch-matrix.md`
- `prototypes/allusions-studio/candidate.html`
- `prototypes/allusions-studio/studio.css`
- `prototypes/allusions-studio/candidate.css`

The original D2 Studio and D2 Quiet files remain design provenance only; do not spend another pass re-selecting art direction.

### Objective

Port the selected candidate into a dedicated `allusions-site` repository/production branch and turn it into a small production-quality static site.

### Required production work

- remove internal prototype/status disclaimers;
- preserve the selected information hierarchy and copy unless a concrete production issue requires a change;
- keep `Adaptive Media` as the current media product name unless a separate rename decision is approved;
- re-verify AFK/Adaptive Media/ValClips public status immediately before launch;
- use self-hosted assets or an intentional system-font stack;
- add strict CSP/security headers, `robots.txt`, and a small 404 if useful;
- add canonical/OG metadata only once the deployment origin is known;
- preserve skip link, focus-visible behavior, reduced-motion handling, semantic headings, and responsive layout;
- run 320px plus 195px/reflow stress checks in addition to the completed 390/768/1440 evidence;
- run privacy/path/secret scan before public deployment.

### Important constraints

- no fourth clean-sheet direction;
- no production deployment from the AFK site repo;
- semantic HTML/CSS/minimal JS;
- no analytics by default;
- no fake product screenshots;
- no client-side GitHub/release-state dependency;
- product pages remain authoritative for download/release claims.

### Stop point

Stop for explicit visual/production approval after the dedicated-repo preview and final responsive screenshot set. Do not deploy publicly without that approval.

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

- non-trivial production layout regression after the selected Allusions direction is ported;
- non-trivial cross-repo rename/integrity problems;
- release/deployment blockers;
- ambiguous product-truth conflicts.

Do not spend high/ultra effort rerunning settled art-direction exploration.
