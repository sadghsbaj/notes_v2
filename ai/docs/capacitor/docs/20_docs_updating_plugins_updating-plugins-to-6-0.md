Version: v8

On this page

# Breaking changes in code

## iOS[​](#ios "Direct link to iOS")

### Remove removeAllListeners method[​](#remove-removealllisteners-method "Direct link to Remove removeAllListeners method")

If your plugin has `CAP_PLUGIN_METHOD(removeAllListeners, CAPPluginReturnPromise)` in the `.m` file, it can be removed now, the method is now available for all plugins without defining it.

### Add SPM support[​](#add-spm-support "Direct link to Add SPM support")

Capacitor 6 adds experimental SPM support, you can add support for your plugin following [Converting existing plugins to SPM](/docs/ios/spm#converting-existing-plugins-to-spm)

## definitions.ts[​](#definitionsts "Direct link to definitions.ts")

`addListener` signature has been changed to only return a `Promise`, remove the `& PluginListenerHandle`.

```
  addListener(    eventName: 'resume',    listenerFunc: () => void,- ): Promise<PluginListenerHandle> & PluginListenerHandle;+ ): Promise<PluginListenerHandle>;
```

# Updating Capacitor to 6.0 in your plugin

## Using @capacitor/plugin-migration-v5-to-v6[​](#using-capacitorplugin-migration-v5-to-v6 "Direct link to Using @capacitor/plugin-migration-v5-to-v6")

From the plugin folder, run `npx @capacitor/plugin-migration-v5-to-v6@latest` and it will perform all the file changes automatically.

## Updating the files manually[​](#updating-the-files-manually "Direct link to Updating the files manually")

### Updating package.json[​](#updating-packagejson "Direct link to Updating package.json")

Update `@capacitor/cli`, `@capacitor/core`, `@capacitor/android` and `@capacitor/ios` to `latest-6` version.

### Replace deprecated compileSdkVersion and update targetSDK / compileSDK to 34[​](#replace-deprecated-compilesdkversion-and-update-targetsdk--compilesdk-to-34 "Direct link to Replace deprecated compileSdkVersion and update targetSDK / compileSDK to 34")

```
# build.gradleandroid {-    compileSdkVersion project.hasProperty('compileSdkVersion') ? rootProject.ext.compileSdkVersion : 33+    compileSdk project.hasProperty('compileSdkVersion') ? rootProject.ext.compileSdkVersion : 34-    targetSdkVersion project.hasProperty('targetSdkVersion') ? rootProject.ext.targetSdkVersion : 33+    targetSdkVersion project.hasProperty('targetSdkVersion') ? rootProject.ext.targetSdkVersion : 34
```

### Update gradle plugin to 8.2.1[​](#update-gradle-plugin-to-821 "Direct link to Update gradle plugin to 8.2.1")

```
    dependencies {-       classpath 'com.android.tools.build:gradle:8.0.0'+       classpath 'com.android.tools.build:gradle:8.2.1'    }
```

### Update gradle wrapper to 8.2.1[​](#update-gradle-wrapper-to-821 "Direct link to Update gradle wrapper to 8.2.1")

```
# gradle-wrapper.propertiesdistributionBase=GRADLE_USER_HOMEdistributionPath=wrapper/dists- distributionUrl=https\://services.gradle.org/distributions/gradle-8.0.2-all.zip+ distributionUrl=https\://services.gradle.org/distributions/gradle-8.2.1-all.zipzipStoreBase=GRADLE_USER_HOMEzipStorePath=wrapper/dists
```

### Update kotlin\_version[​](#update-kotlin_version "Direct link to Update kotlin_version")

If your plugin uses kotlin, update the default `kotlin_version`

```
# build.gradlebuildscript {-    ext.kotlin_version = project.hasProperty("kotlin_version") ? rootProject.ext.kotlin_version : '1.8.20'+    ext.kotlin_version = project.hasProperty("kotlin_version") ? rootProject.ext.kotlin_version : '1.9.10'    repositories {
```
