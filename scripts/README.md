# Build Scripts

Helper scripts for cross-platform development.

## Scripts

| Script | Description |
|--------|-------------|
| `dev.sh` | Start dev server with `adb reverse` for tablet hot reload |
| `deploy.sh` | Build APK, install on device, and launch app |
| `logs.sh` | Stream filtered logcat from connected device |

## Usage

```bash
# Make scripts executable (once)
chmod +x scripts/*.sh

# Development with hot reload on tablet
./scripts/dev.sh

# Full deploy to device
./scripts/deploy.sh

# View app logs
./scripts/logs.sh
```

## Requirements

- Android device connected via USB with debugging enabled
- `adb` in PATH (comes with Android SDK)
