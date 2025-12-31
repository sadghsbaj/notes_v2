Version: v8

On this page

# @capacitor/clipboard

The Clipboard API enables copy and pasting to/from the system clipboard.

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/clipboardnpx cap sync
```

## Example[​](#example "Direct link to Example")

```
import { Clipboard } from '@capacitor/clipboard';const writeToClipboard = async () => {  await Clipboard.write({    string: "Hello World!"  });};const checkClipboard = async () => {  const { type, value } = await Clipboard.read();  console.log(`Got ${type} from clipboard: ${value}`);};
```

## API[​](#api "Direct link to API")

-   [`write(...)`](#write)
-   [`read()`](#read)
-   [Interfaces](#interfaces)

### write(...)[​](#write "Direct link to write(...)")

```
write(options: WriteOptions) => Promise<void>
```

Write a value to the clipboard (the "copy" action)

| Param | Type |
| --- | --- |
| **`options`** |
```
WriteOptions
```

 |

**Since:** 1.0.0

* * *

### read()[​](#read "Direct link to read()")

```
read() => Promise<ReadResult>
```

Read a value from the clipboard (the "paste" action)

**Returns:**

```
Promise<ReadResult>
```

**Since:** 1.0.0

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### WriteOptions[​](#writeoptions "Direct link to WriteOptions")

Represents the data to be written to the clipboard.

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`string`** | `string` | Text value to copy. | 1.0.0 |
| **`image`** | `string` | Image in [Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) format to copy. | 1.0.0 |
| **`url`** | `string` | URL string to copy. | 1.0.0 |
| **`label`** | `string` | User visible label to accompany the copied data (Android Only). | 1.0.0 |

#### ReadResult[​](#readresult "Direct link to ReadResult")

Represents the data read from the clipboard.

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `string` | Data read from the clipboard. | 1.0.0 |
| **`type`** | `string` | Type of data in the clipboard. | 1.0.0 |
