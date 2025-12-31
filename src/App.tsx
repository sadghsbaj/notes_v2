import { lightTheme } from "@theme/colors/light.css";
import { appContainer } from "./App.css";

export function App() {
    return (
        <div class={`${lightTheme} ${appContainer}`}>
            <h1>notes_v2</h1>
            <p>Solid + Vanilla Extract + Geist</p>
        </div>
    );
}
