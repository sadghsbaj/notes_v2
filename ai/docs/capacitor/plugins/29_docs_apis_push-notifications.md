Version: v8

On this page

# @capacitor/push-notifications

The Push Notifications API provides access to native push notifications.

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/push-notificationsnpx cap sync
```

## iOS[​](#ios "Direct link to iOS")

On iOS you must enable the Push Notifications capability. See [Setting Capabilities](https://capacitorjs.com/docs/v3/ios/configuration#setting-capabilities) for instructions on how to enable the capability.

After enabling the Push Notifications capability, add the following to your app's `AppDelegate.swift`:

```
func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {  NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: deviceToken)}func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {  NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)}
```

## Android[​](#android "Direct link to Android")

The Push Notification API uses [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) SDK for handling notifications. See [Set up a Firebase Cloud Messaging client app on Android](https://firebase.google.com/docs/cloud-messaging/android/client) and follow the instructions for creating a Firebase project and registering your application. There is no need to add the Firebase SDK to your app or edit your app manifest - the Push Notifications provides that for you. All that is required is your Firebase project's `google-services.json` file added to the module (app-level) directory of your app.

Android 13 requires a permission check in order to receive push notifications. You are required to call `checkPermissions()` and `requestPermissions()` accordingly, when targeting SDK 33.

From Android 15 onwards, users can install an app in the [Private space](https://developer.android.com/about/versions/15/features#private-space). Users can lock their private space at any time, which means that push notifications are not shown until the user unlocks it.

It is not possible to detect if an app is installed in the private space. Therefore, if your app shows any critical notifications, inform your users to avoid installing the app in the private space.

For more information about the behavior changes of your app related to the private space, refer to [Android documentation](https://developer.android.com/about/versions/15/behavior-changes-all#private-space-changes).

### Variables[​](#variables "Direct link to Variables")

This plugin will use the following project variables (defined in your app's `variables.gradle` file):

-   `firebaseMessagingVersion` version of `com.google.firebase:firebase-messaging` (default: `25.0.1`)

* * *

## Push Notifications icon[​](#push-notifications-icon "Direct link to Push Notifications icon")

On Android, the Push Notifications icon with the appropriate name should be added to the `AndroidManifest.xml` file:

```
<meta-data android:name="com.google.firebase.messaging.default_notification_icon" android:resource="@mipmap/push_icon_name" />
```

If no icon is specified Android will use the application icon, but push icon should be white pixels on a transparent backdrop. As the application icon is not usually like that, it will show a white square or circle. So it's recommended to provide the separate icon for Push Notifications.

Android Studio has an icon generator you can use to create your Push Notifications icon.

## Push Notification channel[​](#push-notification-channel "Direct link to Push Notification channel")

From Android 8.0 (API level 26) and higher, notification channels are supported and recommended. The SDK will derive the `channelId` for incoming push notifications in the following order:

1.  **Firstly it will check if the incoming notification has a `channelId` set.** When sending a push notification from either the FCM dashboard, or through their API, it's possible to specify a `channelId`.
2.  **Then it will check for a possible given value in the `AndroidManifest.xml`.** If you prefer to create and use your own default channel, set `default_notification_channel_id` to the ID of your notification channel object as shown; FCM will use this value whenever incoming messages do not explicitly set a notification channel.

```
<meta-data    android:name="com.google.firebase.messaging.default_notification_channel_id"    android:value="@string/default_notification_channel_id" />
```

3.  **Lastly it will use the fallback `channelId` that the Firebase SDK provides for us.** FCM provides a default notification channel with basic settings out of the box. This channel will be created by the Firebase SDK upon receiving the first push message.

> **Warning** When using option 1 or 2, you are still required to create a notification channel in code with an ID that matches the one used the chosen option. You can use [`createChannel(...)`](#createchannel) for this. If you don't do this, the SDK will fallback to option 3.

## Push notifications appearance in foreground[​](#push-notifications-appearance-in-foreground "Direct link to Push notifications appearance in foreground")

You can configure the way the push notifications are displayed when the app is in foreground.

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`presentationOptions`** | `PresentationOption[]` | This is an array of strings you can combine. Possible values in the array are: - `badge`: badge count on the app icon is updated (default value) - `sound`: the device will ring/vibrate when the push notification is received - `alert`: the push notification is displayed in a native dialog An empty array can be provided if none of the options are desired. badge is only available for iOS. | 1.0.0 |

### Examples[​](#examples "Direct link to Examples")

In `capacitor.config.json`:

```
{  "plugins": {    "PushNotifications": {      "presentationOptions": ["badge", "sound", "alert"]    }  }}
```

In `capacitor.config.ts`:

```
/// <reference types="@capacitor/push-notifications" />import { CapacitorConfig } from '@capacitor/cli';const config: CapacitorConfig = {  plugins: {    PushNotifications: {      presentationOptions: ["badge", "sound", "alert"],    },  },};export default config;
```

## Silent Push Notifications / Data-only Notifications[​](#silent-push-notifications--data-only-notifications "Direct link to Silent Push Notifications / Data-only Notifications")

#### iOS[​](#ios-1 "Direct link to iOS")

This plugin does not support iOS Silent Push (Remote Notifications). We recommend using native code solutions for handling these types of notifications, see [Pushing Background Updates to Your App](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/pushing_background_updates_to_your_app).

#### Android[​](#android-1 "Direct link to Android")

This plugin does support data-only notifications, but will NOT call `pushNotificationReceived` if the app has been killed. To handle this scenario, you will need to create a service that extends `FirebaseMessagingService`, see [Handling FCM Messages](https://firebase.google.com/docs/cloud-messaging/android/receive).

## Common Issues[​](#common-issues "Direct link to Common Issues")

On Android, there are various system and app states that can affect the delivery of push notifications:

-   If the device has entered [Doze](https://developer.android.com/training/monitoring-device-state/doze-standby) mode, your application may have restricted capabilities. To increase the chance of your notification being received, consider using [FCM high priority messages](https://firebase.google.com/docs/cloud-messaging/concept-options#setting-the-priority-of-a-message).
-   There are differences in behavior between development and production. Try testing your app outside of being launched by Android Studio. Read more [here](https://stackoverflow.com/a/50238790/1351469).

* * *

## Example[​](#example "Direct link to Example")

```
import { PushNotifications } from '@capacitor/push-notifications';const addListeners = async () => {  await PushNotifications.addListener('registration', token => {    console.info('Registration token: ', token.value);  });  await PushNotifications.addListener('registrationError', err => {    console.error('Registration error: ', err.error);  });  await PushNotifications.addListener('pushNotificationReceived', notification => {    console.log('Push notification received: ', notification);  });  await PushNotifications.addListener('pushNotificationActionPerformed', notification => {    console.log('Push notification action performed', notification.actionId, notification.inputValue);  });}const registerNotifications = async () => {  let permStatus = await PushNotifications.checkPermissions();  if (permStatus.receive === 'prompt') {    permStatus = await PushNotifications.requestPermissions();  }  if (permStatus.receive !== 'granted') {    throw new Error('User denied permissions!');  }  await PushNotifications.register();}const getDeliveredNotifications = async () => {  const notificationList = await PushNotifications.getDeliveredNotifications();  console.log('delivered notifications', notificationList);}
```

## API[​](#api "Direct link to API")

-   [`register()`](#register)
-   [`unregister()`](#unregister)
-   [`getDeliveredNotifications()`](#getdeliverednotifications)
-   [`removeDeliveredNotifications(...)`](#removedeliverednotifications)
-   [`removeAllDeliveredNotifications()`](#removealldeliverednotifications)
-   [`createChannel(...)`](#createchannel)
-   [`deleteChannel(...)`](#deletechannel)
-   [`listChannels()`](#listchannels)
-   [`checkPermissions()`](#checkpermissions)
-   [`requestPermissions()`](#requestpermissions)
-   [`addListener('registration', ...)`](#addlistenerregistration-)
-   [`addListener('registrationError', ...)`](#addlistenerregistrationerror-)
-   [`addListener('pushNotificationReceived', ...)`](#addlistenerpushnotificationreceived-)
-   [`addListener('pushNotificationActionPerformed', ...)`](#addlistenerpushnotificationactionperformed-)
-   [`removeAllListeners()`](#removealllisteners)
-   [Interfaces](#interfaces)
-   [Type Aliases](#type-aliases)

### register()[​](#register "Direct link to register()")

```
register() => Promise<void>
```

Register the app to receive push notifications.

This method will trigger the `'registration'` event with the push token or `'registrationError'` if there was a problem. It does not prompt the user for notification permissions, use `requestPermissions()` first.

**Since:** 1.0.0

* * *

### unregister()[​](#unregister "Direct link to unregister()")

```
unregister() => Promise<void>
```

Unregister the app from push notifications.

This will delete a firebase token on Android, and unregister APNS on iOS.

**Since:** 5.0.0

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

**Since:** 1.0.0

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

**Since:** 1.0.0

* * *

### removeAllDeliveredNotifications()[​](#removealldeliverednotifications "Direct link to removeAllDeliveredNotifications()")

```
removeAllDeliveredNotifications() => Promise<void>
```

Remove all the notifications from the notifications screen.

**Since:** 1.0.0

* * *

### createChannel(...)[​](#createchannel "Direct link to createChannel(...)")

```
createChannel(channel: Channel) => Promise<void>
```

Create a notification channel.

Only available on Android O or newer (SDK 26+).

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

Only available on Android O or newer (SDK 26+).

| Param | Type |
| --- | --- |
| **`args`** | `{ id: string; }` |

**Since:** 1.0.0

* * *

### listChannels()[​](#listchannels "Direct link to listChannels()")

```
listChannels() => Promise<ListChannelsResult>
```

List the available notification channels.

Only available on Android O or newer (SDK 26+).

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

Check permission to receive push notifications.

On Android 12 and below the status is always granted because you can always receive push notifications. If you need to check if the user allows to display notifications, use local-notifications plugin.

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

Request permission to receive push notifications.

On Android 12 and below it doesn't prompt for permission because you can always receive push notifications.

On iOS, the first time you use the function, it will prompt the user for push notification permission and return granted or denied based on the user selection. On following calls it will get the current status of the permission without prompting again.

**Returns:**

```
Promise<PermissionStatus>
```

**Since:** 1.0.0

* * *

### addListener('registration', ...)[​](#addlistenerregistration- "Direct link to addListener('registration', ...)")

```
addListener(eventName: 'registration', listenerFunc: (token: Token) => void) => Promise<PluginListenerHandle>
```

Called when the push notification registration finishes without problems.

Provides the push notification token.

| Param | Type |
| --- | --- |
| **`eventName`** | `'registration'` |
| **`listenerFunc`** |
```
(token: Token) => void
```

 |

**Returns:**

```
Promise<PluginListenerHandle>
```

**Since:** 1.0.0

* * *

### addListener('registrationError', ...)[​](#addlistenerregistrationerror- "Direct link to addListener('registrationError', ...)")

```
addListener(eventName: 'registrationError', listenerFunc: (error: RegistrationError) => void) => Promise<PluginListenerHandle>
```

Called when the push notification registration finished with problems.

Provides an error with the registration problem.

| Param | Type |
| --- | --- |
| **`eventName`** | `'registrationError'` |
| **`listenerFunc`** |
```
(error: RegistrationError) => void
```

 |

**Returns:**

```
Promise<PluginListenerHandle>
```

**Since:** 1.0.0

* * *

### addListener('pushNotificationReceived', ...)[​](#addlistenerpushnotificationreceived- "Direct link to addListener('pushNotificationReceived', ...)")

```
addListener(eventName: 'pushNotificationReceived', listenerFunc: (notification: PushNotificationSchema) => void) => Promise<PluginListenerHandle>
```

Called when the device receives a push notification.

| Param | Type |
| --- | --- |
| **`eventName`** | `'pushNotificationReceived'` |
| **`listenerFunc`** |
```
(notification: PushNotificationSchema) => void
```

 |

**Returns:**

```
Promise<PluginListenerHandle>
```

**Since:** 1.0.0

* * *

### addListener('pushNotificationActionPerformed', ...)[​](#addlistenerpushnotificationactionperformed- "Direct link to addListener('pushNotificationActionPerformed', ...)")

```
addListener(eventName: 'pushNotificationActionPerformed', listenerFunc: (notification: ActionPerformed) => void) => Promise<PluginListenerHandle>
```

Called when an action is performed on a push notification.

| Param | Type |
| --- | --- |
| **`eventName`** | `'pushNotificationActionPerformed'` |
| **`listenerFunc`** |
```
(notification: ActionPerformed) => void
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

