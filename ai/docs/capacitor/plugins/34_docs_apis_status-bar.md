Version: v8

On this page

# @capacitor/status-bar

The StatusBar API Provides methods for configuring the style of the Status Bar, along with showing or hiding it.

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/status-barnpx cap sync
```

## Android 16+ behavior change[​](#android-16-behavior-change "Direct link to Android 16+ behavior change")

For apps targeting **Android 16 (API level 36)** and higher using **Capacitor 8**, the following Status Bar configuration options **no longer work**:

-   `overlaysWebView`
-   `backgroundColor`

These options relied on the ability to opt out of Android’s **edge-to-edge** system UI behavior, which allowed apps to control how the status bar overlays and its background color.

In **Android 15 (API level 35)**, it was still possible to opt out of this enforced behavior by setting the `windowOptOutEdgeToEdgeEnforcement` property in the application layout file. Without that property, the application assumed `overlaysWebView` as always `true`. See more details in the Android documentation: [https://developer.android.com/reference/android/R.attr#windowOptOutEdgeToEdgeEnforcement](https://developer.android.com.reference/android/R.attr#windowOptOutEdgeToEdgeEnforcement)

Starting with **Android 16**, this opt-out is **no longer available**, and the behavior is enforced by the system.
As a result, the `overlaysWebView` and `backgroundColor` configuration options no longer have any effect.

## iOS Note[​](#ios-note "Direct link to iOS Note")

This plugin requires "View controller-based status bar appearance" (`UIViewControllerBasedStatusBarAppearance`) set to `YES` in `Info.plist`. Read about [Configuring iOS](https://capacitorjs.com/docs/ios/configuration) for help.

The status bar visibility defaults to visible and the style defaults to `Style.Default`. You can change these defaults by adding `UIStatusBarHidden` and/or `UIStatusBarStyle` in `Info.plist`.

## Example[​](#example "Direct link to Example")

```
import { StatusBar, Style } from '@capacitor/status-bar';// iOS onlywindow.addEventListener('statusTap', function () {  console.log('statusbar tapped');});// Display content under transparent status barStatusBar.setOverlaysWebView({ overlay: true });const setStatusBarStyleDark = async () => {  await StatusBar.setStyle({ style: Style.Dark });};const setStatusBarStyleLight = async () => {  await StatusBar.setStyle({ style: Style.Light });};const hideStatusBar = async () => {  await StatusBar.hide();};const showStatusBar = async () => {  await StatusBar.show();};
```

## Configuration[​](#configuration "Direct link to Configuration")

These config values are available:

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`overlaysWebView`** | `boolean` | Whether the statusbar is overlaid or not. Not available on Android 15+. | `true` | 1.0.0 |
| **`style`** | `string` | [Style](#style) of the text of the status bar. | `default` | 1.0.0 |
| **`backgroundColor`** | `string` | Color of the background of the statusbar in hex format, #RRGGBB. Doesn't work if `overlaysWebView` is true. Not available on Android 15+. | `#000000` | 1.0.0 |

### Examples[​](#examples "Direct link to Examples")

In `capacitor.config.json`:

```
{  "plugins": {    "StatusBar": {      "overlaysWebView": false,      "style": "DARK",      "backgroundColor": "#ffffffff"    }  }}
```

In `capacitor.config.ts`:

```
/// <reference types="@capacitor/status-bar" />import { CapacitorConfig } from '@capacitor/cli';const config: CapacitorConfig = {  plugins: {    StatusBar: {      overlaysWebView: false,      style: "DARK",      backgroundColor: "#ffffffff",    },  },};export default config;
```

## API[​](#api "Direct link to API")

