// =============================================================================
// Document Model Schemas - Re-exports
// =============================================================================

// Primitives
export {
    DocId,
    PageId,
    BlockId,
    AssetId,
    IsoTimestamp,
    Rotation,
} from "./primitives";

// Rect
export { Rect } from "./rect";

// Block
export {
    Block,
    BlockAnchor,
    BlockAnchorPage,
    BlockAnchorViewport,
    BlockStyling,
    BlockShape,
    BlockData,
    BlockDataRichtext,
    BlockConnection,
} from "./block";

// Asset
export { AssetRef, AssetType, AssetMeta } from "./asset";

// Page Background
export {
    PageBackground,
    BlankBackground,
    ImageBackground,
    AiInteractiveBackground,
} from "./page-background";

// Page
export { Page } from "./page";

// Document
export { DocumentContent, CURRENT_SCHEMA_VERSION } from "./document";

// Meta
export { DocumentMeta } from "./meta";

// UI State
export { DocumentUiState } from "./ui-state";

// =============================================================================
// Type Re-exports
// =============================================================================

export type { Rect as RectType } from "./rect";
export type { Block as BlockType } from "./block";
export type { AssetRef as AssetRefType } from "./asset";
export type { Page as PageType } from "./page";
export type { DocumentContent as DocumentContentType } from "./document";
export type { DocumentMeta as DocumentMetaType } from "./meta";
export type { DocumentUiState as DocumentUiStateType } from "./ui-state";
