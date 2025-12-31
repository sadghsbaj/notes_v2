Version: v8

On this page

# @capacitor/filesystem

The Filesystem API provides a NodeJS-like API for working with files on the device.

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/filesystemnpx cap sync
```

## Apple Privacy Manifest Requirements[​](#apple-privacy-manifest-requirements "Direct link to Apple Privacy Manifest Requirements")

Apple mandates that app developers now specify approved reasons for API usage to enhance user privacy. By May 1st, 2024, it's required to include these reasons when submitting apps to the App Store Connect.

When using this specific plugin in your app, you must create a `PrivacyInfo.xcprivacy` file in `/ios/App` or use the VS Code Extension to generate it, specifying the usage reasons.

For detailed steps on how to do this, please see the [Capacitor Docs](https://capacitorjs.com/docs/ios/privacy-manifest).

**For this plugin, the required dictionary key is [NSPrivacyAccessedAPICategoryFileTimestamp](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393) and the recommended reason is [C617.1](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api#4278393).**

### Example PrivacyInfo.xcprivacy[​](#example-privacyinfoxcprivacy "Direct link to Example PrivacyInfo.xcprivacy")

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0">  <dict>    <key>NSPrivacyAccessedAPITypes</key>    <array>      <!-- Add this dict entry to the array if the PrivacyInfo file already exists -->      <dict>        <key>NSPrivacyAccessedAPIType</key>        <string>NSPrivacyAccessedAPICategoryFileTimestamp</string>        <key>NSPrivacyAccessedAPITypeReasons</key>        <array>          <string>C617.1</string>        </array>      </dict>    </array>  </dict></plist>
```

## Migrating from downloadFile to File Transfer plugin[​](#migrating-from-downloadfile-to-file-transfer-plugin "Direct link to Migrating from downloadFile to File Transfer plugin")

