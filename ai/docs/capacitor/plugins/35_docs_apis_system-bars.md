Version: v8

On this page

# SystemBars

The SystemBars API provides methods for configuring the style and visibility of the device System Bars / Status Bar. This API differs from the [Status Bar](https://capacitorjs.com/docs/apis/status-bar) plugin in that it is only intended to support modern edge to edge use cases moving forward. For legacy functionality, use the [Status Bar](https://capacitorjs.com/docs/apis/status-bar) plugin.

| Feature | System Bars | Status Bar |
| --- | --- | --- |
| `setOverlaysWebView()` | Unsupported | Supported on iOS and Android <= 14 (or 15 if edge to edge opt-out is enabled) |
| `setBackgroundColor()` | Unsupported | Supported |
| `setStyle()` | Supported | Supported - top Status Bar only |
| `hide()/show()` | Supported | Supported - top Status Bar only |

## iOS Note[​](#ios-note "Direct link to iOS Note")

This plugin requires "View controller-based status bar appearance" (`UIViewControllerBasedStatusBarAppearance`) set to `YES` in `Info.plist`. Read about [Configuring iOS](https://capacitorjs.com/docs/ios/configuration) for help.

The status bar visibility defaults to visible and the style defaults to `Style.Default`. You can change these defaults by adding `UIStatusBarHidden` and/or `UIStatusBarStyle` in `Info.plist`.

## Android Note[​](#android-note "Direct link to Android Note")

Due to a [bug](https://issues.chromium.org/issues/40699457) in some older versions of Android WebView (< 140), correct safe area values are not available via the `safe-area-inset-x` CSS `env` variables. This plugin will inject the correct inset values into a new CSS variable(s) named `--safe-area-inset-x` that you can use as a fallback in your frontend styles:

```
html {  padding-top: var(--safe-area-inset-top, env(safe-area-inset-top, 0px));  padding-bottom: var(--safe-area-inset-bottom, env(safe-area-inset-bottom, 0px));  padding-left: var(--safe-area-inset-left, env(safe-area-inset-left, 0px));  padding-right: var(--safe-area-inset-right, env(safe-area-inset-right, 0px));}
```

To control this behavior, use the `insetsHandling` configuration setting.

## Example[​](#example "Direct link to Example")

```
import { SystemBars, SystemBarsStyle } from '@capacitor/core';const setSystemBarStyleDark = async () => {  await SystemBars.setStyle({ style: SystemBarsStyle.Dark });};const setSystemBarStyleLight = async () => {  await SystemBars.setStyle({ style: SystemBarsStyle.Light });};const hideSystemBars = async () => {  await SystemBars.hide();};const showSystemBars = async () => {  await SystemBars.show();};const hideNavigationBar = async () => {  await SystemBars.hide({    bar: SystemBarType.NavigationBar  })}// Set the Status Bar animation, only on iOSconst setStatusBarAnimation = async () => {  await SystemBars.setAnimation({ animation: "NONE" });}
```

## Configuration[​](#configuration "Direct link to Configuration")

| Prop | Type | Description | Default |
| --- | --- | --- | --- |
| **`insetsHandling`** | `string` | Specifies how to handle problematic insets on Android. This option is only supported on Android.
`css` = Injects CSS variables (`--safe-area-inset-*`) containing correct safe area inset values into the webview.
`disable` = Disable all inset handling. | `css` |
| **`style`** | `string` | The style of the text and icons of the system bars. | `DEFAULT` |
| **`hidden`** | `boolean` | Hide the system bars on start. | `false` |
| **`animation`** | `string` | The type of status bar animation used when showing or hiding. This option is only supported on iOS. | `FADE` |

### Example Configuration[​](#example-configuration "Direct link to Example Configuration")

In `capacitor.config.json`:

```
{  "plugins": {    "SystemBars": {      "insetsHandling": "css",      "style": "DARK",      "hidden": false,      "animation": "NONE"    }  }}
```

In `capacitor.config.ts`:

```
import { CapacitorConfig } from '@capacitor/cli';const config: CapacitorConfig = {  plugins: {    SystemBars: {      insetsHandling: "css",      style: "DARK",      hidden: false,      animation: "NONE"    },  },};export default config;
```

## API[​](#api "Direct link to API")

-   [`setStyle(...)`](#setstyle)
-   [`show(...)`](#show)
-   [`hide(...)`](#hide)
-   [`setAnimation(...)`](#setanimation)
-   [Interfaces](#interfaces)
-   [Type Aliases](#type-aliases)
-   [Enums](#enums)

### setStyle(...)[​](#setstyle "Direct link to setStyle(...)")

```
setStyle(options: SystemBarsStyleOptions) => Promise<void>
```

Set the current style of the system bars.

| Param | Type |
| --- | --- |
| **`options`** |
```
SystemBarsStyleOptions
```

 |

**Since:** 8.0.0

* * *

### show(...)[​](#show "Direct link to show(...)")

```
show(options: SystemBarsVisibilityOptions) => Promise<void>
```

Show the system bars.

| Param | Type |
| --- | --- |
| **`options`** |
```
SystemBarsVisibilityOptions
```

 |

**Since:** 8.0.0

* * *

### hide(...)[​](#hide "Direct link to hide(...)")

```
hide(options: SystemBarsVisibilityOptions) => Promise<void>
```

Hide the system bars.

| Param | Type |
| --- | --- |
| **`options`** |
```
SystemBarsVisibilityOptions
```

 |

**Since:** 8.0.0

* * *

### setAnimation(...)[​](#setanimation "Direct link to setAnimation(...)")

```
setAnimation(options: SystemBarsAnimationOptions) => Promise<void>
```

Set the animation to use when showing / hiding the status bar.

Only available on iOS.

| Param | Type |
| --- | --- |
| **`options`** |
```
SystemBarsAnimationOptions
```

 |

**Since:** 8.0.0

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### SystemBarsStyleOptions[​](#systembarsstyleoptions "Direct link to SystemBarsStyleOptions")

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`style`** |
```
SystemBarsStyle
```

 | Style of the text and icons of the system bars. | `'DEFAULT'` | 8.0.0 |
| **`bar`** |

```
SystemBarType
```

 | The system bar to which to apply the style. | `null` | 8.0.0 |

#### SystemBarsVisibilityOptions[​](#systembarsvisibilityoptions "Direct link to SystemBarsVisibilityOptions")

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`bar`** |
```
SystemBarType
```

 | The system bar to hide or show. | `null` | 8.0.0 |
| **`animation`** |

```
SystemBarsAnimation
```

 | The type of status bar animation used when showing or hiding. This option is only supported on iOS. | `'FADE'` | 8.0.0 |

#### SystemBarsAnimationOptions[​](#systembarsanimationoptions "Direct link to SystemBarsAnimationOptions")

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`animation`** |
```
SystemBarsAnimation
```

 | The type of status bar animation used when showing or hiding. This option is only supported on iOS. | `'FADE'` | 8.0.0 |

### Type Aliases[​](#type-aliases "Direct link to Type Aliases")

#### SystemBarsAnimation[​](#systembarsanimation "Direct link to SystemBarsAnimation")

Available status bar animations. iOS only.

`'FADE' | 'NONE'`

### Enums[​](#enums "Direct link to Enums")

#### SystemBarsStyle[​](#systembarsstyle "Direct link to SystemBarsStyle")

| Members | Value | Description | Since |
| --- | --- | --- | --- |
| **`Dark`** | `'DARK'` | Light system bar content on a dark background. | 8.0.0 |
| **`Light`** | `'LIGHT'` | For dark system bar content on a light background. | 8.0.0 |
| **`Default`** | `'DEFAULT'` | The style is based on the device appearance or the underlying content. If the device is using Dark mode, the system bars content will be light. If the device is using Light mode, the system bars content will be dark. | 8.0.0 |

#### SystemBarType[​](#systembartype "Direct link to SystemBarType")

| Members | Value | Description | Since |
| --- | --- | --- | --- |
| **`StatusBar`** | `'StatusBar'` | The top status bar on both Android and iOS. | 8.0.0 |
| **`NavigationBar`** | `'NavigationBar'` | The navigation bar (or gesture bar on iOS) on both Android and iOS. | 8.0.0 |