Remove all native listeners for this plugin.

**Since:** 1.0.0

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### DeliveredNotifications[​](#deliverednotifications "Direct link to DeliveredNotifications")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`notifications`** | `PushNotificationSchema[]` | List of notifications that are visible on the notifications screen. | 1.0.0 |

#### PushNotificationSchema[​](#pushnotificationschema "Direct link to PushNotificationSchema")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`title`** | `string` | The notification title. | 1.0.0 |
| **`subtitle`** | `string` | The notification subtitle. | 1.0.0 |
| **`body`** | `string` | The main text payload for the notification. | 1.0.0 |
| **`id`** | `string` | The notification identifier. | 1.0.0 |
| **`tag`** | `string` | The notification tag. Only available on Android (from push notifications). | 4.0.0 |
| **`badge`** | `number` | The number to display for the app icon badge. | 1.0.0 |
| **`notification`** | `any` | It's not being returned. | 1.0.0 |
| **`data`** | `any` | Any additional data that was included in the push notification payload. | 1.0.0 |
| **`click_action`** | `string` | The action to be performed on the user opening the notification. Only available on Android. | 1.0.0 |
| **`link`** | `string` | Deep link from the notification. Only available on Android. | 1.0.0 |
| **`group`** | `string` | Set the group identifier for notification grouping. Only available on Android. Works like `threadIdentifier` on iOS. | 1.0.0 |
| **`groupSummary`** | `boolean` | Designate this notification as the summary for an associated `group`. Only available on Android. | 1.0.0 |

