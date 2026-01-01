import { z } from "zod";
import type { ParamHelp } from "./action";

// =============================================================================
// Ghost Text Types - Discriminated Union
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
// Ghost Text - Discriminated Union
// =============================================================================

/** No ghost text - empty state */
export interface GhostTextNone {
    mode: "none";
}

/** Command completion - user typed a prefix, show the rest inline */
export interface GhostTextCommandCompletion {
    mode: "command-completion";
    /** Rest of the command to complete (e.g., user typed "page-a", show "dd") */
    commandText: string;
}

/** Command replacement - fuzzy match, show full command as badge */
export interface GhostTextCommandReplacement {
    mode: "command-replacement";
    /** Full command to replace with (e.g., user typed "padd", show "page-add") */
    commandText: string;
}

/** Params mode - user is typing arguments */
export interface GhostTextParams {
    mode: "params";
    /** Which param is active (0-indexed) */
    activeParamIndex: number;
    /** Parameter names for hint display */
    paramNames: string[];
    /** Param completion (inline suffix if prefix match) */
    paramCompletionText: string;
    /** Param replacement (shows as badge if fuzzy match) */
    paramReplacementText: string;
    /** Help content for current param (shown when input is "?") */
    showHelp: boolean;
    /** Help data */
    help: ParamHelp | undefined;
}

/** Discriminated union of all ghost text states */
export type GhostText = GhostTextNone | GhostTextCommandCompletion | GhostTextCommandReplacement | GhostTextParams;

// =============================================================================
// Empty Ghost Text Constant
// =============================================================================

export const emptyGhostText: GhostTextNone = {
    mode: "none",
};

// =============================================================================
// Type Guards (optional, for cleaner code)
// =============================================================================

export function isGhostNone(g: GhostText): g is GhostTextNone {
    return g.mode === "none";
}

export function isGhostCommandCompletion(g: GhostText): g is GhostTextCommandCompletion {
    return g.mode === "command-completion";
}

export function isGhostCommandReplacement(g: GhostText): g is GhostTextCommandReplacement {
    return g.mode === "command-replacement";
}

export function isGhostParams(g: GhostText): g is GhostTextParams {
    return g.mode === "params";
}
