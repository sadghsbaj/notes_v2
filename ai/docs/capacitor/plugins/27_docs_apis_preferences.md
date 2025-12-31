Version: v8

On this page

# @capacitor/preferences

The Preferences API provides a simple key/value persistent store for lightweight data.

Mobile OSs may periodically clear data set in `window.localStorage`, so this API should be used instead. This API will fall back to using `localStorage` when running as a Progressive Web App.

This plugin will use [`UserDefaults`](https://developer.apple.com/documentation/foundation/userdefaults) on iOS and [`SharedPreferences`](https://developer.android.com/reference/android/content/SharedPreferences) on Android. Stored data is cleared if the app is uninstalled.

**Note**: This API is _not_ meant to be used as a local database. If your app stores a lot of data, has high read/write load, or requires complex querying, we recommend taking a look at a SQLite-based solution. One such solution is [Ionic Secure Storage](https://ionic.io/docs/secure-storage), a SQLite-based engine with full encryption support. The [Capacitor Community](https://github.com/capacitor-community/) has also built a number of other storage engines.

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/preferencesnpx cap sync
```

## Apple Privacy Manifest Requirements[​](#apple-privacy-manifest-requirements "Direct link to Apple Privacy Manifest Requirements")

Apple mandates that app developers now specify approved reasons for API usage to enhance user privacy. By May 1st, 2024, it's required to include these reasons when submitting apps to the App Store Connect.

When using this specific plugin in your app, you must create a `PrivacyInfo.xcprivacy` file in `/ios/App` or use the VS Code Extension to generate it, specifying the usage reasons.

For detailed steps on how to do this, please see the [Capacitor Docs](https://capacitorjs.com/docs/ios/privacy-manifest).

**For this plugin, the required dictionary key is [NSPrivacyAccessedAPICategoryUserDefaults](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278401) and the recommended reason is [CA92.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278401).**

### Example PrivacyInfo.xcprivacy[​](#example-privacyinfoxcprivacy "Direct link to Example PrivacyInfo.xcprivacy")

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0">  <dict>    <key>NSPrivacyAccessedAPITypes</key>    <array>      <!-- Add this dict entry to the array if the PrivacyInfo file already exists -->      <dict>        <key>NSPrivacyAccessedAPIType</key>        <string>NSPrivacyAccessedAPICategoryUserDefaults</string>        <key>NSPrivacyAccessedAPITypeReasons</key>        <array>          <string>CA92.1</string>        </array>      </dict>    </array>  </dict></plist>
```

## Example Plugin Usage[​](#example-plugin-usage "Direct link to Example Plugin Usage")

```
import { Preferences } from '@capacitor/preferences';const setName = async () => {  await Preferences.set({    key: 'name',    value: 'Max',  });};const checkName = async () => {  const { value } = await Preferences.get({ key: 'name' });  console.log(`Hello ${value}!`);};const removeName = async () => {  await Preferences.remove({ key: 'name' });};
```

## Working with JSON[​](#working-with-json "Direct link to Working with JSON")

The Preferences API only supports string values. You can, however, use JSON if you `JSON.stringify` the object before calling `set()`, then `JSON.parse` the value returned from `get()`.

This method can also be used to store non-string values, such as numbers and booleans.

## API[​](#api "Direct link to API")

-   [`configure(...)`](#configure)
-   [`get(...)`](#get)
-   [`set(...)`](#set)
-   [`remove(...)`](#remove)
-   [`clear()`](#clear)
-   [`keys()`](#keys)
-   [`migrate()`](#migrate)
-   [`removeOld()`](#removeold)
-   [Interfaces](#interfaces)

### configure(...)[​](#configure "Direct link to configure(...)")

```
configure(options: ConfigureOptions) => Promise<void>
```

Configure the preferences plugin at runtime.

Options that are `undefined` will not be used.

| Param | Type |
| --- | --- |
| **`options`** |
```
ConfigureOptions
```

 |

**Since:** 1.0.0

* * *

### get(...)[​](#get "Direct link to get(...)")

```
get(options: GetOptions) => Promise<GetResult>
```

Get the value from preferences of a given key.

| Param | Type |
| --- | --- |
| **`options`** |
```
GetOptions
```

 |

**Returns:**

```
Promise<GetResult>
```

**Since:** 1.0.0

* * *

### set(...)[​](#set "Direct link to set(...)")

```
set(options: SetOptions) => Promise<void>
```

Set the value in preferences for a given key.

| Param | Type |
| --- | --- |
| **`options`** |
```
SetOptions
```

 |

**Since:** 1.0.0

* * *

### remove(...)[​](#remove "Direct link to remove(...)")

```
remove(options: RemoveOptions) => Promise<void>
```

Remove the value from preferences for a given key, if any.

| Param | Type |
| --- | --- |
| **`options`** |
```
RemoveOptions
```

 |

**Since:** 1.0.0

* * *

### clear()[​](#clear "Direct link to clear()")

```
clear() => Promise<void>
```

Clear keys and values from preferences.

**Since:** 1.0.0

* * *

### keys()[​](#keys "Direct link to keys()")

```
keys() => Promise<KeysResult>
```

Return the list of known keys in preferences.

**Returns:**

```
Promise<KeysResult>
```

**Since:** 1.0.0

* * *

### migrate()[​](#migrate "Direct link to migrate()")

```
migrate() => Promise<MigrateResult>
```

Migrate data from the Capacitor 2 Storage plugin.

This action is non-destructive. It will not remove old data and will only write new data if they key was not already set. To remove the old data after being migrated, call removeOld().

**Returns:**

```
Promise<MigrateResult>
```

**Since:** 1.0.0

* * *

### removeOld()[​](#removeold "Direct link to removeOld()")

```
removeOld() => Promise<void>
```

Removes old data with `_cap_` prefix from the Capacitor 2 Storage plugin.

**Since:** 1.1.0

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### ConfigureOptions[​](#configureoptions "Direct link to ConfigureOptions")

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`group`** | `string` | Set the preferences group. Preferences groups are used to organize key/value pairs. Using the value 'NativeStorage' provides backwards-compatibility with [`cordova-plugin-nativestorage`](https://www.npmjs.com/package/cordova-plugin-nativestorage). WARNING: The `clear()` method can delete unintended values when using the 'NativeStorage' group. | `CapacitorStorage` | 1.0.0 |

#### GetResult[​](#getresult "Direct link to GetResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `string | null` | The value from preferences associated with the given key. If a value was not previously set or was removed, value will be `null`. | 1.0.0 |

#### GetOptions[​](#getoptions "Direct link to GetOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`key`** | `string` | The key whose value to retrieve from preferences. | 1.0.0 |

#### SetOptions[​](#setoptions "Direct link to SetOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`key`** | `string` | The key to associate with the value being set in preferences. | 1.0.0 |
| **`value`** | `string` | The value to set in preferences with the associated key. | 1.0.0 |

#### RemoveOptions[​](#removeoptions "Direct link to RemoveOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`key`** | `string` | The key whose value to remove from preferences. | 1.0.0 |

#### KeysResult[​](#keysresult "Direct link to KeysResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`keys`** | `string[]` | The known keys in preferences. | 1.0.0 |

#### MigrateResult[​](#migrateresult "Direct link to MigrateResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`migrated`** | `string[]` | An array of keys that were migrated. | 1.0.0 |
| **`existing`** | `string[]` | An array of keys that were already migrated or otherwise exist in preferences that had a value in the Capacitor 2 Preferences plugin. | 1.0.0 |
