import { createSignal } from "solid-js";
import type { ConfirmationState } from "../types/confirm";

// =============================================================================
// CLI State Types
// =============================================================================

export interface CliState {
    /** Current input text */
    input: string;
    /** Cursor position in input */
    cursorPosition: number;
    /** Whether CLI is visible */
    isOpen: boolean;
    /** Command history */
    history: string[];
    /** Current position in history (-1 = not browsing) */
    historyIndex: number;
    /** Draft input saved when entering history navigation */
    inputDraft: string | null;
    /** Selected suggestion index */
    selectedSuggestionIndex: number;
    /** Error message to display */
    errorMessage: string | null;
    /** Active confirmation state (null = not in confirmation mode) */
    confirmation: ConfirmationState | null;
}

export const initialCliState: CliState = {
    input: "",
    cursorPosition: 0,
    isOpen: false,
    history: [],
    historyIndex: -1,
    inputDraft: null,
    selectedSuggestionIndex: 0,
    errorMessage: null,
    confirmation: null,
};

// =============================================================================
// State Primitives
// =============================================================================

export function createCliStateSignal() {
    const [state, setState] = createSignal<CliState>(initialCliState);

    // Load history from localStorage
    const savedHistory = localStorage.getItem("cli-history");
    if (savedHistory) {
        try {
            const parsed = JSON.parse(savedHistory) as unknown;
            if (Array.isArray(parsed)) {
                setState((s) => ({ ...s, history: (parsed as string[]).slice(-50) }));
            }
        } catch {
            /* ignore */
        }
    }

    return { state, setState };
}
