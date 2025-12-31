Version: v8

On this page

# @capacitor/toast

The Toast API provides a notification pop up for displaying important information to a user. Just like real toast!

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/toastnpx cap sync
```

## PWA Notes[​](#pwa-notes "Direct link to PWA Notes")

[PWA Elements](https://capacitorjs.com/docs/web/pwa-elements) are required for the Toast plugin to work.

## Example[​](#example "Direct link to Example")

```
import { Toast } from '@capacitor/toast';const showHelloToast = async () => {  await Toast.show({    text: 'Hello!',  });};
```

## API[​](#api "Direct link to API")

-   [`show(...)`](#show)
-   [Interfaces](#interfaces)

### show(...)[​](#show "Direct link to show(...)")

```
show(options: ShowOptions) => Promise<void>
```

Shows a Toast on the screen

| Param | Type |
| --- | --- |
| **`options`** |
```
ShowOptions
```

 |

**Since:** 1.0.0

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### ShowOptions[​](#showoptions "Direct link to ShowOptions")

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`text`** | `string` | Text to display on the Toast |  | 1.0.0 |
| **`duration`** | `'short' | 'long'` | Duration of the Toast, either 'short' (2000ms) or 'long' (3500ms) | `'short'` | 1.0.0 |
| **`position`** | `'top' | 'center' | 'bottom'` | Position of the Toast. On Android 12 and newer all toasts are shown at the bottom. | `'bottom'` | 1.0.0 |
