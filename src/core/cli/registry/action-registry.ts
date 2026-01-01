import { type SearchResult, getBestMatch, searchActions } from "../search/fuzzy";
import type { Action, ActionDefinition } from "../types/action";

// =============================================================================
// Action Registry
// =============================================================================

class ActionRegistry {
    private actions: Map<string, Action> = new Map();
    private aliasMap: Map<string, string> = new Map(); // alias → action id

    /**
     * Register an action
     */
    register(definition: ActionDefinition): void {
        const action: Action = {
            id: definition.id,
            group: definition.group ?? "util",
            aliases: definition.aliases ?? [],
            description: definition.description ?? "",
            params: definition.params ?? [],
            handler: definition.handler,
        };

        // Check for duplicate id
        if (this.actions.has(action.id)) {
            console.warn(`[ActionRegistry] Overwriting action: ${action.id}`);
        }

        this.actions.set(action.id, action);

        // Register aliases
        for (const alias of action.aliases) {
            if (this.aliasMap.has(alias)) {
                console.warn(
                    `[ActionRegistry] Alias "${alias}" already registered for "${this.aliasMap.get(alias) ?? "unknown"}"`
                );
            }
            this.aliasMap.set(alias, action.id);
        }
    }

    /**
     * Get an action by id or alias
     */
    get(idOrAlias: string): Action | null {
        // Try direct id lookup
        const direct = this.actions.get(idOrAlias);
        if (direct) {
            return direct;
        }

        // Try alias lookup
        const actionId = this.aliasMap.get(idOrAlias);
        if (actionId) {
            return this.actions.get(actionId) ?? null;
        }

        return null;
    }

    /**
     * Get all registered actions
     */
    getAll(): Action[] {
        return [...this.actions.values()];
    }

    /**
     * Search actions by query
     */
    search(query: string): SearchResult[] {
        return searchActions(query, this.getAll());
    }

    /**
     * Get best matching action for query
     */
    getBestMatch(query: string): SearchResult | null {
        return getBestMatch(query, this.getAll());
    }

    /**
     * Check if an action exists
     */
    has(idOrAlias: string): boolean {
        return this.get(idOrAlias) !== null;
    }

    /**
     * Clear all registered actions
     */
    clear(): void {
        this.actions.clear();
        this.aliasMap.clear();
    }
}

// Singleton instance
export const actionRegistry = new ActionRegistry();

// Type export
export type { ActionRegistry };
