import type { Setter } from "solid-js";
import type { CliState } from "./state";

// =============================================================================
// CLI Actions
// =============================================================================

export function createCliActions(state: () => CliState, setState: Setter<CliState>, getSuggestions: () => unknown[]) {
    function open(): void {
        setState((s) => ({
            ...s,
            isOpen: true,
            input: "",
            cursorPosition: 0,
            historyIndex: -1,
            errorMessage: null,
        }));
    }

    function close(): void {
        setState((s) => ({ ...s, isOpen: false, errorMessage: null }));
    }

    function setInput(value: string, cursor?: number): void {
        setState((s) => ({
            ...s,
            input: value,
            cursorPosition: cursor ?? value.length,
            historyIndex: -1,
            selectedSuggestionIndex: 0,
            errorMessage: null,
        }));
    }

    function setCursor(position: number): void {
        setState((s) => ({ ...s, cursorPosition: position }));
    }

    function setError(message: string | null): void {
        setState((s) => ({ ...s, errorMessage: message }));
    }

    function clearError(): void {
        setState((s) => ({ ...s, errorMessage: null }));
    }

    function selectNextSuggestion(): void {
        setState((s) => ({
            ...s,
            selectedSuggestionIndex: Math.min(s.selectedSuggestionIndex + 1, getSuggestions().length - 1),
        }));
    }

    function selectPrevSuggestion(): void {
        setState((s) => ({
            ...s,
            selectedSuggestionIndex: Math.max(s.selectedSuggestionIndex - 1, 0),
        }));
    }

    function historyUp(): void {
        setState((s) => {
            const hist = s.history;
            if (hist.length === 0) return s;
            const newIndex = s.historyIndex === -1 ? hist.length - 1 : Math.max(0, s.historyIndex - 1);
            const entry = hist[newIndex] ?? "";
            return {
                ...s,
                historyIndex: newIndex,
                input: entry,
                cursorPosition: entry.length,
            };
        });
    }

    function historyDown(): void {
        setState((s) => {
            const hist = s.history;
            if (s.historyIndex === -1) return s;
            const newIndex = s.historyIndex + 1;
            if (newIndex >= hist.length) {
                return { ...s, historyIndex: -1, input: "", cursorPosition: 0 };
            }
            const entry = hist[newIndex] ?? "";
            return {
                ...s,
                historyIndex: newIndex,
                input: entry,
                cursorPosition: entry.length,
            };
        });
    }

    function addToHistory(command: string): void {
        setState((s) => {
            const newHistory = [...s.history.filter((h) => h !== command), command].slice(-50);
            localStorage.setItem("cli-history", JSON.stringify(newHistory));
            return { ...s, history: newHistory };
        });
    }

    function clearInput(): void {
        setState((s) => ({
            ...s,
            input: "",
            cursorPosition: 0,
            selectedSuggestionIndex: 0,
        }));
    }

    return {
        open,
        close,
        setInput,
        setCursor,
        setError,
        clearError,
        selectNextSuggestion,
        selectPrevSuggestion,
        historyUp,
        historyDown,
        addToHistory,
        clearInput,
    };
}

export type CliActions = ReturnType<typeof createCliActions>;
