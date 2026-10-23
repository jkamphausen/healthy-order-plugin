# Roadmap – Healthy Order

Binding plan for all plugins (see `AGENTS.md`). Status: ⬜ open · 🔄 in progress · ✅ done

## Infrastructure

| # | Task | Folder | Status |
|---|---|---|---|
| 0.1 | Release pipeline: numbering, procedure, checks, packaging, GitHub release workflow | `scripts/`, `.github/` | ✅ |

## Phase 1 – Replicate on Firefox and Safari
Goal: rebuild the existing Chrome extension (`chrome/`) 1:1.

| # | Task | Folder | Status |
|---|---|---|---|
| 1.1 | Firefox extension with identical behaviour (sorting + desaturation) | `firefox/` | ✅ |
| 1.2 | Safari extension (Xcode wrapper, macOS + iOS) with identical behaviour | `safari/` | 🔄 Web extension done; generate the Xcode project with the converter on a Mac (see `safari/README.md`) |
| 1.3 | Installation guide per plugin (README in each folder) | all | ✅ |

Reference: `chrome/content.js`, `chrome/scores.js`, `chrome/manifest.json`.

## Phase 2 – Onboarding (demonstration)
Goal: show that participant data can be entered in the plugin and stored persistently.
Demonstration only – no server connection, no analysis.

| # | Task | Folder | Status |
|---|---|---|---|
| 2.1 | Onboarding page opens automatically on first run | all | ⬜ |
| 2.2 | Field: user ID (number) | all | ⬜ |
| 2.3 | Choice: gender – male / female / diverse | all | ⬜ |
| 2.4 | Choice: age range – 4 ranges (proposal: 18–29, 30–44, 45–59, 60+) | all | ⬜ |
| 2.5 | Stored in `storage.local`; kept until uninstall | all | ⬜ |
| 2.6 | Entries can be changed later via the plugin's options page | all | ⬜ |

Implement in Chrome first, then bring Firefox and Safari up to date (separate commits).

## Later (not yet approved)
Ideas from the project summary, only after phase 2 and a team decision:
- Central server that delivers the active condition per user ID and week (data only, no code)
- Further conditions: sort shops, change colours, swap terms, control condition
- Alternative target "more vegetarian" instead of "healthier" (separate score set)
- ✅ Detect categories language-independently: done via the icon file name (`cuisine-filters/v1/<Name>.png`),
  because the category links carry only an opaque query parameter, no slug. Labels (EN/DE) remain as fallback.
- Monitoring when the category bar cannot be found
- Distribution: Chrome unlisted, Firefox self-signed, Safari via TestFlight
- Ethics approval, data protection concept, legal review (see project summary)
