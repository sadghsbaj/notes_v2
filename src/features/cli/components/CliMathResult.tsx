/**
 * CLI Math Result Component
 *
 * Displays inline math evaluation result.
 */

import { cliStore } from "@core/cli";
import { Show } from "solid-js";
import * as styles from "../CliOverlay.css";

export function CliMathResult() {
    return (
        <Show when={cliStore.mathResult()}>
            <span class={styles.mathResult}>= {cliStore.mathResult()}</span>
        </Show>
    );
}
