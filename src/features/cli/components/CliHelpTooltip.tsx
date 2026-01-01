/**
 * CLI Help Tooltip Component
 *
 * Displays floating help content when user types "?" as a parameter value.
 */

import { cliStore } from "@core/cli";
import { For, Show } from "solid-js";
import * as styles from "../CliOverlay.css";

export function CliHelpTooltip() {
    const ghost = () => cliStore.ghostText();
    const help = () => ghost().help;

    return (
        <Show when={ghost().mode === "help" && help()}>
            <div class={styles.helpTooltip}>
                <Show when={help()?.description}>
                    <div class={styles.helpDescription}>{help()?.description}</div>
                </Show>
                <Show when={help()?.options && (help()?.options?.length ?? 0) > 0}>
                    <div class={styles.helpOptions}>
                        <For each={help()?.options ?? []}>
                            {(option) => <span class={styles.helpOption}>{option}</span>}
                        </For>
                    </div>
                </Show>
                <Show when={help()?.examples && (help()?.examples?.length ?? 0) > 0}>
                    <div class={styles.helpExamples}>
                        <For each={help()?.examples ?? []}>
                            {(example) => <span class={styles.helpExample}>{example}</span>}
                        </For>
                    </div>
                </Show>
            </div>
        </Show>
    );
}