-   [`setStyle(...)`](#setstyle)
-   [`setBackgroundColor(...)`](#setbackgroundcolor)
-   [`show(...)`](#show)
-   [`hide(...)`](#hide)
-   [`getInfo()`](#getinfo)
-   [`setOverlaysWebView(...)`](#setoverlayswebview)
-   [Interfaces](#interfaces)
-   [Enums](#enums)

### setStyle(...)[​](#setstyle "Direct link to setStyle(...)")

```
setStyle(options: StyleOptions) => Promise<void>
```

Set the current style of the status bar.

| Param | Type |
| --- | --- |
| **`options`** |
```
StyleOptions
```

 |

**Since:** 1.0.0

* * *

### setBackgroundColor(...)[​](#setbackgroundcolor "Direct link to setBackgroundColor(...)")

```
setBackgroundColor(options: BackgroundColorOptions) => Promise<void>
```

Set the background color of the status bar. Calling this function updates the foreground color of the status bar if the style is set to default, except on iOS versions lower than 17. Not available on Android 15+.

| Param | Type |
| --- | --- |
| **`options`** |
```
BackgroundColorOptions
```

 |

**Since:** 1.0.0

* * *

### show(...)[​](#show "Direct link to show(...)")

```
show(options?: AnimationOptions | undefined) => Promise<void>
```

Show the status bar. On iOS, if the status bar is initially hidden and the initial style is set to `UIStatusBarStyleLightContent`, first show call might present a glitch on the animation showing the text as dark and then transition to light. It's recommended to use [`Animation.None`](#animation) as the animation on the first call.

| Param | Type |
| --- | --- |
| **`options`** |
```
AnimationOptions
```

 |

**Since:** 1.0.0

* * *

### hide(...)[​](#hide "Direct link to hide(...)")

```
hide(options?: AnimationOptions | undefined) => Promise<void>
```

Hide the status bar.

| Param | Type |
| --- | --- |
| **`options`** |
```
AnimationOptions
```

 |

**Since:** 1.0.0

* * *

### getInfo()[​](#getinfo "Direct link to getInfo()")

```
getInfo() => Promise<StatusBarInfo>
```

Get info about the current state of the status bar.

**Returns:**

```
Promise<StatusBarInfo>
```

**Since:** 1.0.0

* * *

### setOverlaysWebView(...)[​](#setoverlayswebview "Direct link to setOverlaysWebView(...)")

```
setOverlaysWebView(options: SetOverlaysWebViewOptions) => Promise<void>
```

Set whether or not the status bar should overlay the webview to allow usage of the space underneath it. Not available on Android 15+.

| Param | Type |
| --- | --- |
| **`options`** |
```
SetOverlaysWebViewOptions
```

 |

**Since:** 1.0.0

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### StyleOptions[​](#styleoptions "Direct link to StyleOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`style`** |
```
Style
```

 | [Style](#style) of the text of the status bar. | 1.0.0 |

#### BackgroundColorOptions[​](#backgroundcoloroptions "Direct link to BackgroundColorOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`color`** | `string` | A hex color to which the status bar color is set. | 1.0.0 |

#### AnimationOptions[​](#animationoptions "Direct link to AnimationOptions")

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`animation`** |
```
Animation
```

 | The type of status bar animation used when showing or hiding. This option is only supported on iOS. | `Animation.Fade` | 1.0.0 |

#### StatusBarInfo[​](#statusbarinfo "Direct link to StatusBarInfo")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`visible`** | `boolean` | Whether the status bar is visible or not. | 1.0.0 |
| **`style`** |
```
Style
```

 | The current status bar style. | 1.0.0 |
| **`color`** | `string` | The current status bar color. | 1.0.0 |
| **`overlays`** | `boolean` | Whether the statusbar is overlaid or not. | 1.0.0 |

#### SetOverlaysWebViewOptions[​](#setoverlayswebviewoptions "Direct link to SetOverlaysWebViewOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`overlay`** | `boolean` | Whether to overlay the status bar or not. | 1.0.0 |

### Enums[​](#enums "Direct link to Enums")

#### Style[​](#style "Direct link to Style")

| Members | Value | Description | Since |
| --- | --- | --- | --- |
| **`Dark`** | `'DARK'` | Light text for dark backgrounds. | 1.0.0 |
| **`Light`** | `'LIGHT'` | Dark text for light backgrounds. | 1.0.0 |
| **`Default`** | `'DEFAULT'` | The style is based on the device appearance. If the device is using Dark mode, the statusbar text will be light. If the device is using Light mode, the statusbar text will be dark. | 1.0.0 |

#### Animation[​](#animation "Direct link to Animation")

| Members | Value | Description | Since |
| --- | --- | --- | --- |
| **`None`** | `'NONE'` | No animation during show/hide. | 1.0.0 |
| **`Slide`** | `'SLIDE'` | Slide animation during show/hide. It doesn't work on iOS 15+. | 1.0.0 |
| **`Fade`** | `'FADE'` | Fade animation during show/hide. | 1.0.0 |
