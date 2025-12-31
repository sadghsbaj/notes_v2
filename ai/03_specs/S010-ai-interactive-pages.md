# S010 – AI-Interactive Pages

**Status:** draft  
**Owner:** Colin  
**Last updated:** 2025-12-31  
**Related:**

- Vision: `../01_project/01_vision.md`
- Spec: `S003-document-model-and-storage.md`
- Spec: `S004-pdf-and-image-import-and-rasterization.md`
- Spec: `S006-blocks-system.md`

---

## Kontext

Arbeitsblätter manuell mit Blocks nachbauen = mühsam. **AI-Interactive Pages** transformieren WebP-Pages (Arbeitsblätter) in interaktive, keyboard-steuerbare Components via **Gemini 3.0 Pro**.

**Killer-Feature**: Lückentext, Tabellen, Checkboxen → perfekt steuerbar, konsistent schön, SmartBlocks-fähig.

## Ziele

- WebP → Gemini API → JSON → Interactive Components.
- Keyboard-first Navigation (Tab, Space, Pfeiltasten).
- Layout-Preservation (ähnlich wie Original, aber schöner).
- Freie Blocks auf AI-Pages (gleiche Flexibilität wie WebP).
- Toggle WebP ↔ AI per Hotkey.
- Optional: KI-Lösungen (2. API-Call) → Auto-Check.

## Nicht-Ziele

- Offline AI-Generation (braucht Internet, Fallback = WebP).
- Perfekte 1:1 Layout-Rekonstruktion (ähnlich, nicht identisch).
- AI statt Core-System (AI = Bonus, Core funktioniert ohne).

## Begriffe

- **WebP-Page**: Original (gerasterte PDF-Page, S004), Source of Truth.
- **AI-Page**: Generated Page (Interactive Components aus Gemini-JSON).
- **Component**: React/Solid Element (FillBlank, Table, Checkbox, etc.).
- **structureJson**: Gemini-Output (Layout + Component-Definitionen).
- **userState**: User-Eingaben (Lücken, Checkboxen, Tabellen-Cells).
- **solutionsJson**: Optional, KI-generierte Lösungen (2. API-Call).

## System-Design

### Page-Types (Two Separate Pages)

**WebP-Page** (Source):
- `background.kind = "image"`
- `pageImageId` → WebP
- Freie Blocks (normal usage)
- `aiPageId?` → Link zu AI-Version

**AI-Page** (Derived):
- `background.kind = "ai-interactive"`
- `aiData`:
  - `sourcePageId` → WebP-Page
  - `structureJson` → Gemini-Output
  - `userState` → User-Eingaben
  - `solutionsJson?` → KI-Lösungen
- Freie Blocks (gleiche Flexibilität)

### Toggle-System

- Hotkey (z.B. `t` in normal mode) switcht zwischen WebP ↔ AI.
- Navigation bleibt gleich (nur Rendering ändert sich).
- Beide Pages in `doc.pageOrder` oder AI-Pages "virtual" (nur via Toggle sichtbar)?

## AI-Generation Flow

### Flow 1: Generate AI-Page

