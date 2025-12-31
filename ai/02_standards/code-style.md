# notes_v2 – Code Style Guide

## TypeScript

### Strict Mode (Always)

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

- **No `any`**: Verboten. Use `unknown` if type is unknown, dann narrow.
- **No type assertions** (`as`): Nur wenn absolut nötig (z.B. DOM-Events). Prefer type guards.
- **Explicit return types**: Für public functions/components.

---

## Project Structure (Feature-Based)

```
src/
├─ features/
│  ├─ modes/
│  │  ├─ mode-manager.ts
│  │  ├─ mode-indicator.tsx
│  │  ├─ mode-indicator.css.ts
│  │  └─ types.ts
│  ├─ blocks/
│  │  ├─ block-repository.ts
│  │  ├─ block-renderer.tsx
│  │  ├─ block-renderer.css.ts
│  │  ├─ grid/
│  │  │  ├─ grid-cursor.ts
│  │  │  └─ grid-utils.ts
│  │  └─ types.ts
│  ├─ overlays/
│  │  ├─ jump-overlay.tsx
│  │  ├─ jump-overlay.css.ts
│  │  ├─ zoom-overlay.tsx
│  │  └─ types.ts
│  └─ ai-pages/
│     ├─ gemini-client.ts
│     ├─ components/
│     │  ├─ FillBlank.tsx
│     │  ├─ FillBlank.css.ts
│     │  ├─ Table.tsx
│     │  └─ ...
│     └─ types.ts
├─ core/
│  ├─ document/
│  │  ├─ document-store.ts
│  │  ├─ types.ts
│  │  └─ schema.ts (Zod schemas)
│  └─ input/
│     ├─ input-router.ts
│     ├─ keymap.ts
│     └─ types.ts
└─ shared/
   ├─ primitives/ (Button, Input, etc.)
   └─ utils/
```

### Regeln

- **Feature = ein Ordner**: Alles was zusammengehört (Component, Styles, Logic, Types).
- **Keine Cross-Feature-Imports**: Features importieren nur aus `core/` oder `shared/`, nicht voneinander.
- **Unterordner**: Wenn Feature komplex, Unterordner (z.B. `blocks/grid/`).
- **One file, one responsibility**: Component in `.tsx`, Styles in `.css.ts`, Logic in `.ts`, Types in `types.ts`.

---

## File Naming

### Components (Solid.js)

- **PascalCase**: `ModeIndicator.tsx`, `BlockRenderer.tsx`
- **Styles**: `ModeIndicator.css.ts` (same name + `.css.ts`)

### Logic / Utils

- **kebab-case**: `mode-manager.ts`, `grid-utils.ts`, `gemini-client.ts`

### Types

- **`types.ts`** pro Feature (nicht `interface.ts` oder `models.ts`)

---

## Code Style

### Variables / Functions

- **Sprechende Namen**: Keine Abkürzungen.
  - ❌ `const mbr = getMB();`
  - ✅ `const modeManager = getModeManager();`
- **camelCase**: `const currentMode`, `function handleKeydown()`
- **Boolean**: Prefix `is`, `has`, `should`
  - ✅ `const isOverlayOpen`, `const hasSelection`

### Constants

- **SCREAMING_SNAKE_CASE**: Nur für echte Konstanten (nicht reactive state).
  - ✅ `const MAX_ZOOM_LEVEL = 3;`
  - ❌ `const CURRENT_MODE = "normal";` (das ist State, nicht constant)

### Functions

- **Verb-first**: `getMode()`, `setSelection()`, `handleEscape()`
- **Single responsibility**: Eine Funktion = eine Aufgabe.

---

## Components (Solid.js)

### Structure

```tsx
// ModeIndicator.tsx
import { Show } from 'solid-js';
import { modeIndicator } from './ModeIndicator.css';
import type { Mode } from './types';

interface ModeIndicatorProps {
  mode: Mode;
}

export function ModeIndicator(props: ModeIndicatorProps) {
  return (
    <Show when={props.mode !== 'normal'}>
      <div class={modeIndicator}>{props.mode[0].toUpperCase()}</div>
    </Show>
  );
}
```

### Regeln

- **Named exports**: `export function ModeIndicator`, nicht `export default`.
- **Props interface**: Immer `ComponentNameProps`, vor Component.
- **Explicit typing**: Props + Return type (implicit JSX.Element ist ok).
- **No inline styles**: Nur Vanilla Extract classes.

---

## Styling (Vanilla Extract)

### Structure

