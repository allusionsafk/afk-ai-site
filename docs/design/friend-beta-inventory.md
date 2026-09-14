# `Friend Beta` current-surface inventory

Status: audit artifact for the later terminology migration. This is intentionally not an automated global replacement plan.

## Public AFK website repository

Verified current/default-branch occurrences or active concepts:

### `README.md`

- describes the site as serving the pinned `Friend Beta` installer;
- table labels the pinned candidate `Friend Beta 0.1.7rc1`.

### `PRODUCT.md`

- calls the public path the `Friend Beta` download path;
- writing guidance tells contributors to state `Friend Beta` limitations.

### `DESIGN.md`

- status-chip guidance names `Friend Beta` as a current state;
- review checklist asks that `Friend Beta` status remain visible;
- file is also materially stale relative to the deployed B2 design and needs a broader rewrite rather than a one-word substitution.

### `SUPPORT.md`

- calls `/download` the pinned `Friend Beta` route;
- download-problem section describes a `Friend Beta` installer.

### `CONTRIBUTING.md`

- describes the website as the pinned `Friend Beta` download route;
- asks contributors to preserve pinned `Friend Beta` behavior.

### deployed `public/index.html`

- visible/meta status language still uses the informal term because retirement has not yet been executed.

### `SECURITY.md`

- no `Friend Beta` wording found in the current file;
- repo URLs will still need review if public repositories are renamed.

## Public AFK product repository

Verified current/default-branch occurrences:

### `README.md`

The term is active in many current sections, including:

- top status block;
- status table;
- public-release boundary language;
- website download description;
- unsigned-script warning;
- requirements heading;
- release-notes link text;
- historical Adaptive Media distinction paragraph.

### `SUPPORT.md`

- current status line;
- public-release boundary paragraph.

### `CONTRIBUTING.md`

- opening paragraph refers to Windows `Friend Beta` qualification.

### `docs/releases/0.1.7rc1.md`

The release record uses `Friend Beta` as the historical/current channel label throughout:

- document title;
- release-candidate subtitle;
- channel table;
- download behavior;
- clean-machine limitation language;
- requirements text;
- WSL/Docker path description;
- Windows-security warning.

This file is a release record. Migration must decide whether to:

1. update it as the canonical current candidate record while preserving version/integrity facts; or
2. retain the original wording as historical provenance and add a short note pointing to the new naming system.

Do not casually rewrite integrity hashes, tags, or measured limitations while changing terminology.

## Private AFK workbench

Verified default-branch references include at least:

- `README.md` — distinguishes workbench features from the public `Friend Beta`;
- `SUPPORT.md` — routes public `Friend Beta` support to the public repo;
- `AGENTS.md` — mentions public `Friend Beta` installer qualification;
- `docs/control-plane.md` — says private-workbench behavior is not a public `Friend Beta` release claim;
- `.github/ISSUE_TEMPLATE/config.yml` — public support routing copy;
- `.github/ISSUE_TEMPLATE/engineering-bug.yml` — tells users public `Friend Beta` bugs belong elsewhere;
- superseded historical remediation plans.

Canonical current files should migrate after the public product naming is settled. Superseded historical plans can retain old language when the historical nature is clear.

## Rename semantics

Do not replace every occurrence with `Beta` mechanically.

Classify each hit:

### Current product status

Use the final chosen public format, likely one of:

- `AFK AI Beta · 0.1.7rc1`
- `AFK AI · Release candidate 0.1.7rc1`

### Generic policy/reference

Use neutral terms such as:

- public AFK AI beta;
- current public candidate;
- pinned release candidate;
- public AFK AI build.

### Historical record

Preserve old wording or annotate it rather than pretending the original artifact used a later name.

### Branch/file names

Rename only when the branch/file is still active and the rename does not create unnecessary worktree/history churn.

## Final migration check

After the cleanup, search current canonical repos for all of:

- `Friend Beta`
- `friend beta`
- `friend-beta`
- `friend_beta`
- `FriendBeta`

Every remaining result should be intentionally classified as historical/internal rather than overlooked current public copy.
