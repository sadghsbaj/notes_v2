import { describe, expect, it } from "vitest";
import { isValidRangeString, parseRange } from "../range-parser";

describe("range-parser", () => {
    describe("parseRange", () => {
        it("parses single number", () => {
            const result = parseRange("5");
            expect(result.segments).toHaveLength(1);
            expect(result.segments[0]).toEqual({ type: "single", value: 5 });
        });

        it("parses multiple singles with semicolon", () => {
            const result = parseRange("1;3;5");
            expect(result.segments).toHaveLength(3);
            expect(result.segments[0]).toEqual({ type: "single", value: 1 });
            expect(result.segments[1]).toEqual({ type: "single", value: 3 });
            expect(result.segments[2]).toEqual({ type: "single", value: 5 });
        });

        it("parses span with dash", () => {
            const result = parseRange("3-7");
            expect(result.segments).toHaveLength(1);
            expect(result.segments[0]).toEqual({ type: "span", start: 3, end: 7 });
        });

        it("parses mixed singles and spans", () => {
            const result = parseRange("1;3-7;9");
            expect(result.segments).toHaveLength(3);
            expect(result.segments[0]).toEqual({ type: "single", value: 1 });
            expect(result.segments[1]).toEqual({ type: "span", start: 3, end: 7 });
            expect(result.segments[2]).toEqual({ type: "single", value: 9 });
        });

        it("handles negative indices", () => {
            const result = parseRange("-1");
            expect(result.segments[0]).toEqual({ type: "single", value: -1 });
        });

        it("handles negative span end", () => {
            const result = parseRange("1--1");
            expect(result.segments[0]).toEqual({ type: "span", start: 1, end: -1 });
        });

        it("returns empty segments for empty input", () => {
            const result = parseRange("");
            expect(result.segments).toHaveLength(0);
        });
    });

    describe("isValidRangeString", () => {
        it("returns true for valid input", () => {
            expect(isValidRangeString("1;3-7")).toBe(true);
        });

        it("returns false for invalid input", () => {
            expect(isValidRangeString("abc")).toBe(false);
        });

        it("returns false for empty input", () => {
            expect(isValidRangeString("")).toBe(false);
        });
    });
});
