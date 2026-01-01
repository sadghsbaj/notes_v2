/**
 * CLI Input Component
 *
 * The main input field with ghost text overlay for autocomplete.
 */

import { cliStore } from "@core/cli";
import { Mode, modeStore } from "@core/mode";
import { Show, createEffect } from "solid-js";
import * as styles from "../CliOverlay.css";

export interface CliInputProps {
    onKeyDown: (e: KeyboardEvent) => void;
}

export function CliInput(props: CliInputProps) {
    let inputRef: HTMLInputElement | undefined;

    // Focus input when CLI opens
    createEffect(() => {
        if (cliStore.isOpen() && inputRef) {
            inputRef.focus();
        }
    });

    function handleInput(e: Event) {
        const target = e.target as HTMLInputElement;
        cliStore.setInput(target.value, target.selectionStart ?? target.value.length);
    }

    function handleSelect(e: Event) {
        const target = e.target as HTMLInputElement;
        cliStore.setCursor(target.selectionStart ?? 0);
    }

    function handleBlur() {
        if (modeStore.mode() === Mode.Command && cliStore.isOpen() && inputRef) {
            setTimeout(() => {
                if (modeStore.mode() === Mode.Command && cliStore.isOpen() && inputRef) {
                    inputRef.focus();
                }
            }, 10);
        }
    }

    const ghost = () => cliStore.ghostText();

    // Determine ghost completion text (command or param)
    const completionText = () => {
        const g = ghost();
        if (g.mode === "command-completion") return g.commandText;
        if (g.mode === "params" && g.paramCompletionText) return g.paramCompletionText;
        return "";
    };

    return (
        <div class={styles.inputLayer}>
            {/* Ghost completion (prefix match) - inline */}
            <Show when={completionText() !== ""}>
                <div class={styles.ghostLayer}>
                    <span class={styles.ghostText}>
                        <span style={{ visibility: "hidden" }}>{cliStore.input()}</span>
                        <span class={styles.ghostCompletion}>{completionText()}</span>
                    </span>
                </div>
            </Show>

            <input
                ref={inputRef}
                type="text"
                class={styles.input}
                inputMode="none"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                spellcheck={false}
                value={cliStore.input()}
                onInput={handleInput}
                onKeyDown={props.onKeyDown}
                onSelect={handleSelect}
                onBlur={handleBlur}
                placeholder="Befehl..."
            />
        </div>
    );
}
