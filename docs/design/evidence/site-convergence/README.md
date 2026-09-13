# AFK AI Site Convergence Evidence

Captured 2026-09-13 with `scripts/capture-site.mjs` and local headless Chrome. The capture utility uses Chrome DevTools Protocol, waits for fonts, records console/page errors and layout dimensions, and fails strict captures on horizontal overflow.

## Recovered reference lineage

The recovered Claude canvas workspace was read from:

`C:\Users\jidan\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Local\AllusionsWebDev\site`

The source prototypes are not copied into production. Their SHA-256 values preserve exact lineage:

| Direction | Artifact | SHA-256 |
| --- | --- | --- |
| B2 | `Instrument2Desktop.dc.html` | `B8DA302598DA68A8A746F16D16CF466F9DB22086B4E4FB2EB8DB010E6E77D0AD` |
| B2 | `Instrument2Mobile.dc.html` | `47719533633CD7624DC70B2533884D91D187359482FE7376742C98F008AD8AB8` |
| B2 | `Instrument2Products.dc.html` | `CF06362DF482DB4613039FA1B3B5474D883A1387BEC9A19006F41753FFB240B7` |
| D2 | `Modernist2Desktop.dc.html` | `33EC071103B522D74950732C24E08D733A0B8AF91DFD591CAE4BC9B132FD3A72` |
| D2 | `Modernist2Mobile.dc.html` | `4D5B527568F545D009A264528830C73E789B50EFC498CEBB08F59397B362CC3F` |
| D2 | `Modernist2Products.dc.html` | `C686B1353BBA4E122AA9C0353B8A487A4D1E15D6FBB935747192E57D85125EF5` |

## Screenshot matrix

### B2 Instrument System

- `b2/b2-mobile-390.png` — recovered dedicated mobile artifact, full page at 390 px.
- `b2/b2-tablet-768.png` — 768 × 1024 viewport crop of the recovered 1440 px desktop artifact.
- `b2/b2-desktop-1440.png` — recovered desktop artifact, full page at 1440 px.

### D2 Modernist Typographic

- `d2/d2-mobile-390.png` — recovered dedicated mobile artifact, full page at 390 px.
- `d2/d2-tablet-768.png` — 768 × 1024 viewport crop of the recovered 1440 px desktop artifact.
- `d2/d2-desktop-1440.png` — recovered desktop artifact, full page at 1440 px.

### Final B2-led convergence

- `final/afk-final-390-light.png` — full page, 390 × 844 viewport, light theme.
- `final/afk-final-768-light.png` — full page, 768 × 1024 viewport, light theme.
- `final/afk-final-1440-light.png` — full page, 1440 × 1000 viewport, light theme.
- `final/afk-final-1920-light.png` — full page, 1920 × 1080 viewport, light theme.
- `final/afk-final-1440-dark.png` — full page, 1440 × 1000 viewport, dark theme.

## Reference defects preserved as evidence

The B2 and D2 sources are fixed artboards rather than responsive production pages. Their desktop artifacts remain 1440 px wide at a 768 px viewport, so the tablet crops intentionally show horizontal clipping. The references also request missing prototype-only resources. Reference captures use `--strict false` and record those issues; final captures use strict mode and have no console, page, or overflow errors.

## Design decision

B2 won because its register, ruled evidence rows, hanging notation, and schematic language can make AFK AI primary without requiring product imagery. D2's portfolio hierarchy, oversized Allusions wordmark, and three-image dependency were rejected.

The sole D2 transplant is the Control Center proof figure: one asymmetric title/evidence composition with a narrow vertical axis. It contains semantic capability text and explicitly says it is not a screenshot, so the visual idea transfers without importing D2's portfolio structure or fabricating interface evidence.

## Reproduction

Serve `public` on `http://127.0.0.1:8130`, then run:

```powershell
node scripts/capture-site.mjs --url http://127.0.0.1:8130/ --out docs/design/evidence/site-convergence/final/afk-final-390-light.png --width 390 --height 844 --theme light
node scripts/capture-site.mjs --url http://127.0.0.1:8130/ --out docs/design/evidence/site-convergence/final/afk-final-768-light.png --width 768 --height 1024 --theme light
node scripts/capture-site.mjs --url http://127.0.0.1:8130/ --out docs/design/evidence/site-convergence/final/afk-final-1440-light.png --width 1440 --height 1000 --theme light
node scripts/capture-site.mjs --url http://127.0.0.1:8130/ --out docs/design/evidence/site-convergence/final/afk-final-1920-light.png --width 1920 --height 1080 --theme light
```

No capture command contacts or deploys production.
