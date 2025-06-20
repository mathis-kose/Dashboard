# Tagesbegleiter - Detaillierter Implementierungsplan

## Projektübersicht
Entwicklung einer modularen Produktivitäts-Web-App mit neumorphischem Design, die als personalisierbare Dashboard-Lösung für Wissensarbeiter fungiert.

## Technologie-Stack
- **Frontend**: React mit TypeScript
- **Styling**: Tailwind CSS + Custom CSS für Neumorphismus
- **Backend**: Firebase (Auth + Firestore)
- **Testing**: Jest + React Testing Library
- **State Management**: React Context + useReducer
- **Build**: Vite

## Hauptphasen der Entwicklung

### Phase 1: Grundlegende Infrastruktur
- Projekt-Setup und Konfiguration
- Grundlegendes Layout-System
- Neumorphismus Design-System

### Phase 2: Kern-Dashboard-Funktionalität
- Grid-System für Kacheln
- Drag & Drop Funktionalität
- Kachel-Management (Shop)

### Phase 3: Grundlegende Kacheln
- Uhr-Kachel mit Farbverlauf
- Design-Umschalter (Light/Dark Mode)
- Basis-Tagesleiste

### Phase 4: Erweiterte Funktionalitäten
- Vollständige Tagesleiste mit Terminen
- Prompt-Bibliothek
- Daten-Analyse Kachel

### Phase 5: Backend-Integration
- Firebase Authentication
- Daten-Persistierung
- Synchronisation

### Phase 6: Optimierung und Polishing
- Performance-Optimierung
- Umfassende Tests
- Dokumentation

---

## Detaillierte Implementierungsprompts

### Prompt 1: Projekt-Setup und Grundstruktur

```
Erstelle ein neues React-TypeScript-Projekt für eine modulare Dashboard-Web-App namens "Tagesbegleiter". 

Anforderungen:
- Verwende Vite als Build-Tool
- Konfiguriere TypeScript mit strikten Einstellungen
- Installiere und konfiguriere Tailwind CSS
- Erstelle eine grundlegende Projektstruktur mit folgenden Ordnern:
  - src/components (für UI-Komponenten)
  - src/hooks (für Custom Hooks)
  - src/types (für TypeScript-Definitionen)
  - src/utils (für Hilfsfunktionen)
  - src/styles (für CSS-Dateien)
  - src/contexts (für React Context)
- Erstelle grundlegende TypeScript-Interfaces für:
  - Tile (Kachel-Eigenschaften)
  - GridPosition (Position im Grid)
  - AppState (Haupt-App-Zustand)
- Implementiere eine einfache App-Komponente mit "Hello World"
- Füge Jest und React Testing Library für Tests hinzu
- Erstelle einen ersten Test für die App-Komponente

Achte auf:
- Saubere Projektstruktur
- Vollständige TypeScript-Typisierung
- Konfiguration aller Tools
- Erste funktionierende Testumgebung
```

### Prompt 2: Neumorphismus Design-System

```
Erstelle ein umfassendes Neumorphismus Design-System für die Tagesbegleiter-App.

Anforderungen:
- Implementiere CSS-Klassen für neumorphische Elemente
- Erstelle folgende Komponenten:
  - NeumorphicCard (Basis-Kachel)
  - NeumorphicButton (Schaltflächen)
  - NeumorphicInput (Eingabefelder)
- Definiere Farbpalette für Light/Dark Mode:
  - Light: Hintergrund #e0e0e0, Schatten hell/dunkel
  - Dark: Hintergrund #2d3748, Schatten angepasst
- Implementiere CSS-Variablen für:
  - Primäre Hintergrundfarbe
  - Schatten-Farben (hell/dunkel)
  - Border-Radius Werte
  - Abstände und Größen
- Erstelle Hover- und Active-States für interaktive Elemente
- Implementiere "Pressed"-Effekt für Buttons

Design-Spezifikationen:
- Weiche, extrudierte Elemente
- Subtile doppelte Schatten (hell und dunkel)
- Monochromatische Farbpalette
- Keine harten Ränder
- Elemente erscheinen aus dem gleichen Material wie der Hintergrund

Erstelle Komponenten-Tests für jede neumorphische Komponente und eine Storybook-ähnliche Beispielseite zur Demonstration.
```

### Prompt 3: Grid-System und Layout-Grundlagen

```
Entwickle ein flexibles Grid-System für die Kachel-Anordnung der Tagesbegleiter-App.

Anforderungen:
- Implementiere ein Grid-System mit festen Einheiten (1x1, 2x1, 3x1)
- Erstelle einen GridContainer, der das Basis-Layout verwaltet
- Implementiere GridCell-Komponenten für einzelne Grid-Positionen
- Definiere Kachel-Größen als Enum oder Konstanten
- Erstelle Logik für:
  - Berechnung der Grid-Dimensionen basierend auf Viewport
  - Automatisches Umbrechen bei schmalen Fenstern
  - Kollisionserkennung beim Platzieren von Kacheln
- Implementiere responsive Verhalten:
  - Desktop: Feste Grid-Struktur
  - Tablet/Mobile: Automatisches Umbrechen
- Erstelle Utility-Funktionen für:
  - Grid-Position-Berechnung
  - Verfügbare Plätze finden
  - Kachel-Überlappung prüfen

Technische Details:
- Verwende CSS Grid für das Layout
- Implementiere TypeScript-Interfaces für Grid-Positionen
- Erstelle ein GridContext für Zustandsverwaltung
- Füge visuelle Gitter-Linien hinzu (optional ein-/ausblendbar)

Erstelle umfassende Unit-Tests für alle Grid-Berechnungen und Collision-Detection-Logik.
```

