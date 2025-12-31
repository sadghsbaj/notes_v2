import { createGlobalTheme } from "@vanilla-extract/css";

/**
 * Motion Tokens (duration, easing)
 */

export const motion = createGlobalTheme(":root", {
    duration: {
        fast: "200ms",
        medium: "300ms",
        slow: "400ms",
    },

    easing: {
        easeOut: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        easeInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
        snappy: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
});
