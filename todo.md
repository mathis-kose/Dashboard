Selbstverständlich. Als Ihr Projektmanager präsentiere ich Ihnen hiermit die umsetzbare und granulare Roadmap in Form einer `todo.md`-Datei.

Dieses Dokument übersetzt den strategischen `Blueprint.md` in konkrete, nachverfolgbare Aufgaben. Jede Phase und jeder Prompt wurde in detaillierte Arbeitspakete zerlegt, um maximale Transparenz und eine reibungslose Umsetzung zu gewährleisten.

---

# Roadmap: Tagesbegleiter - todo.md

Dieses Dokument dient als detaillierte und umsetzbare Roadmap für die Entwicklung der "Tagesbegleiter" Web-App, basierend auf der `Blueprint.md`. Jeder Punkt ist eine konkrete Aufgabe, die abgehakt werden kann, um den Fortschritt präzise zu verfolgen.

## Legende
- `[ ]`: Offene Aufgabe
- `[x]`: Erledigte Aufgabe
- `[PXX]`: Referenz zum korrespondierenden Prompt in `Blueprint.md`
- `[T]`: Spezifische Testaufgabe

---

## Gesamtfortschritt
- **Phasen abgeschlossen:** 0 / 7
- **Aufgaben erledigt:** 0 / 186

---

## Phase 1: Grundlegende Infrastruktur (Status: 0/28 Aufgaben)

### [P1] Projekt-Setup und Grundstruktur
- [ ] Vite-Projekt initialisieren (React + TypeScript).
- [ ] TypeScript `tsconfig.json` mit strikten Einstellungen (`strict: true`) konfigurieren.
- [ ] Tailwind CSS installieren und konfigurieren (`tailwind.config.js`, `postcss.config.js`).
- [ ] Verzeichnisstruktur anlegen: `src/{components,hooks,types,utils,styles,contexts}`.
- [ ] Grundlegende TypeScript-Interfaces in `src/types` definieren: `Tile`, `GridPosition`, `AppState`.
- [ ] Einfache `App`-Komponente mit "Hello World" implementieren.
- [ ] Jest und React Testing Library installieren und konfigurieren (`jest.config.js`, `setupTests.ts`).
- [ ] [T] Ersten Unit-Test für die `App`-Komponente erstellen und die Testumgebung validieren.

### [P2] Neumorphismus Design-System
- [ ] CSS-Variablen für Farbpalette (Light/Dark Mode), Schatten, Radien und Abstände in `src/styles/theme.css` definieren.
- [ ] Komponente `NeumorphicCard` in `src/components/ui` erstellen.
- [ ] Komponente `NeumorphicButton` mit Hover-, Active- und "Pressed"-Effekten erstellen.
- [ ] Komponente `NeumorphicInput` erstellen.
- [ ] Eine Storybook-ähnliche Demoseite erstellen, die alle Neumorphismus-Komponenten darstellt.
- [ ] [T] Komponenten-Tests für `NeumorphicCard` schreiben.
- [ ] [T] Komponenten-Tests für `NeumorphicButton` (inkl. Interaktions-States) schreiben.
- [ ] [T] Komponenten-Tests für `NeumorphicInput` schreiben.

### [P3] Grid-System und Layout-Grundlagen
- [ ] `GridContainer`-Komponente implementieren (CSS Grid).
- [ ] `GridCell`-Komponente für einzelne Zellen erstellen.
- [ ] Kachel-Größen als Enum oder Konstanten definieren (z.B. `TILE_SIZE.W1H1`, `TILE_SIZE.W2H1`).
- [ ] Logik für responsive Grid-Dimensionen basierend auf dem Viewport implementieren.
- [ ] Utility-Funktion `checkCollision` für Kachel-Überlappung erstellen.
- [ ] Utility-Funktion `findAvailableSpot` für die Platzierung neuer Kacheln erstellen.
- [ ] `GridContext` zur Verwaltung des Grid-Zustands einrichten.
- [ ] Visuelle Gitter-Linien als zuschaltbare Debug-Option implementieren.
- [ ] [T] Unit-Tests für `checkCollision`-Logik schreiben.
- [ ] [T] Unit-Tests für `findAvailableSpot`-Logik schreiben.

