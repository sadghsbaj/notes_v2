/**
 * Mode Transitions – Rules for valid mode changes
 */

import { Mode } from "./types";

/** Valid transitions from each mode */
const validTransitions: Record<Mode, readonly Mode[]> = {
    [Mode.Normal]: [Mode.Edit, Mode.Insert, Mode.Command],
    [Mode.Edit]: [Mode.Normal, Mode.Insert, Mode.Command],
    [Mode.Insert]: [Mode.Normal, Mode.Edit, Mode.Command],
    [Mode.Command]: [Mode.Normal, Mode.Edit, Mode.Insert], // returns to previous
};

/** Check if a mode transition is valid */
export function canTransition(from: Mode, to: Mode): boolean {
    if (from === to) return false;
    return validTransitions[from].includes(to);
}
