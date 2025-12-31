Version: v8

On this page

# @capacitor/browser

The Browser API provides the ability to open an in-app browser and subscribe to browser events.

On iOS, this uses `SFSafariViewController` and is compliant with leading OAuth service in-app-browser requirements.

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/browsernpx cap sync
```

## Android[​](#android "Direct link to Android")

### Variables[​](#variables "Direct link to Variables")

This plugin will use the following project variables (defined in your app's `variables.gradle` file):

-   `androidxBrowserVersion`: version of `androidx.browser:browser` (default: `1.9.0`)

## Example[​](#example "Direct link to Example")

```
import { Browser } from '@capacitor/browser';const openCapacitorSite = async () => {  await Browser.open({ url: 'http://capacitorjs.com/' });};
```

## API[​](#api "Direct link to API")

-   [`open(...)`](#open)
-   [`close()`](#close)
-   [`addListener('browserFinished', ...)`](#addlistenerbrowserfinished-)
-   [`addListener('browserPageLoaded', ...)`](#addlistenerbrowserpageloaded-)
-   [`removeAllListeners()`](#removealllisteners)
-   [Interfaces](#interfaces)

### open(...)[​](#open "Direct link to open(...)")

```
open(options: OpenOptions) => Promise<void>
```

Open a page with the specified options.

| Param | Type |
| --- | --- |
| **`options`** |
```
OpenOptions
```

 |

**Since:** 1.0.0

* * *

### close()[​](#close "Direct link to close()")

```
close() => Promise<void>
```

Web & iOS only: Close an open browser window.

No-op on other platforms.

**Since:** 1.0.0

* * *

### addListener('browserFinished', ...)[​](#addlistenerbrowserfinished- "Direct link to addListener('browserFinished', ...)")

```
addListener(eventName: 'browserFinished', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Android & iOS only: Listen for the browser finished event. It fires when the Browser is closed by the user.

| Param | Type |
| --- | --- |
| **`eventName`** | `'browserFinished'` |
| **`listenerFunc`** | `() => void` |

**Returns:**

```
Promise<PluginListenerHandle>
```

**Since:** 1.0.0

* * *

### addListener('browserPageLoaded', ...)[​](#addlistenerbrowserpageloaded- "Direct link to addListener('browserPageLoaded', ...)")

```
addListener(eventName: 'browserPageLoaded', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Android & iOS only: Listen for the page loaded event. It's only fired when the URL passed to open method finish loading. It is not invoked for any subsequent page loads.

| Param | Type |
| --- | --- |
| **`eventName`** | `'browserPageLoaded'` |
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

#### OpenOptions[​](#openoptions "Direct link to OpenOptions")

Represents the options passed to `open`.

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`url`** | `string` | The URL to which the browser is opened. | 1.0.0 |
| **`windowName`** | `string` | Web only: Optional target for browser open. Follows the `target` property for window.open. Defaults to \_blank. Ignored on other platforms. | 1.0.0 |
| **`toolbarColor`** | `string` | A hex color to which the toolbar color is set. | 1.0.0 |
| **`presentationStyle`** | `'fullscreen' | 'popover'` | iOS only: The presentation style of the browser. Defaults to fullscreen. Ignored on other platforms. | 1.0.0 |
| **`width`** | `number` | iOS only: The width the browser when using presentationStyle 'popover' on iPads. Ignored on other platforms. | 4.0.0 |
| **`height`** | `number` | iOS only: The height the browser when using presentationStyle 'popover' on iPads. Ignored on other platforms. | 4.0.0 |

#### PluginListenerHandle[​](#pluginlistenerhandle "Direct link to PluginListenerHandle")

| Prop | Type |
| --- | --- |
| **`remove`** | `() => Promise<void>` |
