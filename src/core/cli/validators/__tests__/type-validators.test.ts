import { describe, expect, it } from "vitest";
import {
    validateBoolean,
    validateEnum,
    validateNumber,
    validateParam,
    validatePath,
    validateRange,
} from "../type-validators";

describe("Type Validators", () => {
    describe("validateNumber", () => {
        it("accepts valid integers", () => {
            expect(validateNumber("42").valid).toBe(true);
            expect(validateNumber("-17").valid).toBe(true);
            expect(validateNumber("0").valid).toBe(true);
        });

        it("accepts valid decimals with dot", () => {
            expect(validateNumber("3.14").valid).toBe(true);
            expect(validateNumber("-0.5").valid).toBe(true);
        });

        it("accepts valid decimals with comma", () => {
            expect(validateNumber("3,14").valid).toBe(true);
        });

        it("rejects invalid numbers", () => {
            expect(validateNumber("abc").valid).toBe(false);
            expect(validateNumber("12a").valid).toBe(false);
            expect(validateNumber("").valid).toBe(false);
        });
    });

    describe("validateBoolean", () => {
        it("accepts true values", () => {
            expect(validateBoolean("true").valid).toBe(true);
            expect(validateBoolean("1").valid).toBe(true);
            expect(validateBoolean("ja").valid).toBe(true);
        });

        it("accepts false values", () => {
            expect(validateBoolean("false").valid).toBe(true);
            expect(validateBoolean("0").valid).toBe(true);
            expect(validateBoolean("nein").valid).toBe(true);
        });

        it("rejects invalid booleans", () => {
            expect(validateBoolean("yes").valid).toBe(false);
            expect(validateBoolean("no").valid).toBe(false);
            expect(validateBoolean("abc").valid).toBe(false);
        });
    });

    describe("validateRange", () => {
        it("accepts single numbers", () => {
            expect(validateRange("1").valid).toBe(true);
            expect(validateRange("42").valid).toBe(true);
        });

        it("accepts ranges", () => {
            expect(validateRange("1-5").valid).toBe(true);
            expect(validateRange("10-20").valid).toBe(true);
        });

        it("accepts lists", () => {
            expect(validateRange("1;3;5").valid).toBe(true);
            expect(validateRange("1;2;3").valid).toBe(true);
        });

        it("accepts mixed ranges and lists", () => {
            expect(validateRange("1;3-5;7").valid).toBe(true);
        });

        it("accepts negative ranges", () => {
            expect(validateRange("-1").valid).toBe(true); // Last item
            expect(validateRange("-3--1").valid).toBe(true); // Last 3 items
            expect(validateRange("1--5").valid).toBe(true); // From 1 to -5
        });

        it("rejects invalid ranges", () => {
            expect(validateRange("1,2").valid).toBe(false); // comma instead of semicolon
            expect(validateRange("abc").valid).toBe(false);
            expect(validateRange(";").valid).toBe(false);
        });
    });

    describe("validatePath", () => {
        it("accepts alias paths", () => {
            expect(validatePath("@mathe").valid).toBe(true);
            expect(validatePath("@deutsch/heute").valid).toBe(true);
        });

        it("accepts relative paths", () => {
            expect(validatePath("./folder").valid).toBe(true);
            expect(validatePath("../parent").valid).toBe(true);
            expect(validatePath("file.txt").valid).toBe(true);
        });

        it("rejects invalid paths", () => {
            expect(validatePath("@").valid).toBe(false);
            expect(validatePath("@123").valid).toBe(false); // starts with number after @
        });
    });

    describe("validateEnum", () => {
        it("accepts valid options", () => {
            expect(validateEnum("fs", ["fs", "scan"]).valid).toBe(true);
            expect(validateEnum("scan", ["fs", "scan"]).valid).toBe(true);
        });

        it("rejects invalid options", () => {
            const result = validateEnum("invalid", ["fs", "scan"]);
            expect(result.valid).toBe(false);
            expect(result.error).toContain("fs | scan");
        });
    });

    describe("validateParam", () => {
        it("uses correct validator for each type", () => {
            expect(validateParam("42", "number").valid).toBe(true);
            expect(validateParam("abc", "number").valid).toBe(false);

            expect(validateParam("true", "boolean").valid).toBe(true);
            expect(validateParam("maybe", "boolean").valid).toBe(false);

            expect(validateParam("1;3-5", "range").valid).toBe(true);
            expect(validateParam("@mathe", "path").valid).toBe(true);
        });

        it("validates enum with options from help", () => {
            const result = validateParam("fs", "enum", { options: ["fs", "scan"] });
            expect(result.valid).toBe(true);

            const invalid = validateParam("invalid", "enum", { options: ["fs", "scan"] });
            expect(invalid.valid).toBe(false);
        });
    });
});
