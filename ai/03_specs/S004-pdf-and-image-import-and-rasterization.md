# S005 – PDF- und Bild-Import + Rasterisierung (WebP-first, Android/Capacitor)

**Status:** draft  
**Owner:** Colin  
**Last updated:** 2025-12-31  
**Related:**

- Vision: `../01_project/01_vision.md`
- Spec: `S003-document-model-and-storage.md`
- Spec: `S004-page-layout-and-coordinate-system.md` (planned)
- Spec: `S002-command-system-and-smart-cli.md`

---

## Kontext

notes_v2 soll große PDFs/Scans flüssig anzeigen und annotierbar machen, ohne während des Nutzens Live-PDF-Rendering zu benötigen.
Daher basiert die Anzeige auf vorgerenderten WebP-Seitenbildern (WebP-first).

Später wird Google ML Kit Document Scanner integriert; dieser kann JPEG-Seiten und/oder ein PDF zurückgeben.
Die App verarbeitet beide Eingänge einheitlich.

Wichtig: Große Binärdaten werden nicht als base64 Strings über die JS-Bridge transportiert, sondern als Datei-URIs/Paths verarbeitet.

---

## Ziele

- G1: Stabile Performance beim Lesen/Annotieren: Viewer lädt nur Images (virtualisiert).
- G2: Große Dateien: keine base64 Payloads über JS-Bridge für PDF/JPEG/PNG.
- G3: Einheitliche Pipeline: PDF/JPEG/PNG -> WebP (resize + quality) mit klaren Defaults.
- G4: Android-First: Rasterisierung über Kotlin Plugin, URI/Path-basiert.
- G5: Persistente Ablage im Dokumentordner: Seiten-WebPs sind Dokumentdaten (kein Cache).
- G6: Page-Overview ist schnell: separate Thumbnails (persistente Dateien).

## Nicht-Ziele

- NG1: Textsuche/OCR.
- NG2: Deep-Zoom / Tiling-System.
- NG3: Browser-only Rasterizer.

---

## Harte Constraints (Must)

- C1: Max Zoom = fit-width (kein Zoom über fit-width hinaus).
- C2: Anzeige basiert pro Seite auf WebP (WebP-first).
- C3: WebP-Seitenbilder und Thumbnails sind Teil des Dokuments und dürfen nicht als Cache gelöscht werden.
- C4: Kotlin Plugin arbeitet mit Datei-URIs/Paths; JS bekommt nur Metadaten zurück, keine Binärdaten.
- C5: Import unterstützt PDF und Bilder (JPG/PNG), inkl. Scan-Outputs.
- C6: Source-Dateien (PDF/JPEG/PNG) bleiben erhalten (kein Delete-Flow).
- C7: Leerseiten sind kein Bild: sie werden als normaler Seiten-Container mit weißem Hintergrund gerendert.

---

## Speicherlayout (Decision)

Im Dokumentordner:

assets/

- sources/
  - <sourceAssetId>.pdf
  - <sourceAssetId>.jpg / .png / ...
- page-images/
  - <pageImageId>.webp
- thumbs/
  - <pageImageId>.webp (Thumbnail-Variante zum jeweiligen pageImageId)

cache/

- nur für wirklich löschbare Ableitungen (nicht für page-images und thumbs)

Begründung:

- `assets/page-images/*` ist die finale Anzeige-Repräsentation pro Seite und muss persistent bleiben.
- Dateinamen sind IDs, nicht laufende Nummern, damit mehrere Imports/Reordering robust bleiben.

---

## Begriffe

- **sourceAssetId**: ID der importierten Quelle (PDF/JPEG/PNG).
- **pageImageId**: ID eines gerasterten Seitenbilds (WebP), unabhängig von Position im Dokument.
- **pageId**: Seite im Dokument (Entity).
- **blank page**: Seite ohne Hintergrundbild, wird als weißer Container gerendert.

---

## Unterstützte Eingänge (Importquellen)

### PDF-Import

- Input: lokale Datei/URI
- App kopiert nach `assets/sources/<sourceAssetId>.pdf`
- Output: WebPs nach `assets/page-images/<pageImageId>.webp` (pro PDF-Seite ein pageImageId)

### Bild-Import (PNG/JPEG)

- Input: lokale Datei/URI
- Output: WebP nach `assets/page-images/<pageImageId>.webp`

### ML Kit Document Scanner (Integration)

- Scanner kann JPEG-Seiten liefern und/oder ein PDF.
- Wenn JPEG-Seiten vorhanden sind, werden diese bevorzugt konvertiert (direkter Weg).
- Wenn nur PDF vorhanden ist, wird das PDF gerastert.

---

## Rasterisierungs-Defaults (Decision)

### Page WebP

- Zielbreite: 1600px
- Qualität: konfigurierbar (Default 0.85)
- Seitenverhältnis bleibt erhalten

### Thumbnail WebP

- Zielbreite: z.B. 320px (oder 400px)
- Qualität: z.B. 0.75
- Thumbnail wird als Datei persistiert (nicht on-the-fly)

---

## Adapter-Pattern (Decision)

Es gibt eine gemeinsame TypeScript Schnittstelle, aber nur eine produktive Implementierung:

### AndroidRasterizer (Kotlin Plugin)

- Input: file URIs/Paths + outputDir + Optionen
- Output: schreibt WebP-Dateien direkt in den Dokumentordner
- Return: JSON-Metadaten (URIs/IDs/Größen), keine Binärdaten

---

## Kotlin Plugin API (Draft)

