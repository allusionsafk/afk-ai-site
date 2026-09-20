# Allusions studio site — production blueprint

Status: pre-production plan. This does not authorize deployment.

## Objective

Turn the approved studio direction into a very small, durable public home for Allusions without coupling it to AFK AI's deployment or pretending the studio itself is a software product.

## Recommended repository/deployment

Create a dedicated repository once visual direction is approved:

- preferred repository name: `allusions-site`;
- static site only;
- its own Cloudflare Pages/Worker deployment or equivalent static host;
- no dependency on AFK's `/download` Worker;
- no release-pinning logic unless the studio site later distributes something itself.

Do not put production Allusions files under the AFK site repository just because prototypes began there.

## MVP routes

The studio MVP only needs:

- `/` — studio homepage / project register;
- `/security` or a stable security contact route if one is needed at studio level;
- `/.well-known/security.txt` only if there is a real studio-wide contact policy;
- `robots.txt`;
- optional lightweight 404.

Do not create empty About/Blog/Careers/Press pages.

## Homepage content contract

### Masthead

- Allusions wordmark;
- Projects anchor;
- Method/standard anchor;
- GitHub organization link.

### Hero

Recommended production copy candidate:

> Software that takes responsibility for the machinery.

Supporting line:

> Allusions builds focused tools for local AI, difficult media, and gameplay production. The domains change; the standard does not: measure reality, make state legible, and keep complexity inside the tool.

Keep this under roughly 50 words.

### Project register

Three entries only at launch:

1. AFK AI
2. Adaptive Media
3. ValClips

Each entry contains:

- name;
- product role;
- current status;
- one proof point;
- one destination.

Do not show download buttons on the studio homepage unless the destination itself is the product's canonical download page.

### Working standard

Four concise principles:

- Observe before acting.
- Separate requested, inferred, and observed state.
- Treat setup/recovery/diagnostics as product work.
- Keep technical depth inside the tool.

### Footer

- Allusions;
- GitHub organization;
- product destinations;
- security/contact if established;
- no newsletter/social filler.

## Content authority

Product pages remain authoritative for release/download claims.

The studio site may cache a concise status label, but that label must be checked against canonical product truth before each studio deployment.

Recommended implementation: a tiny checked-in data object/file such as:

```json
{
  "afk": {"status": "Beta", "destination": "..."},
  "adaptiveMedia": {"status": "In development", "destination": "..."},
  "valclips": {"status": "In development", "destination": null}
}
```

Do not fetch GitHub/release state dynamically in the browser. Static deployment keeps the site deterministic and avoids leaking availability failures into the homepage.

## Visual recommendation

Start from **D2 Studio**, not a clean-sheet third direction.

Production convergence should likely borrow one restraint from D2 Quiet:

- keep the stronger D2 Studio wordmark and asymmetric project register;
- reduce editorial labels that do not carry information;
- keep the project descriptions short enough that mobile remains under control;
- reserve the dark method band as the single high-contrast section.

The studio site should be visually bolder than AFK but shorter than AFK.

## Asset policy

MVP should work without product screenshots.

If real assets are introduced later:

- AFK: current clean product/setup capture;
- Adaptive Media: current player or runtime-state capture;
- ValClips: real source/output clip frame pair.

Do not use generic stock imagery or generated fake application windows.

## Typography

Use self-hosted fonts.

Prefer reusing the already proven font family roles from the AFK site only if licensing/assets are clean for the new repository:

- expressive grotesque/display role;
- quiet UI/body role;
- monospace evidence/status role.

Do not make the studio dependent on Google Fonts or a third-party font CDN.

## Interaction

MVP JavaScript should be optional.

Useful JS, if any:

- theme toggle;
- small progressive navigation enhancement.

Not needed:

- SPA routing;
- animated cursor;
- scroll-jacking;
- canvas/WebGL decoration;
- analytics;
- client-side GitHub API calls.

## CSP target

Aim for a stricter policy than most portfolio sites:

- `default-src 'self'`;
- no remote script origins;
- self-hosted fonts/styles/images;
- `object-src 'none'`;
- `base-uri 'self'`;
- `frame-ancestors 'none'` where appropriate.

Tune only for assets actually used.

## Responsive gates

Before launch render and inspect:

- 195px reflow stress if practical;
- 320;
- 390;
- 768;
- 1280/1440;
- 1920.

Check wordmark tracking and long product names especially around 320–480px.

## Accessibility gates

- one H1;
- logical heading order;
- skip link;
- named navigation;
- visible focus;
- no color-only status meaning;
- AA text contrast;
- reduced-motion handling if motion is added;
- link purpose understandable outside visual layout.

## Privacy/security gates

Before making the studio repo public or deploying:

- search for Windows/macOS/Linux local paths;
- search for usernames;
- search for Claude/Codex workspace paths;
- search for tokens/credentials;
- inspect images for private desktop/tooling context;
- verify outbound links;
- verify no private ValClips repository URL is exposed as a useful public CTA.

## Domain decision

Do not block design/implementation on buying a custom domain.

Build so the host can change later without code surgery:

- central canonical-origin constant during build/deploy;
- relative internal links;
- no hard-coded Workers.dev URL scattered through CSS/JS;
- redirects added only after the final domain exists.

## Launch sequence

1. approve D2 Studio vs D2 Quiet/convergence using real browser renders;
2. create dedicated `allusions-site` repository;
3. port only the winning production markup/CSS, not all prototype debris;
4. add self-hosted assets and CSP;
5. add status registry/content test;
6. run privacy/secret audit;
7. deploy preview;
8. inspect mobile/tablet/desktop;
9. approve public copy;
10. deploy production;
11. update product-site `Built by Allusions` links;
12. verify all cross-site destinations.

## Definition of done

The Allusions site is done when a visitor can understand in under 20 seconds:

- what Allusions is;
- what the three products are;
- how mature each one is;
- what common standard connects them;
- where to go next.

Anything beyond that belongs on a product site.
