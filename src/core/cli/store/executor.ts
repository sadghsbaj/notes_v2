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
        let validationResult: { valid: boolean; error?: string; normalized?: unknown };

        if (param.validate) {
            validationResult = param.validate(rawValue, param.name);
            if (!validationResult.valid) {
                error = validationResult.error ?? `Ungültig: ${param.name}`;
                break;
            }
        } else {
            validationResult = validateParam(rawValue, param.type, param.help);
            if (!validationResult.valid) {
                error = `${param.name}: ${validationResult.error}`;
                break;
            }
        }

        // Use normalized value if available, otherwise parse based on type
        if (validationResult.normalized !== undefined) {
            args[param.name] = validationResult.normalized;
        } else {
            // Fallback parsing for types without normalization
            switch (param.type) {
                case "boolean":
                    args[param.name] = rawValue.toLowerCase() === "true" || rawValue === "1" || rawValue === "ja";
                    break;
                default:
                    // range, path, enum, string - keep as string
                    args[param.name] = rawValue;
            }
        }

        if (error) break;
    }

    return { args, error };
}
