/**
 * useKeyboard – Global keyboard input handler
 */

import { modeStore } from "@core/mode";
import { onCleanup, onMount } from "solid-js";
import { defaultKeymap, keyComboFromEvent } from "./keymap";
import type { Keymap } from "./keymap";

export interface UseKeyboardOptions {
    /** Custom keymap (defaults to defaultKeymap) */
    keymap?: Keymap;
    /** Whether to prevent default on handled keys */
    preventDefault?: boolean;
}

/**
 * Initialize global keyboard handling
 * Call this once at app root level
 */
export function useKeyboard(options: UseKeyboardOptions = {}) {
    const { keymap = defaultKeymap, preventDefault = true } = options;

    function handleKeyDown(e: KeyboardEvent) {
        // Skip if target is an input/textarea (let them handle their own input)
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
            // Still allow Escape to exit
            if (e.key !== "Escape") {
                return;
            }
        }

        const combo = keyComboFromEvent(e);
        const binding = keymap.get(combo);

        if (!binding) return;

        // Check mode restriction
        const currentMode = modeStore.mode();
        if (binding.modes && !binding.modes.includes(currentMode)) {
            return;
        }

        // Execute action
        const { action } = binding;
        let handled = false;

        switch (action.type) {
            case "setMode":
                handled = modeStore.setMode(action.mode);
                break;
            case "returnFromCommand":
                modeStore.returnFromCommand();
                handled = true;
                break;
        }

        if (handled && preventDefault) {
            e.preventDefault();
        }
    }

    onMount(() => {
        window.addEventListener("keydown", handleKeyDown);
    });

    onCleanup(() => {
        window.removeEventListener("keydown", handleKeyDown);
    });
}
