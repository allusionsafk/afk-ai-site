---
name: AFK AI site
description: Local-first Windows AI landing page using the B2 instrument/editorial system with light and dark themes and no third-party page origins.
typography:
  display: "Bricolage Grotesque"
  body: "system-ui"
  mono: "IBM Plex Mono"
---

# AFK AI design system

The deployed site presents AFK AI as straightforward Windows software with an instrument/editorial character. Product status, requirements, privacy limits, download behaviour, and development direction should be easy to distinguish without fake product theatre.

## Core visual system

### Typography

- Display: Bricolage Grotesque
- Body: system UI stack
- Evidence/status/technical labels: IBM Plex Mono

Use the mono face for ports, commands, hashes, versions, maturity labels, figure labels, and compact evidence text. Use the body face for normal prose.

### Structure

The current B2-derived system uses:

- paper-like neutral light surfaces
- dark proof/evidence bands where a stronger contrast boundary is useful
- one-pixel rules and registration lines
- hanging notation and compact reference labels
- semantic figures rather than fabricated screenshots
- restrained radii and minimal decorative shadow
- clear vertical rhythm rather than card-grid density

Do not regress to generic SaaS cards, glass effects, neon AI styling, or oversized decorative gradients.

## Page hierarchy

The first screen should answer three questions quickly:

1. What is AFK AI?
2. Why would a Windows user care?
3. Where is the download?

Current headline:

> **Local AI on Windows. Less plumbing.**

The hero keeps the pinned Beta/version visible, presents system requirements near the main CTA, and uses a labelled setup-path figure instead of fake UI.

Current section order:

1. hero + setup-path figure
2. shipping-now evidence
3. Beta limitations
4. Control Center proof figure
5. local/network boundary
6. development direction
7. reserved real-demo seam
8. closing download action

Detailed implementation material belongs in GitHub documentation rather than the first screen.

## Maturity vocabulary

Use professional, literal states:

- Shipping now
- Beta
- Beta limits
- Development direction
- Release candidate where appropriate

Keep exact versions separate from status labels, for example:

> `Beta · 0.1.7rc1`

Do not introduce `Friend Beta` in current public copy.

Roadmap material must never look like a currently available feature.

## Components

### Buttons

Primary buttons need visible focus, clear action text, practical touch targets, and no urgency language.

### Reference labels

Use compact mono labels such as `AFK / 001`, `TRUTH / A`, or `FIG. 01` to orient evidence and sections. Do not add them merely as decoration; each should help establish hierarchy or meaning.

### Evidence figures

The current site intentionally uses semantic figures instead of product mockups:

- setup path
- Control Center capability proof
- local-versus-network boundary
- reserved future demo seam

A figure must remain truthful, labelled, and readable without pretending to be the real interface.

### Status treatments

Status/maturity labels are literal product state, not promotional badges. Keep them short and visually subordinate to the product name/headline.

## Copy

Public copy should be accurate, short, calm, specific, and readable by non-experts.

Avoid hype, fake certainty, privacy absolutes, invented metrics, fake screenshots, fake testimonials, countdowns, scarcity language, and unexplained acronyms in the first screen.

Use simple punctuation. Public copy should not use em dashes.

## Privacy presentation

Clearly separate local behaviour from network activity.

Local by design:

- model inference
- Open WebUI account and chat database
- loopback user-facing services

Network activity when needed or enabled:

- setup downloads
- model downloads
- updates
- optional web search
- optional online integrations

Do not describe the current native Ollama host bind as loopback-only.

## Accessibility

Maintain:

- semantic headings
- one primary `h1`
- a skip link
- visible keyboard focus
- meaningful button labels
- sufficient contrast
- touch-friendly controls
- reduced-motion support
- accessible theme controls
- sensible reading order without CSS
- no horizontal page overflow at narrow mobile widths and reasonable zoom reflow

Do not use colour as the only indicator of meaning.

## Content Security Policy

Keep scripts, styles, fonts, and assets same-origin. Avoid inline scripts, inline event handlers, inline styles, third-party embeds, remote analytics, and remote fonts.

Visual changes should not weaken the Content Security Policy.

## Maker identity

AFK AI owns the page. Allusions appears only as a quiet maker attribution.

Maker attribution links to the Allusions site at `https://allusions-site.pages.dev/`.

## Review checklist

Before shipping a public-facing change, confirm that:

- product claims match current behaviour
- the first screen explains the product quickly
- the download path is obvious
- local-first wording is precise
- shipping behavior, Beta limits, and development direction remain distinct
- the exact version is visible without informal status language
- no third-party page origin was added without review
- light and dark mode still work
- public copy contains no em dash
- accessibility/CSP/reflow contracts remain intact
- the change adds useful information rather than visual noise
