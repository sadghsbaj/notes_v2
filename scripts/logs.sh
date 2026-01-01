#!/bin/bash
# logs.sh - Stream filtered logcat from device
#
# Usage: ./scripts/logs.sh

PACKAGE="dev.notes.v2"

echo "📋 Streaming logs from device (Ctrl+C to stop)..."
echo "   Filtering for package: $PACKAGE"
echo ""

# Get the PID of the app and filter by it
PID=$(adb shell pidof -s "$PACKAGE" 2>/dev/null)

if [ -n "$PID" ]; then
    echo "   App PID: $PID"
    adb logcat --pid="$PID"
else
    echo "   App not running, showing all Capacitor/WebView logs..."
    adb logcat -s "Capacitor:*" "WebViewChromiumLogging:*" "chromium:*"
fi
