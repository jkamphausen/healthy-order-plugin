# Rules for coding agents (Codex, Claude, …)

This file is the single source of agent rules. `CLAUDE.md` only imports it (`@AGENTS.md`)
and must not contain rules of its own, so both stay in sync. Always make changes here.

## Project
Browser extension "Healthy Order" (research prototype): changes how ubereats.com is displayed
(sorts categories, desaturates icons). Three target browsers: Chrome, Firefox, Safari.
Plan and priorities are in `ROADMAP.md`, which is binding.

## Folder structure
- Each plugin is developed exclusively in its own folder: `chrome/`, `firefox/`, `safari/`.
- No shared code between folders, no symlinks, no build scripts that write into another plugin's folder.
- Files outside the plugin folders (README, ROADMAP, CHANGELOG, AGENTS, CLAUDE, `scripts/`, `.github/`) are project files.
- Exception: scripts in `scripts/` may read all plugin folders, but write only to `dist/` (git-ignored).

## Feature parity
- All plugins behave the same (same features, same scores, same texts, same onboarding fields),
  unless `ROADMAP.md` explicitly defines an exception.
- Only these may be browser-specific: manifest details, APIs (`chrome.*` vs. `browser.*`), packaging
  (e.g. the Xcode wrapper for Safari).
- Whoever changes a feature in one plugin brings the other plugins up to date, in separate commits.
- `chrome/` is the reference implementation unless the roadmap says otherwise.

## Git workflow
- Development happens only in feature branches: branch `feature/<short-description>` off `dev`.
- Feature branches (and release branches, see *Releases*) are merged into `dev`. Never commit directly to `dev` or `main`.
- `main` is always releasable: only merge tested, complete states from `dev` into `main`.
- Changes to different plugins are always committed separately
  (one commit touches only one plugin folder; project files go into their own commit if needed).
- Commit prefix by folder: `chrome:`, `firefox:`, `safari:`, `docs:`, `repo:` (scripts, CI, git config), `release:` (merge into `main`).
- Commit messages: short, concise, precise. One line (max. ~60 characters), imperative mood, states *what* changes.
  Good: `firefox: add MV3 manifest with Gecko ID`. Bad: `Updates`, `various fixes`, long prose.
- Agents only commit when explicitly asked to.

## Data protection (binding for every implementation)
- Anonymous data only: no data that identifies a person is collected or stored
  (no name, no email, no Uber account data, no IP addresses, no device fingerprints).
- No linking: the user ID is a random number assigned by the study team. The plugin does not link it
  to Uber accounts, browser profiles or other identifiers, and derives nothing from them.
- Data minimisation: collect only the fields named in `ROADMAP.md`. Coarse categories instead of exact values
  (age range instead of date of birth). Never store anything "just in case".
- Correctness: inputs are validated (ID = positive integer, required fields, only the predefined
  choice values). Invalid input is rejected, never silently corrected. What will be stored is shown
  to the user before saving and can be viewed and changed afterwards.
- Local first: data stays in the browser's `storage.local`. No transfer to servers unless the
  roadmap explicitly allows it; then only via HTTPS, only the approved fields, and only with consent.
- Consent: every collection starts with a clear notice (purpose, fields, storage location,
  how to delete) and an active opt-in. No consent, no storage.
- Deletion: the user can delete all stored data at any time inside the plugin; uninstalling also
  deletes it.
- No page content: the plugin does not read content from ubereats.com and does not store behaviour
  (clicks, orders, shops) unless the roadmap provides for it.
- When in doubt: one field fewer. Note data protection questions in `ROADMAP.md` before implementing.

## Technical guardrails
- Manifest V3 for Chrome and Safari; Firefox MV3 with `browser_specific_settings.gecko`.
- No code is loaded from a server at runtime (store policies). Servers deliver data only.
- User ID and demographic data are stored exclusively in `storage.local`.
- No Uber trademarks (name, logo) in the plugin name or in screenshots. Include "Not affiliated with Uber".
- Do not read or send data from the Uber page unless the roadmap provides for it.
- Everything that modifies the page must survive re-renders of the React UI (MutationObserver).

## Way of working
- Read `ROADMAP.md` before every task and name the item it concerns.
- After finishing a task, update its status in `ROADMAP.md` (separate `docs:` commit).
- Small, traceable changes; no unrelated refactoring "on the side".
- English is the working language: code, identifiers, comments, commit messages, branch names,
  documentation, release notes and the plugin's UI texts. Exceptions only if `ROADMAP.md` defines them.

## Releases

### Version numbers
- Git tags follow Semantic Versioning: `vMAJOR.MINOR.PATCH` with an optional pre-release suffix
  `-alpha.N`, `-beta.N` or `-rc.N` (N starts at 1).
- Stages: `alpha` = early demo, unstable · `beta` = feature-complete for a phase, ready for test persons ·
  `rc` = release candidate for a study · no suffix = study version.
- While MAJOR is `0` the project is a prototype. `1.0.0` is reserved for the main study.
- Bump MINOR for new features (e.g. a roadmap phase), PATCH for fixes. Pre-release counter N increments
  for each further release of the same version; it resets when MAJOR/MINOR/PATCH changes.
- Examples: `v0.1.0-alpha.1` → `v0.1.0-alpha.2` → `v0.1.0-beta.1` → `v0.1.0` → `v0.2.0-alpha.1`.

### Versions inside the plugins
- `"version"` in all three manifests = `MAJOR.MINOR.PATCH` only (browsers allow digits only).
- `chrome/manifest.json` also has `"version_name"` = the full version without `v` (e.g. `0.1.0-alpha.1`).
- All manifests always carry the same version. `scripts/check.sh` enforces this.

### Changelog
- `CHANGELOG.md` follows *Keep a Changelog*. Every user-visible change goes under `## [Unreleased]`
  in the same feature branch that makes the change.
- On release, `[Unreleased]` is renamed to `## [<version>] - YYYY-MM-DD` and a new empty `[Unreleased]` is added.

### Release procedure (agents prepare, a human approves the push)
1. Start from an up-to-date, clean `dev`. Run `scripts/check.sh`; it must pass.
2. Create the branch `release/<tag>` from `dev` (e.g. `release/v0.1.0-alpha.1`).
3. Bump the version, one commit per plugin:
   `chrome: bump version to <version>` (sets `version` and `version_name`),
   `firefox: bump version to <version>`, `safari: bump version to <version>`.
4. Update `CHANGELOG.md` as described above: `docs: update changelog for <tag>`.
5. Run `scripts/package.sh <tag>`. It runs `scripts/check.sh <tag>` and builds the archives and
   release notes in `dist/`. Fix any failure in the release branch before continuing.
6. Merge `release/<tag>` into `dev` with `--no-ff`.
7. Merge `dev` into `main` with `--no-ff` and the message `release: <tag>`.
8. Create an annotated tag on `main`: `git tag -a <tag> -m "<tag>"`.
9. Stop and report to the human: the tag, the changelog section and the files in `dist/`.
   Push only after explicit approval: `git push origin main dev <tag>`.
10. After the push, GitHub Actions (`.github/workflows/release.yml`) verifies that the tag is on `main`,
    builds the archives again and creates the GitHub release with the zips attached.
    Tags with a suffix (`-alpha`, `-beta`, `-rc`) are published as *pre-release* automatically.
11. Delete the local `release/<tag>` branch and continue working on `dev`.

### Rules
- Never move or delete a pushed tag. A broken release gets a new version (e.g. `alpha.2`).
- Never create a release from a branch other than `main`.
- Agents never push or tag without the human's explicit approval.

