#!/bin/bash
# dev.sh - Start dev server with adb reverse for tablet hot reload
#
# Usage: ./scripts/dev.sh

set -e

echo "🔄 Setting up adb reverse for hot reload..."
adb reverse tcp:3000 tcp:3000

echo "🚀 Starting dev server..."
bun dev --host
