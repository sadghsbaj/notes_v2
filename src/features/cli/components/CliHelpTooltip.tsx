/**
 * CLI Help Tooltip Component
 *
 * Displays floating help when user types "?" - minimal, premium design.
 * Shows only the available options as pills.
 */

import { cliStore } from "@core/cli";
import { For, Show } from "solid-js";
import * as styles from "../CliOverlay.css";

export function CliHelpTooltip() {
    const ghost = () => cliStore.ghostText();
    const help = () => ghost().help;
    const options = () => help()?.options ?? [];

    return (
        <Show when={ghost().mode === "help" && options().length > 0}>
            <div class={styles.helpTooltip}>
                <For each={options()}>{(option) => <span class={styles.helpOption}>{option}</span>}</For>
            </div>
        </Show>
    );
}
