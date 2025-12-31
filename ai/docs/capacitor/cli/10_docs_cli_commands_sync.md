Version: v8

On this page

# Capacitor CLI - cap sync

This command runs [`copy`](/docs/cli/commands/copy) and then [`update`](/docs/cli/commands/update).

```
npx cap sync [options] [<platform>]
```

**Inputs:**

-   `platform` (optional): `android`, `ios`

**Options:**

-   `--deployment`: Podfile.lock won't be deleted and pod install will use `--deployment` option.
-   `--inline`: After syncing, all JS source maps will be inlined allowing for debugging an Android Web View in Chromium based browsers.

## Hooks[​](#hooks "Direct link to Hooks")

The following hooks are available for sync command:

-   `capacitor:sync:before`
-   `capacitor:sync:after`

[More information](/docs/cli/hooks)
