import { actionRegistry } from "../registry/action-registry";

// =============================================================================
// Help Command
// =============================================================================

actionRegistry.register({
    id: "help",
    aliases: ["h", "?"],
    description: "Liste aller verfügbaren Befehle",
    params: [],
    handler: () => {
        const actions = actionRegistry.getAll();

        console.log("\n=== Verfügbare Befehle ===\n");

        for (const action of actions) {
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

        console.log("\n");
    },
});
