/**
 * Mode Store – Reactive state for the mode system
 */

import { createMemo, createSignal } from "solid-js";
import { canTransition } from "./transitions";
import { Mode, initialModeState } from "./types";
import type { ModeState } from "./types";

function createModeStore() {
    const [state, setState] = createSignal<ModeState>(initialModeState);

    // Derived state
    const mode = createMemo(() => state().mode);
    const isNormal = createMemo(() => state().mode === Mode.Normal);
    const isEdit = createMemo(() => state().mode === Mode.Edit);
    const isInsert = createMemo(() => state().mode === Mode.Insert);
    const isCommand = createMemo(() => state().mode === Mode.Command);

    // Actions
    function setMode(newMode: Mode): boolean {
        const current = state();
        if (!canTransition(current.mode, newMode)) {
            return false;
        }

        setState((prev) => ({
            mode: newMode,
            previousMode: newMode === Mode.Command ? prev.mode : null,
        }));
        return true;
    }

    function returnFromCommand(): void {
        const current = state();
        if (current.mode !== Mode.Command) return;

        setState((prev) => ({
            mode: prev.previousMode ?? Mode.Normal,
            previousMode: null,
        }));
    }

    function reset(): void {
        setState(initialModeState);
    }

    return {
        // State (readonly signals)
        state,
        mode,
        isNormal,
        isEdit,
        isInsert,
        isCommand,

        // Actions
        setMode,
        returnFromCommand,
        reset,
    };
}

// Singleton store instance
export const modeStore = createModeStore();

// Type for the store
export type ModeStore = ReturnType<typeof createModeStore>;
