# ValClips product-site brief

Status: planning artifact only. ValClips does not currently have a public product surface.

## Product role

ValClips should be presented as gameplay-to-clip intelligence, not as a generic video editor.

The public story should focus on the transformation:

`long recording → candidate moments → evidence-aware selection → render plan → finished clip`

The private repository currently describes a local Valorant Shorts studio using local components such as FFmpeg, Ollama, Whisper, and Kokoro. The package is private and there is no public installer/download authority yet.

## Positioning

Recommended core line:

> Find the moments worth keeping. Build the clip around the evidence.

Alternative:

> From long gameplay recordings to deliberate short-form clips.

Avoid "AI highlights" as the whole identity. It makes the product sound interchangeable with generic clipping tools and hides the harder selection/evidence work.

## Information architecture

### 1. Hero

Show the input/output problem immediately:

- hours of gameplay in;
- candidate moments and rendered vertical clips out;
- local/private processing direction where it is actually true;
- current state: in development, not publicly downloadable.

The primary CTA before public release should be `See how it works`, not `Download`.

### 2. Pipeline proof

Use a horizontal or stacked semantic pipeline:

1. Observe recording
2. Detect candidate window
3. Establish player/ownership context
4. Score/select
5. Plan trim/render
6. Produce clip

This should become the visual spine of the page.

### 3. Real clips

Once public-facing examples are cleared, the strongest product evidence is actual output.

Show:

- source context / candidate window;
- final clip;
- why the system selected it;
- if useful, what was rejected nearby.

Do not flood the page with a gallery. Three strong examples with evidence are better than twenty thumbnails.

### 4. Evidence, not virality claims

If YouTube/channel performance is used later, present it as observed output performance rather than causal proof.

Acceptable structure:

- clip identifier;
- publication date;
- views / retention snapshot at a stated time;
- selection rank or experiment cohort if available;
- no claim that ValClips caused the performance unless the experiment supports that conclusion.

Avoid cherry-picked "X views" hero metrics without methodology.

### 5. Detector truth

Public copy should acknowledge that detection is probabilistic and game-state dependent.

Useful language:

> ValClips keeps source evidence, detector state, and publication eligibility separate so a missing backend or ambiguous window does not silently become a confident result.

Only use this level of detail if the current branch/release actually enforces it.

### 6. Local processing / privacy

The current package metadata describes no accounts, API keys, or uploads and uses local components. Re-verify this before launch because upload integrations or external services may change that boundary.

If YouTube upload becomes a product feature later, separate:

- local analysis/rendering;
- OAuth-authorized publication;
- any optional network service.

Never preserve an old "no uploads" claim after an uploader ships.

### 7. Current state

Until a public installer or stable distribution exists:

> In development. Public build not available yet.

Do not publish a fake waitlist or capture email addresses merely to look like a startup. Add a mailing list only when there is a real operational reason.

### 8. Allusions attribution

Keep a quiet maker link:

> Built by Allusions.

ValClips should still have its own visual identity.

## Visual direction

ValClips should feel faster and more temporal than AFK or Adaptive Media.

Recommended ingredients:

- dark neutral canvas with restrained game-derived accents;
- timeline bands / evidence windows;
- frame sequences rather than fake dashboards;
- clip cards with source → selected → output progression;
- dense data only when it explains why a clip exists;
- motion used sparingly to show temporal selection, not decorative parallax.

Do not copy Valorant branding or imply affiliation.

## Public evidence assets to gather

Before production launch, build an approved evidence set containing:

- 3–6 real source recordings/clips that can be shown publicly;
- final rendered vertical clips;
- detector/candidate evidence stripped of private paths/usernames;
- one negative/rejected example if it helps explain selectivity;
- output performance snapshots with collection dates;
- a short 20–40 second pipeline demo.

## Claims to avoid

- guaranteed viral clips;
- universal kill/highlight detection;
- perfect player identity;
- automatic publishing unless the shipping build really does it;
- "no internet" if OAuth/upload or remote inference is introduced;
- public availability while the repo/build remains private;
- using a private repository link as a CTA for normal visitors.

## Technical site standard

When a real public surface is justified:

- separate static site/repository;
- semantic HTML/CSS/minimal JS;
- strict CSP;
- video assets encoded efficiently and lazy-loaded;
- no autoplay audio;
- no analytics by default;
- no third-party embed dependence for critical product explanation;
- product status and release authority explicit.

## Launch gate

Do not launch the ValClips product site until:

- public/private product boundary is intentional;
- name and capitalization are settled;
- a public CTA exists that actually works;
- at least three truthful output examples are cleared;
- product/network claims are re-verified;
- commercial evidence is presented with dates/methodology rather than implication;
- the site does not expose game account names, local paths, tokens, or private development material.
