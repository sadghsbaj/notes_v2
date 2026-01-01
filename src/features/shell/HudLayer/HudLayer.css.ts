/**
 * HudLayer Styles
 */

import { zIndex } from "@theme/tokens/z-index.css";
import { style } from "@vanilla-extract/css";

/** Fixed viewport layer for HUD elements */
export const hudLayer = style({
    position: "fixed",
    inset: 0,
    pointerEvents: "none", // Allow clicks to pass through
    zIndex: zIndex.hud,
});

/** Container for bottom-left HUD elements (ModeIndicator) */
export const bottomLeft = style({
    position: "absolute",
    bottom: "24px",
    left: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
    pointerEvents: "auto",
});

/** Container for bottom-center HUD elements (CLI) */
export const bottomCenter = style({
    position: "absolute",
    bottom: "24px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    pointerEvents: "auto",
});

/** Container for bottom-right HUD elements */
export const bottomRight = style({
    position: "absolute",
    bottom: "24px",
    right: "24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "8px",
    pointerEvents: "auto",
});
