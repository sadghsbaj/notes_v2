/**
 * CLI Keyboard Hook
 *
 * Handles keyboard events for the CLI overlay.
 * In confirmation mode, only accepts choice keys or Escape.
 */

import { cliStore } from "@core/cli";

export interface UseCliKeyboardOptions {
    onClose: () => void;
}

export function useCliKeyboard(options: UseCliKeyboardOptions) {
    function handleKeyDown(e: KeyboardEvent) {
        const confirmation = cliStore.state().confirmation;

        // Confirmation mode - only accept choice keys or Escape
        if (confirmation) {
            e.preventDefault();

            if (e.key === "Escape") {
                cliStore.cancelConfirmation();
                return;
            }

            // Check if key matches any choice
            const choice = confirmation.config.choices.find((c) => c.key.toLowerCase() === e.key.toLowerCase());

            if (choice) {
                cliStore.handleConfirmChoice(choice.value);
            }
            return;
        }

        // Normal mode
        switch (e.key) {
            case "Escape":
                e.preventDefault();
                options.onClose();
                break;
            case "Enter":
                e.preventDefault();
                cliStore.execute();
                break;
            case "Tab":
                e.preventDefault();
                cliStore.applyCompletion();
                break;
            case "ArrowUp":
                e.preventDefault();
                // History browsing takes priority over suggestion selection
                if (cliStore.state().historyIndex !== -1) {
                    cliStore.historyUp();
                } else if (cliStore.suggestions().length > 0 && cliStore.isCommandSlot()) {
                    cliStore.selectPrevSuggestion();
                } else {
                    cliStore.historyUp();
                }
                break;
            case "ArrowDown":
                e.preventDefault();
                // History browsing takes priority over suggestion selection
                if (cliStore.state().historyIndex !== -1) {
                    cliStore.historyDown();
                } else if (cliStore.suggestions().length > 0 && cliStore.isCommandSlot()) {
                    cliStore.selectNextSuggestion();
                } else {
                    cliStore.historyDown();
                }
                break;
        }
    }

    return { handleKeyDown };
}
