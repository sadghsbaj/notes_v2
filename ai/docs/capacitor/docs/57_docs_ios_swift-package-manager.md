Version: v8

On this page

# Swift Package Manager

Swift Packages are Apple's new first-party tool for software dependencies. Traditionally Capacitor has used CocoaPods for managing dependencies internally and for plugins, however now is the time to move to a supported solution.

Since Capacitor 6, you can choose between using CocoaPods or Swift Package Manager (SPM). Almost all current capacitor-team supported plugins support SPM, namely the plugins in [capacitor-plugins](https://github.com/ionic-team/capacitor-plugins).

We've tried our best to make sure you don't have to change much about how you work with Capacitor to use SPM, but there are a few things to understand.

## How it works[​](#how-it-works "Direct link to How it works")

When a Capacitor project is using SPM we use a 'Base SPM' package that will serve as the place that references all of your projects dependencies:

![Base SPM Picture](/docs/assets/images/base-spm-7b9c60ba424f0ff6822cdbc416395de6.png)

The Capacitor CLI will modify the CapApp-SPM package when you sync new plugins. It is important you do not touch the contents here because the CLI can and will change things.

## Using SPM in a new Capacitor project[​](#using-spm-in-a-new-capacitor-project "Direct link to Using SPM in a new Capacitor project")

First we'll start with our normal `npm init @capacitor/app@latest`:

![Demo Step 1](/docs/assets/images/demo-step1-a5fe1b39eaa2c3ee519e83cd1badf68c.png)

Now we want to add the iOS platform to our project:

`npm install @capacitor/ios`

Next let's build the web project:

`npm run build`

After that is complete we can add the iOS project. We need to add the option `--packagemanager SPM` to the normal add command:

`npx cap add ios --packagemanager SPM`

Now you can use `npx cap open ios` to open the iOS project and run your app from there.

* * *

### Add and use a Capacitor Plugin with SPM[​](#add-and-use-a-capacitor-plugin-with-spm "Direct link to Add and use a Capacitor Plugin with SPM")

So let's add a plugin to this project and do something with that plugin.

Start with installing the Capacitor App plugin:

`npm install @capacitor/app`

Then let's sync the web app. This will add the App plugin SPM to the iOS project:

`npx cap sync`

You can now use the App plugin normally.

## Using SPM in an existing Capacitor Project[​](#using-spm-in-an-existing-capacitor-project "Direct link to Using SPM in an existing Capacitor Project")

First, ensure you have a backup of the current state of your project, either in source control or elsewhere.

### Deleting your iOS Directory[​](#deleting-your-ios-directory "Direct link to Deleting your iOS Directory")

If you **have not manually changed your Xcode Project at all**, one option to migrate is to delete the `ios` directory and then run `npx cap add ios --packagemanager SPM`. This will remove the CocoaPods template project and replace it with the SPM template project.

### Using our migration tool[​](#using-our-migration-tool "Direct link to Using our migration tool")

The Capacitor CLI has a command to help migrate from CocoaPods to Swift Package Manager. However, two manual steps are still required. Some things to note are: Projects with Cordova plugins should work, but some plugins may not work correctly as we have to generate a `Package.swift` file for them. In addition, projects that use capacitor plugins that do not have SPM versions available, will fail to work properly and will show a warning about the incompatible plugins during migration and when running `npx cap sync`.

To start, run `npx cap spm-migration-assistant` in the root of your project.

This tool will:

-   Run `pod deintegrate` removing CocoaPods
-   Delete the `Podfile`, `App.xcworkspace`, and `Podfile.lock`
-   Create a `CapApp-SPM` directory with the needed files
-   Generate a `Package.swift` from your plugins, and warn you if any can't be included.
-   Add a `debug.xcconfig` to your ios project directory

Then run `npx cap open ios` and you should see something similar to this:

![Migrate Step 1](/docs/assets/images/xcode-step-1-ec53158c5166656cdab591780ce60a23.png)

Highlight App, and Select the Package Dependencies tab, and on this page press the + symbol to add a dependency:

![Migrate Step 2](/docs/assets/images/xcode-step-2-36d7f3afbfad56b3a5747d3e98c3aa6e.png)

You should see something similar to the below - select Add Local... from the dialog:

![Migrate Step 3](/docs/assets/images/xcode-step-3-4daefcecf909a3773180868ff43e1c46.png)

Select CapApp-SPM in this dialog and click Add Package:

![Migrate Step 4](/docs/assets/images/xcode-step-4-4829e2614aae4abc87ee513d9343ed4e.png)

Click Add Package again when this screen shows up:

![Migrate Step 5](/docs/assets/images/xcode-step-5-0ba735e9b1741c97065bcbd951ff2342.png)

When you are done, you should see a screen like this. Now, move onto the next section about Adding `debug.xconfig`

![Migrate Step 6](/docs/assets/images/xcode-step-6-4216be06d4b8579a8da7ea7e45d45677.png)

#### Adding debug.xcconfig to project[​](#adding-debugxcconfig-to-project "Direct link to Adding debug.xcconfig to project")

From the app info tab, select Add Configuration file...

![XCConfig Step 1](/docs/assets/images/xcconfig-step1-98e49b24657d8b81dc6b20eaf0ea0913.png)

Then select the file called `debug.xcconfig`

![XCConfig Step 2](/docs/assets/images/xcconfig-step2-870255a9b576b1eac49af1a79bcbd62c.png)

Finally select xcconfig as your selection

![XCConfig Step 3](/docs/assets/images/xcconfig-step3-3429b013359970b3890593a396503426.png)

At this point you're done and can build and work as normal.

### Converting existing plugins to SPM[​](#converting-existing-plugins-to-spm "Direct link to Converting existing plugins to SPM")

If your plugin only contains Swift aside from the required `[Name]Plugin.m` and `[Name]Plugin.h` you can use the [capacitor-plugin-converter](https://github.com/ionic-team/capacitor-plugin-converter).

This tool will do the following changes:

-   Add the following required things to your main swift plugin file, `[Name]Plugin.swift`:
    -   Add Conformance to the `CAPBridgedPlugin` protocol to your class.
    -   Add 3 variables to your class. `identifier`, `jsName`, and `pluginMethods`:
        -   `identifier` will correspond to the first argument to the `CAP_PLUGIN` macro.
        -   `jsName` will correspond to the second argument to the `CAP_PLUGIN` macro.
        -   `pluginMethods` will be an array of the methods passed to the `CAP_PLUGIN` macro.
-   A `Package.swift` file will be created at the root of your plugin folder.
-   The following files will be removed as they are no longer needed:
    -   `Plugin.xcodeproj`
    -   `Plugin.xcworkspace`
    -   `Plugin/Info.plist`
    -   `PluginTests/Info.plist`
    -   `Podfile`
-   To fit SPM best practices, the Project files will be moved to `Sources` and `Tests` directories.
-   The plugins `package.json` will get the following changes:
    -   The files array will add these files or directories:
        -   `ios/Sources`
        -   `ios/Tests`
        -   `Package.swift`
    -   `verify:ios` will be changed to `xcodebuild -scheme YourPluginName -destination generic/platform=iOS` to allow it to continue to work as you expect.
-   Your plugin podspec will be changed so that `s.source_files` now points to the `Sources` directory rather than the `Plugin` directory.

See the documentation in the repository at [capacitor-plugin-converter](https://github.com/ionic-team/capacitor-plugin-converter) for more.

### Troubleshooting[​](#troubleshooting "Direct link to Troubleshooting")

After adding plugins try to 'reset package caches' in Xcode:

![Demo Step 1](/docs/assets/images/reset-package-ce37ec73326432586d2e45b61841a96e.png)
