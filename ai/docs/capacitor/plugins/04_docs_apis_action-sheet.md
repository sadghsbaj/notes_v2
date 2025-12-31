Version: v8

On this page

# @capacitor/action-sheet

The Action Sheet API provides access to native Action Sheets, which come up from the bottom of the screen and display actions a user can take.

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/action-sheetnpx cap sync
```

### Variables[​](#variables "Direct link to Variables")

This plugin will use the following project variables (defined in your app's `variables.gradle` file):

-   `androidxMaterialVersion`: version of `com.google.android.material:material` (default: `1.13.0`)

## PWA Notes[​](#pwa-notes "Direct link to PWA Notes")

[PWA Elements](https://capacitorjs.com/docs/web/pwa-elements) are required for Action Sheet plugin to work.

## Example[​](#example "Direct link to Example")

```
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';const showActions = async () => {  const result = await ActionSheet.showActions({    title: 'Photo Options',    message: 'Select an option to perform',    options: [      {        title: 'Upload',      },      {        title: 'Share',      },      {        title: 'Remove',        style: ActionSheetButtonStyle.Destructive,      },    ],  });  console.log('Action Sheet result:', result);};
```

## API[​](#api "Direct link to API")

-   [`showActions(...)`](#showactions)
-   [Interfaces](#interfaces)
-   [Enums](#enums)

### showActions(...)[​](#showactions "Direct link to showActions(...)")

```
showActions(options: ShowActionsOptions) => Promise<ShowActionsResult>
```

Show an Action Sheet style modal with various options for the user to select.

| Param | Type |
| --- | --- |
| **`options`** |
```
ShowActionsOptions
```

 |

**Returns:**

```
Promise<ShowActionsResult>
```

**Since:** 1.0.0

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### ShowActionsResult[​](#showactionsresult "Direct link to ShowActionsResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`index`** | `number` | The index of the clicked option (Zero-based) | 1.0.0 |

#### ShowActionsOptions[​](#showactionsoptions "Direct link to ShowActionsOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`title`** | `string` | The title of the Action Sheet. | 1.0.0 |
| **`message`** | `string` | A message to show under the title. This option is only supported on iOS. | 1.0.0 |
| **`options`** | `ActionSheetButton[]` | Options the user can choose from. | 1.0.0 |

#### ActionSheetButton[​](#actionsheetbutton "Direct link to ActionSheetButton")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`title`** | `string` | The title of the option | 1.0.0 |
| **`style`** |
```
ActionSheetButtonStyle
```

 | The style of the option This option is only supported on iOS. | 1.0.0 |
| **`icon`** | `string` | Icon for the option (ionicon naming convention) This option is only supported on Web. | 1.0.0 |

### Enums[​](#enums "Direct link to Enums")

#### ActionSheetButtonStyle[​](#actionsheetbuttonstyle "Direct link to ActionSheetButtonStyle")

| Members | Value | Description | Since |
| --- | --- | --- | --- |
| **`Default`** | `'DEFAULT'` | Default style of the option. | 1.0.0 |
| **`Destructive`** | `'DESTRUCTIVE'` | Style to use on destructive options. | 1.0.0 |
| **`Cancel`** | `'CANCEL'` | Style to use on the option that cancels the Action Sheet. If used, should be on the latest availabe option. | 1.0.0 |
