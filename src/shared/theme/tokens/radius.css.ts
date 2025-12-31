import { createGlobalTheme } from "@vanilla-extract/css";

/**
 * Border Radius Tokens
 */

export const radius = createGlobalTheme(":root", {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    full: "9999px",
});