### Prompt 4: Basis-Kachel-System

```
Implementiere das grundlegende Kachel-System für die Tagesbegleiter-App.

Anforderungen:
- Erstelle eine abstrakte Tile-Basisklasse/Interface
- Implementiere TileWrapper-Komponente für konsistente Kachel-Darstellung
- Erstelle TileManager für Kachel-Verwaltung
- Definiere Kachel-Typen als Enum:
  - CLOCK (Uhr)
  - THEME_TOGGLE (Design-Umschalter)
  - DAY_PROGRESS (Tagesleiste)
  - PROMPT_LIBRARY (Prompt-Bibliothek)
  - DATA_ANALYSIS (Daten-Analyse)
  - SHOP (Kachel-Shop)
- Implementiere Kachel-Eigenschaften:
  - Eindeutige ID
  - Typ
  - Größe (1x1, 2x1, 3x1)
  - Position im Grid
  - Konfiguration (spezifisch pro Kachel-Typ)
- Erstelle TileRegistry für verfügbare Kachel-Typen
- Implementiere grundlegende Kachel-Operationen:
  - Kachel hinzufügen
  - Kachel entfernen
  - Kachel verschieben
  - Kachel konfigurieren

Technische Umsetzung:
- Verwende Factory Pattern für Kachel-Erstellung
- Implementiere Serialisierung für Persistierung
- Erstelle TileContext für globalen Zustand
- Implementiere Error Boundaries für Kachel-Fehler

Erstelle Mock-Implementierungen für jede Kachel-Typ und grundlegende Interaktionstests.
```

### Prompt 5: Drag & Drop Funktionalität

```
Implementiere das Drag & Drop-System für die Kachel-Anordnung.

Anforderungen:
- Erstelle ein Drag & Drop-System ohne externe Bibliotheken
- Implementiere Drag-Funktionalität:
  - Kacheln können vom aktuellen Platz aufgenommen werden
  - Visueller Feedback während des Draggings
  - Ghost-Image der Kachel folgt dem Mauszeiger
- Implementiere Drop-Funktionalität:
  - Gültige Drop-Zonen hervorheben
  - Kollisionsprüfung vor dem Drop
  - Automatisches Snap-to-Grid
- Erstelle DragDropContext für Zustandsverwaltung
- Implementiere Drag-States:
  - IDLE (Ruhezustand)
  - DRAGGING (Wird gezogen)
  - DROPPING (Wird abgelegt)
- Visuelle Feedback-Elemente:
  - Kachel wird halbtransparent während Drag
  - Gültige Drop-Bereiche werden hervorgehoben
  - Ungültige Bereiche werden rot markiert
- Implementiere Touch-Support für Mobile-Geräte

Technische Details:
- Verwende native HTML5 Drag & Drop API als Fallback
- Implementiere custom Mouse/Touch-Events für bessere Kontrolle
- Erstelle DragPreview-Komponente für Ghost-Image
- Implementiere Drag-Constraints (nur innerhalb des Grid)
- Füge Drag-Throttling hinzu für Performance

Erstelle umfassende Tests für verschiedene Drag & Drop-Szenarien und Touch-Interaktionen.
```

### Prompt 6: Kachel-Shop (Hinzufügen/Entfernen)

```
Entwickle das Kachel-Shop-System für das Hinzufügen und Entfernen von Kacheln.

Anforderungen:
- Erstelle Shop-Kachel als spezielle Kachel-Typ
- Implementiere Shop-Overlay/Modal:
  - Zeigt alle verfügbaren, nicht-platzierten Kachel-Typen
  - Kachel-Vorschau mit Beschreibung
  - "Heften"-Funktionalität (Kachel folgt Mauszeiger)
- Implementiere Kachel-Hinzufügen:
  - Klick auf Shop-Kachel öffnet Shop-Overlay
  - Klick auf verfügbare Kachel "heftet" sie an Mauszeiger
  - Klick auf freie Grid-Position platziert die Kachel
  - Escape-Taste bricht Platzierung ab
- Implementiere Kachel-Entfernen:
  - Rechtsklick auf Kachel aktiviert "Entfernen-Modus"
  - Rotes X-Icon erscheint auf der Kachel
  - Klick auf X entfernt Kachel und gibt sie im Shop frei
  - Klick außerhalb deaktiviert Entfernen-Modus
- Erstelle ShopContext für Shop-Zustandsverwaltung
- Implementiere Kachel-Eindeutigkeit:
  - Jede Kachel-Art nur einmal platzierbar
  - Bereits platzierte Kacheln im Shop ausgrauen

Technische Umsetzung:
- Verwende Portal für Shop-Overlay
- Implementiere Mauszeiger-Verfolgung für "geheftete" Kacheln
- Erstelle Animations-Effekte für Kachel-Übergänge
- Implementiere Keyboard-Shortcuts (Escape, Delete)
- Füge Accessible-Support hinzu (ARIA-Labels, Fokus-Management)

Erstelle Tests für Shop-Workflows und Kachel-Lebenszyklus-Management.
```

### Prompt 7: Uhr-Kachel mit Farbverlauf

