Version: v8

On this page

# Privacy Manifest

Apple recently introduced new [privacy protocols for third-party SDKs](https://developer.apple.com/news/?id=3d8a9yyh) at WWDC23, requiring SDK authors to declare approved reasons for API usage within their SDKs to enhance transparency and user privacy.

Starting March 13th, 2024, App Store Connect will notify users when a new or updated app is uploaded without approved reasons to access certain APIs.

**Starting May 1st, 2024, you will be required to include approved reasons when submitting a new or updated app to App Store Connect.**

## Steps to Meet Requirements[​](#steps-to-meet-requirements "Direct link to Steps to Meet Requirements")

Not all Applications will be flagged but certain plugins such as `@capacitor/filesystem` and `@capacitor/preferences` may necessitate a Privacy Manifest File. If you have received a notification:

1.  Update Capacitor to: a. `>= 7.0.0` for Capacitor 7 b. `>= 6.0.0` for Capacitor 6 c. `>= 5.7.4` for Capacitor 5 d. `>= 4.8.2` for Capacitor 4 e. Capacitor <= 3 is not supported
2.  Use either the VS Code Extension to create the privacy manifest file for your app or create it manually.

### VS Code Extension[​](#vs-code-extension "Direct link to VS Code Extension")

Make sure you have the [Ionic VS Code extension](https://ionic.link/vscode) installed and open your project.

Under recommendations you will see _Add Privacy Manifest_ if your application is using a plugin that uses certain APIs.

![No Manifest](/docs/assets/images/no-manifest-3802b4baee8006125243828bca03d370.png)

Choose Yes to create the bare minimum privacy manifest file.

The extension will then list all changes needed as recommendations titled _Missing Privacy Manifest Category_. For example:

![Privacy Change](/docs/assets/images/privacy-change-a048c8d2ac3dcd6ba892ac34bd998d0f.png)

You must select one of the reason codes to explain how you use the plugin. If you are unsure, click _Docs_ to go to the Apple’s documentation on the explanations of each reason code.

Please note that the VS Code extension has a set of rules for known plugins to help you. If you are still being rejected by Apple for missing privacy manifest reasons it may be that you are using a plugin that the extension does not know. You can open an issue on the [VS Code extension issue tracker](https://github.com/ionic-team/vscode-ionic/issues).

### Manual Steps[​](#manual-steps "Direct link to Manual Steps")

If you would prefer to perform the steps for creating a Privacy Manifest file manually open Xcode then:

Choose _File > New File_.

Scroll down to the _Resource_ section and select _App Privacy File_ type.

Click _Next_.

Check your app in the _Targets_ list.

Click _Create_.

A file called `PrivacyInfo.xcprivacy` will be created. This file is challenging to create interactively in the Xcode UI so it may be easier to edit it manually by right clicking it and choosing _Open with External Editor_.

As a sample file here is a `PrivacyInfo.xcprivacy` file that uses the UserDefaults API through its use of the `@capacitor/preferences` plugin.

```
<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd"><plist version="1.0">  <dict>    <key>NSPrivacyTracking</key>    <false/>    <key>NSPrivacyAccessedAPITypes</key>    <array>      <dict>        <key>NSPrivacyAccessedAPIType</key>        <string>NSPrivacyAccessedAPICategoryUserDefaults</string>        <key>NSPrivacyAccessedAPITypeReasons</key>        <array>          <string>CA92.1</string>        </array>      </dict>    </array>    <key>NSPrivacyTrackingDomains</key>    <array/>  </dict></plist>
```

To find code and plugins which may require privacy manifest changes you can use a script like [this one](https://github.com/Wooder/ios_17_required_reason_api_scanner) by running `sh required_reason_api_text_scanner.sh node_modules` .

To choose the correct reason codes (like `CA92.1` in the above example) you will need to read [Apple’s documentation](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api).

## Before Store Submission[​](#before-store-submission "Direct link to Before Store Submission")

Before App store submission you may need to disclose user tracking, tracking domains or collection of other data types that are unique for your application. See [Apple’s documentation](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files) for more information.
