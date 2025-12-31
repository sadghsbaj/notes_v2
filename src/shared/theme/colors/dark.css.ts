import { createTheme } from "@vanilla-extract/css";
import { themeContract } from "../contract.css";

/**
 * Dark Theme
 * Zinc monotone dark base (NOT blue tinted!) with same vibrant accents
 */

// Shadow color for dark mode (darker/more transparent shadows)
const shadowColor = "0, 0, 0";

const createShadowLayer = (offsetY: string, blur: string, opacity: number, spread = "0px"): string =>
    `0px ${offsetY} ${blur} ${spread} rgba(${shadowColor}, ${opacity})`;

export const darkTheme = createTheme(themeContract, {
    colors: {
        // Base (Zinc monotone dark - NOT blue!)
        appBg: "hsl(240, 6%, 10%)", // zinc-900
        pageBg: "hsl(240, 5%, 14%)", // zinc-850 (custom)
        pageBorder: "hsl(240, 4%, 22%)", // zinc-700
        surfaceElevated: "hsl(240, 5%, 18%)", // zinc-800

        // Text
        textPrimary: "hsl(0, 0%, 98%)", // zinc-50
        textSecondary: "hsl(240, 4%, 65%)", // zinc-400
        textMuted: "hsl(240, 4%, 46%)", // zinc-600

        // Accents (Mode Badges) - Same as light, maybe slightly brighter
        accentEdit: "hsl(217, 91%, 65%)", // blue-400
        accentInsert: "hsl(142, 71%, 50%)", // green-400
        accentPage: "hsl(262, 83%, 63%)", // purple-400
        accentFile: "hsl(25, 95%, 58%)", // orange-400
        accentCalc: "hsl(189, 94%, 48%)", // cyan-400
        accentOverlay: "hsl(330, 81%, 65%)", // pink-400

        // Interactive
        focusRing: "hsl(217, 91%, 65%)", // blue-400
    },

    shadows: {
        // Darker shadows for dark mode (more opacity)
        sm: [createShadowLayer("1px", "2px", 0.2), createShadowLayer("1px", "3px", 0.3)].join(", "),

        md: [createShadowLayer("2px", "4px", 0.2, "-1px"), createShadowLayer("4px", "8px", 0.3)].join(", "),

        lg: [
            createShadowLayer("4px", "6px", 0.2, "-2px"),
            createShadowLayer("10px", "15px", 0.3, "-3px"),
            createShadowLayer("12px", "24px", 0.25, "-4px"),
        ].join(", "),

        xl: [
            createShadowLayer("0px", "8px", 0.15, "-4px"),
            createShadowLayer("20px", "24px", 0.25, "-4px"),
            createShadowLayer("32px", "48px", 0.25, "-6px"),
        ].join(", "),
    },
});
