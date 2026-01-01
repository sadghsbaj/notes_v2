/**
 * CLI Store - Main entry point
 *
 * Composes state, actions, derived state, and execution logic.
 */

import { evaluateMath } from "../commands/math-eval";
import { createCliActions } from "./actions";
import { createCliDerivedState } from "./derived";
import { parseArgs } from "./executor";
import { createCliStateSignal } from "./state";

// =============================================================================
// CLI Store Factory
// =============================================================================

function createCliStore() {
    // Core state
    const { state, setState } = createCliStateSignal();

    // Derived state (memos)
    const derived = createCliDerivedState(state);

    // Actions
    const actions = createCliActions(state, setState, derived.suggestions);

    // ==========================================================================
    // Completion Logic
    // ==========================================================================

    function applyCompletion(): boolean {
        const ghost = derived.ghostText();
        const parsed = derived.parsedInput();
        const cmd = derived.command();

        // Param completion (in argument slot)
        if (ghost.paramCompletion && !derived.isCommandSlot()) {
            const argIdx = derived.currentArgIndex();
            if (argIdx !== null && argIdx >= 0) {
                const slots = parsed.slots;
                const argSlotIndex = argIdx + 1; // +1 because slot 0 is command
                const argSlot = slots[argSlotIndex];

                if (argSlot) {
                    // Replace the current argument with the completion
                    const before = state().input.slice(0, argSlot.startIndex);
                    const after = state().input.slice(argSlot.endIndex);
                    const newValue = ghost.paramCompletion.value;
                    const newInput = `${before}${newValue}${after}`;
                    actions.setInput(newInput, before.length + newValue.length);
                    return true;
                }
                // No existing arg slot - append
                const inp = state().input;
                const needsSpace = inp.length > 0 && !inp.endsWith(" ");
                const newInput = inp + (needsSpace ? " " : "") + ghost.paramCompletion.value;
                actions.setInput(newInput);
                return true;
            }
        }

        // Command completion
        if (ghost.mode === "completion" && cmd && derived.isCommandSlot()) {
            const newCmd = cmd + ghost.text;
            const beforeCmd = state().input.slice(0, parsed.slots[0]?.startIndex ?? 0);
            const afterCmd = state().input.slice(parsed.slots[0]?.endIndex ?? 0);
            actions.setInput(`${beforeCmd}${newCmd} ${afterCmd.trimStart()}`);
            return true;
        }

        // Command replacement (fuzzy match)
        if (ghost.mode === "replacement" && cmd && derived.isCommandSlot()) {
            const beforeCmd = state().input.slice(0, parsed.slots[0]?.startIndex ?? 0);
            const afterCmd = state().input.slice(parsed.slots[0]?.endIndex ?? 0);
            actions.setInput(`${beforeCmd}${ghost.text} ${afterCmd.trimStart()}`);
            return true;
        }

        return false;
    }

    // ==========================================================================
    // Execute Command
    // ==========================================================================

    async function execute(): Promise<boolean> {
        const inp = state().input.trim();
        if (inp === "") return false;

        // Clear any previous error
        actions.clearError();

        // Save to history
        actions.addToHistory(inp);

        // Math expression - copy result, clear input, but DON'T close
        const mathRes = derived.mathResult();
        if (mathRes !== null) {
            try {
                await navigator.clipboard.writeText(mathRes);
            } catch {
                /* ignore */
            }
            actions.clearInput();
            return true;
        }

        // Regular command
        const action = derived.resolvedAction();
        if (!action) {
            actions.setError(`Unbekannt: ${derived.command() ?? "?"}`);
            return false;
        }

        // Parse arguments with validation
        const { args, error } = parseArgs(action.params, derived.args());
        if (error) {
            actions.setError(error);
            return false;
        }

        // Execute handler
        try {
            await action.handler(args);
            actions.clearInput();
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Fehler";
            actions.setError(msg);
            return false;
        }

        return true;
    }

    // ==========================================================================
    // Public API
    // ==========================================================================

    return {
        // Raw state (for escape hatch)
        state,

        // Derived state
        ...derived,

        // Actions
        ...actions,

        // Command execution
        applyCompletion,
        execute,
    };
}

// Singleton
export const cliStore = createCliStore();
export type CliStore = ReturnType<typeof createCliStore>;
