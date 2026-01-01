import { z } from "zod";
import { PageBackground } from "./page-background";
import { PageId, Rotation } from "./primitives";

// =============================================================================
// Page Schema
// =============================================================================
// Pages are the core container unit in notes_v2.
// - Fixed 800px width (Page-Space, S005 C1)
// - Variable height based on content/aspect ratio
// - Can be rotated in 90° steps
// - Background can be blank, image, or AI-interactive

export const Page = z.object({
    id: PageId,

    // Fixed width per S005 C1
    widthPx: z.literal(800),

    // Variable height - typically from PDF aspect ratio (e.g., 1131 for A4)
    heightPx: z.number().int().min(100),

    // Rotation in 90° steps. Only allowed on pages without blocks.
    rotation: Rotation.default(0),

    // Background content (blank, image, or AI-interactive)
    background: PageBackground.default({ kind: "blank" }),
});
export type Page = z.infer<typeof Page>;
