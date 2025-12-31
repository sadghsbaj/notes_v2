# SXXX – <Titel>

**Status:** draft | accepted | implemented | superseded  
**Owner:** Colin  
**Last updated:** YYYY-MM-DD  
**Related:**

- Vision: `../01_project/01_vision.md`
- ADRs: `../04_adr/` (falls vorhanden)
- Other specs: (Links)

---

## Kontext

Kurz: Warum existiert dieses System? Was ist heute unklar/schmerzhaft? Welche Teile des Produkts hängen davon ab?

## Ziele (Goals)

- G1: ...
- G2: ...
- G3: ...

## Nicht-Ziele (Non-goals)

- NG1: ...
- NG2: ...
- NG3: ...

## Harte Constraints (Must)

- C1: (z.B. 0% Touch/Maus, keyboard-only, offline-only)
- C2: ...
- C3: ...

## Begriffe (Glossary)

- Begriff A: ...
- Begriff B: ...

## Scope

### In scope (wird hier entschieden/beschrieben)

- ...

### Out of scope (bewusst später / andere Spec)

- ...

## Anforderungen

### Functional requirements

- FR1: ...
- FR2: ...
- FR3: ...

### Non-functional requirements

- NFR1 (Performance): ...
- NFR2 (UX): ...
- NFR3 (Stability): ...
- NFR4 (Maintainability): ...

## UX / Interaktion (Keyboard-first)

Beschreibe 2–5 zentrale Flows als Mini-Szenarien.

- Flow 1: Ausgangszustand → Keys → Ergebnis
- Flow 2: ...
  Optional: Keymap-Notizen / Mode-Übergänge / Focus-Regeln.

## Design / Proposed approach

### High-level Design

Ein Absatz + ggf. Bulletpoints (Komponenten/Module, Datenfluss, Zuständigkeiten).

### Datenmodell / Verträge

- Entities/Types (Pseudo-TS)
- IDs, Referenzen, Serialisierung
- Event-/Command-Schnittstellen (falls relevant)

### State & Lifecycle

- Welche Zustände gibt es?
- Welche Übergänge?
- Init/Load/Save
- Undo/Redo (falls relevant)

### Error handling

- Welche Fehlerklassen gibt es?
- Wie werden sie sichtbar (UI / logs)?

### Performance-Notizen

- Bottlenecks (bekannt/vermutet)
- Caching/Lazy strategies (falls relevant)
- Messpunkte (wie erkenne ich „laggt“?)

## Entscheidungen (Decisions)

Liste hier die Punkte, die **fest** sein sollen.

- D1: ...
- D2: ...
  Wenn eine Entscheidung „wirklich fundamental“ ist: daraus eine ADR machen und hier drauf verlinken.

## Alternativen (Alternatives considered)

- A1: ...
  - Pro:
  - Contra:
- A2: ...

## Konsequenzen / Trade-offs

Was wird dadurch leichter, was wird schwerer? Welche späteren Einschränkungen akzeptierst du?

## Test-Strategie

- Unit: ...
- Integration: ...
- E2E/Manual: ...
- „Definition of done“ für diese Spec.

## Migrations / Rollout (falls relevant)

Wenn das bestehende Daten/Code betrifft: Wie migrieren? Wie vermeiden wir Datenverlust?

## Offene Fragen

- Q1: ...
- Q2: ...
- Q3: ...

## Milestones / Tasks (nur grob)

- M1: ...
- M2: ...
