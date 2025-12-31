Version: v8

On this page

# @capacitor/share

The Share API provides methods for sharing content in any sharing-enabled apps the user may have installed.

The Share API works on iOS, Android, and the Web (using the new [Web Share API](https://web.dev/web-share/)), though web support is currently spotty.

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/sharenpx cap sync
```

## Android[​](#android "Direct link to Android")

By default, Capacitor apps only allow to share files from caches folder. To make other Android folders shareable, they have to be added in `android/app/src/main/res/xml/file_paths.xml` file. Check the Specifying Available Files section in [FileProvider docs](https://developer.android.com/reference/androidx/core/content/FileProvider) for the available locations.

## Example[​](#example "Direct link to Example")

```
import { Share } from '@capacitor/share';await Share.share({  title: 'See cool stuff',  text: 'Really awesome thing you need to see right meow',  url: 'http://ionicframework.com/',  dialogTitle: 'Share with buddies',});// Share text onlyawait Share.share({  text: 'Really awesome thing you need to see right meow',});// Share url onlyawait Share.share({  url: 'http://ionicframework.com/',});// Share local file using url parameterconst photo = await Camera.getPhoto(options);await Share.share({  url: photo.path,});// Share multiple files using files parameterconst { photos } = await Camera.pickImages(options);await Share.share({  files: photos.map(photo => photo.path!),});
```

Each platform uses a different set of fields, but you should supply them all.

## API[​](#api "Direct link to API")

-   [`canShare()`](#canshare)
-   [`share(...)`](#share)
-   [Interfaces](#interfaces)

### canShare()[​](#canshare "Direct link to canShare()")

```
canShare() => Promise<CanShareResult>
```

Check if sharing is supported.

**Returns:**

```
Promise<CanShareResult>
```

**Since:** 1.1.0

* * *

### share(...)[​](#share "Direct link to share(...)")

```
share(options: ShareOptions) => Promise<ShareResult>
```

Show a Share modal for sharing content with other apps

| Param | Type |
| --- | --- |
| **`options`** |
```
ShareOptions
```

 |

**Returns:**

```
Promise<ShareResult>
```

**Since:** 1.0.0

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### CanShareResult[​](#canshareresult "Direct link to CanShareResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `boolean` | Whether sharing is supported or not. | 1.1.0 |

#### ShareResult[​](#shareresult "Direct link to ShareResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`activityType`** | `string` | Identifier of the app that received the share action. Can be an empty string in some cases. On web it will be undefined. | 1.0.0 |

#### ShareOptions[​](#shareoptions "Direct link to ShareOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`title`** | `string` | Set a title for any message. This will be the subject if sharing to email | 1.0.0 |
| **`text`** | `string` | Set some text to share | 1.0.0 |
| **`url`** | `string` | Set a URL to share, can be http, https or file:// URL | 1.0.0 |
| **`files`** | `string[]` | Array of file:// URLs of the files to be shared. Only supported on iOS and Android. | 4.1.0 |
| **`dialogTitle`** | `string` | Set a title for the share modal. This option is only supported on Android. | 1.0.0 |
