# Adaptive Media product-site brief

Status: planning artifact only. Do not treat this as release documentation.

## Product role

Adaptive Media should have its own dedicated product presence rather than remain a secondary route under the AFK AI site.

The product story is not "another mpv front-end." The useful distinction is that the player treats playback as an observable system: the media, renderer path, display chain, hardware capability, requested settings, and observed runtime state are allowed to disagree, and the product should surface that rather than hiding it.

## Current public truth to preserve

The standalone repository currently describes:

- Windows 11 target;
- .NET/WPF application;
- mpv/gpu-next/libplacebo/FFmpeg playback stack;
- reference-first playback;
- explicit enhancement controls;
- decoded PCM as the safe audio default;
- optional HDMI bitstream output;
- visible unsupported/degraded paths;
- evidence-backed Dolby Vision conversion work where supported;
- bounded temporary media scratch for conversion;
- active development rather than a newly republished standalone release.

The existing co-hosted AFK-site page for historical `0.3.2` is useful provenance, but the future dedicated site must not imply that the standalone repository has republished that release if it has not.

## Positioning

Recommended core line:

> Playback that understands the path, not just the file.

Alternative:

> A Windows media player that keeps requested settings separate from what actually happened.

Avoid generic claims such as "best quality," "ultimate player," or "plays everything."

## Information architecture

### 1. Hero

Answer immediately:

- What is Adaptive Media?
- Why would a technically demanding user care?
- Is there a current public build or is this active development?

If no current standalone release exists, the primary CTA should be `View development` / `View repository`, not a misleading Download button.

### 2. Playback model

Use a semantic path diagram rather than fake player chrome:

`Source → decode → render → display`

Overlay the product's decision layers:

- source/media evidence;
- hardware/runtime selection;
- user-requested enhancement state;
- observed renderer/decoder/display state;
- fallback when evidence says the preferred path failed.

### 3. Reference first

Explain that enhancement is opt-in:

- scaling;
- motion smoothing;
- debanding / cleanup;
- RTX Video Super Resolution;
- RTX Video HDR;
- bitstream audio.

The point is control and predictability, not the number of toggles.

### 4. Dolby Vision / difficult-media section

Keep conversion and native playback separate.

Safe framing:

- Profile 7 classification from whole-stream evidence;
- supported Profile 7 → 8.1 conversion path;
- transactional promotion / output validation;
- bounded scratch space;
- provenance-backed fixtures/tests.

Do not blur that into a broad claim of native Windows Dolby Vision/FEL support unless the public release being promoted actually contains and has certified that behavior.

### 5. Runtime truth / diagnostics

This should be the strongest product-proof section.

Show the distinction between:

- Requested
- Planned
- Observed
- Fallback

A compact semantic figure can make this much more distinctive than ordinary media-player feature cards.

### 6. Hardware boundaries

State evidence limits prominently:

- HDR switching depends on display chain and driver behavior;
- HDMI bitstream/Atmos is hardware-dependent;
- renderer and decode paths vary by hardware;
- validation on one machine is evidence for that path, not universal certification.

### 7. Release / development state

One authoritative block only.

If the standalone repo still has no republished release:

> Active development. Historical prerelease artifacts remain in the former shared repository and are not the current standalone release authority.

Once a new standalone release exists, replace this with an exact tag, installer filename, digest, and release-notes link.

### 8. Allusions attribution

Footer or small maker band:

> Built by Allusions.

Link back to the studio site without making Allusions dominate the product identity.

## Visual direction

Do not reuse AFK's B2 page wholesale.

Recommended character:

- darker base or alternating dark technical bands;
- display-path diagrams;
- telemetry/readout typography;
- restrained green/blue spectral accents only when they encode state;
- large media surfaces only when they are real captures;
- quiet chrome, strong evidence blocks.

Family resemblance with Allusions should come from disciplined typography, rules, maturity labels, and truth surfaces rather than shared decorative components.

## Real visual evidence to gather later

Before production launch, capture clean current screenshots of:

- main player window;
- reference mode;
- enhancement controls;
- diagnostics/runtime state;
- a difficult-media path where the evidence is meaningful;
- any fallback/recovery state that is safe to show publicly.

Strip personal paths and development tooling.

## Claims to avoid

- "plays everything";
- "perfect Dolby Vision";
- "native FEL" unless the exact public build proves it;
- "automatic best settings";
- "lossless enhancement" without a precise technical basis;
- universal Atmos/HDR-chain support;
- implying the old shared-repo prerelease is a current standalone release.

## Technical site standard

Prefer a standalone static site/repository when production work starts:

- semantic HTML;
- CSS;
- minimal JavaScript;
- strict CSP;
- self-hosted fonts/assets;
- no analytics by default;
- explicit release authority;
- no direct dependency on AFK's Worker/download route.

## Launch gate

Do not launch the dedicated site until:

- public product name is settled (`Adaptive Media` unless `Demi Player` is explicitly approved);
- release authority is clear;
- current product status is re-verified;
- screenshots, if used, are from the current product;
- download CTA behavior matches actual release availability;
- every Dolby Vision/HDR/audio claim maps to a documented supported path.
