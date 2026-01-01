import { describe, expect, it } from "vitest";
import { evaluateMath, formatResult, isMathExpression, normalizeForEval } from "./math-eval";

describe("math-eval", () => {
    describe("normalizeForEval", () => {
        it("converts comma to dot", () => {
            expect(normalizeForEval("5,7")).toBe("5.7");
        });

        it("converts superscript digits", () => {
            expect(normalizeForEval("2²")).toBe("2^2");
            expect(normalizeForEval("x³")).toBe("x^3");
        });

        it("converts unicode operators", () => {
            expect(normalizeForEval("5×3")).toBe("5*3");
            expect(normalizeForEval("6÷2")).toBe("6/2");
            expect(normalizeForEval("5−3")).toBe("5-3");
        });

        it("handles complex expression", () => {
            expect(normalizeForEval("5,7×2²")).toBe("5.7*2^2");
        });
    });

    describe("formatResult", () => {
        it("converts dot to comma", () => {
            expect(formatResult(5.7)).toBe("5,7");
        });

        it("handles integers", () => {
            expect(formatResult(42)).toBe("42");
        });

        it("handles infinity", () => {
            expect(formatResult(Number.POSITIVE_INFINITY)).toBe("∞");
            expect(formatResult(Number.NEGATIVE_INFINITY)).toBe("-∞");
        });

        it("handles NaN", () => {
            expect(formatResult(Number.NaN)).toBe("Fehler");
        });
    });

    describe("evaluateMath", () => {
        it("evaluates simple addition", () => {
            const result = evaluateMath("2+3");
            expect(result.success).toBe(true);
            if (result.success) expect(result.result).toBe("5");
        });

        it("evaluates with comma decimals", () => {
            const result = evaluateMath("5,7*2");
            expect(result.success).toBe(true);
            if (result.success) expect(result.result).toBe("11,4");
        });

        it("handles exponents", () => {
            const result = evaluateMath("2^3");
            expect(result.success).toBe(true);
            if (result.success) expect(result.result).toBe("8");
        });

        it("removes trailing =", () => {
            const result = evaluateMath("2+3=");
            expect(result.success).toBe(true);
            if (result.success) expect(result.result).toBe("5");
        });

        it("returns error for empty expression", () => {
            const result = evaluateMath("");
            expect(result.success).toBe(false);
        });
    });

    describe("isMathExpression", () => {
        it("returns true for input ending with =", () => {
            expect(isMathExpression("2+3=")).toBe(true);
        });

        it("returns false for input without =", () => {
            expect(isMathExpression("2+3")).toBe(false);
        });

        it("handles whitespace", () => {
            expect(isMathExpression("2+3 = ")).toBe(true);
        });
    });
});
