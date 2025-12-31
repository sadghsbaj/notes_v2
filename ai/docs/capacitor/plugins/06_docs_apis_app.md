Version: v8

On this page

# @capacitor/app

The App API handles high level App state and events. For example, this API emits events when the app enters and leaves the foreground, handles deeplinks, opens other apps, and manages persisted plugin state.

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/appnpx cap sync
```

## iOS[​](#ios "Direct link to iOS")

For being able to open the app from a custom scheme you need to register the scheme first. You can do it by editing the [`Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) file and adding this lines.

```
<key>CFBundleURLTypes</key><array>  <dict>    <key>CFBundleURLName</key>    <string>com.getcapacitor.capacitor</string>    <key>CFBundleURLSchemes</key>    <array>      <string>mycustomscheme</string>    </array>  </dict></array>
```

## Android[​](#android "Direct link to Android")

For being able to open the app from a custom scheme you need to register the scheme first. You can do it by adding this lines inside the `activity` section of the `AndroidManifest.xml`.

```
<intent-filter>    <action android:name="android.intent.action.VIEW" />    <category android:name="android.intent.category.DEFAULT" />    <category android:name="android.intent.category.BROWSABLE" />    <data android:scheme="@string/custom_url_scheme" /></intent-filter>
```

`custom_url_scheme` value is stored in `strings.xml`. When the Android platform is added, `@capacitor/cli` adds the app's package name as default value, but can be replaced by editing the `strings.xml` file.

## Example[​](#example "Direct link to Example")

```
import { App } from '@capacitor/app';App.addListener('appStateChange', ({ isActive }) => {  console.log('App state changed. Is active?', isActive);});App.addListener('appUrlOpen', data => {  console.log('App opened with URL:', data);});App.addListener('appRestoredResult', data => {  console.log('Restored state:', data);});const checkAppLaunchUrl = async () => {  const { url } = await App.getLaunchUrl();  console.log('App opened with URL: ' + url);};
```

## Configuration[​](#configuration "Direct link to Configuration")

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`disableBackButtonHandler`** | `boolean` | Disable the plugin's default back button handling. Only available for Android. | `false` | 7.1.0 |

### Examples[​](#examples "Direct link to Examples")

In `capacitor.config.json`:

```
{  "plugins": {    "App": {      "disableBackButtonHandler": true    }  }}
```

In `capacitor.config.ts`:

```
/// <reference types="@capacitor/app" />import { CapacitorConfig } from '@capacitor/cli';const config: CapacitorConfig = {  plugins: {    App: {      disableBackButtonHandler: true,    },  },};export default config;
```

## API[​](#api "Direct link to API")

