/**
 * CLI Help Tooltip Component
 *
 * Displays floating help when user types "?" - positioned precisely over the "?" character.
 * Uses a hidden span to measure exact text width for accurate positioning.
 */

import { cliStore } from "@core/cli";
import { For, Show, createEffect, createSignal } from "solid-js";
import * as styles from "../CliOverlay.css";

export function CliHelpTooltip() {
    const ghost = () => cliStore.ghostText();
    const options = () => ghost().help?.options ?? [];

    let measureRef: HTMLSpanElement | undefined;
    const [leftPx, setLeftPx] = createSignal(0);

    // Measure text width when cursor position changes
    createEffect(() => {
        if (!ghost().showHelp || !measureRef) {
            return;
        }

        // Get text up to cursor (which is after the "?")
        const textBeforeCursor = cliStore.input().slice(0, cliStore.cursorPosition());
        measureRef.textContent = textBeforeCursor;

        // Measure the width
        const width = measureRef.offsetWidth;
        // Center over the "?" (subtract half a character width, approximately 4px)
        setLeftPx(width - 4);
    });

    return (
        <>
            {/* Hidden span for measuring text width */}
            <span ref={measureRef} class={styles.measureSpan} aria-hidden="true" />

            <Show when={ghost().showHelp && options().length > 0}>
                <div class={styles.helpTooltip} style={{ left: `calc(32px + ${leftPx()}px)` }}>
                    <For each={options()}>{(option) => <span class={styles.helpOption}>{option}</span>}</For>
                </div>
            </Show>
        </>
    );
}
