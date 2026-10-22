# DemiMedia product-site brief

Status: planning artifact only. Do not treat this as release documentation.

## Naming

**Public product name:** DemiMedia.

The existing engineering repository remains `allusionsafk/adaptive-media` until a separate repository-identity migration is explicitly approved. Public-facing copy should use DemiMedia. `Adaptive Media` is legacy/engineering naming; `Demi Player` is obsolete as a public-name candidate.

## Current product truth

There are two distinct current states and the website must not conflate them:

- public/default repository state: `main @ 32242a9f384b76fe1402b91c18ce4507b0e2b2c3`;
- closure-qualified engineering state: `codex/native-dv-playback-health-fixes @ f49d489519042c2aab940fb02e7cc9326342c641`.

The closure-qualified branch is the strongest current product truth for native Profile 7 playback and runtime recovery, but it is not yet merged into `main` and is not released.

The standalone repository currently has no GitHub releases. A historical Adaptive Media `0.4.0-rc1` prerelease remains in the former shared repository; it is provenance/testing history, not a current DemiMedia release authority.

**Website consequence:** there is no current DemiMedia download CTA. Use `View development` / `GitHub` until a standalone DemiMedia release actually exists.

## Product role

DemiMedia is a Windows 11 media player that turns the file, the machine, the display, and requested enhancements into an explicit playback plan, then reports what the runtime actually delivered.

The story is not "another mpv front-end" and not "a pile of video filters." The differentiated layer is policy and truthfulness around playback:

`source → hardware/display assessment → planned path → runtime observation → visible fallback`

The current application is a self-contained .NET 10 WPF app around mpv/gpu-next/libplacebo/FFmpeg, with MPC-BE compatibility fallback.

## Audience

Primary framing:

> Windows viewers who care about playback quality but do not want to maintain a hand-written playback stack.

Secondary audience:

- home-theatre/remux/HDR users;
- technically demanding viewers who want inspectable behavior without requiring mpv expertise.

Do not make enthusiast knowledge a prerequisite for understanding the site.

## Positioning

Recommended core line:

> Playback that understands the path, not just the file.

Supporting line:

> A Windows media player that plans playback around the source, your hardware and your display, then tells you what actually ran.

Avoid generic claims such as "best quality," "ultimate player," or "plays everything."

## Strongest differentiators

1. **Playback planning rather than blind option forwarding.** The application decides what can actually be used for the source, destination and hardware.
2. **Requested ≠ observed.** A feature being requested does not mean the UI reports it as delivered.
3. **Reference-first behavior with explicit enhancements.** A dedicated Reference preset exists and enhancement remains explicit; however, the current UI default/first preset is Automatic, so never say Reference is the default preset.
4. **Development evidence for native Profile 7 FEL playback.** The qualified branch has observed separate BL/EL hardware decode, pairing and composition with deterministic enhancement-layer control.
5. **Runtime recovery as a subsystem.** Verified runtime generations, health memory, previous-generation fallback and one-shot rollback are part of the closure-qualified development line.

Items 4–5 are development claims, not release claims.

## Information architecture

### 1. Hero

Answer immediately:

- What is DemiMedia?
- Why is it different?
- Is it downloadable today?

Recommended:

**DemiMedia**

> **Playback that understands the path, not just the file.**

> A Windows media player that plans playback around the source, your hardware and your display, then tells you what actually ran.

Status: `In development`

Primary CTA: `View development`

Do not add a Download button until a current standalone release exists.

### 2. Playback path

Use a semantic path diagram:

`Source → Decode → Render → Display`

Explain:

- source/container/video characteristics are probed before planning;
- destination geometry and available hardware influence the plan;
- the selected path is launched rather than reconstructing policy later;
- runtime state is monitored where it can be observed.

For native P7, separately label the development proof rather than implying every file uses that path.

### 3. Reference first

Safe copy:

> Start from a reference-first design, then enable enhancement deliberately.

Explain explicit choices such as:

- high-quality scaling;
- motion/cadence smoothing;
- colour-banding reduction;
- RTX Video Super Resolution;
- experimental RTX Video HDR;
- HDMI bitstream where supported.

Important: **Reference is not the current default preset. Automatic is the current default/first selection.**

Motion modes must be described as cadence smoothing, not AI optical-flow frame generation.

### 4. Runtime truth

This should be the strongest product-proof section.

Use:

`Requested → Planned → Observed → Fallback`

Recommended line:

> **A requested feature is not reported as active until the runtime proves it.**

Current architecture genuinely separates:

- requested options;
- planned/native-lane outcome;
- observed runtime state;
- lifecycle/health;
- fallback generation/status.

A new native attempt gets fresh evidence so prior Full-FEL evidence cannot leak into a fallback attempt.

### 5. Difficult media / Dolby Vision

This is initially a **Development** section, not the hero.

Safe development copy:

> Experimental native Profile 7 playback has been proven with separate base- and enhancement-layer decoding and observed FEL composition on the certified development path.

Evidence rail:

- `Profile` → `Dolby Vision P7 FEL`
- `Decode` → `BL + EL · d3d11va`
- `Composition` → `observed`
- `Media scratch` → `0 B`

Footnote:

> Development evidence; not yet a public DemiMedia release. No claim of TV-led Dolby Vision HDMI passthrough.

