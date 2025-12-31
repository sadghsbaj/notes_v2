Version: v8

On this page

# @capacitor/inappbrowser

The InAppBrowser Plugin provides a web browser view that allows you to load any web page externally. It behaves as a standard web browser and is useful to load untrusted content without risking your application's security. It offers three different ways to open URLs; in a WebView, in an in-app system browser (Custom Tabs for Android and SFSafariViewController for iOS), and in the device's default browser.

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/inappbrowsernpx cap sync
```

## Supported Platforms[​](#supported-platforms "Direct link to Supported Platforms")

-   iOS
-   Android

#### Android[​](#android "Direct link to Android")

The InAppBrowser plugin requires a minimum Android SDK target of 26. This is higher than the default that comes with your Capacitor application. You can update this value in your `android/variables.gradle` file.

```
ext {    minSdkVersion = 26}
```

## Usage Example[​](#usage-example "Direct link to Usage Example")

#### Open In External Browser[​](#open-in-external-browser "Direct link to Open In External Browser")

```
import { InAppBrowser } from '@capacitor/inappbrowser';await InAppBrowser.openInExternalBrowser({    url: "https://www.google.com"});
```

#### Open In System Browser (Custom Tabs for Android, SFSafariViewController for iOS)[​](#open-in-system-browser-custom-tabs-for-android-sfsafariviewcontroller-for-ios "Direct link to Open In System Browser (Custom Tabs for Android, SFSafariViewController for iOS)")

```
import { InAppBrowser, DefaultSystemBrowserOptions } from '@capacitor/inappbrowser';await InAppBrowser.openInSystemBrowser({    url: "https://www.google.com",    options: DefaultSystemBrowserOptions});
```

#### Open In Web View[​](#open-in-web-view "Direct link to Open In Web View")

```
import { InAppBrowser, DefaultWebViewOptions } from '@capacitor/inappbrowser';await InAppBrowser.openInWebView({    url: "https://www.google.com",    options: DefaultWebViewOptions});
```

#### Close (Web View or System Browser)[​](#close-web-view-or-system-browser "Direct link to Close (Web View or System Browser)")

```
import { InAppBrowser } from '@capacitor/inappbrowser';await InAppBrowser.close();
```

#### Add Listeners[​](#add-listeners "Direct link to Add Listeners")

```
import { InAppBrowser } from '@capacitor/inappbrowser';await InAppBrowser.addListener('browserClosed', () => {    console.log("browser was closed.");});await InAppBrowser.addListener('browserPageNavigationCompleted', (data) => {    console.log("browser page navigation was completed. " + data.url);});await InAppBrowser.addListener('browserPageLoaded', () => {    console.log("browser was loaded.");});
```

#### Remove All Listeners[​](#remove-all-listeners "Direct link to Remove All Listeners")

```
import { InAppBrowser } from '@capacitor/inappbrowser';InAppBrowser.removeAllListeners();
```

## API[​](#api "Direct link to API")

-   [`openInWebView(...)`](#openinwebview)
-   [`openInSystemBrowser(...)`](#openinsystembrowser)
-   [`openInExternalBrowser(...)`](#openinexternalbrowser)
-   [`close()`](#close)
-   [`addListener('browserClosed' | 'browserPageLoaded', ...)`](#addlistenerbrowserclosed--browserpageloaded-)
-   [`addListener('browserPageNavigationCompleted', ...)`](#addlistenerbrowserpagenavigationcompleted-)
-   [`removeAllListeners()`](#removealllisteners)
-   [Interfaces](#interfaces)
-   [Enums](#enums)

### openInWebView(...)[​](#openinwebview "Direct link to openInWebView(...)")

```
openInWebView(model: OpenInWebViewParameterModel) => Promise<void>
```

Opens the web content of the given URL in your mobile app using a custom web view within your application.

| Param | Type | Description |
| --- | --- | --- |
| **`model`** |
```
OpenInWebViewParameterModel
```

 | The parameters to open the URL in the web view |

* * *

### openInSystemBrowser(...)[​](#openinsystembrowser "Direct link to openInSystemBrowser(...)")

```
openInSystemBrowser(model: OpenInSystemBrowserParameterModel) => Promise<void>
```

Opens the web content of the given URL in your mobile app, using SafariViewController for iOS and Custom Tabs for Android.

| Param | Type | Description |
| --- | --- | --- |
| **`model`** |
```
OpenInSystemBrowserParameterModel
```

 | The parameters to open the URL in the system browser |

* * *

### openInExternalBrowser(...)[​](#openinexternalbrowser "Direct link to openInExternalBrowser(...)")

```
openInExternalBrowser(model: OpenInDefaultParameterModel) => Promise<void>
```

Opens the web content of the given URL in a separate browser, outside of your mobile application.

| Param | Type | Description |
| --- | --- | --- |
| **`model`** |
```
OpenInDefaultParameterModel
```

 | The parameters to open the URL in the external browser |

* * *

### close()[​](#close "Direct link to close()")

```
close() => Promise<void>
```

Closes the currently active browser. It can be used to close browsers launched through the openInSystemBrowser or openInWebView actions.

* * *

### addListener('browserClosed' | 'browserPageLoaded', ...)[​](#addlistenerbrowserclosed--browserpageloaded- "Direct link to addListener('browserClosed' | 'browserPageLoaded', ...)")

```
addListener(eventName: "browserClosed" | "browserPageLoaded", listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Adds a listener for the specified browser events, with no data being returned.

| Param | Type | Description |
| --- | --- | --- |
| **`eventName`** | `'browserClosed' | 'browserPageLoaded'` | The name of the browser event to listen for: 'browserClosed' or 'browserPageLoaded'. |
| **`listenerFunc`** | `() => void` | The function to be called when the event occurs. |

**Returns:**

```
Promise<PluginListenerHandle>
```

* * *

### addListener('browserPageNavigationCompleted', ...)[​](#addlistenerbrowserpagenavigationcompleted- "Direct link to addListener('browserPageNavigationCompleted', ...)")

```
addListener(eventName: "browserPageNavigationCompleted", listenerFunc: (data: BrowserPageNavigationCompletedEventData) => void) => Promise<PluginListenerHandle>
```

Adds a listener for the specified browser event, which receives data.

| Param | Type | Description |
| --- | --- | --- |
| **`eventName`** | `'browserPageNavigationCompleted'` | The name of the browser event to listen for: 'browserPageNavigationCompleted'. Applies only to openInWebView. |
| **`listenerFunc`** |
```
(data: BrowserPageNavigationCompletedEventData) => void
```

 | The function to be called when the event occurs. |

**Returns:**

```
Promise<PluginListenerHandle>
```

* * *

### removeAllListeners()[​](#removealllisteners "Direct link to removeAllListeners()")

```
removeAllListeners() => void
```

Removes all listeners for the browser events.

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### OpenInWebViewParameterModel[​](#openinwebviewparametermodel "Direct link to OpenInWebViewParameterModel")

Defines the options for opening a URL in the web view.

| Prop | Type | Description |
| --- | --- | --- |
| **`options`** |
```
WebViewOptions
```

 | A structure containing some configurations to apply to the Web View. |
| **`customHeaders`** | `{ [key: string]: string; }` | A map of custom headers to be sent with the request. |

#### WebViewOptions[​](#webviewoptions "Direct link to WebViewOptions")

| Prop | Type | Description |
| --- | --- | --- |
| **`showURL`** | `boolean` | Displays the URL on the Web View. |
| **`showToolbar`** | `boolean` | Displays the toolbar on the Web View. |
| **`clearCache`** | `boolean` | Clears the Web View's cookie cache before a new window is opened. |
| **`clearSessionCache`** | `boolean` | Clears the session cookie cache before a new window is opened. |
| **`mediaPlaybackRequiresUserAction`** | `boolean` | Prevents HTML5 audio or video from auto-playing. |
| **`closeButtonText`** | `string` | Sets the text to display on the Close button on the Web View. |
| **`toolbarPosition`** |
```
ToolbarPosition
```

 | Sets the position to display the Toolbar on the Web View. |
| **`showNavigationButtons`** | `boolean` | Displays the navigation buttons. |
| **`leftToRight`** | `boolean` | Swaps the positions of the navigation buttons and the close button. |
| **`customWebViewUserAgent`** | `string | null` | Sets a custom user agent to open the Web View with. If empty or not set, the parameter will be ignored. |
| **`android`** |

```
AndroidWebViewOptions
```

 | Android-specific Web View options. |
| **`iOS`** |

```
iOSWebViewOptions
```

 | iOS-specific Web View options. |

#### AndroidWebViewOptions[​](#androidwebviewoptions "Direct link to AndroidWebViewOptions")

| Prop | Type | Description |
| --- | --- | --- |
| **`allowZoom`** | `boolean` | Shows the Android browser's zoom controls. |
| **`hardwareBack`** | `boolean` | Uses the hardware back button to navigate backwards through the Web View's history. If there is no previous page, the Web View will close. |
| **`pauseMedia`** | `boolean` | Makes the Web View pause/resume with the app to stop background audio. |

#### iOSWebViewOptions[​](#ioswebviewoptions "Direct link to iOSWebViewOptions")

| Prop | Type | Description |
| --- | --- | --- |
| **`allowOverScroll`** | `boolean` | Turns on the Web View bounce property. |
| **`enableViewportScale`** | `boolean` | Prevents viewport scaling through a meta tag. |
| **`allowInLineMediaPlayback`** | `boolean` | Allows in-line HTML5 media playback, displaying within the browser window rather than a device-specific playback interface. Note: The HTML's video element must also include the webkit-playsinline attribute. |
| **`surpressIncrementalRendering`** | `boolean` | Waits until all new view content is received before being rendered. |
| **`viewStyle`** |
```
iOSViewStyle
```

 | Sets the presentation style of the Web View. |
| **`animationEffect`** |

```
iOSAnimation
```

 | Sets the transition style of the Web View. |
| **`allowsBackForwardNavigationGestures`** | `boolean` | Enables back and forward swipe gestures in the Web View. |

#### OpenInSystemBrowserParameterModel[​](#openinsystembrowserparametermodel "Direct link to OpenInSystemBrowserParameterModel")

Defines the options for opening a URL in the system browser.

| Prop | Type | Description |
| --- | --- | --- |
| **`options`** |
```
SystemBrowserOptions
```

 | A structure containing some configurations to apply to the System Browser. |

#### SystemBrowserOptions[​](#systembrowseroptions "Direct link to SystemBrowserOptions")

| Prop | Type | Description |
| --- | --- | --- |
| **`android`** |
```
AndroidSystemBrowserOptions
```

 | Android-specific System Browser options. |
| **`iOS`** |

```
iOSSystemBrowserOptions
```

 | iOS-specific System Browser options. |

#### AndroidSystemBrowserOptions[​](#androidsystembrowseroptions "Direct link to AndroidSystemBrowserOptions")

| Prop | Type | Description |
| --- | --- | --- |
| **`showTitle`** | `boolean` | Enables the title display. |
| **`hideToolbarOnScroll`** | `boolean` | Hides the toolbar when scrolling. |
| **`viewStyle`** |
```
AndroidViewStyle
```

 | Sets the presentation style of CustomTabs. |
| **`bottomSheetOptions`** |

```
AndroidBottomSheet
```

 | Sets the options for the bottom sheet when this is selected as the viewStyle. If viewStyle is FULL\_SCREEN, this will be ignored. |
| **`startAnimation`** |

```
AndroidAnimation
```

 | Sets the start animation for when the browser appears. |
| **`exitAnimation`** |

```
AndroidAnimation
```

 | Sets the exit animation for when the browser disappears. |

#### AndroidBottomSheet[​](#androidbottomsheet "Direct link to AndroidBottomSheet")

| Prop | Type | Description |
| --- | --- | --- |
| **`height`** | `number` | Sets the height of the bottom sheet, in pixels. Custom tabs will set the bottom height to at least 50% of the screen. If no value is passed, it will default to the minimum value. |
| **`isFixed`** | `boolean` | Sets whether the bottom sheet is fixed. |

#### iOSSystemBrowserOptions[​](#iossystembrowseroptions "Direct link to iOSSystemBrowserOptions")

| Prop | Type | Description |
| --- | --- | --- |
| **`closeButtonText`** |
```
DismissStyle
```

 | Sets a text to use as the close button's caption. |
| **`viewStyle`** |

```
iOSViewStyle
```

 | Sets the presentation style of SafariViewController. |
| **`animationEffect`** |

```
iOSAnimation
```

 | Sets the transition style of SafariViewController. |
| **`enableBarsCollapsing`** | `boolean` | Enables bars to collapse on scrolling down. |
| **`enableReadersMode`** | `boolean` | Enables readers mode. |

#### OpenInDefaultParameterModel[​](#openindefaultparametermodel "Direct link to OpenInDefaultParameterModel")

Defines the options for opening a URL in the external browser and used by the others.

| Prop | Type | Description |
| --- | --- | --- |
| **`url`** | `string` | The URL to be opened. It must contain either 'http' or 'https' as the protocol prefix. |

#### PluginListenerHandle[​](#pluginlistenerhandle "Direct link to PluginListenerHandle")

| Prop | Type |
| --- | --- |
| **`remove`** | `() => Promise<void>` |

#### BrowserPageNavigationCompletedEventData[​](#browserpagenavigationcompletedeventdata "Direct link to BrowserPageNavigationCompletedEventData")

Defines the data for the 'browserPageNavigationCompleted' event.

| Prop | Type | Description |
| --- | --- | --- |
| **`url`** | `string` | The URL of the page that was loaded. |

### Enums[​](#enums "Direct link to Enums")

#### ToolbarPosition[​](#toolbarposition "Direct link to ToolbarPosition")

| Members |
| --- |
| **`TOP`** |
| **`BOTTOM`** |

#### iOSViewStyle[​](#iosviewstyle "Direct link to iOSViewStyle")

| Members |
| --- |
| **`PAGE_SHEET`** |
| **`FORM_SHEET`** |
| **`FULL_SCREEN`** |

#### iOSAnimation[​](#iosanimation "Direct link to iOSAnimation")

| Members |
| --- |
| **`FLIP_HORIZONTAL`** |
| **`CROSS_DISSOLVE`** |
| **`COVER_VERTICAL`** |

#### AndroidViewStyle[​](#androidviewstyle "Direct link to AndroidViewStyle")

| Members |
| --- |
| **`BOTTOM_SHEET`** |
| **`FULL_SCREEN`** |

#### AndroidAnimation[​](#androidanimation "Direct link to AndroidAnimation")

| Members |
| --- |
| **`FADE_IN`** |
| **`FADE_OUT`** |
| **`SLIDE_IN_LEFT`** |
| **`SLIDE_OUT_RIGHT`** |

#### DismissStyle[​](#dismissstyle "Direct link to DismissStyle")

| Members |
| --- |
| **`CLOSE`** |
| **`CANCEL`** |
| **`DONE`** |
