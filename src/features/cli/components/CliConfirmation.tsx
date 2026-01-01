/**
 * CLI Confirmation Component
 *
 * Inline confirmation layer that replaces input when active.
 * Shows message and choice pills for user selection.
 */

import { cliStore } from "@core/cli";
import type { ConfirmConfig } from "@core/cli/types/confirm";
import { For, Show, createMemo } from "solid-js";
import * as styles from "../CliOverlay.css";

export function CliConfirmation() {
    const confirmation = createMemo(() => cliStore.state().confirmation);
    const isActive = () => confirmation() !== null;
    const config = createMemo<ConfirmConfig | null>(() => confirmation()?.config ?? null);

    return (
        <Show when={isActive()}>
            {(_) => {
                const cfg = config();
                if (!cfg) return null;
                return (
                    <div class={styles.confirmLayer}>
                        <span class={styles.confirmMessage}>{cfg.message}</span>
                        <div class={styles.confirmChoices}>
                            <For each={cfg.choices}>
                                {(choice) => (
                                    <span class={styles.confirmChoice}>
                                        <span class={styles.confirmKey}>{choice.key}</span>
                                        <span class={styles.confirmLabel}>{choice.label}</span>
                                    </span>
                                )}
                            </For>
                        </div>
                    </div>
                );
            }}
        </Show>
    );
}
