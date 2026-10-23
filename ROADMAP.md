# Roadmap – Healthy Order

Verbindlicher Fahrplan für alle Plugins (siehe `AGENTS.md`). Status: ⬜ offen · 🔄 in Arbeit · ✅ fertig

## Phase 1 – Replikation auf Firefox und Safari
Ziel: Die vorhandene Chrome-Erweiterung (`chrome/`) 1:1 nachbauen.

| # | Aufgabe | Ordner | Status |
|---|---|---|---|
| 1.1 | Firefox-Erweiterung mit identischem Verhalten (Sortierung + Entsättigung) | `firefox/` | ✅ |
| 1.2 | Safari-Erweiterung (Xcode-Wrapper, macOS + iOS) mit identischem Verhalten | `safari/` | 🔄 Web-Extension fertig; Xcode-Projekt per Konverter auf dem Mac erzeugen (siehe `safari/README.md`) |
| 1.3 | Installationsanleitung je Plugin (README im Ordner) | alle | ✅ |

Referenz: `chrome/content.js`, `chrome/scores.js`, `chrome/manifest.json`.

## Phase 2 – Onboarding (exemplarisch)
Ziel: Zeigen, dass Teilnehmerdaten im Plugin erfasst und dauerhaft gespeichert werden können.
Nur Demonstration – keine Server-Anbindung, keine Auswertung.

| # | Aufgabe | Ordner | Status |
|---|---|---|---|
| 2.1 | Onboarding-Seite öffnet sich beim ersten Start automatisch | alle | ⬜ |
| 2.2 | Feld: Nutzer-ID (Zahl) | alle | ⬜ |
| 2.3 | Auswahl: Geschlecht – männlich / weiblich / divers | alle | ⬜ |
| 2.4 | Auswahl: Altersspanne – 4 Spannen (Vorschlag: 18–29, 30–44, 45–59, 60+) | alle | ⬜ |
| 2.5 | Speicherung in `storage.local`; bleibt bis zur Deinstallation erhalten | alle | ⬜ |
| 2.6 | Eingaben über die Optionsseite des Plugins nachträglich änderbar | alle | ⬜ |

Erst Chrome umsetzen, dann Firefox und Safari nachziehen (separate Commits).

## Später (noch nicht freigegeben)
Ideen aus der Projektzusammenfassung, erst nach Phase 2 und nach Entscheidung des Teams:
- Zentraler Server, der pro Nutzer-ID und Woche die aktive Bedingung liefert (nur Daten, kein Code)
- Weitere Bedingungen: Shops sortieren, Farben ändern, Begriffe tauschen, Kontrollbedingung
- Alternative Zielrichtung „vegetarischer“ statt „gesünder“ (eigener Score-Satz)
- Erkennung der Kategorien über sprachunabhängige Link-Slugs statt englischer Namen
- Monitoring, wenn die Kategorie-Leiste nicht gefunden wird
- Verteilung: Chrome nicht gelistet, Firefox selbst signiert, Safari via TestFlight
- Ethikvotum, Datenschutzkonzept, rechtliche Prüfung (siehe Projektzusammenfassung)
