import { describe, expect, it } from "vitest";
import type { Param } from "../../types/action";
import type { Slot } from "../../types/slot";
import { parseArgs } from "../executor";

// Helper to create slots
const slot = (value: string): Slot => ({
    raw: value,
    value,
    startIndex: 0,
    endIndex: value.length,
    isQuoted: false,
});

describe("executor", () => {
    describe("parseArgs", () => {
        it("parses string param", () => {
            const params: Param[] = [{ name: "text", type: "string", optional: false }];
            const slots = [slot("hello")];
            const result = parseArgs(params, slots);
            expect(result.error).toBeNull();
            expect(result.args.text).toBe("hello");
        });

        it("parses number param with dot", () => {
            const params: Param[] = [{ name: "num", type: "number", optional: false }];
            const slots = [slot("5.7")];
            const result = parseArgs(params, slots);
            expect(result.error).toBeNull();
            expect(result.args.num).toBe(5.7);
        });

        it("parses number param with comma", () => {
            const params: Param[] = [{ name: "num", type: "number", optional: false }];
            const slots = [slot("5,7")];
            const result = parseArgs(params, slots);
            expect(result.error).toBeNull();
            expect(result.args.num).toBe(5.7);
        });

        it("parses boolean param true", () => {
            const params: Param[] = [{ name: "flag", type: "boolean", optional: false }];
            const slots = [slot("true")];
            const result = parseArgs(params, slots);
            expect(result.error).toBeNull();
            expect(result.args.flag).toBe(true);
        });

        it("parses boolean param 1", () => {
            const params: Param[] = [{ name: "flag", type: "boolean", optional: false }];
            const slots = [slot("1")];
            const result = parseArgs(params, slots);
            expect(result.args.flag).toBe(true);
        });

        it("parses boolean param ja", () => {
            const params: Param[] = [{ name: "flag", type: "boolean", optional: false }];
            const slots = [slot("ja")];
            const result = parseArgs(params, slots);
            expect(result.args.flag).toBe(true);
        });

        it("uses default for missing optional param", () => {
            const params: Param[] = [{ name: "opt", type: "string", optional: true, default: "default" }];
            const slots: Slot[] = [];
            const result = parseArgs(params, slots);
            expect(result.error).toBeNull();
            expect(result.args.opt).toBe("default");
        });

        it("uses _ placeholder to skip to default", () => {
            const params: Param[] = [{ name: "opt", type: "string", optional: true, default: "default" }];
            const slots = [slot("_")];
            const result = parseArgs(params, slots);
            expect(result.error).toBeNull();
            expect(result.args.opt).toBe("default");
        });

        it("returns error for missing required param", () => {
            const params: Param[] = [{ name: "required", type: "string", optional: false }];
            const slots: Slot[] = [];
            const result = parseArgs(params, slots);
            expect(result.error).toBe("Fehlt: required");
        });

        it("returns error for invalid number", () => {
            const params: Param[] = [{ name: "num", type: "number", optional: false }];
            const slots = [slot("abc")];
            const result = parseArgs(params, slots);
            expect(result.error).toBe("num: keine Zahl");
        });

        it("handles multiple params", () => {
            const params: Param[] = [
                { name: "a", type: "string", optional: false },
                { name: "b", type: "number", optional: false },
            ];
            const slots = [slot("hello"), slot("42")];
            const result = parseArgs(params, slots);
            expect(result.error).toBeNull();
            expect(result.args.a).toBe("hello");
            expect(result.args.b).toBe(42);
        });
    });
});
