import type { ParamRuntime } from "../types/action";
import type { Slot } from "../types/slot";
import { validateParam } from "../validators";

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
 * - Validates using type validators or custom validators
 * - Handles optional params with defaults
 * - "_" as placeholder skips to default value
 * - Returns error if required param is missing or validation fails
 */
export function parseArgs(params: ParamRuntime[], slots: Slot[]): ParsedArgs {
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

        // Validate the value
        // Use custom validator if provided, otherwise use type validator
        if (param.validate) {
            const result = param.validate(rawValue, param.name);
            if (!result.valid) {
                error = result.error ?? `Ungültig: ${param.name}`;
                break;
            }
        } else {
            const result = validateParam(rawValue, param.type, param.help);
            if (!result.valid) {
                error = `${param.name}: ${result.error}`;
                break;
            }
        }

        // Parse based on type
        switch (param.type) {
            case "number": {
                const numStr = rawValue.replace(",", ".");
                args[param.name] = Number.parseFloat(numStr);
                break;
            }
            case "boolean":
                args[param.name] = rawValue.toLowerCase() === "true" || rawValue === "1" || rawValue === "ja";
                break;
            default:
                // range, path, enum, string - keep as string
                args[param.name] = rawValue;
        }

        if (error) break;
    }

    return { args, error };
}
