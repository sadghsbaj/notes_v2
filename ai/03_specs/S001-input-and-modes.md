# S001 – Input & Modes

**Status:** draft  
**Owner:** Colin  
**Last updated:** 2025-12-31  
**Related:**

- Vision: `../01_project/01_vision.md`
- Spec: S002 Action System & Ghost Text (planned)
- Spec: S006 Blocks System
- Spec: S008 Navigation Model (planned)

---

## Kontext

notes_v2 ist keyboard-only für einen Power-User (nur ich). Statt CLI nutzen wir ein **Vim-inspired Mode-System** mit **Sub-Modi** für kategorisierte Actions. Maximale Effizienz durch Muscle Memory, minimale UI.

## Ziele

- Vim-inspired Multi-Mode System (normal/edit/insert + Sub-Modi).
- Sub-Modi für kategorisierte Actions (page/file/calc/overlay).
- Muscle Memory > UI (keine Discoverability nötig).
- Zero UI-Overhead (Dokument + minimale HUD-Overlays).

## Nicht-Ziele

- CLI / Command Palette.
- Discoverability / Autocomplete.
- Key-Sequences (`g g`).
- Rebindable Keymaps (hardcoded für mich).

## Harte Constraints

- C1: Kein Touch/Maus.
- C2: WASD = Primary Navigation.
- C3: Esc = universal "back/exit" (nie wegbindbar).
- C4: Keine Sequences (schnelles Tippen darf nicht blockieren).

## Begriffe

- **Main Mode**: normal / edit / insert.
- **Sub-Mode**: page / file / calc / overlay (temporär innerhalb Main Mode).
- **Mode Indicator**: Floating HUD rechts unten (viewport-fixed), zeigt aktuellen Mode.
- **Action**: Ausführbare Operation (Details in S002).
- **Ghost-Text**: Inline-Feedback für Parameter (Details in S002).

## Modi-Hierarchie

### Main Modes

**normal**:
- Zweck: Page-Navigation, Zoom, Scroll.
- Sub-Modi: page, file, calc.

**edit**:
- Zweck: Block-Manipulation (Move, Resize, Create, Delete, Style).
- Sub-Modus: overlay.
- Exit: Esc → normal.

**insert**:
- Zweck: Schreiben in Block (Tiptap aktiv).
- Exit: Esc → edit.

### Sub-Modes

**page** (in normal):
- Zweck: Page-Operationen (Add, Remove, Swap, Rotate, etc.).
- Exit: Esc (bleibt aktiv bis manual exit).

**file** (in normal):
- Zweck: File-Operationen (Import, Export, Open, New).
- Exit: Esc.

**calc** (in normal):
- Zweck: Calculator (Inline Math, Copy zu Clipboard).
- Exit: Esc.

**overlay** (in edit):
- Zweck: Block-Jump/Swap/Format Transfer via IDs (S006).
- Exit: Esc.

## Mode Transitions

```
normal ←→ edit ←→ insert
  ↓ ↑       ↓ ↑
 page      overlay
 file
 calc
```

- Sub-Modi bleiben aktiv bis Esc (kein auto-exit).
- Esc bringt zurück: Sub-Mode → Main-Mode → vorherigen Main-Mode.

## Esc Rules

**Esc Priority** (top to bottom):
1. Overlay offen → schließe Overlay.
2. Sub-Mode aktiv → exit Sub-Mode.
3. Insert Mode → edit.
4. Edit Mode (Selection) → clear Selection.
5. Edit Mode (keine Selection) → normal.
6. Normal Mode → noop.

**Panic Reset** (Esc aus stuck state):
- **Trigger**: Esc 5× schnell hintereinander (innerhalb ~1 Sekunde).
- **Effekt**: Schließe alle Overlays, exit alle Sub-Modes, zurück zu normal, clear Selection.

## Mode Indicator

- **Position**: Floating Badge rechts unten (viewport-fixed).
- **Display**: Kleines Icon + Buchstabe (z.B. `E` für edit, `P` für page).
  - Gilt für alle Modi und Sub-Modi (ein Badge, wechselt Inhalt je nach aktivem Mode).
- **Styling**: Minimal, translucent, HUD/Cockpit-style.

## Input Pipeline

1. Global `keydown` listener (capture phase).
2. Normalize KeyStroke (code + modifiers).
3. Build InputContext (mode, subMode, overlayStack, focusTarget, selection).
4. Resolve gegen mode-spezifische Keymap (Layering: Overlay > Insert > Sub-Mode > Main-Mode).
5. Dispatch Action.

## Entscheidungen

- D1: Modi: normal/edit/insert + page/file/calc/overlay.
- D2: Sub-Modi bleiben aktiv bis Esc (kein auto-exit).
- D3: Esc = universal back/exit, Panic Reset = Esc 5× schnell hintereinander.
- D4: Mode Indicator: Floating Badge rechts unten (Icon + Buchstabe), gilt für alle Modi/Sub-Modi.
- D5: Calc Mode: Hotkey `c`.
- D6: Keine konkreten Hotkeys in S001 (allgemeine Spec, Details in Keymap-Spec später).
- D7: WASD = Primary Navigation.
- D8: Hardcoded Keymaps (optimiert für mich).
- D9: Ghost-Text für Parameter-Eingabe wird gebaut (Details in S002).

## Offene Fragen

*Keine offenen Fragen – alle Decisions finalisiert.*
