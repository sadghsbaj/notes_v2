/**
 * ModeIndicator Styles
 */

import { themeContract } from "@theme/contract.css";
import { motion } from "@theme/tokens/motion.css";
import { radius } from "@theme/tokens/radius.css";
import { spacing } from "@theme/tokens/spacing.css";
import { typography } from "@theme/tokens/typography.css";
import { keyframes, style, styleVariants } from "@vanilla-extract/css";

/** Container with fixed size */
export const container = style({
    position: "relative",
    minWidth: "88px",
    height: "28px",
});

/** Base badge style (for the pill background) */
export const badge = style({
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    boxShadow: themeContract.shadows.sm,
    transition: `background-color ${motion.duration.fast} ${motion.easing.easeOut}, 
                 border-color ${motion.duration.fast} ${motion.easing.easeOut}`,
});

/** Text label inside badge - centered, absolute positioned */
export const label = style({
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.mono,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    userSelect: "none",
    padding: `0 ${spacing.md}`,
});

/** Mode-specific color variants */
export const modeVariant = styleVariants({
    normal: {
        backgroundColor: themeContract.colors.surfaceElevated,
        color: themeContract.colors.textSecondary,
        border: `1px solid ${themeContract.colors.pageBorder}`,
    },
    edit: {
        backgroundColor: themeContract.colors.accentEditMode,
        color: "white",
        border: "1px solid transparent",
    },
    insert: {
        backgroundColor: themeContract.colors.accentInsertMode,
        color: "white",
        border: "1px solid transparent",
    },
    command: {
        backgroundColor: themeContract.colors.accentCommandMode,
        color: "white",
        border: "1px solid transparent",
    },
});

/** Text color variants */
export const textVariant = styleVariants({
    normal: { color: themeContract.colors.textSecondary },
    edit: { color: "white" },
    insert: { color: "white" },
    command: { color: "white" },
});

/** Fade out animation */
const fadeOut = keyframes({
    from: { opacity: "1" },
    to: { opacity: "0" },
});

/** Fade in animation */
const fadeIn = keyframes({
    from: { opacity: "0" },
    to: { opacity: "1" },
});

/** Exiting text (fades out, stays centered) */
export const exitingLabel = style({
    animation: `${fadeOut} ${motion.duration.fast} ${motion.easing.easeOut} forwards`,
});

/** Entering text (fades in, already centered) */
export const enteringLabel = style({
    animation: `${fadeIn} ${motion.duration.fast} ${motion.easing.easeOut} forwards`,
});
