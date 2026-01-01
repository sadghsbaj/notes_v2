import { z } from "zod";

// =============================================================================
// Range Segment Types
// =============================================================================

/** Single value: 5 → index 5 */
export const SingleValueSchema = z.object({
    type: z.literal("single"),
    /** 1-based value from user input */
    value: z.number(),
});

export type SingleValue = z.infer<typeof SingleValueSchema>;

/** Range span: 3-7 → indices 3,4,5,6,7 */
export const RangeSpanSchema = z.object({
    type: z.literal("span"),
    /** 1-based start (inclusive) */
    start: z.number(),
    /** 1-based end (inclusive) */
    end: z.number(),
});

export type RangeSpan = z.infer<typeof RangeSpanSchema>;

/** A segment is either a single value or a span */
export const RangeSegmentSchema = z.discriminatedUnion("type", [SingleValueSchema, RangeSpanSchema]);

export type RangeSegment = z.infer<typeof RangeSegmentSchema>;

// =============================================================================
// Range Schema
// =============================================================================

export const RangeSchema = z.object({
    /** Raw input string */
    raw: z.string(),
    /** Parsed segments */
    segments: z.array(RangeSegmentSchema),
});

export type Range = z.infer<typeof RangeSchema>;

// =============================================================================
// Resolved Range (expanded to 0-based indices)
// =============================================================================

/**
 * Expand a range to 0-based indices for internal use.
 * @param range Parsed range with 1-based values
 * @param total Total count for resolving negative indices
 * @returns Array of 0-based indices, sorted and deduplicated
 */
export function resolveRange(range: Range, total: number): number[] {
    const indices = new Set<number>();

    for (const segment of range.segments) {
        if (segment.type === "single") {
            const idx = resolveIndex(segment.value, total);
            if (idx !== null) indices.add(idx);
        } else {
            const startIdx = resolveIndex(segment.start, total);
            const endIdx = resolveIndex(segment.end, total);
            if (startIdx !== null && endIdx !== null) {
                const [from, to] = startIdx <= endIdx ? [startIdx, endIdx] : [endIdx, startIdx];
                for (let i = from; i <= to; i++) {
                    indices.add(i);
                }
            }
        }
    }

    return [...indices].sort((a, b) => a - b);
}

/**
 * Convert 1-based user index to 0-based internal index.
 * Handles negative indices: -1 = last, -2 = second-to-last
 */
function resolveIndex(value: number, total: number): number | null {
    if (value === 0) return null; // 0 is invalid in 1-based system

    let zeroBasedIndex: number;
    if (value > 0) {
        zeroBasedIndex = value - 1; // 1 → 0, 2 → 1, etc.
    } else {
        zeroBasedIndex = total + value; // -1 → total-1 (last), -2 → total-2
    }

    // Bounds check
    if (zeroBasedIndex < 0 || zeroBasedIndex >= total) return null;
    return zeroBasedIndex;
}
