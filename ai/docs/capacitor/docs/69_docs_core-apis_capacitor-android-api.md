Version: v8

On this page

# Capacitor Android API

Capacitor Android is the native runtime that powers Capacitor apps on Android.

## Bridge[​](#bridge "Direct link to Bridge")

The Android bridge is the heart of the Capacitor Android library. There are several methods available on the bridge which provide information or change behavior.

When registered with Capacitor, plugins have access to the bridge:

```
this.bridge
```

* * *

### getConfig()[​](#getconfig "Direct link to getConfig()")

```
public CapConfig getConfig()
```

This property contains the configuration object known to the Capacitor runtime.

* * *

### triggerJSEvent(...)[​](#triggerjsevent "Direct link to triggerJSEvent(...)")

```
public void triggerJSEvent(final String eventName, final String target)public void triggerJSEvent(final String eventName, final String target, final String data)
```

Fire an event on a JavaScript [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) such as `window` or `document`. If possible, it is preferred to use [Plugin Events](/docs/plugins/android#plugin-events) instead.

Examples:

```
bridge.triggerJSEvent("myCustomEvent", "window");bridge.triggerJSEvent("myCustomEvent", "document", "{ 'dataKey': 'dataValue' }");
```

Note: `data` must be a serialized JSON string value.

* * *

## Passing data[​](#passing-data "Direct link to Passing data")

Notes on how to work with data that is passed between environments can be [found here](/docs/core-apis/data-types).

* * *

## Saving CAPPluginCall[​](#saving-capplugincall "Direct link to Saving CAPPluginCall")

Notes on persisting plugin calls for asynchronous or repeated operations can be [found here](/docs/core-apis/saving-calls).
