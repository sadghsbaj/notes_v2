import { describe, expect, it } from "vitest";
import type { Action } from "../../types/action";
import { getBestMatch, searchActions } from "../fuzzy";

// Test actions
const mockActions: Action[] = [
    {
        id: "help",
        aliases: ["h", "?"],
        description: "Show help",
        params: [],
        handler: () => {},
    },
    {
        id: "goto",
        aliases: ["g", "jump"],
        description: "Go to page",
        params: [],
        handler: () => {},
    },
    {
        id: "delete",
        aliases: ["del", "rm"],
        description: "Delete item",
        params: [],
        handler: () => {},
    },
];

describe("fuzzy search", () => {
    describe("searchActions", () => {
        it("returns all actions for empty query", () => {
            const results = searchActions("", mockActions);
            expect(results).toHaveLength(3);
        });

        it("finds exact match by id", () => {
            const results = searchActions("help", mockActions);
            expect(results[0]?.action.id).toBe("help");
            expect(results[0]?.isExact).toBe(true);
        });

        it("finds match by alias", () => {
            const results = searchActions("h", mockActions);
            expect(results[0]?.action.id).toBe("help");
        });

        it("finds prefix match", () => {
            const results = searchActions("hel", mockActions);
            expect(results[0]?.action.id).toBe("help");
            expect(results[0]?.isPrefix).toBe(true);
        });

        it("finds fuzzy match", () => {
            const results = searchActions("hlp", mockActions);
            expect(results.length).toBeGreaterThan(0);
            expect(results[0]?.action.id).toBe("help");
        });

        it("prioritizes shorter prefix matches", () => {
            const results = searchActions("g", mockActions);
            expect(results[0]?.action.id).toBe("goto");
        });
    });

    describe("getBestMatch", () => {
        it("returns best match", () => {
            const result = getBestMatch("help", mockActions);
            expect(result).not.toBeNull();
            expect(result?.action.id).toBe("help");
        });

        it("returns null for no matches", () => {
            const result = getBestMatch("xyz123", []);
            expect(result).toBeNull();
        });
    });
});
