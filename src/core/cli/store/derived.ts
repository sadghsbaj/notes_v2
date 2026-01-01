import { createMemo } from "solid-js";
import { evaluateMath, isMathExpression } from "../commands/math-eval";
import { getArgs, getCommand, getCurrentArgIndex, isInCommandSlot, parseInput } from "../parser/slot-parser";
import { actionRegistry } from "../registry/action-registry";
import type { SearchResult } from "../search/fuzzy";
import type { Action } from "../types/action";
import type { GhostText } from "../types/ghost";
import type { ParsedInput, Slot } from "../types/slot";
import type { CliState } from "./state";

// =============================================================================
// Derived State Factory
// =============================================================================

export function createCliDerivedState(state: () => CliState) {
    const input = createMemo(() => state().input);
    const isOpen = createMemo(() => state().isOpen);
    const cursorPosition = createMemo(() => state().cursorPosition);
    const errorMessage = createMemo(() => state().errorMessage);

    const parsedInput = createMemo<ParsedInput>(() => {
        return parseInput(state().input, state().cursorPosition);
    });

    const command = createMemo(() => getCommand(parsedInput()));
    const args = createMemo<Slot[]>(() => getArgs(parsedInput()));
    const isCommandSlot = createMemo(() => isInCommandSlot(parsedInput()));
    const currentArgIndex = createMemo(() => getCurrentArgIndex(parsedInput()));

    // Search results when typing command
    const suggestions = createMemo<SearchResult[]>(() => {
        const cmd = command();
        if (cmd === null || !isCommandSlot()) return [];
        return actionRegistry.search(cmd);
    });

    const selectedSuggestion = createMemo<SearchResult | null>(() => {
        const suggs = suggestions();
        const idx = state().selectedSuggestionIndex;
        return suggs[idx] ?? null;
    });

    // Resolved action (exact match or selected)
    const resolvedAction = createMemo<Action | null>(() => {
        const cmd = command();
        if (!cmd) return null;
        const exact = actionRegistry.get(cmd);
        if (exact) return exact;
        return selectedSuggestion()?.action ?? null;
    });

    // Math evaluation (when input ends with =)
    const mathResult = createMemo<string | null>(() => {
        const inp = state().input;
        if (!isMathExpression(inp)) return null;
        const result = evaluateMath(inp);
        return result.success ? result.result : null;
    });

    // Ghost text computation
    const ghostText = createMemo<GhostText>(() => {
        const cmd = command();
        const action = resolvedAction();

        // Math mode - no ghost, result shown separately
        if (mathResult() !== null) {
            return {
                mode: "none",
                text: "",
                activeParamIndex: null,
                paramNames: [],
            };
        }

        // Empty input
        if (!cmd || cmd === "") {
            return {
                mode: "none",
                text: "",
                activeParamIndex: null,
                paramNames: [],
            };
        }

        // In command slot - show completion or replacement
        if (isCommandSlot()) {
            const best = selectedSuggestion();
            if (!best) {
                return { mode: "none", text: "", activeParamIndex: null, paramNames: [] };
            }

            const cmdLower = cmd.toLowerCase();
            const matchedLower = best.matchedKey.toLowerCase();

            if (matchedLower.startsWith(cmdLower)) {
                return {
                    mode: "completion",
                    text: best.matchedKey.slice(cmd.length),
                    activeParamIndex: null,
                    paramNames: [],
                };
            }
            return {
                mode: "replacement",
                text: best.matchedKey,
                activeParamIndex: null,
                paramNames: [],
            };
        }

        // In argument slot - show param hints
        if (action && action.params.length > 0) {
            const argIdx = currentArgIndex() ?? 0;
            const paramNames = action.params.map((p) => (p.optional ? `[${p.name}]` : p.name));
            return {
                mode: "params",
                text: "",
                activeParamIndex: Math.min(argIdx, action.params.length - 1),
                paramNames,
            };
        }

        return { mode: "none", text: "", activeParamIndex: null, paramNames: [] };
    });

    return {
        input,
        isOpen,
        cursorPosition,
        errorMessage,
        parsedInput,
        command,
        args,
        isCommandSlot,
        currentArgIndex,
        suggestions,
        selectedSuggestion,
        resolvedAction,
        mathResult,
        ghostText,
    };
}

export type CliDerivedState = ReturnType<typeof createCliDerivedState>;
