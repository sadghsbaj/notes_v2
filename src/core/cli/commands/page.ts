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
    description: "Neue Seite hinzufügen",
    params: [
        { name: "count", type: "number", optional: true, default: 1, hint: "Anzahl (Standard: 1)" },
        { name: "pos", type: "number", optional: true, default: -1, hint: "Position (Standard: Ende)" },
        { name: "height", type: "number", optional: true, default: 1130, hint: "Höhe in px (Standard: 1130)" },
    ],
    handler: (args) => {
        console.log("[page-add]", `${args["count"]}x`, `pos=${args["pos"]}`, `h=${args["height"]}px`);
    },
});

// =============================================================================
// page-rm - Remove Page
// =============================================================================

actionRegistry.register({
    id: "page-rm",
    group: "page",
    description: "Seite löschen",
    confirm: "delete",
    params: [{ name: "pages", type: "range", optional: false, hint: "z.B. 1 oder 3-5 oder 1;3;5" }],
    handler: (args) => {
        console.log("[page-rm]", args["pages"]);
    },
});

// =============================================================================
// page-swap - Swap Two Pages
// =============================================================================

actionRegistry.register({
    id: "page-swap",
    group: "page",
    description: "Zwei Seiten tauschen",
    params: [
        { name: "a", type: "number", optional: false, hint: "Erste Seite" },
        { name: "b", type: "number", optional: false, hint: "Zweite Seite" },
    ],
    handler: (args) => {
        console.log("[page-swap]", args["a"], "↔", args["b"]);
    },
});

// =============================================================================
// page-mv - Move Page(s) to Position
// =============================================================================

actionRegistry.register({
    id: "page-mv",
    group: "page",
    description: "Seiten verschieben",
    params: [
        { name: "pages", type: "range", optional: false, hint: "Zu verschiebende Seiten" },
        { name: "target", type: "number", optional: false, hint: "Zielposition" },
    ],
    handler: (args) => {
        console.log("[page-mv]", args["pages"], "→", args["target"]);
    },
});

// =============================================================================
// page-clear - Clear Page Content
// =============================================================================

actionRegistry.register({
    id: "page-clear",
    group: "page",
    description: "Seiteninhalt löschen",
    confirm: "destructive",
    params: [
        { name: "pages", type: "range", optional: true, default: ".", hint: "Seiten (Standard: aktuelle)" },
        {
            name: "what",
            type: "enum",
            optional: false,
            hint: "content | bg | all",
            help: { options: ["content", "bg", "all"] },
        },
    ],
    handler: (args) => {
        console.log("[page-clear]", args["pages"], `what=${args["what"]}`);
    },
});

// =============================================================================
// page-rotate - Rotate Page
// =============================================================================

actionRegistry.register({
    id: "page-rotate",
    group: "page",
    description: "Seite rotieren",
    params: [
        { name: "pages", type: "range", optional: true, default: ".", hint: "Seiten" },
        { name: "degrees", type: "number", optional: true, default: 90, hint: "90, 180, 270" },
    ],
    handler: (args) => {
        console.log("[page-rotate]", args["pages"], `${args["degrees"]}°`);
    },
});

// =============================================================================
// page-import - Import Pages from File/Scanner
// =============================================================================

actionRegistry.register({
    id: "page-import",
    group: "page",
    description: "Seiten importieren",
    params: [
        {
            name: "source",
            type: "enum",
            optional: false,
            hint: "fs | scan",
            help: { options: ["fs", "scan"], description: "Importquelle" },
        },
        { name: "pos", type: "number", optional: true, default: -1, hint: "Position (Standard: Ende)" },
    ],
    handler: (args) => {
        console.log("[page-import]", `source=${args["source"]}`, `pos=${args["pos"]}`);
    },
});

// =============================================================================
// page-export - Export Pages
// =============================================================================

actionRegistry.register({
    id: "page-export",
    group: "page",
    description: "Seiten exportieren",
    params: [
        { name: "pages", type: "range", optional: true, default: ".", hint: "Seiten (Standard: alle)" },
        {
            name: "what",
            type: "enum",
            optional: true,
            default: "all",
            hint: "all | content | bg",
            help: { options: ["all", "content", "bg"] },
        },
    ],
    handler: (args) => {
        console.log("[page-export]", args["pages"], `what=${args["what"]}`);
    },
});
