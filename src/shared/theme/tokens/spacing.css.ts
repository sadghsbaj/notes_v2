import { createGlobalTheme } from "@vanilla-extract/css";

/**
 * Spacing Tokens (4px scale)
 */

export const spacing = createGlobalTheme(":root", {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
    "3xl": "64px",
});
