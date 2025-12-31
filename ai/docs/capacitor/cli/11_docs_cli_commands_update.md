Version: v8

On this page

# Capacitor CLI - cap update

Updates the native plugins and dependencies referenced in `package.json`.

```
npx cap update [<platform>]
```

**Inputs:**

-   `platform` (optional): `android`, `ios`

**Options:**

-   `--deployment`: Podfile.lock won't be deleted and pod install will use `--deployment` option.

## Hooks[​](#hooks "Direct link to Hooks")

The following hooks are available for update command:

-   `capacitor:update:before`
-   `capacitor:update:after`

[More information](/docs/cli/hooks)
