import { z } from "zod";
import { DocId, IsoTimestamp } from "./primitives";

// =============================================================================
// Document Metadata
// =============================================================================
// Stored in meta.json - lightweight entry file for document listing.
// Kept separate from content.json for fast directory scanning.

export const DocumentMeta = z.object({
    docId: DocId,
    schemaVersion: z.number().int().min(1),

    title: z.string().min(1),

    createdAt: IsoTimestamp,
    updatedAt: IsoTimestamp, // Only bumped on content changes, not UI state

    // Optional: version of app that created/edited this document
    appVersion: z.string().optional(),
});
export type DocumentMeta = z.infer<typeof DocumentMeta>;
