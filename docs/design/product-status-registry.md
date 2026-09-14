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

## Adaptive Media

**Public repository state:** Active development.

The standalone `allusionsafk/adaptive-media` repository describes a Windows 11 media player built with .NET/WPF and mpv/gpu-next/libplacebo/FFmpeg. It also states that the historical `v0.4.0-rc1` prerelease remains in the former shared repository and has not been republished from the standalone repository.

**Safe public claims from current canonical main:**

- Windows 11 media player focused on dependable playback;
- reference playback is the default;
- enhancement controls are explicit user choices;
- requested settings and observed runtime state are kept separate;
- degraded/unsupported paths should be visible;
- Profile 7 to Profile 8.1 conversion work is evidence-backed and bounded where supported;
- temporary media scratch space for that conversion path is bounded;
- decoded PCM is the safe audio default and HDMI bitstream output is optional.

**Do not claim from the current public main page:**

- universal Dolby Vision correctness;
- native Windows Profile 7 FEL passthrough;
- universal HDMI/Atmos/HDR switching behavior;
- a current standalone public release unless one has actually been republished there.

**Presentation name:** keep `Adaptive Media` until the product name `Demi Player` is explicitly approved and migration/redirect work is planned.

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

## Pre-launch rule

Immediately before any Allusions/product-site launch:

1. re-fetch the canonical repository default branch;
2. re-check current release/tag state;
3. re-check the product's actual public download path;
4. compare proposed copy against this registry;
5. update this registry if repository truth changed;
6. keep unreleased branch-head work visually separate from shipping claims.
