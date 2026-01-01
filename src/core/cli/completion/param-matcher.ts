/**
 * Parameter Completion Matching
 *
 * Provides fuzzy matching and completion logic for CLI parameter values.
 * Used by derived state to generate ghost text for parameter autocomplete.
 */

import type { ParamRuntime } from "../types/action";

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get completion options for a param based on its type and help.options
 */
export function getParamOptions(param: ParamRuntime): string[] {
    if (param.help?.options && param.help.options.length > 0) {
        return param.help.options;
    }
    return [];
}

/**
 * Simple similarity check for typo detection.
 * Checks if input is "similar enough" to target to suggest as typo fix.
 */
function isSimilar(input: string, target: string): boolean {
    const inputLower = input.toLowerCase();
    const targetLower = target.toLowerCase();

    // If lengths are too different, not similar
    if (Math.abs(inputLower.length - targetLower.length) > 2) {
        return false;
    }

    // Count matching characters
    let matches = 0;
    for (const char of inputLower) {
        if (targetLower.includes(char)) {
            matches++;
        }
    }

    // If more than 70% of chars match, consider similar
    const threshold = Math.min(inputLower.length, targetLower.length) * 0.7;
    return matches >= threshold && inputLower.length >= 2;
}

// =============================================================================
// Main Matching Function
// =============================================================================

export interface ParamMatchResult {
    /** The matched option value */
    value: string;
    /** Whether this is a prefix match (true) or fuzzy/typo match (false) */
    isPrefix: boolean;
}

/**
 * Find best matching option for current input.
 * Returns matched value and whether it's a prefix match.
 *
 * Priority:
 * 1. Exact match → null (no completion needed)
 * 2. Prefix match → { value, isPrefix: true }
 * 3. Contains match → { value, isPrefix: false }
 * 4. Typo match → { value, isPrefix: false }
 */
export function findParamMatch(input: string, options: string[]): ParamMatchResult | null {
    if (options.length === 0 || input === "" || input === "?") {
        return null;
    }

    const inputLower = input.toLowerCase();

    // Check for exact match - no completion needed
    for (const opt of options) {
        if (opt.toLowerCase() === inputLower) {
            return null;
        }
    }

    // First: exact prefix match
    for (const opt of options) {
        const optLower = opt.toLowerCase();
        if (optLower.startsWith(inputLower) && optLower !== inputLower) {
            return { value: opt, isPrefix: true };
        }
    }

    // Second: contains/fuzzy match (not prefix)
    for (const opt of options) {
        const optLower = opt.toLowerCase();
        if (optLower.includes(inputLower) && !optLower.startsWith(inputLower)) {
            return { value: opt, isPrefix: false };
        }
    }

    // Third: check for typos - simple Levenshtein-like detection
    // If input is similar enough to an option (e.g., "cntent" vs "content")
    for (const opt of options) {
        if (isSimilar(input, opt)) {
            return { value: opt, isPrefix: false };
        }
    }

    return null;
}
