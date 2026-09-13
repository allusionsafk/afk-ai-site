# B2-Led Site Convergence Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a production-ready B2-led AFK AI landing page while preserving the current Worker, download pin, strict CSP, self-hosted assets, accessibility, and theme behavior.

**Architecture:** Keep the existing static HTML/CSS/minimal-JS site behind the current Cloudflare Worker. Replace only the AFK homepage's information architecture and shared styles, preserving Adaptive Media compatibility through existing shared primitives and page-scoped selectors. Store visual evidence and a repeatable Chrome DevTools Protocol capture utility in the repository.

**Tech Stack:** Semantic HTML5, modern CSS, vanilla JavaScript, Node.js tests, Cloudflare Workers static assets, headless Chrome/CDP.

**Spec:** `docs/design/2026-09-13-b2-led-convergence.md`

## Global Constraints

- Base is `origin/master` at `e63e3598849f8381baaacd5b8ce4729a8e1d591f`.
- AFK AI is primary; Allusions is subordinate maker identity.
- Friend Beta `0.1.7rc1` remains explicit.
- Shipping now, Friend Beta limits, and Development direction are separate semantic sections.
- D2 transplant is limited to the asymmetric figure-like product-proof composition.
- Do not fabricate screenshots or UI; use the HTML/CSS setup path and labelled future demo seam.
- Preserve all self-hosted fonts, strict CSP, theme behavior, accessibility, Worker identity, and `/download` behavior.
- Do not change release/download constants, deploy, merge, rename repositories, or rename Worker IDs.

---

### Task 1: Lock Truth and Regression Tests

**Files:**
- Create: `tests/test-homepage.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: approved copy and invariants from the spec.
- Produces: a source-level homepage contract invoked by `npm test`.

- [ ] **Step 1: Write failing homepage contract checks**

Add checks that require one H1, `/download`, `0.1.7rc1`, the three maturity section headings, `Built by Allusions`, a setup-path figure, a labelled demo seam, no remote subresources, no fake screenshot language, and no forbidden overclaims.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node tests/test-homepage.mjs`
Expected: FAIL for missing maturity bands, Allusions attribution, setup figure, and demo seam.

- [ ] **Step 3: Add the test to the existing test command**

Set `scripts.test` to `node tests/test-worker.mjs && node tests/test-csp.mjs && node tests/test-homepage.mjs`.

- [ ] **Step 4: Commit the contract**

Run: `git add package.json tests/test-homepage.mjs docs/design/2026-09-13-b2-led-convergence.md docs/superpowers/plans/2026-09-13-b2-led-site-convergence.md && git commit -m "test(site): lock B2 convergence contract"`.

### Task 2: Implement the B2-Led Homepage

**Files:**
- Modify: `public/index.html`
- Modify: `public/assets/site.css`
- Verify unchanged: `worker.js`, `wrangler.toml`, `public/_headers`, `public/assets/app.js`

**Interfaces:**
- Consumes: existing `.btn`, `.wrap`, `.brand`, `.kicker`, and theme tokens used by both pages.
- Produces: `.afk-page`, `.instrument-*`, `.truth-*`, `.setup-figure`, `.proof-figure`, and `.demo-seam` page structures.

- [ ] **Step 1: Rewrite the homepage semantic structure**

Use one H1; semantic `header`, `nav`, `main`, `section`, `figure`, `ol`, `dl`, and `footer`; plain `/download` anchors; visible Friend Beta labels; and the exact claims tiers from the spec.

- [ ] **Step 2: Build the B2 instrument styling**

Implement ruled bands, high-contrast reference labels, hanging numbers, asymmetric proof, responsive grids, 44 px controls, visible focus, forced-colors resilience, dark theme, and reduced-motion behavior without inline styles.

- [ ] **Step 3: Preserve the Adaptive Media route**

Confirm shared selectors used by `public/adaptive-media/index.html` retain their current layout and that new homepage rules are scoped beneath `.afk-page` where they could conflict.

- [ ] **Step 4: Run the focused and full tests**

Run: `node tests/test-homepage.mjs && npm test`
Expected: all homepage, Worker, and CSP checks pass.

- [ ] **Step 5: Commit production implementation**

Run: `git add public/index.html public/assets/site.css && git commit -m "feat(site): converge AFK homepage on B2 system"`.

### Task 3: Preserve Reference and Final Visual Evidence

