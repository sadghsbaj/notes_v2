Version: v8

On this page

# Custom Native iOS Code

With Capacitor, you are encouraged to write Swift or Objective-C code to implement the native features your app needs.

There may not be [a Capacitor plugin](/docs/plugins) for everything--and that's okay! It is possible to write WebView-accessible native code right in your app.

## WebView-Accessible Native Code[​](#webview-accessible-native-code "Direct link to WebView-Accessible Native Code")

The easiest way to communicate between JavaScript and native code is to build a custom Capacitor plugin that is local to your app.

### `EchoPlugin.swift`[​](#echopluginswift "Direct link to echopluginswift")

First, create a `EchoPlugin.swift` file by [opening Xcode](/docs/ios#opening-the-ios-project), right-clicking on the **App** group (under the **App** target), selecting **New File...** from the context menu, choosing **Swift File** in the window, and creating the file.

![New Swift File in Xcode](/docs/assets/images/xcode-new-swift-file-617ac7330b95f987e64d016f160b1c02.png)

Copy the following Swift code into `EchoPlugin.swift`:

```
import Capacitor@objc(EchoPlugin)public class EchoPlugin: CAPPlugin, CAPBridgedPlugin {    public let identifier = "EchoPlugin"    public let jsName = "Echo"    public let pluginMethods: [CAPPluginMethod] = [        CAPPluginMethod(name: "echo", returnType: CAPPluginReturnPromise)    ]    @objc func echo(_ call: CAPPluginCall) {        let value = call.getString("value") ?? ""        call.resolve(["value": value])    }}
```

> The `@objc` decorators are required to make sure Capacitor's runtime (which must use Objective-C for dynamic plugin support) can see it.

### Register the Plugin[​](#register-the-plugin "Direct link to Register the Plugin")

We must register custom plugins on both iOS and web so that Capacitor can bridge between Swift and JavaScript.

#### `MyViewController.swift`[​](#myviewcontrollerswift "Direct link to myviewcontrollerswift")

[Create a custom `MyViewController.swift`](/docs/ios/viewcontroller).

Then add a `capacitorDidLoad()` method override and register the plugin:

```
override open func capacitorDidLoad() {    bridge?.registerPluginInstance(EchoPlugin())}
```

#### JavaScript[​](#javascript "Direct link to JavaScript")

In JS, we use `registerPlugin()` from `@capacitor/core` to create an object which is linked to our Swift plugin.

```
import { registerPlugin } from '@capacitor/core';const Echo = registerPlugin('Echo');export default Echo;
```

> The first parameter to `registerPlugin()` is the plugin name, which must match the `jsName` in `EchoPlugin.swift`.

**TypeScript**

We can define types on our linked object by defining an interface and using it in the call to `registerPlugin()`.

```
 import { registerPlugin } from '@capacitor/core';+export interface EchoPlugin {+  echo(options: { value: string }): Promise<{ value: string }>;+}-const Echo = registerPlugin('Echo');+const Echo = registerPlugin<EchoPlugin>('Echo'); export default Echo;
```

The generic parameter of `registerPlugin()` is what defines the structure of the linked object. You can use `registerPlugin<any>('Echo')` to ignore types if you need to. No judgment. ❤️

### Use the Plugin[​](#use-the-plugin "Direct link to Use the Plugin")

Use the exported `Echo` object to call your plugin methods. The following snippet will call into Swift on iOS and print the result:

```
import Echo from '../path/to/echo-plugin';const { value } = await Echo.echo({ value: 'Hello World!' });console.log('Response from native:', value);
```

### Next Steps[​](#next-steps "Direct link to Next Steps")

[Read the iOS Plugin Guide ›](/docs/plugins/ios)
