/**
 * HudLayer – Fixed viewport overlay for HUD elements
 *
 * Contains:
 * - Mode Indicator (bottom-left)
 * - Future: CLI Overlay (bottom-center)
 * - Future: Zoom controls (bottom-right)
 */

import { ModeIndicator } from "@features/hud/ModeIndicator/index";
import { bottomCenter, bottomLeft, hudLayer } from "./HudLayer.css";

export function HudLayer() {
    return (
        <div class={hudLayer}>
            {/* Mode Indicator – bottom left */}
            <div class={bottomLeft}>
                <ModeIndicator />
            </div>

            {/* CLI will go here – bottom center */}
            <div class={bottomCenter}>{/* CLI Overlay component will be added later */}</div>
        </div>
    );
}
