# AFK website documentation drift after B2 deployment

Status: audit artifact for the later AFK identity/documentation cleanup. Do not merge these corrections as an incidental side effect of the Allusions prototype branch.

The B2 homepage is deployed on `master`, but several repository docs still describe the older Friend Beta / card-based visual system. This is not a runtime defect, but it will mislead future agents and contributors unless reconciled.

## `README.md`

Current stale wording includes:

- `Friend Beta` download terminology;
- pinned candidate described as `Friend Beta 0.1.7rc1`.

Needed later:

- adopt the approved professional status language;
- preserve exact `0.1.7rc1` pin and integrity behavior until a separate release changes it;
- keep the architecture description static HTML/CSS/JS + Worker.

## `PRODUCT.md`

Current drift:

- describes the product brief around a `Friend Beta` download path;
- tells writers to state `Friend Beta` limitations;
- visual direction still reflects the older blue/emerald card-oriented site rather than the deployed B2 instrument system.

Needed later:

- replace informal status terminology;
- update the product brief to the B2 truth surfaces:
  - Shipping now
  - Beta limits
  - Product proof
  - Network boundary
  - Development direction
  - Reserved real-demo seam;
- keep privacy/network wording intact unless product behavior changes.

## `DESIGN.md`

This file is materially stale relative to production.

It still records:

- the old blue/emerald palette;
- 12px card-radius/card system as the core visual language;
- old hero headline `Your AI. Your PC.`;
- old section order;
- `Friend Beta` status-chip wording;
- guidance to avoid technical styling that predates the now-approved instrument/reference system.

The deployed B2 page instead uses:

- paper/ink/rule editorial surfaces;
- registration labels and reference notation;
- ruled evidence bands;
- semantic setup/product-proof diagrams;
- stronger maturity separation;
- hero `Local AI on Windows. Less plumbing.`;
- a single controlled dark proof band;
- extreme-width reflow fixes already certified.

Needed later:

- rewrite `DESIGN.md` from the deployed B2 source/evidence rather than patching isolated tokens;
- preserve accessibility/CSP/reduced-motion requirements;
- keep the B2 page authoritative until real user evidence justifies redesign.

## `SUPPORT.md`

Current stale wording:

- calls `/download` the `Friend Beta` download route;
- describes the pinned installer as `Friend Beta`.

Needed later:

- swap to approved Beta/RC language only;
- preserve support routing and privacy warnings.

## `CONTRIBUTING.md`

Current stale wording:

- calls the site the pinned `Friend Beta` download route;
- asks contributors to preserve pinned `Friend Beta` behavior.

Needed later:

- use neutral release terminology such as `pinned AFK AI release-candidate download` or the final approved status phrase;
- preserve the key rule: normal website PRs must not repin the installer.

## `SECURITY.md`

No `Friend Beta` language found in the current file. It still contains old public repository URLs, which become migration work only if the public repos are renamed.

Do not change security routing before the destination repositories/redirects are verified.

## Public homepage / metadata

The deployed homepage itself still intentionally exposes the current informal status term in multiple places because terminology retirement has not yet been executed.

When the cleanup happens, change together:

- `<meta>` description/OG copy;
- header registration/status;
- hero maturity label;
- beta-limits section label;
- final CTA/version label;
- footer status;
- homepage contract tests.

Do not touch `/download` pin/digest as part of wording cleanup.

## Why this is separate from the Allusions prototype work

The Allusions branch is currently planning/prototype-only and changes nothing under `public/`.

Keeping this drift audit separate lets the later AFK identity pass:

1. start from an exact inventory;
2. update current canonical docs and site copy coherently;
3. run the existing B2/test gates;
4. avoid mixing a deployed-product terminology migration into portfolio design experimentation.
