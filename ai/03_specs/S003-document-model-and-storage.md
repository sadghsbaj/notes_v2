# S003 – Document Model & Storage (Folder-based, atomic writes)

**Status:** draft  
**Owner:** Colin  
**Last updated:** 2025-12-31  
**Related:**

- Vision: `../01_project/01_vision.md`
- Spec: `S001-input-and-modes.md`
- Spec: `S002-command-system-and-smart-cli.md`
- Spec: S004 PDF Pipeline (planned)
- Spec: S005 Page Layout & Coordinate System (planned)

---

## Kontext

notes_v2 ist offline-only und muss Dokumente zuverlässig lokal speichern.
Weil “alles oder nichts” gilt, darf Storage nie Spaghetti sein: Speichern/Laden muss zentral, atomar und migrationsfähig sein.

Dokumente bestehen aus:

- Pages (GoodNotes-style, seitenbasiert)
- Assets (PDFs, Images, evtl. Render-Caches)
- Blocks (SmartBlocks, später Richtext etc.)
- UI-State pro Dokument (zuletzt offen, scroll/zoom, etc.)

## Ziele (Goals)

- G1: Robustes Dateiformat: Dokument darf bei Crash nicht “kaputt gespeichert” werden.
- G2: Offline-first: alles lokal, ohne Netzwerk.
- G3: Erweiterbar: neue Blocktypen / neue Anchors (page vs viewport) ohne Rewrite.
- G4: Migrationen: schemaVersion im Dokument + saubere Migration-Pipeline.
- G5: Performance: Speichern ist schnell genug für Autosave (debounced).
- G6: Klare Trennung: Content vs Assets vs UI-State vs App-global Settings.

## Nicht-Ziele (Non-goals)

- NG1: Cloud Sync.
- NG2: Multi-user / collaborative editing.
- NG3: Content-addressed hashing als Pflicht (kann später kommen).
- NG4: PDF-Rendercache-Details (kommt in S005).
- NG5: content.json sharding (YAGNI).

## Harte Constraints (Must)

- C1: Storage ist folder-based (Ordner pro Dokument).
- C2: Atomische Writes für JSON-Dateien: write-to-temp + rename/replace im selben Directory.
- C3: UI-State pro Dokument gehört ins Dokument (ui.json), nicht in localStorage.
- C4: App-global Settings (Theme etc.) dürfen in localStorage.
- C5: Jeder Record hat stabile IDs (docId/pageId/blockId/assetId).
- C6: Dokumente sind schema-versioned (integer) und migrationsfähig.

## Ordnerlayout (Decision)

Dokument liegt als Ordner vor:

<doc-root>/

- meta.json (klein, Entry)
- content.json (das “Document Model”)
- ui.json (doc-spezifischer UI Zustand)
- assets/
- cache/ (optional, darf gelöscht werden)

## Dateiinhalte (Draft)

### meta.json (Entry)

- docId: string
- schemaVersion: int
- title: string
- createdAt: string (iso)
- updatedAt: string (iso) <-- nur bei content changes
- appVersion?: string (optional)

### content.json (Document Model)

- docId: string
- schemaVersion: int (optional redundant; meta ist source of truth)
- doc:
  - pageOrder: PageId[]
  - roots (future)
- entities:
  - pages: Record<PageId, Page>
  - blocks: Record<BlockId, Block>
  - assets: Record<AssetId, AssetRef>
  - overlays: Record<OverlayId, Overlay> (future)

### ui.json (doc UI state)

Persistiert nur “viewer state”, nicht selection/history:

- lastOpenedAt: string (iso)
- lastPageId: PageId
- scrollY: number
- zoom: number
- (optional) viewportMode, panels open/closed

### assets/

- Original-PDFs/Images (immutable)
- naming: <assetId>.<ext>

### cache/ (optional)

- derived artifacts (thumbnails, render tiles, etc.)
- deletable jederzeit

## LocalStorage vs ui.json (Decision)

- localStorage: nur globale App Settings (theme etc.)
- ui.json: doc-spezifischer UI Zustand (last open location etc.)

## Document Model (Decision: entity store)

Design: “flat map” Entities + klare Roots, für O(1) Zugriff und Migrationen.

### Page (minimal)

- id: PageId
- widthPx: number
- heightPx: number
- rotation: 0 | 90 | 180 | 270 (aus S005)
- background:
  - kind: "none" | "pdf" | "image" | "ai-interactive"
  - pdfAssetId?: AssetId (für "pdf")
  - pdfPageNumber?: number (für "pdf")
  - pageImageId?: string (für "image", aus S004)
  - transform?: object (details in S004/S005)
  - aiData?: object (für "ai-interactive", aus S010):
    - sourcePageId: PageId (Link zu WebP-Page)
    - structureJson: object (Gemini-Output)
    - userState: object (User-Eingaben)
    - solutionsJson?: object (Optional: KI-Lösungen)
    - generatedAt: timestamp
  - aiPageId?: PageId (für "image", optional Link zu AI-Version)

