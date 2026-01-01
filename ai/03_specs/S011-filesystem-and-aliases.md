# S011 – Filesystem, Aliases & Smart Navigation

**Status:** draft  
**Owner:** Colin  
**Last updated:** 2026-01-01  
**Related:**

- Spec: `S001-input-and-modes.md`
- Spec: `S002-action-system-and-parameters.md`

---

## Kontext

Statt eines klassischen File-Trees nutzen wir eine **Floating "LS" Sidebar**, die immer den Inhalt des aktuellen Ordners anzeigt. Die Steuerung erfolgt primär über die CLI (`Ctrl + .`) mit Unix-artigen Befehlen, erweitert durch ein mächtiges **Alias-System** für Schul-Workflows.

## Ziele

- **Live "LS" View**: Visuelles Feedback über den aktuellen Ordnerinhalt.
- **CLI-Driven CRUD**: `mkdir`, `touch`, `rm`, `mv`, `cp` direkt in der Command Line.
- **Smart Aliases**: `@mathe` springt zum Ordner, `@mathe .` springt in den heutigen Datums-Ordner (auto-create).
- **Safety**: Bestätigungs-Dialoge bei destruktiven Aktionen und Protected Directories.

## 1. Floating "LS" Sidebar

- **Position**: Schwebend (Floating), z.B. links oben oder mittig links.
- **Inhalt**: Zeigt das Ergebnis eines `ls` des aktuellen Working Directory (CWD).
    - Header: Aktueller Pfad (z.B. `~/Schule/Mathe/`).
    - Liste: Ordner (fett/farbig) und Dateien.
    - Parent: `..` Eintrag zum Hoch-Navigieren.
- **Verhalten**:
    - **Live-Update**: Jede Änderung (`mkdir`, `cd`) aktualisiert die Ansicht sofort.
    - **Animation**: Fade-In/Out bei Änderungen, Slide bei Ordnerwechsel.
    - **Auto-Show**: Blendet sich ein, wenn CLI aktiv ist oder Navigation stattfindet.

## 2. CLI Commands

Alle Befehle unterstützen relative Pfade (zum CWD) und Aliases.

**Path Autocomplete:**
- Pfade werden intelligent und rekursiv vervollständigt.
- **Wichtig**: Dokument-Bundles (z.B. `.note` Ordner) werden im CLI **wie Dateien** behandelt.
    - Sie tauchen nicht als Ordner auf, in die man `cd` machen kann.
    - `touch`, `rm`, `mv`, `cp` behandeln das ganze Bundle als eine atomare Datei.

### Navigation
- `cd [path]`: Wechselt Verzeichnis. `cd ..` geht hoch.
- `open [file]`: Öffnet Datei im Editor. (Nur für Dateien/Bundles, nicht für Ordner).
- `close`: Schließt aktuelle Datei.

### CRUD (Manipulation)
- `mkdir [name]`: Erstellt Ordner.
- `touch [name]`: Erstellt leere Datei (bzw. Document Bundle).
- `mv [src] [dest]`: Verschieben oder Umbenennen.
    - *Safety*: Fragt Bestätigung, wenn Ziel existiert (Overwrite).
- `cp [src] [dest]`: Kopieren.
    - *Safety*: Fragt Bestätigung, wenn Ziel existiert.
- `rm [path]`: Löscht Datei oder Ordner (rekursiv).
    - *Safety*: Fragt **immer** Bestätigung ("Delete 'foo'? [y/n]").

## 3. Alias System & Smart Navigation

Aliase sind Shortcuts zu absoluten Pfaden, **hardcoded im Source Code** (keine User-Config nötig).

### Syntax
- `@alias`: Ersetzt den Pfad zum Alias-Ziel.
    - Beispiel: `cd @mathe` → `cd /home/user/Schule/Mathe`.
    - Nutzung in allen Commands: `rm @mathe/alte_notiz.md`.

### Smart Date Navigation (`.`)
Ein spezieller Suffix ` .` (Leerzeichen Punkt) nach einem Alias aktiviert die "Smart Date Logic".

- **Trigger**: `cd @mathe .` (oder kurz `@mathe .` im CLI).
- **Logik**:
    1. Resolve `@mathe` → `/Schule/Mathe`.
    2. Ermittle heutiges Datum: `YYYY-MM-DD` (z.B. `2025-01-01`).
    3. Prüfe, ob `/Schule/Mathe/2025-01-01` existiert.
    4. **Falls ja**: `cd` dort hin.
    5. **Falls nein**: `mkdir` den Ordner und dann `cd` dort hin.
- **Use-Case**: Zu Beginn der Stunde einfach `@fach .` tippen und sofort im richtigen Ordner für heute sein.

## 4. Protected Directories

Bestimmte Ordner können als "Protected" markiert werden (**hardcoded**).

- **Effekt**: `rm` und destruktive `mv`/`cp` Aktionen werden blockiert oder erfordern eine explizite, erschwerte Bestätigung (z.B. Eingabe des Namens).
- **Zweck**: Verhindert versehentliches Löschen von Archiv- oder Root-Ordnern.

## 5. UI-Feedback (Confirmation)

Wenn eine Bestätigung nötig ist (rm, overwrite), erscheint diese **inline** in der CLI oder als minimales Overlay direkt am Fokus.

- **CLI**: `Delete 'Hausaufgabe.md'? [y/N]`
- **Input**: `y` bestätigt, alles andere bricht ab.

## Entscheidungen

- D1: **LS-View statt Tree**. Fokus auf aktuellen Kontext, weniger Noise.
- D2: **Relative Pfade**. Standard für CLI-Operationen.
- D3: **Smart Date Nav**. Automatisierung des häufigsten Schul-Workflows.
- D4: **Safety First**. Bestätigungen für alle destruktiven Aktionen.
- D5: **Hardcoded Config**. Aliases und Protection werden im Code definiert (einfacher, robuster).
- D6: **Atomic Bundles**. Dokument-Ordner verhalten sich im CLI wie einzelne Dateien.

## Offene Fragen

- Q1: (Gelöst) Aliases sind hardcoded.
- Q2: (Gelöst) `open` ist nur für Files.
