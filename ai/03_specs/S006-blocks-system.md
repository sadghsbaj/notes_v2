# S006 – Blocks System

**Status:** draft  
**Owner:** Colin  
**Last updated:** 2025-12-31  
**Related:**

- Vision: `../01_project/01_vision.md`
- Spec: `S001-input-and-modes.md`
- Spec: `S003-document-model-and-storage.md`
- Spec: `S005-page-layout-and-coordinate-system.md`
- Spec: S007 Rich Text (planned)

---

## Kontext

notes_v2 basiert auf frei positionierbaren Blocks auf Pages (GoodNotes-style Annotations).

Ein Block ist ein Container mit Position/Größe, der Content (via Tiptap) enthält. Blocks werden ausschließlich per Tastatur manipuliert: erstellen, verschieben, resizen, stylen, löschen.

Diese Spec definiert:
- Edit Mode (separate von normal/insert)
- Grid-System für Navigation + Snapping
- Block-Manipulation (Move/Resize/Create/Delete)
- Selection (Grid-Nav, Tab, Jump Overlay, Multi-Select)
- Styling & Alignment (Hotkey-basiert, nicht CLI)

## Ziele (Goals)

- G1: Schnelle, flüssige Block-Manipulation ohne Maus (muscle memory).
- G2: Grid-System macht Positionierung vorhersagbar und snap-freundlich.
- G3: Jump Overlay erlaubt direkten Block-Zugriff (Power-User).
- G4: Multi-Selection ermöglicht Batch-Operationen.
- G5: Smart Snapping (PowerPoint-style) ohne nerviges Force-Snapping.
- G6: Styling ist optional (Blocks default transparent), aber einfach änderbar.
- G7: Nur aktiver Block hat Tiptap-Instanz (Performance).

## Nicht-Ziele (Non-goals)

- NG1: Tiptap Internals / Custom Nodes (kommt in S007).
- NG2: Mouse/Touch-based Manipulation.
- NG3: Formen (Circles/Polygons) statt Rechtecke (eigene Spec später).
- NG4: Pfeile zwischen Blocks (eigene Spec später).
- NG5: Auto-Layout / Flowing Content.
- NG6: CLI Commands für Block-Manipulation (nur Hotkeys im edit mode).
- NG7: Mouse/Touch für Hit-Test oder Rectangle-Selection.
- NG8: Konkrete Hotkey-Definitionen (kommt in separate Keymap-Spec).

## Harte Constraints (Must)

- C1: 100% keyboard-only.
- C2: Edit Mode ist separate Mode (neben normal/insert/command).
- C3: Nur aktiver Block rendert Tiptap-Instanz; Rest = static HTML.
- C4: Resize/Move muss ultra-flexibel sein (bis 1px genau).
- C5: Block-Positionen werden in Page-Space gespeichert (aus S005).
- C6: Keine CLI Commands für direkte Block-Manipulation (anti-pattern für Power-User).
- C7: Jump IDs müssen sofort springen (keine Wartezeit für mehrzahlige IDs).

## Begriffe (Glossary)

- **Block**: Container mit rect (x, y, w, h), anchor, styling, data (Tiptap JSON).
- **Edit Mode**: Mode für Block-Manipulation (create, move, resize, select, style, delete).
- **Insert Mode**: Mode für Schreiben in Block (Tiptap aktiv).
- **Grid**: Virtuelles Raster auf Page (z.B. 50px Cells) für Navigation + Snapping.
- **Grid-Cursor**: Aktive Grid-Cell, nur während Move/Resize sichtbar (nicht für Selection).
- **Overlay Mode**: Temporärer Mode für schnelle Block-Commands (Jump, Swap, Format Transfer).
- **Jump ID**: Buchstabe + einstellige Zahl (a1-z9), pro Seite, Z-Order basiert.
- **Spatial Selection**: Tab wählt nächsten Block rechts/unten, Shift-Tab links/oben.
- **Multi-Selection**: Mehrere Blocks gleichzeitig selektiert (gemeinsame Manipulation).
- **Smart Snapping**: Visual guides + auto-snap bei Move/Resize (toggle-bar).
- **Format Transfer**: Größe + Styling von einem Block auf anderen kopieren.

