# Changelog

All notable changes to this project are documented in this file.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) · Versioning: [Semantic Versioning](https://semver.org/) (see `AGENTS.md` → *Releases*).

## [Unreleased]

### Fixed
- Categories are now identified by the language-independent icon file name (e.g. `Salad.png`), with
  English and German labels as fallback. The German site (ubereats.com/de) is sorted and desaturated
  correctly; the bar is also detected on German pages. New categories: Greek (4), Indian (4.5),
  Street Food (7), Soul Food (8). Unknown categories keep the default score and are logged once via
  `console.debug`.
- The first category no longer slides under the "previous" arrow: spacer elements keep their original
  slots and only the category items are reordered.

## [0.1.0-alpha.1] - 2026-10-23

### Added
- Chrome extension: sorts the category bar on ubereats.com by health score and desaturates less healthy categories.
- Firefox extension with identical behaviour.
- Safari web extension with identical behaviour, plus instructions for generating the Xcode project.
- Roadmap, agent rules and release pipeline (consistency checks, packaging, GitHub release workflow).
