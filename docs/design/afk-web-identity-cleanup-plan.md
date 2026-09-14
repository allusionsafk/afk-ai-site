# AFK AI web identity cleanup plan

Status: queued after AFK Product Utility stack reconciliation and Allusions studio launch. Do not execute while the AFK PR stack is still being reconciled.

## Objective

Modernize AFK's public identity without reopening the B2 homepage redesign or changing the currently pinned installer by accident.

The cleanup has four independent concerns:

1. terminology;
2. maker linkage;
3. repository naming;
4. deployment/domain naming.

Keep them separable.

## 1. Terminology

Retire `Friend Beta` from current canonical/user-facing AFK surfaces.

Preferred direction:

> AFK AI Beta · <exact version>

or, where channel precision matters:

> AFK AI · Release candidate <exact version>

Choose one format before editing and apply it consistently to:

- website metadata and visible copy;
- README/PRODUCT/SUPPORT/SECURITY/CONTRIBUTING pages;
- installer-facing status strings;
- Control Center/status UI strings;
- issue templates/support routing;
- release notes/descriptions for current releases;
- tests asserting public copy.

Historical commits/closed PRs/archived plans remain historical.

## 2. Maker linkage

After the Allusions site is live:

- change `Built by Allusions` from a generic/GitHub destination to the studio homepage;
- keep Allusions visually subordinate to AFK;
- verify target behavior and accessibility;
- do not add a portfolio mega-nav to AFK.

## 3. Public repository rename

Planned public naming direction at the next clean engineering checkpoint:

- `allusionsafk/localai-windows-starter` → `allusionsafk/afk-ai`
- `allusionsafk/localai-windows-starter-site` → `allusionsafk/afk-ai-site`

Before renaming:

- all critical stacked AFK PRs are reconciled/landed/closed;
- no agent depends on the old exact repo URL mid-task;
- inventory hard-coded repo links in website, product repo, private workbench, release scripts, issue templates, docs, and CI;
- confirm GitHub redirect behavior;
- record canonical release/download URLs;
- ensure website Worker fetches remain valid through GitHub redirects or update them in a reviewed pass.

After renaming:

- test old GitHub URLs;
- test current release assets;
- test website `/download` end to end without execution;
- update canonical public links;
- update support/security issue routing;
- update repository descriptions/topics if used.

## 4. Internal names stay put initially

Do not automatically rename:

- Python package `localai`;
- `localai` CLI if it remains a compatible internal/product interface;
- local development folders;
- private workbench paths;
- Docker/runtime identifiers that are already safely scoped;
- Cloudflare Worker ID.

Public branding and internal implementation identity are different migration layers.

## 5. Cloudflare/deployment identity

Current Workers.dev name may remain legacy initially.

Only rename/move the deployment when there is a concrete public-domain plan.

If a custom domain is introduced later:

- make the custom domain canonical;
- retain old Workers.dev availability if useful;
- add redirects where appropriate;
- update OG/canonical metadata;
- re-test CSP and `/download` behavior;
- do not combine with installer repinning.

## 6. Current B2 design is protected

The identity cleanup must not change:

- core B2 layout;
- hero information hierarchy;
- setup schematic;
- Shipping/Beta/Direction truth surfaces;
- local/network boundary model;
- future demo seam;
- accessibility/reflow fixes.

Any visual change beyond identity/link/copy consistency should require a separate justification.

## 7. Installer/download boundary

Terminology and repo-name cleanup must not silently change what `/download` serves.

Before and after every identity/naming operation verify:

- release tag;
- expected filename;
- pinned SHA-256;
- Worker behavior;
- HTTP success/fail-closed behavior.

A new product build is a separate release operation.

## 8. Final search

At closeout, search current canonical repositories for:

- `Friend Beta`
- `friend beta`
- `friend-beta`
- `friend_beta`
- `FriendBeta`
- `localai-windows-starter`
- `localai-windows-starter-site`

Classify each remaining result as:

- historical and intentionally preserved;
- internal and intentionally preserved;
- current public reference that still needs migration.

Do not use a blind global replacement.

## Exit condition

The cleanup is complete when:

- no current public/user-facing surface uses `Friend Beta`;
- AFK status/version language is consistent;
- maker links resolve to Allusions;
- public repo naming is either migrated or explicitly deferred with a tested redirect plan;
- `/download` still serves exactly the intended build;
- the B2 page remains visually/functionally unchanged except for approved identity copy/link updates.
