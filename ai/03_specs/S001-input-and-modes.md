# S001 – Input & Modes

**Status:** draft  
**Owner:** Colin  
**Last updated:** 2026-01-01  
**Related:**

- Vision: `../01_project/01_vision.md`
- Spec: S002 Action System & CLI (planned)
- Spec: S006 Blocks System
- Spec: S008 Navigation Model (planned)

---

## Kontext

notes_v2 ist keyboard-only für einen Power-User. Wir nutzen ein **Vim-inspired Mode-System** (Normal, Edit, Insert) kombiniert mit einer **mächtigen Inline-CLI** (Command Mode) für alle komplexen Operationen. Keine Sub-Modi, keine verschachtelten Menüs.

## Ziele

- **Pure Modes**: Nur Normal, Edit, Insert, Command. Keine Sub-Modi.
- **Advanced Inline CLI**:
    - Slot-based Input (Command + Args).
    - Smart Autocomplete (Fuzzy + Prefix-Weighting).
    - Inline Ghost-Text (Completion vs. Replacement).
    - Inline Math Calculator.
- **Zero UI-Overhead**: Alles passiert inline in einer Zeile (HUD).
- **Muscle Memory**: Konsistente Befehle, schnelle Eingabe.

## Nicht-Ziele

- Verschachtelte Sub-Modi (Page Mode, File Mode etc.).
- Maus-Interaktion für Commands.
- Discoverability über Menüs (CLI ist discoverable via Autocomplete).

## Harte Constraints

- C1: Kein Touch/Maus.
- C2: WASD = Primary Navigation.
- C3: Esc = universal "back/exit".
- C4: CLI muss extrem schnell und responsive sein (Fuzzy Search).

## Begriffe

- **Main Mode**: normal / edit / insert.
- **Command Mode**: Temporärer Modus für CLI-Eingabe (getriggert durch `:` oder ähnliches).
- **Slot**: Ein Segment in der CLI (Slot 0 = Command, Slot 1 = Arg1, etc.).
- **Ghost-Text**: Inline-Vorschau für Autocomplete oder Parameter-Hilfe.
- **Fuzzy Search**: Intelligente Suche für Commands (Prefix > Fuzzy).

## Modi-Hierarchie

### Main Modes

**normal**:
- Zweck: Navigation (WASD), Zoom, Scroll.
- Entry zu Command Mode (`:`).
- Entry zu Edit Mode (`Enter` auf Block).

**edit**:
- Zweck: Block-Manipulation (Move, Resize, Style).
- Entry zu Insert Mode (`i` / `Enter`).
- Exit: Esc → normal.

**insert**:
- Zweck: Text-Editing (Tiptap).
- Exit: Esc → edit.

### Command Mode (CLI)

**command**:
- Zweck: Ausführen aller komplexen Aktionen (Page add, File save, Config, etc.) und Berechnungen.
- Trigger: `Ctrl + .` (aus Normal/Edit).
- UI: Eine Zeile (HUD), kein Dropdown. Erscheint mit einer cleanen Animation (TBD).
- Features:
    - **Slot-System**: `[Command] [Arg1] [Arg2] ...` (getrennt durch Space).
    - **Autocomplete**: Tab-Triggered, Inline Ghost-Text.
    - **History**: Pfeil Hoch/Runter durch letzte Befehle.
    - **Math**: Eingabe endet mit `=` → Berechnung.
- Exit: `Enter` (Execute), `Esc` (Cancel).

## Mode Transitions

```
normal ←→ edit ←→ insert
  ↓        ↓
  └── command ──┘
```

- Command Mode ist von normal und edit erreichbar (`Ctrl + .`).
- Nach Ausführung (Enter) oder Cancel (Esc) zurück in den vorherigen Mode.

## Esc Rules

**Esc Priority** (top to bottom):
1. Command Mode aktiv → Cancel & Exit.
2. Insert Mode → edit.
3. Edit Mode (Selection) → clear Selection.
4. Edit Mode (keine Selection) → normal.
5. Normal Mode → noop.

**Panic Reset**:
- **Trigger**: Esc 5× schnell.
- **Effekt**: Reset to Normal, Clear All, Close CLI.

## Mode Indicator & CLI

- **Position**: Floating HUD (unten mittig oder rechts).
- **Inhalt**:
    - Normal/Edit/Insert: Kleiner Indikator (Icon/Text).
    - Command: Eingabezeile ersetzt Indikator oder erweitert ihn (Animation: TBD).
- **Ghost-Text**:
    - Zeigt Autocomplete-Vorschlag (dunkelgrau).
    - Zeigt Parameter-Namen, wenn im Argument-Slot (fett markiert).

## Input Pipeline

1. Global `keydown`.
2. Check Mode.
3. If Command Mode: Route to CLI Engine (Fuzzy Search, Slot Parser).
4. If Main Mode: Route to Keymap.

## Entscheidungen

- D1: **Keine Sub-Modi**. Alles läuft über die CLI.
- D2: **Inline CLI**. Keine Listen-Popups, nur Ghost-Text.
- D3: **Slot-Based**. Leertaste springt zum nächsten Parameter-Slot.
- D4: **Math Integration**. Rechenoperationen direkt in der CLI (`=` Trigger).
- D5: **Fuzzy Logic**. Prefixes werden stärker gewichtet als reine Fuzzy-Matches.
- D6: **Trigger**: `Ctrl + .` öffnet die CLI.

## Offene Fragen

- Q1: Details zur Animation (Fade/Slide/Expand)?
