import fuzzysort from "fuzzysort";
import type { Action } from "../types/action";

// =============================================================================
// Search Result
// =============================================================================

export interface SearchResult {
    action: Action;
    score: number;
    /** The matched key (id or alias) */
    matchedKey: string;
    /** Whether this is an exact match */
    isExact: boolean;
    /** Whether this is a prefix match */
    isPrefix: boolean;
}

// =============================================================================
// Fuzzy Search
// =============================================================================

/**
 * Search actions by query.
 *
 * Priority:
 * 1. Exact match (highest)
 * 2. Prefix match
 * 3. Fuzzy match (lowest)
 */
export function searchActions(query: string, actions: Action[]): SearchResult[] {
    if (query.trim() === "") {
        // Return all actions with neutral score when no query
        return actions.map((action) => ({
            action,
            score: 0,
            matchedKey: action.id,
            isExact: false,
            isPrefix: false,
        }));
    }

    const queryLower = query.toLowerCase();
    const results: SearchResult[] = [];
    const seen = new Set<string>();

    // First pass: Check for exact and prefix matches
    for (const action of actions) {
        const keys = [action.id, ...action.aliases];

        for (const key of keys) {
            const keyLower = key.toLowerCase();

            if (keyLower === queryLower) {
                // Exact match - highest priority
                if (!seen.has(action.id)) {
                    seen.add(action.id);
                    results.push({
                        action,
                        score: 1000000,
                        matchedKey: key,
                        isExact: true,
                        isPrefix: false,
                    });
                }
                break;
            }

            if (keyLower.startsWith(queryLower)) {
                // Prefix match - high priority
                if (!seen.has(action.id)) {
                    seen.add(action.id);
                    results.push({
                        action,
                        score: 100000 - (key.length - query.length),
                        matchedKey: key,
                        isExact: false,
                        isPrefix: true,
                    });
                }
                break;
            }
        }
    }

    // Second pass: Fuzzy search for remaining
    const remainingActions = actions.filter((a) => !seen.has(a.id));

    if (remainingActions.length > 0) {
        const targets = remainingActions.flatMap((action) => {
            const keys = [action.id, ...action.aliases];
            return keys.map((key) => ({
                action,
                key,
                prepared: fuzzysort.prepare(key),
            }));
        });

        const fuzzyResults = fuzzysort.go(query, targets, {
            key: "key",
            threshold: -10000,
            limit: 20,
        });

        for (const result of fuzzyResults) {
            const target = result.obj;
            if (!seen.has(target.action.id)) {
                seen.add(target.action.id);
                results.push({
                    action: target.action,
                    score: result.score,
                    matchedKey: target.key,
                    isExact: false,
                    isPrefix: false,
                });
            }
        }
    }

    return results.sort((a, b) => b.score - a.score);
}

/**
 * Get the best match for a query
 */
export function getBestMatch(query: string, actions: Action[]): SearchResult | null {
    const results = searchActions(query, actions);
    return results[0] ?? null;
}
