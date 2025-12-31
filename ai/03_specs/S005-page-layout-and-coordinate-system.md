# S005 – Page Layout & Coordinate System

**Status:** draft  
**Owner:** Colin  
**Last updated:** 2025-12-31  
**Related:**

- Vision: `../01_project/01_vision.md`
- Spec: `S001-input-and-modes.md`
- Spec: `S003-document-model-and-storage.md`
- Spec: `S004-pdf-and-image-import-and-rasterization.md`
- Spec: S006 Blocks System (planned)
- Spec: S008 Navigation Model (planned)

---

## Kontext

notes_v2 zeigt Dokumente als seitenbasierte Container (GoodNotes-style), auf denen Blocks frei positioniert werden können.

Damit Zoom/Resize/DPR und Block-Interaktion robust funktionieren, brauchen wir ein klares Koordinatensystem:
- Wo werden Block-Positionen gespeichert?
- Wie werden sie im Viewport gerendert?
- Wie funktioniert Hit-Testing bei Zoom?

Diese Spec definiert das Coordinate System, Zoom-Levels, Transform-Logik und Z-Order für Blocks.

## Ziele (Goals)

- G1: Stabile, zoom-unabhängige Block-Koordinaten (Single Source of Truth).
- G2: Keyboard-only Zoom ohne horizontalen Scroll (nur Y-Achsen-Navigation).
- G3: Crisp Rendering bei verschiedenen DPRs ohne manuelle Skalierung.
- G4: Hit-Testing und Block-Selection funktionieren zuverlässig bei jedem Zoom.
- G5: Performance: Transform-Berechnungen sind billig (pure functions, keine DOM-Queries).
- G6: Erweiterbar für verschiedene Anchor-Typen (page-anchored vs viewport-anchored Blocks).

## Nicht-Ziele (Non-goals)

- NG1: Deep-Zoom / Tiling-System (Zoom bleibt auf Page-Level).
- NG2: Multi-Page-Selection / Range-Selection über Seitengrenzen hinweg.
- NG3: Frei rotierbare Pages in beliebigen Winkeln (nur 90°-Schritte).
- NG4: Auto-Layout / Flowing content (Blocks sind statisch positioniert).
- NG5: Zoom-Navigation Details / Hotkeys (kommt in S008).
- NG6: Image Pre-Processing / Deskew für schiefe Scans (future feature, nicht MVP).

## Harte Constraints (Must)

- C1: Page Width ist fix (800px im Page-Space).
- C2: Kein horizontaler Scroll (Page ist immer horizontal zentriert).
- C3: Max Zoom = fit-width (Detail View).
- C4: Block-Koordinaten werden in Page-Space gespeichert, nie in View-Space.
- C5: DPR-Handling ist automatisch via Browser (keine manuellen Pixel-Berechnungen).

## Begriffe (Glossary)

- **Page-Space**: Logisches Koordinatensystem (800px width, variable height), in dem Block-Positionen gespeichert werden.
- **View-Space**: Viewport-Koordinatensystem (abhängig von Zoom/Scroll), für Rendering und Hit-Testing.
- **Scale factor**: `viewportWidth / 800` (aktueller Zoom-Multiplikator).
- **Transform**: Funktion, die Page-Space ↔ View-Space konvertiert.
- **Hit-Testing**: Bestimmung, welcher Block unter einem Viewport-Point liegt.
- **Z-Order**: Rendering- und Selection-Reihenfolge von überlappenden Blocks.
- **Zoom-Level**: Detail View (fit-width) / Normal View (1:1) / Fit Page (komplett sichtbar).
- **DPR (Device Pixel Ratio)**: Verhältnis zwischen physischen und CSS-Pixeln.

## Scope

### In scope

- Page-Space Coordinate System (800px width, dynamic height)
- View-Space Transform (zoom, scroll, centering)
- Zoom-Levels (3-level + fine-tuning)
- Transform functions (page ↔ viewport)
- Hit-Testing rules
- Z-Order model (default + manual control später)
- DPR strategy (oversampling via CSS)

### Out of scope

- Block-Resizing/Moving UX (kommt in S006)
- Navigation Shortcuts (kommt in S008)
- PDF Background Positioning Details (covered in S004)
- Multi-Page Scrolling/Virtualization (kommt in S008)

## Anforderungen

### Functional requirements

