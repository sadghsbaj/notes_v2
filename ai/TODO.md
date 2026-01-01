# notes_v2 – Aktive TODOs

> M2: Capacitor Setup ✅

---

## ✅ Erledigt: M2 – Capacitor Setup

- [x] `@capacitor/core`, `@capacitor/cli`, `@capacitor/android` installiert
- [x] `capacitor.config.ts` erstellt (webDir: dist, appId: dev.notes.v2)
- [x] Android Platform hinzugefügt (`android/` Ordner)
- [x] Build-Scripts in `package.json`:
  - `cap:sync` – Build + Sync
  - `cap:build` – Gradle assembleDebug
  - `cap:apk` – Kompletter Build-Flow
- [x] Debug APK erfolgreich gebaut

---

## 🔧 Build Commands

```bash
bun run cap:sync   # Web bauen + Android sync
bun run cap:build  # Debug APK bauen
bun run cap:apk    # Alles in einem
```

APK Pfad: `android/app/build/outputs/apk/debug/app-debug.apk`

---

## ⏭️ Nächster Schritt: M3 Core System
- [ ] CLI Overlay (S002)
- [ ] Document Model (S003)
- [ ] Filesystem UI (S011)