### [P4] Basis-Kachel-System
- [ ] `Tile` Enum mit allen Kachel-Typen definieren.
- [ ] `TileWrapper`-Komponente erstellen, die jede Kachel umschließt und gemeinsame Funktionen (z.B. Header) bereitstellt.
- [ ] `TileRegistry` implementieren, um Kachel-Metadaten (Größe, Komponente) zu verwalten.
- [ ] Factory Pattern für die dynamische Erstellung von Kachel-Komponenten basierend auf ihrem Typ implementieren.
- [ ] `TileContext` zur Verwaltung der platzierten Kacheln (ID, Typ, Position, Größe, Konfiguration) einrichten.
- [ ] [T] Tests für die `TileRegistry` und das Factory Pattern erstellen.

---

## Phase 2: Kern-Dashboard-Funktionalität (Status: 0/21 Aufgaben)

### [P5] Drag & Drop Funktionalität
- [ ] `DragDropContext` zur Verwaltung des Drag-Zustands (`IDLE`, `DRAGGING`) erstellen.
- [ ] Custom Hook `useDraggable` implementieren, der `onMouseDown`/`onTouchStart`-Events behandelt.
- [ ] `DragPreview`-Komponente erstellen, die dem Mauszeiger als "Ghost-Image" folgt.
- [ ] Logik für das Hervorheben gültiger Drop-Zonen im Grid implementieren.
- [ ] Snap-to-Grid-Logik beim Loslassen der Kachel implementieren.
- [ ] Kollisionsprüfung während des Ziehens und vor dem Droppen integrieren.
- [ ] Touch-Support für mobile Geräte sicherstellen.
- [ ] Drag-Throttling zur Performance-Optimierung bei schnellen Mausbewegungen implementieren.
- [ ] [T] Umfassende Tests für Drag & Drop-Szenarien (gültiger Drop, ungültiger Drop, Kollision) erstellen.

### [P6] Kachel-Shop (Hinzufügen/Entfernen)
- [ ] `Shop`-Kachel (als spezielle Kachel oder fester Button) erstellen.
- [ ] Shop-Overlay/Modal mit `React.Portal` implementieren.
- [ ] Ansicht aller verfügbaren, nicht platzierten Kacheln im Shop-Overlay erstellen.
- [ ] "Heften"-Funktionalität: Kachel aus dem Shop auswählen, die dann dem Mauszeiger folgt.
- [ ] Platzierungslogik: Klick auf eine freie Grid-Position platziert die "geheftete" Kachel.
- [ ] Abbruch-Logik für die Platzierung implementieren (z.B. via Escape-Taste).
- [ ] Kontextmenü (Rechtsklick) auf Kacheln für "Entfernen"-Option implementieren.
- [ ] Visuellen "Entfernen-Modus" mit einem X-Icon auf der Kachel umsetzen.
- [ ] Logik zum Entfernen einer Kachel und zur Rückgabe an den Shop implementieren.
- [ ] `ShopContext` zur Verwaltung des Shop-Zustands (verfügbare/platzierte Kacheln) erstellen.
- [ ] Sicherstellen, dass jede Kachel-Art nur einmal platziert werden kann.
- [ ] [T] Tests für den kompletten Kachel-Lebenszyklus (Shop -> Platzieren -> Verschieben -> Entfernen -> Shop) erstellen.

---

## Phase 3: Grundlegende Kacheln (Status: 0/22 Aufgaben)

