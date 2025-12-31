Version: v8

On this page

# Migrating a Web App Using Cordova to Capacitor

There are several steps required to fully migrate a web app using Cordova over to Capacitor.

> It's recommended to work in a separate code branch when applying these changes.

## Add Capacitor[​](#add-capacitor "Direct link to Add Capacitor")

Begin by opening your project in the terminal, then either follow the guides for [adding Capacitor to a web app](/docs/getting-started#add-capacitor-to-your-web-app) or [adding Capacitor to an Ionic app](/docs/getting-started/with-ionic#installing-capacitor-to-an-existing-ionic-project).

Initialize your app with Capacitor. Some of the information you will be prompted for is available in the Cordova `config.xml` file:

-   The app name can be found within the `<name>` element.
-   The Bundle ID can be found in the `id` attribute of the root `<widget>` element.

```
npx cap init
```

### Build your Web App[​](#build-your-web-app "Direct link to Build your Web App")

You must build your web project at least once before adding any native platforms.

```
npm run build
```

This ensures that the `www` folder that Capacitor has been [automatically configured](/docs/basics/configuring-your-app) to use as the `webDir` in the Capacitor configuration file.

### Add Platforms[​](#add-platforms "Direct link to Add Platforms")

Capacitor native platforms exist in their own top-level folders. Cordova's are located under `platforms/ios` or `platforms/android`.

```
npx cap add iosnpx cap add android
```

Both android and ios folders at the root of the project are created. These are entirely separate native project artifacts that should be considered part of your app (i.e., check them into source control, edit them in their own IDEs, etc.). Additionally, any Cordova plugins found under `dependencies` in `package.json` are automatically installed by Capacitor into each new native project (minus any [incompatible ones](/docs/plugins/cordova#known-incompatible-plugins)):

```
"dependencies": {    "@ionic-native/camera": "^5.3.0",    "@ionic-native/core": "^5.3.0",    "@ionic-native/file": "^5.3.0",    "cordova-android": "8.0.0",    "cordova-ios": "5.0.0",    "cordova-plugin-camera": "4.0.3",    "cordova-plugin-file": "6.0.1",}
```

## Splash Screens and Icons[​](#splash-screens-and-icons "Direct link to Splash Screens and Icons")

If you've previously created icon and splash screen images, they can be found in the top-level `resources` folder of your project. With those images in place, you can use the `@capacitor/assets` tool to generate icons and splash screens for Capacitor-based iOS and Android projects.

Run the following to regenerate the images and copy them into the native projects:

```
npx @capacitor/assets generate --iosnpx @capacitor/assets generate --android
```

[Complete details here](https://github.com/ionic-team/capacitor-assets).

## Migrate Plugins[​](#migrate-plugins "Direct link to Migrate Plugins")

Begin by auditing your existing Cordova plugins - it's possible that you may be able to remove ones that are no longer needed.

Next, review all of Capacitor's [official plugins](/docs/apis) as well as [community plugins](/docs/plugins/community). You may be able to switch to the Capacitor-equivalent Cordova plugin.

Some plugins may not match functionality entirely, but based on the features you need that may not matter.

Note that any plugins that are [incompatible or cause build issues](/docs/plugins/cordova#known-incompatible-plugins) are automatically skipped.

### Remove Cordova Plugin[​](#remove-cordova-plugin "Direct link to Remove Cordova Plugin")

After replacing a Cordova plugin with a Capacitor one (or simply removing it entirely), uninstall the plugin then run the `sync` command to remove the plugin code from a native project:

```
npm uninstall cordova-plugin-namenpx cap sync
```

## Set Permissions[​](#set-permissions "Direct link to Set Permissions")

By default, the entire initial permissions requested for the latest version of Capacitor are set for you in the default native projects for both iOS and Android. However, you may need to apply additional permissions manually by mapping between `plugin.xml` and required settings on iOS and Android. Consult the [iOS](/docs/ios/configuration) and [Android](/docs/android/configuration) configuration guides for info on how to configure each platform.

## Cordova Plugin preferences[​](#cordova-plugin-preferences "Direct link to Cordova Plugin preferences")

When `npx cap init` is run, Capacitor reads all the preferences in `config.xml` and ports them to the [Capacitor configuration file](/docs/config). You can manually add more preferences to the `cordova.preferences` object.

```
{  "cordova": {    "preferences": {      "DisableDeploy": "true",      "CameraUsesGeolocation": "true"    }  }}
```

## Additional Fields from `config.xml`[​](#additional-fields-from-configxml "Direct link to additional-fields-from-configxml")

You may be curious about how other elements from `config.xml` work in Capacitor apps.

The Author element can be configured in `package.json`, but is not used by Capacitor or within your app:

```
<author email="email@test.com" href="http://ionicframework.com/">Ionic Framework Team</author>
```

Most of the `allow-intent` values are either not used or there are [configurable alternatives](/docs/basics/configuring-your-app).

```
<allow-intent href="http://*/*" /><allow-intent href="https://*/*" /><allow-intent href="tel:*" /><allow-intent href="sms:*" /><allow-intent href="mailto:*" /><allow-intent href="geo:*" />
```

iOS `edit-config` elements need to be [configured in Info.plist](/docs/ios/configuration).

```
<edit-config file="*-Info.plist" mode="merge" target="NSCameraUsageDescription">    <string>Used to take photos</string></edit-config>
```

It's impossible to cover every `config.xml` element available. However, most questions relating to "How do I configure X in Capacitor?" should be thought of as "How do I configure X in \[platform\] (iOS/Android)?" when searching online for answers.

## Setting Scheme[​](#setting-scheme "Direct link to Setting Scheme")

When using Ionic with Cordova, your app uses `cordova-plugin-ionic-webview` by default, which on iOS uses `ionic://` scheme for serving the content. Capacitor apps use `capacitor://` as default scheme on iOS. This means that using a origin-binded Web API like LocalStorage, will result in a loss of data as the origin is different. This can be fixed by changing the scheme that is used for serving the content:

```
{  "server": {    "iosScheme": "ionic"  }}
```

## Removing Cordova[​](#removing-cordova "Direct link to Removing Cordova")

Once you've tested that all migration changes have been applied and the app is working well, Cordova can be removed from the project. Delete `config.xml` as well as the `platforms` and `plugins` folders. Note that you don't technically have to remove Cordova, since Capacitor works alongside it. In fact, if you plan to continue using Cordova plugins or think you may in the future, you can leave the Cordova assets where they are.

## Next Steps[​](#next-steps "Direct link to Next Steps")

This is just the beginning of your Capacitor journey. Learn more about [using Cordova plugins](/docs/plugins/cordova) in a Capacitor project or more details on the Capacitor [development workflow](/docs/basics/workflow).
