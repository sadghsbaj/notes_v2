/**
 * CLI Overlay Component
 *
 * Main container for the CLI interface. Syncs with Command mode.
 * Delegates rendering to modular sub-components.
 */

import { cliStore } from "@core/cli";
import { Mode, modeStore } from "@core/mode";
import { Terminal } from "lucide-solid";
import { Show, createEffect, createSignal, onCleanup, onMount } from "solid-js";
import * as styles from "./CliOverlay.css";
import {
    CliConfirmation,
    CliError,
    CliHelpTooltip,
    CliInput,
    CliMathResult,
    CliParamHints,
    CliSuggestionBadge,
} from "./components";
import { useCliKeyboard } from "./hooks";

export function CliOverlay() {
    const [isExiting, setIsExiting] = createSignal(false);
    const isInConfirmation = () => cliStore.state().confirmation !== null;

    // Sync CLI with Command mode
    createEffect(() => {
        const currentMode = modeStore.mode();
        const cliOpen = cliStore.isOpen();
        if (cliOpen && currentMode !== Mode.Command) {
            cliStore.close();
        }
    });

    function handleClose() {
        // If in confirmation, cancel it first
        if (isInConfirmation()) {
            cliStore.cancelConfirmation();
            return;
        }

        setIsExiting(true);
        setTimeout(() => {
            setIsExiting(false);
            cliStore.close();
            modeStore.returnFromCommand();
        }, 120);
    }

    const { handleKeyDown } = useCliKeyboard({ onClose: handleClose });

    // Global keyboard listener for confirmation mode
    // (since CliInput is not rendered and can't capture keys)
    createEffect(() => {
        if (!isInConfirmation()) return;

        function onGlobalKeyDown(e: KeyboardEvent) {
            // Only handle when in confirmation mode
            if (cliStore.state().confirmation) {
                handleKeyDown(e);
            }
        }

        window.addEventListener("keydown", onGlobalKeyDown);
        onCleanup(() => window.removeEventListener("keydown", onGlobalKeyDown));
    });

    return (
        <Show when={cliStore.isOpen() || isExiting()}>
            <div class={`${styles.overlay} ${isExiting() ? styles.exiting : styles.entering}`}>
                <CliHelpTooltip />
                <div class={styles.inputContainer}>
                    <Terminal size={16} class={styles.icon} />

                    <Show
                        when={isInConfirmation()}
                        fallback={
                            <>
                                <CliInput onKeyDown={handleKeyDown} />
                                <CliSuggestionBadge />
                                <CliParamHints />
                                <CliMathResult />
                                <CliError />
                            </>
                        }
                    >
                        <CliConfirmation />
                    </Show>
                </div>
            </div>
        </Show>
    );
}

export default CliOverlay;
