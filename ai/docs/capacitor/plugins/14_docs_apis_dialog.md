Version: v8

On this page

# @capacitor/dialog

The Dialog API provides methods for triggering native dialog windows for alerts, confirmations, and input prompts

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/dialognpx cap sync
```

## Example[​](#example "Direct link to Example")

```
import { Dialog } from '@capacitor/dialog';const showAlert = async () => {  await Dialog.alert({    title: 'Stop',    message: 'this is an error',  });};const showConfirm = async () => {  const { value } = await Dialog.confirm({    title: 'Confirm',    message: `Are you sure you'd like to press the red button?`,  });  console.log('Confirmed:', value);};const showPrompt = async () => {  const { value, cancelled } = await Dialog.prompt({    title: 'Hello',    message: `What's your name?`,  });  console.log('Name:', value);  console.log('Cancelled:', cancelled);};
```

## API[​](#api "Direct link to API")

-   [`alert(...)`](#alert)
-   [`prompt(...)`](#prompt)
-   [`confirm(...)`](#confirm)
-   [Interfaces](#interfaces)

### alert(...)[​](#alert "Direct link to alert(...)")

```
alert(options: AlertOptions) => Promise<void>
```

Show an alert dialog

| Param | Type |
| --- | --- |
| **`options`** |
```
AlertOptions
```

 |

**Since:** 1.0.0

* * *

### prompt(...)[​](#prompt "Direct link to prompt(...)")

```
prompt(options: PromptOptions) => Promise<PromptResult>
```

Show a prompt dialog

| Param | Type |
| --- | --- |
| **`options`** |
```
PromptOptions
```

 |

**Returns:**

```
Promise<PromptResult>
```

**Since:** 1.0.0

* * *

### confirm(...)[​](#confirm "Direct link to confirm(...)")

```
confirm(options: ConfirmOptions) => Promise<ConfirmResult>
```

Show a confirmation dialog

| Param | Type |
| --- | --- |
| **`options`** |
```
ConfirmOptions
```

 |

**Returns:**

```
Promise<ConfirmResult>
```

**Since:** 1.0.0

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### AlertOptions[​](#alertoptions "Direct link to AlertOptions")

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`title`** | `string` | Title of the dialog. |  | 1.0.0 |
| **`message`** | `string` | Message to show on the dialog. |  | 1.0.0 |
| **`buttonTitle`** | `string` | Text to use on the action button. | `"OK"` | 1.0.0 |

#### PromptResult[​](#promptresult "Direct link to PromptResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `string` | Text entered on the prompt. | 1.0.0 |
| **`cancelled`** | `boolean` | Whether if the prompt was canceled or accepted. | 1.0.0 |

#### PromptOptions[​](#promptoptions "Direct link to PromptOptions")

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`title`** | `string` | Title of the dialog. |  | 1.0.0 |
| **`message`** | `string` | Message to show on the dialog. |  | 1.0.0 |
| **`okButtonTitle`** | `string` | Text to use on the positive action button. | `"OK"` | 1.0.0 |
| **`cancelButtonTitle`** | `string` | Text to use on the negative action button. | `"Cancel"` | 1.0.0 |
| **`inputPlaceholder`** | `string` | Placeholder text for hints. |  | 1.0.0 |
| **`inputText`** | `string` | Prepopulated text. |  | 1.0.0 |

#### ConfirmResult[​](#confirmresult "Direct link to ConfirmResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `boolean` | true if the positive button was clicked, false otherwise. | 1.0.0 |

#### ConfirmOptions[​](#confirmoptions "Direct link to ConfirmOptions")

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`title`** | `string` | Title of the dialog. |  | 1.0.0 |
| **`message`** | `string` | Message to show on the dialog. |  | 1.0.0 |
| **`okButtonTitle`** | `string` | Text to use on the positive action button. | `"OK"` | 1.0.0 |
| **`cancelButtonTitle`** | `string` | Text to use on the negative action button. | `"Cancel"` | 1.0.0 |
