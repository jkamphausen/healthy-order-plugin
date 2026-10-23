# Healthy Order – Safari-Erweiterung (Forschungsprototyp)

Sortiert die Kategorie-Leiste auf ubereats.com von gesund (vorne) nach ungesund (hinten)
und reduziert die Farbsättigung der Icons, je ungesünder die Kategorie ist.
Die Änderung passiert nur lokal im Browser. Es werden keine Daten erhoben. Nicht mit Uber verbunden.

Inhaltlich identisch mit `chrome/` (`content.js` und `scores.js` sind gleich).

## Aufbau
- `extension/` – die eigentliche Web-Extension (Manifest V3, Safari 15.4+). **Nur hier wird entwickelt.**
- `HealthyOrder/` – Xcode-Projekt (App-Wrapper für macOS und iOS), wird per Konverter erzeugt (siehe unten).
  Es verweist auf `extension/`, der Code wird nicht dupliziert.

## Xcode-Projekt erzeugen (einmalig, auf dem Mac)
Voraussetzung: Xcode installiert.
```
cd safari
xcrun safari-web-extension-converter extension \
  --project-location . \
  --app-name HealthyOrder \
  --bundle-identifier local.research.healthy-order \
  --macos-only --no-open --copy-resources
```
Ohne `--macos-only` wird zusätzlich ein iOS-Target erzeugt (Safari auf dem iPhone).
Ohne `--copy-resources` referenziert Xcode den Ordner `extension/` direkt – dann wirken Änderungen dort sofort.

## Ausführen (Entwicklung)
1. `HealthyOrder/HealthyOrder.xcodeproj` in Xcode öffnen und das macOS-Target starten (▶).
2. In Safari: **Einstellungen → Erweiterungen** → „Healthy Order“ aktivieren.
   Falls die Erweiterung nicht erscheint: **Safari → Einstellungen → Erweitert → „Menü Entwickler anzeigen“**,
   dann **Entwickler → Unsignierte Erweiterungen erlauben**.
3. Uber Eats neu laden.

## Verteilen (Studie)
Für Teilnehmende über **TestFlight** (Apple-Developer-Account nötig, 99 $/Jahr). Apple verlangt bei
Gesundheitsforschung Einwilligung und Ethikvotum (App Store Guideline 5.1.3).

## Anpassen
- Scores und Sättigungsstärke: `extension/scores.js`
- Nach Änderungen das Xcode-Target neu starten und die Seite neu laden.
