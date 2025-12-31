Version: v8

On this page

# Custom ViewController

Since Capacitor 3.0, you can subclass `CAPBridgeViewController` within your application. Most applications do not need this feature but it provides a supported mechanism for addressing some use-cases.

## When to create a subclass[​](#when-to-create-a-subclass "Direct link to When to create a subclass")

Some examples of when subclassing would be necessary are overriding Capacitor's configuration values at run-time, changing the properties of the [`WKWebViewConfiguration`](https://developer.apple.com/documentation/webkit/wkwebviewconfiguration), subsituting a custom subclass of [`WKWebView`](https://developer.apple.com/documentation/webkit/wkwebview) for Capacitor to use, integrating a 3rd party SDK that suggests adding code to [`viewDidLoad()`](https://developer.apple.com/documentation/uikit/uiviewcontroller/1621495-viewdidload), manipulating native views before they appear onscreen, or [registering custom plugins](/docs/ios/custom-code).

If you do need to create a custom subclass, there are a couple of steps to get started.

### Create `MyViewController.swift`[​](#create-myviewcontrollerswift "Direct link to create-myviewcontrollerswift")

First, create a `MyViewController.swift` file by [opening Xcode](/docs/ios#opening-the-ios-project), right-clicking on the **App** group (under the **App** target), selecting **New File...** from the context menu, choosing **Cocoa Touch Class** in the window, set the **Subclass of:** to `UIViewController` in the next screen, and save the file.

![New ViewController in Xcode](/docs/assets/images/xcode-create-viewcontroller-df74f96e1a5d5640f6e9c6b5fc07040b.png) ![Name ViewController in Xcode](/docs/assets/images/xcode-name-viewcontroller-d7fe79edd3e838a8ca4a469fbef4dd0d.png)

### Edit `Main.storyboard`[​](#edit-mainstoryboard "Direct link to edit-mainstoryboard")

Next, select the `Main.storyboard` file in the Project Navigator, select the **Bridge View Controller** in the **Bridge View Controller Scene**, select the **Identity Inspector** on the right, and change the name of the custom class to `MyViewController`.

![Editing Storyboard in Xcode](/docs/assets/images/xcode-edit-storyboard-4cf3fb4df80b7e45cfd99ee5b5c66fbe.png)

### Edit `MyViewController.swift`[​](#edit-myviewcontrollerswift "Direct link to edit-myviewcontrollerswift")

Finally, select the `MyViewController.swift` file in the Project Navigator and edit it to import Capacitor and change the parent class:

```
import UIKitimport Capacitorclass MyViewController: CAPBridgeViewController {    // additional code}
```

You're done!

### Next Steps[​](#next-steps "Direct link to Next Steps")

Xcode should have already created a `viewDidLoad()` method for you when it generated the file but look over the inline documentation in [`CAPBridgeViewController`](https://github.com/ionic-team/capacitor/blob/main/ios/Capacitor/Capacitor/CAPBridgeViewController.swift) to find the Capacitor-specific methods you might need. Anything marked `open` is explicitly exposed for subclasses to override.
