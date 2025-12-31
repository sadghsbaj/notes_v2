Version: v8

On this page

# @capacitor/google-maps

Google maps on Capacitor

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/google-mapsnpx cap sync
```

## API Keys[​](#api-keys "Direct link to API Keys")

To use the Google Maps SDK on any platform, API keys associated with an account _with billing enabled_ are required. These can be obtained from the [Google Cloud Console](https://console.cloud.google.com). This is required for all three platforms, Android, iOS, and Javascript. Additional information about obtaining these API keys can be found in the [Google Maps documentation](https://developers.google.com/maps/documentation/android-sdk/overview) for each platform.

## iOS[​](#ios "Direct link to iOS")

The Google Maps SDK supports the use of showing the users current location via `enableCurrentLocation(bool)`. To use this, Apple requires privacy descriptions to be specified in `Info.plist`:

-   `NSLocationWhenInUseUsageDescription` (`Privacy - Location When In Use Usage Description`)

Read about [Configuring `Info.plist`](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) in the [iOS Guide](https://capacitorjs.com/docs/ios) for more information on setting iOS permissions in Xcode.

### Typescript Configuration[​](#typescript-configuration "Direct link to Typescript Configuration")

Your project will also need have `skipLibCheck` set to `true` in `tsconfig.json`.

### Migrating from older versions[​](#migrating-from-older-versions "Direct link to Migrating from older versions")

> The main Google Maps SDK now supports running on simulators on Apple Silicon Macs, but make sure you have the latest version of [Google-Maps-iOS-Utils](https://github.com/googlemaps/google-maps-ios-utils) installed.

If you added the previous workaround for getting the unreleased version, you can delete it now by removing this line from `ios/App/Podfile`:

```
pod 'Google-Maps-iOS-Utils', :git => 'https://github.com/googlemaps/google-maps-ios-utils.git', :commit => '637954e5bcb2a879c11a6f2cead153a6bad5339f'
```

Then run `pod update Google-Maps-iOS-Utils` from the `ios/App/` folder:

```
cd ios/Apppod update Google-Maps-iOS-Utils
```

## Android[​](#android "Direct link to Android")

The Google Maps SDK for Android requires you to add your API key to the AndroidManifest.xml file in your project.

```
<meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_API_KEY_HERE"/>
```

To use certain location features, the SDK requires the following permissions to also be added to your AndroidManifest.xml:

```
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" /><uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

### Variables[​](#variables "Direct link to Variables")

