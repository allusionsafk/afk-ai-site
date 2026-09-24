---
version: 1
slug: "public-index-html"
primary_target: "public/index.html"
related_targets: []
---

Scope: AFK AI product homepage (public/index.html, public/assets/afk.css). Mode: Persuade (the visitor decides whether to download the Beta). The legacy /adaptive-media/ page and the /download Worker route are out of scope and unchanged.

Audience and job: a Windows 11 user who wants a local model without assembling Docker, WSL and Ollama by hand. Within seconds: what AFK AI does, that it is a Beta at 0.2.0-rc1, the download, what the machine needs, where data goes.

Proof: real captures of the app's Setup and Home (development build 37cbaed, unreleased, disclosed next to the download version), including the honest ownership refusal. No Ready capture exists; no Models & Fit or Optimization surface is shown.

Constraints: static HTML/CSS, no JavaScript on the homepage, CSP from public/_headers, self-hosted fonts, download only via /download, facts from the release notes and source.

## Direction contract

THESIS: A workbench, not a launch page. The real app window sits on a warm material bench that runs off the page edge; the copy beside it is plain. Refuses the category default of gradient hero art, feature-icon grids, fake terminals and capability maps standing in for the product.

OWN-WORLD: The app's own palette: warm paper #f8f7f3, one warm material #eee8dc as the bench and the single emphasised section, near-black ink #1f211d, support ink #5f625a, separators #d5d3ca, blue focus #435f8d, one dark primary action. The page closes on one ink band holding the final download, an echo of the ALLUSIONS studio's single dark reversal; it is the close, not a second emphasised section. Bricolage Grotesque headings shared with the ALLUSIONS family, Windows UI text, mono only for the version and installer filename.

STORY: The visitor learns AFK AI is a native Windows app that checks, sets up and starts local AI and names the one next step; sees it do exactly that in real windows, including refusing to touch what it cannot prove it owns; reads what ships, the machine requirements, where data goes and what is not shipped; downloads 0.2.0-rc1.

FIRST VIEWPORT: Sticky top bar (mark, three section links, Download). Left five columns: H1 "Local AI on Windows. Less plumbing.", one-paragraph lede, primary Download button with a quiet "What to check first" link, release and installer line (Beta 0.2.0-rc1 for Windows 11, installer filename). Right seven columns: the real Setup window on the warm bench, bleeding to the right page edge, with a dated caption disclosing the build.

FORM: Warm local workbench (brief-pinned product personality; no concept roll). Code-led; the captures are the imagery. Signature interaction: the lead window slides onto the bench once on load (reduced-motion off; visible without it).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