### [P7] Uhr-Kachel mit Farbverlauf
- [ ] `ClockTile`-Komponente (1x1) erstellen.
- [ ] `useTime`-Hook für sekundengenaue Zeit-Updates mit `requestAnimationFrame` implementieren.
- [ ] Funktion zur linearen Farbinterpolation (RGB/HSL) in `src/utils` erstellen.
- [ ] Kachelhintergrund dynamisch basierend auf der aktuellen Sekunde und den konfigurierten Farben aktualisieren.
- [ ] Konfigurationsdialog für die Kachel erstellen (Öffnen z.B. über ein Zahnrad-Icon).
- [ ] Wiederverwendbare `ColorPicker`-Komponente implementieren.
- [ ] Konfiguration (Start-/Endfarbe) im `TileContext` speichern.
- [ ] [T] Unit-Tests für die Farbinterpolations-Funktion schreiben.
- [ ] [T] Tests für die Konfigurationsänderung und deren Persistierung erstellen.

### [P8] Design-Umschalter (Light/Dark Mode)
- [ ] `ThemeToggleTile`-Komponente (1x1) erstellen.
- [ ] `SunIcon`- und `MoonIcon`-Komponenten erstellen.
- [ ] `ThemeContext` für globales Theme-Management (`light`, `dark`) implementieren.
- [ ] `useTheme`-Hook für einfachen Zugriff auf den Kontext erstellen.
- [ ] Theme-Wechsel-Logik implementieren, die die CSS-Klasse auf dem `<html>`- oder `<body>`-Tag ändert.
- [ ] CSS-Transitions für einen weichen Übergang zwischen den Modi hinzufügen.
- [ ] Persistierung des gewählten Themes im `localStorage` umsetzen.
- [ ] System-Theme-Detection (`prefers-color-scheme`) als Standardwert implementieren.
- [ ] [T] Tests für Theme-Wechsel und Persistierung erstellen.

### [P9] Basis-Tagesleiste
- [ ] `DayProgressTile`-Komponente (z.B. 2x1) erstellen.
- [ ] Setup-Dialog für die erstmalige Konfiguration (Startzeit, Arbeitsdauer) implementieren.
- [ ] `useDayProgress`-Hook zur Berechnung des Fortschritts erstellen.
- [ ] Zeitberechnungs-Funktionen in `src/utils` implementieren (vergangene Zeit, verbleibende Zeit, Prozentsatz).
- [ ] Fortschrittsbalken-Komponente zur Visualisierung erstellen.
- [ ] Automatisches Reset der Tagesdaten um Mitternacht implementieren.
- [ ] [T] Unit-Tests für alle Zeitberechnungen erstellen.
- [ ] [T] Tests für den Setup-Dialog und das automatische Reset schreiben.

---

## Phase 4: Erweiterte Funktionalitäten (Status: 0/41 Aufgaben)

### [P10] Erweiterte Tagesleiste mit Terminen
- [ ] Datenmodell der Tagesleiste um Termine und Pausen erweitern.
- [ ] `Timeline`-Komponente zur Visualisierung des Tagesablaufs mit Terminblöcken erstellen.
- [ ] UI zum Hinzufügen/Bearbeiten/Löschen von Terminen (Titel, Start, Dauer, Farbe) implementieren.
- [ ] UI zur Erfassung von Pausen implementieren.
- [ ] Logik zur dynamischen Anpassung der Endzeit basierend auf Pausen erstellen.
- [ ] Browser Notification API für Termin-Alarme integrieren.
- [ ] [T] Tests für die Termin-CRUD-Operationen erstellen.
- [ ] [T] Tests für die Berechnung der Endzeit mit Pausen erstellen.

### [P11] Prompt-Bibliothek - Grundstruktur
- [ ] `PromptLibraryTile`-Komponente (z.B. 2x1) erstellen.
- [ ] Datenstrukturen (Interfaces) für `Category` und `Prompt` definieren.
- [ ] `PromptLibraryContext` mit einem `useReducer` für die Zustandsverwaltung einrichten.
- [ ] Kategorie-Übersichtsansicht (Grid von Kategorie-Kacheln) implementieren.
- [ ] Prompt-Übersichtsansicht (Liste von Prompts innerhalb einer Kategorie) implementieren.
- [ ] Navigationslogik (Breadcrumbs, Back-Button) zwischen den Ansichten erstellen.
- [ ] CRUD-Funktionen für Kategorien implementieren.
- [ ] CRUD-Funktionen für Prompts implementieren.
- [ ] Bestätigungsdialoge für Löschoperationen hinzufügen.
- [ ] [T] Unit-Tests für den Reducer (alle Aktionen) schreiben.

