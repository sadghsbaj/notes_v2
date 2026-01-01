import { z } from "zod";
import { AssetId } from "./primitives";

// =============================================================================
// Asset Types
// =============================================================================

export const AssetType = z.enum(["pdf", "image", "webp"]);
export type AssetType = z.infer<typeof AssetType>;

// =============================================================================
// Asset Metadata
// =============================================================================

export const AssetMeta = z.object({
    pageCount: z.number().int().min(1).optional(), // For PDFs
    width: z.number().int().optional(),
    height: z.number().int().optional(),
});
export type AssetMeta = z.infer<typeof AssetMeta>;

// =============================================================================
// Asset Reference
// =============================================================================
// References files in assets/ folder. Immutable once created.

export const AssetRef = z.object({
    id: AssetId,
    type: AssetType,
    filename: z.string(),
    mimeType: z.string().optional(),
    meta: AssetMeta.optional(),
});
export type AssetRef = z.infer<typeof AssetRef>;
