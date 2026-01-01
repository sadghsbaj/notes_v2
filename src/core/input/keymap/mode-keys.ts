/**
 * Mode Keys – Shortcuts for switching between modes
 */

import { Mode } from "@core/mode";
import type { Keymap } from "./types";

export const modeKeys: Keymap = new Map([
    // Escape → Normal (from any mode)
    [
        "escape",
        {
            action: { type: "setMode", mode: Mode.Normal },
            description: "Return to Normal mode",
        },
    ],
    // i → Insert
    [
        "i",
        {
            action: { type: "setMode", mode: Mode.Insert },
            modes: [Mode.Normal, Mode.Edit],
            description: "Enter Insert mode",
        },
    ],
    // e → Edit
    [
        "e",
        {
            action: { type: "setMode", mode: Mode.Edit },
            modes: [Mode.Normal],
            description: "Enter Edit mode",
        },
    ],
    // ctrl+. → Command (CLI)
    [
        "ctrl+.",
        {
            action: { type: "setMode", mode: Mode.Command },
            modes: [Mode.Normal, Mode.Edit],
            description: "Open CLI (Command mode)",
        },
    ],
]);
