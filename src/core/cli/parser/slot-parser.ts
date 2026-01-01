import type { ParsedInput, Slot } from "../types/slot";

// =============================================================================
// Slot Parser
// =============================================================================

/**
 * Parse CLI input string into slots.
 * - Spaces separate slots
 * - Quoted strings ("...") are single slots
 * - Tracks cursor position to determine active slot
 */
export function parseInput(input: string, cursorPosition: number = input.length): ParsedInput {
    const slots: Slot[] = [];
    let currentSlotIndex: number | null = null;
    let inQuote = false;

    let i = 0;
    while (i < input.length) {
        // Skip whitespace between slots
        while (i < input.length && input[i] === " " && !inQuote) {
            i++;
        }

        if (i >= input.length) break;

        const startIndex = i;
        let raw = "";
        let value = "";
        let isQuoted = false;

        // Check for quoted string
        if (input[i] === '"') {
            isQuoted = true;
            inQuote = true;
            raw += input[i];
            i++;

            // Collect until closing quote or end
            while (i < input.length && input[i] !== '"') {
                raw += input[i];
                value += input[i];
                i++;
            }

            // Include closing quote if present
            if (i < input.length && input[i] === '"') {
                raw += input[i];
                i++;
                inQuote = false;
            }
        } else {
            // Regular slot - collect until space or quote
            while (i < input.length && input[i] !== " " && input[i] !== '"') {
                raw += input[i];
                value += input[i];
                i++;
            }
        }

        const endIndex = i;

        slots.push({
            raw,
            value,
            startIndex,
            endIndex,
            isQuoted,
        });

        // Check if cursor is in this slot
        if (cursorPosition >= startIndex && cursorPosition <= endIndex) {
            currentSlotIndex = slots.length - 1;
        }
    }

    // If cursor is at end after last slot or in trailing space
    if (currentSlotIndex === null && cursorPosition >= 0) {
        // Check if cursor is after all slots
        if (slots.length === 0) {
            currentSlotIndex = null;
        } else if (cursorPosition > slots[slots.length - 1].endIndex) {
            // Cursor is after last slot - next slot position
            currentSlotIndex = slots.length;
        }
    }

    // Check if we're still in an unclosed quote
    const stillInQuote =
        inQuote ||
        (slots.length > 0 &&
            slots[slots.length - 1].isQuoted &&
            !input.slice(slots[slots.length - 1].startIndex).includes('"', 1));

    return {
        raw: input,
        slots,
        cursorPosition,
        currentSlotIndex,
        inQuote: stillInQuote,
    };
}

/**
 * Get the command (slot 0) from parsed input
 */
export function getCommand(parsed: ParsedInput): string | null {
    if (parsed.slots.length === 0) return null;
    return parsed.slots[0].value;
}

/**
 * Get argument slots (slot 1..n)
 */
export function getArgs(parsed: ParsedInput): Slot[] {
    return parsed.slots.slice(1);
}

/**
 * Get the value of a specific slot by index
 */
export function getSlotValue(parsed: ParsedInput, index: number): string | null {
    if (index < 0 || index >= parsed.slots.length) return null;
    return parsed.slots[index].value;
}

/**
 * Check if the current slot is the command slot (slot 0)
 */
export function isInCommandSlot(parsed: ParsedInput): boolean {
    return parsed.currentSlotIndex === 0 || (parsed.currentSlotIndex === null && parsed.slots.length === 0);
}

/**
 * Get the current argument index (0-based, relative to args)
 * Returns null if in command slot or no input
 */
export function getCurrentArgIndex(parsed: ParsedInput): number | null {
    if (parsed.currentSlotIndex === null || parsed.currentSlotIndex <= 0) return null;
    return parsed.currentSlotIndex - 1;
}
