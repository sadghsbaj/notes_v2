# S009 – Overlays & HUD Elements

**Status:** draft  
**Owner:** Colin  
**Last updated:** 2025-12-31  
**Related:**

- Vision: `../01_project/01_vision.md`
- Spec: `S001-input-and-modes.md`
- Spec: `S006-blocks-system.md`

---

## Kontext

notes_v2 nutzt **Overlays** statt permanente UI. Overlays sind temporär, helfen enorm, stören nicht.

Diese Spec sammelt alle Overlay-Typen + HUD-Elemente.

## Ziele

- Overlays als primäres UI-Element (statt Sidebars/Panels).
- Minimal, translucent, HUD/Cockpit-Style.
- Keyboard-Driven (kein Click nötig).

## Overlay-Typen

### 1. Mode Indicator (immer sichtbar)

- **Position**: Floating Badge rechts unten.
- **Display**: Icon + Buchstabe (E/I/P/F/C/O).
- **Styling**: Translucent, minimale Größe.

### 2. Jump Overlay (edit → overlay mode)

- **Trigger**: Sub-Mode overlay.
- **Display**: Block-IDs über jedem Block (a1-z9).
- **Actions**: Jump, Swap, Format Transfer (S006).
- **Exit**: Esc oder Command-Completion.

### 3. Zoom Overlay (zoom change)

- **Trigger**: Zoom-Level wechselt.
- **Display**: Zentral, "Detail View" / "125%".
- **Auto-Fade**: 500ms.

### 4. Ghost-Text (parameter input)

- **Trigger**: Action in Sub-Mode (S002).
- **Display**: Rechts unten (nähe Mode Indicator).
- **Content**: Parameter Defaults/Eingabe.

### 5. Styling Input (edit mode)

- **Trigger**: Styling-Hotkey auf Block (S006).
- **Display**: Floating Input (Tailwind-Klassen).
- **Exit**: Enter/Esc.

### 6. Notification Toast (actions feedback)

- **Trigger**: Action erfolgreich (z.B. "3 Pages added").
- **Display**: Oben rechts, auto-fade (2s).

## HUD-Elemente (optional, später)

### Page-Indicator (top center)

- **Display**: "Page 3/12".
- **Styling**: Mini, translucent.

### Selection-Count (bei Multi-Select)

- **Display**: "5 Blocks selected".
- **Position**: Unten zentral.

## Entscheidungen

- D1: Overlays > permanente UI (Sidebars/Toolbars).
- D2: HUD/Cockpit-Style (translucent, minimal).
- D3: Auto-Fade für Feedback-Overlays (Zoom, Notifications).
- D4: Alle Overlays keyboard-driven (kein Click).

## Offene Fragen

- Q1: Dark Mode: Overlay-Farben invertieren oder konsistent?
- Q2: Page-Indicator: immer sichtbar oder nur bei Navigation?
