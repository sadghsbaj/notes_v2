/**
 * CLI Suggestion Badge Component
 *
 * Shows replacement suggestion when fuzzy matching a command or param.
 */

import { cliStore } from "@core/cli";
import { Show } from "solid-js";
import * as styles from "../CliOverlay.css";

export function CliSuggestionBadge() {
    const ghost = () => cliStore.ghostText();

    // Get replacement text (command or param)
    const replacementText = () => {
        const g = ghost();
        if (g.mode === "command-replacement") return g.commandText;
        if (g.mode === "params" && g.paramReplacementText) return g.paramReplacementText;
        return "";
    };

    return (
        <Show when={replacementText() !== ""}>
            <span class={styles.suggestionBadge}>→ {replacementText()}</span>
        </Show>
    );
}
