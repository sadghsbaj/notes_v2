/**
 * Filesystem Commands (Stubs)
 *
 * Commands for navigating and manipulating the filesystem.
 * All handlers are stubs that log to console.
 */

import { actionRegistry } from "../registry/action-registry";

// =============================================================================
// cd - Change Directory
// =============================================================================

actionRegistry.register({
    id: "cd",
    group: "filesystem",
    description: "Verzeichnis wechseln",
    params: [{ name: "path", type: "string", optional: false, hint: "z.B. @mathe oder ../ordner" }],
    handler: (args) => {
        console.log("[cd]", args["path"]);
    },
});

// =============================================================================
// mkdir - Create Directory
// =============================================================================

actionRegistry.register({
    id: "mkdir",
    group: "filesystem",
    aliases: ["md"],
    description: "Ordner erstellen",
    params: [{ name: "name", type: "string", optional: false, hint: "Ordnername" }],
    handler: (args) => {
        console.log("[mkdir]", args["name"]);
    },
});

// =============================================================================
// touch - Create Empty Document
// =============================================================================

actionRegistry.register({
    id: "touch",
    group: "filesystem",
    aliases: ["new"],
    description: "Leeres Dokument erstellen",
    params: [{ name: "name", type: "string", optional: false, hint: "Dokumentname" }],
    handler: (args) => {
        console.log("[touch]", args["name"]);
    },
});

// =============================================================================
// rm - Remove File/Directory
// =============================================================================

actionRegistry.register({
    id: "rm",
    group: "filesystem",
    aliases: ["del", "delete"],
    description: "Datei oder Ordner löschen",
    confirm: "delete",
    params: [
        { name: "path", type: "string", optional: false, hint: "Pfad zum Löschen" },
        { name: "force", type: "boolean", optional: true, default: false, hint: "Ohne Bestätigung" },
    ],
    handler: (args) => {
        console.log("[rm]", args["path"], args["force"] ? "(force)" : "");
    },
});

// =============================================================================
// mv - Move/Rename
// =============================================================================

actionRegistry.register({
    id: "mv",
    group: "filesystem",
    aliases: ["move", "rename"],
    description: "Verschieben oder umbenennen",
    confirm: "overwrite",
    params: [
        { name: "src", type: "string", optional: false, hint: "Quelle" },
        { name: "dest", type: "string", optional: false, hint: "Ziel" },
    ],
    handler: (args) => {
        console.log("[mv]", args["src"], "→", args["dest"]);
    },
});

// =============================================================================
// cp - Copy
// =============================================================================

actionRegistry.register({
    id: "cp",
    group: "filesystem",
    aliases: ["copy"],
    description: "Kopieren",
    confirm: "overwrite",
    params: [
        { name: "src", type: "string", optional: false, hint: "Quelle" },
        { name: "dest", type: "string", optional: false, hint: "Ziel" },
    ],
    handler: (args) => {
        console.log("[cp]", args["src"], "→", args["dest"]);
    },
});

// =============================================================================
// open - Open Document
// =============================================================================

actionRegistry.register({
    id: "open",
    group: "filesystem",
    aliases: ["o"],
    description: "Dokument öffnen",
    params: [{ name: "file", type: "string", optional: false, hint: "Dokumentpfad" }],
    handler: (args) => {
        console.log("[open]", args["file"]);
    },
});

// =============================================================================
// close - Close Current Document
// =============================================================================

actionRegistry.register({
    id: "close",
    group: "filesystem",
    description: "Aktuelles Dokument schließen",
    params: [],
    handler: () => {
        console.log("[close]");
    },
});
