import { createTheme } from "@vanilla-extract/css";
import { themeContract } from "../contract.css";

/**
 * Light Theme - Default theme
 * Zinc monotone base with mode accents
 */

// Shadow color for light mode (dark shadows)
const shadowColor = "12, 12, 13";

const createShadowLayer = (offsetY: string, blur: string, opacity: number, spread = "0px"): string =>
    `0px ${offsetY} ${blur} ${spread} rgba(${shadowColor}, ${opacity})`;

export const lightTheme = createTheme(themeContract, {
    colors: {
        // Base (Zinc monotone)
        appBg: "hsl(240, 5%, 96%)", // zinc-100
        pageBg: "hsl(0, 0%, 100%)", // white
        pageBorder: "hsl(240, 5%, 84%)", // zinc-200
        surfaceElevated: "hsl(0, 0%, 100%)", // white

        // Text
        textPrimary: "hsl(240, 6%, 10%)", // zinc-900
        textSecondary: "hsl(240, 4%, 46%)", // zinc-600
        textMuted: "hsl(240, 4%, 65%)", // zinc-400

        // Mode Accents
        accentEditMode: "hsl(217, 91%, 60%)", // blue-500
        accentInsertMode: "hsl(142, 71%, 45%)", // green-500
        accentCommandMode: "hsl(239, 84%, 67%)", // indigo-500
        accentCommandModeLight: "hsl(239, 84%, 93%)", // indigo-100
        accentCommandModeDark: "hsl(239, 84%, 40%)", // indigo-700

        // Interactive
        focusRing: "hsl(217, 91%, 60%)", // blue-500
    },

    shadows: {
        sm: [createShadowLayer("1px", "2px", 0.05), createShadowLayer("1px", "3px", 0.1)].join(", "),

        md: [createShadowLayer("2px", "4px", 0.06, "-1px"), createShadowLayer("4px", "8px", 0.1)].join(", "),

        lg: [
            createShadowLayer("4px", "6px", 0.05, "-2px"),
            createShadowLayer("10px", "15px", 0.1, "-3px"),
            createShadowLayer("12px", "24px", 0.08, "-4px"),
        ].join(", "),

        xl: [
            createShadowLayer("0px", "8px", 0.04, "-4px"),
            createShadowLayer("20px", "24px", 0.08, "-4px"),
            createShadowLayer("32px", "48px", 0.08, "-6px"),
        ].join(", "),
    },
});
