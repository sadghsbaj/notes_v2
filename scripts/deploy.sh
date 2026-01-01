#!/bin/bash
# deploy.sh - Build, install and start app on connected device
#
# Usage: ./scripts/deploy.sh

set -e

PACKAGE="dev.notes.v2"
ACTIVITY="dev.notes.v2.MainActivity"
APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"

echo "📦 Building web assets..."
bun run build

echo "🔄 Syncing to Android..."
npx cap sync android

echo "🔨 Building debug APK..."
cd android && ./gradlew assembleDebug && cd ..

echo "📱 Installing on device..."
adb install -r "$APK_PATH"

echo "🚀 Starting app..."
adb shell am start -n "$PACKAGE/$ACTIVITY"

echo "✅ Done! App should be running on your device."
