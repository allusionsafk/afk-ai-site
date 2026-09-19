# AFK AI website

Public landing page and download route for [AFK AI for Windows](https://github.com/allusionsafk/afk-ai).

**Live site:** https://localai-windows-starter-site.allusionsafk.workers.dev/

[Product](PRODUCT.md) | [Design](DESIGN.md) | [Support](SUPPORT.md) | [Security](SECURITY.md) | [Contributing](CONTRIBUTING.md)

The site uses static HTML, CSS, and JavaScript plus one Cloudflare Worker route for the pinned AFK AI Beta installer.

## Public behaviour

| Surface | Behaviour |
|---|---|
| Homepage | Static. No accounts, forms, or analytics |
| Download route | `/download` |
| Pinned candidate | AFK AI Beta, version `0.1.7rc1` |
| Integrity | SHA-256 checked before installer bytes are returned |
| Failure mode | Refuse the download on upstream or hash mismatch |
| Version authority | Website pin, not `releases/latest` |

The repository also serves a legacy media page under `/adaptive-media/`. It does not control the AFK AI download route. Public product naming for that project is now **DemiMedia**; the legacy path remains for compatibility until the dedicated DemiMedia site is launched.

## Structure

```text
public/
  index.html
  adaptive-media/index.html
  assets/
  .well-known/security.txt
  _headers
  robots.txt

worker.js
wrangler.toml
tests/
```

Repository documentation and development files outside `public/` are not deployed as site content.

## Local development

```bash
npm ci
npm run dev
npm test
```

`npm run dev` starts Wrangler with the Worker route. A plain static server can preview the page, but `/download` will not work and the site does not fall back to an unpinned installer.

## Deployment

Deploy with:

```bash
npx wrangler deploy
```

A repository commit does not prove that the live Cloudflare deployment changed. Verify the deployed site separately.

## Download integrity

For `GET` or `HEAD` requests to `/download`, `worker.js`:

1. fetches the installer from the exact pinned tag
2. computes SHA-256 over the returned bytes
3. compares it with the committed digest
4. serves the file only on an exact match
5. refuses the request if retrieval or verification fails

The browser does not select a release dynamically.

The public repository is being renamed to `allusionsafk/afk-ai`. The Worker
keeps the qualified `0.1.7rc1` raw source URL and SHA-256 unchanged during that
rename. Before deploying after the rename, verify that the historical raw URL
still serves the exact pinned bytes; if it does not, change only the repository
component of the raw URL after independently verifying the same bytes at the
renamed repository and rerunning the integrity tests. Do not point `/download`
at the unqualified `0.2.0-rc1` source candidate.

## Security and privacy

The site has no accounts, cookies, forms, database, or analytics. Fonts and page assets are self-hosted. The deployed headers include a restrictive Content Security Policy and standard browser security controls.

AFK AI itself is local-first, not offline-only. Local inference and chat storage can remain on the user's machine. Setup, model downloads, updates, optional web search, and online integrations can use the internet.

See [SECURITY.md](SECURITY.md) for private vulnerability reporting and [SUPPORT.md](SUPPORT.md) for issue routing.

## Public copy

Public copy should be short, specific, and supported by current product behaviour. Use professional status language such as **Beta** or **Release candidate** and keep the exact version separate from the status label. Avoid unsupported privacy, platform, release, usage, or deployment claims.

## Licence

MIT. See [LICENSE](LICENSE).

**ALLUSIONS**  
Independent software by Jidan.