- FR1: Block-Positionen werden in Page-Space gespeichert (`{x, y, w, h}` mit x,y in 0-800 bzw. 0-pageHeight).
- FR2: Viewport zeigt Page horizontal zentriert, kein X-Scroll.
- FR3: Zoom-Levels:
  - **Detail View**: fit-width (Page füllt Viewport-Width minus Padding).
  - **Normal View**: 1:1 Scale (800px Page → 800px rendered).
  - **Fit Page**: Page-Höhe komplett sichtbar mit Padding (falls bereits sichtbar, bleibt Scale bei Normal).
  - (Details zu Zoom-Switching/Hotkeys in S008).
- FR4: Page-Rotation: Pages können per CLI in 90°-Schritten gedreht werden (0°, 90°, 180°, 270°).
  - Constraint: Rotation nur auf leeren Seiten (keine Blocks); Command wirft Fehler wenn Blocks existieren.
- FR5: Padding: Alle Zoom-Levels haben horizontales Padding (20px links/rechts), Fit Page hat auch vertikales Padding (20px oben/unten).
- FR6: Transform ist deterministisch und invertierbar (pageCoords ↔ viewportCoords).
- FR7: Hit-Testing prüft Blocks in reverse Z-Order (topmost zuerst).
- FR8: Z-Order default: Array-Index (spätere Blocks sind oben).
- FR9: Z-Order manual: später steuerbar via Commands (bring-forward, send-backward, to-front, to-back).

### Non-functional requirements

- NFR1 (Predictability): Gleiche Page-Coords führen zu gleicher Position, unabhängig von Zoom.
- NFR2 (Performance): Transform-Berechnung ist O(1), keine DOM-Queries.
- NFR3 (Crisp Rendering): WebP-Images (1600px) sehen bei 1.75 DPR scharf aus.
- NFR4 (Testability): Transform-Funktionen sind pure functions (unit-testbar).
- NFR5 (Debuggability): Dev-Tools zeigen Page-Coords + View-Coords für Debug-Zwecke.

## UX / Interaktion (Keyboard-first)

### Block Selection + Hit-Testing

- Flow 1: User selektiert Position (x, y) im Viewport → Hit-Test:
  1. Transform `(x, y)` zu Page-Coords.
  2. Prüfe Blocks in reverse Z-Order.
  3. Erster Block, dessen Rect den Point enthält, wird selektiert.

### Page Rotation

- Flow 2: User hat Page im Querformat gescannt (hochkant eingescannt) → Command `page-rotate 90` → Page wird um 90° gedreht, bleibt 800px breit, Höhe passt sich an.

### Z-Order Manipulation (später)

- Flow 3: Block selektiert → Command `block-forward` → Block wird in Array nach vorne verschoben → Re-Rendering zeigt ihn höher.

---

**Hinweis**: Zoom-Navigation Details (Hotkeys, Cycling, Fine-Zoom) werden in S008 Navigation Model definiert.

## Design / Proposed approach

### High-level Design

Das System trennt strikt zwischen **Page-Space** (logisch, gespeichert) und **View-Space** (Rendering, temporär):

- **Document Model** (S003) speichert Blocks in Page-Space Coords.
- **Renderer** transformiert Page-Coords zu View-Coords via Scale + Offset + Scroll.
- **Hit-Tester** invertiert Transform: View-Coords → Page-Coords → Block-Matching.
- **Zoom Controller** bestimmt Scale factor basierend auf Zoom-Level.

### Datenmodell / Verträge

#### Page (erweitert zu S003)

- `id`: PageId (stabile ID)
- `widthPx`: immer 800 (fix)
- `heightPx`: dynamisch, abhängig von Background-Bild Aspect Ratio (z.B. 1131 bei A4)
- `rotation`: 0 | 90 | 180 | 270 (Grad, default 0)
- `background`:
  - `kind`: "blank" | "image"
  - `pageImageId`: optional, Referenz zu WebP in assets/page-images/

#### Block Rect (Page-Space)

- `x`: 0 - 800 (horizontal position)
- `y`: 0 - pageHeight (vertical position)
- `w`: width
- `h`: height

Alle Koordinaten sind relativ zum **unrotierten** Page-Space (Rotation wird beim Rendering angewendet).

#### Transform State (Runtime)

- `scale`: aktueller Zoom-Factor (z.B. 0.5, 1.0, 1.5)
- `offsetX`: horizontal centering offset (Padding links)
- `scrollY`: aktuelle Y-Scroll Position
- `rotation`: Page-Rotation in Grad (0/90/180/270)

#### Transform Logic (Konzept)

