# notes_v2 – Testing Strategy

## Philosophy

- **Integration > Unit**: Fokus auf User-Flows (Mode-Transitions, Block-Creation, AI-Page-Generation).
- **Unit-Tests**: Nur für reine Logik (Utils, Parsers, Calculations, Schemas).
- **No pixel-perfection**: Nicht übertreiben, nur kritische Pfade testen.
- **Fast Feedback**: Tests müssen schnell sein (<1s für Unit, <5s für Integration).

---

## Tools

### **Vitest**
- **Warum**: Fast, Vite-native, TypeScript-first, modern API.
- **Use-Cases**: Unit-Tests (Utils, Schemas), Integration-Tests.

### **Solid Testing Library**
- **Warum**: Component-Tests, DOM-Interactions, Solid-optimiert.
- **Use-Cases**: Mode-Transitions, Overlay-Rendering, Keyboard-Events.

### **Zod (Validation)**
- **Warum**: Schema-Tests (Gemini-Responses, Document Model).
- **Use-Cases**: Runtime-Validation als Test (safeParse → error checking).

---

## What to Test

### Unit Tests (Pure Logic)

**Target**:
- Utils (Grid-Calculations, Coordinate-Transform)
- Parsers (Parameter-Parsing, Range-Syntax)
- Schemas (Zod, Document Model)
- Math (Calculations, Evaluations)

**Example**:
```ts
// grid-utils.test.ts
import { describe, it, expect } from 'vitest';
import { cellToPageCoords } from './grid-utils';

describe('cellToPageCoords', () => {
  it('converts cell (1,1) to (0,0)', () => {
    expect(cellToPageCoords(1, 1, 50)).toEqual({ x: 0, y: 0 });
  });
});
```

### Integration Tests (User-Flows)

**Target**:
- Mode-Transitions (normal → edit → insert)
- Overlay-Open/Close (Jump, Zoom)
- Block-Operations (Create, Move, Delete)
- Keyboard-Events (Esc-Rules, Panic-Reset)

**Example**:
```ts
// mode-transitions.test.ts
import { render, fireEvent } from '@solidjs/testing-library';
import { App } from './App';

describe('Mode Transitions', () => {
  it('transitions normal → edit on "e" key', async () => {
    const { getByTestId } = render(() => <App />);
    await fireEvent.keyDown(document, { key: 'e' });
    expect(getByTestId('mode-indicator')).toHaveTextContent('E');
  });
});
```

---

## What NOT to Test

- **Trivial Code**: Getter/Setter ohne Logik.
- **Third-Party Libraries**: Tiptap, Gemini SDK (nur Integration).
- **Styles**: Kein Visual Regression Testing.
- **Every Component**: Nur kritische Components.

---

## Summary

- **Integration > Unit**: User-Flows wichtiger als einzelne Functions.
- **Fast Tests**: <1s Unit, <5s Integration.
- **Kritische Pfade**: Mode-Transitions, Overlays, Keyboard-Events, Schemas.