```
Implementiere die Uhr-Kachel mit sekundengenauem Farbverlauf.

Anforderungen:
- Erstelle ClockTile-Komponente (1x1 Größe)
- Zeige aktuelle Zeit in digitalem Format (HH:MM)
- Implementiere sekundengenauen Farbverlauf:
  - Sekunde 0: Startfarbe
  - Sekunde 59: Endfarbe
  - Lineare Interpolation zwischen den Farben
- Erstelle Konfigurationsdialog:
  - Farbwähler für Startfarbe (visuell + HEX-Input)
  - Farbwähler für Endfarbe (visuell + HEX-Input)
  - Live-Vorschau der Farbänderung
  - Speichern/Abbrechen-Buttons
- Implementiere Farbinterpolation:
  - RGB-Farbinterpolation
  - HSL-Farbinterpolation als Alternative
  - Unterstützung für HEX, RGB, HSL-Eingaben
- Erstelle useTime-Hook für Zeit-Updates
- Implementiere Konfiguration-Persistierung

Technische Details:
- Update-Intervall: 1 Sekunde
- Verwende requestAnimationFrame für smooth Updates
- Implementiere Farbberechnungen als Utility-Funktionen
- Erstelle ColorPicker-Komponente (wiederverwendbar)
- Füge Farbvalidierung hinzu
- Implementiere Accessibility für Farbwähler

Erstelle Tests für Farbinterpolation, Zeit-Updates und Konfiguration-Persistierung.
```

### Prompt 8: Design-Umschalter (Light/Dark Mode)

```
Entwickle die Design-Umschalter-Kachel für Light/Dark Mode-Wechsel.

Anforderungen:
- Erstelle ThemeToggleTile-Komponente (1x1 Größe)
- Implementiere Theme-Switching:
  - Light Mode: Sonnen-Icon
  - Dark Mode: Mond-Icon
  - Smooth Transition zwischen Modi
- Erstelle ThemeContext für globales Theme-Management
- Implementiere Theme-Persistence:
  - Speichern in localStorage
  - Systemweite Theme-Anwendung
- Aktualisiere CSS-Variablen für beide Modi:
  - Hintergrundfarben
  - Schatten-Farben
  - Text-Farben
  - Accent-Farben
- Erstelle Icon-Komponenten:
  - SunIcon (für Light Mode)
  - MoonIcon (für Dark Mode)
  - Smooth Icon-Transitions

Technische Umsetzung:
- Verwende CSS-Variablen für Theme-Werte
- Implementiere useTheme-Hook
- Erstelle Theme-Definitionen als Konstanten
- Füge System-Theme-Detection hinzu (prefers-color-scheme)
- Implementiere Theme-Übergangs-Animationen
- Verwende CSS-in-JS oder CSS-Klassen für Theme-Switching

Erstelle Tests für Theme-Switching, Persistierung und System-Theme-Integration.
```

### Prompt 9: Basis-Tagesleiste

```
Implementiere die grundlegende Tagesleiste-Kachel ohne Termine.

Anforderungen:
- Erstelle DayProgressTile-Komponente (2x1 oder 3x1 Größe)
- Implementiere Setup-Dialog:
  - Startzeit-Eingabe (HH:MM)
  - Arbeitszeit-Eingabe (Stunden)
  - Berechnung der initialen Endzeit
- Erstelle Fortschritts-Visualisierung:
  - Horizontaler Fortschrittsbalken
  - Prozentuale Anzeige des Tagesfortschritts
  - Verbleibende Zeit bis Feierabend
- Implementiere Zeit-Berechnungen:
  - Aktuelle Arbeitszeit
  - Verbleibende Arbeitszeit
  - Prozentsatz des Tagesfortschritts
- Erstelle Zeitanzeige-Komponenten:
  - Startzeit-Anzeige
  - Aktuelle Zeit
  - Geplante Endzeit
- Implementiere automatisches Tagesende-Reset:
  - Um Mitternacht Reset der Tagesleiste
  - Speicherung der Tagesdaten

Technische Details:
- Verwende Date-Objekte für Zeitberechnungen
- Implementiere Time-Utility-Funktionen
- Erstelle useDayProgress-Hook
- Implementiere Validierung für Zeit-Eingaben
- Füge Fehlerzustände hinzu (ungültige Zeiten)
- Verwende Intervall-Timer für Live-Updates

Erstelle Tests für Zeit-Berechnungen, Validierung und automatisches Reset.
```

### Prompt 10: Erweiterte Tagesleiste mit Terminen

```
Erweitere die Tagesleiste um Termin-Management und Pausenfunktionalität.

Anforderungen:
- Erweitere DayProgressTile um Termin-Visualisierung
- Implementiere Event-Management:
  - Termine als Blöcke auf dem Zeitstrahl
  - Manuelle Termin-Eingabe (Titel, Startzeit, Dauer)
  - Termin-Bearbeitung und -Löschung
- Erstelle Event-Dialog:
  - Titel-Eingabe
  - Startzeit-Picker
  - Dauer-Eingabe (Minuten/Stunden)
  - Farb-Auswahl für Termin-Block
- Implementiere Pausen-Management:
  - Pausen-Eingabe (Startzeit, Endzeit)
  - Dynamische Anpassung der Gesamtarbeitszeit
  - Aktualisierung der geplanten Endzeit
- Erstelle Alarm-Funktionalität:
  - Bildschirm-Blinken bei Termin-Start
  - Browser-Notification (optional)
  - Snooze-Funktionalität
- Implementiere Timeline-Visualisierung:
  - Termine als farbige Blöcke
  - Überlappende Termine-Darstellung
  - Aktuelle Zeit-Indikator

Technische Umsetzung:
- Erweitere DayProgress-Datenmodell
- Implementiere Event-Scheduling-Logik
- Erstelle Timeline-Komponente
- Verwende Notification API für Browser-Benachrichtigungen
- Implementiere Termin-Konflikte-Erkennung
- Füge Drag & Drop für Termine hinzu (optional)

Erstelle Tests für Termin-Management, Pausen-Berechnungen und Alarm-Funktionalität.
```

