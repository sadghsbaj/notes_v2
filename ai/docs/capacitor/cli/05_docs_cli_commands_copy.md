Version: v8

On this page

# Capacitor CLI - cap copy

Copy the web app build and Capacitor configuration file into the native platform project. Run this each time you make changes to your web app or change a configuration value.

```
npx cap copy [<platform>]
```

**Inputs:**

-   `platform` (optional): `android`, `ios`

**Options:**

-   `--inline`: After syncing, all JS source maps will be inlined allowing for debugging an Android Web View in Chromium based browsers.

## Hooks[​](#hooks "Direct link to Hooks")

The following hooks are available for copy command:

-   `capacitor:copy:before`
-   `capacitor:copy:after`

[More information](/docs/cli/hooks)
