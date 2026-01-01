import { z } from "zod";
import type { ConfirmConfig, ConfirmResolver } from "./confirm";

// =============================================================================
// Command Groups
// =============================================================================

export type CommandGroup = "filesystem" | "page" | "view" | "util";

// =============================================================================
// Parameter Types
// =============================================================================

export const ParamType = z.enum(["string", "number", "boolean", "range", "path", "enum"]);
export type ParamType = z.infer<typeof ParamType>;

// =============================================================================
// Validation Result
// =============================================================================

export interface ValidationResult {
    valid: boolean;
    error?: string;
    /** Normalized/parsed value from validator (avoids duplicate processing in executor) */
    normalized?: unknown;
}

/** Custom validator function signature */
export type ParamValidator = (value: string, paramName: string) => ValidationResult;

// =============================================================================
// Completion Types
// =============================================================================

export interface CompletionItem {
    /** The value to insert */
    value: string;
    /** Optional label for display (defaults to value) */
    label?: string;
}

export interface CompletionContext {
    /** Current input value for this param */
    input: string;
    /** All parsed args so far */
    args: Record<string, unknown>;
    /** Current working directory (for path completion) */
    cwd?: string;
}

/** Completer function signature */
export type ParamCompleter = (context: CompletionContext) => CompletionItem[] | Promise<CompletionItem[]>;

// =============================================================================
// Help Definition
// =============================================================================

export const ParamHelpSchema = z.object({
    /** Detailed description shown in tooltip */
    description: z.string().optional(),
    /** Valid options for enum-like params (shown as "fs | scan") */
    options: z.array(z.string()).optional(),
    /** Example values */
    examples: z.array(z.string()).optional(),
});

export type ParamHelp = z.infer<typeof ParamHelpSchema>;

// =============================================================================
// Parameter Schema
// =============================================================================

export const ParamSchema = z.object({
    /** Parameter name for hints */
    name: z.string(),

    /** Expected type */
    type: ParamType,

    /** Default value if not provided */
    default: z.unknown().optional(),

    /** Whether this param can be omitted */
    optional: z.boolean().default(false),

    /** Short hint text shown in ghost text (e.g. "z.B. 1 oder 3-5") */
    hint: z.string().optional(),

    /** Help tooltip content (shown when user types "?") */
    help: ParamHelpSchema.optional(),
});

export type Param = z.infer<typeof ParamSchema>;

// =============================================================================
// Parameter Definition (with optional functions)
// =============================================================================

/**
 * Parameter definition with optional validator and completer functions.
 * Used for both registration (ActionDefinition) and runtime (Action).
 * Functions can't be in Zod schema, so this extends the base Param type.
 */
export interface ParamRuntime extends Param {
    /** Custom validator (overrides type-based validation) */
    validate?: ParamValidator;

    /** Custom completer for Tab-completion */
    complete?: ParamCompleter;
}

// =============================================================================
// Action Definition (for registering)
// =============================================================================

export interface ActionDefinition {
    id: string;
    group?: CommandGroup;
    description?: string;
    params?: ParamRuntime[];
    /** Confirmation config or resolver function (for conditional confirmations) */
    confirm?: ConfirmConfig | ConfirmResolver;
    /** Handler receives args and optional choice value if confirmation was shown */
    handler: (args: Record<string, unknown>, choice?: string) => void | Promise<void>;
}

// =============================================================================
// Action (runtime)
// =============================================================================

export interface Action {
    id: string;
    group: CommandGroup;
    description: string;
    params: ParamRuntime[];
    /** Confirmation config or resolver (undefined = no confirmation) */
    confirm: ConfirmConfig | ConfirmResolver | undefined;
    /** Handler receives args and optional choice value if confirmation was shown */
    handler: (args: Record<string, unknown>, choice?: string) => void | Promise<void>;
}
