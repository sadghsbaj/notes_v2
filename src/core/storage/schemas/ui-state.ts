import { z } from "zod";
import { IsoTimestamp, PageId } from "./primitives";

// =============================================================================
// Document UI State
// =============================================================================
// Stored in ui.json - document-specific viewer state.
// Changes here don't bump updatedAt in meta.json.

export const DocumentUiState = z.object({
    lastOpenedAt: IsoTimestamp,

    // Last viewed page
    lastPageId: PageId.optional(),

    // Scroll position (Y-axis only, no horizontal scroll per S005)
    scrollY: z.number().default(0),

    // Zoom level (0.1 = fit page, 1.0 = 1:1, up to 3.0 for detail view on large screens)
    zoom: z.number().min(0.1).max(3).default(1),

    // Future: panels open/closed state, etc.
});
export type DocumentUiState = z.infer<typeof DocumentUiState>;
