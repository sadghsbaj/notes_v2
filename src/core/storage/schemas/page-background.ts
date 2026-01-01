import { z } from "zod";
import { IsoTimestamp, PageId } from "./primitives";

// =============================================================================
// Page Background Types
// =============================================================================
// Discriminated union for different page background kinds.
// Extensible for future background types.

// -----------------------------------------------------------------------------
// Blank Page (empty, white/colored background)
// -----------------------------------------------------------------------------

export const BlankBackground = z.object({
    kind: z.literal("blank"),
    color: z.string().optional(), // Future: background color
});
export type BlankBackground = z.infer<typeof BlankBackground>;

// -----------------------------------------------------------------------------
// Image/WebP Page (rasterized PDF or imported image)
// -----------------------------------------------------------------------------

export const ImageBackground = z.object({
    kind: z.literal("image"),
    pageImageId: z.string(), // Reference to assets/page-images/<id>.webp
    aiPageId: PageId.optional(), // Link to AI-interactive version (S010)
});
export type ImageBackground = z.infer<typeof ImageBackground>;

// -----------------------------------------------------------------------------
// AI-Interactive Page (S010)
// -----------------------------------------------------------------------------
// Generated from WebP via Gemini API. Contains structured data for
// interactive components (fill-blanks, tables, checkboxes, etc.)

export const AiInteractiveBackground = z.object({
    kind: z.literal("ai-interactive"),
    sourcePageId: PageId, // Link back to WebP source page

    // Gemini output - structure validated at component level, not here
    // Contains: layout, elements[] with types like heading, fill-blank, table, etc.
    structureJson: z.unknown(),

    // User inputs keyed by element ID
    // Example: { "blank1": "Berlin", "cell-1-1": "Mauerfall", "opt1": true }
    userState: z.record(z.string(), z.unknown()).default({}),

    // Optional AI-generated solutions (2nd API call)
    solutionsJson: z.unknown().optional(),

    generatedAt: IsoTimestamp,
});
export type AiInteractiveBackground = z.infer<typeof AiInteractiveBackground>;

// -----------------------------------------------------------------------------
// Combined Page Background Union
// -----------------------------------------------------------------------------

export const PageBackground = z.discriminatedUnion("kind", [BlankBackground, ImageBackground, AiInteractiveBackground]);
export type PageBackground = z.infer<typeof PageBackground>;
