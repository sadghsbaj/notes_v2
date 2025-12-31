Version: v8

On this page

# @capacitor/local-notifications

The Local Notifications API provides a way to schedule device notifications locally (i.e. without a server sending push notifications).

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/local-notificationsnpx cap sync
```

## Android[​](#android "Direct link to Android")

Android 13 requires a permission check in order to send notifications. You are required to call `checkPermissions()` and `requestPermissions()` accordingly.

On Android 12 and older it won't show a prompt and will just return as granted.

Starting on Android 12, scheduled notifications won't be exact unless this permission is added to your `AndroidManifest.xml`:

```
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
```

Note that even if the permission is present, users can still disable exact notifications from the app settings. Use `checkExactNotificationSetting()` to check the the value of the setting. If a user disables this setting, the app will restart and any notification scheduled with an exact alarm will be deleted. If your application depends on exact alarms, be sure to check this setting on app launch (for example, in [`App.appStateChange`](https://capacitorjs.com/docs/apis/app#addlistenerappstatechange-)) in order to provide fallbacks or alternative behavior.

On Android 14, there is a new permission called `USE_EXACT_ALARM`. Use this permission to use exact alarms without needing to request permission from the user. This should only be used if the use of exact alarms is central to your app's functionality. Read more about the implications of using this permission [here](https://developer.android.com/reference/android/Manifest.permission#USE_EXACT_ALARM).

From Android 15 onwards, users can install an app in the [Private space](https://developer.android.com/about/versions/15/features#private-space). Users can lock their private space at any time, which means that push notifications are not shown until the user unlocks it.

It is not possible to detect if an app is installed in the private space. Therefore, if your app shows any critical notifications, inform your users to avoid installing the app in the private space.

For more information about the behavior changes of your app related to the private space, refer to [Android documentation](https://developer.android.com/about/versions/15/behavior-changes-all#private-space-changes).

## Configuration[​](#configuration "Direct link to Configuration")

On Android, the Local Notifications can be configured with the following options:

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`smallIcon`** | `string` | Set the default status bar icon for notifications. Icons should be placed in your app's `res/drawable` folder. The value for this option should be the drawable resource ID, which is the filename without an extension. Only available for Android. | 1.0.0 |
| **`iconColor`** | `string` | Set the default color of status bar icons for notifications. Only available for Android. | 1.0.0 |
| **`sound`** | `string` | Set the default notification sound for notifications. On Android 8+ it sets the default channel sound and can't be changed unless the app is uninstalled. If the audio file is not found, it will result in the default system sound being played on Android 7.x and no sound on Android 8+. Only available for Android. | 1.0.0 |

### Examples[​](#examples "Direct link to Examples")

In `capacitor.config.json`:

```
{  "plugins": {    "LocalNotifications": {      "smallIcon": "ic_stat_icon_config_sample",      "iconColor": "#488AFF",      "sound": "beep.wav"    }  }}
```

In `capacitor.config.ts`:

```
/// <reference types="@capacitor/local-notifications" />import { CapacitorConfig } from '@capacitor/cli';const config: CapacitorConfig = {  plugins: {    LocalNotifications: {      smallIcon: "ic_stat_icon_config_sample",      iconColor: "#488AFF",      sound: "beep.wav",    },  },};export default config;
```

## Doze[​](#doze "Direct link to Doze")

If the device has entered [Doze](https://developer.android.com/training/monitoring-device-state/doze-standby) mode, your application may have restricted capabilities. If you need your notification to fire even during Doze, schedule your notification by using `allowWhileIdle: true`. Make use of `allowWhileIdle` judiciously, as these notifications [can only fire once per 9 minutes, per app.](https://developer.android.com/training/monitoring-device-state/doze-standby#assessing_your_app)

## API[​](#api "Direct link to API")

-   [`schedule(...)`](#schedule)
-   [`getPending()`](#getpending)
-   [`registerActionTypes(...)`](#registeractiontypes)
-   [`cancel(...)`](#cancel)
-   [`areEnabled()`](#areenabled)
-   [`getDeliveredNotifications()`](#getdeliverednotifications)
-   [`removeDeliveredNotifications(...)`](#removedeliverednotifications)
-   [`removeAllDeliveredNotifications()`](#removealldeliverednotifications)
-   [`createChannel(...)`](#createchannel)
-   [`deleteChannel(...)`](#deletechannel)
-   [`listChannels()`](#listchannels)
-   [`checkPermissions()`](#checkpermissions)
-   [`requestPermissions()`](#requestpermissions)
-   [`changeExactNotificationSetting()`](#changeexactnotificationsetting)
-   [`checkExactNotificationSetting()`](#checkexactnotificationsetting)
-   [`addListener('localNotificationReceived', ...)`](#addlistenerlocalnotificationreceived-)
-   [`addListener('localNotificationActionPerformed', ...)`](#addlistenerlocalnotificationactionperformed-)
-   [`removeAllListeners()`](#removealllisteners)
-   [Interfaces](#interfaces)
-   [Type Aliases](#type-aliases)
-   [Enums](#enums)

### schedule(...)[​](#schedule "Direct link to schedule(...)")

```
schedule(options: ScheduleOptions) => Promise<ScheduleResult>
```

[Schedule](#schedule) one or more local notifications.

| Param | Type |
| --- | --- |
| **`options`** |
```
ScheduleOptions
```

 |

**Returns:**

```
Promise<ScheduleResult>
```

**Since:** 1.0.0

* * *

### getPending()[​](#getpending "Direct link to getPending()")

```
getPending() => Promise<PendingResult>
```

Get a list of pending notifications.

**Returns:**

```
Promise<PendingResult>
```

**Since:** 1.0.0

* * *

### registerActionTypes(...)[​](#registeractiontypes "Direct link to registerActionTypes(...)")

```
registerActionTypes(options: RegisterActionTypesOptions) => Promise<void>
```

Register actions to take when notifications are displayed.

Only available for iOS and Android.

| Param | Type |
| --- | --- |
| **`options`** |
```
RegisterActionTypesOptions
```

 |

**Since:** 1.0.0

* * *

### cancel(...)[​](#cancel "Direct link to cancel(...)")

```
cancel(options: CancelOptions) => Promise<void>
```

Cancel pending notifications.

| Param | Type |
| --- | --- |
| **`options`** |
```
CancelOptions
```

 |

**Since:** 1.0.0

* * *

### areEnabled()[​](#areenabled "Direct link to areEnabled()")

```
areEnabled() => Promise<EnabledResult>
```

Check if notifications are enabled or not.

**Returns:**

```
Promise<EnabledResult>
```

**Since:** 1.0.0

* * *

### getDeliveredNotifications()[​](#getdeliverednotifications "Direct link to getDeliveredNotifications()")

```
getDeliveredNotifications() => Promise<DeliveredNotifications>
```

Get a list of notifications that are visible on the notifications screen.

**Returns:**

```
Promise<DeliveredNotifications>
```

**Since:** 4.0.0

* * *

### removeDeliveredNotifications(...)[​](#removedeliverednotifications "Direct link to removeDeliveredNotifications(...)")

```
removeDeliveredNotifications(delivered: DeliveredNotifications) => Promise<void>
```

Remove the specified notifications from the notifications screen.

| Param | Type |
| --- | --- |
| **`delivered`** |
```
DeliveredNotifications
```

 |

**Since:** 4.0.0

* * *

### removeAllDeliveredNotifications()[​](#removealldeliverednotifications "Direct link to removeAllDeliveredNotifications()")

```
removeAllDeliveredNotifications() => Promise<void>
```

Remove all the notifications from the notifications screen.

**Since:** 4.0.0

* * *

### createChannel(...)[​](#createchannel "Direct link to createChannel(...)")

```
createChannel(channel: Channel) => Promise<void>
```

Create a notification channel.

Only available for Android.

| Param | Type |
| --- | --- |
| **`channel`** |
```
Channel
```

 |

**Since:** 1.0.0

* * *

### deleteChannel(...)[​](#deletechannel "Direct link to deleteChannel(...)")

```
deleteChannel(args: { id: string; }) => Promise<void>
```

Delete a notification channel.

Only available for Android.

| Param | Type |
| --- | --- |
| **`args`** | `{ id: string; }` |

**Since:** 1.0.0

* * *

### listChannels()[​](#listchannels "Direct link to listChannels()")

```
listChannels() => Promise<ListChannelsResult>
```

Get a list of notification channels.

Only available for Android.

**Returns:**

```
Promise<ListChannelsResult>
```

**Since:** 1.0.0

* * *

### checkPermissions()[​](#checkpermissions "Direct link to checkPermissions()")

```
checkPermissions() => Promise<PermissionStatus>
```

Check permission to display local notifications.

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

Request permission to display local notifications.

**Returns:**

```
Promise<PermissionStatus>
```

**Since:** 1.0.0

* * *

### changeExactNotificationSetting()[​](#changeexactnotificationsetting "Direct link to changeExactNotificationSetting()")

```
changeExactNotificationSetting() => Promise<SettingsPermissionStatus>
```

Direct user to the application settings screen to configure exact alarms.

In the event that a user changes the settings from granted to denied, the application will restart and any notification scheduled with an exact alarm will be deleted.

On Android < 12, the user will NOT be directed to the application settings screen, instead this function will return `granted`.

Only available on Android.

**Returns:**

```
Promise<SettingsPermissionStatus>
```

**Since:** 6.0.0

* * *

### checkExactNotificationSetting()[​](#checkexactnotificationsetting "Direct link to checkExactNotificationSetting()")

```
checkExactNotificationSetting() => Promise<SettingsPermissionStatus>
```

Check application setting for using exact alarms.

Only available on Android.

**Returns:**

```
Promise<SettingsPermissionStatus>
```

**Since:** 6.0.0

* * *

### addListener('localNotificationReceived', ...)[​](#addlistenerlocalnotificationreceived- "Direct link to addListener('localNotificationReceived', ...)")

```
addListener(eventName: 'localNotificationReceived', listenerFunc: (notification: LocalNotificationSchema) => void) => Promise<PluginListenerHandle>
```

Listen for when notifications are displayed.

| Param | Type |
| --- | --- |
| **`eventName`** | `'localNotificationReceived'` |
| **`listenerFunc`** |
```
(notification: LocalNotificationSchema) => void
```

 |

**Returns:**

```
Promise<PluginListenerHandle>
```

**Since:** 1.0.0

* * *

### addListener('localNotificationActionPerformed', ...)[​](#addlistenerlocalnotificationactionperformed- "Direct link to addListener('localNotificationActionPerformed', ...)")

```
addListener(eventName: 'localNotificationActionPerformed', listenerFunc: (notificationAction: ActionPerformed) => void) => Promise<PluginListenerHandle>
```

Listen for when an action is performed on a notification.

| Param | Type |
| --- | --- |
| **`eventName`** | `'localNotificationActionPerformed'` |
| **`listenerFunc`** |
```
(notificationAction: ActionPerformed) => void
```

 |

**Returns:**

```
Promise<PluginListenerHandle>
```

**Since:** 1.0.0

* * *

### removeAllListeners()[​](#removealllisteners "Direct link to removeAllListeners()")

```
removeAllListeners() => Promise<void>
```

Remove all listeners for this plugin.

**Since:** 1.0.0

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### ScheduleResult[​](#scheduleresult "Direct link to ScheduleResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`notifications`** | `LocalNotificationDescriptor[]` | The list of scheduled notifications. | 1.0.0 |

#### LocalNotificationDescriptor[​](#localnotificationdescriptor "Direct link to LocalNotificationDescriptor")

The object that describes a local notification.

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`id`** | `number` | The notification identifier. | 1.0.0 |

#### ScheduleOptions[​](#scheduleoptions "Direct link to ScheduleOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`notifications`** | `LocalNotificationSchema[]` | The list of notifications to schedule. | 1.0.0 |

#### LocalNotificationSchema[​](#localnotificationschema "Direct link to LocalNotificationSchema")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`title`** | `string` | The title of the notification. | 1.0.0 |
| **`body`** | `string` | The body of the notification, shown below the title. | 1.0.0 |
| **`largeBody`** | `string` | Sets a multiline text block for display in a big text notification style. | 1.0.0 |
| **`summaryText`** | `string` | Used to set the summary text detail in inbox and big text notification styles. Only available for Android. | 1.0.0 |
| **`id`** | `number` | The notification identifier. On Android it's a 32-bit int. So the value should be between -2147483648 and 2147483647 inclusive. | 1.0.0 |
| **`schedule`** |
```
Schedule
```

 | [Schedule](#schedule) this notification for a later time. | 1.0.0 |
| **`sound`** | `string` | Name of the audio file to play when this notification is displayed. Include the file extension with the filename. On iOS, the file should be in the app bundle. On Android, the file should be in res/raw folder. Recommended format is `.wav` because is supported by both iOS and Android. Only available for iOS and Android 7.x. For Android 8+ use channelId of a channel configured with the desired sound. If the sound file is not found, (i.e. empty string or wrong name) the default system notification sound will be used. If not provided, it will produce the default sound on Android and no sound on iOS. | 1.0.0 |
| **`smallIcon`** | `string` | Set a custom status bar icon. If set, this overrides the `smallIcon` option from Capacitor configuration. Icons should be placed in your app's `res/drawable` folder. The value for this option should be the drawable resource ID, which is the filename without an extension. Only available for Android. | 1.0.0 |
| **`largeIcon`** | `string` | Set a large icon for notifications. Icons should be placed in your app's `res/drawable` folder. The value for this option should be the drawable resource ID, which is the filename without an extension. Only available for Android. | 1.0.0 |
| **`iconColor`** | `string` | Set the color of the notification icon. Only available for Android. | 1.0.0 |
| **`attachments`** | `Attachment[]` | Set attachments for this notification. | 1.0.0 |
| **`actionTypeId`** | `string` | Associate an action type with this notification. | 1.0.0 |
| **`extra`** | `any` | Set extra data to store within this notification. | 1.0.0 |
| **`threadIdentifier`** | `string` | Used to group multiple notifications. Sets `threadIdentifier` on the [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent). Only available for iOS. | 1.0.0 |
| **`summaryArgument`** | `string` | The string this notification adds to the category's summary format string. Sets `summaryArgument` on the [`UNMutableNotificationContent`](https://developer.apple.com/documentation/usernotifications/unmutablenotificationcontent). Only available for iOS. | 1.0.0 |
| **`group`** | `string` | Used to group multiple notifications. Calls `setGroup()` on [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) with the provided value. Only available for Android. | 1.0.0 |
| **`groupSummary`** | `boolean` | If true, this notification becomes the summary for a group of notifications. Calls `setGroupSummary()` on [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) with the provided value. Only available for Android when using `group`. | 1.0.0 |
| **`channelId`** | `string` | Specifies the channel the notification should be delivered on. If channel with the given name does not exist then the notification will not fire. If not provided, it will use the default channel. Calls `setChannelId()` on [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) with the provided value. Only available for Android 8+. | 1.0.0 |
| **`ongoing`** | `boolean` | If true, the notification can't be swiped away. Calls `setOngoing()` on [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) with the provided value. Only available for Android. | 1.0.0 |
| **`autoCancel`** | `boolean` | If true, the notification is canceled when the user clicks on it. Calls `setAutoCancel()` on [`NotificationCompat.Builder`](https://developer.android.com/reference/androidx/core/app/NotificationCompat.Builder) with the provided value. Only available for Android. | 1.0.0 |
| **`inboxList`** | `string[]` | Sets a list of strings for display in an inbox style notification. Up to 5 strings are allowed. Only available for Android. | 1.0.0 |
| **`silent`** | `boolean` | If true, notification will not appear while app is in the foreground. Only available for iOS. | 5.0.0 |

#### Schedule[​](#schedule-1 "Direct link to Schedule")

Represents a schedule for a notification.

Use either `at`, `on`, or `every` to schedule notifications.

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`at`** |
```
Date
```

 | [Schedule](#schedule) a notification at a specific date and time. | 1.0.0 |
| **`repeats`** | `boolean` | Repeat delivery of this notification at the date and time specified by `at`. Only available for iOS and Android. | 1.0.0 |
| **`allowWhileIdle`** | `boolean` | Allow this notification to fire while in [Doze](https://developer.android.com/training/monitoring-device-state/doze-standby) Note that these notifications can only fire [once per 9 minutes, per app](https://developer.android.com/training/monitoring-device-state/doze-standby#assessing_your_app). | 1.0.0 |
| **`on`** |

```
ScheduleOn
```

 | [Schedule](#schedule) a notification on particular interval(s). This is similar to scheduling [cron](https://en.wikipedia.org/wiki/Cron) jobs. Only available for iOS and Android. | 1.0.0 |
| **`every`** |

```
ScheduleEvery
```

 | [Schedule](#schedule) a notification on a particular interval. | 1.0.0 |
| **`count`** | `number` | Limit the number times a notification is delivered by the interval specified by `every`. | 1.0.0 |

#### Date[​](#date "Direct link to Date")

Enables basic storage and retrieval of dates and times.

| Method | Signature | Description |
| --- | --- | --- |
| **toString** | () => string | Returns a string representation of a date. The format of the string depends on the locale. |
| **toDateString** | () => string | Returns a date as a string value. |
| **toTimeString** | () => string | Returns a time as a string value. |
| **toLocaleString** | () => string | Returns a value as a string value appropriate to the host environment's current locale. |
| **toLocaleDateString** | () => string | Returns a date as a string value appropriate to the host environment's current locale. |
| **toLocaleTimeString** | () => string | Returns a time as a string value appropriate to the host environment's current locale. |
| **valueOf** | () => number | Returns the stored time value in milliseconds since midnight, January 1, 1970 UTC. |
| **getTime** | () => number | Gets the time value in milliseconds. |
| **getFullYear** | () => number | Gets the year, using local time. |
| **getUTCFullYear** | () => number | Gets the year using Universal Coordinated Time (UTC). |
| **getMonth** | () => number | Gets the month, using local time. |
| **getUTCMonth** | () => number | Gets the month of a [Date](#date) object using Universal Coordinated Time (UTC). |
| **getDate** | () => number | Gets the day-of-the-month, using local time. |
| **getUTCDate** | () => number | Gets the day-of-the-month, using Universal Coordinated Time (UTC). |
| **getDay** | () => number | Gets the day of the week, using local time. |
| **getUTCDay** | () => number | Gets the day of the week using Universal Coordinated Time (UTC). |
| **getHours** | () => number | Gets the hours in a date, using local time. |
| **getUTCHours** | () => number | Gets the hours value in a [Date](#date) object using Universal Coordinated Time (UTC). |
| **getMinutes** | () => number | Gets the minutes of a [Date](#date) object, using local time. |
| **getUTCMinutes** | () => number | Gets the minutes of a [Date](#date) object using Universal Coordinated Time (UTC). |
| **getSeconds** | () => number | Gets the seconds of a [Date](#date) object, using local time. |
| **getUTCSeconds** | () => number | Gets the seconds of a [Date](#date) object using Universal Coordinated Time (UTC). |
| **getMilliseconds** | () => number | Gets the milliseconds of a [Date](#date), using local time. |
| **getUTCMilliseconds** | () => number | Gets the milliseconds of a [Date](#date) object using Universal Coordinated Time (UTC). |
| **getTimezoneOffset** | () => number | Gets the difference in minutes between the time on the local computer and Universal Coordinated Time (UTC). |
| **setTime** | (time: number) => number | Sets the date and time value in the [Date](#date) object. |
| **setMilliseconds** | (ms: number) => number | Sets the milliseconds value in the [Date](#date) object using local time. |
| **setUTCMilliseconds** | (ms: number) => number | Sets the milliseconds value in the [Date](#date) object using Universal Coordinated Time (UTC). |
| **setSeconds** | (sec: number, ms?: number | undefined) => number | Sets the seconds value in the [Date](#date) object using local time. |
| **setUTCSeconds** | (sec: number, ms?: number | undefined) => number | Sets the seconds value in the [Date](#date) object using Universal Coordinated Time (UTC). |
| **setMinutes** | (min: number, sec?: number | undefined, ms?: number | undefined) => number | Sets the minutes value in the [Date](#date) object using local time. |
| **setUTCMinutes** | (min: number, sec?: number | undefined, ms?: number | undefined) => number | Sets the minutes value in the [Date](#date) object using Universal Coordinated Time (UTC). |
| **setHours** | (hours: number, min?: number | undefined, sec?: number | undefined, ms?: number | undefined) => number | Sets the hour value in the [Date](#date) object using local time. |
| **setUTCHours** | (hours: number, min?: number | undefined, sec?: number | undefined, ms?: number | undefined) => number | Sets the hours value in the [Date](#date) object using Universal Coordinated Time (UTC). |
| **setDate** | (date: number) => number | Sets the numeric day-of-the-month value of the [Date](#date) object using local time. |
| **setUTCDate** | (date: number) => number | Sets the numeric day of the month in the [Date](#date) object using Universal Coordinated Time (UTC). |
| **setMonth** | (month: number, date?: number | undefined) => number | Sets the month value in the [Date](#date) object using local time. |
| **setUTCMonth** | (month: number, date?: number | undefined) => number | Sets the month value in the [Date](#date) object using Universal Coordinated Time (UTC). |
| **setFullYear** | (year: number, month?: number | undefined, date?: number | undefined) => number | Sets the year of the [Date](#date) object using local time. |
| **setUTCFullYear** | (year: number, month?: number | undefined, date?: number | undefined) => number | Sets the year value in the [Date](#date) object using Universal Coordinated Time (UTC). |
| **toUTCString** | () => string | Returns a date converted to a string using Universal Coordinated Time (UTC). |
| **toISOString** | () => string | Returns a date as a string value in ISO format. |
| **toJSON** | (key?: any) => string | Used by the JSON.stringify method to enable the transformation of an object's data for JavaScript Object Notation (JSON) serialization. |

#### ScheduleOn[​](#scheduleon "Direct link to ScheduleOn")

| Prop | Type |
| --- | --- |
| **`year`** | `number` |
| **`month`** | `number` |
| **`day`** | `number` |
| **`weekday`** |
```
Weekday
```

 |
| **`hour`** | `number` |
| **`minute`** | `number` |
| **`second`** | `number` |

#### Attachment[​](#attachment "Direct link to Attachment")

Represents a notification attachment.

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`id`** | `string` | The attachment identifier. | 1.0.0 |
| **`url`** | `string` | The URL to the attachment. Use the `res` scheme to reference web assets, e.g. `res:///assets/img/icon.png`. Also accepts `file` URLs. | 1.0.0 |
| **`options`** |
```
AttachmentOptions
```

 | [Attachment](#attachment) options. | 1.0.0 |

#### AttachmentOptions[​](#attachmentoptions "Direct link to AttachmentOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`iosUNNotificationAttachmentOptionsTypeHintKey`** | `string` | Sets the `UNNotificationAttachmentOptionsTypeHintKey` key in the hashable options of [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment). Only available for iOS. | 1.0.0 |
| **`iosUNNotificationAttachmentOptionsThumbnailHiddenKey`** | `string` | Sets the `UNNotificationAttachmentOptionsThumbnailHiddenKey` key in the hashable options of [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment). Only available for iOS. | 1.0.0 |
| **`iosUNNotificationAttachmentOptionsThumbnailClippingRectKey`** | `string` | Sets the `UNNotificationAttachmentOptionsThumbnailClippingRectKey` key in the hashable options of [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment). Only available for iOS. | 1.0.0 |
| **`iosUNNotificationAttachmentOptionsThumbnailTimeKey`** | `string` | Sets the `UNNotificationAttachmentOptionsThumbnailTimeKey` key in the hashable options of [`UNNotificationAttachment`](https://developer.apple.com/documentation/usernotifications/unnotificationattachment). Only available for iOS. | 1.0.0 |

#### PendingResult[​](#pendingresult "Direct link to PendingResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`notifications`** | `PendingLocalNotificationSchema[]` | The list of pending notifications. | 1.0.0 |

#### PendingLocalNotificationSchema[​](#pendinglocalnotificationschema "Direct link to PendingLocalNotificationSchema")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`title`** | `string` | The title of the notification. | 1.0.0 |
| **`body`** | `string` | The body of the notification, shown below the title. | 1.0.0 |
| **`id`** | `number` | The notification identifier. | 1.0.0 |
| **`schedule`** |
```
Schedule
```

 | [Schedule](#schedule) this notification for a later time. | 1.0.0 |
| **`extra`** | `any` | Set extra data to store within this notification. | 1.0.0 |

#### RegisterActionTypesOptions[​](#registeractiontypesoptions "Direct link to RegisterActionTypesOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`types`** | `ActionType[]` | The list of action types to register. | 1.0.0 |

#### ActionType[​](#actiontype "Direct link to ActionType")

A collection of actions.

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`id`** | `string` | The ID of the action type. Referenced in notifications by the `actionTypeId` key. | 1.0.0 |
| **`actions`** | `Action[]` | The list of actions associated with this action type. | 1.0.0 |
| **`iosHiddenPreviewsBodyPlaceholder`** | `string` | Sets `hiddenPreviewsBodyPlaceholder` of the [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory). Only available for iOS. | 1.0.0 |
| **`iosCustomDismissAction`** | `boolean` | Sets `customDismissAction` in the options of the [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory). Only available for iOS. | 1.0.0 |
| **`iosAllowInCarPlay`** | `boolean` | Sets `allowInCarPlay` in the options of the [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory). Only available for iOS. | 1.0.0 |
| **`iosHiddenPreviewsShowTitle`** | `boolean` | Sets `hiddenPreviewsShowTitle` in the options of the [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory). Only available for iOS. | 1.0.0 |
| **`iosHiddenPreviewsShowSubtitle`** | `boolean` | Sets `hiddenPreviewsShowSubtitle` in the options of the [`UNNotificationCategory`](https://developer.apple.com/documentation/usernotifications/unnotificationcategory). Only available for iOS. | 1.0.0 |

#### Action[​](#action "Direct link to Action")

An action that can be taken when a notification is displayed.

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`id`** | `string` | The action identifier. Referenced in the `'actionPerformed'` event as `actionId`. | 1.0.0 |
| **`title`** | `string` | The title text to display for this action. | 1.0.0 |
| **`requiresAuthentication`** | `boolean` | Sets `authenticationRequired` in the options of the [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction). Only available for iOS. | 1.0.0 |
| **`foreground`** | `boolean` | Sets `foreground` in the options of the [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction). Only available for iOS. | 1.0.0 |
| **`destructive`** | `boolean` | Sets `destructive` in the options of the [`UNNotificationAction`](https://developer.apple.com/documentation/usernotifications/unnotificationaction). Only available for iOS. | 1.0.0 |
| **`input`** | `boolean` | Use a `UNTextInputNotificationAction` instead of a `UNNotificationAction`. Only available for iOS. | 1.0.0 |
| **`inputButtonTitle`** | `string` | Sets `textInputButtonTitle` on the [`UNTextInputNotificationAction`](https://developer.apple.com/documentation/usernotifications/untextinputnotificationaction). Only available for iOS when `input` is `true`. | 1.0.0 |
| **`inputPlaceholder`** | `string` | Sets `textInputPlaceholder` on the [`UNTextInputNotificationAction`](https://developer.apple.com/documentation/usernotifications/untextinputnotificationaction). Only available for iOS when `input` is `true`. | 1.0.0 |

#### CancelOptions[​](#canceloptions "Direct link to CancelOptions")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`notifications`** | `LocalNotificationDescriptor[]` | The list of notifications to cancel. | 1.0.0 |

#### EnabledResult[​](#enabledresult "Direct link to EnabledResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `boolean` | Whether or not the device has local notifications enabled. | 1.0.0 |

#### DeliveredNotifications[​](#deliverednotifications "Direct link to DeliveredNotifications")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`notifications`** | `DeliveredNotificationSchema[]` | List of notifications that are visible on the notifications screen. | 1.0.0 |

#### DeliveredNotificationSchema[​](#deliverednotificationschema "Direct link to DeliveredNotificationSchema")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`id`** | `number` | The notification identifier. | 4.0.0 |
| **`tag`** | `string` | The notification tag. Only available on Android. | 4.0.0 |
| **`title`** | `string` | The title of the notification. | 4.0.0 |
| **`body`** | `string` | The body of the notification, shown below the title. | 4.0.0 |
| **`group`** | `string` | The configured group of the notification. Only available for Android. | 4.0.0 |
| **`groupSummary`** | `boolean` | If this notification is the summary for a group of notifications. Only available for Android. | 4.0.0 |
| **`data`** | `any` | Any additional data that was included in the notification payload. Only available for Android. | 4.0.0 |
| **`extra`** | `any` | Extra data to store within this notification. Only available for iOS. | 4.0.0 |
| **`attachments`** | `Attachment[]` | The attachments for this notification. Only available for iOS. | 1.0.0 |
| **`actionTypeId`** | `string` | [Action](#action) type ssociated with this notification. Only available for iOS. | 4.0.0 |
| **`schedule`** |
```
Schedule
```

 | [Schedule](#schedule) used to fire this notification. Only available for iOS. | 4.0.0 |
| **`sound`** | `string` | Sound that was used when the notification was displayed. Only available for iOS. | 4.0.0 |

#### Channel[​](#channel "Direct link to Channel")

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`id`** | `string` | The channel identifier. |  | 1.0.0 |
| **`name`** | `string` | The human-friendly name of this channel (presented to the user). |  | 1.0.0 |
| **`description`** | `string` | The description of this channel (presented to the user). |  | 1.0.0 |
| **`sound`** | `string` | The sound that should be played for notifications posted to this channel. Notification channels with an importance of at least `3` should have a sound. The file name of a sound file should be specified relative to the android app `res/raw` directory. If the sound is not provided, or the sound file is not found no sound will be used. |  | 1.0.0 |
| **`importance`** |
```
Importance
```

 | The level of interruption for notifications posted to this channel. |

```
3
```

 | 1.0.0 |
| **`visibility`** |

```
Visibility
```

 | The visibility of notifications posted to this channel. This setting is for whether notifications posted to this channel appear on the lockscreen or not, and if so, whether they appear in a redacted form. |  | 1.0.0 |
| **`lights`** | `boolean` | Whether notifications posted to this channel should display notification lights, on devices that support it. |  | 1.0.0 |
| **`lightColor`** | `string` | The light color for notifications posted to this channel. Only supported if lights are enabled on this channel and the device supports it. Supported color formats are `#RRGGBB` and `#RRGGBBAA`. |  | 1.0.0 |
| **`vibration`** | `boolean` | Whether notifications posted to this channel should vibrate. |  | 1.0.0 |

#### ListChannelsResult[​](#listchannelsresult "Direct link to ListChannelsResult")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`channels`** | `Channel[]` | The list of notification channels. | 1.0.0 |

#### PermissionStatus[​](#permissionstatus "Direct link to PermissionStatus")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`display`** |
```
PermissionState
```

 | Permission state of displaying notifications. | 1.0.0 |

#### SettingsPermissionStatus[​](#settingspermissionstatus "Direct link to SettingsPermissionStatus")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`exact_alarm`** |
```
PermissionState
```

 | Permission state of using exact alarms. | 6.0.0 |

#### PluginListenerHandle[​](#pluginlistenerhandle "Direct link to PluginListenerHandle")

| Prop | Type |
| --- | --- |
| **`remove`** | `() => Promise<void>` |

#### ActionPerformed[​](#actionperformed "Direct link to ActionPerformed")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`actionId`** | `string` | The identifier of the performed action. | 1.0.0 |
| **`inputValue`** | `string` | The value entered by the user on the notification. Only available on iOS for notifications with `input` set to `true`. | 1.0.0 |
| **`notification`** |
```
LocalNotificationSchema
```

 | The original notification schema. | 1.0.0 |

### Type Aliases[​](#type-aliases "Direct link to Type Aliases")

#### ScheduleEvery[​](#scheduleevery "Direct link to ScheduleEvery")

`'year' | 'month' | 'two-weeks' | 'week' | 'day' | 'hour' | 'minute' | 'second'`

#### Importance[​](#importance "Direct link to Importance")

The importance level. For more details, see the [Android Developer Docs](https://developer.android.com/reference/android/app/NotificationManager#IMPORTANCE_DEFAULT)

`1 | 2 | 3 | 4 | 5`

#### Visibility[​](#visibility "Direct link to Visibility")

The notification visibility. For more details, see the [Android Developer Docs](https://developer.android.com/reference/androidx/core/app/NotificationCompat#VISIBILITY_PRIVATE)

`-1 | 0 | 1`

#### PermissionState[​](#permissionstate "Direct link to PermissionState")

`'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'`

### Enums[​](#enums "Direct link to Enums")

#### Weekday[​](#weekday "Direct link to Weekday")

| Members | Value |
| --- | --- |
| **`Sunday`** | `1` |
| **`Monday`** | `2` |
| **`Tuesday`** | `3` |
| **`Wednesday`** | `4` |
| **`Thursday`** | `5` |
| **`Friday`** | `6` |
| **`Saturday`** | `7` |

## Contents

-   [Install](#install)
-   [Android](#android)
-   [Configuration](#configuration)
    -   [Examples](#examples)
-   [Doze](#doze)
-   [API](#api)
    -   [schedule(...)](#schedule)
    -   [getPending()](#getpending)
    -   [registerActionTypes(...)](#registeractiontypes)
    -   [cancel(...)](#cancel)
    -   [areEnabled()](#areenabled)
    -   [getDeliveredNotifications()](#getdeliverednotifications)
    -   [removeDeliveredNotifications(...)](#removedeliverednotifications)
    -   [removeAllDeliveredNotifications()](#removealldeliverednotifications)
    -   [createChannel(...)](#createchannel)
    -   [deleteChannel(...)](#deletechannel)
    -   [listChannels()](#listchannels)
    -   [checkPermissions()](#checkpermissions)
    -   [requestPermissions()](#requestpermissions)
    -   [changeExactNotificationSetting()](#changeexactnotificationsetting)
    -   [checkExactNotificationSetting()](#checkexactnotificationsetting)
    -   [addListener('localNotificationReceived', ...)](#addlistenerlocalnotificationreceived-)
    -   [addListener('localNotificationActionPerformed', ...)](#addlistenerlocalnotificationactionperformed-)
    -   [removeAllListeners()](#removealllisteners)
    -   [Interfaces](#interfaces)
    -   [Type Aliases](#type-aliases)
    -   [Enums](#enums)

* * *
