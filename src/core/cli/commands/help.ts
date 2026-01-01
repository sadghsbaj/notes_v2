/**
 * Help Command
 *
 * Displays all available commands grouped by category.
 */

import { actionRegistry } from "../registry/action-registry";
import type { CommandGroup } from "../types/action";

// =============================================================================
// Group Labels
// =============================================================================

const groupLabels: Record<CommandGroup, string> = {
    filesystem: "📁 Dateisystem",
    page: "📄 Seiten",
    view: "👁️ Ansicht",
    util: "🔧 Werkzeuge",
};

const groupOrder: CommandGroup[] = ["filesystem", "page", "view", "util"];

// =============================================================================
// Help Command
// =============================================================================

actionRegistry.register({
    id: "help",
    group: "util",
    aliases: ["h", "?"],
    description: "Liste aller verfügbaren Befehle",
    params: [],
    handler: () => {
        const actions = actionRegistry.getAll();

        // Group actions
        const grouped = new Map<CommandGroup, typeof actions>();
        for (const action of actions) {
            const group = action.group;
            if (!grouped.has(group)) {
                grouped.set(group, []);
            }
            grouped.get(group)?.push(action);
        }

        console.log("\n=== Verfügbare Befehle ===\n");

        for (const group of groupOrder) {
            const groupActions = grouped.get(group);
            if (!groupActions || groupActions.length === 0) continue;

            console.log(`${groupLabels[group]}`);

            for (const action of groupActions) {
                const aliases = action.aliases.length > 0 ? ` (${action.aliases.join(", ")})` : "";
                const params =
                    action.params.length > 0
                        ? ` ${action.params.map((p) => (p.optional ? `[${p.name}]` : `<${p.name}>`)).join(" ")}`
                        : "";

                console.log(`  ${action.id}${aliases}${params}`);
                if (action.description) {
                    console.log(`    → ${action.description}`);
                }
            }
            console.log("");
        }
    },
});