## Scope

### In scope

- Edit Mode (State-Machine, conceptual actions ohne konkrete Hotkeys)
- Grid-System (Cell-Size, nur für Move/Resize, nicht für Selection)
- Block Creation (Grid-based + Range-Markierung für Custom-Size)
- Move/Resize (3-level Steps: Grid 50px, Fine 10px, Ultra-Fine 1px via Modifier)
- Selection (Spatial Tab-Navigation, Overlay Mode, Multi-Select)
- Overlay Mode (Commands: Jump, Swap, Format Transfer)
- Jump IDs (Buchstabe + einstellige Zahl, a1-z9, pro Seite)
- Optional: Cell-Jump (Excel-style, Spalten/Zeilen Labels)
- Styling (Simple Input, Tailwind-Klassen)
- Alignment (Konzept, konkrete Hotkeys später)
- Smart Snapping (Toggle, Visual Guides, Magnet-Threshold)
- Format Transfer (Größe + Styling kopieren zwischen Blocks)
- Delete (mit Confirm bei Multi-Select)
- Cut/Paste (zwischen Seiten)
- Undo/Redo (global Command-History)
- Z-Order Manipulation (Konzept, konkrete Hotkeys später)

### Out of scope

- Tiptap Custom Nodes (S007)
- Block-Templates (später)
- Copy/Duplicate (später, separate von Cut/Paste)
- Advanced Styling UI (später, aktuell Hotkey+Panel reicht)

## Anforderungen

### Functional requirements

#### FR1: Edit Mode

- Edit Mode ist separate Mode (neben normal/insert/command).
- Aktivierung: z.B. `E` aus normal mode.
- Exit: `Esc` zurück zu normal mode.
- Im edit mode:
  - Grid-Cursor ist sichtbar (aktive Cell highlighted).
  - Blocks können selektiert/manipuliert werden.
  - Insert mode ist **nicht** aktiv (kein Schreiben in Blocks).

#### FR2: Grid-System

- Page hat virtuelles Grid (Cell-Size: 50px × 50px fix).
- Grid-Cells sind 1-indexed (Row 1, Col 1 = top-left).
- **Grid-Cursor nur für Move/Resize**:
  - Wird nur während Move/Resize sichtbar.
  - Navigation via WASD (1 Cell pro Tastendruck).
  - Grid-Cursor bleibt innerhalb Page-Bounds.
- **Nicht für Block-Selection** (siehe FR6).

#### FR3: Block Creation

- Hotkey im edit mode: `N` (New Block).
- **Standard-Size**:
  - Block wird in aktueller Grid-Cell erstellt (4×3 Cells = 200×150px default).
  - Öffnet automatisch insert mode.
- **Range-Markierung** (Custom-Size):
  - `N` → Grid-Cursor markiert Start-Cell.
  - WASD erweitert Markierung (Rectangle-Range über Cells).
  - `Enter` erstellt Block in markiertem Bereich, öffnet insert mode.
  - `Esc` cancelt Markierung.

#### FR4: Move (Konzept)

- Modifier-based Move (konkrete Hotkeys später definiert).
- **3-level Steps**:
  - **Grid**: 1 Grid-Cell (50px).
  - **Fine**: 10px.
  - **Ultra-Fine**: 1px (für präzise Lücken-Positionierung).
- Modifier bestimmt Step-Size (z.B. keine Modifier = Grid, Alt = Fine, Ctrl = Ultra-Fine).
- Smart Snapping aktiv (falls toggled), siehe FR10.

#### FR5: Resize (Konzept)

- Modifier-based Resize (konkrete Hotkeys später definiert).
- W/S = Height, A/D = Width.
- **3-level Steps**:
  - **Grid**: 1 Grid-Cell (50px).
  - **Fine**: 10px.
  - **Ultra-Fine**: 1px.
