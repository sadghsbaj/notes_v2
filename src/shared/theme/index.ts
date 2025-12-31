/**
 * Theme Tokens - Centralized Export
 *
 * Usage in components:
 * import { themeContract, lightTheme, darkTheme } from '@/shared/theme';
 *
 * Styles use themeContract for CSS variable references:
 * backgroundColor: themeContract.colors.appBg
 *
 * Theme classes are applied to root element to switch themes.
 */

// Contract (CSS variable shape)
export { themeContract } from "./contract.css";
export type { ThemeContract } from "./contract.css";

// Theme implementations
export { lightTheme } from "./colors/light.css";
export { darkTheme } from "./colors/dark.css";

// Static tokens (same across all themes)
export { typography } from "./tokens/typography.css";
export { spacing } from "./tokens/spacing.css";
export { radius } from "./tokens/radius.css";
export { motion } from "./tokens/motion.css";
export { zIndex } from "./tokens/z-index.css";

import { motion } from "./tokens/motion.css";
import { radius } from "./tokens/radius.css";
import { spacing } from "./tokens/spacing.css";
// Convenience: Export all static tokens as 'tokens' object
import { typography } from "./tokens/typography.css";
import { zIndex } from "./tokens/z-index.css";

export const tokens = {
    typography,
    spacing,
    radius,
    motion,
    zIndex,
};

// For backwards compatibility during migration
import { themeContract } from "./contract.css";

export const theme = {
    colors: themeContract.colors,
    shadows: themeContract.shadows,
    typography,
    spacing,
    radius,
    motion,
};
