// =============================================================================
// CLI Module - Main Entry Point
// =============================================================================

// Types
export * from "./types";

// Parsers
export * from "./parser";

// Search
export * from "./search";

// Registry
export * from "./registry";

// Validators
export * from "./validators";

// Completion
export * from "./completion";

// Store
export * from "./store";

// Commands (auto-registers on import)
import "./commands";
export { evaluateMath, formatResult, normalizeForEval } from "./commands";
