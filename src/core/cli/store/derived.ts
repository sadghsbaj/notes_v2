import { createMemo } from "solid-js";
import { evaluateMath, isMathExpression } from "../commands/math-eval";
import { getArgs, getCommand, getCurrentArgIndex, isInCommandSlot, parseInput } from "../parser/slot-parser";
import { actionRegistry } from "../registry/action-registry";
import type { SearchResult } from "../search/fuzzy";
import type { Action, ParamRuntime } from "../types/action";
import type { GhostTextExtended, ParamCompletionResult } from "../types/ghost";
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
    // Use help.options if defined
    if (param.help?.options && param.help.options.length > 0) {
        return param.help.options;
    }
    return [];
}

/**
 * Find best matching option for current input
 */
function findParamCompletion(input: string, options: string[]): ParamCompletionResult | null {
    if (options.length === 0 || input === "" || input === "?") {
        return null;
    }

    const inputLower = input.toLowerCase();

    // First: exact prefix match
    for (const opt of options) {
        if (opt.toLowerCase().startsWith(inputLower)) {
            const isComplete = opt.toLowerCase() === inputLower;
            if (!isComplete) {
                return {
                    value: opt,
                    isPrefix: true,
                };
            }
        }
    }

    // Second: contains match (fuzzy-like)
    for (const opt of options) {
        if (opt.toLowerCase().includes(inputLower)) {
            return {
                value: opt,
                isPrefix: false,
            };
        }
    }

    return null;
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
    const ghostText = createMemo<GhostTextExtended>(() => {
        const cmd = command();
        const action = resolvedAction();
        const param = currentParam();
        const argValue = currentArgValue();

        // Math mode - no ghost, result shown separately
        if (mathResult() !== null) {
            return emptyGhostText;
        }

        // Empty input
        if (!cmd || cmd === "") {
            return emptyGhostText;
        }

        // In command slot - show completion or replacement
        if (isCommandSlot()) {
            const best = selectedSuggestion();
            if (!best) {
                return emptyGhostText;
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

        // In argument slot
        if (action && action.params.length > 0) {
            const argIdx = currentArgIndex() ?? 0;
            const paramNames = action.params.map((p) => (p.optional ? `[${p.name}]` : p.name));
            const activeIdx = Math.min(argIdx, action.params.length - 1);

            // Check for help request ("?")
            if (argValue === "?" && param?.help) {
                return {
                    mode: "help",
                    text: "",
                    activeParamIndex: activeIdx,
                    paramNames,
                    help: param.help,
                };
            }

            // Check for param completion (enum options, etc.)
            if (param && argValue !== "") {
                const options = getParamOptions(param);
                const completion = findParamCompletion(argValue, options);

                if (completion) {
                    // Show completion or replacement for param
                    if (completion.isPrefix) {
                        return {
                            mode: "completion",
                            text: completion.value.slice(argValue.length),
                            activeParamIndex: activeIdx,
                            paramNames,
                            paramCompletion: completion,
                        };
                    }
                    return {
                        mode: "replacement",
                        text: completion.value,
                        activeParamIndex: activeIdx,
                        paramNames,
                        paramCompletion: completion,
                    };
                }
            }

            // Default: show param hints
            return {
                mode: "params",
                text: "",
                activeParamIndex: activeIdx,
                paramNames,
                help: param?.help,
            };
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
