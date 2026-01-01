/**
 * PageCanvas Styles
 */

import { themeContract } from "@theme/contract.css";
import { style } from "@vanilla-extract/css";

/** Fixed-width page container */
export const pageCanvas = style({
    width: "800px",
    minHeight: "400px",
    backgroundColor: themeContract.colors.pageBg,
    borderRadius: "8px",
    boxShadow: themeContract.shadows.lg,

    // Prepare for zoom transforms
    transformOrigin: "top center",
    willChange: "transform",

    // Content padding
    padding: "32px",
});
