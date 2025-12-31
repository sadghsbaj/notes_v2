Version: v8

On this page

# @capacitor/text-zoom

The Text Zoom API provides the ability to change Web View text size for visual accessibility.

**Note:** text-zoom plugin won't work on iPads unless `preferredContentMode` configuration is set to `mobile` in your [Capacitor configuration file](https://capacitorjs.com/docs/config).

```
{  "ios": {    "preferredContentMode": "mobile"  }}
```

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/text-zoomnpx cap sync
```

## API[​](#api "Direct link to API")

-   [`get()`](#get)
-   [`getPreferred()`](#getpreferred)
-   [`set(...)`](#set)
-   [Interfaces](#interfaces)

### get()[​](#get "Direct link to get()")

```
get() => Promise<GetResult>
```

Get the current zoom level.

Zoom levels are represented as a decimal (e.g. 1.2 is 120%).

**Returns:**

```
Promise<GetResult>
```

**Since:** 1.0.0

* * *

### getPreferred()[​](#getpreferred "Direct link to getPreferred()")

```
getPreferred() => Promise<GetPreferredResult>
```

Get the preferred zoom level.

Zoom levels are represented as a decimal (e.g. 1.2 is 120%).

**Returns:**

```
Promise<GetPreferredResult>
```

**Since:** 1.0.0

* * *

### set(...)[​](#set "Direct link to set(...)")

```
set(options: SetOptions) => Promise<void>
```

Set the current zoom level.

Zoom levels are represented as a decimal (e.g. 1.2 is 120%).

| Param | Type |
| --- | --- |
| **`options`** |
```
SetOptions
```

 |

**Since:** 1.0.0

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### GetResult[​](#getresult "Direct link to GetResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `number` | The current zoom level (represented as a decimal). | 1.0.0 |

#### GetPreferredResult[​](#getpreferredresult "Direct link to GetPreferredResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `number` | The preferred zoom level (represented as a decimal). | 1.0.0 |

#### SetOptions[​](#setoptions "Direct link to SetOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `number` | The new zoom level (represented as a decimal). | 1.0.0 |
