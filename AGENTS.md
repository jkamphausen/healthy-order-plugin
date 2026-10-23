# Regeln für Coding-Agenten (Codex, Claude, …)

Diese Datei ist die einzige Quelle der Agenten-Regeln. `CLAUDE.md` importiert sie nur (`@AGENTS.md`)
und darf keine eigenen Regeln enthalten – so bleiben beide synchron. Änderungen immer hier vornehmen.

## Projekt
Browser-Erweiterung „Healthy Order“ (Forschungsprototyp): verändert die Darstellung auf ubereats.com
(Kategorien sortieren, Icons entsättigen). Drei Zielbrowser: Chrome, Firefox, Safari.
Fahrplan und Prioritäten stehen in `ROADMAP.md` – sie ist verbindlich.

## Ordnerstruktur
- Jedes Plugin wird ausschließlich in seinem eigenen Ordner entwickelt: `chrome/`, `firefox/`, `safari/`.
- Kein geteilter Code zwischen den Ordnern, keine Symlinks, keine Build-Skripte, die in fremde Ordner schreiben.
- Dateien außerhalb der Plugin-Ordner (README, ROADMAP, AGENTS, CLAUDE) sind Projektdateien.

## Inhaltliche Gleichheit
- Alle Plugins verhalten sich inhaltlich gleich (gleiche Features, gleiche Scores, gleiche Texte, gleiche
  Onboarding-Felder), sofern `ROADMAP.md` nicht ausdrücklich eine Ausnahme festlegt.
- Browserspezifisch dürfen nur sein: Manifest-Details, APIs (`chrome.*` vs. `browser.*`), Verpackung
  (z. B. Xcode-Wrapper bei Safari).
- Wer eine Funktion in einem Plugin ändert, zieht die anderen Plugins nach – in separaten Commits.
- `chrome/` ist die Referenzimplementierung, solange die Roadmap nichts anderes sagt.

## Git-Workflow
- Entwickelt wird nur in Feature-Branches: `feature/<kurz-beschreibung>` von `dev` abzweigen.
- Feature-Branches werden nach `dev` gemerged. Niemals direkt auf `dev` oder `main` committen.
- `main` ist immer releasable: nur getestete, vollständige Stände aus `dev` nach `main` mergen.
- Änderungen an verschiedenen Plugins werden immer separat committet
  (ein Commit berührt nur einen Plugin-Ordner; Projektdateien ggf. als eigener Commit).
- Commit-Präfix nach Ordner: `chrome:`, `firefox:`, `safari:`, `docs:`, `repo:`.
- Commit-Beschreibungen: kurz, knapp, präzise. Eine Zeile (max. ~60 Zeichen), Imperativ, sagt *was* sich ändert.
  Gut: `firefox: Manifest für MV3 mit Gecko-ID anlegen`. Schlecht: `Updates`, `diverse Fixes`, lange Prosa.
- Agenten committen nur, wenn ausdrücklich darum gebeten.

## Datenschutz (verbindlich bei jeder Implementierung)
- Nur anonymisierte Daten: Es werden keine Daten erhoben oder gespeichert, die eine Person identifizieren
  (kein Name, keine E-Mail, keine Uber-Kontodaten, keine IP-Adressen, keine Geräte-Fingerprints).
- Keine Verknüpfung: Die Nutzer-ID ist eine vom Studienteam vergebene Zufallsnummer. Das Plugin verknüpft sie
  nicht mit Uber-Konten, Browserprofilen oder anderen Kennungen und leitet nichts davon ab.
- Datensparsamkeit: Nur die Felder erheben, die `ROADMAP.md` nennt. Grobe Kategorien statt exakter Werte
  (Altersspanne statt Geburtsdatum). Nichts „auf Vorrat“ speichern.
- Korrektheit: Eingaben werden validiert (ID = positive ganze Zahl, Pflichtfelder, nur die vorgegebenen
  Auswahlwerte). Ungültige Eingaben werden abgewiesen, nicht stillschweigend korrigiert. Was gespeichert
  wird, wird dem Nutzer vor dem Speichern angezeigt und ist nachträglich einsehbar und änderbar.
- Lokal zuerst: Daten bleiben in `storage.local` des Browsers. Keine Übertragung an Server, solange die
  Roadmap das nicht ausdrücklich freigibt; dann nur über HTTPS, nur die freigegebenen Felder, mit Einwilligung.
- Einwilligung: Jede Erhebung beginnt mit einem verständlichen Hinweis (Zweck, Felder, Speicherort,
  Löschmöglichkeit) und einer aktiven Zustimmung. Ohne Zustimmung keine Speicherung.
- Löschen: Der Nutzer kann alle gespeicherten Daten jederzeit im Plugin löschen; Deinstallation löscht sie
  ebenfalls.
- Keine Seiteninhalte: Das Plugin liest keine Inhalte von ubereats.com aus und speichert kein Verhalten
  (Klicks, Bestellungen, Shops), solange die Roadmap das nicht vorsieht.
- Im Zweifel: Lieber ein Feld weniger. Datenschutzfragen vor der Umsetzung in `ROADMAP.md` notieren.

## Technische Leitplanken
- Manifest V3 für Chrome und Safari; Firefox MV3 mit `browser_specific_settings.gecko`.
- Kein Code wird zur Laufzeit von einem Server nachgeladen (Store-Richtlinien). Server liefern nur Daten.
- Nutzer-ID und demografische Angaben werden ausschließlich in `storage.local` gespeichert.
- Keine Uber-Marken (Name, Logo) im Plugin-Namen oder in Screenshots. Hinweis „nicht mit Uber verbunden“.
- Keine Daten von der Uber-Seite auslesen oder versenden, solange die Roadmap das nicht vorsieht.
- Alles, was die Seite verändert, muss Neuzeichnen der React-Oberfläche überleben (MutationObserver).

## Arbeitsweise
- Vor jeder Aufgabe `ROADMAP.md` lesen und den betroffenen Punkt benennen.
- Nach jeder abgeschlossenen Aufgabe den Status in `ROADMAP.md` aktualisieren (eigener `docs:`-Commit).
- Kleine, nachvollziehbare Änderungen; keine Umbauten „nebenbei“.
- Sprache in Code-Kommentaren und Docs: Deutsch. Bezeichner im Code: Englisch.
