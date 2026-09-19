# Contributing to the AFK AI website

This repository contains the AFK AI public website and pinned AFK AI Beta download route.

Use it for:

- landing-page content and presentation
- accessibility and responsive behaviour
- static assets
- the `/download` Worker route
- download-integrity tests
- security headers and Content Security Policy
- website documentation

Use the [AFK AI for Windows repository](https://github.com/allusionsafk/afk-ai) for installer, runtime, model, Docker, Ollama, SearXNG, Open WebUI, hardware, and application-support work.

Do not mix product-runtime changes into a website pull request.

## Before changing the site

1. Confirm the current behaviour.
2. Make a focused change.
3. Preserve the pinned AFK AI Beta download behaviour unless the pull request is a reviewed release update.
4. Run the checks for the area you changed.
5. Report only verification that actually ran.

## Local checks

```bash
npm ci
npm test
```

For JavaScript changes:

```bash
node --check worker.js
node --check public/assets/app.js
```

Run `git diff --check` before opening a pull request.

## Public copy

Use **AFK AI** as the product name. Keep public wording short and specific.

Do not describe AFK AI as offline-only. Separate local inference from setup, downloads, updates, optional web search, and other network activity. Do not claim a deployment until the live site has been checked.

Do not add analytics, trackers, remote fonts, or other third-party page dependencies without explicit review.

Public copy should not use em dashes.

## Security and privacy

Do not post credentials, tokens, private documents, chats, prompts, cookies, environment values, or unrelated machine information in issues or pull requests.

Report vulnerabilities through [SECURITY.md](SECURITY.md).

## Pull requests

A pull request should state:

- the problem
- the change
- checks run and their results
- any security, privacy, CSP, download, release, or deployment impact
- known limitations or follow-up work

Keep unrelated cleanup separate so each change is easy to review and revert.
