# S007 – Rich Text (Tiptap Integration)

**Status:** draft  
**Owner:** Colin  
**Last updated:** 2025-12-31  
**Related:**

- Vision: `../01_project/01_vision.md`
- Spec: `S001-input-and-modes.md`
- Spec: `S006-blocks-system.md`

---

## Kontext

Blocks nutzen **Tiptap** als Rich-Text-Engine (insert mode). Tiptap ist flexibel: plain text, richtext, custom nodes für Mathe/Diagramme/Bilder.

Nur **aktiver Block** rendert Tiptap-Instanz (Performance), Rest = static HTML.

## Ziele

- Tiptap als einziger Block-Content-Type (flexibel für alles).
- Keyboard-first Editing (Hotkeys > UI).
- Custom Nodes für Mathe/Diagramme/Bilder (später erweitbar).
- Plain Text möglich (kein Zwang zu Richtext).

## Nicht-Ziele

- Multiple Block-Types (nur Tiptap).
- WYSIWYG-Toolbar (nur Hotkeys).
- Collaborative Editing.

## Begriffe

- **Tiptap**: Headless Richtext-Editor.
- **Custom Node**: Tiptap-Extension für spezielle Content (Mathe, Diagramme).
- **Insert Mode**: Schreiben in Block (Tiptap aktiv, S001).
- **Serialize**: Tipt ap JSON → Document Model.

## Tiptap-Features

### Core (MVP)

- Plain Text / Rich Text (Bold, Italic, Underline).
- Headings (H1-H3).
- Lists (Bullet, Numbered).
- Links.

### Custom Nodes (später)

- Mathe (LaTeX, inline/block).
- Diagramme (Mermaid, etc.).
- Bilder (inline, keine freien Image-Blocks).

### Hotkeys (Konzept)

- Ctrl+B: Bold.
- Ctrl+I: Italic.
- `/`: Slash-Menu für Node-Insertion (später).

## Performance

- **Lazy Rendering**: Nur aktiver Block = Tiptap-Instanz.
- **Static HTML**: Andere Blocks = readonly HTML (Tiptap JSON → HTML).
- **Re-Hydration**: Bei Selection → Tiptap-Instanz re-create aus JSON.

## Entscheidungen

- D1: Tiptap als einziger Content-Type (kein "text block" vs "richtext block").
- D2: Nur aktiver Block hat Tiptap-Instanz.
- D3: Custom Nodes für Mathe/Diagramme/Bilder (später erweitbar).
- D4: Hotkeys > Toolbar (keine WYSIWYG-UI).
- D5: Serialize: Tiptap JSON = Block.data (S006).