- Modifier bestimmt Step-Size (analog zu Move).
- **Min-Size**: 20×20px (praktisch für kleine Lücken, nicht zu restriktiv).
- Bei Multi-Select: alle Blocks resizen gleichmäßig (relative Größe bleibt).

#### FR6: Selection (3 Systeme)

**System 1 - Spatial Tab-Navigation**:
- Tab im edit mode selektiert nächsten Block **rechts oder unten** von aktueller Position.
- Shift-Tab selektiert nächsten Block **links oder oben**.
- "Nächster" = nearest center in Richtung.
- Wenn kein Block in Richtung: wrap zu anderem Ende der Page.

**System 2 - Overlay Mode**:
- Siehe FR7.

**System 3 - Multi-Selection**:
- Modifier + Selection (Tab/Overlay) fügt Block zu Selection hinzu.
- Visual: alle selektierten Blocks haben Outline.
- Clear Selection: Hotkey im edit mode (ohne andere Overlays).

#### FR7: Overlay Mode

- Hotkey im edit mode aktiviert Overlay Mode (z.B. `O`).
- **Overlay einblenden**:
  - Jeder Block bekommt **Jump ID** angezeigt: Buchstabe + einstellige Zahl (a1-z9).
  - IDs basieren auf Z-Order (a1 = hinten, z9 bzw. letzte ID = vorne).
  - IDs sind **pro Seite** (nicht dokument-weit).
  - Max 234 Blocks/Page (26 Buchstaben × 9 Zahlen).
- **Commands** (im Overlay Mode, case-insensitive):
  - `j<ID>`: Jump zu Block (z.B. `ja5`).
  - `s<ID1><ID2>`: Swap Position (z.B. `sa2a7` tauscht rect.x/y).
  - `f<ID1><ID2>`: Format Transfer (z.B. `fa1a5` kopiert Größe+Styling von a1 auf a5).
    - Kopiert: rect.w, rect.h, styling.bgClass, styling.borderClass, styling.opacity.
    - Optional selektiv: `fw<ID1><ID2>` nur Width, `fh` nur Height, `fb` nur bg, etc. (später).
- **Exit**: Esc oder erfolgreicher Command schließt Overlay.
- **Sofortiger Jump**: Keine Wartezeit nach Eingabe (a1 springt sofort, nicht Warten auf a12).

#### FR8: Optional - Cell-Jump (Excel-style)

- Hotkey im edit mode blendet Spalten/Zeilen Labels ein (A-Z, 1-N).
- Type Koordinate (z.B. `C5`) → Grid-Cursor springt zu Cell.
- Nützlich für präzise Grid-Navigation ohne viel WASD.
- Details: später bei Keymap-Spec, hier nur Konzept.

#### FR9: Multi-Selection

- Modifier + Selection (Tab/Overlay) fügt Block zu Selection hinzu.
- Visual: alle selektierten Blocks haben Outline.
- Operationen (Move/Resize/Delete/Style/Format Transfer) wirken auf alle selected Blocks.
- Clear Selection: Hotkey im edit mode (ohne andere Overlays).

#### FR10: Styling

- Hotkey im edit mode auf selektierte(n) Block(s) öffnet Styling-Input.
- **Simple Text-Input** (kein fancy UI):
  - Type Tailwind-Klassen (z.B. `bg-zinc-100 border-blue-500`).
  - Parser extrahiert bg/border/opacity classes.
- Default: `bg-transparent`, `border-none`, `opacity-100`.
- Input schließen: Enter (apply) oder Esc (cancel).

#### FR11: Smart Snapping

- Toggle (Hotkey im edit mode) schaltet Snapping an/aus (default: an).
- **Visual Guides** (während Move/Resize):
  - Zeige Hilfslinien wenn Block nahe an (<10px):
    - Other Block edges (X/Y alignment).
    - Page center (horizontal/vertikal).
    - Grid lines.
