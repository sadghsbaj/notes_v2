import { beforeEach, describe, expect, it } from "vitest";
import { createCliActions } from "../actions";
import { type CliState, createCliStateSignal, initialCliState } from "../state";

describe("CLI History Draft", () => {
    let state: () => CliState;
    let setState: (fn: (s: CliState) => CliState) => void;
    let actions: ReturnType<typeof createCliActions>;

    beforeEach(() => {
        const signals = createCliStateSignal();
        state = signals.state;
        setState = signals.setState as (fn: (s: CliState) => CliState) => void;

        // Mock getSuggestions for actions
        actions = createCliActions(state, signals.setState, () => []);

        // Pre-populate history for testing
        setState((s) => ({
            ...s,
            history: ["help", "page-add", "cd test"],
            historyIndex: -1,
            inputDraft: null,
        }));
    });

    describe("historyUp", () => {
        it("saves current input as draft when first entering history", () => {
            // User has typed something
            actions.setInput("my-command");

            // Press arrow up
            actions.historyUp();

            // Should save draft and show last history entry
            expect(state().inputDraft).toBe("my-command");
            expect(state().input).toBe("cd test"); // last in history
            expect(state().historyIndex).toBe(2);
        });

        it("preserves draft when navigating further up in history", () => {
            actions.setInput("my-command");

            // Navigate up twice
            actions.historyUp();
            actions.historyUp();

            // Draft should still be preserved
            expect(state().inputDraft).toBe("my-command");
            expect(state().input).toBe("page-add");
            expect(state().historyIndex).toBe(1);
        });

        it("stays at oldest entry when at top of history", () => {
            actions.setInput("my-command");

            // Navigate all the way up
            actions.historyUp(); // cd test (index 2)
            actions.historyUp(); // page-add (index 1)
            actions.historyUp(); // help (index 0)
            actions.historyUp(); // should stay at help

            expect(state().input).toBe("help");
            expect(state().historyIndex).toBe(0);
            expect(state().inputDraft).toBe("my-command"); // still preserved
        });
    });

    describe("historyDown", () => {
        it("restores draft when navigating past newest history entry", () => {
            actions.setInput("my-command");

            // Go up then back down
            actions.historyUp(); // into history
            actions.historyDown(); // should restore draft

            expect(state().input).toBe("my-command");
            expect(state().historyIndex).toBe(-1);
            expect(state().inputDraft).toBeNull();
        });

        it("navigates through history correctly", () => {
            actions.setInput("my-command");

            // Go to oldest
            actions.historyUp(); // cd test (2)
            actions.historyUp(); // page-add (1)
            actions.historyUp(); // help (0)

            // Navigate down
            actions.historyDown(); // page-add (1)
            expect(state().input).toBe("page-add");
            expect(state().historyIndex).toBe(1);

            actions.historyDown(); // cd test (2)
            expect(state().input).toBe("cd test");
            expect(state().historyIndex).toBe(2);

            actions.historyDown(); // back to draft
            expect(state().input).toBe("my-command");
            expect(state().historyIndex).toBe(-1);
        });

        it("does nothing when not in history navigation", () => {
            actions.setInput("my-command");

            // Press down without being in history
            actions.historyDown();

            expect(state().input).toBe("my-command");
            expect(state().historyIndex).toBe(-1);
        });
    });

    describe("setInput clears draft", () => {
        it("clears draft when user types new input", () => {
            actions.setInput("my-command");
            actions.historyUp(); // saves draft

            expect(state().inputDraft).toBe("my-command");

            // User types something new
            actions.setInput("new-command");

            expect(state().inputDraft).toBeNull();
            expect(state().historyIndex).toBe(-1);
        });
    });

    describe("empty draft handling", () => {
        it("handles empty input as draft correctly", () => {
            // Start with empty input
            actions.setInput("");

            actions.historyUp();
            expect(state().inputDraft).toBe("");
            expect(state().input).toBe("cd test");

            actions.historyDown();
            expect(state().input).toBe("");
            expect(state().historyIndex).toBe(-1);
        });
    });
});
