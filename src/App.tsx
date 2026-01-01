/**
 * App – Root component
 */

import { AppShell, PageCanvas } from "@features/shell";

export function App() {
    return (
        <AppShell>
            <PageCanvas>
                <h1>notes_v2</h1>
                <p>
                    Press <kbd>i</kbd> for Insert, <kbd>e</kbd> for Edit, <kbd>Escape</kbd> for Normal
                </p>
            </PageCanvas>
        </AppShell>
    );
}
