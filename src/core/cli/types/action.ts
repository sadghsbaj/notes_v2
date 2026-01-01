import { z } from "zod";

// =============================================================================
// Command Groups
// =============================================================================

export type CommandGroup = "filesystem" | "page" | "view" | "util";

// =============================================================================
// Parameter Types
// =============================================================================

export const ParamType = z.enum(["string", "number", "boolean", "range"]);
export type ParamType = z.infer<typeof ParamType>;

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
    /** Hint text shown in ghost text */
    hint: z.string().optional(),
});

export type Param = z.infer<typeof ParamSchema>;

// =============================================================================
// Action Definition (for registering)
// =============================================================================

export interface ActionDefinition {
    id: string;
    group?: CommandGroup;
    aliases?: string[];
    description?: string;
    params?: Param[];
    handler: (args: Record<string, unknown>) => void | Promise<void>;
}

// =============================================================================
// Action (runtime)
// =============================================================================

export interface Action {
    id: string;
    group: CommandGroup;
    aliases: string[];
    description: string;
    params: Param[];
    handler: (args: Record<string, unknown>) => void | Promise<void>;
}
