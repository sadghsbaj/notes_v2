/**
 * CLI Store - Main entry point
 *
 * Composes state, actions, derived state, and execution logic.
 */

import { actionRegistry } from "../registry/action-registry";
import type { ConfirmConfig, ConfirmContext, ConfirmResolver } from "../types/confirm";
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
    // Confirmation Context (for conditional confirmations)
    // ==========================================================================

    function getConfirmContext(): ConfirmContext {
        return {
            cwd: "/", // TODO: Get from filesystem service when implemented
        };
    }

    // ==========================================================================
    // Resolve Confirmation Config
    // ==========================================================================

    async function resolveConfirmConfig(
        confirm: ConfirmConfig | ConfirmResolver | undefined,
        args: Record<string, unknown>
    ): Promise<ConfirmConfig | null> {
        if (!confirm) return null;

        // If it's a function (resolver), call it
        if (typeof confirm === "function") {
            return await confirm(args, getConfirmContext());
        }

        // Static config
        return confirm;
    }

    // ==========================================================================
    // Completion Logic
    // ==========================================================================

    function applyCompletion(): boolean {
        const ghost = derived.ghostText();
        const parsed = derived.parsedInput();
        const cmd = derived.command();

        // Param completion (in params mode)
        if (ghost.mode === "params") {
            const completionValue =
                ghost.paramCompletionText !== ""
                    ? derived.currentArgValue() + ghost.paramCompletionText
                    : ghost.paramReplacementText;

            if (completionValue !== "") {
                const argIdx = derived.currentArgIndex();
                if (argIdx !== null && argIdx >= 0) {
                    const slots = parsed.slots;
                    const argSlotIndex = argIdx + 1; // +1 because slot 0 is command
                    const argSlot = slots[argSlotIndex];

                    if (argSlot) {
                        // Replace the current argument with the completion
                        const before = state().input.slice(0, argSlot.startIndex);
                        const after = state().input.slice(argSlot.endIndex);
                        const newInput = `${before}${completionValue}${after}`;
                        actions.setInput(newInput, before.length + completionValue.length);
                        return true;
                    }
                    // No existing arg slot - append
                    const inp = state().input;
                    const needsSpace = inp.length > 0 && !inp.endsWith(" ");
                    const newInput = inp + (needsSpace ? " " : "") + completionValue;
                    actions.setInput(newInput);
                    return true;
                }
            }
        }

        // Command completion
        if (ghost.mode === "command-completion" && cmd) {
            const newCmd = cmd + ghost.commandText;
            const beforeCmd = state().input.slice(0, parsed.slots[0]?.startIndex ?? 0);
            const afterCmd = state().input.slice(parsed.slots[0]?.endIndex ?? 0);
            actions.setInput(`${beforeCmd}${newCmd} ${afterCmd.trimStart()}`);
            return true;
        }

        // Command replacement (fuzzy match)
        if (ghost.mode === "command-replacement" && cmd) {
            const beforeCmd = state().input.slice(0, parsed.slots[0]?.startIndex ?? 0);
            const afterCmd = state().input.slice(parsed.slots[0]?.endIndex ?? 0);
            actions.setInput(`${beforeCmd}${ghost.commandText} ${afterCmd.trimStart()}`);
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

        // Math expression - copy result, clear input
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

        // Check if confirmation is needed
        const confirmConfig = await resolveConfirmConfig(action.confirm, args);
        if (confirmConfig) {
            // Enter confirmation mode instead of executing
            actions.enterConfirmation(confirmConfig, action.id, args);
            return true; // Don't close CLI, show confirmation
        }

        // Execute handler directly (no confirmation needed)
        return await executeHandler(action.id, args);
    }

    // ==========================================================================
    // Execute Handler (called after confirmation or directly)
    // ==========================================================================

    async function executeHandler(actionId: string, args: Record<string, unknown>, choice?: string): Promise<boolean> {
        const action = actionRegistry.get(actionId);
        if (!action) {
            actions.setError(`Action nicht gefunden: ${actionId}`);
            return false;
        }

        try {
            await action.handler(args, choice);
            actions.clearInput();
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Fehler";
            actions.setError(msg);
            return false;
        }

        return true;
    }

    // ==========================================================================
    // Handle Confirmation Choice
    // ==========================================================================

    async function handleConfirmChoice(choiceValue: string): Promise<boolean> {
        const confirmation = state().confirmation;
        if (!confirmation) return false;

        const { pendingActionId, pendingArgs } = confirmation;

        // Cancel choices should just exit confirmation
        if (choiceValue === "cancel") {
            actions.cancelConfirmation();
            return true;
        }

        // Clear confirmation state
        actions.cancelConfirmation();

        // Execute the pending action with the choice
        return await executeHandler(pendingActionId, pendingArgs, choiceValue);
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
        handleConfirmChoice,
    };
}

// Singleton
export const cliStore = createCliStore();
export type CliStore = ReturnType<typeof createCliStore>;