### [P12] Prompt-Bibliothek - Editor und Platzhalter
- [ ] `PromptEditor`-Komponente mit Titel-Input und `contentEditable`-Bereich oder Textarea erstellen.
- [ ] Logik zur Konvertierung von markiertem Text in einen Platzhalter `[PLATZHALTER_NAME]` implementieren.
- [ ] UI zur Verwaltung der Platzhalter (Liste, Umbenennen, Löschen) neben dem Editor erstellen.
- [ ] Regex-basierte Parser-Funktion zum Extrahieren von Platzhaltern aus einem Text erstellen.
- [ ] Syntax-Highlighting für Platzhalter im Editor realisieren.
- [ ] Autosave-Funktionalität für den Editor implementieren.
- [ ] [T] Unit-Tests für die Platzhalter-Parser-Funktion schreiben.
- [ ] [T] Tests für die Editor-Interaktionen (Platzhalter erstellen/löschen) erstellen.

### [P13] Prompt-Bibliothek - Verwendung und Formular
- [ ] `PromptUsageForm`-Komponente erstellen, die dynamisch Formularfelder basierend auf den Platzhaltern generiert.
- [ ] "Kontext-Hilfe"-Feature implementieren, das den umgebenden Satz über dem Eingabefeld anzeigt.
- [ ] Echtzeit-Vorschau des finalen Textes während der Eingabe implementieren.
- [ ] Logik zur Ersetzung der Platzhalter mit den Formulareingaben erstellen.
- [ ] "In Zwischenablage kopieren"-Button mit der Clipboard API implementieren.
- [ ] Erfolgs-Feedback nach dem Kopieren anzeigen.
- [ ] [T] Tests für die dynamische Formular-Generierung erstellen.
- [ ] [T] Tests für die Textersetzung und die Kopier-Funktion erstellen.

### [P14] Daten-Analyse-Kachel
- [ ] `DataAnalysisTile`-Komponente (z.B. 2x1) erstellen.
- [ ] Logik zur täglichen Speicherung der Arbeitszeit-Daten (Start, Ende, Dauer) im `localStorage` implementieren.
- [ ] Statistik-Funktionen in `src/utils` zur Berechnung von Durchschnittswerten erstellen.
- [ ] Tab-basierte UI für Zeitraum-Filter (30 Tage, Maximal) implementieren.
- [ ] UI zur textuellen Anzeige der berechneten Statistiken und Trends (Pfeil-Indikatoren) erstellen.
- [ ] Datenexport- (als JSON) und Import-Funktionalität implementieren.
- [ ] Leere-Zustände für den Fall, dass nicht genügend Daten für eine Analyse vorhanden sind, gestalten.
- [ ] [T] Unit-Tests für alle Statistik-Berechnungen schreiben.
- [ ] [T] Tests für die Datenfilterung und den Export/Import erstellen.

---

## Phase 5: Backend-Integration (Status: 0/28 Aufgaben)

### [P15] Firebase Authentication Integration
- [ ] Firebase-Projekt erstellen und SDK in die App integrieren.
- [ ] `AuthContext` zur Verwaltung des User-Status (angemeldet/abgemeldet) implementieren.
- [ ] `useAuth`-Hook für den Zugriff auf den Kontext erstellen.
- [ ] `LoginForm`- und `RegisterForm`-Komponenten erstellen.
- [ ] `AuthGuard`-Komponente implementieren, um das Dashboard nur für angemeldete Benutzer zugänglich zu machen.
- [ ] Login-, Register- und Logout-Funktionen mit dem Firebase Auth SDK implementieren.
- [ ] Passwort-Reset-Funktionalität integrieren.
- [ ] Benutzerfreundliche Fehlerbehandlung für Auth-Fehler (z.B. falsches Passwort) umsetzen.
- [ ] [T] Tests für den gesamten Authentifizierungs-Flow (Registrierung, Login, Logout, Guard) mit gemocktem Firebase SDK erstellen.

