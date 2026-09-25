# Capture provenance

Every image in this folder is a screenshot of the real AFK AI Windows app, not a mock-up. Captures were taken on 24 September 2026 on the maker's Windows 11 laptop at 150% display scaling and converted to WebP: Setup at 1600 and 800 px wide, the two Home captures as 1080 and 800 px content crops, plus a portrait crop (`*-phone.webp`) of the part that carries the evidence, served to phone-width screens. Nothing inside the window was drawn or retouched; the only edits are crops.

All three show the **next build's interface**: development build `37cbaed` on branch `claude/afk-ui-convergence-v1` (allusionsafk/afk-ai#26), not yet released. The current download, 0.2.0-rc1, runs the same setup checks and Home start in its earlier dark interface; the plain-word status labels shown here are new in the next build.

| File | State shown | How it was captured |
| --- | --- | --- |
| `afk-setup-*.webp` | Setup running its real preflight: Windows, virtualization and WSL ready, Docker installed but not running, hardware checked during setup | Fresh data folder, so the app opened in Setup; cropped to the window's content |
| `afk-home-starting-*.webp` | Home starting AFK AI from a stopped PC: the model runtime and Docker Desktop being started | The owner's real installation data, started from a stopped state; cropped to the state, message, actions and first log lines |
| `afk-home-refused-*.webp` | Home refusing to start because another Docker project already uses AFK AI's project name | Same run, cropped to the state, message, actions and first log lines. The containers belonged to an older development copy; AFK AI proved it did not own them and left them untouched |

Ready was not captured: on this PC the start stops at the ownership refusal above, and removing the other project's containers to force Ready was not done.
