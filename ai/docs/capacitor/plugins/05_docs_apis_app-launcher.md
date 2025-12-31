Version: v8

On this page

# @capacitor/app-launcher

The AppLauncher API allows your app to check if an app can be opened and open it.

On iOS you can only open apps if you know their url scheme.

On Android you can open apps if you know their url scheme or use their public package name.

**Note:** On [Android 11](https://developer.android.com/about/versions/11/privacy/package-visibility) and newer you have to add the app package names you want to query in the `AndroidManifest.xml` inside the `queries` tag.

Example:

```
<queries>  <package android:name="com.getcapacitor.myapp" /></queries>
```

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/app-launchernpx cap sync
```

## Example[​](#example "Direct link to Example")

```
import { AppLauncher } from '@capacitor/app-launcher';const checkCanOpenUrl = async () => {  const { value } = await AppLauncher.canOpenUrl({ url: 'com.getcapacitor.myapp' });  console.log('Can open url: ', value);};const openPortfolioPage = async () => {  await AppLauncher.openUrl({ url: 'com.getcapacitor.myapp://page?id=portfolio' });};
```

## API[​](#api "Direct link to API")

-   [`canOpenUrl(...)`](#canopenurl)
-   [`openUrl(...)`](#openurl)
-   [Interfaces](#interfaces)

### canOpenUrl(...)[​](#canopenurl "Direct link to canOpenUrl(...)")

```
canOpenUrl(options: CanOpenURLOptions) => Promise<CanOpenURLResult>
```

Check if an app can be opened with the given URL.

On iOS you must declare the URL schemes you pass to this method by adding the `LSApplicationQueriesSchemes` key to your app's `Info.plist` file. Learn more about configuring [`Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist).

This method always returns false for undeclared schemes, whether or not an appropriate app is installed. To learn more about the key, see [LSApplicationQueriesSchemes](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/LaunchServicesKeys.html#//apple_ref/doc/plist/info/LSApplicationQueriesSchemes).

| Param | Type |
| --- | --- |
| **`options`** |
```
CanOpenURLOptions
```

 |

**Returns:**

```
Promise<CanOpenURLResult>
```

**Since:** 1.0.0

* * *

### openUrl(...)[​](#openurl "Direct link to openUrl(...)")

```
openUrl(options: OpenURLOptions) => Promise<OpenURLResult>
```

Open an app with the given URL. On iOS the URL should be a known URLScheme. On Android the URL can be a known URLScheme or an app package name.

| Param | Type |
| --- | --- |
| **`options`** |
```
OpenURLOptions
```

 |

**Returns:**

```
Promise<OpenURLResult>
```

**Since:** 1.0.0

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### CanOpenURLResult[​](#canopenurlresult "Direct link to CanOpenURLResult")

| Prop | Type |
| --- | --- |
| **`value`** | `boolean` |

#### CanOpenURLOptions[​](#canopenurloptions "Direct link to CanOpenURLOptions")

| Prop | Type |
| --- | --- |
| **`url`** | `string` |

#### OpenURLResult[​](#openurlresult "Direct link to OpenURLResult")

| Prop | Type |
| --- | --- |
| **`completed`** | `boolean` |

#### OpenURLOptions[​](#openurloptions "Direct link to OpenURLOptions")

| Prop | Type |
| --- | --- |
| **`url`** | `string` |
