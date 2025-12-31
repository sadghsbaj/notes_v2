import { themeContract } from "@theme/contract.css";
import { style } from "@vanilla-extract/css";

export const appContainer = style({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themeContract.colors.appBg,
    color: themeContract.colors.textPrimary,
});
