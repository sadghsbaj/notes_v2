import type { Param } from "../types/action";
import type { Slot } from "../types/slot";

// =============================================================================
// Parameter Execution
// =============================================================================

/** Placeholder for skipping optional params: _ */
const SKIP_PLACEHOLDER = "_";

export interface ParsedArgs {
    args: Record<string, unknown>;
    error: string | null;
}

/**
 * Parse argument slots into typed values based on param definitions.
 * - Handles optional params with defaults
 * - "_" as placeholder skips to default value
 * - Returns error if required param is missing
 */
export function parseArgs(params: Param[], slots: Slot[]): ParsedArgs {
    const args: Record<string, unknown> = {};
    let error: string | null = null;

    for (let i = 0; i < params.length; i++) {
        const param = params[i];
        if (!param) continue;

        const slot = slots[i];
        const rawValue = slot?.value;

        // Check if skipped with placeholder or missing
        const isSkipped = rawValue === SKIP_PLACEHOLDER || rawValue === undefined || rawValue === "";

        if (isSkipped) {
            // Use default if available
            if (param.default !== undefined) {
                args[param.name] = param.default;
            } else if (param.optional) {
                // Optional without default = undefined
                args[param.name] = undefined;
            } else {
                // Required param missing
                error = `Fehlt: ${param.name}`;
                break;
            }
            continue;
        }

        // Parse based on type
        switch (param.type) {
            case "number": {
                const numStr = rawValue.replace(",", ".");
                const num = Number.parseFloat(numStr);
                if (Number.isNaN(num)) {
                    error = `${param.name}: keine Zahl`;
                    break;
                }
                args[param.name] = num;
                break;
            }
            case "boolean":
                args[param.name] = rawValue.toLowerCase() === "true" || rawValue === "1" || rawValue === "ja";
                break;
            case "range":
                // Will be parsed by command if needed
                args[param.name] = rawValue;
                break;
            default:
                args[param.name] = rawValue;
        }

        if (error) break;
    }

    return { args, error };
}
