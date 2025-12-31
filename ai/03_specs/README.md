# notes_v2 – Specs Index

Ziel: Technische Specs pro Systembereich.
Regel: Eine Spec = ein Thema (klarer Scope), lieber mehrere Specs statt eine riesige.

## Status

- draft: in Arbeit
- accepted: Design steht (bereit für Implementierung)
- implemented: umgesetzt
- superseded: ersetzt

## Specs

### Core / Foundations

- **S001 Input & Modes** (draft)
  - Ziel: Vim-inspired Multi-Mode System (normal/edit/insert + Sub-Modi), Esc-Rules, Input-Pipeline, Mode Indicator.
  
- **S002 Action System & Parameters** (draft)
  - Ziel: Action-Registry, Parameter-Eingabe via Ghost-Text, Inline Math (Calc Mode), Undo/Redo.

- **S003 Document Model & Storage** (draft)
  - Ziel: Doc→Pages→Blocks Schema, IDs, Versionierung, lokal-only Persistenz, Assets (PDF), atomic writes.

- **S004 PDF Import & Rasterization** (draft)
  - Ziel: PDF → WebP-first, Kotlin Plugin (Android), URI-based, persistente Page-Images.

- **S005 Page Layout & Coordinate System** (draft)
  - Ziel: Page-Space (800px fix), Transform-Logic, Zoom (Detail/Normal/Fit), Rotation (90° steps), Hit-Testing.

### Editing / Content

- **S006 Blocks System** (draft)
  - Ziel: Block-Container (Tiptap), Edit Mode, Grid-System, Move/Resize (3-level Steps), Selection (Spatial Tab, Overlay Mode), Jump/Swap/Format Transfer, Styling, Smart Snapping.

- **S007 Rich Text** (draft)
  - Ziel: Tiptap Integration, Keyboard-first Editing, Custom Nodes (Mathe/Diagramme), Performance (lazy rendering).

### Navigation / UX

- **S008 Navigation & Zoom** (draft)
  - Ziel: WASD-Navigation (nur Y-Scroll), 3 Zoom-Levels + Fine-Zoom, Zoom-Overlay.

- **S009 Overlays & HUD** (draft)
  - Ziel: Overlay-First UI (Mode Indicator, Jump, Zoom, Ghost-Text, Styling, Notifications), HUD/Cockpit-Style.

### Erweiterungen (später)

- **S010 AI-Interactive Pages** (draft)
  - Ziel: WebP → Gemini 3.0 Pro → JSON → Interactive Components, Toggle WebP ↔ AI, CodeMirror JSON-Editor, Solutions-Check.

- S011 Theming & Motion (future)
  - Ziel: Design Tokens, Dark/Light, Motion Guidelines.
