# Healthy Order – browser extension (research prototype)

Changes how ubereats.com is displayed: healthier categories first, less healthy ones last and desaturated.
Not affiliated with Uber.

| Folder/file | Contents |
|---|---|
| `chrome/` | Chrome extension (Manifest V3) – reference implementation, installation see `chrome/README.md` |
| `firefox/` | Firefox extension, installation see `firefox/README.md` |
| `safari/` | Safari extension (web extension + Xcode project), see `safari/README.md` |
| `ROADMAP.md` | Binding plan with status |
| `CHANGELOG.md` | Changes per release |
| `scripts/` | `check.sh` (consistency), `package.sh` (release archives), `release-notes.sh` |
| `AGENTS.md` | Rules for coding agents (Codex) – single source |
| `CLAUDE.md` | Imports `AGENTS.md` for Claude Code |

## Branches
- `main` – always releasable
- `dev` – integration branch
- `feature/*` – development, merged into `dev`
- `release/*` – release preparation, merged into `dev`, then `dev` into `main`

## Releases
Tags `vMAJOR.MINOR.PATCH[-alpha|beta|rc.N]` on `main` trigger the GitHub release workflow.
Numbering and procedure: `AGENTS.md` → *Releases*.
