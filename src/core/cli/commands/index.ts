// CLI Commands – Auto-register on import

// Built-in commands
import "./help";
import "./filesystem";
import "./page";

// Re-export utilities that might be used externally
export { evaluateMath, formatResult, normalizeForEval, isMathExpression } from "./math-eval";
