# S002 – Action System & Advanced CLI

**Status:** draft  
**Owner:** Colin  
**Last updated:** 2026-01-01  
**Related:**

- Vision: `../01_project/01_vision.md`
- Spec: `S001-input-and-modes.md`
- Spec: `S006-blocks-system.md`

---

## Kontext

notes_v2 nutzt eine **Advanced Inline CLI** (Command Mode) für alle komplexen Interaktionen. Statt Sub-Modi gibt es eine intelligente Befehlszeile mit Fuzzy-Search, Slot-basierter Parameter-Eingabe und Inline-Feedback.

## Ziele

- **OP Inline CLI**: Extrem mächtig, aber visuell minimal (eine Zeile).
- **Smart Autocomplete**: Unterscheidung zwischen Completion und Replacement.
- **Slot-System**: Klare Trennung von Command und Argumenten.
- **Inline Math**: Rechnen direkt in der CLI.
- **Fuzzy Search**: Prefix-gewichtet für schnelle Treffer.

## Begriffe

- **Command**: Der Befehl selbst (Slot 0), z.B. `page-add`.
- **Slot**: Ein Eingabe-Segment. Slot 0 = Command, Slot 1..n = Argumente.
- **Ghost-Text**: Vorschau-Text hinter dem Cursor (grau).
- **Parameter-Hint**: Anzeige des aktuellen Parameters (z.B. **count**).

## CLI Logic & Interaction

### 1. Slot-System
Die Eingabe wird durch Leerzeichen in Slots geteilt.
`[Slot 0] [Slot 1] [Slot 2] ...`

**Quoted Strings:**
Parameter mit Leerzeichen müssen in Anführungszeichen gesetzt werden.
- `page-title "Nullstellen berechnen"` → Slot 1 ist `Nullstellen berechnen`.

Beispiel: `page-add 1 -1 600`
- Slot 0 (Command): `page-add`
- Slot 1 (Count): `1`
- Slot 2 (Pos): `-1` (Ende)
- Slot 3 (Height): `600`

### 2. Autocomplete & Ghost-Text
Das System schlägt basierend auf dem aktuellen Slot vor.

**Completion vs. Replacement:**
- **Completion**: Wenn der Input ein Prefix des besten Treffers ist.
    - Input: `page-a`
    - Match: `page-add`
    - Ghost: `dd` (ergänzt den Rest)
    - Action: `Tab` vervollständigt.
- **Replacement**: Wenn der Input fuzzy matcht, aber kein Prefix ist.
    - Input: `padd`
    - Match: `page-add`
    - Ghost: `page-add` (zeigt den vollen korrekten Befehl)
    - Action: `Tab` ersetzt `padd` durch `page-add`.

**Parameter-Hints:**
Wenn Slot 0 validiert ist, zeigt der Ghost-Text die erwarteten Parameter für die nächsten Slots.
- Input: `page-add ` (Space gedrückt)
- Ghost: `count pos height`
- Aktiver Slot wird **fett** oder hervorgehoben dargestellt.

### 3. Fuzzy Search
Suche in Slot 0 (Commands) ist fuzzy, aber gewichtet:
1. **Exact Match**: Höchste Prio.
2. **Prefix Match**: `page` matcht `page-add` sehr stark.
3. **Fuzzy Match**: `padd` matcht `page-add`.

### 4. History
- `Pfeil Hoch`: Vorheriger Befehl.
- `Pfeil Runter`: Nächster Befehl.
- History bleibt über Sessions erhalten (optional).

### 5. Inline Math
Jederzeit im CLI möglich.
- Trigger: `=` am Ende einer Eingabe.
- Input: `3*17=`
- Display: Nach dem `=` erscheint das Ergebnis: `3*17= 51`
- Action: `Enter` kopiert Ergebnis (51) in Clipboard und leert CLI. `Esc` bricht ab.

## Action Registry

Jede Action definiert ihre Slots:

```typescript
interface Action {
  id: string;       // z.B. "page-add"
  aliases?: string[]; // z.B. "pa"
  params: Parameter[];
  handler: (args: any[]) => void;
}

interface Parameter {
  name: string;     // z.B. "count"
  type: 'number' | 'string' | 'boolean';
  default?: any;
  optional?: boolean;
}
```

## Beispiele

### Page Add
User will 1 Seite am Ende mit 600px Höhe einfügen.
1. `Ctrl + .` (Command Mode)
2. Tippt `padd` → Ghost zeigt `page-add`.
3. `Tab` → Input wird `page-add `.
4. Ghost zeigt: `**count** pos height`.
5. Tippt `1` `Space`.
6. Ghost zeigt: `count **pos** height`.
7. Tippt `-1` `Space`.
8. Ghost zeigt: `count pos **height**`.
9. Tippt `600`.
10. `Enter` → Action ausgeführt.

### Math
1. `Ctrl + .` (Command Mode)
2. Tippt `1200/2=`
3. Anzeige: `1200/2= 600`
4. `Enter` → 600 im Clipboard.

## Entscheidungen

- D1: **Space als Separator**. Einfach und schnell.
- D2: **Tab für Autocomplete**. Standard-Verhalten.
- D3: **Inline Error**. Fehler (z.B. falscher Typ) werden direkt rot im Ghost-Text oder unter der Zeile angezeigt.
- D4: **Keine Dropdowns**. Alles passiert inline.
- D5: **Quotes für Strings**. Strings mit Leerzeichen müssen in `""` stehen.

## Offene Fragen

- Q1: Details zur Animation (Fade/Slide/Expand)?