As of version 7.1.0, the `downloadFile` functionality in the Filesystem plugin has been deprecated in favor of the new [@capacitor/file-transfer](https://capacitorjs.com/docs/apis/file-transfer) plugin.

### Installing the File Transfer plugin[​](#installing-the-file-transfer-plugin "Direct link to Installing the File Transfer plugin")

```
npm install @capacitor/file-transfernpx cap sync
```

### Migration example[​](#migration-example "Direct link to Migration example")

Before (using Filesystem plugin):

```
import { Filesystem, Directory } from '@capacitor/filesystem';await Filesystem.downloadFile({  url: 'https://example.com/file.pdf',  path: 'downloaded-file.pdf',  directory: Directory.Documents,  progress: true});// Progress eventsFilesystem.addListener('progress', (progress) => {  console.log(`Downloaded ${progress.bytes} of ${progress.contentLength}`);});
```

After (using File Transfer plugin):

```
import { FileTransfer } from '@capacitor/file-transfer';import { Filesystem, Directory } from '@capacitor/filesystem';// First get the full file path using Filesystemconst fileInfo = await Filesystem.getUri({  directory: Directory.Documents,  path: 'downloaded-file.pdf'});// Then use the FileTransfer plugin to downloadawait FileTransfer.downloadFile({  url: 'https://example.com/file.pdf',  path: fileInfo.uri,  progress: true});// Progress eventsFileTransfer.addListener('progress', (progress) => {  console.log(`Downloaded ${progress.bytes} of ${progress.contentLength}`);});
```

The File Transfer plugin offers improved reliability, better error handling with specific error codes, and also adds upload functionality.

## iOS[​](#ios "Direct link to iOS")

To have files appear in the Files app, you must also set the following keys to `YES` in `Info.plist`:

-   `UIFileSharingEnabled` (`Application supports iTunes file sharing`)
-   `LSSupportsOpeningDocumentsInPlace` (`Supports opening documents in place`)

Read about [Configuring iOS](https://capacitorjs.com/docs/ios/configuration) for help.

## Android[​](#android "Direct link to Android")

If using [`Directory.Documents`](#directory) or [`Directory.ExternalStorage`](#directory), in Android 10 and older, this API requires the following permissions be added to your `AndroidManifest.xml`:

```
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/><uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

Read about [Setting Permissions](https://capacitorjs.com/docs/android/configuration#setting-permissions) in the [Android Guide](https://capacitorjs.com/docs/android) for more information on setting Android permissions.

Note that [`Directory.ExternalStorage`](#directory) is only available on Android 9 or older and [`Directory.Documents`](#directory) only allows to access the files/folders created by your app on Android on Android 11 and newer.

Working with large files may require you to add `android:largeHeap="true"` to the `<application>` tag in `AndroidManifest.xml`.

## Understanding Directories and Files[​](#understanding-directories-and-files "Direct link to Understanding Directories and Files")

iOS and Android have additional layers of separation between files, such as special directories that are backed up to the Cloud, or ones for storing Documents. The Filesystem API offers a simple way to scope each operation to a specific special directory on the device.

Additionally, the Filesystem API supports using full `file://` paths, or reading `content://` files on Android. Simply leave out the `directory` param to use a full file path.

## Example[​](#example "Direct link to Example")

```
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";const writeSecretFile = async () => {  await Filesystem.writeFile({    path: "secrets/text.txt",    data: "This is a test",    directory: Directory.Documents,    encoding: Encoding.UTF8,  });};const readSecretFile = async () => {  const contents = await Filesystem.readFile({    path: "secrets/text.txt",    directory: Directory.Documents,    encoding: Encoding.UTF8,  });  console.log("secrets:", contents);};const deleteSecretFile = async () => {  await Filesystem.deleteFile({    path: "secrets/text.txt",    directory: Directory.Documents,  });};const readFilePath = async () => {  // Here's an example of reading a file with a full file path. Use this to  // read binary data (base64 encoded) from plugins that return File URIs, such as  // the Camera.  const contents = await Filesystem.readFile({    path: "file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt",  });  console.log("data:", contents);};
```

## API[​](#api "Direct link to API")

-   [`checkPermissions()`](#checkpermissions)
-   [`requestPermissions()`](#requestpermissions)
-   [`readFile(...)`](#readfile)
-   [`readFileInChunks(...)`](#readfileinchunks)
-   [`writeFile(...)`](#writefile)
-   [`appendFile(...)`](#appendfile)
-   [`deleteFile(...)`](#deletefile)
-   [`mkdir(...)`](#mkdir)
-   [`rmdir(...)`](#rmdir)
-   [`readdir(...)`](#readdir)
-   [`getUri(...)`](#geturi)
-   [`stat(...)`](#stat)
-   [`rename(...)`](#rename)
-   [`copy(...)`](#copy)
-   [`downloadFile(...)`](#downloadfile)
-   [`addListener('progress', ...)`](#addlistenerprogress-)
-   [`removeAllListeners()`](#removealllisteners)
-   [Interfaces](#interfaces)
-   [Type Aliases](#type-aliases)
-   [Enums](#enums)

For list of existing error codes, see [Errors](#errors).

### checkPermissions()[​](#checkpermissions "Direct link to checkPermissions()")

```
checkPermissions() => Promise<PermissionStatus>
```

Check read/write permissions. Required on Android, only when using [`Directory.Documents`](#directory) or `Directory.ExternalStorage`.

**Returns:**

```
Promise<PermissionStatus>
```

**Since:** 1.0.0

* * *

### requestPermissions()[​](#requestpermissions "Direct link to requestPermissions()")

```
requestPermissions() => Promise<PermissionStatus>
```

Request read/write permissions. Required on Android, only when using [`Directory.Documents`](#directory) or `Directory.ExternalStorage`.

**Returns:**

```
Promise<PermissionStatus>
```

**Since:** 1.0.0

* * *

### readFile(...)[​](#readfile "Direct link to readFile(...)")

```
readFile(options: ReadFileOptions) => Promise<ReadFileResult>
```

Read a file from disk

| Param | Type |
| --- | --- |
| **`options`** |
```
ReadFileOptions
```

 |

**Returns:**

```
Promise<ReadFileResult>
```

**Since:** 1.0.0

* * *

### readFileInChunks(...)[​](#readfileinchunks "Direct link to readFileInChunks(...)")

```
readFileInChunks(options: ReadFileInChunksOptions, callback: ReadFileInChunksCallback) => Promise<CallbackID>
```

Read a file from disk, in chunks. Native only (not available in web). Use the callback to receive each read chunk. If empty chunk is returned, it means file has been completely read.

| Param | Type |
| --- | --- |
| **`options`** |
```
ReadFileInChunksOptions
```

 |
| **`callback`** |

```
ReadFileInChunksCallback
```

 |

**Returns:** `Promise<string>`

**Since:** 7.1.0

* * *

### writeFile(...)[​](#writefile "Direct link to writeFile(...)")

```
writeFile(options: WriteFileOptions) => Promise<WriteFileResult>
```

Write a file to disk in the specified location on device

| Param | Type |
| --- | --- |
| **`options`** |
```
WriteFileOptions
```

 |

**Returns:**

```
Promise<WriteFileResult>
```

**Since:** 1.0.0

* * *

### appendFile(...)[​](#appendfile "Direct link to appendFile(...)")

```
appendFile(options: AppendFileOptions) => Promise<void>
```

Append to a file on disk in the specified location on device

| Param | Type |
| --- | --- |
| **`options`** |
```
AppendFileOptions
```

 |

**Since:** 1.0.0

* * *

### deleteFile(...)[​](#deletefile "Direct link to deleteFile(...)")

```
deleteFile(options: DeleteFileOptions) => Promise<void>
```

Delete a file from disk

| Param | Type |
| --- | --- |
| **`options`** |
```
DeleteFileOptions
```

 |

**Since:** 1.0.0

* * *

### mkdir(...)[​](#mkdir "Direct link to mkdir(...)")

```
mkdir(options: MkdirOptions) => Promise<void>
```

Create a directory.

| Param | Type |
| --- | --- |
| **`options`** |
```
MkdirOptions
```

 |

**Since:** 1.0.0

* * *

### rmdir(...)[​](#rmdir "Direct link to rmdir(...)")

```
rmdir(options: RmdirOptions) => Promise<void>
```

Remove a directory

| Param | Type |
| --- | --- |
| **`options`** |
```
RmdirOptions
```

 |

**Since:** 1.0.0

* * *

### readdir(...)[​](#readdir "Direct link to readdir(...)")

```
readdir(options: ReaddirOptions) => Promise<ReaddirResult>
```

Return a list of files from the directory (not recursive)

| Param | Type |
| --- | --- |
| **`options`** |
```
ReaddirOptions
```

 |

**Returns:**

```
Promise<ReaddirResult>
```

**Since:** 1.0.0

* * *

### getUri(...)[​](#geturi "Direct link to getUri(...)")

```
getUri(options: GetUriOptions) => Promise<GetUriResult>
```

Return full File URI for a path and directory

| Param | Type |
| --- | --- |
| **`options`** |
```
GetUriOptions
```

 |

**Returns:**

```
Promise<GetUriResult>
```

**Since:** 1.0.0

* * *

### stat(...)[​](#stat "Direct link to stat(...)")

```
stat(options: StatOptions) => Promise<StatResult>
```

Return data about a file

| Param | Type |
| --- | --- |
| **`options`** |
```
StatOptions
```

 |

**Returns:**

```
Promise<FileInfo>
```

**Since:** 1.0.0

* * *

### rename(...)[​](#rename "Direct link to rename(...)")

```
rename(options: RenameOptions) => Promise<void>
```

Rename a file or directory

| Param | Type |
| --- | --- |
| **`options`** |
```
CopyOptions
```

 |

**Since:** 1.0.0

* * *

### copy(...)[​](#copy "Direct link to copy(...)")

```
copy(options: CopyOptions) => Promise<CopyResult>
```

Copy a file or directory

| Param | Type |
| --- | --- |
| **`options`** |
```
CopyOptions
```

 |

**Returns:**

```
Promise<CopyResult>
```

**Since:** 1.0.0

* * *

### downloadFile(...)[​](#downloadfile "Direct link to downloadFile(...)")

```
downloadFile(options: DownloadFileOptions) => Promise<DownloadFileResult>
```

Perform a http request to a server and download the file to the specified destination.

This method has been deprecated since version 7.1.0. We recommend using the @capacitor/file-transfer plugin instead, in conjunction with this plugin.

| Param | Type |
| --- | --- |
| **`options`** |
```
DownloadFileOptions
```

 |

**Returns:**

```
Promise<DownloadFileResult>
```

**Since:** 5.1.0

* * *

### addListener('progress', ...)[​](#addlistenerprogress- "Direct link to addListener('progress', ...)")

```
addListener(eventName: 'progress', listenerFunc: ProgressListener) => Promise<PluginListenerHandle>
```

Add a listener to file download progress events.

This method has been deprecated since version 7.1.0. We recommend using the @capacitor/file-transfer plugin instead, in conjunction with this plugin.

| Param | Type |
| --- | --- |
| **`eventName`** | `'progress'` |
| **`listenerFunc`** |
```
ProgressListener
```

 |

**Returns:**

```
Promise<PluginListenerHandle>
```

**Since:** 5.1.0

* * *

### removeAllListeners()[​](#removealllisteners "Direct link to removeAllListeners()")

```
removeAllListeners() => Promise<void>
```

Remove all listeners for this plugin.

This method has been deprecated since version 7.1.0. We recommend using the @capacitor/file-transfer plugin instead, in conjunction with this plugin.

**Since:** 5.2.0

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### PermissionStatus[​](#permissionstatus "Direct link to PermissionStatus")

| Prop | Type |
| --- | --- |
| **`publicStorage`** |
```
PermissionState
```

 |

#### ReadFileResult[​](#readfileresult "Direct link to ReadFileResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`data`** | `string | Blob` | The representation of the data contained in the file Note: Blob is only available on Web. On native, the data is returned as a string. | 1.0.0 |

#### ReadFileOptions[​](#readfileoptions "Direct link to ReadFileOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`path`** | `string` | The path of the file to read | 1.0.0 |
| **`directory`** |
```
Directory
```

 | The [`Directory`](#directory) to read the file from | 1.0.0 |
| **`encoding`** |

```
Encoding
```

 | The encoding to read the file in, if not provided, data is read as binary and returned as base64 encoded. Pass [Encoding.UTF8](#encoding) to read data as string | 1.0.0 |

#### ReadFileInChunksOptions[​](#readfileinchunksoptions "Direct link to ReadFileInChunksOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`chunkSize`** | `number` | Size of the chunks in bytes. | 7.1.0 |

#### WriteFileResult[​](#writefileresult "Direct link to WriteFileResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`uri`** | `string` | The uri where the file was written into | 1.0.0 |

#### WriteFileOptions[​](#writefileoptions "Direct link to WriteFileOptions")

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`path`** | `string` | The path of the file to write |  | 1.0.0 |
| **`data`** | `string | Blob` | The data to write Note: Blob data is only supported on Web. |  | 1.0.0 |
| **`directory`** |
```
Directory
```

 | The [`Directory`](#directory) to store the file in |  | 1.0.0 |
| **`encoding`** |

```
Encoding
```

 | The encoding to write the file in. If not provided, data is written as base64 encoded. Pass [Encoding.UTF8](#encoding) to write data as string |  | 1.0.0 |
| **`recursive`** | `boolean` | Whether to create any missing parent directories. | `false` | 1.0.0 |

#### AppendFileOptions[​](#appendfileoptions "Direct link to AppendFileOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`path`** | `string` | The path of the file to append | 1.0.0 |
| **`data`** | `string` | The data to write | 1.0.0 |
| **`directory`** |
```
Directory
```

 | The [`Directory`](#directory) to store the file in | 1.0.0 |
| **`encoding`** |

```
Encoding
```

 | The encoding to write the file in. If not provided, data is written as base64 encoded. Pass [Encoding.UTF8](#encoding) to write data as string | 1.0.0 |

#### DeleteFileOptions[​](#deletefileoptions "Direct link to DeleteFileOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`path`** | `string` | The path of the file to delete | 1.0.0 |
| **`directory`** |
```
Directory
```

 | The [`Directory`](#directory) to delete the file from | 1.0.0 |

#### MkdirOptions[​](#mkdiroptions "Direct link to MkdirOptions")

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`path`** | `string` | The path of the new directory |  | 1.0.0 |
| **`directory`** |
```
Directory
```

 | The [`Directory`](#directory) to make the new directory in |  | 1.0.0 |
| **`recursive`** | `boolean` | Whether to create any missing parent directories as well. | `false` | 1.0.0 |

#### RmdirOptions[​](#rmdiroptions "Direct link to RmdirOptions")

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`path`** | `string` | The path of the directory to remove |  | 1.0.0 |
| **`directory`** |
```
Directory
```

 | The [`Directory`](#directory) to remove the directory from |  | 1.0.0 |
| **`recursive`** | `boolean` | Whether to recursively remove the contents of the directory | `false` | 1.0.0 |

#### ReaddirResult[​](#readdirresult "Direct link to ReaddirResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`files`** | `FileInfo[]` | List of files and directories inside the directory | 1.0.0 |

#### FileInfo[​](#fileinfo "Direct link to FileInfo")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`name`** | `string` | Name of the file or directory. | 7.1.0 |
| **`type`** | `'file' | 'directory'` | Type of the file. | 4.0.0 |
| **`size`** | `number` | Size of the file in bytes. | 4.0.0 |
| **`ctime`** | `number` | Time of creation in milliseconds. It's not available on Android 7 and older devices. | 7.1.0 |
| **`mtime`** | `number` | Time of last modification in milliseconds. | 7.1.0 |
| **`uri`** | `string` | The uri of the file. | 4.0.0 |

#### ReaddirOptions[​](#readdiroptions "Direct link to ReaddirOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`path`** | `string` | The path of the directory to read | 1.0.0 |
| **`directory`** |
```
Directory
```

 | The [`Directory`](#directory) to list files from | 1.0.0 |

#### GetUriResult[​](#geturiresult "Direct link to GetUriResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`uri`** | `string` | The uri of the file | 1.0.0 |

#### GetUriOptions[​](#geturioptions "Direct link to GetUriOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`path`** | `string` | The path of the file to get the URI for | 1.0.0 |
| **`directory`** |
```
Directory
```

 | The [`Directory`](#directory) to get the file under | 1.0.0 |

#### StatOptions[​](#statoptions "Direct link to StatOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`path`** | `string` | The path of the file to get data about | 1.0.0 |
| **`directory`** |
```
Directory
```

 | The [`Directory`](#directory) to get the file under | 1.0.0 |

#### CopyOptions[​](#copyoptions "Direct link to CopyOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`from`** | `string` | The existing file or directory | 1.0.0 |
| **`to`** | `string` | The destination file or directory | 1.0.0 |
| **`directory`** |
```
Directory
```

 | The [`Directory`](#directory) containing the existing file or directory | 1.0.0 |
| **`toDirectory`** |

```
Directory
```

 | The [`Directory`](#directory) containing the destination file or directory. If not supplied will use the 'directory' parameter as the destination | 1.0.0 |

#### CopyResult[​](#copyresult "Direct link to CopyResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`uri`** | `string` | The uri where the file was copied into | 4.0.0 |

#### DownloadFileResult[​](#downloadfileresult "Direct link to DownloadFileResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`path`** | `string` | The path the file was downloaded to. | 5.1.0 |
| **`blob`** | `Blob` | The blob data of the downloaded file. This is only available on web. | 5.1.0 |

#### DownloadFileOptions[​](#downloadfileoptions "Direct link to DownloadFileOptions")

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`path`** | `string` | The path the downloaded file should be moved to. |  | 5.1.0 |
| **`directory`** |
```
Directory
```

 | The directory to write the file to. If this option is used, filePath can be a relative path rather than absolute. The default is the `DATA` directory. |  | 5.1.0 |
| **`progress`** | `boolean` | An optional listener function to receive downloaded progress events. If this option is used, progress event should be dispatched on every chunk received. Chunks are throttled to every 100ms on Android/iOS to avoid slowdowns. |  | 5.1.0 |
| **`recursive`** | `boolean` | Whether to create any missing parent directories. | `false` | 5.1.2 |

#### PluginListenerHandle[​](#pluginlistenerhandle "Direct link to PluginListenerHandle")

| Prop | Type |
| --- | --- |
| **`remove`** | `() => Promise<void>` |

#### ProgressStatus[​](#progressstatus "Direct link to ProgressStatus")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`url`** | `string` | The url of the file being downloaded. | 5.1.0 |
| **`bytes`** | `number` | The number of bytes downloaded so far. | 5.1.0 |
| **`contentLength`** | `number` | The total number of bytes to download for this file. | 5.1.0 |

### Type Aliases[​](#type-aliases "Direct link to Type Aliases")

#### PermissionState[​](#permissionstate "Direct link to PermissionState")

`'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'`

#### ReadFileInChunksCallback[​](#readfileinchunkscallback "Direct link to ReadFileInChunksCallback")

Callback for receiving chunks read from a file, or error if something went wrong.

```
(chunkRead: ReadFileResult | null, err?: any): void
```

#### CallbackID[​](#callbackid "Direct link to CallbackID")

`string`

#### StatResult[​](#statresult "Direct link to StatResult")

```
FileInfo
```

#### RenameOptions[​](#renameoptions "Direct link to RenameOptions")

```
CopyOptions
```

#### ProgressListener[​](#progresslistener "Direct link to ProgressListener")

A listener function that receives progress events.

```
(progress: ProgressStatus): void
```

### Enums[​](#enums "Direct link to Enums")

#### Directory[​](#directory "Direct link to Directory")

| Members | Value | Description | Since |
| --- | --- | --- | --- |
| **`Documents`** | `'DOCUMENTS'` | The Documents directory. On iOS it's the app's documents directory. Use this directory to store user-generated content. On Android it's the Public Documents folder, so it's accessible from other apps. It's not accessible on Android 10 unless the app enables legacy External Storage by adding `android:requestLegacyExternalStorage="true"` in the `application` tag in the `AndroidManifest.xml`. On Android 11 or newer the app can only access the files/folders the app created. | 1.0.0 |
| **`Data`** | `'DATA'` | The Data directory. On iOS it will use the Documents directory. On Android it's the directory holding application files. Files will be deleted when the application is uninstalled. | 1.0.0 |
| **`Library`** | `'LIBRARY'` | The Library directory. On iOS it will use the Library directory. On Android it's the directory holding application files. Files will be deleted when the application is uninstalled. | 1.1.0 |
| **`Cache`** | `'CACHE'` | The Cache directory. Can be deleted in cases of low memory, so use this directory to write app-specific files. that your app can re-create easily. | 1.0.0 |
| **`External`** | `'EXTERNAL'` | The external directory. On iOS it will use the Documents directory. On Android it's the directory on the primary shared/external storage device where the application can place persistent files it owns. These files are internal to the applications, and not typically visible to the user as media. Files will be deleted when the application is uninstalled. | 1.0.0 |
| **`ExternalStorage`** | `'EXTERNAL_STORAGE'` | The external storage directory. On iOS it will use the Documents directory. On Android it's the primary shared/external storage directory. It's not accessible on Android 10 unless the app enables legacy External Storage by adding `android:requestLegacyExternalStorage="true"` in the `application` tag in the `AndroidManifest.xml`. It's not accessible on Android 11 or newer. | 1.0.0 |
| **`ExternalCache`** | `'EXTERNAL_CACHE'` | The external cache directory. On iOS it will use the Documents directory. On Android it's the primary shared/external cache. | 7.1.0 |
| **`LibraryNoCloud`** | `'LIBRARY_NO_CLOUD'` | The Library directory without cloud backup. Used in iOS. On Android it's the directory holding application files. | 7.1.0 |
| **`Temporary`** | `'TEMPORARY'` | A temporary directory for iOS. On Android it's the directory holding the application cache. | 7.1.0 |

#### Encoding[​](#encoding "Direct link to Encoding")

| Members | Value | Description | Since |
| --- | --- | --- | --- |
| **`UTF8`** | `'utf8'` | Eight-bit UCS Transformation Format | 1.0.0 |
| **`ASCII`** | `'ascii'` | Seven-bit ASCII, a.k.a. ISO646-US, a.k.a. the Basic Latin block of the Unicode character set This encoding is only supported on Android. | 1.0.0 |
| **`UTF16`** | `'utf16'` | Sixteen-bit UCS Transformation Format, byte order identified by an optional byte-order mark This encoding is only supported on Android. | 1.0.0 |

### Errors[​](#errors "Direct link to Errors")

Since version 7.1.0, the plugin returns specific errors with specific codes on native Android and iOS. Web does not follow this standard for errors.

The following table list all the plugin errors:

| Error code | Platform(s) | Message |
| --- | --- | --- |
| OS-PLUG-FILE-0004 | iOS | Cordova / Capacitor bridge isn’t initialized. |
| OS-PLUG-FILE-0005 | Android, iOS | The method input parameters aren’t valid. |
| OS-PLUG-FILE-0006 | Android, iOS | Invalid path was provided. |
| OS-PLUG-FILE-0007 | Android | Unable to perform file operation, user denied permission request. |
| OS-PLUG-FILE-0008 | Android, iOS | Operation failed because file does not exist. |
| OS-PLUG-FILE-0009 | Android | Operation not supported for provided input. |
| OS-PLUG-FILE-0010 | Android, iOS | Directory already exists, cannot be overwritten. |
| OS-PLUG-FILE-0011 | Android, iOS | Missing parent directory – possibly recursive=false was passed or parent directory creation failed. |
| OS-PLUG-FILE-0012 | Android, iOS | Cannot delete directory with children; received recursive=false but directory has contents. |
| OS-PLUG-FILE-0013 | Android, iOS | The operation failed with an error. |

## Contents

-   [Install](#install)
-   [Apple Privacy Manifest Requirements](#apple-privacy-manifest-requirements)
    -   [Example PrivacyInfo.xcprivacy](#example-privacyinfoxcprivacy)
-   [Migrating from downloadFile to File Transfer plugin](#migrating-from-downloadfile-to-file-transfer-plugin)
    -   [Installing the File Transfer plugin](#installing-the-file-transfer-plugin)
    -   [Migration example](#migration-example)
-   [iOS](#ios)
-   [Android](#android)
-   [Understanding Directories and Files](#understanding-directories-and-files)
-   [Example](#example)
-   [API](#api)
    -   [checkPermissions()](#checkpermissions)
    -   [requestPermissions()](#requestpermissions)
    -   [readFile(...)](#readfile)
    -   [readFileInChunks(...)](#readfileinchunks)
    -   [writeFile(...)](#writefile)
    -   [appendFile(...)](#appendfile)
    -   [deleteFile(...)](#deletefile)
    -   [mkdir(...)](#mkdir)
    -   [rmdir(...)](#rmdir)
    -   [readdir(...)](#readdir)
    -   [getUri(...)](#geturi)
    -   [stat(...)](#stat)
    -   [rename(...)](#rename)
    -   [copy(...)](#copy)
    -   [downloadFile(...)](#downloadfile)
    -   [addListener('progress', ...)](#addlistenerprogress-)
    -   [removeAllListeners()](#removealllisteners)
    -   [Interfaces](#interfaces)
    -   [Type Aliases](#type-aliases)
    -   [Enums](#enums)
    -   [Errors](#errors)

* * *
