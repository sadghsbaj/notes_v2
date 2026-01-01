import { z } from "zod";
import { AssetRef } from "./asset";
import { Block, BlockConnection } from "./block";
import { Page } from "./page";
import { DocId, PageId } from "./primitives";

// =============================================================================
// Current Schema Version
// =============================================================================

export const CURRENT_SCHEMA_VERSION = 1;

// =============================================================================
// Document Content (Entity Store Pattern)
// =============================================================================
// Flat maps for O(1) entity lookup. Normalized data structure.
// Relationships via IDs, not nested objects.

export const DocumentContent = z.object({
    docId: DocId,
    schemaVersion: z.number().int().min(1),

    // Document root - ordering and structure
    doc: z.object({
        pageOrder: z.array(PageId), // Ordered list of page IDs
    }),

    // Entity maps - flat storage for O(1) access
    entities: z.object({
        pages: z.record(z.string(), Page),
        blocks: z.record(z.string(), Block),
        assets: z.record(z.string(), AssetRef),

        // Future: connections for arrows between blocks
        connections: z.record(z.string(), BlockConnection).default({}),
    }),
});
export type DocumentContent = z.infer<typeof DocumentContent>;
