/**
 * CLI Help Tooltip Component
 *
 * Displays floating help when user types "?" - shows options as colorful pills.
 */

import { cliStore } from "@core/cli";
import { For, Show } from "solid-js";
import * as styles from "../CliOverlay.css";

export function CliHelpTooltip() {
    const ghost = () => cliStore.ghostText();
    const options = () => ghost().help?.options ?? [];

    return (
        <Show when={ghost().showHelp && options().length > 0}>
            <div class={styles.helpTooltip}>
                <For each={options()}>{(option) => <span class={styles.helpOption}>{option}</span>}</For>
            </div>
        </Show>
    );
}