- **Auto-Snap**:
  - Bei Threshold (<10px): Block snappt automatisch.
  - Bei Toggle off: keine Guides, kein Snap.

#### FR12: Alignment (Konzept)

- Hotkeys im edit mode (auf selektierte(n) Block(s)), konkrete Keys später:
  - Horizontal center auf Page.
  - Vertikal center auf Page.
  - X-Achse align (bei Multi-Select: nicht auto, nur manuell per Hotkey).
  - Y-Achse align (bei Multi-Select: nicht auto, nur manuell per Hotkey).

#### FR13: Delete

- `Backspace` im edit mode löscht selektierte(n) Block(s).
- **Confirm** bei Multi-Select (>1 Block):
  - Inline-Prompt: "Delete N blocks? (y/n)".
  - `y` oder `Enter` = delete, `n` oder `Esc` = cancel.
- Single Block: direktes Delete (kein Confirm).

#### FR14: Cut/Paste

- `X` im edit mode: Cut selektierte(n) Block(s) (Clipboard, Blocks verschwinden).
- `V` im edit mode: Paste aus Clipboard an Grid-Cursor Position.
- Paste passt Positionen relativ zu Grid-Cursor an (nicht absolute Coords).
- Cut/Paste funktioniert über Seiten hinweg (normal mode → navigate → edit mode → paste).

#### FR15: Undo/Redo

- Global Command-History (alle Block-Operationen).
- `Ctrl+Z`: Undo.
- `Ctrl+Shift+Z`: Redo.

#### FR16: Z-Order Manipulation (Konzept)

- Hotkeys im edit mode (auf selektiertem Block), konkrete Keys später:
  - Bring Forward (+1 in Array).
  - Send Backward (-1 in Array).
  - To Front (end of Array).
  - To Back (start of Array).
- **Hinweis**: Keine `[` `]` auf deutschen Tastaturen, andere Keys wählen.

#### FR17: Insert Mode

- Aktivierung:
  - `Enter` auf selektiertem Block im edit mode → insert mode.
  - Block Creation (`N`) → automatisch insert mode.
- Im insert mode:
  - Tiptap-Instanz aktiv im Block.
  - Schreiben/Editing möglich (Details in S007).
- Exit: `Esc` → edit mode (Fokus bleibt auf Block).

### Non-functional requirements

- NFR1 (Responsiveness): Move/Resize fühlt sich instant an (<16ms reaction).
- NFR2 (Performance): Nur aktiver Block rendert Tiptap (<100ms re-render bei Switch).
- NFR3 (Predictability): Grid-Snapping ist konsistent; gleiche Keys → gleicher Move.
- NFR4 (Discoverability): Jump Overlay IDs sind intuitiv (alphabetisch + numerisch).
- NFR5 (Undo Safety): Alle destructive Operationen (delete, cut) sind undo-bar.

## UX / Interaktion (Keyboard-first)

### Flow 1: Block erstellen (Standard-Size)

1. User in edit mode, Grid-Cursor auf Cell (5, 3).
2. `N` → Block erstellt (200×150px), insert mode öffnet.
3. User schreibt Text.
4. `Esc` → edit mode, Block bleibt selektiert.

### Flow 2: Block erstellen (Custom-Size via Range)

1. User in edit mode, Grid-Cursor auf Cell (2, 2).
2. `N` → Markierung startet.
3. `D` `D` `S` `S` → Markierung erweitert auf 3×3 Cells (150×150px).
4. `Enter` → Block erstellt, insert mode öffnet.

### Flow 3: Block verschieben (Grid-snapped)

1. User in edit mode, Block selektiert.
2. `Space` + `W` `W` `D` → Block bewegt sich 2 Cells hoch, 1 Cell rechts.
3. Smart Snapping zeigt Guide (Block aligned zu anderem Block).

### Flow 4: Multi-Select + Alignment

1. User in edit mode.
2. `Tab` → Block A selektiert.
3. `Ctrl` + `Tab` → Block B zusätzlich selektiert.
4. `Alt+H` → beide Blocks horizontal zentriert auf Page.

