Version: v8

On this page

# Installing Capacitor

You can create a new Capacitor application or add Capacitor to your existing web project. This can be done via CLI or using the community-maintained [VS Code extension](/docs/getting-started/vscode-extension).

Remember to make sure your [environment is set up](/docs/getting-started/environment-setup) for the platforms you will be building for.

## Create a new Capacitor app[​](#create-a-new-capacitor-app "Direct link to Create a new Capacitor app")

The `@capacitor/create-app` package can be used to quickly create a Capacitor application. You can run the following command in an empty directory to scaffold a new Capacitor application.

```
npm init @capacitor/app@latest
```

## Add Capacitor to your web app[​](#add-capacitor-to-your-web-app "Direct link to Add Capacitor to your web app")

Capacitor was designed to drop into any modern JavaScript web app. However, your project needs to have the following three requirements in order to use Capacitor with your existing application:

-   A `package.json` file
-   A separate directory for built web assets such as `dist` or `www`
-   An `index.html` file at the root of your web assets directory

info

Your `index.html` file must have a `<head>` tag in order to properly inject Capacitor. If you do not have a `<head>` in your Html, Capacitor plugins will not work.

### Install Capacitor[​](#install-capacitor "Direct link to Install Capacitor")

In the root of your app, install Capacitor's main npm dependencies: the core JavaScript runtime and the command line interface (CLI).

```
npm i @capacitor/corenpm i -D @capacitor/cli
```

### Initialize your Capacitor config[​](#initialize-your-capacitor-config "Direct link to Initialize your Capacitor config")

Then, initialize Capacitor using the CLI questionnaire:

```
npx cap init
```

The CLI will ask you a few questions, starting with your app name, and the package ID you would like to use for your app. It will create the capacitor-config file with these configuration details, including the expected output directory for the build process of your bundler (e.g. `www` for Angular, `build` for React, `public` for Vue, etc.).

info

You can customize the folder used by Capacitor by modifying the `webDir` variable in your [Capacitor Config](/docs/config) file that is created during `npx cap init`. Please note that Capacitor will try to detect the default for your web-project by checking the framework you are using. Nevertheless, it is a good idea to cross-check this configuration variable when having issues syncing your first build.

### Create your Android and iOS projects[​](#create-your-android-and-ios-projects "Direct link to Create your Android and iOS projects")

After the Capacitor core runtime is installed, you can install the Android and iOS platforms.

```
npm i @capacitor/android @capacitor/ios
```

Once the platforms have been added to your `package.json`, you can run the following commands to create your Android and iOS projects for your native application.

```
npx cap add androidnpx cap add ios
```

### Sync your web code to your native project[​](#sync-your-web-code-to-your-native-project "Direct link to Sync your web code to your native project")

Once you've created your native projects, you can sync your web application to your native project by running the following command.

```
npx cap sync
```

`npx cap sync` will copy your built web bundle expected to be found in `webDir` of the [Capacitor Config](/docs/config) file to your native project and install the native project's dependencies.

## Where to go next[​](#where-to-go-next "Direct link to Where to go next")

With your environment setup, and your project structure set up properly, you're ready to go! You can follow any of the links below if you need more specific documentation.

[Get started with iOS ›](/docs/ios)

[Get started with Android ›](/docs/android)

[Developer Workflow Guide ›](/docs/basics/workflow)
