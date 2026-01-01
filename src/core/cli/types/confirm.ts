/**
 * CLI Confirmation Types
 *
 * Types for inline confirmation of destructive commands.
 */

// =============================================================================
// Choice Definition
// =============================================================================

/** Single choice option in a confirmation dialog */
export interface ConfirmChoice {
    /** Key to press (single character, e.g., "y", "n", "o") */
    key: string;
    /** Display label (e.g., "Yes", "No", "Overwrite") */
    label: string;
    /** Value passed to handler (e.g., "confirm", "cancel", "overwrite") */
    value: string;
}

// =============================================================================
// Confirmation Config
// =============================================================================

/** Full configuration for a confirmation dialog */
export interface ConfirmConfig {
    /** Message to display (e.g., "Really delete?") */
    message: string;
    /** Available choices */
    choices: ConfirmChoice[];
}

// =============================================================================
// Context for Conditional Confirmations
// =============================================================================

/** Context passed to confirm resolver functions */
export interface ConfirmContext {
    /** Current working directory */
    cwd: string;
    // TODO: Add filesystem service when implemented
    // fs: FileSystemService;
}

// =============================================================================
// Resolver Function Type
// =============================================================================

/**
 * Function that determines if confirmation is needed and returns config.
 * Return null if no confirmation needed.
 */
export type ConfirmResolver = (
    args: Record<string, unknown>,
    ctx: ConfirmContext
) => ConfirmConfig | null | Promise<ConfirmConfig | null>;

// =============================================================================
// Pre-built Confirmation Configs
// =============================================================================

/** Standard delete confirmation (y/n) */
export const CONFIRM_DELETE: ConfirmConfig = {
    message: "Wirklich löschen?",
    choices: [
        { key: "y", label: "Ja", value: "confirm" },
        { key: "n", label: "Nein", value: "cancel" },
    ],
};

/** Overwrite confirmation with more options */
export const CONFIRM_OVERWRITE: ConfirmConfig = {
    message: "Datei existiert bereits",
    choices: [
        { key: "o", label: "Überschreiben", value: "overwrite" },
        { key: "r", label: "Umbenennen", value: "rename" },
        { key: "c", label: "Abbrechen", value: "cancel" },
    ],
};

// =============================================================================
// Confirmation State (for CLI store)
// =============================================================================

/** State when confirmation is active */
export interface ConfirmationState {
    /** The confirmation config being shown */
    config: ConfirmConfig;
    /** The action waiting to be executed */
    pendingActionId: string;
    /** Parsed arguments for the pending action */
    pendingArgs: Record<string, unknown>;
}
