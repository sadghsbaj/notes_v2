/**
 * CLI Param Hints Component
 *
 * Displays parameter pills showing expected args.
 * Always shown when in params mode (unless error is displayed).
 */

import { cliStore } from "@core/cli";
import { For, Show } from "solid-js";
import * as styles from "../CliOverlay.css";

export function CliParamHints() {
    const ghost = () => cliStore.ghostText();

    return (
        <Show when={ghost().mode === "params" && ghost().paramNames.length > 0 && !cliStore.errorMessage()}>
            <div class={styles.paramHints}>
                <For each={ghost().paramNames}>
                    {(name, index) => (
                        <span class={index() === ghost().activeParamIndex ? styles.paramActive : styles.param}>
                            {name}
                        </span>
                    )}
                </For>
            </div>
        </Show>
    );
}
