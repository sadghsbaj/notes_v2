/**
 * CLI Overlay Component
 *
 * Syncs with Command mode. Ghost text shows completion inline,
 * replacement suggestions show as badge beside input.
 */

import { cliStore } from "@core/cli";
import { Mode, modeStore } from "@core/mode";
import { Terminal } from "lucide-solid";
import { For, Show, createEffect, createSignal } from "solid-js";
import * as styles from "./CliOverlay.css";

export function CliOverlay() {
    let inputRef: HTMLInputElement | undefined;
    const [isExiting, setIsExiting] = createSignal(false);

    // Sync CLI with Command mode
    createEffect(() => {
        const currentMode = modeStore.mode();
        const cliOpen = cliStore.isOpen();
        if (cliOpen && currentMode !== Mode.Command) {
            cliStore.close();
        }
    });

    // Focus input when CLI opens
    createEffect(() => {
        if (cliStore.isOpen() && inputRef) {
            inputRef.focus();
        }
    });

    function handleClose() {
        setIsExiting(true);
        setTimeout(() => {
            setIsExiting(false);
            cliStore.close();
            modeStore.returnFromCommand();
        }, 120);
    }

    function handleKeyDown(e: KeyboardEvent) {
        switch (e.key) {
            case "Escape":
                e.preventDefault();
                handleClose();
                break;
            case "Enter":
                e.preventDefault();
                cliStore.execute();
                break;
            case "Tab":
                e.preventDefault();
                cliStore.applyCompletion();
                break;
            case "ArrowUp":
                e.preventDefault();
                if (cliStore.suggestions().length > 0 && cliStore.isCommandSlot()) {
                    cliStore.selectPrevSuggestion();
                } else {
                    cliStore.historyUp();
                }
                break;
            case "ArrowDown":
                e.preventDefault();
                if (cliStore.suggestions().length > 0 && cliStore.isCommandSlot()) {
                    cliStore.selectNextSuggestion();
                } else {
                    cliStore.historyDown();
                }
                break;
        }
    }

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

    return (
        <Show when={cliStore.isOpen() || isExiting()}>
            <div class={`${styles.overlay} ${isExiting() ? styles.exiting : styles.entering}`}>
                <div class={styles.inputContainer}>
                    <Terminal size={16} class={styles.icon} />

                    <div class={styles.inputLayer}>
                        {/* Ghost completion (prefix match) - inline */}
                        <Show when={ghost().mode === "completion"}>
                            <div class={styles.ghostLayer}>
                                <span class={styles.ghostText}>
                                    <span style={{ visibility: "hidden" }}>{cliStore.input()}</span>
                                    <span class={styles.ghostCompletion}>{ghost().text}</span>
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
                            onKeyDown={handleKeyDown}
                            onSelect={handleSelect}
                            onBlur={handleBlur}
                            placeholder="Befehl..."
                        />
                    </div>

                    {/* Replacement suggestion - badge beside input */}
                    <Show when={ghost().mode === "replacement" && ghost().text}>
                        <span class={styles.suggestionBadge}>→ {ghost().text}</span>
                    </Show>

                    {/* Param hints */}
                    <Show when={ghost().mode === "params"}>
                        <span class={styles.paramHints}>
                            <For each={ghost().paramNames}>
                                {(name, idx) => (
                                    <span
                                        class={idx() === ghost().activeParamIndex ? styles.paramActive : styles.param}
                                    >
                                        {name}
                                    </span>
                                )}
                            </For>
                        </span>
                    </Show>

                    {/* Math result */}
                    <Show when={cliStore.mathResult()}>
                        <span class={styles.mathResult}>= {cliStore.mathResult()}</span>
                    </Show>

                    {/* Error */}
                    <Show when={cliStore.errorMessage()}>
                        <span class={styles.errorMessage}>{cliStore.errorMessage()}</span>
                    </Show>
                </div>
            </div>
        </Show>
    );
}

export default CliOverlay;
