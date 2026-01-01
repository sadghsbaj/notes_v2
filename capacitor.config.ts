import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "dev.notes.v2",
    appName: "notes_v2",
    webDir: "dist",

    // Android specific
    android: {
        buildOptions: {
            releaseType: "APK",
        },
    },

    // Dev server for hot reload on device
    // Use with: ./scripts/dev.sh
    server: {
        url: "http://localhost:3000",
        cleartext: true,
    },
};

export default config;