```ts
// ModeIndicator.css.ts
import { style } from '@vanilla-extract/css';
import { theme } from '@/shared/theme.css';

export const modeIndicator = style({
  position: 'fixed',
  bottom: theme.spacing.md,
  right: theme.spacing.md,
  padding: theme.spacing.sm,
  background: theme.colors.overlay,
  borderRadius: theme.radius.sm,
  fontSize: theme.fontSize.sm,
  color: theme.colors.text,
});
```

### Regeln

- **Theme-Tokens**: Keine Magic Numbers (`16px`), immer `theme.spacing.md`.
- **camelCase**: `const modeIndicator`, nicht `mode-indicator`.
- **No nesting**: Flat styles, composables wenn nötig.
- **Co-Located**: Styles neben Component (`.css.ts` neben `.tsx`).

---

## State Management

### Solid Stores (Fine-Grained)

```ts
// mode-manager.ts
import { createSignal } from 'solid-js';
import type { Mode } from './types';

const [currentMode, setCurrentMode] = createSignal<Mode>('normal');

export function getModeManager() {
  return {
    currentMode,
    transitionTo: (mode: Mode) => setCurrentMode(mode),
  };
}
```

### Regeln

- **Signals > Reactive Objects**: Prefer createSignal für single values.
- **Stores für komplexe State**: createStore nur wenn nested reactivity nötig.
- **Keine globalen Stores**: Features haben lokale Stores, export functions.

---

## Comments (Minimal)

### Wann kommentieren?

- **Nie**: Offensichtlicher Code (Self-Documenting Names).
- **Selten**: Komplexe Algorithmen (besser: refactor zu kleineren functions).
- **Manchmal**: Workarounds, TODOs, Hacks (mit Begründung).

```ts
// ❌ Bad
// Get the current mode
const mode = getModeManager().currentMode();

// ✅ Good (kein Comment nötig)
const currentMode = getModeManager().currentMode();

// ✅ Acceptable (Workaround)
// HACK: Gemini API returns invalid JSON when title contains quotes
const sanitizedTitle = title.replace(/"/g, '\\"');
```

---

## Dependencies (No Cross-Feature)

### Erlaubt

```ts
// features/blocks/block-renderer.tsx
import { getModeManager } from '@/core/input/mode-manager'; // ✅ Core
import { Button } from '@/shared/primitives/Button'; // ✅ Shared
```

### Verboten

```ts
// features/blocks/block-renderer.tsx
import { JumpOverlay } from '@/features/overlays/jump-overlay'; // ❌ Cross-Feature
```

### Fix

- Abstraction via `core/` (z.B. Event-Bus, Manager)
- Oder Component Composition (Parent rendert beide)

---

## Testing

### Strategy

- **Integration > Unit**: Fokus auf User-Flows (Mode-Transitions, Block-Creation, etc.).
- **Unit-Tests**: Nur für reine Logik (Utils, Parsers, Calculations).
- **No tests für jeden Pixel**: Nicht übertreiben, nur kritische Pfade.

### Tools

- **Vitest**: Fast, Vite-native.
- **Solid Testing Library**: Component-Tests (DOM-Interactions).

### Example (Unit)

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

### Example (Integration)

```ts
// mode-transitions.test.ts
import { render, fireEvent } from '@solidjs/testing-library';
import { ModeManager } from './mode-manager';

it('transitions normal → edit on "e" key', async () => {
  const { getByText } = render(() => <ModeManager />);
  await fireEvent.keyDown(document, { key: 'e' });
  expect(getByText('E')).toBeInTheDocument(); // Mode Indicator
});
```

---

## Linting / Formatting

### ESLint (Strict)

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict",
    "plugin:solid/typescript"
  ],
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn"
  }
}
```

### Prettier (Opinionated)

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100
}
```

---

## Anti-Patterns (Verboten)

### 1. God Files

❌ `utils.ts` mit 1000 Zeilen → ✅ `grid-utils.ts`, `string-utils.ts`, etc.

### 2. Magic Numbers

❌ `padding: 16` → ✅ `padding: theme.spacing.md`

### 3. Deep Imports

❌ `import { X } from '@/features/blocks/grid/internals/utils'` → ✅ Export via Feature-Index

### 4. Any

❌ `const data: any` → ✅ `const data: unknown` + Type Guard

### 5. Cross-Feature Coupling

❌ `blocks/` importiert `overlays/` → ✅ Via `core/` Event-System

---

## Summary

- **TypeScript**: Strict, no `any`, explicit types.
- **Structure**: Feature-based, no cross-feature imports.
- **Naming**: PascalCase Components, kebab-case logic, sprechende Namen.
- **Styles**: Vanilla Extract, theme-tokens, co-located.
- **Comments**: Minimal, Code ist self-documenting.
- **Tests**: Integration > Unit, kritische Pfade.
- **No spaghetti**: Modular, single responsibility, clean dependencies.