**Page → View:**
- Skaliere Page-Coords mit `scale`
- Addiere horizontal `offsetX` (Zentrierung + Padding)
- Subtrahiere `scrollY` (Y-Achsen-Scroll)
- Wende Rotation an (falls Page rotiert ist)

**View → Page (inverse):**
- Invertiere Rotation
- Invertiere Offset/Scroll
- Dividiere durch `scale`

Transform-Funktionen sind invertierbar und deterministisch (gleiche Input → gleicher Output).

### State & Lifecycle

#### Zoom-Level State Machine

Drei Zoom-Levels:
- **Detail View**: fit-width mit Padding
- **Normal View**: 1:1 (800px Page → 800px rendered)
- **Fit Page**: gesamte Page-Höhe sichtbar mit Padding

(Zoom-Switching/Hotkeys werden in S008 definiert.)

#### Scale Berechnung (Konzept)

- **Detail View**: `(viewportWidth - 40px) / 800` (40px = 2×20px padding)
- **Normal View**: `1.0`
- **Fit Page**: `(viewportHeight - 40px) / pageHeight` (kein min limit, grenzenlos rauszoomen möglich)

#### Offset-Berechnung (horizontal centering)

- `offsetX = (viewportWidth - (800 * scale)) / 2`
- Ergebnis: Page ist immer horizontal zentriert mit gleichmäßigem Padding links/rechts.

### Hit-Testing

Algorithmus:

1. Transform View-Coords zu Page-Coords via `viewToPage()`.
2. Iteriere über `blocks` in **reverse order** (topmost zuerst).
3. Für jeden Block: prüfe ob `pageX ∈ [rect.x, rect.x + rect.w]` und `pageY ∈ [rect.y, rect.y + rect.h]`.
4. Return erster Match (oder `null`).

### Z-Order Model

#### Default (Array-Index)

- `blocks` Array in Page speichert Blocks in Creation-Order.
- Paint-Order = Array-Order (Index 0 → hinten, Index N → vorne).
- Selection cycle (Tab) folgt Array-Order.

#### Manual Control (später)

Commands:

- `block-forward`: Move Block +1 in Array.
- `block-backward`: Move Block -1 in Array.
- `block-to-front`: Move Block to end of Array.
- `block-to-back`: Move Block to start of Array.

Optional: explizites `zIndex` field (Integer) für fine-grained control.

### Page Rotation

- Pages haben `rotation` field: 0° (default), 90°, 180°, 270°.
- Use-Case: Querformat-Seiten, die hochkant gescannt wurden.
- Rotation wird per CLI gesteuert (z.B. `page-rotate <pageId> 90`).
- **Constraint**: Rotation nur auf leeren Seiten erlaubt (keine Blocks); Command wirft Fehler wenn Blocks existieren.
  - Begründung: Block-Coords müssten bei Rotation transformiert werden; Vermeidung durch "nur vor Content-Erstellung drehen".
- Rendering: CSS `transform: rotate()` auf Page-Container.
- Block-Coords bleiben im **unrotierten** Page-Space (keine Neuberechnung nötig).
- Höhe/Breite: bei 90°/270° Rotation wird Page-Height angepasst (z.B. A4 800×1131 → rotiert 800×566).

### DPR Strategy

- **Keine manuelle DPR-Berechnung**.
- CSS: Page-Container hat 800px Breite.
- Image src: 1600px WebP (2x oversampling).
- Browser macht automatisch Downsampling → crisp bei 1.75 DPR ✅.

Begründung: 2x oversampling reicht für gängige Tablets (1.5-2.0 DPR).

### Error handling

- Page ohne `heightPx`: Fallback zu Standard-Höhe (z.B. 1131px = A4).
- Block Rect außerhalb Page-Bounds: Clipping oder Warning (kein Crash).
- Invalid Scale (NaN, Infinity): Fallback zu Scale = 1.

### Performance-Notizen

- Transform-Berechnungen sind pure functions: O(1), CPU-billig.
- Hit-Testing ist O(N) über Blocks, aber N ist klein (<100 Blocks/Page typisch).
- Rendering: CSS `transform: scale()` + `translate()` nutzt GPU.
- Virtualisierung (S008): nur aktive Page + Nachbarn werden gerendert.

## Entscheidungen (Decisions)

