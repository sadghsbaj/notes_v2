Version: v8

On this page

# @capacitor/privacy-screen

The Privacy Screen plugin provides functionality to prevent sensitive information from being visible in app switchers and when leaving an app.

> **Note:** This plugin is supported on Android and iOS platforms only. It is not available for web platforms.

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/privacy-screennpx cap sync
```

### Platform Notes[​](#platform-notes "Direct link to Platform Notes")

#### Android[​](#android "Direct link to Android")

##### FLAG\_SECURE Behavior[​](#flag_secure-behavior "Direct link to FLAG_SECURE Behavior")

When the privacy screen is enabled, the plugin automatically applies Android's [`FLAG_SECURE`](https://developer.android.com/reference/android/view/WindowManager.LayoutParams#FLAG_SECURE) flag to the window. This provides comprehensive content protection:

-   **Screenshot Prevention**: Prevents users from taking screenshots or screen recordings of your app
-   **App Switcher/Recent Apps**: When the app appears in the recent apps view, FLAG\_SECURE causes the system to show either a black screen or the last frame captured before FLAG\_SECURE was applied (typically blank)
-   **Non-Secure Display Protection**: Prevents the window content from appearing on non-secure displays such as TVs, projectors, or screen mirroring to untrusted devices
-   **Live View Protection**: In cases where FLAG\_SECURE doesn't fully protect content (such as with gesture navigation or live view fragments that can persist for minutes), the plugin displays a temporary privacy screen overlay. This overlay can be configured via `dimBackground` (shows a dim overlay) or shows the splash screen by default.

##### Navigation Method Differences[​](#navigation-method-differences "Direct link to Navigation Method Differences")

The privacy screen behavior varies depending on how the user navigates away from the app:

-   **Recent Apps Button/Gesture**: The privacy dialog displays as configured when viewing the app switcher
-   **Home Button**: FLAG\_SECURE ensures content protection in the app switcher snapshot
-   **Activity Background Events**: Controlled separately via `privacyModeOnActivityHidden` for scenarios like biometric prompts

## Usage[​](#usage "Direct link to Usage")

### Basic Usage[​](#basic-usage "Direct link to Basic Usage")

```
import { PrivacyScreen } from '@capacitor/privacy-screen';// Enable privacy screen with default settingsawait PrivacyScreen.enable();// Enable with platform-specific configurationawait PrivacyScreen.enable({  android: {    dimBackground: true,    privacyModeOnActivityHidden: 'splash'  },  ios: {    blurEffect: 'dark'  }});// Disable privacy screenawait PrivacyScreen.disable();// Check if privacy screen is enabledconst { enabled } = await PrivacyScreen.isEnabled();
```

### Per-Screen Protection[​](#per-screen-protection "Direct link to Per-Screen Protection")

You can enable and disable the privacy screen on specific screens by calling `enable()` when entering a screen and `disable()` when leaving. Note: Make sure to call the appropriate method whenever navigating between screens, including when using back navigation.

```
import { PrivacyScreen } from '@capacitor/privacy-screen';// Enable privacy screen when navigating to a secure screenasync function navigateToSecureScreen() {  await PrivacyScreen.enable({    android: { dimBackground: true },    ios: { blurEffect: 'dark' }  });  // Navigate to your secure screen}// Disable when navigating to a non-secure screenasync function navigateToPublicScreen() {  await PrivacyScreen.disable();  // Navigate to your public screen}
```

## API[​](#api "Direct link to API")

-   [`enable(...)`](#enable)
-   [`disable()`](#disable)
-   [`isEnabled()`](#isenabled)
-   [Interfaces](#interfaces)

### enable(...)[​](#enable "Direct link to enable(...)")

```
enable(config?: PrivacyScreenConfig | undefined) => Promise<{ success: boolean; }>
```

Enable privacy screen protection

| Param | Type | Description |
| --- | --- | --- |
| **`config`** |
```
PrivacyScreenConfig
```

 | Optional configuration for platform-specific behavior |

**Returns:** `Promise<{ success: boolean; }>`

* * *

### disable()[​](#disable "Direct link to disable()")

```
disable() => Promise<{ success: boolean; }>
```

Disable privacy screen protection

**Returns:** `Promise<{ success: boolean; }>`

* * *

### isEnabled()[​](#isenabled "Direct link to isEnabled()")

```
isEnabled() => Promise<{ enabled: boolean; }>
```

Check if privacy screen is currently enabled

**Returns:** `Promise<{ enabled: boolean; }>`

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### PrivacyScreenConfig[​](#privacyscreenconfig "Direct link to PrivacyScreenConfig")

| Prop | Type |
| --- | --- |
| **`android`** | `{ dimBackground?: boolean; preventScreenshots?: boolean; privacyModeOnActivityHidden?: 'none' | 'dim' | 'splash'; }` |
| **`ios`** | `{ blurEffect?: 'none' | 'light' | 'dark'; }` |
