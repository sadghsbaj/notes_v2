/**
 * Page Commands (Stubs)
 *
 * Commands for manipulating pages within a document.
 * All handlers are stubs that log to console.
 */

import { actionRegistry } from "../registry/action-registry";

// =============================================================================
// page-add - Add New Page
// =============================================================================

actionRegistry.register({
    id: "page-add",
    group: "page",
    aliases: ["pa"],
    description: "Neue Seite hinzufügen",
    params: [{ name: "position", type: "number", optional: true, hint: "Position (Standard: Ende)" }],
    handler: (args) => {
        console.log("[page-add]", args.position ?? "am Ende");
    },
});

// =============================================================================
// page-rm - Remove Page
// =============================================================================

actionRegistry.register({
    id: "page-rm",
    group: "page",
    aliases: ["pd", "page-del"],
    description: "Seite löschen",
    params: [{ name: "pages", type: "range", optional: false, hint: "z.B. 1 oder 3-5 oder 1;3;5" }],
    handler: (args) => {
        console.log("[page-rm]", args.pages);
    },
});

// =============================================================================
// page-swap - Swap Two Pages
// =============================================================================

actionRegistry.register({
    id: "page-swap",
    group: "page",
    aliases: ["ps"],
    description: "Zwei Seiten tauschen",
    params: [
        { name: "a", type: "number", optional: false, hint: "Erste Seite" },
        { name: "b", type: "number", optional: false, hint: "Zweite Seite" },
    ],
    handler: (args) => {
        console.log("[page-swap]", args.a, "↔", args.b);
    },
});

// =============================================================================
// page-mv - Move Page(s) to Position
// =============================================================================

actionRegistry.register({
    id: "page-mv",
    group: "page",
    aliases: ["pm"],
    description: "Seiten verschieben",
    params: [
        { name: "pages", type: "range", optional: false, hint: "Zu verschiebende Seiten" },
        { name: "target", type: "number", optional: false, hint: "Zielposition" },
    ],
    handler: (args) => {
        console.log("[page-mv]", args.pages, "→", args.target);
    },
});

// =============================================================================
// page-clear - Clear Page Content
// =============================================================================

actionRegistry.register({
    id: "page-clear",
    group: "page",
    aliases: ["pc"],
    description: "Seiteninhalt löschen",
    params: [{ name: "pages", type: "range", optional: true, default: ".", hint: "Seiten (Standard: aktuelle)" }],
    handler: (args) => {
        console.log("[page-clear]", args.pages);
    },
});

// =============================================================================
// page-rotate - Rotate Page
// =============================================================================

actionRegistry.register({
    id: "page-rotate",
    group: "page",
    aliases: ["pr"],
    description: "Seite rotieren",
    params: [
        { name: "pages", type: "range", optional: true, default: ".", hint: "Seiten" },
        { name: "degrees", type: "number", optional: true, default: 90, hint: "90, 180, 270" },
    ],
    handler: (args) => {
        console.log("[page-rotate]", args.pages, `${args.degrees}°`);
    },
});

// =============================================================================
// page-import - Import Pages from File
// =============================================================================

actionRegistry.register({
    id: "page-import",
    group: "page",
    aliases: ["pi"],
    description: "Seiten aus Datei importieren",
    params: [
        { name: "file", type: "string", optional: false, hint: "PDF oder Bilddatei" },
        { name: "position", type: "number", optional: true, hint: "Position (Standard: Ende)" },
    ],
    handler: (args) => {
        console.log("[page-import]", args.file, args.position ?? "am Ende");
    },
});

// =============================================================================
// page-export - Export Pages
// =============================================================================

actionRegistry.register({
    id: "page-export",
    group: "page",
    aliases: ["pe"],
    description: "Seiten exportieren",
    params: [
        { name: "pages", type: "range", optional: true, default: ".", hint: "Seiten (Standard: alle)" },
        { name: "file", type: "string", optional: false, hint: "Zieldatei (PDF)" },
    ],
    handler: (args) => {
        console.log("[page-export]", args.pages, "→", args.file);
    },
});
