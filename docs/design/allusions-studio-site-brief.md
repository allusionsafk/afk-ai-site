# Allusions studio website — design and content brief

Status: planning artifact only. This file is not deployed site content.

## Purpose

Create a small public studio site for **Allusions** that explains the common philosophy behind AFK AI, Demi / Adaptive Media, and ValClips without flattening them into one visual system or pretending every product has the same maturity.

The Allusions site is the umbrella. Product sites remain the place for detailed claims, downloads, support, release state, and product-specific evidence.

## Core idea

**Allusions builds software that absorbs technical complexity instead of handing it to the user.**

That statement is broad enough to cover:

- AFK AI: local AI on Windows without requiring the user to understand Docker, WSL, runtimes, ports, model formats, or hardware-fit plumbing;
- Demi / Adaptive Media: playback that understands difficult media, HDR / Dolby Vision paths, hardware capability, and runtime selection;
- ValClips: gameplay intelligence that turns long recordings into publishable clips with evidence-aware detection and production constraints.

Avoid framing Allusions as an "AI company". AI is one implementation domain, not the studio identity.

## Recommended visual direction

Use a **D2-led modernist typographic system** for the studio site.

Why D2 fits here better than it did for AFK:

- a multi-product portfolio is exactly the context where a stronger Allusions wordmark is useful;
- asymmetric product blocks help distinguish three different product lines;
- the studio page can be more editorial and less transactional than a product download page;
- product imagery can be optional rather than mandatory if each project entry has strong typography, status, and one truthful proof point.

Do not clone the AFK B2 instrument system. Reuse family traits only where they make the ecosystem feel related:

- disciplined typography;
- rules / registration marks;
- evidence-oriented labels;
- restrained color;
- semantic figures instead of fake UI;
- explicit maturity language.

## Homepage information architecture

### 1. Studio masthead

Large Allusions identity, but not decorative for its own sake.

Working copy:

> ALLUSIONS
>
> Independent software for difficult technical problems.

Alternative subhead:

> Tools that absorb complexity instead of handing it back to you.

Keep the opening quiet. No generic startup claims, no metrics theatre, no "revolutionizing" language.

### 2. Project register

Three primary entries, each with a clearly different product role.

#### AFK AI

Working descriptor:

> Local AI for Windows, without the plumbing becoming the product.

Current public state should use the canonical release term in force at launch time. Do not introduce "Friend Beta" on the Allusions site.

Primary link: AFK product site.

Proof language should stay conservative and current: local inference, guided Windows setup, visible boundaries, truthful readiness / diagnostics only when those capabilities are actually released.

#### Demi / Adaptive Media

Working descriptor:

> Media playback that understands the file, the display path, and the hardware underneath it.

Status should reflect actual public readiness. If the product name is still unsettled, use "Demi Player" as presentation name only when explicitly approved; otherwise retain "Adaptive Media".

Primary link: dedicated product page/site once created.

Avoid claiming universal Dolby Vision correctness. Use evidence-backed wording around supported paths.

#### ValClips

Working descriptor:

> Gameplay-to-clip intelligence built around evidence, not random highlights.

Status should reflect whether a public build exists. Until then, present it as in development / experimental rather than as downloadable software.

Primary link: dedicated product page/site once created.

Commercial proof can later use real channel/output evidence, but only with transparent methodology and no cherry-picked causal claims.

### 3. Shared philosophy

A short section, not a manifesto.

Suggested pillars:

- **Observe first** — measure the machine, media, or recording before acting.
- **Tell the truth about state** — requested, inferred, and observed are different things.
- **Own the boring parts** — setup, recovery, diagnostics, compatibility, and failure handling are product features.
- **Keep the user out of the machinery** — technical depth should reduce user burden, not become a badge of complexity.

### 4. Evidence / engineering note

Small studio-level proof section:

> Built in public where it helps, tested against real machines and real media where claims depend on them.

Link outward to individual repositories rather than dumping implementation detail on the studio homepage.

### 5. Footer

Minimal:

- GitHub / source organization
- security/contact route once established
- product links
- legal/licence references as appropriate

No newsletter, analytics, forms, or account system unless there is a real need.

## Product-card structure

Each product entry should contain only:

1. product name;
2. one-sentence promise;
3. maturity/status;
4. one concrete proof point;
5. one clear link.

Do not turn the homepage into three mini product landing pages.

## Claim policy

Every statement should be one of:

- **Shipping now**
- **In development**
- **Experimental / research**

Never let roadmap material read like released behavior.

The studio site should inherit the AFK website's strongest lesson: truthfulness is part of the visual design, not a legal disclaimer added later.

## Architecture recommendation

Keep the studio site static and simple:

- semantic HTML;
- CSS;
- minimal JavaScript only where useful;
- no framework requirement;
- self-hosted assets;
- strict CSP;
- no analytics by default;
- no fake product screenshots.

A separate `allusions-site` repository is preferable once the design is approved. This planning artifact may remain in the AFK site repository as provenance, but production Allusions code should not live inside the AFK deployment.

## First design milestone

Produce two real browser candidates before choosing production direction:

1. **D2 Studio** — strong typographic masthead, asymmetric product register, restrained proof figures;
2. **D2 Quiet** — same system with less visual mass and fewer editorial devices.

Render at 390 / 768 / 1440. Compare hierarchy, product differentiation, mobile length, and whether AFK / Demi / ValClips remain individually legible.

Do not create a third clean-sheet direction unless both fail for a concrete reason.
