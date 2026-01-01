/**
 * ModeIndicator – Displays current mode with crossfade text animation
 *
 * Background color fades, text labels crossfade (old fades out centered,
 * new fades in centered - no x-axis movement)
 */

import type { Mode } from "@core/mode";
import { modeStore } from "@core/mode";
import { Show, createEffect, createSignal, on } from "solid-js";
import { badge, container, enteringLabel, exitingLabel, label, modeVariant, textVariant } from "./ModeIndicator.css";

/** Display labels for modes */
const modeLabels: Record<Mode, string> = {
    normal: "Normal",
    edit: "Edit",
    insert: "Insert",
    command: "Command",
};

export function ModeIndicator() {
    const mode = modeStore.mode;

    // Track previous mode for crossfade
    const [prevMode, setPrevMode] = createSignal<Mode | null>(null);
    const [isAnimating, setIsAnimating] = createSignal(false);

    createEffect(
        on(mode, (current, prev) => {
            if (prev !== undefined && prev !== current) {
                setPrevMode(prev);
                setIsAnimating(true);

                // Clear after animation (200ms)
                setTimeout(() => {
                    setPrevMode(null);
                    setIsAnimating(false);
                }, 200);
            }
        })
    );

    return (
        <div class={container}>
            {/* Background pill (color fades) */}
            <div class={`${badge} ${modeVariant[mode()]}`} />

            {/* Exiting text (fades out, stays centered) */}
            <Show when={prevMode()}>
                {(prev) => <span class={`${label} ${textVariant[prev()]} ${exitingLabel}`}>{modeLabels[prev()]}</span>}
            </Show>

            {/* Current text (fades in when animating, otherwise static) */}
            <span class={`${label} ${textVariant[mode()]} ${isAnimating() ? enteringLabel : ""}`}>
                {modeLabels[mode()]}
            </span>
        </div>
    );
}
