/**
 * PageCanvas – Fixed-width page container
 *
 * Renders a single page at 800px width.
 * Prepared for zoom transforms (will be applied via style prop later).
 */

import type { JSX } from "solid-js";
import { pageCanvas } from "./PageCanvas.css";

export interface PageCanvasProps {
    children?: JSX.Element;
    /** Optional inline styles for zoom/transform */
    style?: JSX.CSSProperties;
}

export function PageCanvas(props: PageCanvasProps) {
    return (
        <article class={pageCanvas} style={props.style}>
            {props.children}
        </article>
    );
}
