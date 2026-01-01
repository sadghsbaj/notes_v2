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

        // Mode Accents
        accentEditMode: null,
        accentInsertMode: null,
        accentCommandMode: null,
        accentCommandModeLight: null, // Light bg for active params
        accentCommandModeDark: null, // Dark text on light bg

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
