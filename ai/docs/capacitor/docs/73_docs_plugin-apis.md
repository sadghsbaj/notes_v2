Version: v8

On this page

# Official Plugins

The Official Plugins are a set of Capacitor plugins maintained by the Capacitor team that provide access to commonly used native APIs.

The API documentation for these plugins can be found below.

## Versioning[​](#versioning "Direct link to Versioning")

### npm Tags (`latest` and `latest-X`)[​](#npm-tags-latest-and-latest-x "Direct link to npm-tags-latest-and-latest-x")

Capacitor provides special npm distribution tags to make installing compatible plugin versions easier.

-   The `latest` tag installs the most recent plugin version available.
-   Use `latest-X` (for example, `latest-7`) to install the most recent version of official Capacitor plugins compatible with Capacitor X.
-   These tags express Capacitor version compatibility, not the plugin's own version number. A plugin may be at v2 or v3 and still be the correct release for `latest-7`.
-   These tags are intended for use in `npm install` commands and will resolve to the appropriate range in your `package.json`.
-   This tagging convention applies to official Capacitor plugins and may not be consistently supported by community plugins.

**Example:**

```
npm install @capacitor/camera@latest# example: v8.0.1npm install @capacitor/device@latest-7# example: v7.0.2
```

## List of Official Plugins[​](#list-of-official-plugins "Direct link to List of Official Plugins")

-   [Action Sheet](/docs/apis/action-sheet)
-   [App Launcher](/docs/apis/app-launcher)
-   [App](/docs/apis/app)
-   [Background Runner](/docs/apis/background-runner)
-   [Barcode Scanner](/docs/apis/barcode-scanner)
-   [Browser](/docs/apis/browser)
-   [Camera](/docs/apis/camera)
-   [Clipboard](/docs/apis/clipboard)
-   [Cookies](/docs/apis/cookies)
-   [Device](/docs/apis/device)
-   [Dialog](/docs/apis/dialog)
-   [Filesystem](/docs/apis/filesystem)
-   [File Transfer](/docs/apis/file-transfer)
-   [File Viewer](/docs/apis/file-viewer)
-   [Geolocation](/docs/apis/geolocation)
-   [Google Maps](/docs/apis/google-maps)
-   [Haptics](/docs/apis/haptics)
-   [Http](/docs/apis/http)
-   [InAppBrowser](/docs/apis/inappbrowser)
-   [Keyboard](/docs/apis/keyboard)
-   [Local Notifications](/docs/apis/local-notifications)
-   [Motion](/docs/apis/motion)
-   [Network](/docs/apis/network)
-   [Preferences](/docs/apis/preferences)
-   [Privacy Screen](/docs/apis/privacy-screen)
-   [Push Notifications](/docs/apis/push-notifications)
-   [Screen Orientation](/docs/apis/screen-orientation)
-   [Screen Reader](/docs/apis/screen-reader)
-   [Share](/docs/apis/share)
-   [Splash Screen](/docs/apis/splash-screen)
-   [Status Bar](/docs/apis/status-bar)
-   [System Bars](/docs/apis/system-bars)
-   [Text Zoom](/docs/apis/text-zoom)
-   [Toast](/docs/apis/toast)
-   [Watch 🧪](/docs/apis/watch)

## GitHub[​](#github "Direct link to GitHub")

You can find the source for these plugins [on GitHub](https://github.com/ionic-team/capacitor-plugins).
