# notes_v2 – Aktive TODOs

> M3: Core System (CLI & Data)

---

## ✅ Phase 0 – Document Model Schemas

- [x] **Zod Schemas definieren** ✅
  - `src/core/storage/schemas/` mit strikter Typisierung
  - Page, Block, Asset, Document, Meta, UiState
- [x] **Entity Store Architektur** ✅
  - Flat maps für O(1) lookup
  - Extensibility: BlockShape, BlockConnection vorbereitet

---

## ✅ Phase 1 – CLI Engine (S002)

CLI ist das primäre Interface – fertig implementiert.

### 1.1 Action Registry

- [x] **Action Interface definieren**
  - `id`, `aliases`, `params[]`, `handler`
  - Parameter: `name`, `type`, `default`, `optional`
- [x] **Action Registry Service**
  - `registerAction(action)`
  - `getAction(id | alias)`
  - `getAllActions()` für Autocomplete

### 1.2 CLI Parser Engine

- [x] **Slot Parser**
  - Space-separated slots
  - Quoted strings handling (`"Mathe Notizen"`)
  - Slot 0 = Command, Slot 1..n = Arguments
- [x] **Fuzzy Search**
  - Exact match > Prefix match > Fuzzy match
  - Scoring für Autocomplete-Reihenfolge

### 1.3 CLI UI & Ghost Text

- [x] **CLI Overlay Component**
  - Command Mode toggle (`Ctrl + .`)
  - Single-line input mit Animation
- [x] **Ghost Text Engine**
  - Completion vs Replacement
  - Parameter hints
- [x] **History** (Arrow up/down, localStorage)

### 1.4 Basic Commands

- [x] `help` – Liste aller Commands
- [x] Inline-Math mit `=` Suffix

### 1.5 Tests

- [x] Unit Tests (62 tests passing)
  - slot-parser, range-parser, fuzzy, math-eval, executor

### 1.6 CLI Polish & Extensions

- [x] **History Draft** – Unabgeschickten Input bei History-Navigation speichern
- [x] **Error UX** – Bei Fehler Param-Pillen ausblenden, nur Error zeigen
- [x] **Param Schema** – Erweitertes Schema: `help`, `enum`-type, `validate`, `complete`
- [x] **Type Validators** – Zentrale Validatoren für range, path, enum etc.
- [x] **Help Tooltip** – `?` als Param zeigt floating Hilfe (z.B. `fs|scan`)
- [x] **Param Completion** – Tab-Completion für Parameter (enum options, paths)
- [ ] **AI Command** – `ai "prompt" [fast|think]` mit Gemini-Integration

### 1.7 CLI Refactoring & Code Quality

**Kritische Bugs:**
- [x] **Range Validator Bug** – Negative Zahlen erlauben (`-?\d+` statt `\d+`) ✅
  - Problem: `-1` für "last page" wird aktuell rejected

**Refactoring:**
- [x] **derived.ts modularisieren** – Completion helpers auslagern ✅
  - Datei ist 274 Zeilen, zu viele Concerns gemischt
  - Neue Datei: `core/cli/completion/param-matcher.ts`
  - Funktionen: `findParamMatch`, `isSimilar`, `getParamOptions`
- [x] **GhostText Type Safety** – Discriminated Union verwenden ✅
  - Refactored: Jeder Mode hat nur seine relevanten Felder
  - TypeScript erzwingt jetzt Mode-Check vor Zugriff auf mode-spezifische Felder
- [x] **Number Parsing Deduplizierung** – Normalisierung nicht doppelt machen ✅
  - `ValidationResult` hat jetzt `normalized` Feld
  - `validateNumber` gibt parsed number zurück, Executor nutzt es direkt
- [ ] **fuzzysort für Param Matching** – isSimilar() durch fuzzysort ersetzen
  - Konsistente Fuzzy-Logik wie bei Commands
  - Bessere Typo-Toleranz
- [ ] **Param Types vereinfachen** – ParamDefinition vs ParamRuntime klären
  - Drei ähnliche Types: Param, ParamDefinition, ParamRuntime
  - Verwirrend, warum ParamDefinition UND ParamRuntime?
- [ ] **Help Tooltip Positioning** – Dynamische Charakterbreite statt 4px magic number
  - Bei verschiedenen DPI/Fonts könnte 4px falsch sein
  - `charWidth = measureRef.offsetWidth / textLength`

---

## Phase 2 – Filesystem (S011)

Baut auf CLI auf. Ermöglicht Navigation + CRUD.

### 2.1 FileSystem Service

- [ ] **Capacitor Filesystem Wrapper**
  - `readFile`, `writeFile`, `readDir`, `mkdir`, `deleteFile`, `rename`
  - Error handling + Logging
- [ ] **Web Fallback** (für Dev ohne Android)
  - localStorage oder IndexedDB Mock

### 2.2 Path Handling

- [ ] **Path Resolution Service**
  - Relative → Absolute paths
  - Bundle detection (`.note` Ordner = atomare Datei)
- [ ] **Alias System (hardcoded)**
  - `@mathe`, `@deutsch` → absolute paths
  - Smart Date: `@mathe .` → auto-create heute

### 2.3 Navigation Commands

- [ ] `cd [path]` – Directory wechseln
- [ ] `open [file]` – Dokument öffnen (→ trigger DocumentRepository.load)
- [ ] `close` – Dokument schließen

### 2.4 CRUD Commands

- [ ] `mkdir [name]` – Ordner erstellen
- [ ] `touch [name]` – Leeres Dokument-Bundle erstellen
- [ ] `mv [src] [dest]` – Verschieben/Umbenennen
- [ ] `cp [src] [dest]` – Kopieren
- [ ] `rm [path]` – Löschen (mit Bestätigung)

### 2.5 LS Sidebar UI

- [ ] **Floating Sidebar Layout**
  - Header: aktueller Pfad
  - Liste: Ordner (farbig) + Dateien
- [ ] **Live Updates** bei CWD changes

---

## Phase 3 – Document Loading

Wird von `open` Command getriggert.

### 3.1 AtomicWriter

- [ ] write-to-temp → rename pattern
- [ ] Error handling (temp cleanup)

### 3.2 DocumentRepository

- [ ] `load(docId)` → Liest meta.json + content.json + ui.json
- [ ] `listDocs()` → Alle Dokument-Ordner scannen
- [ ] `save(docId, snapshot)` → Atomic writes

### 3.3 Migration Pipeline

- [ ] schemaVersion check
- [ ] migrate-on-read → validate → writeback

---

## Phase 4 – Content & Save (später)

- [ ] Page Rendering
- [ ] Block System (Edit Mode)
- [ ] SaveCoordinator (Dirty tracking, Autosave)

---

## 🧠 Wartbarkeits-Prinzipien

1. **Single Responsibility**: Jede Datei = ein Zweck
2. **Dependency Injection**: Services über Context/DI
3. **Zod Everywhere**: Alle Datenstrukturen validiert
4. **Feature Folders**: `core/cli/`, `core/storage/`, `features/filesystem/`

---

## ✅ Erledigt: M2 – Capacitor Setup

<details>
<summary>Abgeschlossen</summary>

- [x] Capacitor installiert + Android Platform
- [x] Build-Scripts in `package.json`
- [x] Debug APK erfolgreich gebaut

</details>
