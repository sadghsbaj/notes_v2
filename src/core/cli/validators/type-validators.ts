/**
 * Type Validators
 *
 * Centralized validation logic for CLI parameter types.
 * Each validator returns { valid: true } or { valid: false, error: string }.
 */

import type { ParamHelp, ParamType, ValidationResult } from "../types/action";

// =============================================================================
// Validator Functions
// =============================================================================

/**
 * Validate a number input
 * Accepts integers and decimals with . or , as separator
 * Returns normalized: the parsed number
 */
export function validateNumber(value: string): ValidationResult {
    const normalized = value.replace(",", ".");
    if (!/^-?\d+(\.\d+)?$/.test(normalized)) {
        return { valid: false, error: "Keine gültige Zahl" };
    }
    return { valid: true, normalized: Number.parseFloat(normalized) };
}

/**
 * Validate a boolean input
 * Accepts: true/false, 1/0, ja/nein
 */
export function validateBoolean(value: string): ValidationResult {
    const lower = value.toLowerCase();
    const validValues = ["true", "false", "1", "0", "ja", "nein"];
    if (!validValues.includes(lower)) {
        return { valid: false, error: "Erwartet: true/false, ja/nein, 1/0" };
    }
    return { valid: true };
}

/**
 * Validate a range input
 * Accepts: single number (1), range (1-5), list (1;3;5), or mixed (1;3-5;7)
 * Supports negative numbers: -1 (last), -2 (second-to-last), etc.
 */
export function validateRange(value: string): ValidationResult {
    // Allow: digits, semicolons, hyphens (for ranges and negative numbers)
    // Each segment must be either a number or a range (number-number)
    const segments = value.split(";");

    for (const segment of segments) {
        const trimmed = segment.trim();
        if (trimmed === "") {
            return { valid: false, error: "Leeres Segment im Range" };
        }

        // Check if it's a span (e.g., "3-5", "-3--1")
        // Pattern: number, dash, number (where numbers can be negative)
        const spanMatch = trimmed.match(/^(-?\d+)-(-?\d+)$/);

        if (spanMatch) {
            // Valid span - both parts are numbers
            continue;
        }

        // Single number (positive or negative)
        if (!/^-?\d+$/.test(trimmed)) {
            return { valid: false, error: `Keine Zahl: ${trimmed}` };
        }
    }

    return { valid: true };
}

/**
 * Validate a path input
 * Accepts: relative paths, absolute paths, or @alias paths
 */
export function validatePath(value: string): ValidationResult {
    // Allow: @alias, ./, ../, or any path-like string
    if (value.startsWith("@")) {
        // Alias path: @name (must start with letter) optionally followed by /subpath
        if (!/^@[a-zA-Z][\w-]*(\/[\w\-./]*)?$/.test(value)) {
            return { valid: false, error: "Ungültiger Alias (z.B. @mathe)" };
        }
    } else {
        // Regular path: must contain valid path characters
        if (!/^[.\w\-/\\]+$/.test(value)) {
            return { valid: false, error: "Ungültiger Pfad" };
        }
    }
    return { valid: true };
}

/**
 * Validate an enum input
 * Checks if value is one of the allowed options
 */
export function validateEnum(value: string, options: string[]): ValidationResult {
    if (!options.includes(value)) {
        return {
            valid: false,
            error: `Erwartet: ${options.join(" | ")}`,
        };
    }
    return { valid: true };
}

/**
 * Validate a string input
 * Always valid (string is the default fallback)
 */
export function validateString(_value: string): ValidationResult {
    return { valid: true };
}

// =============================================================================
// Type Validator Registry
// =============================================================================

type TypeValidator = (value: string, options?: string[]) => ValidationResult;

const typeValidators: Record<ParamType, TypeValidator> = {
    string: validateString,
    number: validateNumber,
    boolean: validateBoolean,
    range: validateRange,
    path: validatePath,
    enum: (value, options) => validateEnum(value, options ?? []),
};

// =============================================================================
// Main Validation Function
// =============================================================================

/**
 * Validate a parameter value against its type.
 * Uses the type-based validator, or a custom validator if provided.
 */
export function validateParam(value: string, type: ParamType, help?: ParamHelp): ValidationResult {
    const validator = typeValidators[type];

    if (type === "enum") {
        // Enum requires options from help
        const options = help?.options ?? [];
        return validator(value, options);
    }

    return validator(value);
}

// =============================================================================
// Exports
// =============================================================================

export { typeValidators, type TypeValidator };
