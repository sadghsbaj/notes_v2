/**
 * CLI Suggestion Badge Component
 *
 * Shows replacement suggestion when fuzzy matching a command.
 */

import { cliStore } from "@core/cli";
import { Show } from "solid-js";
import * as styles from "../CliOverlay.css";

export function CliSuggestionBadge() {
    const ghost = () => cliStore.ghostText();

    return (
        <Show when={ghost().mode === "replacement" && ghost().text}>
            <span class={styles.suggestionBadge}>→ {ghost().text}</span>
        </Show>
    );
}