#### Channel[​](#channel "Direct link to Channel")

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`id`** | `string` | The channel identifier. |  | 1.0.0 |
| **`name`** | `string` | The human-friendly name of this channel (presented to the user). |  | 1.0.0 |
| **`description`** | `string` | The description of this channel (presented to the user). |  | 1.0.0 |
| **`sound`** | `string` | The sound that should be played for notifications posted to this channel. Notification channels with an importance of at least `3` should have a sound. The file name of a sound file should be specified relative to the android app `res/raw` directory. |  | 1.0.0 |
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
| **`channels`** | `Channel[]` | List of all the Channels created by your app. | 1.0.0 |

#### PermissionStatus[​](#permissionstatus "Direct link to PermissionStatus")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`receive`** |
```
PermissionState
```

 | Permission state of receiving notifications. | 1.0.0 |

#### PluginListenerHandle[​](#pluginlistenerhandle "Direct link to PluginListenerHandle")

| Prop | Type |
| --- | --- |
| **`remove`** | `() => Promise<void>` |

#### Token[​](#token "Direct link to Token")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`value`** | `string` | On iOS it contains the APNS token. On Android it contains the FCM token. | 1.0.0 |

#### RegistrationError[​](#registrationerror "Direct link to RegistrationError")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`error`** | `string` | Error message describing the registration failure. | 4.0.0 |