### Flow 5: Jump Overlay + Block Swap

1. User in edit mode.
2. `J` → Overlay zeigt IDs (a1-a9).
3. Type `a3` → `Space` → Type `a7` → Blocks a3 und a7 tauschen Position.

### Flow 6: Styling ändern

1. User in edit mode, Block selektiert.
2. `S` → Styling-Panel öffnet.
3. Type `bg-zinc-100` + `Enter` → Block hat grauen Hintergrund.

### Flow 7: Cut/Paste über Seiten

1. User in edit mode, Seite 1, Block selektiert.
2. `X` → Block cut.
3. `Esc` → normal mode.
4. Navigate zu Seite 2 (S008).
5. `E` → edit mode, Grid-Cursor positionieren.
6. `V` → Block eingefügt.

## Design / Proposed approach

### High-level Design

- **Edit Mode Controller**:
  - State-Machine: normal ↔ edit ↔ insert.
  - Hotkey-Dispatcher (im edit mode, separate Keymap).
  - Grid-Cursor State (row, col).
- **Block Repository**:
  - CRUD für Blocks (create, read, update, delete).
  - Z-Order Management (Array-basiert, aus S005).
- **Selection Manager**:
  - Single/Multi-Selection State.
  - Hit-Test integration (S005 Transform).
- **Undo/Redo Stack**:
  - Command-Pattern: alle Operationen als Commands (invertierbar).
- **Styling/Alignment Engine**:
  - Tailwind-Class Parser.
  - Alignment Calculations (center, nearest-block).
- **Jump Overlay Renderer**:
  - ID-Generator (a1-z9, aa1...).
  - Input-Handler (type ID → select/swap).

### Datenmodell / Verträge

#### Block (erweitert zu S003)

- `id`: BlockId (stabile ID)
- `kind`: "block" (aktuell nur ein Type)
- `anchor`: { kind: "page", pageId: PageId }
- `rect`: { x, y, w, h } (Page-Space, aus S005)
- `styling`:
  - `bgClass`: string (Tailwind, default "bg-transparent")
  - `borderClass`: string (Tailwind, default "border-none")
  - `opacity`: number (0-100, default 100)
- `data`:
  - `tiptapJson`: JSON (Tiptap Document, Details in S007)

#### Grid-Cursor State

- `row`: number (1-indexed)
- `col`: number (1-indexed)
- `markedRange`: { startRow, startCol, endRow, endCol } | null (während Range-Markierung)

#### Selection State

- `selected`: BlockId[] (leer = none, 1 = single, >1 = multi)

#### Clipboard State

- `blocks`: Block[] (cut/paste)
- `origin`: { pageId, gridRow, gridCol } (für relative Paste)

### State & Lifecycle

#### Mode Transitions

```
normal --(E)--> edit --(Esc)--> normal
edit --(Enter on Block)--> insert --(Esc)--> edit
edit --(N)--> insert (via auto-open after create)
```

#### Grid-Cursor Init

- Beim Eintritt in edit mode: Grid-Cursor = Cell (1, 1) (top-left).
- Falls vorher ein Block selektiert war: Grid-Cursor = Cell des Blocks.

#### Block Lifecycle

1. **Create**: `N` → Block-Entity erstellt → insert mode öffnet → Tiptap-Instanz rendert.
2. **Edit**: User schreibt in Tiptap (Details S007).
3. **Exit Insert**: `Esc` → Tiptap-JSON serialisiert → Block.data updated → static HTML gerendert.
4. **Re-Edit**: `Enter` → Tiptap-Instanz re-hydrated aus data.tiptapJson.
5. **Delete**: `Backspace` → Block-Entity entfernt → Undo-Stack.

### Grid-System Details

#### Cell-Size

- Default: 50px × 50px.
- Konfigurierbar (z.B. 40px, 60px), aber fix pro Session.

#### Cell-Count

- Abhängig von Page-Size:
  - Page = 800px breit → 16 Columns.
  - Page = 1131px hoch (A4) → ~23 Rows.

