/**
 * CLI Overlay Styles
 *
 * ModeIndicator: height=28px, bottom=24px → center at 24 + 14 = 38px from bottom
 * CLI: height=40px → needs bottom = 38 - 20 = 18px to center-align
 */

import { themeContract } from "@theme/contract.css";
import { motion } from "@theme/tokens/motion.css";
import { radius } from "@theme/tokens/radius.css";
import { spacing } from "@theme/tokens/spacing.css";
import { typography } from "@theme/tokens/typography.css";
import { zIndex } from "@theme/tokens/z-index.css";
import { globalStyle, keyframes, style } from "@vanilla-extract/css";

// =============================================================================
// Overlay – Vertically centered with ModeIndicator
// =============================================================================

export const overlay = style({
    position: "fixed",
    // ModeIndicator center = 24 + 14 = 38px from bottom
    // CLI center should be same: bottom + 20 = 38 → bottom = 18px
    bottom: "18px",
    left: "50%",
    zIndex: zIndex.hud,
    width: "min(480px, calc(100vw - 64px))",
    pointerEvents: "auto",
});

// =============================================================================
// Container
// =============================================================================

export const inputContainer = style({
    display: "flex",
    alignItems: "center",
    backgroundColor: themeContract.colors.surfaceElevated,
    borderRadius: radius.lg,
    boxShadow: themeContract.shadows.md,
    border: `1px solid ${themeContract.colors.pageBorder}`,
    padding: `${spacing.xs} ${spacing.md}`,
    gap: spacing.sm,
    height: "40px",
});

export const inputLayer = style({
    position: "relative",
    flex: 1,
    display: "flex",
    alignItems: "center",
    height: "100%",
});

export const icon = style({
    flexShrink: 0,
    color: themeContract.colors.accentCommandMode,
    opacity: 0.6,
});

// =============================================================================
// Input
// =============================================================================

export const input = style({
    position: "relative",
    width: "100%",
    border: "none",
    background: "transparent",
    outline: "none",
    color: themeContract.colors.textPrimary,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.mono,
    fontWeight: typography.fontWeight.medium,
    caretColor: themeContract.colors.accentCommandMode,
    zIndex: 2,
    WebkitAppearance: "none",
    appearance: "none",
});

globalStyle(`${input}::placeholder`, {
    color: themeContract.colors.textMuted,
});

globalStyle(`${input}::selection`, {
    backgroundColor: "#6366f1", // Indigo-500
    color: "#ffffff",
});

// =============================================================================
// Ghost Text – Completion (inline after input)
// =============================================================================

export const ghostLayer = style({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
    zIndex: 1,
});

export const ghostText = style({
    fontFamily: typography.fontFamily.mono,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    whiteSpace: "pre",
});

export const ghostCompletion = style({
    color: themeContract.colors.textMuted,
});

// =============================================================================
// Replacement Suggestion – Shows BESIDE input, not overlapping
// =============================================================================

export const suggestionBadge = style({
    flexShrink: 0,
    fontFamily: typography.fontFamily.mono,
    fontSize: typography.fontSize.xs,
    color: themeContract.colors.textMuted,
    padding: `2px ${spacing.xs}`,
    borderRadius: radius.sm,
    backgroundColor: themeContract.colors.appBg,
    border: `1px solid ${themeContract.colors.pageBorder}`,
});

// =============================================================================
// Param Hints
// =============================================================================

export const paramHints = style({
    display: "flex",
    gap: spacing.xs,
    flexShrink: 0,
});

export const param = style({
    fontFamily: typography.fontFamily.mono,
    fontSize: typography.fontSize.xs,
    color: themeContract.colors.textMuted,
    padding: `4px ${spacing.sm}`,
    borderRadius: radius.sm,
    backgroundColor: themeContract.colors.appBg,
});

export const paramActive = style({
    fontFamily: typography.fontFamily.mono,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: themeContract.colors.accentCommandModeDark,
    padding: `4px ${spacing.sm}`,
    borderRadius: radius.sm,
    backgroundColor: themeContract.colors.accentCommandModeLight,
});

// =============================================================================
// Math Result
// =============================================================================

export const mathResult = style({
    flexShrink: 0,
    fontFamily: typography.fontFamily.mono,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: themeContract.colors.accentInsertMode,
    whiteSpace: "nowrap",
});

// =============================================================================
// Error
// =============================================================================

export const errorMessage = style({
    flexShrink: 0,
    fontFamily: typography.fontFamily.mono,
    fontSize: typography.fontSize.xs,
    color: "#dc2626",
    whiteSpace: "nowrap",
});

// =============================================================================
// Animations
// =============================================================================

const fadeIn = keyframes({
    from: { opacity: "0" },
    to: { opacity: "1" },
});

const fadeOut = keyframes({
    from: { opacity: "1" },
    to: { opacity: "0" },
});

export const entering = style({
    animation: `${fadeIn} ${motion.duration.fast} ${motion.easing.easeOut}`,
    transform: "translateX(-50%)",
});

export const exiting = style({
    animation: `${fadeOut} 120ms ${motion.easing.easeOut}`,
    transform: "translateX(-50%)",
});