Keep Compatibility Export separate:

> P7→P8.1 export is a compatibility operation, not the playback path. FEL export discards the FEL picture contribution and must say so explicitly.

Do not use `lossless FEL conversion` wording.

### 6. Hardware boundaries

State limits rather than presenting a compatibility-logo wall.

Safe framing:

- hardware decode is used on supported qualified paths;
- RTX features require compatible NVIDIA hardware;
- the strongest native P7 evidence is currently on the certified NVIDIA/D3D11VA development configuration;
- HDMI bitstream and auto-HDR remain conditional/hardware-bound;
- one-machine evidence is not universal certification.

Do not advertise full qualification for every GPU or display chain.

### 7. Current development / release state

Recommended:

> **In active development.**
>
> DemiMedia does not yet have a standalone public release under its current name. A historical Adaptive Media prerelease remains available for provenance/testing, but it is not the current DemiMedia build.

Once a new standalone release exists, replace this with an exact tag, installer filename, digest, and release-notes link.

### 8. Built by Allusions

Footer/maker band:

> Built by Allusions.

Link to:

`https://allusions-site.pages.dev/`

Do not let the studio identity dominate the product page.

## Claims matrix summary

### Proven/current product scope

- Windows 11 target;
- .NET 10 WPF application;
- mpv/gpu-next/libplacebo/FFmpeg stack with MPC-BE compatibility fallback;
- playback planning and renderer/path selection;
- dedicated Reference preset and reference-first design philosophy;
- explicit enhancement controls;
- motion/native cadence modes;
- decoded PCM safe default;
- diagnostics;
- settings persistence;
- bounded P7→P8.1 compatibility export behavior.

### Development / Experimental treatment required

- native Profile 7 playback;
- observed FEL composition;
- native runtime provisioning/generation lifecycle;
- previous-generation rollback;
- zero media-sized scratch during native P7 playback;
- RTX Video HDR;
- automatic HDR switching/restoration.

### Not supported as website claims

- universal Dolby Vision support;
- Dolby Vision passthrough;
- full FEL fidelity for every title;
- guaranteed Atmos passthrough;
- automatic HDR on every display;
- AI frame generation;
- ordinary high-quality scaler described as AI upscaling;
- lossless P7 FEL→P8.1 conversion;
- zero scratch for export;
- works on all GPUs;
- cross-platform;
- stable release;
- current DemiMedia download before one exists.

## Visual direction

Do not reuse AFK's B2 page wholesale.

Recommended character:

- darker base or alternating dark technical bands;
- display-path diagrams;
- telemetry/readout typography;
- restrained green/blue spectral accents only when they encode state;
- large media surfaces only when they are real/current/cleared captures;
- quiet chrome and strong evidence blocks;
- runtime truth section as the visual/product signature.

Family resemblance with Allusions should come from disciplined typography, rules, maturity labels, and truth surfaces rather than shared decorative components.

## Screenshot plan

Final website screenshots should come from a build based on the closure-qualified engineering line after a minimal visible `Adaptive Media` → `DemiMedia` identity pass.

Recommended evidence set:

1. `01-demimedia-main-player.png` — main player, neutral/cleared media, playback plan visible;
2. `02-demimedia-reference.png` — Reference selected, native cadence, enhancements off;
3. `03-demimedia-enhancements.png` — real enhancement controls;
4. `04-demimedia-runtime-truth.png` — highest-value screenshot: plan + observed playback activity/diagnostics;
5. `05-demimedia-native-p7.png` — development-only native-P7 state if clean and truthful;
6. `06-demimedia-recovery.png` — actual previous-runtime/fallback state if reproducible without fabrication;
7. `07-demimedia-settings.png` — optional settings/current product identity.

Do not use recognisable copyrighted movie/TV imagery as the main public hero unless rights are clear. Prefer a self-created/public-domain/cleared clip or make the media viewport secondary.

Strip usernames, personal paths, development tools, terminals, private file names and unrelated desktop material.

## Naming debt before final screenshots

Safe low-risk visible identity pass:

- main window title/header;
- Settings title and user-facing copy;
- About/version text if present;
- diagnostics display product name.

Do **not** casually change compatibility-sensitive identifiers merely for screenshots:

- `AdaptiveMedia` namespaces;
- assembly/executable filename;
- installer AppId;
- settings paths;
- registry/class identifiers;
- repository name;
- historical release names.

The historical `v0.4.0-rc1` footer should not appear as the current DemiMedia development product identity.

## Technical site standard

Prefer a standalone static site/repository when production work starts:

- semantic HTML;
- CSS;
- minimal or zero JavaScript;
- strict CSP;
- self-hosted fonts/assets;
- no analytics by default;
- explicit release authority;
- no dependency on AFK's Worker/download route;
- public product naming consistently DemiMedia.

## Launch gate

Do not launch the dedicated site until:

- closure-qualified engineering line is integrated into the authoritative branch;
- visible public product identity uses DemiMedia;
- screenshots are from the current product and safe for public use;
- release authority is clear;
- current product status is re-verified;
- download CTA behavior matches actual release availability;
- every Dolby Vision/HDR/audio claim maps to documented evidence;
- no stale `Adaptive Media` product branding survives in public website copy except deliberate engineering/provenance references.
