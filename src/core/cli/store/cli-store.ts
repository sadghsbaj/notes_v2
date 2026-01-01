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

        if (ghost.mode === "completion" && cmd) {
            const newCmd = cmd + ghost.text;
            const beforeCmd = state().input.slice(0, parsed.slots[0]?.startIndex ?? 0);
            const afterCmd = state().input.slice(parsed.slots[0]?.endIndex ?? 0);
            actions.setInput(`${beforeCmd}${newCmd} ${afterCmd.trimStart()}`);
            return true;
        }

        if (ghost.mode === "replacement" && cmd) {
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
