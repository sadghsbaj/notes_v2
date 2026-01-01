# notes_v2 – Aktive TODOs

> M3: Core System (CLI & Data)

---

## Phase 1 – Document Model & Storage (S003)

Das Fundament – ohne stabiles Datenmodell können CLI/Filesystem nichts persistieren.

### 1.1 Document Model Core

- [x] **Zod Schemas definieren** (Document, Page, Block, AssetRef) ✅
  - `src/core/storage/schemas/` mit strikter Typisierung
  - Page: id, widthPx, heightPx, rotation, background (union types)
  - Block: id, anchor, rect, shape, styling, data
  - AssetRef: id, type, filename, mimeType, meta
- [x] **Entity Store Architektur** ✅
  - Flat maps für O(1) lookup: `pages`, `blocks`, `assets`, `connections`
  - `doc.pageOrder` als Array für Reihenfolge
  - Extensibility: BlockShape, BlockConnection für Formen/Pfeile vorbereitet

### 1.2 Persistence Layer

- [ ] **AtomicWriter implementieren**
  - write-to-temp → rename/replace pattern
  - Capacitor Filesystem API wrappen
  - Error handling (temp cleanup bei Fehler)
- [ ] **DocumentRepository**
  - `load(docId)` → Liest meta.json + content.json + ui.json
  - `save(docId, snapshot)` → Atomic writes für alle geänderten files
  - `listDocs()` → Alle Dokument-Ordner scannen
- [ ] **SaveCoordinator**
  - Dirty tracking (content, ui, meta getrennt)
  - Debounced autosave (2-3s idle)
  - Flush on doc switch / app background

### 1.3 Migrations & Schema Versioning

- [ ] **Migration Pipeline Setup**
  - schemaVersion in meta.json
  - migrate-on-read → validate → writeback
  - Migration Registry: `migrations/v1-to-v2.ts` etc.

---

## Phase 2 – Action System & CLI (S002)

CLI braucht Document Model für Actions. Baut darauf auf.

### 2.1 Action Registry

- [ ] **Action Interface definieren**
  - `id`, `aliases`, `params[]`, `handler`
  - Parameter: `name`, `type`, `default`, `optional`
- [ ] **Action Registry Service**
  - `registerAction(action)`
  - `getAction(id | alias)`
  - `getAllActions()` für Autocomplete

### 2.2 CLI Parser Engine

- [ ] **Slot Parser**
  - Space-separated slots
  - Quoted strings handling (`"Mathe Notizen"`)
  - Slot 0 = Command, Slot 1..n = Arguments
- [ ] **Fuzzy Search**
  - Exact match > Prefix match > Fuzzy match
  - Scoring für Autocomplete-Reihenfolge

### 2.3 CLI UI & Ghost Text

- [ ] **CLI Overlay Component**
  - Command Mode toggle (`Ctrl + .`)
  - Single-line input
  - Animation (slide/fade in)
- [ ] **Ghost Text Engine**
  - Completion: zeigt Rest (`page-a` → Ghost: `dd`)
  - Replacement: zeigt vollen Term (`padd` → Ghost: `page-add`)
  - Parameter hints (`page-add ` → Ghost: `**count** pos height`)
- [ ] **History**
  - Arrow up/down Navigation
  - Session-persistent (localStorage)

### 2.4 Inline Math

- [ ] **Math.js Integration**
  - Trigger: `=` am Ende
  - Display: `3*17= 51`
  - Enter → Clipboard + clear

### 2.5 Basic Commands

- [ ] `help` – Liste aller Commands
- [ ] `math [expr]` – Berechnung (alternative zu inline)
- [ ] `page-add [count] [pos] [height]` – Seiten hinzufügen

---

## Phase 3 – Filesystem UI & CLI (S011)

Baut auf CLI-Infrastruktur auf, nutzt Document Model für Bundles.

### 3.1 LS Sidebar Component

- [ ] **Floating Sidebar Layout**
  - Position: links, floating
  - Header: aktueller Pfad
  - Liste: Ordner (farbig) + Dateien
  - `.note` Bundles als einzelne Dateien anzeigen
- [ ] **Live Updates**
  - Reactive zu CWD changes
  - Animation bei Ordnerwechsel

### 3.2 Path Handling

- [ ] **Path Resolution Service**
  - Relative → Absolute paths
  - Bundle detection (`.note` Ordner = atomare Datei)
- [ ] **Alias System (hardcoded)**
  - `@mathe`, `@deutsch`, etc. → absolute paths
  - Smart Date: `@mathe .` → auto-create heute's Ordner

### 3.3 Navigation Commands

- [ ] `cd [path]` – Directory wechseln
- [ ] `open [file]` – Dokument öffnen
- [ ] `close` – Dokument schließen

### 3.4 CRUD Commands

- [ ] `mkdir [name]` – Ordner erstellen
- [ ] `touch [name]` – Leeres Dokument-Bundle erstellen
- [ ] `mv [src] [dest]` – Verschieben/Umbenennen
- [ ] `cp [src] [dest]` – Kopieren
- [ ] `rm [path]` – Löschen (mit Bestätigung immer)

### 3.5 Safety System

- [ ] **Confirmation Dialogs**
  - Inline in CLI: `Delete 'foo'? [y/N]`
  - Overwrite warnings
- [ ] **Protected Directories (hardcoded)**
  - Block/erschwerte Bestätigung für Archive etc.

---

## 🧠 Wartbarkeits-Prinzipien (für alle Phasen)

1. **Single Responsibility**: Jede Datei = ein Zweck
2. **Dependency Injection**: Services über Context/DI, nicht globale Importe
3. **Zod Everywhere**: Alle Datenstrukturen validiert
4. **Feature Folders**: `core/storage/`, `core/cli/`, `features/filesystem/`
5. **Tests First für kritische Logik**: AtomicWriter, Migrations, Parser

---

## ✅ Erledigt: M2 – Capacitor Setup

<details>
<summary>Abgeschlossen</summary>

- [x] `@capacitor/core`, `@capacitor/cli`, `@capacitor/android` installiert
- [x] `capacitor.config.ts` erstellt (webDir: dist, appId: dev.notes.v2)
- [x] Android Platform hinzugefügt (`android/` Ordner)
- [x] Build-Scripts in `package.json`
- [x] Debug APK erfolgreich gebaut

</details>
