import { createGlobalTheme } from "@vanilla-extract/css";

/**
 * Typography Tokens
 */

export const typography = createGlobalTheme(":root", {
    fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "30px",
    },

    fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
    },

    fontFamily: {
        sans: '"Geist", sans-serif',
        mono: '"Geist Mono", monospace',
        handwritten: '"Kalam", cursive',
    },
});
