/**
 * CLI Error Component
 *
 * Displays error messages from command execution.
 */

import { cliStore } from "@core/cli";
import { Show } from "solid-js";
import * as styles from "../CliOverlay.css";

export function CliError() {
    return (
        <Show when={cliStore.errorMessage()}>
            <span class={styles.errorMessage}>{cliStore.errorMessage()}</span>
        </Show>
    );
}
