# AFK AI B2-Led Convergence Verification

Verified locally on 2026-09-13. No production deployment or merge was performed.

## Repository boundary

- Base: `origin/master` at `e63e3598849f8381baaacd5b8ce4729a8e1d591f`.
- Verification was performed in an isolated worktree without modifying unrelated checkouts.

## Automated tests

`npm test` completed with exit code 0 after the final reflow fix:

| Suite | Passed | Failed |
| --- | ---: | ---: |
| Worker and `/download` | 34 | 0 |
| Content Security Policy | 28 | 0 |
| Homepage contract | 20 | 0 |
| **Total** | **82** | **0** |

`node --check scripts/capture-site.mjs` and `git diff --check` also completed with exit code 0.

## Responsive rendering and runtime

Strict headless-Chrome captures fail on console errors, page errors, or document-level horizontal overflow. Final results:

| CSS viewport | Theme | `clientWidth` | `scrollWidth` | Console/page issues |
| ---: | --- | ---: | ---: | --- |
| 195 | Light | 195 | 195 | 0 |
| 320 | Light | 320 | 320 | 0 |
| 390 | Light | 390 | 390 | 0 |
| 768 | Light | 768 | 768 | 0 |
| 1440 | Light | 1440 | 1440 | 0 |
| 1920 | Light | 1920 | 1920 | 0 |
| 1440 | Dark | 1440 | 1440 | 0 |

The original 195 px failure measured 233 px of document width. Diagnostics identified three real constraints: the non-wrapping header action group, the mobile H1's longest word at 3.42 rem, and 50/50 requirement chips whose intrinsic text widths exceeded their 80 px boxes. A separate 4 px navigation-gutter mismatch contributed at the same breakpoint. The fix is scoped to the extreme reflow range: the theme control becomes icon-only while retaining its accessible name, Download receives the flexible header column, the H1 steps down to 2.35 rem, requirement chips become one column, and the D2 proof grid receives a narrow-width column rebalance. The ordinary 320 px and wider visual system is unchanged apart from aligning the 16 px mobile nav gutter to the 16 px wrapper.

The 195 px proof, direction, and CTA sections were inspected separately. Text remains readable, controls remain usable, the setup/proof figures reflow without overlap, and no meaningful content is clipped. The horizontal primary navigation intentionally remains a contained scroll region on small screens; it does not widen the document.

## Accessibility

The final browser accessibility tree and computed styles were audited after the reflow fix:

- Landmarks: 1 header, 2 labelled navigation regions, 1 main, and 1 footer.
- Heading structure: one H1 followed by ordered H2/H3 sections.
- Both figures have accessible labels and `figcaption` content.
- Unnamed interactive controls: 0.
- Button-style controls remain at least 44 px high; the narrow theme control is 44 × 44 px and the download controls are 54 px high.
- Keyboard focus is visible. The focused skip link measured 155 × 50 px with a solid 2.67 px outline plus a 2 px contrast halo.
- Computed text-contrast failures: 0 in light theme and 0 in dark theme.
- Reduced-motion and forced-colors rules remain present and covered by the homepage contract.
- Friend Beta status and all three maturity tiers use explicit text, not color alone.

## CSP, network, and console

- CSP suite: 28/28 passed.
- No `unsafe-inline`, `unsafe-eval`, remote executable assets, inline event handlers, or client-side network APIs were introduced.
- Runtime console warning/error log: empty.
- Runtime fetched subresource origins: local same-origin only (`favicon.svg`, self-hosted Bricolage Grotesque, `site.css`, and `app.js`).
- The HTML/CSS setup schematic and asymmetric proof remain semantic markup; no screenshot, simulated dashboard, or product-image dependency is shipped.

## Worker packaging and download preservation

Wrangler `4.110.0` dry run completed with exit code 0, read all 17 public assets, retained the `ASSETS` binding, and exited at `--dry-run`. No deployment command was run.

The diff against the base is empty for `worker.js`, `wrangler.toml`, `public/_headers`, and `public/assets/app.js`. The existing download contract remains:

- Tag: `v0.1.7rc1`.
- Source: `https://raw.githubusercontent.com/allusionsafk/localai-windows-starter/v0.1.7rc1/Install%20Local%20AI.cmd`.
- SHA-256: `767e4f603c79c21ce9bebc01d42241d7b84ff9728c12fb13c43fff4d51c24356`.
- Browser filename: `Install AFK AI.cmd`.

`npm ci` reported four high-severity advisories in the existing development dependency tree. No automatic dependency rewrite was applied in this design pass.

## Design and claims audit

B2 remains the primary system: compact registration, ruled evidence bands, hanging notation, distinct maturity surfaces, restrained product-maker hierarchy, and an honest HTML/CSS setup schematic. AFK AI is named and explained before the subordinate `Built by Allusions` attribution.

The sole D2 transplant is the Control Center proof figure: one asymmetric title/evidence composition with a narrow vertical axis. D2's multi-product portfolio emphasis, oversized Allusions wordmark, and imagery dependency are absent.

Claims retained:

- Local model inference through Ollama.
- Local Open WebUI account/chat history in the local stack.
- Control Center health, machine, model-guidance, and privacy-aware diagnostic surfaces.
- Explicit internet boundary for setup, downloads, updates, and optional web search.
- Windows 11, storage, virtualization, and Friend Beta version requirements.

Claims softened:

- Automatic model selection became non-optimal “model guidance.”
- An invisible one-click setup became a guided path that checks and prepares supported prerequisites and may still be interrupted.
- Diagnostic privacy is described as “designed to omit,” not guaranteed categorically.
- Local service/network statements identify the loopback and Docker-reachable Windows-host boundary rather than implying no network surface exists.

Claims rejected:

- One-click, zero-configuration, universally tuned, production-stable, or always-offline claims.
- Fabricated screenshots, synthetic terminal output, invented performance numbers, testimonials, or multi-product portfolio framing.

## Evidence set

- Recovered B2 references: `docs/design/evidence/site-convergence/b2/`.
- Recovered D2 references: `docs/design/evidence/site-convergence/d2/`.
- Final light mobile/tablet/desktop/wide captures and dark desktop capture: `docs/design/evidence/site-convergence/final/`.