### [P16] Firestore-Datenbank Integration
- [ ] Firestore konfigurieren und Sicherheitsregeln definieren, die den Datenzugriff auf den jeweiligen Benutzer beschränken.
- [ ] `UserDataService` erstellen, der die Lese- und Schreiboperationen für Firestore kapselt.
- [ ] Real-time Listener (`onSnapshot`) implementieren, um Daten über mehrere Geräte hinweg zu synchronisieren.
- [ ] Kachel-Layout und -Konfigurationen in Firestore speichern und von dort laden.
- [ ] Prompt-Bibliothek (Kategorien, Prompts) in Firestore persistieren.
- [ ] Tagesleisten-Daten und Analyse-Daten in Firestore persistieren.
- [ ] Offline-Unterstützung von Firestore aktivieren und konfigurieren.
- [ ] [T] Tests für alle CRUD-Operationen des `UserDataService` gegen einen Firestore-Emulator schreiben.

### [P17] Lokale Datenpersistierung und Auto-Save
- [ ] `useLocalStorage`-Hook zur einfachen Persistierung von React-States erstellen.
- [ ] Debouncing-Mechanismus für häufige Zustandsänderungen (z.B. im Prompt-Editor) implementieren, um Schreibvorgänge zu reduzieren.
- [ ] Strategie für die Synchronisation zwischen `localStorage` (offline) und Firestore (online) definieren und umsetzen.
- [ ] Konfliktlösungs-Strategie festlegen (z.B. "last write wins").
- [ ] [T] Tests für den `useLocalStorage`-Hook erstellen.
- [ ] [T] Tests für den Debounce-Mechanismus und die Sync-Logik schreiben.

### [P18] Outlook-Integration (Microsoft Graph API)
- [ ] App in Azure Active Directory registrieren und Berechtigungen (`Calendars.Read`) konfigurieren.
- [ ] MSAL (Microsoft Authentication Library) für den OAuth2-Flow integrieren.
- [ ] `OutlookService` zur Kapselung der API-Aufrufe (Login, Kalender abrufen) erstellen.
- [ ] UI in den Einstellungen zum Verbinden/Trennen des Outlook-Kontos hinzufügen.
- [ ] Logik zum Abrufen der heutigen Termine und zur Konvertierung in das App-interne Format implementieren.
- [ ] Synchronisation zwischen importierten Outlook-Terminen und manuell erstellten Terminen visualisieren.
- [ ] Token-Refresh-Mechanismus und Fehlerbehandlung für API-Aufrufe implementieren.
- [ ] [T] Tests für den `OutlookService` mit gemockter MS Graph API erstellen.

---

## Phase 6: Optimierung und Polishing (Status: 0/27 Aufgaben)

### [P19] Responsive Design und Mobile Optimierung
- [ ] Tailwind CSS Breakpoints (mobile, tablet, desktop) definieren und anwenden.
- [ ] Mobiles Layout für das Grid-System implementieren (z.B. einspaltige, gestapelte Ansicht).
- [ ] Touch-optimiertes Drag & Drop für mobile Geräte sicherstellen.
- [ ] Interaktive Elemente (Buttons, Inputs) für Touch-Bedienung vergrößern.
- [ ] Long-Press-Geste für das Öffnen von Kontextmenüs auf Mobilgeräten implementieren.
- [ ] Korrekte Viewport-Meta-Tags setzen und Safe-Area-Support für iOS berücksichtigen.
- [ ] [T] Visuelle Regressionstests für die definierten Breakpoints einrichten.

