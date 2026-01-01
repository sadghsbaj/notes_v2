/**
 * AppShell Styles
 */

import { themeContract } from "@theme/contract.css";
import { typography } from "@theme/tokens/typography.css";
import { style } from "@vanilla-extract/css";

/** Root container – full viewport, applies theme */
export const shellRoot = style({
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: themeContract.colors.appBg,
    color: themeContract.colors.textPrimary,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.base,
    position: "relative", // Anchor for absolute children
});

/** Scrollable content area – contains pages */
export const contentArea = style({
    width: "100%",
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "32px",
    paddingBottom: "120px", // Space for HUD at bottom
});
