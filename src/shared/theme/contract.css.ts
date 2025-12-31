import { createThemeContract } from "@vanilla-extract/css";

/**
 * Theme Contract - Defines the shape of all theme tokens
 * All themes (light, dark) must implement this contract
 */

export const themeContract = createThemeContract({
    colors: {
        // Base (Monotone)
        appBg: null,
        pageBg: null,
        pageBorder: null,
        surfaceElevated: null, // For overlays, modals

        // Text
        textPrimary: null,
        textSecondary: null,
        textMuted: null,

        // Accents (Mode Badges) - Same across themes
        accentEdit: null,
        accentInsert: null,
        accentPage: null,
        accentFile: null,
        accentCalc: null,
        accentOverlay: null,

        // Interactive
        focusRing: null,
    },

    shadows: {
        sm: null,
        md: null,
        lg: null,
        xl: null,
    },
});

// Re-export type for TypeScript usage
export type ThemeContract = typeof themeContract;
