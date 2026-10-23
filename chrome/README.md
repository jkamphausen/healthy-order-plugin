# Healthy Order

Forschungsprototyp einer Browser-Erweiterung, die die Kategorie-Leiste auf ubereats.com von gesund (vorne) nach ungesund (hinten) sortiert. Je ungesünder eine Kategorie ist, desto weniger farbig wird ihr Icon dargestellt.

Die Änderungen passieren nur lokal im Browser. Das Projekt steht in keiner Verbindung zu Uber.

## Status

Prototyp für Chrome (Manifest V3). Firefox, Safari, Ersteinrichtung und Serveranbindung sind geplant, aber noch nicht umgesetzt (siehe `ZUSAMMENFASSUNG.md`).

## Installation (Chrome)

1. Repo klonen oder ZIP entpacken.
2. `chrome://extensions` öffnen und oben rechts den **Entwicklermodus** einschalten.
3. **Entpackte Erweiterung laden** und den Projektordner wählen.
4. ubereats.com neu laden.

## Dateien

| Datei | Zweck |
|---|---|
| `manifest.json` | Erweiterungs-Manifest; läuft nur auf `https://www.ubereats.com/*` |
| `scores.js` | Gesundheits-Score je Kategorie (0 = gesund, 10 = ungesund) und Stärke der Entsättigung |
| `content.js` | Findet die Kategorie-Leiste, sortiert sie und setzt den Sättigungsfilter; wendet beides nach Neuzeichnen der Seite erneut an |
| `ZUSAMMENFASSUNG.md` | Konzept, Ausbauplan, Store-Verteilung, methodische und rechtliche Einschätzung |

## Anpassen

Scores und Entsättigung in `scores.js` ändern. Danach in `chrome://extensions` beim Plugin auf ↻ klicken und die Seite neu laden. Kategorien ohne Eintrag bekommen den Score 5.

Die Scores sind eine grobe Einschätzung und keine validierte Ernährungsskala.

## Bekannte Grenzen

- Die Leiste wird über englische Kategorienamen erkannt. Bei deutscher Oberfläche greift das Plugin nicht.
- Uber Eats nutzt verschleierte CSS-Klassen und kann die Seitenstruktur jederzeit ändern.
- Nur die sichtbare Icon-Leiste wird verändert.

## Hinweis

Vor einem Einsatz mit Teilnehmenden müssen Datenschutz, Ethikvotum und rechtliche Fragen geklärt sein (Details in `ZUSAMMENFASSUNG.md`).
