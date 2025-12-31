# S008 – Navigation & Zoom

**Status:** draft  
**Owner:** Colin  
**Last updated:** 2025-12-31  
**Related:**

- Vision: `../01_project/01_vision.md`
- Spec: `S001-input-and-modes.md`
- Spec: `S005-page-layout-and-coordinate-system.md`

---

## Kontext

Navigation in notes_v2 ist keyboard-only (WASD), **nur Y-Achse Scroll** (kein X-Scroll). Zoom-System mit 3 Levels + Fine-Tuning.

## Ziele

- WASD-Navigation (smooth scroll, keine Page-Jumps).
- 3 Zoom-Levels (Detail/Normal/Fit Page) + Fine-Zoom.
- Nur Y-Scroll (Page zentriert, S005).
- Zoom-Overlay für visuelles Feedback.

## Nicht-Ziele

- Multi-Page-Vorschau.
- Thumbnail-Sidebar.
- X-Achsen-Scroll.

## Begriffe

- **Detail View**: Fit-Width (max zoom).
- **Normal View**: 1:1 (800px).
- **Fit Page**: gesamte Page sichtbar (min zoom).
- **Fine-Zoom**: ±10% Steps.

## Navigation (WASD in normal mode)

- **W/S**: Scroll up/down (smooth, z.B. 100px/step).
- **A/D**: Page prev/next (mit Transition-Animation).
- **Shift+W/S**: Scroll fast (z.B. 500px/step).

## Zoom-System

### 3 Levels (Hotkey cycles)

- **Detail**: Fit-Width + Padding (20px).
- **Normal**: 1:1 Scale.
- **Fit Page**: gesamte Höhe + Padding.

### Fine-Zoom (Modifier)

- **Modifier + Wheel/Keys**: ±10% Steps.

## Zoom-Overlay

**Trigger**: Zoom-Level wechselt → Overlay erscheint kurz (500ms fade-out).

**Display**:
- Zentral, translucent.
- Zeigt: "Detail View" / "Normal View" / "Fit Page" / "125%".

## Entscheidungen

- D1: WASD-Navigation, nur Y-Scroll.
- D2: A/D = Page prev/next (nicht Scroll left/right).
- D3: 3 Zoom-Levels + Fine-Zoom.
- D4: Zoom-Overlay (kurz, auto-fade).
- D5: Smooth Scroll (nicht instant jumps).

## Offene Fragen

- Q1: Zoom-Hotkey: cycle nur vorwärts oder auch rückwärts?
- Q2: Fine-Zoom: Modifier + WASD oder Modifier + Wheel?
