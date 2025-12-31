Version: v8

On this page

# Updating Capacitor to 1.1 in your app

If you are using an earlier version of Capacitor in your app, there are some recommended changes to make in your app for Capacitor 1.1.0.

## iOS[​](#ios "Direct link to iOS")

Add `Podfile.lock` to the `ios/.gitignore` file:

```
 App/build App/Pods App/public+App/Podfile.lock xcuserdata # Cordova plugins for Capacitor
```

## Android[​](#android "Direct link to Android")

Remove the `fileprovider_authority` string from the `android/app/src/main/res/values/strings.xml` file:

```
     <string name="app_name">My App</string>     <string name="title_activity_main">My App</string>     <string name="package_name">com.getcapacitor.myapp</string>-    <string name="fileprovider_authority">com.getcapacitor.myapp.fileprovider</string>     <string name="custom_url_scheme">com.getcapacitor.myapp</string> </resources>
```