1. User auf WebP-Page.
2. Page-Mode → Action `ai` (oder Hotkey).
3. Confirm: "Generate AI version? (requires internet)".
4. **Loading Overlay**:
   - Spinner + "Analyzing page with Gemini...".
   - Esc → Cancel (stop processing, don't save).
5. API-Call: WebP (base64) → Gemini 2.0 Flash.
6. **Retry-Logic**:
   - Auto-Retry bei Network-Error/Überlastung (3× mit Backoff: 1s, 2s, 4s).
   - Bei Final-Failure: "Failed. Retry?" (Manual Retry-Button).
7. Success: Save `structureJson` + create AI-Page.
8. Switch zu AI-Page (viewMode = ai).

### Flow 2: Toggle WebP ↔ AI

1. Hotkey `t` in normal mode.
2. If AI-Page exists → switch.
3. If not → Show "Generate AI version first" Toast.

### Flow 3: Edit AI-JSON (Manual Override)

1. AI-Page aktiv.
2. Page-Mode → Action `json` (oder Hotkey).
3. **CodeMirror-Overlay** öffnet:
   - Edit `structureJson` direkt (JSON).
   - Syntax-Highlighting, Validation.
4. Save → Re-render Components.
5. Esc → Close ohne Save.

### Flow 4: Solutions-Check (Optional)

1. User füllt AI-Page aus (userState).
2. Page-Mode → Action `check`.
3. 2. API-Call: `structureJson + userState` → Gemini → `solutionsJson`.
4. Visual Feedback:
   - Grüne Borders = korrekt.
   - Rote Borders = falsch.
   - Tooltip mit Lösung (optional).
5. User kann korrigieren.

## Gemini API Integration

### Prompt (Konzept)

```
You are a document parser. Analyze this worksheet image and return JSON.

Rules:
- Preserve original text exactly (1:1).
- Identify layout structure (headings, paragraphs, tables, fill-blanks, checkboxes, etc.).
- For fill-blanks: mark positions with unique IDs.
- For tables: identify input vs. static cells.
- Return only valid JSON, no markdown.

Output Schema:
{
  "layout": "vertical",
  "elements": [
    { "type": "heading", "level": 2, "text": "..." },
    { "type": "fill-blank", "text": "...", "blankId": "..." },
    { "type": "table", "rows": N, "cols": M, "cells": [...] },
    { "type": "checkbox-group", "label": "...", "options": [...] }
  ]
}
```

### API Details

- Model: **Gemini 2.0 Flash** (multimodal, gut für Dokumente).
- Input: WebP base64 + Prompt.
- Output: JSON (structureJson).
- Timeout: 30s (mit Retry bei Überlastung).
- Error-Handling: Network, Rate-Limit, Invalid-JSON → Retry oder Fail gracefully.

## Component Library (Iterativ)

**MVP-Set** (initial):
- `Heading` (H1-H3, static)
- `Paragraph` (static text)
- `FillBlank` (Lückentext mit Tiptap-Input)
- `Table` (input vs. static cells, Tab-Navigation)
- `CheckboxGroup` (Space toggle, Multi-Select)
- `RadioGroup` (Pfeiltasten, Single-Select)

**Später**:
- `Dropdown` (Pfeiltasten, Enter select)
- `MatchingPairs` (Zuordnung, Drag mit Tastatur)
- `TrueFalse` (Binary Toggle)
- `NumberedList` (ordered)
- etc.

Alle Components:
- Keyboard-first (Tab, Space, Pfeiltasten).
- SmartBlocks-fähig (Tiptap in Inputs).
- Konsistente Typography (Kalam für Handschrift-Feeling).

## Document Model Erweiterung

### Page Schema (erweitert)

```
Page {
  id: PageId
  widthPx: 800
  heightPx: number
  rotation: 0 | 90 | 180 | 270
  
  background: {
    kind: "blank" | "image" | "ai-interactive"
    
    // WebP-Page
    imageData?: {
      pageImageId: string
      aiPageId?: PageId  // Link zu AI-Version
    }
    
    // AI-Page
    aiData?: {
      sourcePageId: PageId        // Link zu WebP
      structureJson: object       // Gemini-Output
      userState: object           // User-Eingaben
      solutionsJson?: object      // Optional: KI-Lösungen
      generatedAt: timestamp
    }
  }
  
  // Freie Blocks (auf beiden Page-Types)
  blocks: BlockId[]
}
```

### structureJson Example

```json
{
  "layout": "vertical",
  "elements": [
    {
      "type": "heading",
      "level": 2,
      "text": "Aufgabe 1: Lückentext"
    },
    {
      "type": "fill-blank",
      "text": "Die Hauptstadt von Deutschland ist ___.",
      "blankId": "blank1"
    },
    {
      "type": "table",
      "rows": 3,
      "cols": 2,
      "cells": [
        { "row": 0, "col": 0, "text": "Jahr", "type": "static" },
        { "row": 0, "col": 1, "text": "Ereignis", "type": "static" },
        { "row": 1, "col": 0, "text": "1989", "type": "static" },
        { "row": 1, "col": 1, "text": "", "type": "input", "inputId": "cell-1-1" }
      ]
    },
    {
      "type": "checkbox-group",
      "label": "Welche sind Primzahlen?",
      "options": [
        { "id": "opt1", "text": "2" },
        { "id": "opt2", "text": "3" },
        { "id": "opt3", "text": "4" }
      ]
    }
  ]
}
```

### userState Example

```json
{
  "blank1": "Berlin",
  "cell-1-1": "Mauerfall",
  "opt1": true,
  "opt2": true,
  "opt3": false
}
```

## Entscheidungen

- D1: WebP-Page = Source of Truth, AI-Page = Derived Feature.
- D2: Zwei separate Pages (linked via IDs), nicht ein Toggle-Feld.
- D3: Freie Blocks auf AI-Pages (gleiche Flexibilität).
- D4: Gemini 2.0 Flash (multimodal, Document-Parsing).
- D5: CodeMirror für JSON-Editing (Manual Override).
- D6: Auto-Retry bei API-Errors (3× mit Backoff).
- D7: Esc während API-Call → Cancel (don't save).
- D8: Solutions-Check optional (2. API-Call).
- D9: Component-Library iterativ (MVP-Set initial, später erweitern).

## Offene Fragen

- Q1: AI-Pages in pageOrder oder "virtual" (nur via Toggle)?
- Q2: Solutions-Check: inline (grün/rot borders) oder separates Overlay?
- Q3: Prompt-Engineering: wie viel Iteration nötig für gute Qualität?
- Q4: Component-Vielfalt: welche Components für MVP vs. später?
