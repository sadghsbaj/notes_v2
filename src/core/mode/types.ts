/**
 * Mode Types – Core state for keyboard-first navigation
 *
 * Only 4 primary modes, no sub-modes.
 * Complex actions go through the CLI (Command mode).
 */

/** Primary modes */
export const Mode = {
    Normal: "normal",
    Edit: "edit",
    Insert: "insert",
    Command: "command",
} as const;

export type Mode = (typeof Mode)[keyof typeof Mode];

/** Complete mode state */
export interface ModeState {
    mode: Mode;
    /** Previous mode for returning after Command mode */
    previousMode: Mode | null;
}

/** Initial state */
export const initialModeState: ModeState = {
    mode: Mode.Normal,
    previousMode: null,
};
