# Healthy Order – Browser-Erweiterung (Forschungsprototyp)

Verändert die Darstellung auf ubereats.com: gesündere Kategorien vorne, ungesündere hinten und entsättigt.
Nicht mit Uber verbunden.

| Ordner/Datei | Inhalt |
|---|---|
| `chrome/` | Chrome-Erweiterung (Manifest V3) – Referenzimplementierung, Installation siehe `chrome/README.md` |
| `firefox/` | Firefox-Erweiterung (im Aufbau) |
| `safari/` | Safari-Erweiterung, Xcode-Projekt (im Aufbau) |
| `ROADMAP.md` | Verbindlicher Fahrplan mit Status |
| `AGENTS.md` | Regeln für Coding-Agenten (Codex) – einzige Quelle |
| `CLAUDE.md` | Importiert `AGENTS.md` für Claude Code |

## Branches
- `main` – immer releasable
- `dev` – Integrationsbranch
- `feature/*` – Entwicklung, wird nach `dev` gemerged
