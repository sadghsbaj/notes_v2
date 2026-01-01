/**
 * Parameter Completion Matching
 *
 * Provides fuzzy matching and completion logic for CLI parameter values.
 * Uses fuzzysort for consistent matching with command search.
 */

import fuzzysort from "fuzzysort";
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
 * 3. Fuzzy match (via fuzzysort) → { value, isPrefix: false }
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

    // First: exact prefix match (highest priority after exact)
    for (const opt of options) {
        const optLower = opt.toLowerCase();
        if (optLower.startsWith(inputLower) && optLower !== inputLower) {
            return { value: opt, isPrefix: true };
        }
    }

    // Second: fuzzy match via fuzzysort (handles typos, subsequences, etc.)
    // Only search options that aren't already matched above
    const nonPrefixOptions = options.filter((opt) => !opt.toLowerCase().startsWith(inputLower));

    if (nonPrefixOptions.length > 0) {
        const fuzzyResults = fuzzysort.go(input, nonPrefixOptions, {
            threshold: -5000, // Fairly lenient for short option strings
            limit: 1,
        });

        if (fuzzyResults.length > 0 && fuzzyResults[0]) {
            return { value: fuzzyResults[0].target, isPrefix: false };
        }
    }

    return null;
}
