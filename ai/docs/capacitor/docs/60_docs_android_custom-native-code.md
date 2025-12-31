Version: v8

On this page

# Custom Native Android Code

With Capacitor, you are encouraged to write Java or Kotlin code to implement the native features your app needs.

There may not be [a Capacitor plugin](/docs/plugins) for everything--and that's okay! It is possible to write WebView-accessible native code right in your app.

## WebView-Accessible Native Code[​](#webview-accessible-native-code "Direct link to WebView-Accessible Native Code")

The easiest way to communicate between JavaScript and native code is to build a custom Capacitor plugin that is local to your app.

### `EchoPlugin.java`[​](#echopluginjava "Direct link to echopluginjava")

First, create a `EchoPlugin.java` file by [opening Android Studio](/docs/android#opening-the-android-project), expanding the **app** module and the **java** folder, right-clicking on your app's Java package, selecting **New** -> **Java Class** from the context menu, and creating the file.

![Android Studio app package](/docs/assets/images/studio-app-package-d8ea69501afb5af58ed1fddd0d007cbe.png)

Copy the following Java code into `EchoPlugin.java`:

```
package com.example.myapp;import com.getcapacitor.JSObject;import com.getcapacitor.Plugin;import com.getcapacitor.PluginCall;import com.getcapacitor.PluginMethod;import com.getcapacitor.annotation.CapacitorPlugin;@CapacitorPlugin(name = "Echo")public class EchoPlugin extends Plugin {    @PluginMethod()    public void echo(PluginCall call) {        String value = call.getString("value");        JSObject ret = new JSObject();        ret.put("value", value);        call.resolve(ret);    }}
```

### Register the Plugin[​](#register-the-plugin "Direct link to Register the Plugin")

We must register custom plugins on both Android and web so that Capacitor can bridge between Java and JavaScript.

#### `MainActivity.java`[​](#mainactivityjava "Direct link to mainactivityjava")

In your app's `MainActivity.java`, use `registerPlugin()` or `registerPlugins()` to register your custom plugin(s).

```
 public class MainActivity extends BridgeActivity {     @Override     public void onCreate(Bundle savedInstanceState) {+        registerPlugin(EchoPlugin.class);         super.onCreate(savedInstanceState);     } }
```

#### JavaScript[​](#javascript "Direct link to JavaScript")

In JS, we use `registerPlugin()` from `@capacitor/core` to create an object which is linked to our Java plugin.

```
import { registerPlugin } from '@capacitor/core';const Echo = registerPlugin('Echo');export default Echo;
```

> The first parameter to `registerPlugin()` is the plugin name, which must match the `name` attribute of our `@CapacitorPlugin` annotation in `EchoPlugin.java`.

**TypeScript**

We can define types on our linked object by defining an interface and using it in the call to `registerPlugin()`.

```
 import { registerPlugin } from '@capacitor/core';+export interface EchoPlugin {+  echo(options: { value: string }): Promise<{ value: string }>;+}-const Echo = registerPlugin('Echo');+const Echo = registerPlugin<EchoPlugin>('Echo'); export default Echo;
```

The generic parameter of `registerPlugin()` is what defines the structure of the linked object. You can use `registerPlugin<any>('Echo')` to ignore types if you need to. No judgment. ❤️

### Use the Plugin[​](#use-the-plugin "Direct link to Use the Plugin")

Use the exported `Echo` object to call your plugin methods. The following snippet will call into Java on Android and print the result:

```
import Echo from '../path/to/echo-plugin';const { value } = await Echo.echo({ value: 'Hello World!' });console.log('Response from native:', value);
```

### Next Steps[​](#next-steps "Direct link to Next Steps")

[Read the Android Plugin Guide ›](/docs/plugins/android)
