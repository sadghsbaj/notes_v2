import { z } from "zod";
import { BlockId, PageId } from "./primitives";
import { Rect } from "./rect";

// =============================================================================
// Block Anchor
// =============================================================================
// Determines where a block is positioned relative to.
// - page: anchored to a specific page (normal blocks)
// - viewport: sticky to viewport (future: HUD elements)

export const BlockAnchorPage = z.object({
    kind: z.literal("page"),
    pageId: PageId,
});

export const BlockAnchorViewport = z.object({
    kind: z.literal("viewport"),
});

export const BlockAnchor = z.discriminatedUnion("kind", [BlockAnchorPage, BlockAnchorViewport]);
export type BlockAnchor = z.infer<typeof BlockAnchor>;

// =============================================================================
// Block Styling
// =============================================================================
// Tailwind-based styling. Defaults to transparent (invisible container).

export const BlockStyling = z.object({
    bgClass: z.string().default("bg-transparent"),
    borderClass: z.string().default("border-none"),
    opacity: z.number().min(0).max(100).default(100),
});
export type BlockStyling = z.infer<typeof BlockStyling>;

// Default styling values for use when creating blocks
export const DEFAULT_BLOCK_STYLING: BlockStyling = {
    bgClass: "bg-transparent",
    borderClass: "border-none",
    opacity: 100,
};

// =============================================================================
// Block Shape (Future: forms, arrows)
// =============================================================================
// For now only rectangle. Extensible for circles, polygons, etc.

export const BlockShape = z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("rectangle") }),
    // Future: { kind: 'ellipse', rx: number, ry: number }
    // Future: { kind: 'polygon', points: Point[] }
]);
export type BlockShape = z.infer<typeof BlockShape>;

// =============================================================================
// Block Data (Content)
// =============================================================================
// Core content is richtext (Tiptap). Custom nodes (math, graph, etc.) are
// Tiptap extensions, not separate block data kinds.
// This union is extensible for future standalone block types.

export const BlockDataRichtext = z.object({
    kind: z.literal("richtext"),
    tiptapJson: z.unknown(), // Validated by Tiptap, not Zod
});

// Future block types (standalone, not Tiptap nodes):
// export const BlockDataEmbed = z.object({
//   kind: z.literal('embed'),
//   url: z.string().url(),
// });

export const BlockData = z.discriminatedUnion("kind", [
    BlockDataRichtext,
    // Add new block data types here
]);
export type BlockData = z.infer<typeof BlockData>;

// =============================================================================
// Block Connections (Future: arrows between blocks)
// =============================================================================
// Placeholder for future arrow/connector system.

export const BlockConnection = z.object({
    id: z.string(),
    fromBlockId: BlockId,
    toBlockId: BlockId,
    fromAnchor: z.enum(["top", "right", "bottom", "left", "center"]),
    toAnchor: z.enum(["top", "right", "bottom", "left", "center"]),
    style: z
        .object({
            strokeClass: z.string().default("stroke-zinc-500"),
            arrowHead: z.enum(["none", "arrow", "dot"]).default("arrow"),
        })
        .optional(),
});
export type BlockConnection = z.infer<typeof BlockConnection>;

// =============================================================================
// Full Block
// =============================================================================

export const Block = z.object({
    id: BlockId,
    anchor: BlockAnchor,
    rect: Rect,
    shape: BlockShape.default({ kind: "rectangle" }),
    styling: BlockStyling.optional(),
    data: BlockData,
});
export type Block = z.infer<typeof Block>;
