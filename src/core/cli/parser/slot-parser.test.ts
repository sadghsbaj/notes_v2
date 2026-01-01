import { describe, expect, it } from "vitest";
import { getArgs, getCommand, getCurrentArgIndex, isInCommandSlot, parseInput } from "./slot-parser";

describe("slot-parser", () => {
    describe("parseInput", () => {
        it("parses empty input", () => {
            const result = parseInput("", 0);
            expect(result.slots).toHaveLength(0);
            expect(result.raw).toBe("");
        });

        it("parses single word", () => {
            const result = parseInput("help", 4);
            expect(result.slots).toHaveLength(1);
            expect(result.slots[0].value).toBe("help");
            expect(result.slots[0].isQuoted).toBe(false);
        });

        it("parses multiple words", () => {
            const result = parseInput("goto page 5", 11);
            expect(result.slots).toHaveLength(3);
            expect(result.slots[0].value).toBe("goto");
            expect(result.slots[1].value).toBe("page");
            expect(result.slots[2].value).toBe("5");
        });

        it("handles quoted strings as single slot", () => {
            const result = parseInput('echo "hello world"', 18);
            expect(result.slots).toHaveLength(2);
            expect(result.slots[0].value).toBe("echo");
            expect(result.slots[1].value).toBe("hello world");
            expect(result.slots[1].isQuoted).toBe(true);
        });

        it("handles quotes with spaces inside", () => {
            const result = parseInput('search "multi word query"', 25);
            expect(result.slots).toHaveLength(2);
            expect(result.slots[1].value).toBe("multi word query");
        });

        it("tracks cursor in first slot", () => {
            const result = parseInput("help", 2);
            expect(result.currentSlotIndex).toBe(0);
        });

        it("tracks cursor in second slot", () => {
            const result = parseInput("goto page", 7);
            expect(result.currentSlotIndex).toBe(1);
        });

        it("handles trailing space", () => {
            const result = parseInput("help ", 5);
            expect(result.slots).toHaveLength(1);
        });
    });

    describe("getCommand", () => {
        it("returns first slot as command", () => {
            const parsed = parseInput("help", 4);
            expect(getCommand(parsed)).toBe("help");
        });

        it("returns null for empty input", () => {
            const parsed = parseInput("", 0);
            expect(getCommand(parsed)).toBeNull();
        });
    });

    describe("getArgs", () => {
        it("returns empty array for command only", () => {
            const parsed = parseInput("help", 4);
            expect(getArgs(parsed)).toHaveLength(0);
        });

        it("returns args after command", () => {
            const parsed = parseInput("goto 5 10", 9);
            const args = getArgs(parsed);
            expect(args).toHaveLength(2);
            expect(args[0].value).toBe("5");
            expect(args[1].value).toBe("10");
        });
    });

    describe("isInCommandSlot", () => {
        it("returns true when cursor in first slot", () => {
            const parsed = parseInput("he", 2);
            expect(isInCommandSlot(parsed)).toBe(true);
        });

        it("returns false when cursor in args", () => {
            const parsed = parseInput("help arg", 7);
            expect(isInCommandSlot(parsed)).toBe(false);
        });
    });

    describe("getCurrentArgIndex", () => {
        it("returns null when in command slot", () => {
            const parsed = parseInput("help", 4);
            expect(getCurrentArgIndex(parsed)).toBeNull();
        });

        it("returns 0 for first arg", () => {
            const parsed = parseInput("goto page", 7);
            expect(getCurrentArgIndex(parsed)).toBe(0);
        });

        it("returns 1 for second arg", () => {
            const parsed = parseInput("goto 5 10", 9);
            expect(getCurrentArgIndex(parsed)).toBe(1);
        });
    });
});
