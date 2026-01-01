import { z } from "zod";
import type { ParamHelp } from "./action";

// =============================================================================
// Ghost Text Types
// =============================================================================

export const GhostTextMode = z.enum([
    "completion", // Prefix match - show suffix inline
    "replacement", // Fuzzy match - show full replacement as badge
    "params", // Show param hints
    "help", // Show help tooltip for "?"
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

export const GhostTextSchema = z.object({
    /** Display mode */
    mode: GhostTextMode,
    /** Text to display as ghost (completion suffix or replacement) */
    text: z.string(),
    /** For params mode: which param is active (0-indexed) */
    activeParamIndex: z.number().nullable(),
    /** Parameter names for hint display */
    paramNames: z.array(z.string()).default([]),
});

export type GhostText = z.infer<typeof GhostTextSchema>;

// =============================================================================
// Extended Ghost Text (with help and completion data)
// =============================================================================

export interface GhostTextExtended extends GhostText {
    /** Help content for current param (when mode is "help" or for tooltip) */
    help?: ParamHelp | undefined;
    /** Param completion for current argument */
    paramCompletion?: ParamCompletionResult | undefined;
}

export const emptyGhostText: GhostTextExtended = {
    mode: "none",
    text: "",
    activeParamIndex: null,
    paramNames: [],
};