### Block (minimal)

- id: BlockId
- kind: string (extensible)
- anchor:
  - kind: "page" | "viewport"
  - pageId?: PageId
- rect: { x, y, w, h }
- data: unknown (kind-specific, validated by kind schema)

### AssetRef

- id: AssetId
- type: "pdf" | "image" | string
- filename: string
- mimeType?: string
- meta?: object (pdf page count, etc. optional)

## Schema Versioning & Migration (Decision)

- schemaVersion ist integer und wird im Dokument gespeichert (meta.json).
- Load pipeline:
  1. Read meta.json
  2. Wenn meta.schemaVersion < current: migrate (in memory)
  3. Validate result
  4. Writeback (atomic): content.json + meta.json (schemaVersion bumped)
- Migrationen sind Code (v1->v2, v2->v3), nicht schema-diff-magie. [web:416][web:417]

## Save Architektur (Anti-Spaghetti)

### Komponenten (Decision)

- DocumentRepository
  - load(docId) -> DocumentSnapshot
  - save(docId, snapshot, reason) -> ok/error
  - listDocs()
- SaveCoordinator
  - trackDirty(docId, {meta, content, ui})
  - requestAutosave(docId, reason)
  - flush(docId)
- AtomicWriter
  - writeJsonAtomic(path, data)

### AtomicWriter (Decision + Testpoint)

Strategie:

- temp file im selben directory erstellen
- JSON schreiben
- optional validate (type guard)
- rename/replace auf Zielnamen

Begründung: write-to-temp und dann rename/replace ist gängige Praxis, um Korruption zu vermeiden, solange temp und target auf demselben Filesystem liegen. [web:452][web:433]

Implementation Note:

- Auf Android/Capacitor muss `rename`/`replace` Verhalten getestet werden. (Capacitor Filesystem hat rename API.) [web:473][web:477]

### Wann wird gespeichert? (Decision)

- Autosave: debounced (z.B. 2–3s idle) bei content changes.
- ui.json: darf öfter gespeichert werden (auch debounced), ohne meta.updatedAt zu ändern.
- Flush:
  - beim Dokumentwechsel
  - beim App background/close (best effort)
  - optional per manual save

### Dirty Tracking (Decision)

- content dirty -> content.json + meta.json (updatedAt bump)
- ui dirty -> ui.json only
- meta dirty (title change) -> meta.json (+ evtl content? nein)

## Validierung (Decision)

- Vor final replace:
  - serialize -> validate
  - bei fail: kein replace, “save failed” sichtbar machen, dirty bleibt true

## PDFs (Storage Sicht)

- PDF ist Asset unter assets/<assetId>.pdf
- content.json referenziert AssetId + mapping auf pages
- caches gehören in cache/

## Entscheidungen (Decisions)

- D1: Folder-based documents.
- D2: Split files: meta.json (entry), content.json (model), ui.json (doc UI), assets/, cache/.
- D3: UI-State pro Dokument in ui.json; global Settings in localStorage.
- D4: Atomische Writes via temp + rename/replace (same dir).
- D5: Entity store (flat maps) + roots für Pages/Blocks/Assets.
- D6: Blocks: anchor kind page vs viewport (future-proof).
- D7: schemaVersion integer; migrate-on-read + writeback.
- D8: updatedAt nur bei content changes (nicht ui-only).

## Alternativen (Alternatives considered)

- A1: Single doc.json
  - Contra: jede kleine UI-Änderung schreibt große Datei; Fehlerimpact größer.
- A2: DB store
  - Contra: export/import schwerer; mehr infra.

## Konsequenzen / Trade-offs

- Split files braucht SaveCoordinator, aber reduziert write-amplification.
- Entity store ist migrationsfreundlich.
- cache/ deletable vereinfacht Updates, braucht rebuild logic.

## Test-Strategie

- Unit:
  - migrations vN->vN+1
  - atomic writer: temp cleanup, replace logic
  - range/1-based mapping utils (shared with CLI commands)
- Integration:
  - autosave debounce + flush on doc switch
  - doc folder delete/rename outside app -> graceful handling
  - capacitor rename/replace behavior tests
- Manual:
  - PDFs bis 50 Seiten: open/save zuverlässig
  - power loss simulation (so weit möglich)

## Offene Fragen

- Q1: Atomic replace in Capacitor:
  - ist replace “wirklich” atomic auf allen Targets?
  - brauchen wir optional “journal file”/manifest um multi-file commits zu sichern?
- Q2: ui.json write frequency:
  - wie aggressiv speichern (z.B. alle 1s, alle 3s, nur on idle)?
- Q3: Validation tooling:
  - nur TS type guards oder zusätzlich JSON schema?
