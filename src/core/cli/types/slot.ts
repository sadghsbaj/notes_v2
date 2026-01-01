import { z } from "zod";

// =============================================================================
// Slot Schema
// =============================================================================

export const SlotSchema = z.object({
    /** Original raw text including quotes */
    raw: z.string(),
    /** Parsed value (quotes stripped) */
    value: z.string(),
    /** Start index in original input */
    startIndex: z.number(),
    /** End index in original input (exclusive) */
    endIndex: z.number(),
    /** Whether this slot was quoted */
    isQuoted: z.boolean().default(false),
});

export type Slot = z.infer<typeof SlotSchema>;

// =============================================================================
// Parsed Input Schema
// =============================================================================

export const ParsedInputSchema = z.object({
    /** Original raw input string */
    raw: z.string(),
    /** Parsed slots */
    slots: z.array(SlotSchema),
    /** Current cursor position */
    cursorPosition: z.number(),
    /** Index of slot where cursor is (null if between slots) */
    currentSlotIndex: z.number().nullable(),
    /** Whether currently inside a quoted string */
    inQuote: z.boolean(),
});

export type ParsedInput = z.infer<typeof ParsedInputSchema>;

// =============================================================================
// Empty Parsed Input
// =============================================================================

export const emptyParsedInput: ParsedInput = {
    raw: "",
    slots: [],
    cursorPosition: 0,
    currentSlotIndex: null,
    inQuote: false,
};