This plugin will use the following project variables (defined in your app's `variables.gradle` file):

-   `googleMapsPlayServicesVersion`: version of `com.google.android.gms:play-services-maps` (default: `19.2.0`)
-   `googleMapsUtilsVersion`: version of `com.google.maps.android:android-maps-utils` (default: `3.19.1`)
-   `googleMapsKtxVersion`: version of `com.google.maps.android:maps-ktx` (default: `5.2.1`)
-   `googleMapsUtilsKtxVersion`: version of `com.google.maps.android:maps-utils-ktx` (default: `5.2.1`)
-   `kotlinxCoroutinesVersion`: version of `org.jetbrains.kotlinx:kotlinx-coroutines-android` and `org.jetbrains.kotlinx:kotlinx-coroutines-core` (default: `1.10.2`)
-   `androidxCoreKTXVersion`: version of `androidx.core:core-ktx` (default: `1.17.0`)
-   `kotlin_version`: version of `org.jetbrains.kotlin:kotlin-stdlib` (default: `2.2.20`)

## Usage[​](#usage "Direct link to Usage")

The Google Maps Capacitor plugin ships with a web component that must be used to render the map in your application as it enables us to embed the native view more effectively on iOS. The plugin will automatically register this web component for use in your application.

> For Angular users, you will get an error warning that this web component is unknown to the Angular compiler. This is resolved by modifying the module that declares your component to allow for custom web components.
>
> ```
> import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';@NgModule({  schemas: [CUSTOM_ELEMENTS_SCHEMA]})
> ```

Include this component in your HTML and assign it an ID so that you can easily query for that element reference later.

```
<capacitor-google-map id="map"></capacitor-google-map>
```

> On Android, the map is rendered beneath the entire webview, and uses this component to manage its positioning during scrolling events. This means that as the developer, you _must_ ensure that the webview is transparent all the way through the layers to the very bottom. In a typically Ionic application, that means setting transparency on elements such as IonContent and the root HTML tag to ensure that it can be seen. If you can't see your map on Android, this should be the first thing you check.
>
> On iOS, we render the map directly into the webview and so the same transparency effects are not required. We are investigating alternate methods for Android still and hope to resolve this better in a future update.

The Google Map element itself comes unstyled, so you should style it to fit within the layout of your page structure. Because we're rendering a view into this slot, by itself the element has no width or height, so be sure to set those explicitly.

```
capacitor-google-map {  display: inline-block;  width: 275px;  height: 400px;}
```

Next, we should create the map reference. This is done by importing the GoogleMap class from the Capacitor plugin and calling the create method, and passing in the required parameters.

```
import { GoogleMap } from '@capacitor/google-maps';const apiKey = 'YOUR_API_KEY_HERE';const mapRef = document.getElementById('map');const newMap = await GoogleMap.create({  id: 'my-map', // Unique identifier for this map instance  element: mapRef, // reference to the capacitor-google-map element  apiKey: apiKey, // Your Google Maps API Key  config: {    center: {      // The initial position to be rendered by the map      lat: 33.6,      lng: -117.9,    },    zoom: 8, // The initial zoom level to be rendered by the map  },});
```

At this point, your map should be created within your application. Using the returned reference to the map, you can easily interact with your map in a number of way, a few of which are shown here.

```
const newMap = await GoogleMap.create({...});// Add a marker to the mapconst markerId = await newMap.addMarker({  coordinate: {    lat: 33.6,    lng: -117.9  }});// Move the map programmaticallyawait newMap.setCamera({  coordinate: {    lat: 33.6,    lng: -117.9  }});// Enable marker clusteringawait newMap.enableClustering();// Handle marker clickawait newMap.setOnMarkerClickListener((event) => {...});// Clean up map referenceawait newMap.destroy();
```

## Full Examples[​](#full-examples "Direct link to Full Examples")

### Angular[​](#angular "Direct link to Angular")

```
import { GoogleMap } from '@capacitor/google-maps';@Component({  template: `    <capacitor-google-map #map></capacitor-google-map>    <button (click)="createMap()">Create Map</button>  `,  styles: [    `      capacitor-google-map {        display: inline-block;        width: 275px;        height: 400px;      }    `,  ],})export class MyMap {  @ViewChild('map')  mapRef: ElementRef<HTMLElement>;  newMap: GoogleMap;  async createMap() {    this.newMap = await GoogleMap.create({      id: 'my-cool-map',      element: this.mapRef.nativeElement,      apiKey: environment.apiKey,      config: {        center: {          lat: 33.6,          lng: -117.9,        },        zoom: 8,      },    });  }}
```

### React[​](#react "Direct link to React")

```
import { GoogleMap } from '@capacitor/google-maps';import { useRef } from 'react';const MyMap: React.FC = () => {  const mapRef = useRef<HTMLElement>();  let newMap: GoogleMap;  async function createMap() {    if (!mapRef.current) return;    newMap = await GoogleMap.create({      id: 'my-cool-map',      element: mapRef.current,      apiKey: process.env.REACT_APP_YOUR_API_KEY_HERE,      config: {        center: {          lat: 33.6,          lng: -117.9        },        zoom: 8      }    })  }  return (    <div className="component-wrapper">      <capacitor-google-map ref={mapRef} style={{        display: 'inline-block',        width: 275,        height: 400      }}></capacitor-google-map>      <button onClick={createMap}>Create Map</button>    </div>  )}export default MyMap;
```

You may need to create a `*.d.ts` file for the custom element in React:

```
// custom-elements.d.tsdeclare module "react" {  namespace JSX {    interface IntrinsicElements {      "capacitor-google-map": React.DetailedHTMLProps<        React.HTMLAttributes<HTMLElement>,        HTMLElement      >;    }  }}export {};
```

### Vue[​](#vue "Direct link to Vue")

```
<script lang="ts" setup>import { ref, shallowRef, useTemplateRef } from 'vue'import { GoogleMap } from '@capacitor/google-maps'const mapRef = useTemplateRef<HTMLElement>('mapRef')const newMap = shallowRef<GoogleMap>()async function createMap() {  if (!mapRef.value) return  newMap.value = await GoogleMap.create({    id: 'my-cool-map',    element: mapRef.value,    apiKey: import.meta.env.VITE_YOUR_API_KEY_HERE,    config: {      center: {        lat: 33.6,        lng: -117.9,      },      zoom: 8,    },  })}</script><template>  <capacitor-google-map    ref="mapRef"    style="display: inline-block; width: 275px; height: 400px"  ></capacitor-google-map>  <button @click="createMap()">Create Map</button></template>
```

make sure you need enable [recognize native custom elements](https://vuejs.org/guide/extras/web-components.html#using-custom-elements-in-vue) like

```
// vite.config.mts > pluginsVue({  template: {    compilerOptions: {      isCustomElement: (tag) => tag.startsWith('capacitor-')    },  },}),
```

### Javascript[​](#javascript "Direct link to Javascript")

```
<capacitor-google-map id="map"></capacitor-google-map><button onclick="createMap()">Create Map</button><style>  capacitor-google-map {    display: inline-block;    width: 275px;    height: 400px;  }</style><script>  import { GoogleMap } from '@capacitor/google-maps';  const createMap = async () => {    const mapRef = document.getElementById('map');    const newMap = await GoogleMap.create({      id: 'my-map', // Unique identifier for this map instance      element: mapRef, // reference to the capacitor-google-map element      apiKey: 'YOUR_API_KEY_HERE', // Your Google Maps API Key      config: {        center: {          // The initial position to be rendered by the map          lat: 33.6,          lng: -117.9,        },        zoom: 8, // The initial zoom level to be rendered by the map      },    });  };</script>
```

## API[​](#api "Direct link to API")

-   [`create(...)`](#create)
-   [`enableTouch()`](#enabletouch)
-   [`disableTouch()`](#disabletouch)
-   [`enableClustering(...)`](#enableclustering)
-   [`disableClustering()`](#disableclustering)
-   [`addTileOverlay(...)`](#addtileoverlay)
-   [`removeTileOverlay(...)`](#removetileoverlay)
-   [`addMarker(...)`](#addmarker)
-   [`addMarkers(...)`](#addmarkers)
-   [`removeMarker(...)`](#removemarker)
-   [`removeMarkers(...)`](#removemarkers)
-   [`addPolygons(...)`](#addpolygons)
-   [`removePolygons(...)`](#removepolygons)
-   [`addCircles(...)`](#addcircles)
-   [`removeCircles(...)`](#removecircles)
-   [`addPolylines(...)`](#addpolylines)
-   [`removePolylines(...)`](#removepolylines)
-   [`destroy()`](#destroy)
-   [`setCamera(...)`](#setcamera)
-   [`getMapType()`](#getmaptype)
-   [`setMapType(...)`](#setmaptype)
-   [`enableIndoorMaps(...)`](#enableindoormaps)
-   [`enableTrafficLayer(...)`](#enabletrafficlayer)
-   [`enableAccessibilityElements(...)`](#enableaccessibilityelements)
-   [`enableCurrentLocation(...)`](#enablecurrentlocation)
-   [`setPadding(...)`](#setpadding)
-   [`getMapBounds()`](#getmapbounds)
-   [`fitBounds(...)`](#fitbounds)
-   [`setOnBoundsChangedListener(...)`](#setonboundschangedlistener)
-   [`setOnCameraIdleListener(...)`](#setoncameraidlelistener)
-   [`setOnCameraMoveStartedListener(...)`](#setoncameramovestartedlistener)
-   [`setOnClusterClickListener(...)`](#setonclusterclicklistener)
-   [`setOnClusterInfoWindowClickListener(...)`](#setonclusterinfowindowclicklistener)
-   [`setOnInfoWindowClickListener(...)`](#setoninfowindowclicklistener)
-   [`setOnMapClickListener(...)`](#setonmapclicklistener)
-   [`setOnMarkerClickListener(...)`](#setonmarkerclicklistener)
-   [`setOnPolygonClickListener(...)`](#setonpolygonclicklistener)
-   [`setOnCircleClickListener(...)`](#setoncircleclicklistener)
-   [`setOnPolylineClickListener(...)`](#setonpolylineclicklistener)
-   [`setOnMarkerDragStartListener(...)`](#setonmarkerdragstartlistener)
-   [`setOnMarkerDragListener(...)`](#setonmarkerdraglistener)
-   [`setOnMarkerDragEndListener(...)`](#setonmarkerdragendlistener)
-   [`setOnMyLocationButtonClickListener(...)`](#setonmylocationbuttonclicklistener)
-   [`setOnMyLocationClickListener(...)`](#setonmylocationclicklistener)
-   [Interfaces](#interfaces)
-   [Type Aliases](#type-aliases)
-   [Enums](#enums)

### create(...)[​](#create "Direct link to create(...)")

```
create(options: CreateMapArgs, callback?: MapListenerCallback<MapReadyCallbackData> | undefined) => Promise<GoogleMap>
```

| Param | Type |
| --- | --- |
| **`options`** |
```
CreateMapArgs
```

 |
| **`callback`** |

```
MapListenerCallback<MapReadyCallbackData>
```

 |

**Returns:** `Promise<GoogleMap>`

* * *

### enableTouch()[​](#enabletouch "Direct link to enableTouch()")

```
enableTouch() => Promise<void>
```

* * *

### disableTouch()[​](#disabletouch "Direct link to disableTouch()")

```
disableTouch() => Promise<void>
```

* * *

### enableClustering(...)[​](#enableclustering "Direct link to enableClustering(...)")

```
enableClustering(minClusterSize?: number | undefined) => Promise<void>
```

| Param | Type | Description |
| --- | --- | --- |
| **`minClusterSize`** | `number` | The minimum number of markers that can be clustered together. The default is 4 markers. |

* * *

### disableClustering()[​](#disableclustering "Direct link to disableClustering()")

```
disableClustering() => Promise<void>
```

* * *

### addTileOverlay(...)[​](#addtileoverlay "Direct link to addTileOverlay(...)")

```
addTileOverlay(tileOverlay: TileOverlay) => Promise<{ id: string; }>
```

| Param | Type |
| --- | --- |
| **`tileOverlay`** |
```
TileOverlay
```

 |

**Returns:** `Promise<{ id: string; }>`

* * *

### removeTileOverlay(...)[​](#removetileoverlay "Direct link to removeTileOverlay(...)")

```
removeTileOverlay(id: string) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`id`** | `string` |

* * *

### addMarker(...)[​](#addmarker "Direct link to addMarker(...)")

```
addMarker(marker: Marker) => Promise<string>
```

| Param | Type |
| --- | --- |
| **`marker`** |
```
Marker
```

 |

**Returns:** `Promise<string>`

* * *

### addMarkers(...)[​](#addmarkers "Direct link to addMarkers(...)")

```
addMarkers(markers: Marker[]) => Promise<string[]>
```

| Param | Type |
| --- | --- |
| **`markers`** | `Marker[]` |

**Returns:** `Promise<string[]>`

* * *

### removeMarker(...)[​](#removemarker "Direct link to removeMarker(...)")

```
removeMarker(id: string) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`id`** | `string` |

* * *

### removeMarkers(...)[​](#removemarkers "Direct link to removeMarkers(...)")

```
removeMarkers(ids: string[]) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`ids`** | `string[]` |

* * *

### addPolygons(...)[​](#addpolygons "Direct link to addPolygons(...)")

```
addPolygons(polygons: Polygon[]) => Promise<string[]>
```

| Param | Type |
| --- | --- |
| **`polygons`** | `Polygon[]` |

**Returns:** `Promise<string[]>`

* * *

### removePolygons(...)[​](#removepolygons "Direct link to removePolygons(...)")

```
removePolygons(ids: string[]) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`ids`** | `string[]` |

* * *

### addCircles(...)[​](#addcircles "Direct link to addCircles(...)")

```
addCircles(circles: Circle[]) => Promise<string[]>
```

| Param | Type |
| --- | --- |
| **`circles`** | `Circle[]` |

**Returns:** `Promise<string[]>`

* * *

### removeCircles(...)[​](#removecircles "Direct link to removeCircles(...)")

```
removeCircles(ids: string[]) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`ids`** | `string[]` |

* * *

### addPolylines(...)[​](#addpolylines "Direct link to addPolylines(...)")

```
addPolylines(polylines: Polyline[]) => Promise<string[]>
```

| Param | Type |
| --- | --- |
| **`polylines`** | `Polyline[]` |

**Returns:** `Promise<string[]>`

* * *

### removePolylines(...)[​](#removepolylines "Direct link to removePolylines(...)")

```
removePolylines(ids: string[]) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`ids`** | `string[]` |

* * *

### destroy()[​](#destroy "Direct link to destroy()")

```
destroy() => Promise<void>
```

* * *

### setCamera(...)[​](#setcamera "Direct link to setCamera(...)")

```
setCamera(config: CameraConfig) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`config`** |
```
CameraConfig
```

 |

* * *

### getMapType()[​](#getmaptype "Direct link to getMapType()")

```
getMapType() => Promise<MapType>
```

Get current map type

**Returns:**

```
Promise<MapType>
```

* * *

### setMapType(...)[​](#setmaptype "Direct link to setMapType(...)")

```
setMapType(mapType: MapType) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`mapType`** |
```
MapType
```

 |

* * *

### enableIndoorMaps(...)[​](#enableindoormaps "Direct link to enableIndoorMaps(...)")

```
enableIndoorMaps(enabled: boolean) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`enabled`** | `boolean` |

* * *

### enableTrafficLayer(...)[​](#enabletrafficlayer "Direct link to enableTrafficLayer(...)")

```
enableTrafficLayer(enabled: boolean) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`enabled`** | `boolean` |

* * *

### enableAccessibilityElements(...)[​](#enableaccessibilityelements "Direct link to enableAccessibilityElements(...)")

```
enableAccessibilityElements(enabled: boolean) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`enabled`** | `boolean` |

* * *

### enableCurrentLocation(...)[​](#enablecurrentlocation "Direct link to enableCurrentLocation(...)")

```
enableCurrentLocation(enabled: boolean) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`enabled`** | `boolean` |

* * *

### setPadding(...)[​](#setpadding "Direct link to setPadding(...)")

```
setPadding(padding: MapPadding) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`padding`** |
```
MapPadding
```

 |

* * *

### getMapBounds()[​](#getmapbounds "Direct link to getMapBounds()")

```
getMapBounds() => Promise<LatLngBounds>
```

Get the map's current viewport latitude and longitude bounds.

**Returns:** `Promise<LatLngBounds>`

* * *

### fitBounds(...)[​](#fitbounds "Direct link to fitBounds(...)")

```
fitBounds(bounds: LatLngBounds, padding?: number | undefined) => Promise<void>
```

Sets the map viewport to contain the given bounds.

| Param | Type | Description |
| --- | --- | --- |
| **`bounds`** | `LatLngBounds` | The bounds to fit in the viewport. |
| **`padding`** | `number` | Optional padding to apply in pixels. The bounds will be fit in the part of the map that remains after padding is removed. |

* * *

### setOnBoundsChangedListener(...)[​](#setonboundschangedlistener "Direct link to setOnBoundsChangedListener(...)")

```
setOnBoundsChangedListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** |
```
MapListenerCallback<CameraIdleCallbackData>
```

 |

* * *

### setOnCameraIdleListener(...)[​](#setoncameraidlelistener "Direct link to setOnCameraIdleListener(...)")

```
setOnCameraIdleListener(callback?: MapListenerCallback<CameraIdleCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** |
```
MapListenerCallback<CameraIdleCallbackData>
```

 |

* * *

### setOnCameraMoveStartedListener(...)[​](#setoncameramovestartedlistener "Direct link to setOnCameraMoveStartedListener(...)")

```
setOnCameraMoveStartedListener(callback?: MapListenerCallback<CameraMoveStartedCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** |
```
MapListenerCallback<CameraMoveStartedCallbackData>
```

 |

* * *

### setOnClusterClickListener(...)[​](#setonclusterclicklistener "Direct link to setOnClusterClickListener(...)")

```
setOnClusterClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** |
```
MapListenerCallback<ClusterClickCallbackData>
```

 |

* * *

### setOnClusterInfoWindowClickListener(...)[​](#setonclusterinfowindowclicklistener "Direct link to setOnClusterInfoWindowClickListener(...)")

```
setOnClusterInfoWindowClickListener(callback?: MapListenerCallback<ClusterClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** |
```
MapListenerCallback<ClusterClickCallbackData>
```

 |

* * *

### setOnInfoWindowClickListener(...)[​](#setoninfowindowclicklistener "Direct link to setOnInfoWindowClickListener(...)")

```
setOnInfoWindowClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** |
```
MapListenerCallback<MarkerClickCallbackData>
```

 |

* * *

### setOnMapClickListener(...)[​](#setonmapclicklistener "Direct link to setOnMapClickListener(...)")

```
setOnMapClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** |
```
MapListenerCallback<MapClickCallbackData>
```

 |

* * *

### setOnMarkerClickListener(...)[​](#setonmarkerclicklistener "Direct link to setOnMarkerClickListener(...)")

```
setOnMarkerClickListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** |
```
MapListenerCallback<MarkerClickCallbackData>
```

 |

* * *

### setOnPolygonClickListener(...)[​](#setonpolygonclicklistener "Direct link to setOnPolygonClickListener(...)")

```
setOnPolygonClickListener(callback?: MapListenerCallback<PolygonClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** |
```
MapListenerCallback<PolygonClickCallbackData>
```

 |

* * *

### setOnCircleClickListener(...)[​](#setoncircleclicklistener "Direct link to setOnCircleClickListener(...)")

```
setOnCircleClickListener(callback?: MapListenerCallback<CircleClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** |
```
MapListenerCallback<CircleClickCallbackData>
```

 |

* * *

### setOnPolylineClickListener(...)[​](#setonpolylineclicklistener "Direct link to setOnPolylineClickListener(...)")

```
setOnPolylineClickListener(callback?: MapListenerCallback<PolylineCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** |
```
MapListenerCallback<PolylineCallbackData>
```

 |

* * *

### setOnMarkerDragStartListener(...)[​](#setonmarkerdragstartlistener "Direct link to setOnMarkerDragStartListener(...)")

```
setOnMarkerDragStartListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** |
```
MapListenerCallback<MarkerClickCallbackData>
```

 |

* * *

### setOnMarkerDragListener(...)[​](#setonmarkerdraglistener "Direct link to setOnMarkerDragListener(...)")

```
setOnMarkerDragListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** |
```
MapListenerCallback<MarkerClickCallbackData>
```

 |

* * *

### setOnMarkerDragEndListener(...)[​](#setonmarkerdragendlistener "Direct link to setOnMarkerDragEndListener(...)")

```
setOnMarkerDragEndListener(callback?: MapListenerCallback<MarkerClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** |
```
MapListenerCallback<MarkerClickCallbackData>
```

 |

* * *

### setOnMyLocationButtonClickListener(...)[​](#setonmylocationbuttonclicklistener "Direct link to setOnMyLocationButtonClickListener(...)")

```
setOnMyLocationButtonClickListener(callback?: MapListenerCallback<MyLocationButtonClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** |
```
MapListenerCallback<MyLocationButtonClickCallbackData>
```

 |

* * *

### setOnMyLocationClickListener(...)[​](#setonmylocationclicklistener "Direct link to setOnMyLocationClickListener(...)")

```
setOnMyLocationClickListener(callback?: MapListenerCallback<MapClickCallbackData> | undefined) => Promise<void>
```

| Param | Type |
| --- | --- |
| **`callback`** |
```
MapListenerCallback<MapClickCallbackData>
```

 |

* * *

### Interfaces[​](#interfaces "Direct link to Interfaces")

#### CreateMapArgs[​](#createmapargs "Direct link to CreateMapArgs")

An interface containing the options used when creating a map.

| Prop | Type | Description | Default |
| --- | --- | --- | --- |
| **`id`** | `string` | A unique identifier for the map instance. |  |
| **`apiKey`** | `string` | The Google Maps SDK API Key. |  |
| **`config`** |
```
GoogleMapConfig
```

 | The initial configuration settings for the map. |  |
| **`element`** | `HTMLElement` | The DOM element that the Google Map View will be mounted on which determines size and positioning. |  |
| **`forceCreate`** | `boolean` | Destroy and re-create the map instance if a map with the supplied id already exists | `false` |
| **`region`** | `string` | The region parameter alters your application to serve different map tiles or bias the application (such as biasing geocoding results towards the region). Only available for web. |  |
| **`language`** | `string` | The language parameter affects the names of controls, copyright notices, driving directions, and control labels, as well as the responses to service requests. Only available for web. |  |

#### GoogleMapConfig[​](#googlemapconfig "Direct link to GoogleMapConfig")

For web, all the javascript Google Maps options are available as GoogleMapConfig extends google.maps.MapOptions. For iOS and Android only the config options declared on [GoogleMapConfig](#googlemapconfig) are available.

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`width`** | `number` | Override width for native map. |  |  |
| **`height`** | `number` | Override height for native map. |  |  |
| **`x`** | `number` | Override absolute x coordinate position for native map. |  |  |
| **`y`** | `number` | Override absolute y coordinate position for native map. |  |  |
| **`center`** |
```
LatLng
```

 | Default location on the Earth towards which the camera points. |  |  |
| **`zoom`** | `number` | Sets the zoom of the map. |  |  |
| **`androidLiteMode`** | `boolean` | Enables image-based lite mode on Android. | `false` |  |
| **`devicePixelRatio`** | `number` | Override pixel ratio for native map. |  |  |
| **`styles`** | `MapTypeStyle[] | null` | Styles to apply to each of the default map types. Note that for satellite, hybrid and terrain modes, these styles will only apply to labels and geometry. |  | 4.3.0 |
| **`mapId`** | `string` | A map id associated with a specific map style or feature. [Use Map IDs](https://developers.google.com/maps/documentation/get-map-id) Only for Web. |  | 5.4.0 |
| **`androidMapId`** | `string` | A map id associated with a specific map style or feature. [Use Map IDs](https://developers.google.com/maps/documentation/get-map-id) Only for Android. |  | 5.4.0 |
| **`iOSMapId`** | `string` | A map id associated with a specific map style or feature. [Use Map IDs](https://developers.google.com/maps/documentation/get-map-id) Only for iOS. |  | 5.4.0 |
| **`maxZoom`** | `number | null` | The maximum zoom level which will be displayed on the map. If omitted, or set to <code>null</code>, the maximum zoom from the current map type is used instead. Valid zoom values are numbers from zero up to the supported <a href="[https://developers.google.com/maps/documentation/javascript/maxzoom"&gt;maximum](https://developers.google.com/maps/documentation/javascript/maxzoom%22&gt;maximum) zoom level</a>. |  |  |
| **`minZoom`** | `number | null` | The minimum zoom level which will be displayed on the map. If omitted, or set to <code>null</code>, the minimum zoom from the current map type is used instead. Valid zoom values are numbers from zero up to the supported <a href="[https://developers.google.com/maps/documentation/javascript/maxzoom"&gt;maximum](https://developers.google.com/maps/documentation/javascript/maxzoom%22&gt;maximum) zoom level</a>. |  |  |
| **`mapTypeId`** | `string | null` | The initial Map mapTypeId. Defaults to <code>ROADMAP</code>. |  |  |
| **`heading`** | `number | null` | The heading for aerial imagery in degrees measured clockwise from cardinal direction North. Headings are snapped to the nearest available angle for which imagery is available. |  |  |
| **`restriction`** | `MapRestriction | null` | Defines a boundary that restricts the area of the map accessible to users. When set, a user can only pan and zoom while the camera view stays inside the limits of the boundary. |  |  |

#### LatLng[​](#latlng "Direct link to LatLng")

An interface representing a pair of latitude and longitude coordinates.

| Prop | Type | Description |
| --- | --- | --- |
| **`lat`** | `number` | Coordinate latitude, in degrees. This value is in the range \[-90, 90\]. |
| **`lng`** | `number` | Coordinate longitude, in degrees. This value is in the range \[-180, 180\]. |

#### MapReadyCallbackData[​](#mapreadycallbackdata "Direct link to MapReadyCallbackData")

| Prop | Type |
| --- | --- |
| **`mapId`** | `string` |

#### TileOverlay[​](#tileoverlay "Direct link to TileOverlay")

A tile overlay is an image placed on top of your map at a specific zoom level. Available on iOS, Android and Web

| Prop | Type | Description | Default |
| --- | --- | --- | --- |
| **`url`** | `string` | A string representing the tile url. Should contain `{x}`, `{y}` and `{z}` so they can be replaced with actual values for x, y and zoom. Available on iOS, Android and Web |  |
| **`opacity`** | `number` | The opacity of the tile overlay, between 0 (completely transparent) and 1 inclusive. Available on iOS, Android and Web | `undefined` |
| **`visible`** | `boolean` | Controls whether this tile overlay should be visible. Available only on Android | `undefined` |
| **`zIndex`** | `number` | The zIndex of the tile overlay. Available on iOS and Android | `undefined` |

#### Marker[​](#marker "Direct link to Marker")

A marker is an icon placed at a particular point on the map's surface.

| Prop | Type | Description | Default | Since |
| --- | --- | --- | --- | --- |
| **`coordinate`** |
```
LatLng
```

 | [Marker](#marker) position |  |  |
| **`opacity`** | `number` | Sets the opacity of the marker, between 0 (completely transparent) and 1 inclusive. | `1` |  |
| **`title`** | `string` | Title, a short description of the overlay. |  |  |
| **`snippet`** | `string` | Snippet text, shown beneath the title in the info window when selected. |  |  |
| **`isFlat`** | `boolean` | Controls whether this marker should be flat against the Earth's surface or a billboard facing the camera. | `false` |  |
| **`iconUrl`** | `string` | Path to a marker icon to render. It can be relative to the web app public directory, or a https url of a remote marker icon. **SVGs are not supported on native platforms.** |  | 4.2.0 |
| **`iconSize`** |

```
Size
```

 | Controls the scaled size of the marker image set in `iconUrl`. |  | 4.2.0 |
| **`iconOrigin`** |

```
Point
```

 | The position of the image within a sprite, if any. By default, the origin is located at the top left corner of the image . |  | 4.2.0 |
| **`iconAnchor`** |

```
Point
```

 | The position at which to anchor an image in correspondence to the location of the marker on the map. By default, the anchor is located along the center point of the bottom of the image. |  | 4.2.0 |
| **`tintColor`** | `{ r: number; g: number; b: number; a: number; }` | Customizes the color of the default marker image. Each value must be between 0 and 255. Only for iOS and Android. |  | 4.2.0 |
| **`draggable`** | `boolean` | Controls whether this marker can be dragged interactively | `false` |  |
| **`zIndex`** | `number` | Specifies the stack order of this marker, relative to other markers on the map. A marker with a high z-index is drawn on top of markers with lower z-indexes | `0` |  |

#### Size[​](#size "Direct link to Size")

| Prop | Type |
| --- | --- |
| **`width`** | `number` |
| **`height`** | `number` |

#### Point[​](#point "Direct link to Point")

| Prop | Type |
| --- | --- |
| **`x`** | `number` |
| **`y`** | `number` |

#### Polygon[​](#polygon "Direct link to Polygon")

For web, all the javascript [Polygon](#polygon) options are available as Polygon extends google.maps.PolygonOptions. For iOS and Android only the config options declared on [Polygon](#polygon) are available.

| Prop | Type | Description |
| --- | --- | --- |
| **`paths`** | `any[] | MVCArray<any>` | The ordered sequence of coordinates that designates a closed loop. Unlike polylines, a polygon may consist of one or more paths. As a result, the paths property may specify one or more arrays of <code>[LatLng](#latlng)</code> coordinates. Paths are closed automatically; do not repeat the first vertex of the path as the last vertex. Simple polygons may be defined using a single array of <code>[LatLng](#latlng)</code>s. More complex polygons may specify an array of arrays. Any simple arrays are converted into <code><a href="#MVCArray">MVCArray</a></code>s. Inserting or removing <code>[LatLng](#latlng)</code>s from the <code>MVCArray</code> will automatically update the polygon on the map. |
| **`strokeColor`** | `string` | The stroke color. All CSS3 colors are supported except for extended named colors. |
| **`strokeOpacity`** | `number` | The stroke opacity between 0.0 and 1.0 |
| **`strokeWeight`** | `number` | The stroke width in pixels. |
| **`fillColor`** | `string` | The fill color. All CSS3 colors are supported except for extended named colors. |
| **`fillOpacity`** | `number` | The fill opacity between 0.0 and 1.0 |
| **`geodesic`** | `boolean` | When <code>true</code>, edges of the polygon are interpreted as geodesic and will follow the curvature of the Earth. When <code>false</code>, edges of the polygon are rendered as straight lines in screen space. Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions are maintained relative to the surface of the earth. |
| **`clickable`** | `boolean` | Indicates whether this <code>[Polygon](#polygon)</code> handles mouse events. |
| **`title`** | `string` | Title, a short description of the overlay. Some overlays, such as markers, will display the title on the map. The title is also the default accessibility text. Only available on iOS. |
| **`tag`** | `string` |  |

#### Circle[​](#circle "Direct link to Circle")

For web, all the javascript [Circle](#circle) options are available as Circle extends google.maps.CircleOptions. For iOS and Android only the config options declared on [Circle](#circle) are available.

| Prop | Type | Description |
| --- | --- | --- |
| **`fillColor`** | `string` | The fill color. All CSS3 colors are supported except for extended named colors. |
| **`fillOpacity`** | `number` | The fill opacity between 0.0 and 1.0. |
| **`strokeColor`** | `string` | The stroke color. All CSS3 colors are supported except for extended named colors. |
| **`strokeWeight`** | `number` | The stroke width in pixels. |
| **`geodesic`** | `boolean` |  |
| **`clickable`** | `boolean` | Indicates whether this <code>[Circle](#circle)</code> handles mouse events. |
| **`title`** | `string` | Title, a short description of the overlay. Some overlays, such as markers, will display the title on the map. The title is also the default accessibility text. Only available on iOS. |
| **`tag`** | `string` |  |

#### Polyline[​](#polyline "Direct link to Polyline")

For web, all the javascript [Polyline](#polyline) options are available as Polyline extends google.maps.PolylineOptions. For iOS and Android only the config options declared on [Polyline](#polyline) are available.

| Prop | Type | Description |
| --- | --- | --- |
| **`strokeColor`** | `string` | The stroke color. All CSS3 colors are supported except for extended named colors. |
| **`strokeOpacity`** | `number` | The stroke opacity between 0.0 and 1.0. |
| **`strokeWeight`** | `number` | The stroke width in pixels. |
| **`geodesic`** | `boolean` | When <code>true</code>, edges of the polygon are interpreted as geodesic and will follow the curvature of the Earth. When <code>false</code>, edges of the polygon are rendered as straight lines in screen space. Note that the shape of a geodesic polygon may appear to change when dragged, as the dimensions are maintained relative to the surface of the earth. |
| **`clickable`** | `boolean` | Indicates whether this <code>[Polyline](#polyline)</code> handles mouse events. |
| **`tag`** | `string` |  |
| **`styleSpans`** | `StyleSpan[]` | Used to specify the color of one or more segments of a polyline. The styleSpans property is an array of [StyleSpan](#stylespan) objects. Setting the spans property is the preferred way to change the color of a polyline. Only on iOS and Android. |

#### StyleSpan[​](#stylespan "Direct link to StyleSpan")

Describes the style for some region of a polyline.

| Prop | Type | Description |
| --- | --- | --- |
| **`color`** | `string` | The stroke color. All CSS3 colors are supported except for extended named colors. |
| **`segments`** | `number` | The length of this span in number of segments. |

#### CameraConfig[​](#cameraconfig "Direct link to CameraConfig")

Configuration properties for a Google Map Camera

| Prop | Type | Description | Default |
| --- | --- | --- | --- |
| **`coordinate`** |
```
LatLng
```

 | Location on the Earth towards which the camera points. |  |
| **`zoom`** | `number` | Sets the zoom of the map. |  |
| **`bearing`** | `number` | Bearing of the camera, in degrees clockwise from true north. | `0` |
| **`angle`** | `number` | The angle, in degrees, of the camera from the nadir (directly facing the Earth). The only allowed values are 0 and 45. | `0` |
| **`animate`** | `boolean` | Animate the transition to the new Camera properties. | `false` |
| **`animationDuration`** | `number` | This configuration option is not being used. |  |

#### MapPadding[​](#mappadding "Direct link to MapPadding")

Controls for setting padding on the 'visible' region of the view.

| Prop | Type |
| --- | --- |
| **`top`** | `number` |
| **`left`** | `number` |
| **`right`** | `number` |
| **`bottom`** | `number` |

#### CameraIdleCallbackData[​](#cameraidlecallbackdata "Direct link to CameraIdleCallbackData")

| Prop | Type |
| --- | --- |
| **`mapId`** | `string` |
| **`bounds`** | `LatLngBounds` |
| **`bearing`** | `number` |
| **`latitude`** | `number` |
| **`longitude`** | `number` |
| **`tilt`** | `number` |
| **`zoom`** | `number` |

#### CameraMoveStartedCallbackData[​](#cameramovestartedcallbackdata "Direct link to CameraMoveStartedCallbackData")

| Prop | Type |
| --- | --- |
| **`mapId`** | `string` |
| **`isGesture`** | `boolean` |

#### ClusterClickCallbackData[​](#clusterclickcallbackdata "Direct link to ClusterClickCallbackData")

| Prop | Type |
| --- | --- |
| **`mapId`** | `string` |
| **`latitude`** | `number` |
| **`longitude`** | `number` |
| **`size`** | `number` |
| **`items`** | `MarkerCallbackData[]` |

#### MarkerCallbackData[​](#markercallbackdata "Direct link to MarkerCallbackData")

| Prop | Type |
| --- | --- |
| **`markerId`** | `string` |
| **`latitude`** | `number` |
| **`longitude`** | `number` |
| **`title`** | `string` |
| **`snippet`** | `string` |

#### MarkerClickCallbackData[​](#markerclickcallbackdata "Direct link to MarkerClickCallbackData")

| Prop | Type |
| --- | --- |
| **`mapId`** | `string` |

#### MapClickCallbackData[​](#mapclickcallbackdata "Direct link to MapClickCallbackData")

| Prop | Type |
| --- | --- |
| **`mapId`** | `string` |
| **`latitude`** | `number` |
| **`longitude`** | `number` |

#### PolygonClickCallbackData[​](#polygonclickcallbackdata "Direct link to PolygonClickCallbackData")

| Prop | Type |
| --- | --- |
| **`mapId`** | `string` |
| **`polygonId`** | `string` |
| **`tag`** | `string` |

#### CircleClickCallbackData[​](#circleclickcallbackdata "Direct link to CircleClickCallbackData")

| Prop | Type |
| --- | --- |
| **`mapId`** | `string` |
| **`circleId`** | `string` |
| **`tag`** | `string` |

#### PolylineCallbackData[​](#polylinecallbackdata "Direct link to PolylineCallbackData")

| Prop | Type |
| --- | --- |
| **`polylineId`** | `string` |
| **`tag`** | `string` |

#### MyLocationButtonClickCallbackData[​](#mylocationbuttonclickcallbackdata "Direct link to MyLocationButtonClickCallbackData")

| Prop | Type |
| --- | --- |
| **`mapId`** | `string` |

### Type Aliases[​](#type-aliases "Direct link to Type Aliases")

#### MapListenerCallback[​](#maplistenercallback "Direct link to MapListenerCallback")

The callback function to be called when map events are emitted.

`(data: T): void`

#### Marker[​](#marker-1 "Direct link to Marker")

Supports markers of either "legacy" or "advanced" types.

```
google.maps.Marker | google.maps.marker.AdvancedMarkerElement
```

### Enums[​](#enums "Direct link to Enums")

#### MapType[​](#maptype "Direct link to MapType")

| Members | Value | Description |
| --- | --- | --- |
| **`Normal`** | `'Normal'` | Basic map. |
| **`Hybrid`** | `'Hybrid'` | Satellite imagery with roads and labels. |
| **`Satellite`** | `'Satellite'` | Satellite imagery with no labels. |
| **`Terrain`** | `'Terrain'` | Topographic data. |
| **`None`** | `'None'` | No base map tiles. |

## Contents

-   [Install](#install)
-   [API Keys](#api-keys)
-   [iOS](#ios)
    -   [Typescript Configuration](#typescript-configuration)
    -   [Migrating from older versions](#migrating-from-older-versions)
-   [Android](#android)
    -   [Variables](#variables)
-   [Usage](#usage)
-   [Full Examples](#full-examples)
    -   [Angular](#angular)
    -   [React](#react)
    -   [Vue](#vue)
    -   [Javascript](#javascript)
-   [API](#api)
    -   [create(...)](#create)
    -   [enableTouch()](#enabletouch)
    -   [disableTouch()](#disabletouch)
    -   [enableClustering(...)](#enableclustering)
    -   [disableClustering()](#disableclustering)
    -   [addTileOverlay(...)](#addtileoverlay)
    -   [removeTileOverlay(...)](#removetileoverlay)
    -   [addMarker(...)](#addmarker)
    -   [addMarkers(...)](#addmarkers)
    -   [removeMarker(...)](#removemarker)
    -   [removeMarkers(...)](#removemarkers)
    -   [addPolygons(...)](#addpolygons)
    -   [removePolygons(...)](#removepolygons)
    -   [addCircles(...)](#addcircles)
    -   [removeCircles(...)](#removecircles)
    -   [addPolylines(...)](#addpolylines)
    -   [removePolylines(...)](#removepolylines)
    -   [destroy()](#destroy)
    -   [setCamera(...)](#setcamera)
    -   [getMapType()](#getmaptype)
    -   [setMapType(...)](#setmaptype)
    -   [enableIndoorMaps(...)](#enableindoormaps)
    -   [enableTrafficLayer(...)](#enabletrafficlayer)
    -   [enableAccessibilityElements(...)](#enableaccessibilityelements)
    -   [enableCurrentLocation(...)](#enablecurrentlocation)
    -   [setPadding(...)](#setpadding)
    -   [getMapBounds()](#getmapbounds)
    -   [fitBounds(...)](#fitbounds)
    -   [setOnBoundsChangedListener(...)](#setonboundschangedlistener)
    -   [setOnCameraIdleListener(...)](#setoncameraidlelistener)
    -   [setOnCameraMoveStartedListener(...)](#setoncameramovestartedlistener)
    -   [setOnClusterClickListener(...)](#setonclusterclicklistener)
    -   [setOnClusterInfoWindowClickListener(...)](#setonclusterinfowindowclicklistener)
    -   [setOnInfoWindowClickListener(...)](#setoninfowindowclicklistener)
    -   [setOnMapClickListener(...)](#setonmapclicklistener)
    -   [setOnMarkerClickListener(...)](#setonmarkerclicklistener)
    -   [setOnPolygonClickListener(...)](#setonpolygonclicklistener)
    -   [setOnCircleClickListener(...)](#setoncircleclicklistener)
    -   [setOnPolylineClickListener(...)](#setonpolylineclicklistener)
    -   [setOnMarkerDragStartListener(...)](#setonmarkerdragstartlistener)
    -   [setOnMarkerDragListener(...)](#setonmarkerdraglistener)
    -   [setOnMarkerDragEndListener(...)](#setonmarkerdragendlistener)
    -   [setOnMyLocationButtonClickListener(...)](#setonmylocationbuttonclicklistener)
    -   [setOnMyLocationClickListener(...)](#setonmylocationclicklistener)
    -   [Interfaces](#interfaces)
    -   [Type Aliases](#type-aliases)
    -   [Enums](#enums)

* * *
