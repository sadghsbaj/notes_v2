Version: v8

On this page

# CapacitorCookies

The Capacitor Cookies API provides native cookie support via patching `document.cookie` to use native libraries. It also provides methods for modifying cookies at a specific url. This plugin is bundled with `@capacitor/core`.

## Configuration[​](#configuration "Direct link to Configuration")

By default, the patching of `document.cookie` to use native libraries is disabled. If you would like to enable this feature, modify the configuration below in the `capacitor.config` file.

| Prop | Type | Description | Default |
| --- | --- | --- | --- |
| **`enabled`** | `boolean` | Enable the patching of `document.cookie` to use native libraries instead. | `false` |

### Example Configuration[​](#example-configuration "Direct link to Example Configuration")

In `capacitor.config.json`:

```
{  "plugins": {    "CapacitorCookies": {      "enabled": true    }  }}
```

In `capacitor.config.ts`:

```
import { CapacitorConfig } from '@capacitor/cli';const config: CapacitorConfig = {  plugins: {    CapacitorCookies: {      enabled: true,    },  },};export default config;
```

## Example[​](#example "Direct link to Example")

```
import { CapacitorCookies } from '@capacitor/core';const getCookies = () => {  return document.cookie;};const setCookie = () => {  document.cookie = key + '=' + value;};const setCapacitorCookie = async () => {  await CapacitorCookies.setCookie({    url: 'http://example.com',    key: 'language',    value: 'en',  });};const deleteCookie = async () => {  await CapacitorCookies.deleteCookie({    url: 'https://example.com',    key: 'language',  });};const clearCookiesOnUrl = async () => {  await CapacitorCookies.clearCookies({    url: 'https://example.com',  });};const clearAllCookies = async () => {  await CapacitorCookies.clearAllCookies();};
```

## Third Party Cookies on iOS[​](#third-party-cookies-on-ios "Direct link to Third Party Cookies on iOS")

As of iOS 14, you cannot use 3rd party cookies by default. Add the following lines to your Info.plist file to get better support for cookies on iOS. You can add up to 10 domains.

```
<key>WKAppBoundDomains</key><array>  <string>www.mydomain.com</string>  <string>api.mydomain.com</string>  <string>www.myothercooldomain.com</string></array>
```

## API[​](#api "Direct link to API")

-   [`getCookies(...)`](#getcookies)
-   [`setCookie(...)`](#setcookie)
-   [`deleteCookie(...)`](#deletecookie)
-   [`clearCookies(...)`](#clearcookies)
-   [`clearAllCookies()`](#clearallcookies)
-   [Interfaces](#interfaces)
-   [Type Aliases](#type-aliases)

### getCookies(...)[​](#getcookies "Direct link to getCookies(...)")

```
getCookies(options?: GetCookieOptions) => Promise<HttpCookieMap>
```

| Param | Type |
| --- | --- |
| **`options`** |
```
GetCookieOptions
```

 |

**Returns:**

```
Promise<HttpCookieMap>
```

* * *

### setCookie(...)[​](#setcookie "Direct link to setCookie(...)")

```
setCookie(options: SetCookieOptions) => Promise<void>
```

Write a cookie to the device.

| Param | Type |
| --- | --- |
| **`options`** |
```
SetCookieOptions
```

 |

* * *

### deleteCookie(...)[​](#deletecookie "Direct link to deleteCookie(...)")

```
deleteCookie(options: DeleteCookieOptions) => Promise<void>
```

Delete a cookie from the device.

| Param | Type |
| --- | --- |
| **`options`** |
```
DeleteCookieOptions
```

 |

* * *

### clearCookies(...)[​](#clearcookies "Direct link to clearCookies(...)")

```
clearCookies(options: ClearCookieOptions) => Promise<void>
```

Clear cookies from the device at a given URL.

| Param | Type |
| --- | --- |
| **`options`** |
```
ClearCookieOptions
```

 |

* * *

### clearAllCookies()[​](#clearallcookies "Direct link to clearAllCookies()")

```
clearAllCookies() => Promise<void>
```

Clear all cookies on the device.

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### HttpCookieMap[​](#httpcookiemap "Direct link to HttpCookieMap")

#### HttpCookie[​](#httpcookie "Direct link to HttpCookie")

| Prop | Type | Description |
| --- | --- | --- |
| **`url`** | `string` | The URL of the cookie. |
| **`key`** | `string` | The key of the cookie. |
| **`value`** | `string` | The value of the cookie. |

#### HttpCookieExtras[​](#httpcookieextras "Direct link to HttpCookieExtras")

| Prop | Type | Description |
| --- | --- | --- |
| **`path`** | `string` | The path to write the cookie to. |
| **`expires`** | `string` | The date to expire the cookie. |

### Type Aliases[​](#type-aliases "Direct link to Type Aliases")

#### GetCookieOptions[​](#getcookieoptions "Direct link to GetCookieOptions")

```
Omit<HttpCookie, 'key' | 'value'>
```

#### Omit[​](#omit "Direct link to Omit")

Construct a type with the properties of T except for those in type K.

```
Pick<T, Exclude<keyof T, K>>
```

#### Pick[​](#pick "Direct link to Pick")

From T, pick a set of properties whose keys are in the union K

`{ [P in K]: T[P]; }`

#### Exclude[​](#exclude "Direct link to Exclude")

[Exclude](#exclude) from T those types that are assignable to U

`T extends U ? never : T`

#### SetCookieOptions[​](#setcookieoptions "Direct link to SetCookieOptions")

```
HttpCookie & HttpCookieExtras
```

#### DeleteCookieOptions[​](#deletecookieoptions "Direct link to DeleteCookieOptions")

```
Omit<HttpCookie, 'value'>
```

#### ClearCookieOptions[​](#clearcookieoptions "Direct link to ClearCookieOptions")

```
Omit<HttpCookie, 'key' | 'value'>
```