### Prompt 11: Prompt-Bibliothek - Grundstruktur

```
Entwickle die Grundstruktur der Prompt-Bibliothek-Kachel.

Anforderungen:
- Erstelle PromptLibraryTile-Komponente (2x1 Größe)
- Implementiere Kategorie-Management:
  - Kategorie-Übersicht als Kachel-Grid
  - Neue Kategorie erstellen (+Kachel)
  - Kategorie umbenennen/löschen
- Erstelle Kategorie-Ansicht:
  - Prompt-Übersicht innerhalb einer Kategorie
  - Neuen Prompt erstellen (+Kachel)
  - Zurück zur Kategorie-Übersicht
- Implementiere Navigation:
  - Breadcrumb-Navigation
  - Back-Button
  - Kategorie-zu-Prompt-Navigation
- Erstelle Datenstrukturen:
  - Category-Interface (ID, Name, Prompts)
  - Prompt-Interface (ID, Title, Content, CategoryID)
- Implementiere CRUD-Operationen:
  - Kategorien erstellen, bearbeiten, löschen
  - Prompts erstellen, bearbeiten, löschen
- Erstelle PromptLibraryContext für Zustandsverwaltung

Technische Umsetzung:
- Verwende Reducer für komplexe Zustandsänderungen
- Implementiere Navigation-Stack für Ansichten
- Erstelle wiederverwendbare Card-Komponenten
- Füge Bestätigungsdialoge für Löschoperationen hinzu
- Implementiere Suchfunktionalität für Prompts
- Erstelle leere Zustände für neue Kategorien

Erstelle Tests für Navigation, CRUD-Operationen und Zustandsverwaltung.
```

### Prompt 12: Prompt-Bibliothek - Editor und Platzhalter

```
Implementiere den Prompt-Editor mit Platzhalter-Funktionalität.

Anforderungen:
- Erstelle PromptEditor-Komponente:
  - Titel-Eingabe
  - Rich-Text-Editor für Prompt-Inhalt
  - Platzhalter-Erstellung durch Textmarkierung
- Implementiere Platzhalter-System:
  - Text markieren und zu Platzhalter konvertieren
  - Platzhalter-Namen eingeben
  - Platzhalter-Syntax: [PLATZHALTER_NAME]
  - Platzhalter visuell hervorheben
- Erstelle Platzhalter-Verwaltung:
  - Liste aller Platzhalter im Prompt
  - Platzhalter umbenennen/löschen
  - Platzhalter-Validierung (keine Duplikate)
- Implementiere Text-Parsing:
  - Platzhalter aus Text extrahieren
  - Text mit Platzhaltern rendern
  - Platzhalter-Highlighting im Editor
- Erstelle Vorschau-Funktionalität:
  - Live-Vorschau mit hervorgehobenen Platzhaltern
  - Syntax-Highlighting für Platzhalter
- Implementiere Editor-Funktionen:
  - Undo/Redo
  - Textformatierung (optional)
  - Speichern/Abbrechen

Technische Umsetzung:
- Verwende contentEditable oder Text-Area mit Syntax-Highlighting
- Implementiere Platzhalter-Regex für Parsing
- Erstelle Platzhalter-Utility-Funktionen
- Füge Editor-Keyboard-Shortcuts hinzu
- Implementiere Autosave-Funktionalität
- Erstelle Platzhalter-Validierung

Erstelle Tests für Platzhalter-Parsing, Editor-Funktionen und Validierung.
```

### Prompt 13: Prompt-Bibliothek - Verwendung und Formular

```
Implementiere die Prompt-Verwendung mit dynamischem Formular.

Anforderungen:
- Erstelle PromptUsageForm-Komponente:
  - Dynamisches Formular basierend auf Platzhaltern
  - Ein Eingabefeld pro Platzhalter
  - Kontext-Anzeige für jeden Platzhalter
- Implementiere Kontext-Hilfe:
  - Umgebender Satz wird über leerem Eingabefeld angezeigt
  - Platzhalter-Name farblich hervorgehoben
  - Hilfe verschwindet bei Eingabe
- Erstelle Prompt-Ersetzung:
  - Platzhalter durch Benutzereingaben ersetzen
  - Generierung des finalen Textes
  - Kopieren in Zwischenablage
- Implementiere Formular-Validierung:
  - Pflichtfelder-Validierung
  - Eingabe-Validierung (falls spezifiziert)
  - Fehler-Anzeige
- Erstelle Prompt-Vorschau:
  - Live-Vorschau des generierten Textes
  - Hervorhebung eingefügter Werte
  - Vor-/Nach-Vergleich
- Implementiere Clipboard-Integration:
  - Kopieren-Button für generierten Text
  - Erfolgsmeldung nach Kopieren
  - Fallback für ältere Browser

Technische Umsetzung:
- Verwende Clipboard API für Kopieren
- Implementiere Formular-Zustandsverwaltung
- Erstelle Prompt-Replacement-Engine
- Füge Formular-Persistence hinzu (Draft-Speicherung)
- Implementiere Keyboard-Shortcuts (Ctrl+Enter für Kopieren)
- Erstelle Eingabe-Komponenten für verschiedene Datentypen

Erstelle Tests für Formular-Generierung, Prompt-Ersetzung und Clipboard-Integration.
```