#### Cell-to-PageCoords

```
cellX = (col - 1) * cellSize
cellY = (row - 1) * cellSize
```

#### PageCoords-to-Cell (nearest)

```
col = floor(x / cellSize) + 1
row = floor(y / cellSize) + 1
```

### Jump Overlay ID-System

#### ID-Generation

- Z-Order Array (Blocks, hinten → vorne).
- IDs: a1, a2, ..., a9, b1, ..., z9, aa1, aa2, ...
- Pattern: `letter + digit`, bei >26*9: `letter+letter + digit`.

#### Collision Handling

- Keine Collisions (IDs sind unique per Page).

### Smart Snapping Details

#### Magnet-Threshold

- <10px zu Snap-Target → auto-snap.

#### Snap-Targets

- Other Block edges (left, right, top, bottom).
- Page center (horizontal: x=400, vertikal: y=pageHeight/2).
- Grid lines (jede Cell-Grenze).

#### Visual Guides

- Dashed lines (z.B. cyan) während Move/Resize.
- Verschwinden nach Release.

### Styling Details

#### Tailwind-Class Parsing

- Styling-Panel akzeptiert Tailwind-Klassen (z.B. `bg-zinc-100`).
- Validation: nur erlaubte Prefixes (`bg-`, `border-`, keine arbitrary values).

#### Default Styling

- Transparent background (kein visueller "Box"-Effekt).
- No border.
- Opacity 100%.

### Alignment Calculations

#### Horizontal Center

```
newX = (pageWidth - block.w) / 2
```

#### Vertical Center

```
newY = (pageHeight - block.h) / 2
```

#### X-Align to Target

```
newX = target.x
```

#### Y-Align to Target

```
newY = target.y
```

### Undo/Redo Implementation

#### Command-Pattern

- Alle Operationen als Commands:
  - `CreateBlockCommand`
  - `MoveBlockCommand`
  - `ResizeBlockCommand`
  - `DeleteBlockCommand`
  - `StyleBlockCommand`
  - etc.
- Command hat `execute()` und `undo()`.

#### Stack

- `undoStack`: Command[]
- `redoStack`: Command[]
- Max-Size: z.B. 100 Commands (konfigurierbar).

### Error handling

- Block außerhalb Page-Bounds: Clamp zu Bounds.
- Resize < Min-Size: Clamp zu Min-Size (50×50px).
- Jump Overlay: Invalid ID → error beep, Overlay bleibt offen.
- Paste ohne Clipboard: noop.

### Performance-Notizen

- Tiptap-Instanz nur für aktiven Block (selektierter Block im insert mode).
- Andere Blocks: static HTML/DIV (data.tiptapJson → readonly render).
- Grid-Rendering: CSS Grid Overlay (keine DOM-Node pro Cell).

## Entscheidungen (Decisions)

- D1: Edit Mode ist separate Mode (neben normal/insert/command).
- D2: Grid-System mit 50px Cells (konfigurierbar, aber fix pro Session).
- D3: Block Creation: Standard-Size (4×3 Cells) oder Range-Markierung (Custom-Size).
- D4: Move/Resize: 3-level Steps (Grid 50px, Fine 10px, Ultra-Fine 1px via Modifier).
- D5: Selection via Spatial Tab-Navigation (rechts/unten, links/oben) + Overlay Mode.
- D6: Jump IDs: Buchstabe + einstellige Zahl (a1-z9), pro Seite, sofortiger Jump.
- D7: Overlay Mode Commands: Jump (j<ID>), Swap (s<ID1><ID2>), Format Transfer (f<ID1><ID2>).
- D8: Format Transfer kopiert: rect.w, rect.h, styling (bg, border, opacity).
- D9: Styling via simple Text-Input (Tailwind-Klassen), kein fancy UI.
- D10: Alignment manuell per Hotkey (bei Multi-Select kein auto-align).
- D11: Smart Snapping toggle, Magnet-Threshold <10px.
- D12: Min-Size: 20×20px (flexibel für kleine Lücken).
- D13: Delete mit Confirm bei Multi-Select.
- D14: Cut/Paste mit relativem Positioning (Grid-Cursor based).
- D15: Undo/Redo via global Command-History.
- D16: Z-Order Manipulation via Hotkeys (keine `[` `]`, andere Keys später).
- D17: Nur aktiver Block rendert Tiptap-Instanz (Performance).
- D18: Blocks default transparent (bg-transparent, border-none).
- D19: Keine konkreten Hotkeys in S006 (kommt in Keymap-Spec).

