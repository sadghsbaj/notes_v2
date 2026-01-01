import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "dev.notes.v2",
    appName: "notes_v2",
    webDir: "dist",

    // Android specific
    android: {
        // Build flavor
        buildOptions: {
            releaseType: "APK",
        },
    },

    // Server config for dev
    server: {
        // For live reload during development (optional)
        // url: "http://192.168.178.97:3000",
        // cleartext: true,
    },
};

export default config;
