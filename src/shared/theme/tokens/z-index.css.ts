import { createGlobalTheme } from "@vanilla-extract/css";

/**
 * Z-Index Tokens
 * 
 * Only for fixed UI layers, NOT for dynamic content (blocks).
 * Block z-index is calculated dynamically based on selection/ordering.
 */

export const zIndex = createGlobalTheme(":root", {
    page: "0",           // Page content, blocks base layer
    floating: "100",     // Overlays, Jump-Overlay, Zoom-Overlay
    hud: "200",          // Mode Indicator, always visible HUD elements
});
