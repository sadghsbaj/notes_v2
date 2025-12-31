Version: v8

On this page

# @capacitor/network

The Network API provides network and connectivity information.

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/networknpx cap sync
```

## Example[​](#example "Direct link to Example")

```
import { Network } from '@capacitor/network';Network.addListener('networkStatusChange', status => {  console.log('Network status changed', status);});const logCurrentNetworkStatus = async () => {  const status = await Network.getStatus();  console.log('Network status:', status);};
```

## API[​](#api "Direct link to API")

-   [`getStatus()`](#getstatus)
-   [`addListener('networkStatusChange', ...)`](#addlistenernetworkstatuschange-)
-   [`removeAllListeners()`](#removealllisteners)
-   [Interfaces](#interfaces)
-   [Type Aliases](#type-aliases)

### getStatus()[​](#getstatus "Direct link to getStatus()")

```
getStatus() => Promise<ConnectionStatus>
```

Query the current status of the network connection.

**Returns:**

```
Promise<ConnectionStatus>
```

**Since:** 1.0.0

* * *

### addListener('networkStatusChange', ...)[​](#addlistenernetworkstatuschange- "Direct link to addListener('networkStatusChange', ...)")

```
addListener(eventName: 'networkStatusChange', listenerFunc: ConnectionStatusChangeListener) => Promise<PluginListenerHandle>
```

Listen for changes in the network connection.

| Param | Type |
| --- | --- |
| **`eventName`** | `'networkStatusChange'` |
| **`listenerFunc`** |
```
ConnectionStatusChangeListener
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

Remove all listeners (including the network status changes) for this plugin.

**Since:** 1.0.0

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### ConnectionStatus[​](#connectionstatus "Direct link to ConnectionStatus")

Represents the state and type of the network connection.

| Prop | Type | Description | Since |
| --- | --- | --- | --- |
| **`connected`** | `boolean` | Whether there is an active connection or not. | 1.0.0 |
| **`connectionType`** |
```
ConnectionType
```

 | The type of network connection currently in use. If there is no active network connection, `connectionType` will be `'none'`. | 1.0.0 |

#### PluginListenerHandle[​](#pluginlistenerhandle "Direct link to PluginListenerHandle")

| Prop | Type |
| --- | --- |
| **`remove`** | `() => Promise<void>` |

### Type Aliases[​](#type-aliases "Direct link to Type Aliases")

#### ConnectionType[​](#connectiontype "Direct link to ConnectionType")

The type of network connection that a device might have.

`'wifi' | 'cellular' | 'none' | 'unknown'`

#### ConnectionStatusChangeListener[​](#connectionstatuschangelistener "Direct link to ConnectionStatusChangeListener")

Callback to receive the status change notifications.

```
(status: ConnectionStatus): void
```