### Prompt 14: Daten-Analyse-Kachel

```
Implementiere die Daten-Analyse-Kachel für Arbeitszeit-Statistiken.

Anforderungen:
- Erstelle DataAnalysisTile-Komponente (2x1 Größe)
- Implementiere Datenerfassung:
  - Tägliche Speicherung von Startzeit und Endzeit
  - Automatische Erfassung bei Tagesende
  - Datenstruktur mit Datum, Startzeit, Endzeit
- Erstelle Statistik-Berechnungen:
  - Durchschnittliche Startzeit
  - Durchschnittliche Endzeit
  - Durchschnittliche Arbeitszeit
  - Trend-Analyse (optional)
- Implementiere Zeitraum-Filter:
  - "Maximal" (alle verfügbaren Daten)
  - "30 Tage" (letzten 30 Tage)
  - Tab-Navigation zwischen Filtern
- Erstelle Datenvisualisierung:
  - Textuelle Anzeige der Durchschnittswerte
  - Einfache Trend-Indikatoren (Pfeile)
  - Farbkodierung (grün/rot für Trends)
- Implementiere Daten-Persistierung:
  - Speicherung in localStorage (vorerst)
  - Datenexport-Funktionalität
  - Datenimport-Funktionalität
- Erstelle Leere-Zustände:
  - Anzeige wenn keine Daten vorhanden
  - Hinweis auf benötigte Mindestdaten

Technische Umsetzung:
- Verwende Date-Objekte für Zeitberechnungen
- Implementiere Statistik-Utility-Funktionen
- Erstelle Daten-Aggregations-Logik
- Füge Datenvalidierung hinzu
- Implementiere Daten-Migration für Schema-Änderungen
- Erstelle Chart-Komponenten (optional)

Erstelle Tests für Statistik-Berechnungen, Datenfilterung und Persistierung.
```

### Prompt 15: Firebase Authentication Integration

```
Integriere Firebase Authentication in die Tagesbegleiter-App.

Anforderungen:
- Konfiguriere Firebase-Projekt:
  - Firebase SDK Installation
  - Konfiguration der Authentifizierung
  - E-Mail/Passwort-Provider aktivieren
- Erstelle Authentication-Komponenten:
  - LoginForm (E-Mail, Passwort, Login-Button)
  - RegisterForm (E-Mail, Passwort, Bestätigung)
  - AuthGuard für geschützte Routen
- Implementiere AuthContext:
  - Globaler Authentifizierungsstatus
  - Benutzer-Informationen
  - Login/Logout-Funktionen
- Erstelle Authentication-Flow:
  - Automatische Anmeldung bei gespeicherter Session
  - Weiterleitung nach Login/Logout
  - Passwort-Reset-Funktionalität
- Implementiere Fehlerbehandlung:
  - Firebase-Fehler-Codes übersetzen
  - Benutzerfreundliche Fehlermeldungen
  - Network-Fehler-Handling
- Erstelle Benutzer-Profil:
  - Basis-Profil-Informationen
  - Profil-Bearbeitung
  - Account-Löschung

Technische Umsetzung:
- Verwende Firebase Auth SDK
- Implementiere useAuth-Hook
- Erstelle Authentifizierungs-Middleware
- Füge Form-Validierung hinzu
- Implementiere Persistent-Login
- Erstelle Logout-Funktionalität

Erstelle Tests für Authentication-Flow, Fehlerbehandlung und Benutzer-Verwaltung.
```

### Prompt 16: Firestore-Datenbank Integration

```
Implementiere Firestore-Integration für Daten-Persistierung und Synchronisation.

Anforderungen:
- Konfiguriere Firestore-Datenbank:
  - Firestore SDK Installation
  - Datenbank-Regeln für Benutzer-Scoped-Daten
  - Collections-Struktur definieren
- Erstelle Datenbank-Services:
  - UserDataService für Benutzer-spezifische Daten
  - PromptService für Prompt-Management
  - SettingsService für App-Einstellungen
- Implementiere CRUD-Operationen:
  - Create: Neue Dokumente erstellen
  - Read: Daten laden und synchronisieren
  - Update: Änderungen speichern
  - Delete: Daten löschen
- Erstelle Daten-Synchronisation:
  - Real-time Listener für Änderungen
  - Offline-Unterstützung
  - Konflikt-Resolution
- Implementiere Datenmodelle:
  - User-Settings (Theme, Layout)
  - Prompt-Categories und Prompts
  - Daily-Logs für Statistiken
- Erstelle Backup/Restore-Funktionalität:
  - Vollständiger Datenexport
  - Datenimport aus Backup
  - Daten-Migration zwischen Versionen

Technische Umsetzung:
- Verwende Firestore SDK mit TypeScript
- Implementiere Firestore-Hooks (useDocument, useCollection)
- Erstelle Datenbank-Utility-Funktionen
- Füge Offline-Caching hinzu
- Implementiere Batch-Operationen für Performance
- Erstelle Datenvalidierung

Erstelle Tests für Datenbank-Operationen, Synchronisation und Offline-Verhalten.
```

