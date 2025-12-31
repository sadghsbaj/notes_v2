Version: v8

On this page

# @capacitor/device

The Device API exposes internal information about the device, such as the model and operating system version, along with user information such as unique ids.

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/devicenpx cap sync
```

## Example Plugin Usage[​](#example-plugin-usage "Direct link to Example Plugin Usage")

```
import { Device } from '@capacitor/device';const logDeviceInfo = async () => {  const info = await Device.getInfo();  console.log(info);};const logBatteryInfo = async () => {  const info = await Device.getBatteryInfo();  console.log(info);};
```

## API[​](#api "Direct link to API")

-   [`getId()`](#getid)
-   [`getInfo()`](#getinfo)
-   [`getBatteryInfo()`](#getbatteryinfo)
-   [`getLanguageCode()`](#getlanguagecode)
-   [`getLanguageTag()`](#getlanguagetag)
-   [Interfaces](#interfaces)
-   [Type Aliases](#type-aliases)

### getId()[​](#getid "Direct link to getId()")

```
getId() => Promise<DeviceId>
```

Return an unique identifier for the device.

**Returns:**

```
Promise<DeviceId>
```

**Since:** 1.0.0

* * *

### getInfo()[​](#getinfo "Direct link to getInfo()")

```
getInfo() => Promise<DeviceInfo>
```

Return information about the underlying device/os/platform.

**Returns:**

```
Promise<DeviceInfo>
```

**Since:** 1.0.0

* * *

### getBatteryInfo()[​](#getbatteryinfo "Direct link to getBatteryInfo()")

```
getBatteryInfo() => Promise<BatteryInfo>
```

Return information about the battery.

**Returns:**

```
Promise<BatteryInfo>
```

**Since:** 1.0.0

* * *

### getLanguageCode()[​](#getlanguagecode "Direct link to getLanguageCode()")

```
getLanguageCode() => Promise<GetLanguageCodeResult>
```

Get the device's current language locale code.

**Returns:**

```
Promise<GetLanguageCodeResult>
```

**Since:** 1.0.0

* * *

### getLanguageTag()[​](#getlanguagetag "Direct link to getLanguageTag()")

```
getLanguageTag() => Promise<LanguageTag>
```

Get the device's current language locale tag.

**Returns:**

```
Promise<LanguageTag>
```

**Since:** 4.0.0

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### DeviceId[​](#deviceid "Direct link to DeviceId")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`identifier`** | `string` | The identifier of the device as available to the app. This identifier may change on modern mobile platforms that only allow per-app install ids. On iOS, the identifier is a UUID that uniquely identifies a device to the app’s vendor ([read more](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor)). on Android 8+, **the identifier is a 64-bit number (expressed as a hexadecimal string)**, unique to each combination of app-signing key, user, and device ([read more](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID)). On web, a random identifier is generated and stored on localStorage for subsequent calls. If localStorage is not available a new random identifier will be generated on every call. | 1.0.0 |

#### DeviceInfo[​](#deviceinfo "Direct link to DeviceInfo")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`name`** | `string` | The name of the device. For example, "John's iPhone". This is only supported on iOS and Android 7.1 or above. On iOS 16+ this will return a generic device name without the appropriate [entitlements](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name). | 1.0.0 |
| **`model`** | `string` | The device model. For example, "iPhone13,4". | 1.0.0 |
| **`platform`** | `'ios' | 'android' | 'web'` | The device platform (lowercase). | 1.0.0 |
| **`operatingSystem`** |
```
OperatingSystem
```

 | The operating system of the device. | 1.0.0 |
| **`osVersion`** | `string` | The version of the device OS. | 1.0.0 |
| **`iOSVersion`** | `number` | The iOS version number. Only available on iOS. Multi-part version numbers are crushed down into an integer padded to two-digits, ex: `"16.3.1"` -> `160301` | 5.0.0 |
| **`androidSDKVersion`** | `number` | The Android SDK version number. Only available on Android. | 5.0.0 |
| **`manufacturer`** | `string` | The manufacturer of the device. | 1.0.0 |
| **`isVirtual`** | `boolean` | Whether the app is running in a simulator/emulator. | 1.0.0 |
| **`memUsed`** | `number` | Approximate memory used by the current app, in bytes. Divide by 1048576 to get the number of MBs used. | 1.0.0 |
| **`webViewVersion`** | `string` | The web view browser version | 1.0.0 |

#### BatteryInfo[​](#batteryinfo "Direct link to BatteryInfo")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`batteryLevel`** | `number` | A percentage (0 to 1) indicating how much the battery is charged. | 1.0.0 |
| **`isCharging`** | `boolean` | Whether the device is charging. | 1.0.0 |

#### GetLanguageCodeResult[​](#getlanguagecoderesult "Direct link to GetLanguageCodeResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `string` | Two character language code. | 1.0.0 |

#### LanguageTag[​](#languagetag "Direct link to LanguageTag")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `string` | Returns a well-formed IETF BCP 47 language tag. | 4.0.0 |

### Type Aliases[​](#type-aliases "Direct link to Type Aliases")

#### OperatingSystem[​](#operatingsystem "Direct link to OperatingSystem")

`'ios' | 'android' | 'windows' | 'mac' | 'unknown'`
