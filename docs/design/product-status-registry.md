# Allusions web product-status registry

Status: planning source for web copy. Re-check repository/release truth immediately before any public launch.

This file exists to stop product pages from inventing or accidentally promoting branch-head behavior. It records the safest public wording available from current canonical repositories.

## AFK AI

**Public state:** Beta / release candidate line.

**Current public website download:** `0.1.7rc1` through the existing verified `/download` Worker route.

**Safe public claims today:**

- local model inference runs on the user's PC;
- the local chat workspace and chat data can remain in the local stack;
- setup, model downloads, updates, and optional web search can use the internet;
- Windows 11 is the target platform;
- the current website clearly labels beta limitations;
- the current deployed B2 homepage is the approved visual baseline.

**Do not promote as shipped until the next product release actually contains it:**

- Product Utility branch improvements that have not been republished;
- app-owned Python;
- automatic optimal tuning / optimizer behavior;
- zero-interruption clean-machine setup;
- universal hardware support;
- any claim that AFK is fully offline.

**Terminology:** do not introduce `Friend Beta` in new material. Preferred direction is `AFK AI Beta` or exact release-candidate wording plus the exact version.

## DemiMedia

**Public product name:** DemiMedia.

**Engineering repository:** `allusionsafk/adaptive-media`.

**Current authoritative public/default state:** `main @ 32242a9f384b76fe1402b91c18ce4507b0e2b2c3`.

**Current strongest closure-qualified engineering state:** `codex/native-dv-playback-health-fixes @ f49d489519042c2aab940fb02e7cc9326342c641`.

The closure-qualified branch is stronger product evidence for native Profile 7 playback/runtime recovery, but it is not yet merged into `main` and is not a release. The standalone repository currently has no GitHub releases. Historical Adaptive Media prereleases remain provenance only and must not be presented as a current DemiMedia download.

**Safe public claims from current product truth:**

- Windows 11 media player built as a self-contained .NET/WPF application around mpv/gpu-next/libplacebo/FFmpeg, with MPC-BE compatibility fallback;
- playback planning around source, hardware/display conditions, and requested processing rather than blindly forwarding options;
- a dedicated Reference preset and a reference-first design philosophy;
- explicit enhancement controls, including scaling, motion modes, banding reduction, RTX Video Super Resolution, and experimental RTX Video HDR where supported;
- requested settings, planned path, observed runtime state, and fallback outcome are intentionally distinct concepts;
- hardware decode is used on qualified paths where supported;
- decoded PCM is the safe audio default;
- Profile 7 → Profile 8.1 compatibility export is evidence-backed and bounded, with FEL picture contribution explicitly discarded for FEL export;
- diagnostics and settings persistence are part of the product behavior.

**Important correction:** do **not** say Reference is the default preset. The current UI default/first selection is **Automatic**. Use `reference-first design` instead.

**Development-only claims that require explicit Experimental/Development treatment:**

- native Profile 7 playback;
- observed FEL composition on the closure-qualified development path;
- runtime generation/provisioning and previous-generation one-shot rollback;
- zero media-sized scratch during native P7 playback;
- automatic HDR switching/restoration;
- RTX Video HDR.

**Native P7 evidence boundary:** the closure-qualified path has strong evidence for separate BL/EL hardware decoding, pairing, RPU/NLQ handling, observed composition, deterministic enhancement-layer control, and zero media-sized playback scratch on the certified development configuration. This does not justify universal title/display/GPU claims and must not be described as proprietary TV-led Dolby Vision passthrough.

**Do not claim:**

- universal Dolby Vision support;
- Dolby Vision passthrough;
- full FEL fidelity for every Profile 7 title;
- guaranteed Atmos passthrough;
- automatic HDR on every display;
- AI frame generation;
- ordinary High Quality scaling as `AI upscaling`;
- lossless P7 FEL → P8.1 conversion;
- zero scratch for compatibility export;
- all-GPU or cross-platform support;
- a stable release;
- a current DemiMedia download until one is actually published under the current product identity.

**Naming rule:** use `DemiMedia` on public-facing web surfaces. `Adaptive Media` may remain only where needed to identify existing repository/history/compatibility identifiers. `Demi Player` is obsolete as a public-name candidate.

## ValClips

**Public state:** no public product surface yet; private development.

The current private repository contains a local Node/ESM application and its package metadata describes a local Valorant Shorts studio that turns recordings into vertical clips using local components such as FFmpeg, Ollama, Whisper, and Kokoro. The package is explicitly marked private.

**Safe public studio-level wording:**

- gameplay-to-clip intelligence;
- long recordings are analyzed to find candidate moments and produce rendered clips;
- current work includes detection, identity/ownership reasoning, rendering, and production evidence;
- the product is in development and has no public download surface yet.

**Do not claim publicly without a fresh product/evidence review:**

- a public installer;
- automatic upload as a shipping feature;
- universal highlight detection accuracy;
- guaranteed virality or view performance;
- causal performance claims from selected YouTube examples;
- public repository availability.

## Allusions

**Studio status:** maker/umbrella identity, not a product release channel.

The studio site may describe a common working standard across products but must never flatten product maturity. Every project entry should carry its own current status and link to the product-specific authority.

## Current public naming hierarchy

**ALLUSIONS → AFK AI → DemiMedia → ValClips**

## Pre-launch rule

Immediately before any Allusions/product-site launch:

1. re-fetch the canonical repository default branch;
2. re-check current release/tag state;
3. re-check the product's actual public download path;
4. compare proposed copy against this registry;
5. update this registry if repository truth changed;
6. keep unreleased branch-head work visually separate from shipping claims.
