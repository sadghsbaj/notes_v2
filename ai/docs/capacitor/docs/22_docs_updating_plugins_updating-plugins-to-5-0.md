Version: v8

On this page

# Breaking changes in code

## iOS[​](#ios "Direct link to iOS")

### Changes to CAPBridgedPlugin protocol[​](#changes-to-capbridgedplugin-protocol "Direct link to Changes to CAPBridgedPlugin protocol")

-   `CAPBridgedPlugin` protocol requirements have been moved to the instance level instead of the class level.
-   `pluginId` was renamed `identifier` to avoid clashing with `CAPPlugin.pluginId` and the `getMethod(_:)` requirement was removed altogether and put into an internal extension method.
-   `pluginMethods` was also updated to be more specific about its contents (was `Any` now is `CAPPluginMethod`).

The vast majority of users should not experience any issues since the status quo is to use the macro to generate conformance to `CAPBridgedPlugin`. Any users who cast to `CAPBridgedPlugin` to or manually conform to `CAPBridgedPlugin` without the macro will be affected.

## Android[​](#android "Direct link to Android")

### PluginCall.getObject() / PluginCall.getArray()[​](#plugincallgetobject--plugincallgetarray "Direct link to PluginCall.getObject() / PluginCall.getArray()")

To match iOS behavior, `PluginCall.getObject()` and `PluginCall.getArray()` on Android can now return null. We recommend plugin authors to perform null checks around code handling returns from either of these methods.

# Updating Capacitor to 5.0 in your plugin

## Using @capacitor/plugin-migration-v4-to-v5[​](#using-capacitorplugin-migration-v4-to-v5 "Direct link to Using @capacitor/plugin-migration-v4-to-v5")

From the plugin folder, run `npx @capacitor/plugin-migration-v4-to-v5@latest` and it will perform all the file changes automatically.

## Updating the files manually[​](#updating-the-files-manually "Direct link to Updating the files manually")

### Updating package.json[​](#updating-packagejson "Direct link to Updating package.json")

Update `@capacitor/cli`, `@capacitor/core`, `@capacitor/android` and `@capacitor/ios` to `latest-5` version.

### Updating targetSDK / compileSDK to 33[​](#updating-targetsdk--compilesdk-to-33 "Direct link to Updating targetSDK / compileSDK to 33")

```
# build.gradleandroid {-    compileSdkVersion project.hasProperty('compileSdkVersion') ? rootProject.ext.compileSdkVersion : 32+    compileSdkVersion project.hasProperty('compileSdkVersion') ? rootProject.ext.compileSdkVersion : 33-    targetSdkVersion project.hasProperty('targetSdkVersion') ? rootProject.ext.targetSdkVersion : 32+    targetSdkVersion project.hasProperty('targetSdkVersion') ? rootProject.ext.targetSdkVersion : 33
```

### Update Android Plugin Variables[​](#update-android-plugin-variables "Direct link to Update Android Plugin Variables")

In your `build.gradle` file, update the following package version minimums:

```
ext {    junitVersion = project.hasProperty('junitVersion') ? rootProject.ext.junitVersion : '4.13.2'-   androidxAppCompatVersion = project.hasProperty('androidxAppCompatVersion') ? rootProject.ext.androidxAppCompatVersion : '1.4.2'+   androidxAppCompatVersion = project.hasProperty('androidxAppCompatVersion') ? rootProject.ext.androidxAppCompatVersion : '1.6.1'-   androidxJunitVersion = project.hasProperty('androidxJunitVersion') ? rootProject.ext.androidxJunitVersion : '1.1.3'+   androidxJunitVersion = project.hasProperty('androidxJunitVersion') ? rootProject.ext.androidxJunitVersion : '1.1.5'-   androidxEspressoCoreVersion = project.hasProperty('androidxEspressoCoreVersion') ? rootProject.ext.androidxEspressoCoreVersion : '3.4.0'+   androidxEspressoCoreVersion = project.hasProperty('androidxEspressoCoreVersion') ? rootProject.ext.androidxEspressoCoreVersion : '3.5.1'
```

### Update gradle plugin to 8.0.0[​](#update-gradle-plugin-to-800 "Direct link to Update gradle plugin to 8.0.0")

```
    dependencies {-       classpath 'com.android.tools.build:gradle:7.2.1'+       classpath 'com.android.tools.build:gradle:8.0.0'    }
```

### Update gradle wrapper to 8.0.2[​](#update-gradle-wrapper-to-802 "Direct link to Update gradle wrapper to 8.0.2")

```
# gradle-wrapper.propertiesdistributionBase=GRADLE_USER_HOMEdistributionPath=wrapper/dists- distributionUrl=https\://services.gradle.org/distributions/gradle-7.4.2-all.zip+ distributionUrl=https\://services.gradle.org/distributions/gradle-8.0.2-all.zipzipStoreBase=GRADLE_USER_HOMEzipStorePath=wrapper/dists
```

### Move package to `build.gradle`[​](#move-package-to-buildgradle "Direct link to move-package-to-buildgradle")

```
# AndroidManifest.xml<?xml version="1.0" encoding="utf-8"?>- <manifest xmlns:android="http://schemas.android.com/apk/res/android"-     package="[YOUR_PACKAGE_ID]">+ <manifest xmlns:android="http://schemas.android.com/apk/res/android">
```

```
# build.gradleandroid {+     namespace "[YOUR_PACKAGE_ID]"      compileSdkVersion project.hasProperty('compileSdkVersion') ? rootProject.ext.compileSdkVersion : 33
```

### Disable Jetifier[​](#disable-jetifier "Direct link to Disable Jetifier")

```
# gradle.properties# Android operating system, and which are packaged with your app's APK# https://developer.android.com/topic/libraries/support-library/androidx-rnandroid.useAndroidX=true- # Automatically convert third-party libraries to use AndroidX- android.enableJetifier=true
```

### Update to Java 17[​](#update-to-java-17 "Direct link to Update to Java 17")

```
# build.gradlecompileOptions {-    sourceCompatibility JavaVersion.VERSION_11+    sourceCompatibility JavaVersion.VERSION_17-    targetCompatibility JavaVersion.VERSION_11+    targetCompatibility JavaVersion.VERSION_17}
```

### Update kotlin\_version[​](#update-kotlin_version "Direct link to Update kotlin_version")

If your plugin uses kotlin, update the default `kotlin_version`

```
# build.gradlebuildscript {-    ext.kotlin_version = project.hasProperty("kotlin_version") ? rootProject.ext.kotlin_version : '1.7.0'+    ext.kotlin_version = project.hasProperty("kotlin_version") ? rootProject.ext.kotlin_version : '1.8.20'    repositories {
```

And replace `org.jetbrains.kotlin:kotlin-stdlib-jdk7` or `org.jetbrains.kotlin:kotlin-stdlib-jdk8` dependencies with `org.jetbrains.kotlin:kotlin-stdlib`.

```
# build.gradledependencies {-    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"+    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
```
