import { z } from "zod";

// =============================================================================
// Rect (Page-Space Coordinates)
// =============================================================================
// All block positions are stored in Page-Space (800px width, variable height).
// Min size 20px allows for small gaps/annotations per S006.

export const Rect = z.object({
    x: z.number().min(0),
    y: z.number().min(0),
    w: z.number().min(20),
    h: z.number().min(20),
});
export type Rect = z.infer<typeof Rect>;
