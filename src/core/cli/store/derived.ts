import { createMemo } from "solid-js";
import { evaluateMath, isMathExpression } from "../commands/math-eval";
import { getArgs, getCommand, getCurrentArgIndex, isInCommandSlot, parseInput } from "../parser/slot-parser";
import { actionRegistry } from "../registry/action-registry";
import type { SearchResult } from "../search/fuzzy";
import type { Action, ParamRuntime } from "../types/action";
import type { GhostText } from "../types/ghost";
import { emptyGhostText } from "../types/ghost";
import type { ParsedInput, Slot } from "../types/slot";
import type { CliState } from "./state";

// =============================================================================
// Param Completion Helpers
// =============================================================================

/**
 * Get completion options for a param based on its type and help.options
 */
function getParamOptions(param: ParamRuntime): string[] {
    if (param.help?.options && param.help.options.length > 0) {
        return param.help.options;
    }
    return [];
}

/**
 * Find best matching option for current input
 * Returns: { value, isPrefix } or null
 */
function findParamMatch(input: string, options: string[]): { value: string; isPrefix: boolean } | null {
    if (options.length === 0 || input === "" || input === "?") {
        return null;
    }

    const inputLower = input.toLowerCase();

    // Check for exact match - no completion needed
    for (const opt of options) {
        if (opt.toLowerCase() === inputLower) {
            return null;
        }
    }

    // First: exact prefix match
    for (const opt of options) {
        const optLower = opt.toLowerCase();
        if (optLower.startsWith(inputLower) && optLower !== inputLower) {
            return { value: opt, isPrefix: true };
        }
    }

    // Second: contains/fuzzy match (not prefix)
    for (const opt of options) {
        const optLower = opt.toLowerCase();
        if (optLower.includes(inputLower) && !optLower.startsWith(inputLower)) {
            return { value: opt, isPrefix: false };
        }
    }

    // Third: check for typos - simple Levenshtein-like detection
    // If input is similar enough to an option (e.g., "cntent" vs "content")
    for (const opt of options) {
        if (isSimilar(input, opt)) {
            return { value: opt, isPrefix: false };
        }
    }

    return null;
}

/**
 * Simple similarity check for typo detection
 */
function isSimilar(input: string, target: string): boolean {
    const inputLower = input.toLowerCase();
    const targetLower = target.toLowerCase();

    // If lengths are too different, not similar
    if (Math.abs(inputLower.length - targetLower.length) > 2) {
        return false;
    }

    // Count matching characters
    let matches = 0;
    for (const char of inputLower) {
        if (targetLower.includes(char)) {
            matches++;
        }
    }

    // If more than 70% of chars match, consider similar
    const threshold = Math.min(inputLower.length, targetLower.length) * 0.7;
    return matches >= threshold && inputLower.length >= 2;
}

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

    // Current argument value
    const currentArgValue = createMemo<string>(() => {
        const argIdx = currentArgIndex();
        if (argIdx === null) return "";
        const argSlots = args();
        return argSlots[argIdx]?.value ?? "";
    });

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

    // Current param (for the active argument)
    const currentParam = createMemo<ParamRuntime | null>(() => {
        const action = resolvedAction();
        const argIdx = currentArgIndex();
        if (!action || argIdx === null) return null;
        return action.params[argIdx] ?? null;
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
        const param = currentParam();
        const argValue = currentArgValue();

        // Math mode - no ghost
        if (mathResult() !== null) {
            return emptyGhostText;
        }

        // Empty input
        if (!cmd || cmd === "") {
            return emptyGhostText;
        }

        // In command slot - show command completion or replacement
        if (isCommandSlot()) {
            const best = selectedSuggestion();
            if (!best) {
                return emptyGhostText;
            }

            const cmdLower = cmd.toLowerCase();
            const matchedLower = best.matchedKey.toLowerCase();

            if (matchedLower.startsWith(cmdLower)) {
                return {
                    mode: "command-completion",
                    commandText: best.matchedKey.slice(cmd.length),
                    activeParamIndex: null,
                    paramNames: [],
                    paramCompletionText: "",
                    paramReplacementText: "",
                    showHelp: false,
                };
            }
            return {
                mode: "command-replacement",
                commandText: best.matchedKey,
                activeParamIndex: null,
                paramNames: [],
                paramCompletionText: "",
                paramReplacementText: "",
                showHelp: false,
            };
        }

        // In argument slot - always params mode with optional completion/replacement
        if (action && action.params.length > 0) {
            const argIdx = currentArgIndex() ?? 0;
            const paramNames = action.params.map((p) => (p.optional ? `[${p.name}]` : p.name));
            const activeIdx = Math.min(argIdx, action.params.length - 1);

            // Base params result
            const result: GhostText = {
                mode: "params",
                commandText: "",
                activeParamIndex: activeIdx,
                paramNames,
                paramCompletionText: "",
                paramReplacementText: "",
                showHelp: false,
                help: param?.help,
            };

            // Check for help request ("?")
            if (argValue === "?") {
                result.showHelp = true;
                return result;
            }

            // Check for param completion/replacement
            if (param && argValue !== "") {
                const options = getParamOptions(param);
                const match = findParamMatch(argValue, options);

                if (match) {
                    if (match.isPrefix) {
                        result.paramCompletionText = match.value.slice(argValue.length);
                    } else {
                        result.paramReplacementText = match.value;
                    }
                }
            }

            return result;
        }

        return emptyGhostText;
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
        currentArgValue,
        currentParam,
        suggestions,
        selectedSuggestion,
        resolvedAction,
        mathResult,
        ghostText,
    };
}

export type CliDerivedState = ReturnType<typeof createCliDerivedState>;
