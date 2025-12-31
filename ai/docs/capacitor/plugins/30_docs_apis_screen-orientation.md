Version: v8

On this page

# @capacitor/screen-orientation

The Screen Orientation API provides information and functionality related to the orientation of the screen.

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/screen-orientationnpx cap sync
```

## iOS[​](#ios "Direct link to iOS")

Locking the Screen Orientation only works for the Capacitor View Controller only, but not other View Controllers being presented (such as the one presented by Browser plugin). For also lock presented View Controllers, this code can be added to the app's `AppDelegate.swift` file:

```
func application(_ application: UIApplication, supportedInterfaceOrientationsFor window: UIWindow?) -> UIInterfaceOrientationMask {  return UIInterfaceOrientationMask(rawValue: (self.window!.rootViewController as! CAPBridgeViewController).supportedInterfaceOrientations.rawValue)}
```

### iPad Orientation Lock[​](#ipad-orientation-lock "Direct link to iPad Orientation Lock")

By default, an iPad allows Multitasking and its orientation cannot be locked. If you need to lock orientation on an iPad set the option `Requires Full Screen` to `YES` by adding the following to `Info.plist`:

```
  <key>UIRequiresFullScreen</key>  <true/>
```

## API[​](#api "Direct link to API")

-   [`orientation()`](#orientation)
-   [`lock(...)`](#lock)
-   [`unlock()`](#unlock)
-   [`addListener('screenOrientationChange', ...)`](#addlistenerscreenorientationchange-)
-   [`removeAllListeners()`](#removealllisteners)
-   [Interfaces](#interfaces)
-   [Type Aliases](#type-aliases)

### orientation()[​](#orientation "Direct link to orientation()")

```
orientation() => Promise<ScreenOrientationResult>
```

Returns the current screen orientation.

**Returns:**

```
Promise<ScreenOrientationResult>
```

**Since:** 4.0.0

* * *

### lock(...)[​](#lock "Direct link to lock(...)")

```
lock(options: OrientationLockOptions) => Promise<void>
```

Locks the screen orientation.

Starting in Android targetSdk 36, this method has no effect for large screens (e.g. tablets) on Android 16 and higher. You may opt-out of this behavior in your app by adding `&lt;property android:name="android.window.PROPERTY_COMPAT_ALLOW_RESTRICTED_RESIZABILITY" android:value="true" /&gt;` to your `AndroidManifest.xml` inside `&lt;application&gt;` or `&lt;activity&gt;`. Keep in mind though that this opt-out is temporary and will no longer work for Android 17. Android discourages setting specific orientations for large screens. Regular Android phones are unaffected by this change. For more information check the Android docs at [https://developer.android.com/about/versions/16/behavior-changes-16#adaptive-layouts](https://developer.android.com/about/versions/16/behavior-changes-16#adaptive-layouts)

| Param | Type |
| --- | --- |
| **`options`** |
```
OrientationLockOptions
```

 |

**Since:** 4.0.0

* * *

### unlock()[​](#unlock "Direct link to unlock()")

```
unlock() => Promise<void>
```

Unlocks the screen's orientation.

**Since:** 4.0.0

* * *

### addListener('screenOrientationChange', ...)[​](#addlistenerscreenorientationchange- "Direct link to addListener('screenOrientationChange', ...)")

```
addListener(eventName: 'screenOrientationChange', listenerFunc: (orientation: ScreenOrientationResult) => void) => Promise<PluginListenerHandle>
```

Listens for screen orientation changes.

| Param | Type |
| --- | --- |
| **`eventName`** | `'screenOrientationChange'` |
| **`listenerFunc`** |
```
(orientation: ScreenOrientationResult) => void
```

 |

**Returns:**

```
Promise<PluginListenerHandle>
```

**Since:** 4.0.0

* * *

### removeAllListeners()[​](#removealllisteners "Direct link to removeAllListeners()")

```
removeAllListeners() => Promise<void>
```

Removes all listeners.

**Since:** 4.0.0

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### ScreenOrientationResult[​](#screenorientationresult "Direct link to ScreenOrientationResult")

| Prop | Type |
| --- | --- |
| **`type`** | `OrientationType` |

#### OrientationLockOptions[​](#orientationlockoptions "Direct link to OrientationLockOptions")

| Prop | Type | Description |
| --- | --- | --- |
| **`orientation`** |
```
OrientationLockType
```

 | Note: Typescript v5.2+ users should import [OrientationLockType](#orientationlocktype) from @capacitor/screen-orientation. |

#### PluginListenerHandle[​](#pluginlistenerhandle "Direct link to PluginListenerHandle")

| Prop | Type |
| --- | --- |
| **`remove`** | `() => Promise<void>` |

### Type Aliases[​](#type-aliases "Direct link to Type Aliases")

#### OrientationLockType[​](#orientationlocktype "Direct link to OrientationLockType")

`'any' | 'natural' | 'landscape' | 'portrait' | 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary'`
