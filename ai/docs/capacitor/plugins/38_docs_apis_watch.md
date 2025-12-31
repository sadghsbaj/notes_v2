Version: v8

On this page

# @capacitor/watch

[![](https://img.shields.io/github/actions/workflow/status/ionic-team/capacitor/ci.yml?style=flat-square)](https://github.com/ionic-team/capacitorwatch/actions?query=workflow%3ACI) [![](https://img.shields.io/npm/dw/@capacitor/watch?style=flat-square)](https://www.npmjs.com/package/@capacitor/watch) [![](https://img.shields.io/npm/v/@capacitor/watch?style=flat-square)](https://www.npmjs.com/package/@capacitor/watch) [![](https://img.shields.io/npm/l/@capacitor/watch?style=flat-square)](https://www.npmjs.com/package/@capacitor/watch)

[![](https://img.shields.io/static/v1?label=docs&message=capacitorjs.com&color=blue&style=flat-square)](https://capacitorjs.com/docs) [![](https://img.shields.io/twitter/follow/capacitorjs)](https://twitter.com/capacitorjs)

* * *

_CapacitorLABS_ - This project is experimental. Support is not provided. Please open issues when needed.

* * *

The Capacitor Watch plugin allows you to define a UI for a watch in your web code and show it on a paired watch.

This currently only supports iOS. This guide assumes you've already added iOS to your capcacitor project.

Also note - all of this will only work with an actual Apple Watch. Simulators don't allow the app<->watch communcation like real devices do.

## Install[​](#install "Direct link to Install")

Step 1

Add the watch plugin to your capacitor project, and then open the Xcode project:

```
npm install @capacitor/watchnpx cap syncnpx cap open ios
```

Step 2

Go to add capabilities:

![](https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/add-capability.png)

Add the 'Background Modes' and 'Push Notification' capabilities. Then in the Background Modes options, select 'Background Fetch', 'Remote Notifications', and 'Background Processing'. Your App target should look like this:

![](https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/capabilities-final.png)

Step 3

Open `AppDelegate.swift` and add `import WatchConnectivity` and `import CapactiorWatch` to the top of the file, and the following code inside the `application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?)` method:

```
assert(WCSession.isSupported(), "This sample requires Watch Connectivity support!")WCSession.default.delegate = CapWatchSessionDelegate.sharedWCSession.default.activate()
```

Step 4

Select File -> New -> Target in Xcode, and then the watchOS tab, and 'App':

![](https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/target-watch.png)

Click 'Next' then fill out the options like so:

![](https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-target-options.png)

This dialog can be a little confusing, the key thing is your 'Bundle Identifier' must be `[your apps bundle ID].watchapp` for the watch<->app pairing to work. You must also pick SwiftUI for the Interface and Swift for the language. The project should be `App`.

Step 5

We're going to add the code that makes Capacitor Watch work in the watch application.

* * *

If you are using **Xcode 15 or beyond** you then need to add the Capacitor Watch Swift Package from your node\_modules:

First go to the project package dependancies

![](https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-project-dependancies.png)

Then choose 'Add Local'

![](https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-add-local.png)

Then navigate into the `node_modules/@capacitor/watch/CapWatch-Watch-SPM` folder and click 'Add Package'

![](https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-nav-to-package.png)

Then in the column on the right pick your watch app to be the target and click 'Add Package'

![](https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-pick-target.png)

Once this is done your Package Dependancies should look like this:

![](https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/spm-finished.png)

* * *

With **Xcode 14** you will need to go here [https://github.com/ionic-team/CapacitorWatch/tree/main/packages/iOS-capWatch-watch/Sources/iOS-capWatch-watch](https://github.com/ionic-team/CapacitorWatch/tree/main/packages/iOS-capWatch-watch/Sources/iOS-capWatch-watch) and copy all the files into your Watch project and make sure the target selected is your watch app. It should look like so:

![](https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-sources-added.png)

Step 6

Then open the watch app's 'Main' file which should be `watchappApp.swift`. Add the lines `import WatchConnectivity` and `import iOS_capWatch_watch` above the `@main` statement. Then replace the line that says `ContentView()` with this:

The finished file should look like this:

```
import SwiftUIimport WatchConnectivityimport iOS_capWatch_watch@mainstruct watchddgg_Watch_AppApp: App {    var body: some Scene {        WindowGroup {            CapWatchContentView()                .onAppear {                    assert(WCSession.isSupported(), "This sample requires Watch Connectivity support!")                    WCSession.default.delegate = WatchViewModel.shared                    WCSession.default.activate()                }        }    }}
```

Step 7

Add the 'Background Modes' capability to the watch app target, and enable 'Remote Notifications':

![](https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/watch-remote-not.png)

You should be ready to develop for Capcacitor Watch now!

## Development workflow[​](#development-workflow "Direct link to Development workflow")

You can still develop your iOS app like a normal capacitor app, but getting things to run on the watch requires you to change the target and destination in Xcode. You can change this with the 'Target Dropdown' near the center-top of Xcode:

![](https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/target-dropdown.png)

The right half of this bar lets you pick the destination device or simulator. You will need to pick the watch paired with the phone and then hit the 'Run' button or use the 'cmd+r' run shortcut.

There can be some challenges in syncing the watch and phone apps. Sometimes you will get an error in the xcode console complaining the compainion app is not present. The best solution in this case is to re-build and re-install the apps on both devices.

## Building the watch UI and sending it to the watch[​](#building-the-watch-ui-and-sending-it-to-the-watch "Direct link to Building the watch UI and sending it to the watch")

You will use a long string to define the watch UI. A newline delimits components. Currently this plugin only supports a vertical scroll view of either Text or Button components.

Once you've defined your UI you can send it to the watch using the `updateWatchUI()` method:

```
async uploadMyWatchUI() {    const watchUI =         `Text("Capacitor WATCH")         Button("Add One", "inc")`;    await Watch.updateWatchUI({"watchUI": watchUI});}
```

Will produce this:

![](https://raw.githubusercontent.com/ionic-team/CapacitorWatch/main/img/example-watchui.png)

## Communicating with the watch[​](#communicating-with-the-watch "Direct link to Communicating with the watch")

This article provides a great summary on the native methods and their implications: [https://alexanderweiss.dev/blog/2023-01-18-three-ways-to-communicate-via-watchconnectivity](https://alexanderweiss.dev/blog/2023-01-18-three-ways-to-communicate-via-watchconnectivity)

On the phone side, you can implement these methods using the Capacitor Background Runner Plugin ([https://github.com/ionic-team/capacitor-background-runner](https://github.com/ionic-team/capacitor-background-runner)). Currently the watch plugin will mainly handle the `didReceiveUserInfo` method, and you can recieve envents from the watch while your app is in the background using the following code in your runner.js:

```
addEventListener("WatchConnectivity_didReceiveUserInfo", (args) => {  console.log(args.message.jsCommand);})
```

You can also implment the `runCommand` event listener for foreground procesing:

```
Watch.addListener("runCommand", (data: {command: string}) => {  console.log("PHONE got command - " + data.command);})
```

The commands are the 2nd paramter in the `Button()` definition of the watch UI. This can be any string.

## Updating watch data[​](#updating-watch-data "Direct link to Updating watch data")

You can add variables to `Text()` elements by using a `$` variable and updating with the `updateWatchData` command:

```
Text("Show my $number")
```

This example will update `$number` when executed:

```
var stateData = {  number: 0}async function counterIncrement() {  stateData.counter++    await Watch.updateWatchData({"data": convertValuesOfObjectToStringValues(stateData)})}
```

# Persistance on the Watch

Capacitor Watch will persist the last UI you sent with `updateWatchUI()`. State from `updateWatchData()` is NOT preserved.

## Install[​](#install-1 "Direct link to Install")

```
npm install @capacitor/watchnpx cap sync
```

## API[​](#api "Direct link to API")

-   [`addListener('runCommand', ...)`](#addlistenerruncommand-)
-   [`updateWatchUI(...)`](#updatewatchui)
-   [`updateWatchData(...)`](#updatewatchdata)
-   [Interfaces](#interfaces)

### addListener('runCommand', ...)[​](#addlistenerruncommand- "Direct link to addListener('runCommand', ...)")

```
addListener(eventName: 'runCommand', listenerFunc: (data: { command: string; }) => void) => Promise<PluginListenerHandle> & PluginListenerHandle
```

Listen for a command from the watch

| Param | Type |
| --- | --- |
| **`eventName`** | `'runCommand'` |
| **`listenerFunc`** | `(data: { command: string; }) => void` |

**Returns:**

```
Promise<PluginListenerHandle> & PluginListenerHandle
```

* * *

### updateWatchUI(...)[​](#updatewatchui "Direct link to updateWatchUI(...)")

```
updateWatchUI(options: { watchUI: string; }) => Promise<void>
```

Replaces the current watch UI with watchUI

| Param | Type |
| --- | --- |
| **`options`** | `{ watchUI: string; }` |

* * *

### updateWatchData(...)[​](#updatewatchdata "Direct link to updateWatchData(...)")

```
updateWatchData(options: { data: { [key: string]: string; }; }) => Promise<void>
```

Updates the watch's state data

| Param | Type |
| --- | --- |
| **`options`** | `{ data: { [key: string]: string; }; }` |

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### PluginListenerHandle[​](#pluginlistenerhandle "Direct link to PluginListenerHandle")

| Prop | Type |
| --- | --- |
| **`remove`** | `() => Promise<void>` |

## Contents

-   [Install](#install)
-   [Development workflow](#development-workflow)
-   [Building the watch UI and sending it to the watch](#building-the-watch-ui-and-sending-it-to-the-watch)
-   [Communicating with the watch](#communicating-with-the-watch)
-   [Updating watch data](#updating-watch-data)
-   [Install](#install-1)
-   [API](#api)
    -   [addListener('runCommand', ...)](#addlistenerruncommand-)
    -   [updateWatchUI(...)](#updatewatchui)
    -   [updateWatchData(...)](#updatewatchdata)
    -   [Interfaces](#interfaces)

* * *
