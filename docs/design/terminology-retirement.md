# AFK terminology retirement — "Friend Beta"

Status: planning artifact. Do not execute as an unbounded search-and-replace.

## Decision

Retire **Friend Beta** from current AFK product language.

Preferred public terminology:

- **AFK AI Beta** for a beta release;
- **Release candidate** / exact version where precision matters, e.g. `0.1.7rc1`;
- **Preview** only if deliberately adopted as a different channel;
- version strings remain independent of marketing labels.

New Allusions, AFK, Demi / Adaptive Media, and ValClips web work should not introduce "Friend Beta".

## Scope

Migrate current, canonical, or user-facing material:

- product website copy and metadata;
- current README / PRODUCT / SUPPORT / SECURITY / CONTRIBUTING pages;
- installer and Control Center strings;
- current release notes and release descriptions;
- active tests that assert public copy;
- issue templates and current support routing;
- current screenshots / alt text when recaptured;
- current branch/docs names where renaming is low-risk and genuinely useful.

Do not rewrite history solely for terminology:

- old commit messages;
- closed historical PR discussions;
- archived/superseded plans that are clearly marked historical;
- release artifacts whose identity must remain stable.

Historical documents may receive a small note when their old terminology could mislead readers about current naming.

## Initial known inventory

### AFK product website

Current homepage and repository documentation still use the term in active public copy, including the deployed version/status language and repository README.

This should be changed only in a dedicated post-web-sprint pass or as part of a carefully bounded AFK identity cleanup, with homepage contract tests updated at the same time.

### Private AFK workbench

Current default-branch material contains several references that describe the public product as "Friend Beta", including at least:

- `README.md`
- `SUPPORT.md`
- `AGENTS.md`
- `docs/control-plane.md`
- `.github/ISSUE_TEMPLATE/config.yml`
- `.github/ISSUE_TEMPLATE/engineering-bug.yml`
- historical remediation plans

Canonical/current files should migrate. Historical plans should normally remain historical unless the old label creates present-day confusion.

### Public AFK product repository

Perform an exact repository-wide inventory after the current Product Utility stack reconciliation lands. Do not edit active stacked PRs solely for terminology while their integration state is still being resolved.

## Migration order

1. establish clean AFK Product Utility checkpoint;
2. establish Allusions studio site and final cross-site status vocabulary;
3. update AFK website current copy / metadata / tests;
4. update public AFK product repository current docs / UI strings / support surfaces;
5. update private workbench canonical docs / routing;
6. inspect branch and file names containing `friend-beta` and rename only where doing so does not create Git/worktree churn;
7. run a final repository-wide search for case variants and hyphenated forms.

## Search terms

Use at least:

- `Friend Beta`
- `friend beta`
- `friend-beta`
- `friend_beta`
- `FriendBeta`

Review results semantically. Do not blindly replace historical context.

## Release-language rule

Status language should answer two separate questions:

1. **What channel is this?** — Beta / RC / Preview / Experimental
2. **What exact build is this?** — version/tag/hash

Do not collapse them into a cute internal nickname.

Example:

> AFK AI Beta · 0.1.7rc1

or, when the build is formally a release candidate:

> AFK AI · Release candidate 0.1.7rc1

Choose one system during the identity cleanup and use it consistently across website, installer, product UI, and release notes.
