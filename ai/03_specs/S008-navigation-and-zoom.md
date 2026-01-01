# S008 – Navigation & Zoom

**Status:** draft  
**Owner:** Colin  
**Last updated:** 2026-01-01  
**Related:**

- Vision: `../01_project/01_vision.md`
- Spec: `S001-input-and-modes.md`
- Spec: `S005-page-layout-and-coordinate-system.md`

---

## Kontext

Navigation in notes_v2 ist **keyboard-only** und unterscheidet strikt zwischen **Document Navigation** (zwischen Seiten), **In-Page Navigation** (Scrollen) und **Zoom**. Jede Ebene hat ihren eigenen Modifier-Key und ein visuelles Overlay.

## Ziele

- **Document Nav**: Schnelles Springen zwischen Seiten (`Space` + `WASD`).
- **In-Page Nav**: Präzises Scrollen auf der Seite (`Shift` + `WASD`).
- **Zoom**: Stufenloses und Preset-basiertes Zoomen (`r` + `WASD`).
- **Overlays**: Visuelles Feedback für jeden Modus (Page, Scroll, Zoom).

## 1. Document Navigation (Pages)

**Trigger**: `Space` gedrückt halten.

**Controls**:
- `w`: Vorherige Seite.
- `s`: Nächste Seite.
- `a`: Jump to **First Page**.
- `d`: Jump to **Last Page**.
- `Space` + `Zahl` (Input): Direkt zu Seite X springen (mit Debounce für mehrstellige Zahlen).

**Overlay**:
- Erscheint zentral, solange `Space` gedrückt ist.
- Zeigt aktuelle Seitenzahl / Gesamtseiten (z.B. "Page 5 / 12").
- Zeigt Input-Preview bei Zahleneingabe.

## 2. In-Page Navigation (Scroll)

**Trigger**: `Shift` gedrückt halten.

**Controls**:
- `w`: Scroll Up (Step).
- `s`: Scroll Down (Step).
- `a`: Jump to **Top of Page**.
- `d`: Jump to **Bottom of Page**.
- `Alt` + `w`/`s`: Feineres Scrollen (kleinere Steps).

**Behavior**:
- Smooth Scrolling.
- Nur Y-Achse (da Fixed Width).

## 3. Zoom System

**Trigger**: `r` gedrückt halten.

**Controls**:
- `w`: Zoom In (1 Stufe).
- `s`: Zoom Out (1 Stufe).
- `a`: **Fit Width** (Detail).
- `d`: **Fit Page** (Overview).
- `Alt` + `w`/`s`: Feiner Zoom (kleine Steps).

**Zoom Levels**:
1. **Fit Page**: Ganze Seite sichtbar.
2. **Normal**: 100% (1:1).
3. **Detail**: Fit Width (max zoom).

**Overlay**:
- Erscheint oben mittig, solange `r` gedrückt ist (oder kurz bei Änderung).
- **Design**: 3 Kreise, verbunden durch eine Linie.
    - Kreise repräsentieren die Stufen (Fit Page, Normal, Detail).
    - Aktiver State ist gefüllt/hervorgehoben.
    - Text darunter: "DETAIL", "NORMAL", "FIT PAGE" oder "%".

## 4. Lazy Loading & Transitions

**Memory Management**:
- **Active Window**: Aktuelle Seite +/- 2 Seiten werden im RAM gehalten.
- **Lazy Loading**: Alle anderen Seiten werden entladen (Placeholder) und bei Bedarf nachgeladen.

**Smart Transitions**:
Das Verhalten beim Seitenwechsel hängt von der Distanz (Delta) ab:
- **Delta <= 5** (Nahbereich): **Smooth Scroll Animation** zur Zielseite.
- **Delta > 5** (Fernbereich): **Fade Out / Fade In** (Clean Cut), um visuelle Glitches durch schnelles Scrollen zu vermeiden.

## 5. Implementation & Architecture

Damit das komplexe Zusammenspiel aus Document-Nav, In-Page-Nav, Zoom und Animationen wartbar bleibt, ist eine saubere Architektur essentiell:

- **Central Transition Manager**: Eine zentrale Stelle (Store/Service), die alle Viewport-Änderungen koordiniert. Sie entscheidet basierend auf dem State (Zoom-Level, Delta), welche Animation (Scroll vs. Fade) ausgeführt wird.
- **State Machine**: Der Navigations-Zustand (Idle, Scrolling, Paging, Zooming) muss explizit modelliert sein, um Race Conditions zu verhindern.
- **Decoupled Rendering**: Die Render-Engine reagiert nur auf State-Änderungen des Transition Managers, nicht direkt auf Key-Events.

## Entscheidungen

- D1: **Modifier-Trennung**. `Space`=Doc, `Shift`=Scroll, `r`=Zoom.
- D2: **WASD-Konsistenz**. `w`/`s` ist immer vertikal (Prev/Next, Up/Down, In/Out). `a`/`d` sind Extreme (First/Last, Top/Bottom, Fit/Fit).
- D3: **Overlays**. Visuelles Feedback ist essentiell, da keine permanenten UI-Elemente.
- D4: **Direct Jump**. Zahleneingabe im Page-Mode für schnelle Navigation.
- D5: **Smart Transitions**. Unterscheidung zwischen Scroll (Orientierung behalten) und Jump (schnell ankommen).
- D6: **Centralized Logic**. Navigation und Animationen werden zentral gesteuert, um Spaghetti-Code zu vermeiden.

## Offene Fragen

- Q1: Debounce-Timing für Seitenzahlen (z.B. 300ms)?
- Q2: Genaue Step-Größe für Scroll (Pixel) und Zoom (%)?
