Version: v8

On this page

# @capacitor/file-viewer

The FileViewer API provides mechanisms for opening files and previewing media. Not available on web.

The media preview methods are currently only supported on iOS. It uses a built-in player.

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/file-viewernpx cap sync
```

## Example[​](#example "Direct link to Example")

```
import { FileViewer } from "@capacitor/file-viewer";// can use a plugin like @capacitor/filesystem to get the full path to the fileconst openDocument = async () => {  await FileViewer.openDocumentFromLocalPath({    path: "path/to/file.pdf"  });};// ios-specificconst previewMedia = async () => {  await FileViewer.previewMediaContentFromUrl({    path: "https://url_hosting_media/file.mp4"  });}
```

## API[​](#api "Direct link to API")

-   [`openDocumentFromLocalPath(...)`](#opendocumentfromlocalpath)
-   [`openDocumentFromResources(...)`](#opendocumentfromresources)
-   [`openDocumentFromUrl(...)`](#opendocumentfromurl)
-   [`previewMediaContentFromLocalPath(...)`](#previewmediacontentfromlocalpath)
-   [`previewMediaContentFromResources(...)`](#previewmediacontentfromresources)
-   [`previewMediaContentFromUrl(...)`](#previewmediacontentfromurl)
-   [Interfaces](#interfaces)
-   [Type Aliases](#type-aliases)

For list of existing error codes, see [Errors](#errors).

File Viewer API

Only available in Native Android and iOS; not available for Web / PWAs.

### openDocumentFromLocalPath(...)[​](#opendocumentfromlocalpath "Direct link to openDocumentFromLocalPath(...)")

```
openDocumentFromLocalPath(options: OpenFromLocalPathOptions) => Promise<void>
```

Open a file stored in the local file system

| Param | Type |
| --- | --- |
| **`options`** |
```
OpenFromLocalPathOptions
```

 |

**Since:** 1.0.0

* * *

### openDocumentFromResources(...)[​](#opendocumentfromresources "Direct link to openDocumentFromResources(...)")

```
openDocumentFromResources(options: OpenFromResourcesOptions) => Promise<void>
```

Open an app resource file

| Param | Type |
| --- | --- |
| **`options`** |
```
OpenFromResourcesOptions
```

 |

**Since:** 1.0.0

* * *

### openDocumentFromUrl(...)[​](#opendocumentfromurl "Direct link to openDocumentFromUrl(...)")

```
openDocumentFromUrl(options: OpenFromUrlOptions) => Promise<void>
```

Open a file from a remote url

| Param | Type |
| --- | --- |
| **`options`** |
```
OpenFromUrlOptions
```

 |

**Since:** 1.0.0

* * *

### previewMediaContentFromLocalPath(...)[​](#previewmediacontentfromlocalpath "Direct link to previewMediaContentFromLocalPath(...)")

```
previewMediaContentFromLocalPath(options: PreviewMediaFromLocalPathOptions) => Promise<void>
```

Preview a media file (namely, video) stored in the local file system. Only implemented in iOS. Android defaults to `openDocumentFromLocalPath`.

| Param | Type |
| --- | --- |
| **`options`** |
```
OpenFromLocalPathOptions
```

 |

**Since:** 1.0.0

* * *

### previewMediaContentFromResources(...)[​](#previewmediacontentfromresources "Direct link to previewMediaContentFromResources(...)")

```
previewMediaContentFromResources(options: PreviewMediaFromResourcesOptions) => Promise<void>
```

Preview a media file (namely, video) from the app's resources. Only implemented in iOS. Android defaults to `openDocumentFromResources`.

| Param | Type |
| --- | --- |
| **`options`** |
```
OpenFromResourcesOptions
```

 |

**Since:** 1.0.0

* * *

### previewMediaContentFromUrl(...)[​](#previewmediacontentfromurl "Direct link to previewMediaContentFromUrl(...)")

```
previewMediaContentFromUrl(options: PreviewMediaFromUrlOptions) => Promise<void>
```

Preview a media file (namely, video) from a remote url. Only implemented in iOS. Android defaults to `openDocumentFromUrl`.

| Param | Type |
| --- | --- |
| **`options`** |
```
OpenFromUrlOptions
```

 |

**Since:** 1.0.0

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### OpenFromLocalPathOptions[​](#openfromlocalpathoptions "Direct link to OpenFromLocalPathOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`path`** | `string` | The full absolute path to the file to open | 1.0.0 |

#### OpenFromResourcesOptions[​](#openfromresourcesoptions "Direct link to OpenFromResourcesOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`path`** | `string` | The relative path to the resource file to open | 1.0.0 |

#### OpenFromUrlOptions[​](#openfromurloptions "Direct link to OpenFromUrlOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`url`** | `string` | The remote url pointing to the file to open | 1.0.0 |

### Type Aliases[​](#type-aliases "Direct link to Type Aliases")

#### PreviewMediaFromLocalPathOptions[​](#previewmediafromlocalpathoptions "Direct link to PreviewMediaFromLocalPathOptions")

```
OpenFromLocalPathOptions
```

#### PreviewMediaFromResourcesOptions[​](#previewmediafromresourcesoptions "Direct link to PreviewMediaFromResourcesOptions")

```
OpenFromResourcesOptions
```

#### PreviewMediaFromUrlOptions[​](#previewmediafromurloptions "Direct link to PreviewMediaFromUrlOptions")

```
OpenFromUrlOptions
```

### Errors[​](#errors "Direct link to Errors")

The plugin returns the following errors with specific codes on native Android and iOS:

| Error code | Platform(s) | Message |
| --- | --- | --- |
| OS-PLUG-FLVW-0004 | Android, iOS | The file you are trying to open does not exist. |
| OS-PLUG-FLVW-0005 | Android, iOS | The URL you are trying to open is malformed. |
| OS-PLUG-FLVW-0006 | Android, iOS | Path of the file to open is either null or empty. |
| OS-PLUG-FLVW-0007 | Android, iOS | URL to open is either null or empty. |
| OS-PLUG-FLVW-0008 | Android, iOS | Could not open the file. |
| OS-PLUG-FLVW-0009 | Android, iOS | Invalid parameters. |
| OS-PLUG-FLVW-0010 | Android | There is no app to open this file. |
| OS-PLUG-FLVW-0011 | iOS | Cordova / Capacitor bridge isn’t initialized. |
| OS-PLUG-FLVW-0012 | iOS | The download failed. |
| OS-PLUG-FLVW-0013 | iOS | The file has no extension. |