#### ActionPerformed[​](#actionperformed "Direct link to ActionPerformed")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`actionId`** | `string` | The action performed on the notification. | 1.0.0 |
| **`inputValue`** | `string` | Text entered on the notification action. Only available on iOS. | 1.0.0 |
| **`notification`** |
```
PushNotificationSchema
```

 | The notification in which the action was performed. | 1.0.0 |

### Type Aliases[​](#type-aliases "Direct link to Type Aliases")

#### Importance[​](#importance "Direct link to Importance")

The importance level. For more details, see the [Android Developer Docs](https://developer.android.com/reference/android/app/NotificationManager#IMPORTANCE_DEFAULT)

`1 | 2 | 3 | 4 | 5`

#### Visibility[​](#visibility "Direct link to Visibility")

The notification visibility. For more details, see the [Android Developer Docs](https://developer.android.com/reference/androidx/core/app/NotificationCompat#VISIBILITY_PRIVATE)

`-1 | 0 | 1`

#### PermissionState[​](#permissionstate "Direct link to PermissionState")

`'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'`

## Contents

-   [Install](#install)
-   [iOS](#ios)
-   [Android](#android)
    -   [Variables](#variables)
-   [Push Notifications icon](#push-notifications-icon)
-   [Push Notification channel](#push-notification-channel)
-   [Push notifications appearance in foreground](#push-notifications-appearance-in-foreground)
    -   [Examples](#examples)
-   [Silent Push Notifications / Data-only Notifications](#silent-push-notifications--data-only-notifications)
-   [Common Issues](#common-issues)
-   [Example](#example)
-   [API](#api)
    -   [register()](#register)
    -   [unregister()](#unregister)
    -   [getDeliveredNotifications()](#getdeliverednotifications)
    -   [removeDeliveredNotifications(...)](#removedeliverednotifications)
    -   [removeAllDeliveredNotifications()](#removealldeliverednotifications)
    -   [createChannel(...)](#createchannel)
    -   [deleteChannel(...)](#deletechannel)
    -   [listChannels()](#listchannels)
    -   [checkPermissions()](#checkpermissions)
    -   [requestPermissions()](#requestpermissions)
    -   [addListener('registration', ...)](#addlistenerregistration-)
    -   [addListener('registrationError', ...)](#addlistenerregistrationerror-)
    -   [addListener('pushNotificationReceived', ...)](#addlistenerpushnotificationreceived-)
    -   [addListener('pushNotificationActionPerformed', ...)](#addlistenerpushnotificationactionperformed-)
    -   [removeAllListeners()](#removealllisteners)
    -   [Interfaces](#interfaces)
    -   [Type Aliases](#type-aliases)

* * *