### rasterizePdfToWebp()

Zweck: PDF -> WebPs (eine WebP pro Seite)

Input:

- inputPdfUri: string
- outputPageImagesDirUri: string (zeigt auf `<docRoot>/assets/page-images/`)
- outputThumbsDirUri?: string (zeigt auf `<docRoot>/assets/thumbs/`, optional)
- widthPx: int (default 1600)
- quality: float (default 0.85)
- thumbWidthPx?: int (default 320)
- thumbQuality?: float (default 0.75)

Output:

- pageCount: int
- pages: [
  {
  pageIndex: int,
  pageImageId: string,
  pageWebpUri: string,
  thumbWebpUri?: string,
  width: int,
  height: int
  }
  ]

### convertImagesToWebp()

Zweck: JPEG/PNG -> WebP (z.B. Scanner JPEG pages)

Input:

- inputImageUris: string[]
- outputPageImagesDirUri: string
- outputThumbsDirUri?: string
- widthPx: int (default 1600)
- quality: float (default 0.85)
- thumbWidthPx?: int (default 320)
- thumbQuality?: float (default 0.75)

Output:

- pages: [
  {
  index: int,
  pageImageId: string,
  pageWebpUri: string,
  thumbWebpUri?: string,
  width: int,
  height: int
  }
  ]

---

## Konsistenz / Ordner-Write (Recommended)

Damit der Viewer nie halbfertige Daten sieht:

- Plugin schreibt zunächst in `assets/.tmp/<jobId>/...`
- Nach erfolgreichem Finish werden WebPs nach `assets/page-images/` und `assets/thumbs/` verschoben
- Bei Crash: `.tmp` wird beim nächsten Start bereinigt

---

## Document Model Integration (Decision)

Die Zuordnung “Quelle -> gerasterte Seitenbilder” wird im Document Model (content.json) gespeichert (Single source of truth),
z.B. in `entities.assets[sourceAssetId].meta.raster`.

Beispiel (Shape):

- entities.assets[sourceAssetId].meta.raster = {
  pageWidthPx: 1600,
  quality: 0.85,
  pages: [
  { pageIndex: 1, pageImageId, pageWebpUri, thumbWebpUri, w, h },
  ...
  ]
  }

Kein `pages.json` als Neben-Datei: Reordering/Einfügen/Leerseiten ist App-Logik und bleibt vollständig in TypeScript.

---

## Seitenmodell / Rendering-Annahme (Kurz, bindet an S004)

- Jede Seite ist ein Container (z.B. `<div>`).
- Seite hat immer eine feste Breite (z.B. 800px; genaue Zahl kommt aus S004).
- Höhe:
  - blank page: Standardhöhe (z.B. ca. A4 Verhältnis, kommt aus S004).
  - page background image: Höhe wird aus dem Bild-Seitenverhältnis berechnet (width ist fix, height skaliert passend).

Background:

- blank page: `background.kind = "blank"` -> CSS Hintergrundfarbe (weiß).
- image page: `background.kind = "image"` + `pageImageId` -> `<img>` oder CSS background-image im Seitencontainer.

---

## Seiten-Einfügen / Mehrfach-Import (Wichtig)

- Ein PDF-Import erzeugt pageImageIds und daraus neue Pages (pageIds) im Dokument.
- Einfügeposition (pos) wird ausschließlich in TypeScript entschieden (Commands/Editor-Logik), nicht im Plugin.
- Beispiel (später über CLI): `page-import fs <pos>` oder `page-import scanner <pos>`.

---

## Viewer-Lademodell (Decision)

- Viewer zeigt pro Page den Hintergrund via `pageImageId` (falls vorhanden).
- Virtualisierung: im DOM nur aktuelle Seite und +/- N (Default N=2).
- RAM-Cache: begrenzt; decodierte Images werden freigegeben.

---

## Fehlerbehandlung & Recovery

- Rasterisierung fehlschlägt:
  - Source bleibt erhalten
  - Dokument bleibt valide; UI zeigt Placeholder + “Rasterisierung fehlgeschlagen”
  - Retry möglich
- Teil-Ergebnis:
  - bereits erzeugte WebPs bleiben
  - Modell markiert “partial” (z.B. missing pages), damit gezielt nachgerastert werden kann

---

## Entscheidungen (Decisions)

- D1: WebP-first Anzeige (keine Live-PDF-Renderings im Viewer).
- D2: Max Zoom = fit-width.
- D3: WebPs sind persistente Dokumentdaten unter `assets/page-images/`.
- D4: Thumbnails werden als persistente Dateien unter `assets/thumbs/` gespeichert.
- D5: Dateinamen = IDs (pageImageId.webp), nicht laufende Nummern.
- D6: Rasterisierung erfolgt über Android/Kotlin Plugin, URI/Path-basiert (kein base64 Payload).
- D7: Mapping wird im content.json gespeichert, nicht als `pages.json` Neben-Datei.
- D8: Leerseiten sind CSS (weiß), kein Bild.

---

## Testplan (Draft)

- Import PDF A (5 Seiten), dann PDF B (3 Seiten) vorne einfügen -> Reihenfolge korrekt
- Scanner: JPEG-only, PDF-only, JPEG+PDF -> gleiches Ergebnis im Document Model
- Thumbnails: Overview lädt ohne Verzögerung (nur thumbs, keine full page-images)
- Crash während Rasterisierung -> Dokument bleibt ladbar, tmp cleanup + Retry
- 100 Seiten scrollen -> Virtualisierung stabil
