# notes_v2 – Techstack

## Core

### **Solid.js**
- **Warum**: Fine-grained reactivity perfekt für viele State-Updates (Modi, Overlays, Selection). Kein VDOM-Overhead, kleine Bundle-Size (~7kb), TypeScript-first.
- **Alternative erwogen**: React (zu groß), Vue (VDOM), Svelte (gut, aber Solid reaktiver).

### **TypeScript**
- **Warum**: Type-Safety für komplexes State-Management, Mode-System, Document Model.

### **Vite**
- **Warum**: Schnellster Build-Tool, ES-Module native, HMR, perfekt für Solid.

---

## Styling

### **Vanilla Extract**
- **Warum**: Type-safe CSS-in-TS, Zero-Runtime, Scoped Styles (wichtig für viele Overlays), Theme-Tokens für Dark/Light Mode, Co-Located Styles.
- **Alternative erwogen**: UnoCSS (schnell, aber weniger Type-Safety), SCSS (kein TS).

---

## Animation

### **Motion One**
- **Warum**: Klein (5kb), WAAPI-basiert (GPU-accelerated), Spring Physics, perfekt für Overlays/HUD/Zoom-Feedback.
- **Use-Cases**: Overlay Enter/Exit, Zoom-Overlay, Mode Indicator, Smooth Scroll, Block Move/Resize.

### **Solid Transition Group**
- **Warum**: Solid-native Enter/Exit-Transitions für Overlays, Toasts, Jump-Overlay.

---

## Rich Text

### **Tiptap**
- **Warum**: Headless Editor, flexibel für Custom Nodes (Mathe, Diagramme, Bilder), Keyboard-first, Solid-kompatibel (solid-tiptap).
- **Use-Cases**: Block-Content (insert mode), SmartBlocks in AI-Components (Lückentext, Tabellen-Cells).

### **KaTeX**
- **Warum**: Fast Math Rendering (LaTeX), für Mathe-Custom-Nodes in Tiptap.
- **Hinweis**: Eigene Syntax-Parsing-Logik vor KaTeX (für vereinfachte Eingabe).

---

## SmartBlocks / Custom Nodes

### **Math.js**
- **Warum**: Math Evaluation (Calc Mode, inline Berechnungen in Blocks).
- **Use-Cases**: `17*23` → 391, Formeln auswerten.

### **Function-plot**
- **Warum**: 2D-Graphen rendern (Custom Node für Funktionen).
- **Use-Cases**: SmartBlock "Graph" (f(x) = x²).

### **Mermaid**
- **Warum**: Diagramme rendern (Flowcharts, Sequenzen, etc.).
- **Use-Cases**: SmartBlock "Diagramm" (Text → SVG).

---

## AI / Utilities

### **Gemini SDK** (`@google/generative-ai`)
- **Warum**: Gemini 3.0 Pro für AI-Interactive Pages (WebP → JSON).
- **Use-Cases**: Document-Parsing, Solutions-Check (S010).

### **Zod**
- **Warum**: Schema-Validation für Gemini-Responses, Document Model, User-Input.
- **Use-Cases**: Runtime-Validation, Type-Safety für API-Daten.

### **CodeMirror 6**
- **Warum**: JSON-Editor für AI-JSON-Override (S010).
- **Use-Cases**: Manual Override wenn KI versagt.

---

## Solid Ecosystem

### **@solid-primitives/keyboard**
- **Warum**: Solid-optimiertes Keyboard-Event-Handling (perfekt für Input-System, S001).
- **Use-Cases**: Global Keydown-Listener, Mode-Shortcuts.

### **@solid-primitives/storage**
- **Warum**: Reactive LocalStorage-Wrapper (für global Settings, S003).

### **@solid-primitives/event-listener**
- **Warum**: Event-Delegation-Helper (für Performance).

### **Solid Router** (optional)
- **Warum**: Falls Multi-Doc-Navigation (später).
- **Hinweis**: Erstmal nicht nötig (Single-Doc-Focus).

---

## Icons

### **Lucide**
- **Warum**: Tree-shakable SVG-Icons, clean Design (HUD/Cockpit-Style), klein.
- **Use-Cases**: Mode Indicator Icons, HUD-Elements, Overlays.

---

## Android (Capacitor)

### **Capacitor**
- **Warum**: Native Wrapper für Android, Web-basiert, einfacher als React Native.
- **Plugins**: Filesystem, StatusBar, Keyboard.

### **Capacitor Filesystem**
- **Warum**: Lokale Speicherung (Document-Ordner, atomic writes, S003).

### **Kotlin Plugin (Custom)**
- **Warum**: PDF-Rasterization (S004), ML Kit Scanner-Integration, WebP-Konvertierung.
- **Hinweis**: Selbst gebaut, keine Library.

---

## Entscheidungen

- **D1**: Solid.js > React/Vue (Performance, Reactivity).
- **D2**: Vanilla Extract > UnoCSS/Tailwind (Type-Safety, Theme-System).
- **D3**: Motion One > GSAP (Bundle-Size, ausreichend mächtig).
- **D4**: Tiptap = einziger Content-Type (keine separaten Block-Types).
- **D5**: Gemini 3.0 Pro (nicht GPT-4V, günstiger + gut genug).
- **D6**: Zod für Validation (Runtime-Safety).
- **D7**: CodeMirror 6 für JSON-Editing (Power-User-Feature).

---

## Nicht genutzt (bewusst)

- **React**: Zu groß, VDOM-Overhead.
- **Tailwind/UnoCSS**: Weniger Type-Safety als Vanilla Extract.
- **GSAP**: Zu groß, Motion One reicht.
- **Framer Motion**: Nur für React.
- **Quill/Slate**: Weniger flexibel als Tiptap.
- **GPT-4 Vision**: Teurer als Gemini, nicht nötig.
