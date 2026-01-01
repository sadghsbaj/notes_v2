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
    const options = () => {
        const g = ghost();
        if (g.mode === "params") {
            return g.help?.options ?? [];
        }
        return [];
    };
    const showHelp = () => {
        const g = ghost();
        return g.mode === "params" && g.showHelp;
    };

    let measureRef: HTMLSpanElement | undefined;
    const [leftPx, setLeftPx] = createSignal(0);

    // Measure text width when cursor position changes
    createEffect(() => {
        if (!showHelp() || !measureRef) {
            return;
        }

        // Measure text up to cursor (cursor is positioned after the "?")
        const textBeforeCursor = cliStore.input().slice(0, cliStore.cursorPosition());
        measureRef.textContent = textBeforeCursor;
        const widthWithQuestion = measureRef.offsetWidth;

        // Measure just the "?" character width (same font as input)
        measureRef.textContent = "?";
        const questionMarkWidth = measureRef.offsetWidth;

        // Calculate center of the "?" character
        // Position = (width up to end of "?") - (half of "?" width)
        const centerOfQuestion = widthWithQuestion - questionMarkWidth / 2;
        setLeftPx(centerOfQuestion);
    });

    return (
        <>
            {/* Hidden span for measuring text width (same font as input) */}
            <span ref={measureRef} class={styles.measureSpan} aria-hidden="true" />

            <Show when={showHelp() && options().length > 0}>
                <div
                    class={styles.helpTooltip}
                    style={{ left: `calc(32px + ${leftPx()}px)`, transform: "translateX(-50%)" }}
                >
                    <For each={options()}>{(option) => <span class={styles.helpOption}>{option}</span>}</For>
                </div>
            </Show>
        </>
    );
}
