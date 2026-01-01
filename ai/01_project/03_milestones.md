# notes_v2 – Milestones

**Status:** active  
**Owner:** Colin  
**Last updated:** 2026-01-01

---

## M1: Foundation (Shell & Input)
**Ziel:** Die Basis-UI steht und die Input-Pipeline funktioniert.

- [ ] **App Shell & Layout** (S005, S009)
    - Basic Layout mit festem Page-Space (800px).
    - HUD-Overlay System.
- [ ] **Input & Modes** (S001)
    - Global Key Listener & Mode State (Normal, Edit, Insert, Command).
    - Mode Indicator UI.

## M2: Core System (CLI & Data)
**Ziel:** Das "Betriebssystem" läuft. Man kann Dokumente verwalten und die CLI nutzen.

- [ ] **Advanced Inline CLI** (S002)
    - CLI-Overlay mit Animation.
    - Slot-Parser & Ghost-Text Engine.
    - Basic Commands (`help`, `math`).
- [ ] **Document Model** (S003)
    - JSON-Schema für Pages/Blocks.
    - Local Storage / File System Access.
- [ ] **Filesystem UI & CLI** (S011)
    - Floating "LS" Sidebar.
    - CLI CRUD Commands (`mkdir`, `touch`, `rm`, `mv`, `cp`).
    - Smart Aliases (`@mathe .`).
    - `open` / `cd` Logic.

## M3: Navigation
**Ziel:** Flüssiges Bewegen durch Dokumente.

- [ ] **Navigation** (S008)
    - WASD-Scrolling.
    - Zoom-Logic (Detail/Normal/Fit).

## M4: Content & Editing
**Ziel:** Man kann Notizen schreiben und Blöcke manipulieren.

- [ ] **Block System** (S006)
    - Block-Container & Grid-Snapping.
    - Edit-Mode Actions (Move, Resize, Delete).
    - Selection Logic.
- [ ] **Rich Text Integration** (S007)
    - Tiptap-Setup im Insert-Mode.
    - Markdown-Shortcuts & Styling.

## M5: Advanced Features
**Ziel:** Der volle Funktionsumfang für den Schulalltag.

- [ ] **PDF Engine** (S004)
    - Import & Rasterization (WebP).
    - Background-Rendering für Pages.
- [ ] **AI Integration** (S010)
    - Gemini API Anbindung.
    - Interactive Components (JSON-Editor).

## M6: Optimization
**Ziel:** Performance-Tuning für große Dokumente.

- [ ] **Performance Tuning**
    - Lazy Loading für Pages/Images.
    - Virtualisierung (falls nötig).
