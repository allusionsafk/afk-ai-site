# AFK AI website support

Use this repository for problems with the public AFK AI website and its pinned Beta download route.

## Report here

Open an issue here for:

- pages that do not load or render correctly
- broken navigation or links
- accessibility or responsive-layout problems
- incorrect or unclear website copy
- metadata, sharing previews, robots, or indexing
- `/download` returning the wrong status or failing unexpectedly
- security headers that do not match the documented configuration

Choose the issue form that best matches the problem and include only the information needed to reproduce it.

## Product and installer support

For AFK AI installation, Windows prerequisites, hardware compatibility, Docker, WSL, Ollama, models, Open WebUI, search, voice, Control Center, or other runtime behaviour, use the main project support page:

https://github.com/allusionsafk/localai-windows-starter/blob/master/SUPPORT.md

## Download problems

The website serves a pinned AFK AI Beta installer through `/download` and verifies its SHA-256 before returning the file.

If that route fails, include:

- approximate time of the request
- `GET` or `HEAD` if known
- HTTP status code if visible
- whether the homepage loaded
- whether the problem also occurs in another browser or private window

Do not post cookies, authentication data, full browser profiles, unrelated diagnostics, or private machine information.

## Security reports

Do not open a public issue for a vulnerability or sensitive exploit details. Follow [SECURITY.md](SECURITY.md) for private reporting.

## Deployment status

A repository commit does not prove that the live Cloudflare site changed. When reporting a live-site problem, describe what you observed on the deployed site and include a repository commit or branch only when it helps the comparison.
