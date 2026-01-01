import { evaluate } from "mathjs";

// =============================================================================
// Math Evaluator
// =============================================================================

/**
 * Normalize math input for evaluation:
 * - Convert comma to dot (5,7 → 5.7)
 * - Convert superscript digits to ^n (² → ^2, ³ → ^3)
 * - Convert × to * and ÷ to /
 */
export function normalizeForEval(input: string): string {
    let normalized = input;

    // Comma to dot
    normalized = normalized.replace(/,/g, ".");

    // Superscript digits
    const superscriptMap: Record<string, string> = {
        "⁰": "^0",
        "¹": "^1",
        "²": "^2",
        "³": "^3",
        "⁴": "^4",
        "⁵": "^5",
        "⁶": "^6",
        "⁷": "^7",
        "⁸": "^8",
        "⁹": "^9",
    };
    for (const [sup, replacement] of Object.entries(superscriptMap)) {
        normalized = normalized.split(sup).join(replacement);
    }

    // Unicode operators
    normalized = normalized.replace(/×/g, "*");
    normalized = normalized.replace(/÷/g, "/");
    normalized = normalized.replace(/−/g, "-");

    return normalized;
}

/**
 * Format result for display:
 * - Convert dot to comma (5.7 → 5,7)
 */
export function formatResult(result: number): string {
    // Handle special cases
    if (!Number.isFinite(result)) {
        return Number.isNaN(result) ? "Fehler" : result > 0 ? "∞" : "-∞";
    }

    // Format with reasonable precision, avoid trailing zeros
    let formatted = result.toPrecision(12);
    // Remove trailing zeros after decimal point
    if (formatted.includes(".")) {
        formatted = formatted.replace(/\.?0+$/, "");
    }
    // If scientific notation, try to convert back if reasonable
    if (formatted.includes("e")) {
        const num = Number.parseFloat(formatted);
        if (Math.abs(num) < 1e12 && Math.abs(num) > 1e-6) {
            formatted = num.toString();
        }
    }

    // Convert dot to comma for display
    return formatted.replace(/\./g, ",");
}

/**
 * Evaluate a math expression.
 * Returns formatted result with comma decimal separator.
 */
export function evaluateMath(input: string): { success: true; result: string } | { success: false; error: string } {
    try {
        // Remove trailing = if present
        const expression = input.replace(/=\s*$/, "").trim();
        if (expression === "") {
            return { success: false, error: "Leerer Ausdruck" };
        }

        const normalized = normalizeForEval(expression);
        const result = evaluate(normalized);

        // Handle different result types
        if (typeof result === "number") {
            return { success: true, result: formatResult(result) };
        }
        if (typeof result === "object" && result !== null) {
            // Complex numbers or matrices
            return { success: true, result: String(result).replace(/\./g, ",") };
        }
        return { success: true, result: String(result) };
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unbekannter Fehler";
        return { success: false, error: message };
    }
}

/**
 * Check if input looks like a math expression ending with =
 */
export function isMathExpression(input: string): boolean {
    return input.trim().endsWith("=");
}
