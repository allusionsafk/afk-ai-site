# Allusions web sprint roadmap

Status: planning artifact only. Nothing in this document changes a production deployment.

## Current checkpoint

The AFK Product Utility repository reconciliation checkpoint has been reached. Public AFK PR #22 (`codex/afk-product-utility-integration`, head `c511a5c9c54573c2acebe04a405d9b25394d276e`) is open, mergeable, and green across CI and release-candidate qualification. The reconciliation is therefore no longer a blocker for beginning **Packet A: Allusions studio convergence**.

This does **not** mean AFK Product Utility itself is finished. Product Shell + app-owned Python remains the next AFK product milestone and may proceed in parallel in its own isolated lane. Do not serialize the portfolio around it unless a concrete shared-machine conflict appears.

## Goal

Prioritize public web presence and naming consistency while AFK Product Shell and other product engineering can continue independently in isolated lanes.

## Sequence

### 1. Allusions studio site

Create the umbrella site first so every product has a stable maker identity to link back to.

Deliverables:

- D2-led studio visual system;
- concise studio positioning;
- product register for AFK AI, Demi / Adaptive Media, and ValClips;
- explicit maturity labels;
- GitHub / security / product links;
- responsive 390 / 768 / 1440 evidence;
- separate deployment/repository from AFK product site.

Do not launch with fake screenshots, fabricated testimonials, vanity metrics, or generic AI-company copy.

### 2. AFK AI web identity cleanup

The B2 homepage itself is now visually approved and deployed. Do not redesign it again.

Next AFK web work should be identity / continuity only:

- retire "Friend Beta" from current public surfaces in favor of the approved release terminology;
- update maker links so "Built by Allusions" points to the studio site when available;
- plan the repository-name migration from `localai-windows-starter-site` to `afk-ai-site` at a clean checkpoint;
- plan the product-repository rename to `afk-ai` separately from internal Python/package names;
- keep the existing download integrity path stable through naming changes.

The B2 visual language remains authoritative unless real user evidence justifies change.

### 3. Demi / Adaptive Media product site

Give the media product a dedicated product presence rather than treating it as an AFK subpage.

The page should explain:

- what problem it solves;
- supported media / playback paths using evidence-backed language;
- why runtime / hardware understanding matters;
- compatibility/export versus native playback as separate concepts;
- current release state;
- real product visuals once clean screenshots exist.

Preserve the product architecture story: C# / .NET / WPF with mpv / libplacebo / FFmpeg. Do not market a framework rewrite that does not exist.

### 4. ValClips product site

Build around output and evidence rather than around editor-like UI chrome.

The site should eventually show:

- source recording → detection → selected moment → rendered clip;
- real generated Shorts;
- truthful production / detector limitations;
- evidence that the system creates useful content without claiming causality from cherry-picked results;
- public/download status only when there is a real distribution path.

Avoid positioning ValClips as a generic video editor.

### 5. Cross-site system

Once all four surfaces exist:

- normalize maker attribution;
- normalize status vocabulary;
- normalize footer/security/source conventions;
- normalize product links;
- keep each product visually distinct;
- use shared design tokens only where they improve family resemblance rather than forcing sameness.

## Shared terminology

Prefer professional release language:

- Beta
- Preview
- Release candidate
- In development
- Experimental

Avoid "Friend Beta" in new work.

Do not rewrite historical Git history solely to remove old wording. Current canonical and user-facing material should be migrated deliberately.

## Shared technical standard

Every public site should default to:

- semantic HTML;
- CSS;
- minimal JavaScript;
- strict CSP;
- self-hosted assets;
- no analytics unless explicitly justified;
- responsive evidence at mobile/tablet/desktop;
- no fake UI screenshots;
- no unsupported release claims;
- repository and deployment identity kept separate from product branding.

## Exit condition for the web sprint

The sprint is complete when:

- Allusions has a real public studio home;
- AFK links coherently into it without a redesign regression;
- Demi / Adaptive Media has a dedicated truthful product page/site;
- ValClips has a dedicated truthful product page/site or an explicit "not public yet" studio entry;
- current public surfaces no longer use "Friend Beta";
- cross-site navigation and maker attribution are coherent;
- naming migrations are complete or explicitly deferred with redirect plans.
