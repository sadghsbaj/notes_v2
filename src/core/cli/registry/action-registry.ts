import { type SearchResult, getBestMatch, searchActions } from "../search/fuzzy";
import type { Action, ActionDefinition, ParamRuntime } from "../types/action";

// =============================================================================
// Action Registry
// =============================================================================

class ActionRegistry {
    private actions: Map<string, Action> = new Map();

    /**
     * Register an action
     */
    register(definition: ActionDefinition): void {
        const action: Action = {
            id: definition.id,
            group: definition.group ?? "util",
            description: definition.description ?? "",
            params: (definition.params ?? []) as ParamRuntime[],
            confirm: definition.confirm ?? false,
            handler: definition.handler,
        };

        // Check for duplicate id
        if (this.actions.has(action.id)) {
            console.warn(`[ActionRegistry] Overwriting action: ${action.id}`);
        }

        this.actions.set(action.id, action);
    }

    /**
     * Get an action by id
     */
    get(id: string): Action | null {
        return this.actions.get(id) ?? null;
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
    has(id: string): boolean {
        return this.actions.has(id);
    }

    /**
     * Clear all registered actions
     */
    clear(): void {
        this.actions.clear();
    }
}

// Singleton instance
export const actionRegistry = new ActionRegistry();

// Type export
export type { ActionRegistry };
