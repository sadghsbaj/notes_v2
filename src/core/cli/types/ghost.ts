import { z } from "zod";

// =============================================================================
// Ghost Text Types
// =============================================================================

export const GhostTextMode = z.enum(["completion", "replacement", "params", "none"]);
export type GhostTextMode = z.infer<typeof GhostTextMode>;

export const GhostTextSchema = z.object({
    /** Display mode */
    mode: GhostTextMode,
    /** Text to display as ghost */
    text: z.string(),
    /** For params mode: which param is active (0-indexed) */
    activeParamIndex: z.number().nullable(),
    /** Parameter names for hint display */
    paramNames: z.array(z.string()).default([]),
});

export type GhostText = z.infer<typeof GhostTextSchema>;

export const emptyGhostText: GhostText = {
    mode: "none",
    text: "",
    activeParamIndex: null,
    paramNames: [],
};
