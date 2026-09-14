# AFK public repository rename inventory

Status: planning/audit artifact. Do not execute while the AFK Product Utility PR stack is still being reconciled.

Planned public naming direction at the next genuinely clean checkpoint:

- `allusionsafk/localai-windows-starter` → `allusionsafk/afk-ai`
- `allusionsafk/localai-windows-starter-site` → `allusionsafk/afk-ai-site`

Internal package/CLI/runtime names are explicitly outside this rename unless separately justified.

## Critical dependency: website `/download` Worker

Current `worker.js` hard-codes:

```js
const REPO = 'allusionsafk/localai-windows-starter';
const RC_TAG = 'v0.1.7rc1';
```

and constructs the raw GitHub installer URL from that repository name.

This is the highest-blast rename dependency because `/download` proxies and SHA-verifies those exact bytes.

Rename policy:

1. do not change `RC_TAG`, installer SHA-256, or filename merely because the repository is renamed;
2. after the GitHub repo rename, prove the old raw GitHub URL either redirects/continues to work as expected or update `REPO` in a dedicated reviewed website change;
3. run the complete Worker/download tests;
4. live-verify `/download` without executing it;
5. hash the returned bytes and confirm the digest remains the approved pinned value.

Do not combine repository rename with an installer repin.

## AFK website repository dependencies

Current canonical/public files contain old product-repository URLs, including:

- `README.md`
- `SUPPORT.md`
- `SECURITY.md`
- `CONTRIBUTING.md`
- deployed `public/index.html` footer/source links
- `public/.well-known/security.txt` / issue routing if they reference GitHub URLs
- tests that lock repository/download behavior
- `worker.js` as described above.

The website itself also uses the legacy Workers.dev deployment/canonical origin:

`localai-windows-starter-site.allusionsafk.workers.dev`

That deployment identity does **not** need to change in the GitHub repository rename pass.

Keep GitHub repository naming and Cloudflare deployment naming as separate migrations.

## Public AFK product repository dependencies

Current product documentation links to the legacy website Workers.dev URL and naturally refers to its own legacy GitHub repository through support/security/release flows.

At minimum review:

- `README.md`
- `SUPPORT.md`
- `SECURITY.md`
- `CONTRIBUTING.md`
- `.github/ISSUE_TEMPLATE/*`
- release notes / release workflow docs
- installer/bootstrap code that fetches repository files by GitHub URL
- CI/public-audit allowlists or self-reference checks
- any release scripts that construct `raw.githubusercontent.com` URLs.

Do not infer that GitHub redirect support is sufficient for installer/bootstrap integrity paths. Verify every executable-fetch path explicitly.

## Private AFK workbench dependencies

Default-branch references to `localai-windows-starter` / `localai-windows-starter-site` exist across current and historical material.

Current/canonical files that should be updated after public renames include at least:

- `README.md`
- `SUPPORT.md`
- `SECURITY.md`
- `CONTRIBUTING.md`
- `AGENTS.md`
- `docs/README.md`
- `docs/control-plane.md`
- current issue-template routing.

Historical plans/handoffs can retain old repository names when their historical nature is explicit; GitHub redirects should keep archival links useful.

Do not churn old handoff records merely for cosmetic consistency.

## Adaptive Media dependencies

Adaptive Media was extracted from the former shared public repository and its docs may intentionally link historical releases/artifacts there.

When AFK's public repo is renamed:

- verify those historical links still resolve;
- do not rewrite historical release provenance as if the artifacts originated in the standalone Adaptive Media repo;
- update only current navigation/support links that are meant to point to the AFK product.

## Website repository rename itself

Renaming `localai-windows-starter-site` → `afk-ai-site` should trigger review of:

- README clone/repository references;
- issue/security links;
- GitHub Actions badges if any;
- cross-repository public-audit allowlists;
- AFK/private-workbench links to website support;
- Allusions studio product links once it exists.

It does **not** require immediately renaming:

- Cloudflare Worker name;
- Workers.dev hostname;
- local checkout folder;
- historical branches;
- deployment version IDs.

## Canonical/OG metadata

The deployed AFK page currently uses the Workers.dev URL for canonical/OG metadata. Keep that stable until there is a real domain/deployment migration.

A GitHub repo rename alone is not a reason to change the canonical public website origin.

## Recommended execution order

1. finish AFK Product Utility stack reconciliation;
2. ensure no active PR/worktree depends on old repo names mid-operation;
3. snapshot current `/download` tag/SHA/bytes;
4. rename public AFK product repository;
5. immediately verify old/new GitHub URLs and executable-fetch paths;
6. update current canonical cross-repo links;
7. run product/public-audit/installer tests;
8. rename AFK website repository;
9. verify old/new website-repo links and CI;
10. leave Cloudflare deployment ID/hostname unchanged unless separately approved;
11. live-verify AFK site and `/download` again;
12. update Allusions studio/product links to canonical new GitHub names.

## Stop conditions

Stop rather than continuing if:

- an installer/bootstrap/raw URL stops resolving;
- release tags/assets cannot be resolved through the expected path;
- `/download` returns different bytes;
- CI/public-audit self-reference logic rejects the renamed repositories;
- active stacked PRs become ambiguous or conflict because the rename happened mid-reconciliation;
- security/support routing points to a nonexistent repository.

## Exit condition

The public-repository rename is complete when:

- canonical public GitHub names are `afk-ai` and `afk-ai-site`;
- old URLs have been tested and redirect/usefully resolve where expected;
- all current support/security/source links point to canonical names;
- installer/download integrity is byte-identical unless a separate release explicitly changed it;
- private workbench current docs/routing know the new public names;
- Cloudflare legacy deployment naming is either intentionally retained or migrated in a separate verified operation.
