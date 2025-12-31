Version: v8

On this page

# @capacitor/barcode-scanner

Capacitor plugin using Outsystems Barcode libs

## Install[​](#install "Direct link to Install")

```
npm install @capacitor/barcode-scannernpx cap sync
```

#### Android[​](#android "Direct link to Android")

The barcode scanner plugin requires a minimum Android SDK target of 26. This is higher than the default that comes with your Capacitor application. You can update this value in your `android/variables.gradle` file.

```
ext {    minSdkVersion = 26}
```

Note: Android with `ZXING` scanning library supports all formats, while `MLKIT` supports all except `MAXICODE`, `RSS_14`, `RSS_EXPANDED` and `UPC_EAN_EXTENSION` - using one of these in `hint` will default to scanning any format.

#### iOS[​](#ios "Direct link to iOS")

The barcode scanner uses the camera on the device. Ensure you configure the Privacy - Camera Usage Description in your Info.plist file so that your application can access the device's camera.

Note: iOS supports all formats except `MAXICODE` and `UPC_EAN_EXTENSION` - using them in `hint` will default to scanning any format. Also, Apple Vision does not distinguish between `UPC_A` and `EAN_13`, so specifying one of these in `hint` will allow to scan both.

* * *

## API[​](#api "Direct link to API")

-   [`scanBarcode(...)`](#scanbarcode)
-   [Type Aliases](#type-aliases)
-   [Enums](#enums)

Interface defining the contract for a plugin capable of scanning barcodes. Requires implementation of the scanBarcode method, which initiates a barcode scan with given options.

Starting in Android targetSdk 36, the scanOrientation parameter has no effect for large screens (e.g. tablets) on Android 16 and higher. You may opt-out of this behavior in your app by adding `<property android:name="android.window.PROPERTY_COMPAT_ALLOW_RESTRICTED_RESIZABILITY" android:value="true" />` to your `AndroidManifest.xml` inside `<application>` or `<activity>`. Keep in mind though that this opt-out is temporary and will no longer work for Android 17. Android discourages setting specific orientations for large screens. Regular Android phones are unaffected by this change. For more information check the Android docs at [https://developer.android.com/about/versions/16/behavior-changes-16#adaptive-layouts](https://developer.android.com/about/versions/16/behavior-changes-16#adaptive-layouts)

### scanBarcode(...)[​](#scanbarcode "Direct link to scanBarcode(...)")

```
scanBarcode(options: CapacitorBarcodeScannerOptions) => Promise<CapacitorBarcodeScannerScanResult>
```

| Param | Type |
| --- | --- |
| **`options`** |
```
CapacitorBarcodeScannerOptions
```

 |

**Returns:**

```
Promise<CapacitorBarcodeScannerScanResult>
```

* * *

### Type Aliases[​](#type-aliases "Direct link to Type Aliases")

#### CapacitorBarcodeScannerScanResult[​](#capacitorbarcodescannerscanresult "Direct link to CapacitorBarcodeScannerScanResult")

Defines the structure of the result returned from a barcode scan.

```
{ ScanResult: string; format: CapacitorBarcodeScannerTypeHint; }
```

#### CapacitorBarcodeScannerTypeHint[​](#capacitorbarcodescannertypehint "Direct link to CapacitorBarcodeScannerTypeHint")

Extends supported formats from Html5Qrcode with a special 'ALL' option, indicating support for all barcode types. Type definition combining [Html5QrcodeSupportedFormats](#html5qrcodesupportedformats) and OSBarcodeTypeHintALLOption to represent the hint for the type of barcode to be scanned.

```
Html5QrcodeSupportedFormats | CapacitorBarcodeScannerTypeHintALLOption
```

#### CapacitorBarcodeScannerOptions[​](#capacitorbarcodescanneroptions "Direct link to CapacitorBarcodeScannerOptions")

Defines the options for configuring a barcode scan.

```
{ hint: CapacitorBarcodeScannerTypeHint; scanInstructions?: string; scanButton?: boolean; scanText?: string; cameraDirection?: CapacitorBarcodeScannerCameraDirection; scanOrientation?: CapacitorBarcodeScannerScanOrientation; android?: { scanningLibrary?: CapacitorBarcodeScannerAndroidScanningLibrary; }; web?: { showCameraSelection?: boolean; scannerFPS?: number; }; }
```

### Enums[​](#enums "Direct link to Enums")

#### Html5QrcodeSupportedFormats[​](#html5qrcodesupportedformats "Direct link to Html5QrcodeSupportedFormats")

| Members | Value |
| --- | --- |
| **`QR_CODE`** | `0` |
| **`AZTEC`** | `1` |
| **`CODABAR`** | `2` |
| **`CODE_39`** | `3` |
| **`CODE_93`** | `4` |
| **`CODE_128`** | `5` |
| **`DATA_MATRIX`** | `6` |
| **`MAXICODE`** | `7` |
| **`ITF`** | `8` |
| **`EAN_13`** | `9` |
| **`EAN_8`** | `10` |
| **`PDF_417`** | `11` |
| **`RSS_14`** | `12` |
| **`RSS_EXPANDED`** | `13` |
| **`UPC_A`** | `14` |
| **`UPC_E`** | `15` |
| **`UPC_EAN_EXTENSION`** | `16` |

#### CapacitorBarcodeScannerTypeHintALLOption[​](#capacitorbarcodescannertypehintalloption "Direct link to CapacitorBarcodeScannerTypeHintALLOption")

| Members | Value |
| --- | --- |
| **`ALL`** | `17` |

#### CapacitorBarcodeScannerCameraDirection[​](#capacitorbarcodescannercameradirection "Direct link to CapacitorBarcodeScannerCameraDirection")

| Members | Value |
| --- | --- |
| **`BACK`** | `1` |
| **`FRONT`** | `2` |

#### CapacitorBarcodeScannerScanOrientation[​](#capacitorbarcodescannerscanorientation "Direct link to CapacitorBarcodeScannerScanOrientation")

| Members | Value |
| --- | --- |
| **`PORTRAIT`** | `1` |
| **`LANDSCAPE`** | `2` |
| **`ADAPTIVE`** | `3` |

#### CapacitorBarcodeScannerAndroidScanningLibrary[​](#capacitorbarcodescannerandroidscanninglibrary "Direct link to CapacitorBarcodeScannerAndroidScanningLibrary")

| Members | Value |
| --- | --- |
| **`ZXING`** | `"zxing"` |
| **`MLKIT`** | `"mlkit"` |
