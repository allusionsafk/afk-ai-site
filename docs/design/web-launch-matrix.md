# Allusions web launch matrix

Status: coordination checklist. Nothing here authorizes a merge or production deploy.

## Portfolio order

| Surface | Current public state | Next web action | Launch blocker |
|---|---|---|---|
| Allusions studio | No dedicated site | Render/choose D2 Studio vs D2 Quiet convergence, then create dedicated repo | visual approval + destination/status audit |
| AFK AI | B2 homepage live | terminology/identity cleanup only; keep B2 | finish AFK product-stack reconciliation before broad naming changes |
| Adaptive Media | co-hosted historical page + public standalone repo | dedicated product site/preview | settle current release authority and product name |
| ValClips | no public product surface; private repo | evidence-led product prototype | no public distribution/CTA yet |

## Allusions studio launch gate

### Content

- studio positioning approved;
- AFK status re-verified;
- Adaptive Media status re-verified;
- ValClips public/private status re-verified;
- no `Friend Beta` wording;
- no roadmap presented as shipping.

### Design

- D2 Studio / D2 Quiet compared in real browser;
- one final visual thesis selected;
- 390 / 768 / 1440 screenshots approved;
- long-wordmark and project-name mobile behavior verified.

### Technical

- dedicated repository;
- semantic static HTML/CSS;
- strict CSP;
- self-hosted assets;
- no analytics;
- no fake UI;
- privacy/path/secret audit clean;
- production URL verified after deploy.

## AFK identity cleanup gate

Do this after the current AFK Product Utility stack reaches a clean checkpoint.

### Terminology

- change current public `Friend Beta` language to the approved professional status system;
- keep exact version separate from channel label;
- update homepage tests at the same time;
- update README/support/security/current release copy;
- do not rewrite historical Git history.

### Maker link

- `Built by Allusions` points to the real studio site only after it exists;
- verify external-link behavior and CSP.

### Repository naming

Potential public renames:

- `localai-windows-starter` → `afk-ai`;
- `localai-windows-starter-site` → `afk-ai-site`.

Do not combine these with internal Python/package renames.

Before rename:

- close/reconcile fragile stacked PR state;
- inventory hard-coded GitHub URLs;
- verify website Worker download source URLs;
- preserve GitHub redirects;
- update issue templates/support links;
- test old URLs after rename.

### Deployment naming

The Cloudflare Worker/deployment ID can remain legacy initially. Do not rename deployment and GitHub repositories in the same pass without a concrete benefit.

## Adaptive Media site gate

- presentation name confirmed (`Adaptive Media` unless explicit Demi rename approval);
- standalone release authority understood;
- old shared-repo release links clearly historical if still referenced;
- current screenshots captured from current application;
- Dolby Vision wording checked against canonical contract;
- native playback and compatibility export described separately;
- no universal HDR/Atmos claims;
- public CTA matches actual release availability;
- dedicated deploy does not depend on AFK Worker.

## ValClips site gate

- decide whether the product is ready to be named publicly beyond Allusions portfolio entry;
- public CTA exists and works;
- public/private repository decision explicit;
- 3–6 cleared output examples;
- no usernames/private recording metadata/local paths in examples;
- performance evidence carries dates/methodology;
- no guaranteed-virality language;
- no fake upload/download path;
- game branding does not imply Riot affiliation.

## Cross-site final gate

When all surfaces exist:

- maker attribution consistent;
- Allusions links resolve;
- product links resolve;
- status vocabulary consistent;
- security/contact routes intentional;
- canonical/OG metadata unique per product;
- no cross-product mega-nav that makes the products look like one app;
- no external trackers introduced;
- redirects verified after any repository/domain rename;
- a broken product deploy cannot break the Allusions studio homepage.

## Suggested execution packets

### Packet A — Studio convergence

- render D2 Studio and D2 Quiet;
- choose/converge;
- create production-ready static source in a dedicated repository;
- stop before deploy for visual approval.

### Packet B — AFK identity cleanup

- terminology retirement;
- maker link;
- current docs/UI copy;
- tests;
- no homepage redesign.

### Packet C — Adaptive Media dedicated site

- product brief → prototype → screenshots → public-truth audit → preview deploy;
- do not republish old release artifacts as a side effect.

### Packet D — ValClips evidence surface

- collect/clear evidence first;
- prototype without download CTA if distribution is not ready;
- publish only after the product/public boundary is intentional.

## Stop conditions

Stop a launch rather than improvising if:

- product status cannot be verified;
- download/release authority is ambiguous;
- a public artifact exposes private paths/users/tokens;
- product naming is unsettled in a way that would cause immediate redirects/rework;
- CI/CSP/accessibility gates regress;
- a website would imply a feature/release that does not exist.
