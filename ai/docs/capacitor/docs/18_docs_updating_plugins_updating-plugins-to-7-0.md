Version: v8

On this page

# Breaking changes in code

Plugin's `success()` and `error()` methods have been removed, use `resolve()` and `reject()` instead.

Some deprecated plugin definitions and methods such as `registerWebPlugin` have been removed, check the Capacitor 3 plugins upgrade guide for more information.

Capacitor's helper properties `platform` and `isNative` have been removed, use `getPlatform()` and `isNativePlatform()` methods instead.

## Android[​](#android "Direct link to Android")

`BridgeFragment` class has been removed, if a plugin was using that class to present a `Fragment`, they'll have to create their own version of it.

## iOS[​](#ios "Direct link to iOS")

### Add SPM support[​](#add-spm-support "Direct link to Add SPM support")

Capacitor 6 added experimental SPM support, you can add support for your plugin following [Converting existing plugins to SPM](/docs/ios/spm#converting-existing-plugins-to-spm)

# Updating Capacitor to 7.0 in your plugin

## Using @capacitor/plugin-migration-v6-to-v7[​](#using-capacitorplugin-migration-v6-to-v7 "Direct link to Using @capacitor/plugin-migration-v6-to-v7")

From the plugin folder, run `npx @capacitor/plugin-migration-v6-to-v7@latest` and it will perform all the file changes automatically.

## Updating the files manually[​](#updating-the-files-manually "Direct link to Updating the files manually")

### Updating npm dependencies[​](#updating-npm-dependencies "Direct link to Updating npm dependencies")

#### Updating Capacitor dependencies[​](#updating-capacitor-dependencies "Direct link to Updating Capacitor dependencies")

Update `@capacitor/cli`, `@capacitor/core`, `@capacitor/android` and `@capacitor/ios` in devDependencies to `^7.0.0` version. Update `@capacitor/core` in peerDependencies to `>=7.0.0` version.

#### Updating eslint dependencies[​](#updating-eslint-dependencies "Direct link to Updating eslint dependencies")

Update `@ionic/eslint-config` to `^0.4.0` and `eslint` to `^8.57.0`.

### Updating swiftlint dependencies[​](#updating-swiftlint-dependencies "Direct link to Updating swiftlint dependencies")

Update `@ionic/swiftlint-config` and `swiftlint` to `^2.0.0`.

#### Update prettier dependencies[​](#update-prettier-dependencies "Direct link to Update prettier dependencies")

Update `@ionic/prettier-config` to `^4.0.0`, `prettier` to `^3.4.2` and `prettier-plugin-java` to `^2.6.6`. Then update `prettier` npm script to add `--plugin=prettier-plugin-java`.

```
-    "prettier": "prettier \"**/*.{css,html,ts,js,java}\"",+    "prettier": "prettier \"**/*.{css,html,ts,js,java}\" --plugin=prettier-plugin-java",
```

Finally, you can remove the entries of `.prettierignore` that are already in `.gitignore` as from Prettier 3.0.0, it ignores files in `.gitignore` file by default. If all the entries of `.prettierignore` are already in `.gitignore`, you can remove the `.prettierignore` file entirely.

#### Update rollup[​](#update-rollup "Direct link to Update rollup")

Update `rollup` to `^4.30.1`. Then update rename the `rollup.config.js` file to `rollup.config.mjs`. Finally, update the build script to use the new file extension:

```
-    "build": "npm run clean && npm run docgen && tsc && rollup -c rollup.config.js",+    "build": "npm run clean && npm run docgen && tsc && rollup -c rollup.config.mjs",
```

#### Update other dependencies[​](#update-other-dependencies "Direct link to Update other dependencies")

Update `rimraf` to `^6.0.1` and `@capacitor/docgen` to `^0.3.0`.

### Update Android Plugin Variables[​](#update-android-plugin-variables "Direct link to Update Android Plugin Variables")

In your `build.gradle` file, update the following package version minimums:

```
ext {    junitVersion = project.hasProperty('junitVersion') ? rootProject.ext.junitVersion : '4.13.2'-   androidxAppCompatVersion = project.hasProperty('androidxAppCompatVersion') ? rootProject.ext.androidxAppCompatVersion : '1.6.1'+   androidxAppCompatVersion = project.hasProperty('androidxAppCompatVersion') ? rootProject.ext.androidxAppCompatVersion : '1.7.0'-   androidxJunitVersion = project.hasProperty('androidxJunitVersion') ? rootProject.ext.androidxJunitVersion : '1.1.5'+   androidxJunitVersion = project.hasProperty('androidxJunitVersion') ? rootProject.ext.androidxJunitVersion : '1.2.1'-   androidxEspressoCoreVersion = project.hasProperty('androidxEspressoCoreVersion') ? rootProject.ext.androidxEspressoCoreVersion : '3.5.1'+   androidxEspressoCoreVersion = project.hasProperty('androidxEspressoCoreVersion') ? rootProject.ext.androidxEspressoCoreVersion : '3.6.1'}
```

### Update targetSDK / compileSDK to 35 and minSDK to 23[​](#update-targetsdk--compilesdk-to-35-and-minsdk-to-23 "Direct link to Update targetSDK / compileSDK to 35 and minSDK to 23")

```
# build.gradleandroid {-    compileSdk project.hasProperty('compileSdkVersion') ? rootProject.ext.compileSdkVersion : 34+    compileSdk project.hasProperty('compileSdkVersion') ? rootProject.ext.compileSdkVersion : 35defaultConfig {-        minSdkVersion project.hasProperty('minSdkVersion') ? rootProject.ext.minSdkVersion : 22+        minSdkVersion project.hasProperty('minSdkVersion') ? rootProject.ext.minSdkVersion : 23-        targetSdkVersion project.hasProperty('targetSdkVersion') ? rootProject.ext.targetSdkVersion : 34+        targetSdkVersion project.hasProperty('targetSdkVersion') ? rootProject.ext.targetSdkVersion : 35...    }}
```

### Update gradle plugin to 8.7.2[​](#update-gradle-plugin-to-872 "Direct link to Update gradle plugin to 8.7.2")

```
    dependencies {-       classpath 'com.android.tools.build:gradle:8.2.1'+       classpath 'com.android.tools.build:gradle:8.7.2'    }
```

### Update gradle wrapper to 8.11.1[​](#update-gradle-wrapper-to-8111 "Direct link to Update gradle wrapper to 8.11.1")

```
# gradle-wrapper.propertiesdistributionBase=GRADLE_USER_HOMEdistributionPath=wrapper/dists- distributionUrl=https\://services.gradle.org/distributions/gradle-8.2.1-all.zip+ distributionUrl=https\://services.gradle.org/distributions/gradle-8.11.1-all.zipzipStoreBase=GRADLE_USER_HOMEzipStorePath=wrapper/dists
```

### Update to Java 21[​](#update-to-java-21 "Direct link to Update to Java 21")

```
# build.gradlecompileOptions {-    sourceCompatibility JavaVersion.VERSION_17+    sourceCompatibility JavaVersion.VERSION_21-    targetCompatibility JavaVersion.VERSION_17+    targetCompatibility JavaVersion.VERSION_21}
```

### Update kotlin\_version[​](#update-kotlin_version "Direct link to Update kotlin_version")

If your plugin uses kotlin, update the default `kotlin_version`

```
# build.gradlebuildscript {-    ext.kotlin_version = project.hasProperty("kotlin_version") ? rootProject.ext.kotlin_version : '1.9.10'+    ext.kotlin_version = project.hasProperty("kotlin_version") ? rootProject.ext.kotlin_version : '1.9.25'    repositories {
```

### Raise iOS Deployment Target to 14[​](#raise-ios-deployment-target-to-14 "Direct link to Raise iOS Deployment Target to 14")

Update your plugin's .podspec file

```
-  s.ios.deployment_target = '13.0'+  s.ios.deployment_target = '14.0'
```

#### SPM compatible plugins[​](#spm-compatible-plugins "Direct link to SPM compatible plugins")

Update `Package.swift` file

```
-    platforms: [.iOS(.v13)],+    platforms: [.iOS(.v14)],
```

#### Plugins with old structure[​](#plugins-with-old-structure "Direct link to Plugins with old structure")

Do the following for your Xcode project: select the **Project** within the project editor and open the **Build Settings** tab. Under the **Deployment** section, change **iOS Deployment Target** to **iOS 14.0**. Repeat the same steps for any app **Targets**.

Then, open `ios/Podfile` and update the iOS version to 14.0:

```
-platform :ios, '13.0'+platform :ios, '14.0'
```

### Update Capacitor SPM dependency[​](#update-capacitor-spm-dependency "Direct link to Update Capacitor SPM dependency")

In SPM compatible plugins, update `Package.swift` file to use a fixed version instead of main branch.

```
    dependencies: [-        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", branch: "main")+        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0")    ],
```
