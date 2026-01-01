import { z } from "zod";
import type { ParamHelp } from "./action";

// =============================================================================
// Ghost Text Types
// =============================================================================

export const GhostTextMode = z.enum([
    "command-completion", // Command prefix match - show suffix inline
    "command-replacement", // Command fuzzy match - show full replacement as badge
    "params", // In argument slot - show param hints (always when in args)
    "none",
]);
export type GhostTextMode = z.infer<typeof GhostTextMode>;

// =============================================================================
// Param Completion Result
// =============================================================================

export interface ParamCompletionResult {
    /** The value that would be inserted on Tab */
    value: string;
    /** Display label (defaults to value) */
    label?: string;
    /** Whether this is a prefix match (completion) or fuzzy (replacement) */
    isPrefix: boolean;
}

// =============================================================================
// Ghost Text Schema
// =============================================================================

export interface GhostText {
    /** Display mode */
    mode: GhostTextMode;

    // === Command completion (mode = command-completion or command-replacement) ===
    /** Text to display as ghost (completion suffix or replacement) */
    commandText: string;

    // === Param state (mode = params) ===
    /** Which param is active (0-indexed) */
    activeParamIndex: number | null;
    /** Parameter names for hint display */
    paramNames: string[];
    /** Param completion (inline suffix if prefix match) */
    paramCompletionText: string;
    /** Param replacement (shows as badge if fuzzy match) */
    paramReplacementText: string;
    /** Help content for current param (shown when input is "?") */
    showHelp: boolean;
    /** Help data */
    help?: ParamHelp | undefined;
}

export const emptyGhostText: GhostText = {
    mode: "none",
    commandText: "",
    activeParamIndex: null,
    paramNames: [],
    paramCompletionText: "",
    paramReplacementText: "",
    showHelp: false,
};
