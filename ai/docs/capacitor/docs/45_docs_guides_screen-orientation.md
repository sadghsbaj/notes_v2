Version: v8

On this page

# Screen Orientation

## Screen Orientation in your Capacitor App[​](#screen-orientation-in-your-capacitor-app "Direct link to Screen Orientation in your Capacitor App")

Many apps work well in portrait and landscape device orientations. However, many don't, and there are good reasons to require an app to function solely or occasionally in one mode or the other.

## Global Orientation Settings[​](#global-orientation-settings "Direct link to Global Orientation Settings")

To set a global setting for orientation in your Capacitor app, you'll set the configuration value necessary for the platform you're targeting.

### iOS Configuration[​](#ios-configuration "Direct link to iOS Configuration")

iOS allows for different screen orientations to be supported on iPhones and iPads. To limit the allowed orientations for iOS, open Xcode and open the `Info.plist` file. Find the following keys: `Supported interface orientation` and `Supported interface orientation (iPad)`. Using these values, specify the different orientations you would like supported for iPhones and for iPads.

If editting the `Info.plist` file directly look for the following keys: `UISupportedInterfaceOrientations` and `UISupportedInterfaceOrientations~ipad`. For example, the following settings will limit the orientation to right-side-up `Portrait` on iPhones and either of the `Landscape` orientations on iPads:

```
  <key>UISupportedInterfaceOrientations</key>  <array>    <string>UIInterfaceOrientationPortrait</string>  </array>  <key>UISupportedInterfaceOrientations~ipad</key>  <array>    <string>UIInterfaceOrientationLandscapeRight</string>    <string>UIInterfaceOrientationLandscapeLeft</string>  </array>
```

### Android Configuration[​](#android-configuration "Direct link to Android Configuration")

On Android, orientation can be set by modifying the `AndroidManifest.xml` and setting `android:screenOrientation` on the `<activity>` entry for your main app activity. See the [Android Manifest Documentation](https://developer.android.com/guide/topics/manifest/activity-element#screen) for details on the possible entries.

## Dynamic Orientation Settings[​](#dynamic-orientation-settings "Direct link to Dynamic Orientation Settings")

Many apps need to support multiple orientations, with the ability to lock orientations occasionally depending on the content.

Capacitor supports this through the `@capacitor/screen-orientation` plugin:

```
npm install @capacitor/screen-orientationnpx cap sync
```

Then, use the `lock` and `unlock` methods:

```
import { ScreenOrientation } from '@capacitor/screen-orientation';...await ScreenOrientation.lock({ orientation: 'portrait' });await ScreenOrientation.lock({ orientation: 'landscape' });// To unlock orientation which will default back to the global setting:await ScreenOrientation.unlock();
```

See the [Orientation Plugin Docs](https://capacitorjs.com/docs/apis/screen-orientation) for the full range of possible orientation values and configuration options.

### iPad Orientation Lock[​](#ipad-orientation-lock "Direct link to iPad Orientation Lock")

By default, an iPad allows Multitasking and its orientation cannot be locked. If you need to lock orientation on an iPad set the option `Requires Full Screen` to `YES` by adding the following to `Info.plist`:

```
	<key>UIRequiresFullScreen</key>	<true/>
```
