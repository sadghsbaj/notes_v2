Version: v8

On this page

# @capacitor/keyboard

The Keyboard API provides keyboard display and visibility control, along with event tracking when the keyboard shows and hides.

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/keyboardnpx cap sync
```

## Example[​](#example "Direct link to Example")

```
import { Keyboard } from '@capacitor/keyboard';Keyboard.addListener('keyboardWillShow', info => {  console.log('keyboard will show with height:', info.keyboardHeight);});Keyboard.addListener('keyboardDidShow', info => {  console.log('keyboard did show with height:', info.keyboardHeight);});Keyboard.addListener('keyboardWillHide', () => {  console.log('keyboard will hide');});Keyboard.addListener('keyboardDidHide', () => {  console.log('keyboard did hide');});
```

## Configuration[​](#configuration "Direct link to Configuration")

On iOS, the keyboard can be configured with the following options:

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`resize`** |
```
KeyboardResize
```

 | Configure the way the app is resized when the Keyboard appears. Only available on iOS. | `native` | 1.0.0 |
| **`style`** |

```
KeyboardStyle
```

 | Override the keyboard style if your app doesn't support dark/light theme changes. If not set, the keyboard style will depend on the device appearance. Only available on iOS. |  | 1.0.0 |
| **`resizeOnFullScreen`** | `boolean` | There is an Android bug that prevents the keyboard from resizing the WebView when the app is in full screen (i.e. if StatusBar plugin is used to overlay the status bar). This setting, if set to true, add a workaround that resizes the WebView even when the app is in full screen. Only available for Android |  | 1.1.0 |

### Examples[​](#examples "Direct link to Examples")

In `capacitor.config.json`:

```
{  "plugins": {    "Keyboard": {      "resize": "body",      "style": "DARK",      "resizeOnFullScreen": true    }  }}
```

In `capacitor.config.ts`:

```
/// <reference types="@capacitor/keyboard" />import { CapacitorConfig } from '@capacitor/cli';import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';const config: CapacitorConfig = {  plugins: {    Keyboard: {      resize: KeyboardResize.Body,      style: KeyboardStyle.Dark,      resizeOnFullScreen: true,    },  },};export default config;
```

## Compatibility with `cordova-plugin-ionic-keyboard`[​](#compatibility-with-cordova-plugin-ionic-keyboard "Direct link to compatibility-with-cordova-plugin-ionic-keyboard")

To maintain compatibility with [`cordova-plugin-ionic-keyboard`](https://github.com/ionic-team/cordova-plugin-ionic-keyboard), the following events also work with `window.addEventListener`:

-   `keyboardWillShow`
-   `keyboardDidShow`
-   `keyboardWillHide`
-   `keyboardDidHide`

## API[​](#api "Direct link to API")

-   [`show()`](#show)
-   [`hide()`](#hide)
-   [`setAccessoryBarVisible(...)`](#setaccessorybarvisible)
-   [`setScroll(...)`](#setscroll)
-   [`setStyle(...)`](#setstyle)
-   [`setResizeMode(...)`](#setresizemode)
-   [`getResizeMode()`](#getresizemode)
-   [`addListener('keyboardWillShow', ...)`](#addlistenerkeyboardwillshow-)
-   [`addListener('keyboardDidShow', ...)`](#addlistenerkeyboarddidshow-)
-   [`addListener('keyboardWillHide', ...)`](#addlistenerkeyboardwillhide-)
-   [`addListener('keyboardDidHide', ...)`](#addlistenerkeyboarddidhide-)
-   [`removeAllListeners()`](#removealllisteners)
-   [Interfaces](#interfaces)
-   [Enums](#enums)

### show()[​](#show "Direct link to show()")

```
show() => Promise<void>
```

Show the keyboard.

This method is only supported on Android.

**Since:** 1.0.0

* * *

### hide()[​](#hide "Direct link to hide()")

```
hide() => Promise<void>
```

Hide the keyboard.

**Since:** 1.0.0

* * *

### setAccessoryBarVisible(...)[​](#setaccessorybarvisible "Direct link to setAccessoryBarVisible(...)")

```
setAccessoryBarVisible(options: { isVisible: boolean; }) => Promise<void>
```

Set whether the accessory bar should be visible on the keyboard. We recommend disabling the accessory bar for short forms (login, signup, etc.) to provide a cleaner UI.

This method is only supported on iPhone devices.

| Param | Type |
| --- | --- |
| **`options`** | `{ isVisible: boolean; }` |

**Since:** 1.0.0

* * *

### setScroll(...)[​](#setscroll "Direct link to setScroll(...)")

```
setScroll(options: { isDisabled: boolean; }) => Promise<void>
```

Programmatically enable or disable the WebView scroll.

This method is only supported on iOS.

| Param | Type |
| --- | --- |
| **`options`** | `{ isDisabled: boolean; }` |

**Since:** 1.0.0

* * *

### setStyle(...)[​](#setstyle "Direct link to setStyle(...)")

```
setStyle(options: KeyboardStyleOptions) => Promise<void>
```

Programmatically set the keyboard style.

This method is only supported on iOS.

| Param | Type |
| --- | --- |
| **`options`** |
```
KeyboardStyleOptions
```

 |

**Since:** 1.0.0

* * *

### setResizeMode(...)[​](#setresizemode "Direct link to setResizeMode(...)")

```
setResizeMode(options: KeyboardResizeOptions) => Promise<void>
```

Programmatically set the resize mode.

This method is only supported on iOS.

| Param | Type |
| --- | --- |
| **`options`** |
```
KeyboardResizeOptions
```

 |

**Since:** 1.0.0

* * *

### getResizeMode()[​](#getresizemode "Direct link to getResizeMode()")

```
getResizeMode() => Promise<KeyboardResizeOptions>
```

Get the currently set resize mode.

This method is only supported on iOS.

**Returns:**

```
Promise<KeyboardResizeOptions>
```

**Since:** 4.0.0

* * *

### addListener('keyboardWillShow', ...)[​](#addlistenerkeyboardwillshow- "Direct link to addListener('keyboardWillShow', ...)")

```
addListener(eventName: 'keyboardWillShow', listenerFunc: (info: KeyboardInfo) => void) => Promise<PluginListenerHandle>
```

Listen for when the keyboard is about to be shown.

On Android keyboardWillShow and keyboardDidShow fire almost at the same time.

| Param | Type |
| --- | --- |
| **`eventName`** | `'keyboardWillShow'` |
| **`listenerFunc`** |
```
(info: KeyboardInfo) => void
```

 |

**Returns:**

```
Promise<PluginListenerHandle>
```

**Since:** 1.0.0

* * *

### addListener('keyboardDidShow', ...)[​](#addlistenerkeyboarddidshow- "Direct link to addListener('keyboardDidShow', ...)")

```
addListener(eventName: 'keyboardDidShow', listenerFunc: (info: KeyboardInfo) => void) => Promise<PluginListenerHandle>
```

Listen for when the keyboard is shown.

On Android keyboardWillShow and keyboardDidShow fire almost at the same time.

| Param | Type |
| --- | --- |
| **`eventName`** | `'keyboardDidShow'` |
| **`listenerFunc`** |
```
(info: KeyboardInfo) => void
```

 |

**Returns:**

```
Promise<PluginListenerHandle>
```

**Since:** 1.0.0

* * *

### addListener('keyboardWillHide', ...)[​](#addlistenerkeyboardwillhide- "Direct link to addListener('keyboardWillHide', ...)")

```
addListener(eventName: 'keyboardWillHide', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Listen for when the keyboard is about to be hidden.

On Android keyboardWillHide and keyboardDidHide fire almost at the same time.

| Param | Type |
| --- | --- |
| **`eventName`** | `'keyboardWillHide'` |
| **`listenerFunc`** | `() => void` |

**Returns:**

```
Promise<PluginListenerHandle>
```

**Since:** 1.0.0

* * *

### addListener('keyboardDidHide', ...)[​](#addlistenerkeyboarddidhide- "Direct link to addListener('keyboardDidHide', ...)")

```
addListener(eventName: 'keyboardDidHide', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Listen for when the keyboard is hidden.

On Android keyboardWillHide and keyboardDidHide fire almost at the same time.

| Param | Type |
| --- | --- |
| **`eventName`** | `'keyboardDidHide'` |
| **`listenerFunc`** | `() => void` |

**Returns:**

```
Promise<PluginListenerHandle>
```

**Since:** 1.0.0

* * *

### removeAllListeners()[​](#removealllisteners "Direct link to removeAllListeners()")

```
removeAllListeners() => Promise<void>
```

Remove all native listeners for this plugin.

**Since:** 1.0.0

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### KeyboardStyleOptions[​](#keyboardstyleoptions "Direct link to KeyboardStyleOptions")

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`style`** |
```
KeyboardStyle
```

 | Style of the keyboard. | `KeyboardStyle.Default` | 1.0.0 |

#### KeyboardResizeOptions[​](#keyboardresizeoptions "Direct link to KeyboardResizeOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`mode`** |
```
KeyboardResize
```

 | Mode used to resize elements when the keyboard appears. | 1.0.0 |

#### PluginListenerHandle[​](#pluginlistenerhandle "Direct link to PluginListenerHandle")

| Prop | Type |
| --- | --- |
| **`remove`** | `() => Promise<void>` |

#### KeyboardInfo[​](#keyboardinfo "Direct link to KeyboardInfo")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`keyboardHeight`** | `number` | Height of the keyboard. | 1.0.0 |

### Enums[​](#enums "Direct link to Enums")

#### KeyboardStyle[​](#keyboardstyle "Direct link to KeyboardStyle")

| Members | Value | Description | Since |
| --- | --- | --- | --- |
| **`Dark`** | `'DARK'` | Dark keyboard. | 1.0.0 |
| **`Light`** | `'LIGHT'` | Light keyboard. | 1.0.0 |
| **`Default`** | `'DEFAULT'` | The keyboard style is based on the device appearance. If the device is using Dark mode, the keyboard will be dark. If the device is using Light mode, the keyboard will be light. | 1.0.0 |

#### KeyboardResize[​](#keyboardresize "Direct link to KeyboardResize")

| Members | Value | Description | Since |
| --- | --- | --- | --- |
| **`Body`** | `'body'` | Only the `body` HTML element will be resized. Relative units are not affected, because the viewport does not change. | 1.0.0 |
| **`Ionic`** | `'ionic'` | Only the `ion-app` HTML element will be resized. Use it only for Ionic Framework apps. | 1.0.0 |
| **`Native`** | `'native'` | The whole native Web View will be resized when the keyboard shows/hides. This affects the `vh` relative unit. | 1.0.0 |
| **`None`** | `'none'` | Neither the app nor the Web View are resized. | 1.0.0 |

## Contents

-   [Install](#install)
-   [Example](#example)
-   [Configuration](#configuration)
    -   [Examples](#examples)
-   [Compatibility with `cordova-plugin-ionic-keyboard`](#compatibility-with-cordova-plugin-ionic-keyboard)
-   [API](#api)
    -   [show()](#show)
    -   [hide()](#hide)
    -   [setAccessoryBarVisible(...)](#setaccessorybarvisible)
    -   [setScroll(...)](#setscroll)
    -   [setStyle(...)](#setstyle)
    -   [setResizeMode(...)](#setresizemode)
    -   [getResizeMode()](#getresizemode)
    -   [addListener('keyboardWillShow', ...)](#addlistenerkeyboardwillshow-)
    -   [addListener('keyboardDidShow', ...)](#addlistenerkeyboarddidshow-)
    -   [addListener('keyboardWillHide', ...)](#addlistenerkeyboardwillhide-)
    -   [addListener('keyboardDidHide', ...)](#addlistenerkeyboarddidhide-)
    -   [removeAllListeners()](#removealllisteners)
    -   [Interfaces](#interfaces)
    -   [Enums](#enums)

* * *
