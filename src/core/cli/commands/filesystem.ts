/**
 * Filesystem Commands (Stubs)
 *
 * Commands for navigating and manipulating the filesystem.
 * All handlers are stubs that log to console.
 */

import { actionRegistry } from "../registry/action-registry";
import { CONFIRM_DELETE, CONFIRM_OVERWRITE } from "../types/confirm";

// =============================================================================
// cd - Change Directory
// =============================================================================

actionRegistry.register({
    id: "cd",
    group: "filesystem",
    description: "Verzeichnis wechseln",
    params: [{ name: "path", type: "path", optional: false, hint: "z.B. @mathe oder ../ordner" }],
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
    description: "Datei oder Ordner löschen",
    confirm: CONFIRM_DELETE,
    params: [{ name: "path", type: "path", optional: false, hint: "Pfad zum Löschen" }],
    handler: (args, choice) => {
        console.log("[rm]", args["path"], choice ? `(choice: ${choice})` : "");
    },
});

// =============================================================================
// mv - Move/Rename
// =============================================================================

actionRegistry.register({
    id: "mv",
    group: "filesystem",
    description: "Verschieben oder umbenennen",
    // TODO: Make conditional when filesystem service is available
    confirm: CONFIRM_OVERWRITE,
    params: [
        { name: "src", type: "path", optional: false, hint: "Quelle" },
        { name: "dest", type: "path", optional: false, hint: "Ziel" },
    ],
    handler: (args, choice) => {
        console.log("[mv]", args["src"], "→", args["dest"], choice ? `(choice: ${choice})` : "");
    },
});

// =============================================================================
// cp - Copy
// =============================================================================

actionRegistry.register({
    id: "cp",
    group: "filesystem",
    description: "Kopieren",
    // TODO: Make conditional when filesystem service is available
    confirm: CONFIRM_OVERWRITE,
    params: [
        { name: "src", type: "path", optional: false, hint: "Quelle" },
        { name: "dest", type: "path", optional: false, hint: "Ziel" },
    ],
    handler: (args, choice) => {
        console.log("[cp]", args["src"], "→", args["dest"], choice ? `(choice: ${choice})` : "");
    },
});

// =============================================================================
// open - Open Document
// =============================================================================

actionRegistry.register({
    id: "open",
    group: "filesystem",
    description: "Dokument öffnen",
    params: [{ name: "file", type: "path", optional: false, hint: "Dokumentpfad" }],
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
