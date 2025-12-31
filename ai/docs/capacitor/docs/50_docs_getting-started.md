Version: v8

On this page

# Capacitor iOS Documentation

Capacitor features a native iOS runtime that enables developers to communicate between JavaScript and Native Swift or Objective-C code.

Capacitor iOS apps are configured and managed with Xcode and [CocoaPods](https://cocoapods.org/).

## iOS Support[​](#ios-support "Direct link to iOS Support")

iOS 15+ is supported. Xcode 26.0+ is required (see [Environment Setup](/docs/getting-started/environment-setup#ios-requirements)). Capacitor uses [WKWebView](https://developer.apple.com/documentation/webkit/wkwebview), not the deprecated [UIWebView](https://developer.apple.com/documentation/uikit/uiwebview).

## Adding the iOS Platform[​](#adding-the-ios-platform "Direct link to Adding the iOS Platform")

First, install the `@capacitor/ios` package.

```
npm install @capacitor/ios
```

Then, add the iOS platform.

```
npx cap add ios
```

## Opening the iOS Project[​](#opening-the-ios-project "Direct link to Opening the iOS Project")

To open the project in Xcode, run:

```
npx cap open ios
```

Alternatively, you can open Xcode manually by running:

```
open ios/App/App.xcworkspace
```

## Running Your App[​](#running-your-app "Direct link to Running Your App")

You can either run your app on the command-line or with Xcode.

### Running on the Command-Line[​](#running-on-the-command-line "Direct link to Running on the Command-Line")

To run the project on a device or simulator, run:

```
npx cap run ios
```

The command will prompt you to select a target. [Learn more about `run`](/docs/cli/commands/run).

### Running in Xcode[​](#running-in-xcode "Direct link to Running in Xcode")

In Xcode, first select the device or simulator and then click the play button to run your app.

![Running your app](/docs/assets/images/running-73a1e8445eed0b82f25162277223276e.png)

## Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

If you encountered any issues while getting started, you can consult the [iOS Troubleshooting Guide](/docs/ios/troubleshooting). Feel free to [open a discussion](https://github.com/ionic-team/capacitor/discussions/) if you need help.

## Next steps[​](#next-steps "Direct link to Next steps")

You are now ready to continue developing and building your app. Use the various APIs available, Capacitor or Cordova plugins, or custom native code to build out the rest of your app.

## Further Reading[​](#further-reading "Direct link to Further Reading")

Follow these guides for more information on each topic:

[Configuring and setting permissions for iOS ›](/docs/ios/configuration)

[Building Native Plugins for iOS ›](/docs/plugins/ios)