### Prompt 17: Lokale Datenpersistierung und Auto-Save

```
Implementiere lokale Datenpersistierung und Auto-Save-Funktionalität.

Anforderungen:
- Erstelle LocalStorage-Service:
  - Wrapper für localStorage-Operationen
  - Serialisierung/Deserialisierung von Objekten
  - Fehlerbehandlung für Storage-Limits
- Implementiere Auto-Save-System:
  - Automatisches Speichern bei jeder Änderung
  - Debouncing für Performance-Optimierung
  - Batch-Updates für mehrere Änderungen
- Erstelle Daten-Synchronisation:
  - Sync zwischen localStorage und Firestore
  - Konflikt-Resolution bei unterschiedlichen Daten
  - Offline-First-Approach
- Implementiere Daten-Recovery:
  - Wiederherstellung bei App-Crash
  - Backup-Mechanismus für kritische Daten
  - Validation von gespeicherten Daten
- Erstelle Storage-Management:
  - Storage-Quota-Überwachung
  - Cleanup alter/ungültiger Daten
  - Komprimierung großer Datensätze
- Implementiere Tagesleiste-Persistierung:
  - Automatisches Speichern des aktuellen Tagesstatus
  - Wiederherstellung bei Seiten-Reload
  - Backup vor Mitternacht-Reset

Technische Umsetzung:
- Verwende JSON für Serialisierung
- Implementiere useLocalStorage-Hook
- Erstelle Storage-Event-Listener für Tab-Synchronisation
- Füge Compression-Library hinzu (optional)
- Implementiere Storage-Migration für Schema-Updates
- Erstelle Storage-Diagnostics für Debugging

Erstelle Tests für Storage-Operationen, Auto-Save-Mechanismus und Daten-Recovery.
```

### Prompt 18: Outlook-Integration (Microsoft Graph API)

```
Implementiere die optionale Outlook-Integration für automatischen Termin-Import.

Anforderungen:
- Konfiguriere Microsoft Graph API:
  - App-Registrierung in Azure Active Directory
  - OAuth2-Authentifizierung implementieren
  - Erforderliche Permissions (Calendars.Read)
- Erstelle OutlookService:
  - Authentifizierung mit Microsoft
  - Kalender-Daten abrufen
  - Termine für aktuellen Tag filtern
- Implementiere Integration-UI:
  - Outlook-Verbindung aktivieren/deaktivieren
  - Autorisierung-Flow für Benutzer
  - Status-Anzeige der Verbindung
- Erstelle Termin-Import:
  - Heutige Termine aus Outlook laden
  - Termine in App-Format konvertieren
  - Synchronisation mit manuellen Terminen
- Implementiere Fehlerbehandlung:
  - API-Fehler abfangen und anzeigen
  - Token-Refresh-Mechanismus
  - Fallback bei Verbindungsproblemen
- Erstelle Datenschutz-Features:
  - Benutzer-Zustimmung für Datenzugriff
  - Daten-Minimierung (nur heute)
  - Verbindung jederzeit trennbar

Technische Umsetzung:
- Verwende Microsoft Graph SDK
- Implementiere MSAL (Microsoft Authentication Library)
- Erstelle OAuth2-Flow mit PKCE
- Füge Token-Storage hinzu (sicher)
- Implementiere API-Rate-Limiting
- Erstelle Termin-Mapping-Funktionen

Erstelle Tests für API-Integration, Authentifizierung und Termin-Import.
```

### Prompt 19: Responsive Design und Mobile Optimierung

```
Optimiere die App für verschiedene Bildschirmgrößen und implementiere responsive Design.

Anforderungen:
- Erstelle Responsive-Breakpoints:
  - Desktop: >1200px (Standard-Layout)
  - Tablet: 768px-1199px (angepasstes Grid)
  - Mobile: <768px (gestapeltes Layout)
- Implementiere Mobile-Navigation:
  - Hamburger-Menü für kleine Bildschirme
  - Touch-optimierte Buttons und Inputs
  - Swipe-Gesten für Kachel-Navigation
- Erstelle Mobile-Grid-System:
  - Automatisches Stacking der Kacheln
  - Angepasste Kachel-Größen für Mobilgeräte
  - Touch-optimiertes Drag & Drop
- Implementiere Touch-Interaktionen:
  - Touch-Events für alle Interaktionen
  - Long-Press für Kontextmenüs
  - Pinch-to-Zoom Prevention
- Erstelle Mobile-spezifische Komponenten:
  - Mobile-DatePicker
  - Mobile-TimePicker
  - Mobile-ColorPicker
- Implementiere Viewport-Management:
  - Korrekte Meta-Viewport-Tags
  - Orientation-Change-Handling
  - Safe-Area-Support (iOS Notch)

Technische Umsetzung:
- Verwende CSS Container Queries
- Implementiere useMediaQuery-Hook
- Erstelle Mobile-Detection-Utilities
- Füge Touch-Event-Handler hinzu
- Implementiere Virtual-Keyboard-Handling
- Erstelle Progressive-Web-App-Features

Erstelle Tests für verschiedene Viewport-Größen und Touch-Interaktionen.
```

