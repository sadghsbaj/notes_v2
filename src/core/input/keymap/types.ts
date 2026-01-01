/**
 * Keymap Types – Shared type definitions
 */

import type { Mode } from "@core/mode";

/** Action types that can be triggered by keys */
export type KeyAction = { type: "setMode"; mode: Mode } | { type: "returnFromCommand" } | { type: "openCli" };

/** Key identifier (lowercase, with modifiers prefixed) */
export type KeyCombo = string;

/** Keymap entry with optional mode context */
export interface KeyBinding {
    action: KeyAction;
    /** If set, only triggers in these modes */
    modes?: Mode[];
    /** Description for help/docs */
    description: string;
}

/** Full keymap type */
export type Keymap = Map<KeyCombo, KeyBinding>;

/**
 * Create a key combo string from a KeyboardEvent
 */
export function keyComboFromEvent(e: KeyboardEvent): KeyCombo {
    const parts: string[] = [];

    if (e.ctrlKey) parts.push("ctrl");
    if (e.altKey) parts.push("alt");
    if (e.shiftKey) parts.push("shift");
    if (e.metaKey) parts.push("meta");

    // Normalize key to lowercase
    const key = e.key.toLowerCase();
    parts.push(key);

    return parts.join("+");
}

/**
 * Merge multiple keymaps into one
 */
export function mergeKeymaps(...keymaps: Keymap[]): Keymap {
    const merged = new Map<KeyCombo, KeyBinding>();
    for (const keymap of keymaps) {
        for (const [combo, binding] of keymap) {
            merged.set(combo, binding);
        }
    }
    return merged;
}
