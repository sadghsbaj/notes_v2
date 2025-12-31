# notes_v2 – UI/UX Guidelines

## Design Philosophy

- **Ultra Clean**: Viel Whitespace, Apple-inspired, minimal UI.
- **Floating Elements**: HUD/Cockpit-Style, smooth Animations.
- **Monotone Base**: Zinc-Palette, Akzente via bunten Badges/Overlays.
- **Breite Elemente**: Niedrig + breit (gut für Tablet-Querformat).
- **Starke Radien**: Wie Apple, aber keine Pillen.
- **Keyboard-Only**: Kein Hover, Fokus-Management via sichtbare Focus-States.

---

## Color System

### Light Mode (Primary)

**Base Colors** (Monotone, Zinc):
- **App Background**: Sehr helles Grau (z.B. Zinc-100)
- **Page Background**: White (leer) oder WebP/AI-Content
- **Page Border/Shadow**: Subtile Schatten statt harte Borders
- **Primary Text**: Fast schwarz (z.B. Zinc-900)
- **Secondary Text**: Grau für Labels/Hints (z.B. Zinc-600)

**Accent Colors** (Tailwind Modern):
- **Mode Badges**: Bunt (pro Mode eine Farbe):
  - Edit: Blue
  - Insert: Green
  - Page: Purple
  - File: Orange
  - Calc: Cyan
  - Overlay: Pink
- **Overlays (Background)**: Accent-Color mit hoher Opacity (z.B. Blue 90%)
- **Focus States**: Deutlich sichtbar (z.B. Ring um Element, Accent-Color)

### Dark Mode (Later)

- Vorbereitet via Vanilla Extract Theme-Tokens.
- Nicht sofort implementieren (erst Light Mode perfektionieren).
- Base: Dunkles Grau (App/Pages), heller Text.

---

## Typography

### Fonts

All fonts are **locally bundled** under `src/assets/fonts/`.

**Sans-Serif** (Primary, UI + Normal Text):
- **Geist** – Modern, clean, all weights + italics

**Monospace** (Code, JSON-Editor):
- **Geist Mono** – Pairs with Geist, all weights

**Handwritten** (SmartBlocks, Annotations):
- **Kalam** – 3 Weights (300, 400, 700)

### Principles

- **Scale**: Multiple Größen (klein → groß), konsistente Abstände.
- **Hierarchy**: Größere/schwerere Fonts für wichtigere Elemente.
- **Readability**: Genug Line-Height, nicht zu eng.

---

## Spacing

### Principles

- **Viel Whitespace**: Elemente nicht crammen.
- **Konsistente Abstände**: Wiederhole gleiche Werte (z.B. 8px-Skala).
- **Größere Elemente = mehr Padding**: Floating Panels mehr als Buttons.

---

## Border Radius

### Principles (Apple-Style)

- **Keine Pillen**: Buttons/Panels nicht komplett rund, max mittlere Radien.
- **Konsistent**: Gleiche Elemente = gleicher Radius.
- **Größere Elemente = größerer Radius**: Kleine Badges kleiner, große Overlays größer.

---

## Layout

### Breite Elemente (Niedrig + Breit)

**Principle**:
- Elemente nicht quadratisch, sondern rechteckig (breiter als hoch).
- Tablet-Querformat-optimiert, Platzausnutzung.

**Examples**:
- Icon Buttons: Breit (z.B. 1.3:1 Ratio)
- Floating Panels: Sehr breit, niedrig
- Mode Indicator: Icon + Text horizontal (breit)

---

## Shadows

### Principles (statt harte Borders)

- **Subtile Shadows**: Floating-Effekt, nicht zu stark.
- **Elevation**: Verschiedene Shadow-Stärken für verschiedene Ebenen.
- **Blur**: Soft Shadows (blur radius), nicht harte Kanten.

**Use-Cases**:
- Pages: Mittlere Shadow (floating above App)
- Overlays: Stärkste Shadow (highest elevation)
- Buttons: Leichte Shadow (subtle depth)

---

## Animations

### Timing

- **Schnell**: Kleine Transitions (z.B. Focus-States)
- **Medium**: Overlays, Mode-Transitions (Standard)
- **Langsam**: Smooth Scroll, Page-Transitions

**Empfehlung**: Medium-Speed als Default (ca. 200-300ms).

### Easing

- **Standard**: ease-out (schneller Start, langsamer End)
- **Smooth**: ease-in-out (symmetric)
- **Spring**: leichter Bounce (für Overlays)

---

## Focus Management (Keyboard-Only)

### Principles

- **Kein Hover**: Alle Interactions per Tastatur.
- **Sichtbare Focus-States**: Deutlich erkennbar (z.B. Ring, Background-Change).
- **Focus-Order**: Logische Tab-Reihenfolge (normal → edit → Blocks).
- **Trap-Vermeidung**: Esc bringt immer zurück.

### Visual Focus-States

- **Ring**: Accent-Color (z.B. Blue) um Element.
- **Background**: Leichte Background-Änderung (z.B. Zinc-50 → Zinc-100).
- **Shadow**: Verstärkte Shadow bei Focus.

---

## Components (Principles)

### Mode Indicator (Badge rechts unten)

**Design**:
- Breiter als hoch (Icon + Buchstabe horizontal)
- Starker Radius (Apple-Style)
- Mode-spezifische Accent-Color
- Starke Shadow (floating)
- Font: Sans-Serif Bold

**Animation**:
- Enter: Slide-in from bottom-right (medium speed)
- Exit: Fade-out (schnell)

### Overlays (Jump, Zoom, Styling)

**Design**:
- Transparent Background (Accent-Color + hohe Opacity)
- Backdrop Blur (glassmorphism)
- Starker Radius
- Stärkste Shadow
- Viel Padding

**Animation**:
- Enter: Fade-in + Scale (klein → normal)
- Exit: Fade-out

### Buttons

**Design**:
- Breiter als hoch
- Mittlerer Radius
- Dunkler Background (z.B. Zinc-900), weißer Text
- Leichte Shadow
- Focus-State: Ring + verstärkte Shadow

**Animation**:
- Focus: Transition (schnell)

### Pages (Empty)

**Design**:
- White Background
- Keine Border (Shadow statt Border)
- Mittlere Shadow (floating)
- Centered, gleichmäßiges Padding

---

## Specific Elements

### Jump Overlay (IDs über Blocks)

**Design**:
- Kleine Badges pro Block
- Dunkler Background (z.B. Zinc-900), translucent
- Weißer Text, Bold Font
- Kleiner Radius
- Position: Top-left corner of Block

### Zoom Overlay (Feedback)

**Design**:
- Zentral, translucent
- Breit, niedrig (Landscape-optimiert)
- Accent-Color Background (z.B. Blue, hohe Opacity)
- Weißer Text, Bold Font
- Starker Radius
- Starke Shadow

**Animation**:
- Fade-in (medium) → Auto-Fade-out nach kurzer Zeit

---

## Summary

- **Colors**: Zinc monotone (Base), bunte Accents (Badges/Overlays)
- **Typography**: Geist (UI), Geist Mono (Code), Kalam (Handwritten) – all local
- **Spacing**: Viel Whitespace, konsistente Abstände
- **Radien**: Apple-Style, keine Pillen
- **Breite Elemente**: Niedrig + breit (Tablet-optimiert)
- **Animations**: Medium-Speed (200-400ms), ease-out/spring
- **Shadows**: Statt Borders (subtiler, floating)
- **Focus**: Keyboard-only, sichtbare Ring/Background-States