### Prompt 20: Performance-Optimierung

```
Implementiere umfassende Performance-Optimierungen für die App.

Anforderungen:
- Erstelle Code-Splitting:
  - Route-basiertes Code-Splitting
  - Component-basiertes Lazy-Loading
  - Dynamic Imports für große Komponenten
- Implementiere Memoization:
  - React.memo für Komponenten
  - useMemo für teure Berechnungen
  - useCallback für Event-Handler
- Erstelle Virtual-Scrolling:
  - Für große Listen (Prompts, Termine)
  - Infinite-Scrolling für Daten-Historie
  - Optimierte Rendering-Performance
- Implementiere Image-Optimierung:
  - WebP-Format für bessere Kompression
  - Lazy-Loading für Bilder
  - Responsive Images
- Erstelle Bundle-Optimierung:
  - Tree-Shaking für ungenutzten Code
  - Bundle-Analyzer für Größen-Monitoring
  - CSS-Purging für ungenutzte Styles
- Implementiere Caching-Strategien:
  - Service-Worker für App-Caching
  - API-Response-Caching
  - Static-Asset-Caching

Technische Umsetzung:
- Verwende React.lazy und Suspense
- Implementiere Web-Workers für schwere Berechnungen
- Erstelle Performance-Monitoring
- Füge Bundle-Size-Limits hinzu
- Implementiere Preloading-Strategien
- Erstelle Performance-Budgets

Erstelle Performance-Tests und Monitoring für kritische Pfade.
```

### Prompt 21: Umfassende Test-Suite

```
Erstelle eine vollständige Test-Suite für die gesamte Anwendung.

Anforderungen:
- Implementiere Unit-Tests:
  - Alle Utility-Funktionen (Zeit-Berechnungen, Farbinterpolation)
  - Alle Custom-Hooks (useTime, useAuth, etc.)
  - Alle Services (LocalStorage, Firebase, etc.)
- Erstelle Component-Tests:
  - Alle Kachel-Komponenten einzeln
  - Interaktionslogik und State-Changes
  - Prop-Handling und Error-States
- Implementiere Integration-Tests:
  - Vollständige User-Workflows
  - Kachel-Interaktionen mit globalem State
  - Authentication und Daten-Persistierung
- Erstelle E2E-Tests:
  - Komplette User-Journeys
  - Cross-Browser-Kompatibilität
  - Mobile-Device-Testing
- Implementiere Visual-Regression-Tests:
  - Screenshot-Tests für alle Komponenten
  - Neumorphism-Styling-Verification
  - Theme-Switching-Tests
- Erstelle Performance-Tests:
  - Loading-Zeit-Messungen
  - Memory-Leak-Detection
  - Bundle-Size-Monitoring

Test-Szenarien:
- Tagesablauf: Login → Setup → Events → Pausen → Logout
- Prompt-Management: Kategorie erstellen → Prompt erstellen → Verwenden
- Theme-Switching und Responsive-Verhalten
- Offline-Nutzung und Sync nach Reconnect
- Fehlerbehandlung bei API-Ausfällen

Technische Umsetzung:
- Verwende Jest + React Testing Library
- Implementiere MSW (Mock Service Worker) für API-Mocks
- Erstelle Test-Utilities und Custom-Matchers
- Füge Coverage-Reporting hinzu (Ziel: >90%)
- Implementiere CI/CD-Integration
- Erstelle Test-Datenbank für Integrationstests

Konfiguriere automatische Test-Ausführung und Coverage-Reports.
```

### Prompt 22: Accessibility und Internationalisierung

```
Implementiere Accessibility-Features und Internationalisierungs-Unterstützung.

Anforderungen:
- Erstelle Accessibility-Features:
  - ARIA-Labels für alle interaktiven Elemente
  - Keyboard-Navigation für gesamte App
  - Screen-Reader-Unterstützung
  - Focus-Management bei Modals/Overlays
  - High-Contrast-Mode-Unterstützung
- Implementiere Keyboard-Shortcuts:
  - Globale Shortcuts (Escape, Tab-Navigation)
  - Kachel-spezifische Shortcuts
  - Shortcut-Hilfe-Dialog
- Erstelle Internationalisierung:
  - i18n-Framework-Integration (react-i18next)
  - Deutsche und englische Übersetzungen
  - Datum/Zeit-Formatierung nach Locale
  - Rechtschreibung-abhängige Layouts (RTL-Support)
- Implementiere User-Preferences:
  - Sprach-Auswahl-Komponente
  - Accessibility-Einstellungen
  - Reduzierte Animationen für Motion-Sensitivity
- Erstelle Semantic-HTML:
  - Korrekte HTML-Struktur für Screen-Reader
  - Landmark-Regions (main, nav, aside)
  - Hierarchische Heading-Struktur
- Implementiere Color-Accessibility:
  - Ausreichende Kontrastverhältnisse
  - Farbenblind-sichere Farbpalette
  - Alternative zu rein farbbasierten Informationen

Technische Umsetzung:
- Verwende axe-core für Accessibility-Testing
- Implementiere useA11y-Hooks
- Erstelle ARIA-Utility-Komponenten
- Füge Locale-Detection hinzu
- Implementiere Dynamic-Import für Übersetzungen
- Erstelle Accessibility-Linting-Rules

Erstelle Accessibility-Tests und Multi-Language-Tests.
```

