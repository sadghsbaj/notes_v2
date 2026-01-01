import { z } from "zod";

// =============================================================================
// Branded ID Types
// =============================================================================
// Using Zod brands for type-safe IDs - prevents mixing DocId with PageId etc.

export const DocId = z.string().brand<"DocId">();
export type DocId = z.infer<typeof DocId>;

export const PageId = z.string().brand<"PageId">();
export type PageId = z.infer<typeof PageId>;

export const BlockId = z.string().brand<"BlockId">();
export type BlockId = z.infer<typeof BlockId>;

export const AssetId = z.string().brand<"AssetId">();
export type AssetId = z.infer<typeof AssetId>;

// =============================================================================
// Timestamps
// =============================================================================

export const IsoTimestamp = z.string().datetime();
export type IsoTimestamp = z.infer<typeof IsoTimestamp>;

// =============================================================================
// Page Rotation
// =============================================================================

export const Rotation = z.union([z.literal(0), z.literal(90), z.literal(180), z.literal(270)]);
export type Rotation = z.infer<typeof Rotation>;
