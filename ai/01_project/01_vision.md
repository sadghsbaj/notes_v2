# notes_v2 – Vision

## One-liner

notes_v2 ist eine auf mich zugeschnittene, GoodNotes-artige Notizen-App für den Schulunterricht: Dokumente bestehen aus Seiten, PDFs können importiert und direkt darauf per Block-System annotiert werden – und alles ist zu 100% per Tastatur bedienbar (0% Touch/Maus), bei hochwertigem „Apple-clean" Look mit Cockpit-HUD-Elementen.

## Problem / Motivation

- Auf Android-Tablets mit Tastatur sind Text- und Keyboard-Workflows in Notes-Apps oft zweitrangig.
- Ziel ist maximale Effektivität und mehr Spaß im Unterricht durch tastatur-native Workflows.

## Zielgruppe

- Nur ich (Single-User).

## Harte Constraints

- Absolut kein Touch und keine Maus – auch nicht „zur Not". Alle Flows müssen ohne Ausnahmen über Tastatur funktionieren.

## Produktmodell

- Dokumente sind seitenbasiert wie in GoodNotes (kein Infinite Canvas).
- Jede Seite hat feste Breite (aktuell: 800px), Höhe ist flexibel.
- PDFs werden pro Seite sinnvoll skaliert/gerendert; Details (DPR/Zoom) werden spezifiziert.

## Produktversprechen (Experience)

- Keyboard-first und schneller als klassische Touch-Workflows.
- Clean, hochwertig, flüssig (White/Dark Mode), mit HUD/Cockpit-Overlays.
- Effizienz durch Modi/Shortcuts (Vim-inspired mit Normal/Edit/Insert/Command), WASD-Navigation, muscle memory > UI.

## MVP – Kernfähigkeiten (erste nutzbare Version)

- Lokale Speicherung: Dokumente/Seiten zuverlässig speichern und wieder öffnen (offline-only).
- Tastatur-Navigation + Modus-Konzept (Normal/Edit/Insert/Command + CLI für Actions).
- PDF importieren und als Seite anzeigen.
- Block-System: Blöcke auf einer Seite positionieren (inkl. „auf PDF schreiben").
- CLI-basiertes Action-System: Alle komplexen Operationen über Command Mode (`:`).

## Später (Post-MVP / Experimente)

- SmartBlocks als erweiterbare Komponenten (Diagramme/Graphen/etc.).
- KI-Features zur Strukturierung/Umwandlung (z.B. JSON-Repräsentation -> Komponenten rendern).

## Non-Goals (bewusst nicht)

- Touch/Maus-Workflows nachbauen oder 1:1 simulieren.
- iOS-Support.
- Sync/Cloud (bleibt lokal).
- Bundle-Size-Maximaloptimierung als frühes Ziel.

## Erfolgskriterien (4 Wochen)

- Ein komplettes Unterrichtsdokument ist möglich: PDF importieren, annotieren, speichern – komplett ohne Touch/Maus.
- Kernflows sind tastatur-only und fühlen sich „schneller als Standard-Tablet-Apps" an.
- Daten sind stabil/persistent.
- Codebase bleibt modular und entkoppelt (keine Spaghetti-Abhängigkeiten).

## Offene Fragen / Risiken

- Techstack-Entscheid (Solid vs Svelte) + Umgang mit Animationen/Libs je nach Framework.
- Genaues Rendering-/Zoom-/DPR-Modell für PDF + Blocks.
- Ghost-Text System: Position + Rendering-Strategie (minimize UI distraction).
