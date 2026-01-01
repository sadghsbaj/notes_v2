import type { Range, RangeSegment } from "../types/range";

// =============================================================================
// Range Parser
// =============================================================================

/**
 * Parse a range string into segments.
 *
 * Format: `1;3-7;9` → single values and spans separated by `;`
 *
 * Examples:
 * - `1` → single value 1
 * - `3-7` → span from 3 to 7 inclusive
 * - `1;3-7;9` → [1, 3-7, 9]
 * - `-1` → last item
 * - `-3--1` → last 3 items
 *
 * All values are 1-based from user perspective.
 */
export function parseRange(input: string): Range {
    const trimmed = input.trim();
    if (trimmed === "") {
        return { raw: input, segments: [] };
    }

    const segments: RangeSegment[] = [];
    const parts = trimmed.split(";");

    for (const part of parts) {
        const segment = parseSegment(part.trim());
        if (segment !== null) {
            segments.push(segment);
        }
    }

    return { raw: input, segments };
}

/**
 * Parse a single segment (either "5" or "3-7" or "-1")
 */
function parseSegment(part: string): RangeSegment | null {
    if (part === "") return null;

    // Check for span: handles "3-7", "-1--3", "1--1"
    // Match pattern: number, dash, number (where numbers can be negative)
    const spanMatch = part.match(/^(-?\d+)-(-?\d+)$/);

    if (spanMatch) {
        const start = Number.parseInt(spanMatch[1], 10);
        const end = Number.parseInt(spanMatch[2], 10);

        if (!isNaN(start) && !isNaN(end)) {
            return { type: "span", start, end };
        }
    }

    // Single value
    const value = Number.parseInt(part, 10);
    if (!isNaN(value)) {
        return { type: "single", value };
    }

    return null;
}

/**
 * Check if a string looks like a valid range
 */
export function isValidRangeString(input: string): boolean {
    const trimmed = input.trim();
    if (trimmed === "") return false;

    // Valid characters: digits, minus, semicolon
    return /^[\d\-;]+$/.test(trimmed);
}
