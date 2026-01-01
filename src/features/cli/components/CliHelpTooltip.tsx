/**
 * CLI Help Tooltip Component
 *
 * Displays floating help when user types "?" - positioned over the "?" character.
 */

import { cliStore } from "@core/cli";
import { For, Show, createMemo } from "solid-js";
import * as styles from "../CliOverlay.css";

export function CliHelpTooltip() {
    const ghost = () => cliStore.ghostText();
    const options = () => ghost().help?.options ?? [];

    // Calculate position based on cursor (characters before "?")
    const leftOffset = createMemo(() => {
        if (!ghost().showHelp) return "50%";
        // Approximate character width in mono font (about 8.4px per char at sm size)
        const charWidth = 8.4;
        const cursorPos = cliStore.cursorPosition();
        // Position tooltip centered over the "?" (cursor is after the "?")
        const offset = (cursorPos - 0.5) * charWidth;
        // Add offset for the icon + padding (about 32px)
        return `calc(32px + ${offset}px)`;
    });

    return (
        <Show when={ghost().showHelp && options().length > 0}>
            <div class={styles.helpTooltip} style={{ left: leftOffset(), transform: "translateX(-50%)" }}>
                <For each={options()}>{(option) => <span class={styles.helpOption}>{option}</span>}</For>
            </div>
        </Show>
    );
}
