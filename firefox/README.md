# Healthy Order – Firefox-Erweiterung (Forschungsprototyp)

Sortiert die Kategorie-Leiste auf ubereats.com von gesund (vorne) nach ungesund (hinten)
und reduziert die Farbsättigung der Icons, je ungesünder die Kategorie ist.
Die Änderung passiert nur lokal im Browser. Es werden keine Daten erhoben. Nicht mit Uber verbunden.

Inhaltlich identisch mit `chrome/` (`content.js` und `scores.js` sind gleich); nur das Manifest ist Firefox-spezifisch.

## Temporär laden (Entwicklung)
1. In Firefox `about:debugging#/runtime/this-firefox` öffnen.
2. **Temporäres Add-on laden…** und `firefox/manifest.json` auswählen.
3. Uber Eats neu laden. Das Add-on bleibt bis zum Firefox-Neustart aktiv.

## Dauerhaft installieren (Studie)
Firefox verlangt signierte Add-ons. Signieren ohne Store-Listing über `web-ext`:
```
npx web-ext sign --source-dir firefox --channel unlisted --api-key … --api-secret …
```
Die erzeugte `.xpi` kann an Teilnehmende verteilt und per Doppelklick installiert werden.
Mindestversion Firefox 140 (wegen `data_collection_permissions`).

## Anpassen
- Scores und Sättigungsstärke: `scores.js`
- Nach Änderungen in `about:debugging` auf **Neu laden** klicken und die Seite neu laden.
