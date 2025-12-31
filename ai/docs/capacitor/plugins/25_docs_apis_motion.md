Version: v8

On this page

# @capacitor/motion

The Motion API tracks accelerometer and device orientation (compass heading, etc.)

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/motionnpx cap sync
```

## Permissions[​](#permissions "Direct link to Permissions")

This plugin is currently implemented using Web APIs. Most browsers require permission before using this API. To request permission, prompt the user for permission on any user-initiated action (such as a button click):

```
import { PluginListenerHandle } from '@capacitor/core';import { Motion } from '@capacitor/motion';let accelHandler: PluginListenerHandle;myButton.addEventListener('click', async () => {  try {    await DeviceMotionEvent.requestPermission();  } catch (e) {    // Handle error    return;  }  // Once the user approves, can start listening:  accelHandler = await Motion.addListener('accel', event => {    console.log('Device motion event:', event);  });});// Stop the acceleration listenerconst stopAcceleration = () => {  if (accelHandler) {    accelHandler.remove();  }};// Remove all listenersconst removeListeners = () => {  Motion.removeAllListeners();};
```

See the [`DeviceMotionEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent) API to understand the data supplied in the 'accel' event.

## API[​](#api "Direct link to API")

-   [`addListener('accel', ...)`](#addlisteneraccel-)
-   [`addListener('orientation', ...)`](#addlistenerorientation-)
-   [`removeAllListeners()`](#removealllisteners)
-   [Interfaces](#interfaces)
-   [Type Aliases](#type-aliases)

### addListener('accel', ...)[​](#addlisteneraccel- "Direct link to addListener('accel', ...)")

```
addListener(eventName: 'accel', listenerFunc: AccelListener) => Promise<PluginListenerHandle>
```

Add a listener for accelerometer data

| Param | Type |
| --- | --- |
| **`eventName`** | `'accel'` |
| **`listenerFunc`** |
```
AccelListener
```

 |

**Returns:**

```
Promise<PluginListenerHandle>
```

**Since:** 1.0.0

* * *

### addListener('orientation', ...)[​](#addlistenerorientation- "Direct link to addListener('orientation', ...)")

```
addListener(eventName: 'orientation', listenerFunc: OrientationListener) => Promise<PluginListenerHandle>
```

Add a listener for device orientation change (compass heading, etc.)

| Param | Type |
| --- | --- |
| **`eventName`** | `'orientation'` |
| **`listenerFunc`** |
```
OrientationListener
```

 |

**Returns:**

```
Promise<PluginListenerHandle>
```

**Since:** 1.0.0

* * *

### removeAllListeners()[​](#removealllisteners "Direct link to removeAllListeners()")

```
removeAllListeners() => Promise<void>
```

Remove all the listeners that are attached to this plugin.

**Since:** 1.0.0

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### PluginListenerHandle[​](#pluginlistenerhandle "Direct link to PluginListenerHandle")

| Prop | Type |
| --- | --- |
| **`remove`** | `() => Promise<void>` |

#### AccelListenerEvent[​](#accellistenerevent "Direct link to AccelListenerEvent")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`acceleration`** |
```
Acceleration
```

 | An object giving the acceleration of the device on the three axis X, Y and Z. [Acceleration](#acceleration) is expressed in m/s | 1.0.0 |
| **`accelerationIncludingGravity`** |

```
Acceleration
```

 | An object giving the acceleration of the device on the three axis X, Y and Z with the effect of gravity. [Acceleration](#acceleration) is expressed in m/s | 1.0.0 |
| **`rotationRate`** |

```
RotationRate
```

 | An object giving the rate of change of the device's orientation on the three orientation axis alpha, beta and gamma. Rotation rate is expressed in degrees per seconds. | 1.0.0 |
| **`interval`** | `number` | A number representing the interval of time, in milliseconds, at which data is obtained from the device. | 1.0.0 |

#### Acceleration[​](#acceleration "Direct link to Acceleration")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`x`** | `number` | The amount of acceleration along the X axis. | 1.0.0 |
| **`y`** | `number` | The amount of acceleration along the Y axis. | 1.0.0 |
| **`z`** | `number` | The amount of acceleration along the Z axis. | 1.0.0 |

#### RotationRate[​](#rotationrate "Direct link to RotationRate")

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`alpha`** | `number` | The amount of rotation around the Z axis, in degrees per second. | 1.0.0 |
| **`beta`** | `number` | The amount of rotation around the X axis, in degrees per second. | 1.0.0 |
| **`gamma`** | `number` | The amount of rotation around the Y axis, in degrees per second. | 1.0.0 |

### Type Aliases[​](#type-aliases "Direct link to Type Aliases")

#### AccelListener[​](#accellistener "Direct link to AccelListener")

```
(event: AccelListenerEvent): void
```

#### OrientationListener[​](#orientationlistener "Direct link to OrientationListener")

```
(event: RotationRate): void
```

#### OrientationListenerEvent[​](#orientationlistenerevent "Direct link to OrientationListenerEvent")

```
RotationRate
```
