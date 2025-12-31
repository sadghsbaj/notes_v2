import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [solid(), vanillaExtractPlugin()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@theme": path.resolve(__dirname, "./src/shared/theme"),
            "@primitives": path.resolve(__dirname, "./src/shared/primitives"),
            "@utils": path.resolve(__dirname, "./src/shared/utils"),
            "@core": path.resolve(__dirname, "./src/core"),
            "@features": path.resolve(__dirname, "./src/features"),
        },
    },
    server: {
        port: 3000,
        host: true,
    },
});