-   [`exitApp()`](#exitapp)
-   [`getInfo()`](#getinfo)
-   [`getState()`](#getstate)
-   [`getLaunchUrl()`](#getlaunchurl)
-   [`minimizeApp()`](#minimizeapp)
-   [`toggleBackButtonHandler(...)`](#togglebackbuttonhandler)
-   [`addListener('appStateChange', ...)`](#addlistenerappstatechange-)
-   [`addListener('pause', ...)`](#addlistenerpause-)
-   [`addListener('resume', ...)`](#addlistenerresume-)
-   [`addListener('appUrlOpen', ...)`](#addlistenerappurlopen-)
-   [`addListener('appRestoredResult', ...)`](#addlistenerapprestoredresult-)
-   [`addListener('backButton', ...)`](#addlistenerbackbutton-)
-   [`removeAllListeners()`](#removealllisteners)
-   [Interfaces](#interfaces)
-   [Type Aliases](#type-aliases)

### exitApp()[​](#exitapp "Direct link to exitApp()")

```
exitApp() => Promise<void>
```

Force exit the app. This should only be used in conjunction with the `backButton` handler for Android to exit the app when navigation is complete.

Ionic handles this itself so you shouldn't need to call this if using Ionic.

**Since:** 1.0.0

* * *

### getInfo()[​](#getinfo "Direct link to getInfo()")

```
getInfo() => Promise<AppInfo>
```

Return information about the app.

**Returns:**

```
Promise<AppInfo>
```

**Since:** 1.0.0

* * *

### getState()[​](#getstate "Direct link to getState()")

```
getState() => Promise<AppState>
```

Gets the current app state.

**Returns:**

```
Promise<AppState>
```

**Since:** 1.0.0

* * *

### getLaunchUrl()[​](#getlaunchurl "Direct link to getLaunchUrl()")

```
getLaunchUrl() => Promise<AppLaunchUrl | undefined>
```

Get the URL the app was launched with, if any.

**Returns:**

```
Promise<AppLaunchUrl>
```

**Since:** 1.0.0

* * *

### minimizeApp()[​](#minimizeapp "Direct link to minimizeApp()")

```
minimizeApp() => Promise<void>
```

Minimizes the application.

Only available for Android.

**Since:** 1.1.0

* * *

### toggleBackButtonHandler(...)[​](#togglebackbuttonhandler "Direct link to toggleBackButtonHandler(...)")

```
toggleBackButtonHandler(options: ToggleBackButtonHandlerOptions) => Promise<void>
```

Enables or disables the plugin's back button handling during runtime.

Only available for Android.

| Param | Type |
| --- | --- |
| **`options`** |
```
ToggleBackButtonHandlerOptions
```

 |

**Since:** 7.1.0

* * *

### addListener('appStateChange', ...)[​](#addlistenerappstatechange- "Direct link to addListener('appStateChange', ...)")

```
addListener(eventName: 'appStateChange', listenerFunc: StateChangeListener) => Promise<PluginListenerHandle>
```

Listen for changes in the app or the activity states.

On iOS it's fired when the native [UIApplication.willResignActiveNotification](https://developer.apple.com/documentation/uikit/uiapplication/1622973-willresignactivenotification) and [UIApplication.didBecomeActiveNotification](https://developer.apple.com/documentation/uikit/uiapplication/1622953-didbecomeactivenotification) events get fired. On Android it's fired when the Capacitor's Activity [onResume](https://developer.android.com/reference/android/app/Activity#onResume\(\)) and [onStop](https://developer.android.com/reference/android/app/Activity#onStop\(\)) methods gets called. On Web it's fired when the document's visibilitychange gets fired.

| Param | Type |
| --- | --- |
| **`eventName`** | `'appStateChange'` |
| **`listenerFunc`** |
```
StateChangeListener
```

 |

**Returns:**

```
Promise<PluginListenerHandle>
```

**Since:** 1.0.0

* * *

### addListener('pause', ...)[​](#addlistenerpause- "Direct link to addListener('pause', ...)")

```
addListener(eventName: 'pause', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Listen for when the app or the activity are paused.

On iOS it's fired when the native [UIApplication.didEnterBackgroundNotification](https://developer.apple.com/documentation/uikit/uiapplication/1623071-didenterbackgroundnotification) event gets fired. On Android it's fired when the Capacitor's Activity [onPause](https://developer.android.com/reference/android/app/Activity#onPause\(\)) method gets called. On Web it's fired when the document's visibilitychange gets fired and document.hidden is true.

| Param | Type |
| --- | --- |
| **`eventName`** | `'pause'` |
| **`listenerFunc`** | `() => void` |

**Returns:**

```
Promise<PluginListenerHandle>
```

**Since:** 4.1.0

* * *

### addListener('resume', ...)[​](#addlistenerresume- "Direct link to addListener('resume', ...)")

```
addListener(eventName: 'resume', listenerFunc: () => void) => Promise<PluginListenerHandle>
```

Listen for when the app or activity are resumed.

On iOS it's fired when the native [UIApplication.willEnterForegroundNotification](https://developer.apple.com/documentation/uikit/uiapplication/1622944-willenterforegroundnotification) event gets fired. On Android it's fired when the Capacitor's Activity [onResume](https://developer.android.com/reference/android/app/Activity#onResume\(\)) method gets called, but only after resume has fired first. On Web it's fired when the document's visibilitychange gets fired and document.hidden is false.

| Param | Type |
| --- | --- |
| **`eventName`** | `'resume'` |
| **`listenerFunc`** | `() => void` |

**Returns:**

```
Promise<PluginListenerHandle>
```

**Since:** 4.1.0

* * *

### addListener('appUrlOpen', ...)[​](#addlistenerappurlopen- "Direct link to addListener('appUrlOpen', ...)")

```
addListener(eventName: 'appUrlOpen', listenerFunc: URLOpenListener) => Promise<PluginListenerHandle>
```

Listen for url open events for the app. This handles both custom URL scheme links as well as URLs your app handles (Universal Links on iOS and App Links on Android)

| Param | Type |
| --- | --- |
| **`eventName`** | `'appUrlOpen'` |
| **`listenerFunc`** |
```
URLOpenListener
```

 |

**Returns:**

```
Promise<PluginListenerHandle>
```

**Since:** 1.0.0

* * *

### addListener('appRestoredResult', ...)[​](#addlistenerapprestoredresult- "Direct link to addListener('appRestoredResult', ...)")

```
addListener(eventName: 'appRestoredResult', listenerFunc: RestoredListener) => Promise<PluginListenerHandle>
```

If the app was launched with previously persisted plugin call data, such as on Android when an activity returns to an app that was closed, this call will return any data the app was launched with, converted into the form of a result from a plugin call.

On Android, due to memory constraints on low-end devices, it's possible that, if your app launches a new activity, your app will be terminated by the operating system in order to reduce memory consumption.

For example, that means the Camera API, which launches a new Activity to take a photo, may not be able to return data back to your app.

To avoid this, Capacitor stores all restored activity results on launch. You should add a listener for `appRestoredResult` in order to handle any plugin call results that were delivered when your app was not running.

Once you have that result (if any), you can update the UI to restore a logical experience for the user, such as navigating or selecting the proper tab.

We recommend every Android app using plugins that rely on external Activities (for example, Camera) to have this event and process handled.

| Param | Type |
| --- | --- |
| **`eventName`** | `'appRestoredResult'` |
| **`listenerFunc`** |
```
RestoredListener
```

 |

**Returns:**

```
Promise<PluginListenerHandle>
```

**Since:** 1.0.0

* * *

### addListener('backButton', ...)[​](#addlistenerbackbutton- "Direct link to addListener('backButton', ...)")

```
addListener(eventName: 'backButton', listenerFunc: BackButtonListener) => Promise<PluginListenerHandle>
```

Listen for the hardware back button event (Android only). Listening for this event will disable the default back button behaviour, so you might want to call `window.history.back()` manually. If you want to close the app, call `App.exitApp()`.

| Param | Type |
| --- | --- |
| **`eventName`** | `'backButton'` |
| **`listenerFunc`** |
```
BackButtonListener
```

 |

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

Remove all native listeners for this plugin

**Since:** 1.0.0

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### AppInfo[​](#appinfo "Direct link to AppInfo")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`name`** | `string` | The name of the app. | 1.0.0 |
| **`id`** | `string` | The identifier of the app. On iOS it's the Bundle Identifier. On Android it's the Application ID | 1.0.0 |
| **`build`** | `string` | The build version. On iOS it's the CFBundleVersion. On Android it's the versionCode. | 1.0.0 |
| **`version`** | `string` | The app version. On iOS it's the CFBundleShortVersionString. On Android it's package's versionName. | 1.0.0 |

#### AppState[​](#appstate "Direct link to AppState")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`isActive`** | `boolean` | Whether the app is active or not. | 1.0.0 |

#### AppLaunchUrl[​](#applaunchurl "Direct link to AppLaunchUrl")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`url`** | `string` | The url used to open the app. | 1.0.0 |

#### ToggleBackButtonHandlerOptions[​](#togglebackbuttonhandleroptions "Direct link to ToggleBackButtonHandlerOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`enabled`** | `boolean` | Indicates whether to enable or disable default back button handling. | 7.1.0 |

#### PluginListenerHandle[​](#pluginlistenerhandle "Direct link to PluginListenerHandle")

| Prop | Type |
| --- | --- |
| **`remove`** | `() => Promise<void>` |

#### URLOpenListenerEvent[​](#urlopenlistenerevent "Direct link to URLOpenListenerEvent")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`url`** | `string` | The URL the app was opened with. | 1.0.0 |
| **`iosSourceApplication`** | `any` | The source application opening the app (iOS only) [https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623128-sourceapplication](https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623128-sourceapplication) | 1.0.0 |
| **`iosOpenInPlace`** | `boolean` | Whether the app should open the passed document in-place or must copy it first. [https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623123-openinplace](https://developer.apple.com/documentation/uikit/uiapplicationopenurloptionskey/1623123-openinplace) | 1.0.0 |

#### RestoredListenerEvent[​](#restoredlistenerevent "Direct link to RestoredListenerEvent")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`pluginId`** | `string` | The pluginId this result corresponds to. For example, `Camera`. | 1.0.0 |
| **`methodName`** | `string` | The methodName this result corresponds to. For example, `getPhoto` | 1.0.0 |
| **`data`** | `any` | The result data passed from the plugin. This would be the result you'd expect from normally calling the plugin method. For example, `CameraPhoto` | 1.0.0 |
| **`success`** | `boolean` | Boolean indicating if the plugin call succeeded. | 1.0.0 |
| **`error`** | `{ message: string; }` | If the plugin call didn't succeed, it will contain the error message. | 1.0.0 |

#### BackButtonListenerEvent[​](#backbuttonlistenerevent "Direct link to BackButtonListenerEvent")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`canGoBack`** | `boolean` | Indicates whether the browser can go back in history. False when the history stack is on the first entry. | 1.0.0 |

### Type Aliases[​](#type-aliases "Direct link to Type Aliases")

#### StateChangeListener[​](#statechangelistener "Direct link to StateChangeListener")

```
(state: AppState): void
```

#### URLOpenListener[​](#urlopenlistener "Direct link to URLOpenListener")

```
(event: URLOpenListenerEvent): void
```

#### RestoredListener[​](#restoredlistener "Direct link to RestoredListener")

```
(event: RestoredListenerEvent): void
```

#### BackButtonListener[​](#backbuttonlistener "Direct link to BackButtonListener")

```
(event: BackButtonListenerEvent): void
```

## Contents

-   [Install](#install)
-   [iOS](#ios)
-   [Android](#android)
-   [Example](#example)
-   [Configuration](#configuration)
    -   [Examples](#examples)
-   [API](#api)
    -   [exitApp()](#exitapp)
    -   [getInfo()](#getinfo)
    -   [getState()](#getstate)
    -   [getLaunchUrl()](#getlaunchurl)
    -   [minimizeApp()](#minimizeapp)
    -   [toggleBackButtonHandler(...)](#togglebackbuttonhandler)
    -   [addListener('appStateChange', ...)](#addlistenerappstatechange-)
    -   [addListener('pause', ...)](#addlistenerpause-)
    -   [addListener('resume', ...)](#addlistenerresume-)
    -   [addListener('appUrlOpen', ...)](#addlistenerappurlopen-)
    -   [addListener('appRestoredResult', ...)](#addlistenerapprestoredresult-)
    -   [addListener('backButton', ...)](#addlistenerbackbutton-)
    -   [removeAllListeners()](#removealllisteners)
    -   [Interfaces](#interfaces)
    -   [Type Aliases](#type-aliases)

* * *