### [P20] Performance-Optimierung
- [ ] `React.lazy` und `Suspense` für das Code-Splitting von Kachel-Komponenten implementieren.
- [ ] `React.memo` für Komponenten verwenden, die nicht bei jeder übergeordneten Aktualisierung neu gerendert werden müssen.
- [ ] `useMemo` und `useCallback` gezielt einsetzen, um teure Berechnungen und unnötige Neudefinitionen von Funktionen zu vermeiden.
- [ ] Bundle-Analyse-Tool (z.B. `vite-plugin-visualizer`) einrichten, um große Abhängigkeiten zu identifizieren.
- [ ] Tree-Shaking und CSS-Purging im Production-Build sicherstellen.
- [ ] Einen Service Worker für das Caching der App-Shell und statischer Assets einrichten (PWA).
- [ ] [T] Performance-Tests (z.B. mit Lighthouse) in die CI-Pipeline integrieren.

### [P21] Umfassende Test-Suite
- [ ] Hohe Testabdeckung für alle Utility-Funktionen und Custom-Hooks sicherstellen.
- [ ] Hohe Testabdeckung für alle UI-Komponenten und deren Interaktionen sicherstellen.
- [ ] Integrationstests für vollständige Benutzer-Workflows schreiben (z.B. Prompt erstellen und verwenden).
- [ ] Mock Service Worker (MSW) zur Simulation von API-Antworten (Firebase, Outlook) in Tests verwenden.
- [ ] E2E-Tests (z.B. mit Cypress oder Playwright) für die kritischsten User Journeys einrichten.
- [ ] Test-Coverage-Reporting einrichten und ein Ziel von >90% anstreben.
- [ ] Alle bestehenden `[T]`-Aufgaben überprüfen und als erledigt markieren.

---

## Phase 7: Finalisierung (Status: 0/19 Aufgaben)

### [P22] Accessibility und Internationalisierung
- [ ] `react-i18next` für die Internationalisierung (i18n) integrieren.
- [ ] Übersetzungsdateien für Deutsch (`de.json`) und Englisch (`en.json`) erstellen und alle Texte extrahieren.
- [ ] `axe-core` in die Entwicklungs- und Testumgebung integrieren, um A11y-Probleme frühzeitig zu erkennen.
- [ ] Vollständige Tastaturnavigation für die gesamte App sicherstellen.
- [ ] ARIA-Labels und -Rollen für alle nicht-semantischen interaktiven Elemente hinzufügen.
- [ ] Focus-Management für Modals und Overlays implementieren.
- [ ] [T] A11y-Tests in die Test-Suite integrieren.
- [ ] [T] Tests für den Sprachwechsel und die korrekte Anzeige von Übersetzungen schreiben.

### [P23] Deployment und Production-Optimierung
- [ ] CI/CD-Pipeline (z.B. mit GitHub Actions) für automatisierte Tests und Builds einrichten.
- [ ] Deployment-Skript für Firebase Hosting erstellen.
- [ ] Staging- und Production-Umgebungen mit unterschiedlichen Firebase-Projekten konfigurieren.
- [ ] Environment-Variablen für sensible Konfigurationsdaten (`.env`) verwenden.
- [ ] Error-Tracking-Service (z.B. Sentry) integrieren.
- [ ] PWA-Manifest (`manifest.json`) für die "Zum Startbildschirm hinzufügen"-Funktionalität erstellen.
- [ ] [T] Deployment-Tests zur Überprüfung der Produktionsumgebung nach jedem Deploy durchführen.

### [P24] Dokumentation und Wartbarkeit
- [ ] Storybook für alle wiederverwendbaren UI-Komponenten einrichten und pflegen.
- [ ] `README.md` mit detaillierten Setup- und Startanweisungen vervollständigen.
- [ ] JSDoc/TSDoc-Kommentare für alle exportierten Funktionen, Hooks und Komponenten hinzufügen.
- [ ] Ein `ARCHITECTURE.md` erstellen, das die wichtigsten Architekturentscheidungen dokumentiert.
- [ ] Eine einfache Benutzerdokumentation oder einen "Getting Started"-Guide erstellen.
