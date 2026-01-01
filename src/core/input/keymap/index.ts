/**
 * Keymap – Public API
 *
 * Merges all key groups into a single keymap.
 * Add new key files here when extending.
 */

// Types
export { keyComboFromEvent, mergeKeymaps } from "./types";
export type { KeyAction, KeyBinding, KeyCombo, Keymap } from "./types";

// Key groups
import { modeKeys } from "./mode-keys";
// Future: import { navigationKeys } from "./navigation-keys";
// Future: import { blockKeys } from "./block-keys";

import { mergeKeymaps } from "./types";

/** Default keymap with all key groups merged */
export const defaultKeymap = mergeKeymaps(
    modeKeys
    // Future: navigationKeys,
    // Future: blockKeys,
);
