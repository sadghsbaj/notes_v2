/**
 * CLI Param Hints Component
 *
 * Displays parameter pills showing expected arguments for the current command.
 */

import { cliStore } from "@core/cli";
import { For, Show } from "solid-js";
import * as styles from "../CliOverlay.css";

export function CliParamHints() {
    const ghost = () => cliStore.ghostText();

    return (
        <Show when={ghost().mode === "params" && !cliStore.errorMessage()}>
            <span class={styles.paramHints}>
                <For each={ghost().paramNames}>
                    {(name, idx) => (
                        <span class={idx() === ghost().activeParamIndex ? styles.paramActive : styles.param}>
                            {name}
                        </span>
                    )}
                </For>
            </span>
        </Show>
    );
}
