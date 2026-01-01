/**
 * CLI Overlay Component
 *
 * Main container for the CLI interface. Syncs with Command mode.
 * Delegates rendering to modular sub-components.
 */

import { cliStore } from "@core/cli";
import { Mode, modeStore } from "@core/mode";
import { Terminal } from "lucide-solid";
import { Show, createEffect, createSignal } from "solid-js";
import * as styles from "./CliOverlay.css";
import { CliError, CliHelpTooltip, CliInput, CliMathResult, CliParamHints, CliSuggestionBadge } from "./components";
import { useCliKeyboard } from "./hooks";

export function CliOverlay() {
    const [isExiting, setIsExiting] = createSignal(false);

    // Sync CLI with Command mode
    createEffect(() => {
        const currentMode = modeStore.mode();
        const cliOpen = cliStore.isOpen();
        if (cliOpen && currentMode !== Mode.Command) {
            cliStore.close();
        }
    });

    function handleClose() {
        setIsExiting(true);
        setTimeout(() => {
            setIsExiting(false);
            cliStore.close();
            modeStore.returnFromCommand();
        }, 120);
    }

    const { handleKeyDown } = useCliKeyboard({ onClose: handleClose });

    return (
        <Show when={cliStore.isOpen() || isExiting()}>
            <div class={`${styles.overlay} ${isExiting() ? styles.exiting : styles.entering}`}>
                <CliHelpTooltip />
                <div class={styles.inputContainer}>
                    <Terminal size={16} class={styles.icon} />

                    <CliInput onKeyDown={handleKeyDown} />
                    <CliSuggestionBadge />
                    <CliParamHints />
                    <CliMathResult />
                    <CliError />
                </div>
            </div>
        </Show>
    );
}

export default CliOverlay;