**Files:**
- Create: `scripts/capture-site.mjs`
- Create: `docs/design/evidence/site-convergence/README.md`
- Create: `docs/design/evidence/site-convergence/b2/*.png`
- Create: `docs/design/evidence/site-convergence/d2/*.png`
- Create: `docs/design/evidence/site-convergence/final/*.png`

**Interfaces:**
- Consumes: a URL, output directory, viewport width, viewport height, and local Chrome path.
- Produces: deterministic full-page PNGs through CDP `Page.captureScreenshot({captureBeyondViewport:true})`.

- [ ] **Step 1: Implement a dependency-free CDP capture utility**

Launch installed Chrome headlessly on an isolated temporary profile, obtain its debug target, set device metrics, navigate, wait for fonts, and save the returned PNG bytes. Fail on console errors, page errors, or horizontal overflow.

- [ ] **Step 2: Capture recovered B2 and D2 references**

Capture each recovered desktop prototype at 1440 px, each mobile prototype at 390 px, and the desktop prototype at 768 px for tablet evidence.

- [ ] **Step 3: Capture final production views**

Serve the worktree locally and capture the final page at 390, 768, 1440, and 1920 px. Record viewport, source artifact, theme, and capture command in the evidence README.

- [ ] **Step 4: Inspect every screenshot**

Check full-page reading order, text clipping, overlap, horizontal overflow, CTA visibility, focus/touch affordance, section distinction, and the reserved demo seam.

- [ ] **Step 5: Commit evidence**

Run: `git add scripts/capture-site.mjs docs/design/evidence/site-convergence && git commit -m "docs(design): preserve convergence evidence"`.

### Task 4: Accessibility, CSP, Worker, and Performance Verification

**Files:**
- Modify if verification reveals defects: `public/index.html`, `public/assets/site.css`, `tests/test-homepage.mjs`
- Create: `docs/design/evidence/site-convergence/verification.md`

**Interfaces:**
- Consumes: locally served final site and current test suites.
- Produces: reproducible verification results and an unchanged Worker pin diff.

- [ ] **Step 1: Verify source and runtime invariants**

Run `npm test`, `git diff origin/master -- worker.js wrangler.toml public/_headers public/assets/app.js`, and the capture utility's console/overflow checks.

- [ ] **Step 2: Audit accessibility**

Verify landmarks, heading order, accessible names, keyboard operation, focus visibility, color contrast, reduced motion, 200% zoom at 390 px, and no color-only maturity labels.

- [ ] **Step 3: Verify Worker packaging without deploying**

Install locked dependencies with `npm ci` if needed, run `npx wrangler --version`, then run `npx wrangler deploy --dry-run --outdir .wrangler-dry-run`. Do not run a real deploy.

- [ ] **Step 4: Record results and fix any defects**

Write exact pass counts, browser console results, overflow results, CSP result, dry-run result, and unchanged pin values to `verification.md`; rerun all affected checks after any fix.

- [ ] **Step 5: Commit verification**

Run: `git add docs/design/evidence/site-convergence/verification.md public/index.html public/assets/site.css tests/test-homepage.mjs && git commit -m "test(site): verify converged release surface"`.

### Task 5: Final Review, Push, and Pull Request

**Files:**
- Review: all changes from `origin/master...HEAD`

**Interfaces:**
- Consumes: fully verified local commits.
- Produces: pushed feature branch and an unmerged pull request.

- [ ] **Step 1: Run final verification**

Run `npm test`, `git diff --check origin/master...HEAD`, `git status --short`, and inspect every final screenshot once more.

- [ ] **Step 2: Review claims and scope**

Confirm every public claim maps to Shipping now, Friend Beta limits, or Development direction; confirm only the approved D2 composition was transplanted; confirm Worker identity and pins are unchanged.

- [ ] **Step 3: Push the feature branch**

Run: `git push -u origin codex/b2-led-site-convergence`.
Rollback: delete only the remote feature branch; production remains unchanged.

- [ ] **Step 4: Open the pull request**

Open a PR to `master` with screenshots, claims audit, tests, CSP, accessibility, and explicit `NOT DEPLOYED` status. Rollback: close the unmerged PR and delete the remote feature branch.

- [ ] **Step 5: Stop for visual approval**

Report branch, final HEAD, PR URL, screenshot paths, and verification results. Do not merge or deploy.

