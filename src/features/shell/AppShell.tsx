/**
 * AppShell – Root layout component
 *
 * Contains the scrollable content area and HUD layer.
 * Applies theme class at root level.
 */

import { useKeyboard } from "@core/input";
import { lightTheme } from "@theme/colors/light.css";
import type { JSX } from "solid-js";
import { contentArea, shellRoot } from "./AppShell.css";
import { HudLayer } from "./HudLayer/index";

export interface AppShellProps {
    children?: JSX.Element;
}

export function AppShell(props: AppShellProps) {
    // Initialize global keyboard handling
    useKeyboard();

    return (
        <div class={`${lightTheme} ${shellRoot}`}>
            {/* Scrollable content (pages go here) */}
            <main class={contentArea}>{props.children}</main>

            {/* Fixed HUD layer (mode indicator, overlays) */}
            <HudLayer />
        </div>
    );
}
