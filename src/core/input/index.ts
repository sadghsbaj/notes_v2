/**
 * Input System – Public API
 */

export { useKeyboard } from "./useKeyboard";
export type { UseKeyboardOptions } from "./useKeyboard";

export { defaultKeymap, keyComboFromEvent, mergeKeymaps } from "./keymap";
export type { KeyAction, KeyBinding, KeyCombo, Keymap } from "./keymap";