### Prompt 23: Deployment und Production-Optimierung

```
Bereite die App für Production-Deployment vor und implementiere DevOps-Workflows.

Anforderungen:
- Erstelle Build-Optimierung:
  - Production-Build-Konfiguration
  - Asset-Optimization (Bilder, Fonts)
  - Service-Worker für Offline-Funktionalität
  - PWA-Manifest für Installation
- Implementiere CI/CD-Pipeline:
  - GitHub Actions für automatische Builds
  - Automatische Tests bei Pull-Requests
  - Deployment-Automation
  - Environment-spezifische Konfigurationen
- Erstelle Monitoring-System:
  - Error-Tracking (Sentry oder ähnlich)
  - Performance-Monitoring
  - User-Analytics (Privacy-compliant)
  - Uptime-Monitoring
- Implementiere Security-Measures:
  - Content-Security-Policy (CSP)
  - HTTPS-Enforcement
  - API-Rate-Limiting
  - Input-Sanitization
- Erstelle Backup-Strategien:
  - Automatische Firestore-Backups
  - User-Data-Export-Tools
  - Disaster-Recovery-Plan
- Implementiere Staging-Environment:
  - Separate Firebase-Projekte
  - Feature-Flags für Beta-Features
  - A/B-Testing-Framework

Deployment-Targets:
- Firebase Hosting (primär)
- Netlify (Alternative)
- Vercel (Alternative)
- Docker-Container (für Self-Hosting)

Technische Umsetzung:
- Verwende Vite für optimierte Builds
- Implementiere Environment-Variables
- Erstelle Health-Check-Endpoints
- Füge Logging-Framework hinzu
- Implementiere Feature-Toggle-System
- Erstelle Documentation-Website

Erstelle Deployment-Tests und Monitoring-Dashboards.
```

### Prompt 24: Dokumentation und Wartbarkeit

```
Erstelle umfassende Dokumentation und implementiere Wartbarkeits-Features.

Anforderungen:
- Erstelle Code-Dokumentation:
  - TypeScript-Interfaces vollständig dokumentiert
  - JSDoc-Kommentare für alle Public-APIs
  - README mit Setup-Anweisungen
  - Architecture-Decision-Records (ADRs)
- Implementiere Storybook:
  - Stories für alle UI-Komponenten
  - Interaktive Komponenten-Dokumentation
  - Design-System-Showcase
  - Accessibility-Tests in Storybook
- Erstelle User-Documentation:
  - Getting-Started-Guide
  - Feature-Erklärungen mit Screenshots
  - FAQ für häufige Probleme
  - Video-Tutorials (optional)
- Implementiere Developer-Tools:
  - Debug-Panel für Development
  - State-Inspector für Redux/Context
  - Performance-Profiler
  - Feature-Flag-Toggler
- Erstelle Wartungs-Scripts:
  - Database-Migration-Scripts
  - Data-Cleanup-Tools
  - Backup/Restore-Utilities
  - Health-Check-Scripts
- Implementiere Logging-System:
  - Structured-Logging
  - Log-Level-Configuration
  - Error-Context-Capture
  - Performance-Metrics-Logging

Dokumentations-Struktur:
- /docs/api - API-Dokumentation
- /docs/components - Komponenten-Dokumentation
- /docs/architecture - Architektur-Übersicht
- /docs/deployment - Deployment-Guides
- /docs/contributing - Contribution-Guidelines

Technische Umsetzung:
- Verwende TypeDoc für API-Dokumentation
- Implementiere Documentation-Website (Docusaurus)
- Erstelle Interactive-Demos
- Füge Code-Examples hinzu
- Implementiere Documentation-Testing
- Erstelle Onboarding-Checklists

Erstelle Dokumentations-Reviews und Update-Workflows.
```

---

## Zusammenfassung der Implementierungsstrategie

### Reihenfolge der Umsetzung:
1. **Grundlagen** (Prompts 1-4): Projekt-Setup, Design-System, Grid, Kachel-System
2. **Interaktionen** (Prompts 5-6): Drag & Drop, Shop-System
3. **Basis-Kacheln** (Prompts 7-9): Uhr, Theme-Toggle, Basis-Tagesleiste
4. **Erweiterte Features** (Prompts 10-14): Vollständige Kacheln
5. **Backend-Integration** (Prompts 15-18): Firebase, Outlook-Integration
6. **Optimierung** (Prompts 19-21): Responsive, Performance, Tests
7. **Production** (Prompts 22-24): A11y, Deployment, Dokumentation

### Wichtige Prinzipien:
- **Test-Driven Development**: Jeder Prompt enthält spezifische Test-Anforderungen
- **Iterative Entwicklung**: Kleine, testbare Schritte ohne große Sprünge
- **Vollständige Integration**: Jeder Schritt baut auf vorherigen auf
- **Best Practices**: TypeScript, Accessibility, Performance von Anfang an
- **Modular Architecture**: Wiederverwendbare Komponenten und Services

### Geschätzte Entwicklungszeit:
- Erfahrener Entwickler: 8-12 Wochen
- Team von 2-3 Entwicklern: 4-6 Wochen
- Mit allen Tests und Dokumentation: +2-3 Wochen

Jeder Prompt ist so konzipiert, dass er eigenständig umsetzbar ist und das Projekt kontinuierlich voranbringt, ohne dass größere Refactoring-Zyklen notwendig werden.