- D1: Page-Space ist single source of truth für alle Block-Koordinaten.
- D2: Page Width fix = 800px; Height dynamisch aus WebP aspect ratio.
- D3: Keine X-Achsen-Scroll; Page ist immer horizontal zentriert mit Padding.
- D4: Zoom-Levels: Detail (fit-width + padding), Normal (1:1), Fit Page (fit-height + padding).
- D5: Page-Rotation: 90°-Schritte (0/90/180/270), gesteuert per CLI, **nur auf leeren Seiten** (Command wirft Fehler wenn Blocks existieren).
- D6: Block-Coords bleiben im unrotierten Page-Space (Rotation wird beim Rendering angewendet).
- D7: Transform ist invertierbar (pageToView ↔ viewToPage), berücksichtigt Rotation.
- D8: Hit-Testing in reverse Z-Order (topmost zuerst).
- D9: Z-Order default = Array-Index; manual control später steuerbar (grobe Definition, kein Schema).
- D10: DPR-Handling via CSS oversampling (1600px image, 800px CSS width).
- D11: Kein min Scale limit bei Fit Page (grenzenlos rauszoomen möglich, z.B. Scale 0.1 bei sehr langen Seiten).
- D12: Padding = 20px fix (horizontal bei allen Levels, vertikal bei Fit Page).

## Alternativen (Alternatives considered)

### A1: View-Space als primäres Koordinatensystem

- Pro: Direktes Rendering ohne Transform.
- Contra: Block-Positions ändern sich bei Zoom → Speichern wird chaos, Undo/Redo unmöglich.

### A2: Flexible Page Width (dynamisch)

- Pro: Page passt immer ins Viewport.
- Contra: Block-Positions werden relativ/percentage → Lost precision, komplexe Calculations.

### A3: Unbegrenztes Zoom (auch über fit-width hinaus)

- Pro: Power-User mögen granulare Kontrolle.
- Contra: X-Scroll wird nötig → 2D-Navigation mit Tastatur ist nervig (gegen C2).

### A4: Frei rotierbare Pages (beliebige Winkel)

- Pro: Flexibilität für schief gescannte Seiten.
- Contra: Komplexe Transform-Logik, Hit-Testing schwieriger, kein klarer Use-Case für Schul-Notizen.

## Konsequenzen / Trade-offs

- **Leichter**: Zoom-unabhängige Daten, robuste Serialisierung, klare Transform-Logik, GPU-accelerated Rendering, einfache 90°-Rotation.
- **Schwerer**: Alle UI-Interaktionen müssen Transform + Rotation kennen (aber zentralisiert → ok).
- **Einschränkung**: Kein Zoom über fit-width → Power-User können nicht "näher ran zoomen" als Seitenbreite.
- **Einschränkung**: Nur 90°-Schritte Rotation → schief gescannte Seiten müssen vorm Import korrigiert werden.

## Test-Strategie

### Unit

- Transform logic: pageToView() und viewToPage() sind inverse (round-trip test).
- Rotation: Transform berücksichtigt 90°/180°/270° korrekt.
- Hit-Testing: Block an Position (100, 200) wird bei verschiedenen Scales + Rotations korrekt getroffen.
- Z-Order: 3 überlappende Blocks → topmost wird selektiert.

### Integration

- Zoom-Levels: Detail/Normal/Fit Page rendern korrekt mit Padding in verschiedenen Viewport-Größen.
- Fit Page bei kurzer Seite: Scale bleibt 1 (kein unnötiges Rauszoomen).
- Page-Rotation: 90° Rotation funktioniert, Blocks bleiben korrekt positioniert.
- DPR: WebP sieht auf 1.75 DPR Tablet crisp aus (manual check).

### E2E/Manual

- PDF mit 10 Seiten, unterschiedliche Heights (A4, A5, custom) + rotierte Seiten → alle zeigen korrekt.
- Block-Positionierung bei verschiedenen Zoom-Stufen → bleibt stabil.
- Resize Viewport → Page bleibt zentriert, kein X-Scroll.

**Definition of done**:

- Transform-Logik (inkl. Rotation) implementiert + unit tested.
- Zoom-Level Rendering funktioniert mit korrektem Padding.
- Hit-Testing selektiert korrekte Blocks bei allen Zoom-Stufen.
- DPR rendering ist crisp auf Android Tablet.

## Offene Fragen

*Keine offenen Fragen mehr – alle Decisions finalisiert.*

## Future Features (Post-MVP)

- Image Pre-Processing / Deskew: Kleine Rotationskorrekturen (<5°) für leicht schiefe Scans, mit Cropping.
  - Hinweis: ML Kit Scanner hat bereits Auto-Deskew; bei Bedarf Post-MVP als eigene Spec (S0XX).