## Alternativen (Alternatives considered)

### A1: CLI Commands für Block-Manipulation

- Pro: Konsistent mit Command System (S002).
- Contra: Zu umständlich für flüssige Manipulation, bricht Power-User Flow.

### A2: Separate Modes für Move/Resize

- Pro: Klarere Semantik (move mode, resize mode).
- Contra: Zu viel Mode-Switching, langsamer Workflow.

### A3: Absolute Positioning (kein Grid)

- Pro: Maximale Freiheit.
- Contra: Schwer per Tastatur zu navigieren, kein Snapping-Grund.

### A4: Mouse-Emulation für Rectangle-Selection

- Pro: Familiar aus Desktop-Apps.
- Contra: Awkward per Tastatur, schlecht für Muscle Memory.

## Konsequenzen / Trade-offs

- **Leichter**: Schnelle Block-Manipulation, vorhersagbares Grid, Power-User Shortcuts, Performance via lazy Tiptap-Rendering.
- **Schwerer**: Edit Mode braucht eigene Keymap (Conflicts mit normal mode vermeiden), Grid-System muss flexibel bleiben (nicht zu restriktiv).
- **Einschränkung**: Nur Rechtecke, keine Formen (akzeptiert, eigene Spec später).
- **Einschränkung**: Jump Overlay skaliert nur bis ~260 Blocks/Page (a1-z9 + aa1-zz9), danach ID-System brechen (akzeptabel, unrealistisch viele Blocks).

## Test-Strategie

### Unit

- Grid-Cursor Navigation: WASD bewegt Cursor korrekt.
- Cell-to-PageCoords: Conversion stimmt.
- Jump Overlay ID-Generation: a1-z9, aa1... korrekt.
- Command-Pattern: execute() + undo() sind inverse.
- Alignment Calculations: center/align stimmt.

### Integration

- Edit Mode Transitions: normal → edit → insert → edit → normal.
- Block Creation: Range-Markierung → korrekte Größe.
- Multi-Select: Ctrl+Selection → Move wirkt auf alle.
- Smart Snapping: Visual Guides erscheinen, Snap funktioniert.
- Cut/Paste: über Seiten hinweg, relative Position stimmt.

### E2E/Manual

- Create 10 Blocks, navigiere via Jump Overlay, swap 2 Blocks.
- Multi-Select 5 Blocks, resize, align horizontal.
- Delete 3 Blocks, Undo, Redo.
- Grid-Snapping toggle `G`, bewege Block mit/ohne Guides.

**Definition of done**:

- Edit Mode funktioniert, Hotkeys korrekt gebunden.
- Grid-System rendert, Navigation flüssig.
- Block Creation (Standard + Range) funktioniert.
- Move/Resize mit Modifiers korrekt.
- Jump Overlay erscheint, IDs selektierbar, Swap funktioniert.
- Smart Snapping toggle + Guides funktionieren.
- Undo/Redo funktioniert für alle Operationen.

## Offene Fragen

- Q1: Overlay Mode: eigener Mode oder nur Layer? Exit via Esc oder Toggle (O nochmal)?
- Q2: Format Transfer selektiv: sofort granular (fw/fh/fb Commands) oder später erweitern?
- Q3: Cell-Jump (Excel-style): hohe Prio oder nice-to-have?
- Q4: Spatial Tab-Navigation: Wrap zu anderem Ende oder Stop am Rand?
