# S002 – Action System & Parameters

**Status:** draft  
**Owner:** Colin  
**Last updated:** 2025-12-31  
**Related:**

- Vision: `../01_project/01_vision.md`
- Spec: `S001-input-and-modes.md`
- Spec: `S003-document-model-and-storage.md`
- Spec: `S006-blocks-system.md`

---

## Kontext

notes_v2 nutzt **Sub-Modi** (page/file/calc/overlay) für kategorisierte Actions statt CLI. Actions brauchen Parameter (z.B. Page Add: count, position, height).

Diese Spec definiert:
- Action-System (Registry, Execution, Undo)
- Parameter-Eingabe (Ghost-Text als inline Feedback)
- Inline Math (Calc Mode)
- Parameter-Format (Comma-separated, Defaults)

## Ziele

- Schnelle Action-Ausführung via Sub-Modi + Single-Key.
- Parameter inline via Ghost-Text (minimale UI).
- Defaults für optionale Parameter (schneller Workflow).
- Inline Math (Calc Mode: `c` → `17*23` → Clipboard).

## Nicht-Ziele

- CLI / Command Palette UI.
- Autocomplete / Suggestion-Liste.
- Complex Parameter-Types (nur Primitives: number, string, boolean).

## Begriffe

- **Action**: Ausführbare Operation mit ID + Handler + Params Schema.
- **Ghost-Text**: Inline Feedback rechts unten (zeigt Defaults/Eingabe).
- **Parameter**: Eingabe via Komma-separated Values (z.B. `3,4,700`).
- **Default**: Wert wenn Parameter fehlt.

## Action-System

### Action Registry

Jede Action hat:
- `id`: string (z.B. "page.add")
- `schema`: Parameter-Definition (name, type, default, optional)
- `handler`: (params) => void
- `undoable`: boolean

### Parameter-Eingabe (Ghost-Text)

**Flow**:
1. Sub-Mode aktiv (z.B. page mode).
2. Action-Key gedrückt (z.B. `a` für add).
3. Ghost-Text erscheint rechts unten: `count=1, pos=end, height=auto`.
4. User tippt Parameter: `3,4,700`.
5. Ghost updated: `count=3, pos=4, height=700`.
6. Enter → Execute mit Parametern.

**Parsing**:
- Comma-separated: `3,4,700`.
- Positional mapping: 1. Param → count, 2. → pos, 3. → height.
- Fehlende Params → Defaults.

**Ghost-Position**: Floating rechts unten (nähe Mode Indicator).

### Calc Mode (Inline Math)

**Flow**:
1. `c` → calc mode aktiv.
2. Type expression: `17*23`.
3. Ghost: `= 391`.
4. Enter → Copy 391 to Clipboard, exit calc.

**Features**:
- Deutsches Dezimal-Komma: `3,7*2` = 7,4.
- Rounding: 2 Decimals default.

### Undo/Redo

- Global Command-History (alle undoable Actions).
- Ctrl+Z: Undo.
- Ctrl+Shift+Z: Redo.

## Beispiele

### Page Add: 3 Pages, Position 4, Height 700

```
p → a → 3,4,700 → Enter
```

### Page Remove: Pages 2, 5-7

```
p → r → 2;5-7 → Enter
```

(Range-Syntax: `;` separated, `-` für ranges)

### Calc: 17*23

```
c → 17*23 → Enter (391 to Clipboard)
```

## Entscheidungen

- D1: Parameter via Comma-separated Values (einfach, schnell).
- D2: Ghost-Text rechts unten (nähe Mode Indicator).
- D3: Defaults für optionale Parameter (schneller Workflow).
- D4: Calc Mode: deutsches Komma-Support.
- D5: Undo/Redo global (nicht action-specific).
- D6: Range-Syntax: `;` separated, `-` für ranges (z.B. `2;5-7`).

## Offene Fragen

- Q1: Ghost-Text: immer sichtbar oder nur während Eingabe?
- Q2: Parameter-Validation: live (während Eingabe) oder erst bei Enter?
