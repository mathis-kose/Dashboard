Absolut. Hier ist die zusammengefasste, entwicklerfertige Spezifikation, die auf unserem schrittweisen Brainstorming basiert.

---

### **Spezifikation: Modulare Produktivitäts-Web-App "Tagesbegleiter"**

**Version:** 1.0
**Datum:** 24. Mai 2024

#### **1. Projektübersicht**

Es soll eine hochgradig personalisierbare Web-App entwickelt werden, die den Benutzer durch seinen Arbeitstag begleitet. Die App fungiert als modulares Dashboard ("Werkzeugkasten"), das aus verschiedenen Kacheln (Widgets) besteht, die der Benutzer nach seinen Wünschen anordnen kann. Der Fokus liegt auf einem minimalistischen, taktilen Design (Neumorphismus), intuitiver Bedienung und der Automatisierung wiederkehrender Aufgaben.

**Zielgruppe:** Wissensarbeiter, die am PC tätig sind und eine zentrale, ästhetisch ansprechende Oberfläche zur Organisation ihres Arbeitstages und zur Beschleunigung von Routineaufgaben suchen.

#### **2. Architektur & Technologie-Stack**

*   **Frontend:** Eine rein clientseitige Single-Page-Application (SPA), entwickelt mit einem modernen JavaScript-Framework (z.B. React, Vue oder Svelte). Das Design muss vollständig responsiv sein, um eine optimale Darstellung in verschiedenen Fenstergrößen auf dem Desktop zu gewährleisten (primärer Anwendungsfall).
*   **Backend & Authentifizierung:** Zur Speicherung der Benutzerkonfiguration und Synchronisierung zwischen Geräten wird eine **Backend-as-a-Service (BaaS)**-Lösung eingesetzt.
    *   **Anforderung:** Die gewählte Lösung (z.B. **Google Firebase**) muss ein großzügiges, kostenloses Kontingent ("Free Tier") bieten, das für den erwarteten Umfang der App ausreicht, um Betriebskosten zu vermeiden.
    *   **Funktionen:** Die BaaS-Lösung wird für Benutzerauthentifizierung (E-Mail/Passwort) und die Speicherung der Daten in einer Cloud-Datenbank (z.B. Firestore) genutzt.
*   **Datenpersistenz (Lokal):** Der Zustand des aktuellen Arbeitstages (insb. der Tagesleiste) soll im `localStorage` des Browsers zwischengespeichert werden, um Datenverluste bei einem versehentlichen Neuladen der Seite zu verhindern. Jede Änderung wird sofort und automatisch gespeichert ("Auto-Save").

#### **3. Kernfunktionen & UI-Komponenten**

##### **3.1. Allgemeines UI/UX & Design**

*   **Design-Sprache (Neumorphismus):** Das gesamte UI muss dem Neumorphismus-Stil folgen. Die exakte Anforderung lautet:
    > Create a Neumorphic UI with soft, extruded elements that appear to push through the surface. Use subtle dual shadows (both light and dark) to create a physical, tactile feel. Elements should use a monochromatic color palette with minimal depth and no hard borders. Buttons should have a soft pressed effect on interaction. The background should be a soft light gray (#e0e0e0) or very light color, and UI elements should appear to be carved from the same material as the background.
*   **Akzentfarben:** Wichtige Datenvisualisierungen (z.B. der Fortschrittsbalken der Tagesleiste, der Farbverlauf der Uhr) sollen bewusst intensive, vom Benutzer wählbare Akzentfarben verwenden, um sich vom monochromatischen Grunddesign abzuheben.
*   **Layout-System:**
    *   Ein subtiles, visuelles **Gitternetz** dient als Basis für die Anordnung der Kacheln. Es soll das modulare "LEGO"-Gefühl unterstützen, aber nicht visuell im Vordergrund stehen.
    *   Kacheln haben **feste, vordefinierte Größen** (z.B. 1x1, 2x1, 3x1 Einheiten) und können nicht in der Größe verändert werden.
    *   Der Benutzer kann Kacheln per **Drag & Drop** auf dem Gitter frei anordnen ("umstecken").
*   **Responsivität:** Das Layout bricht bei schmaleren Fenstergrößen automatisch um, sodass Kacheln in die nächste Zeile verschoben werden, anstatt abgeschnitten oder verkleinert zu werden.
*   **Light/Dark Mode:** Die App bietet einen hellen (Standard) und einen dunklen Modus.

##### **3.2. Kachel-Verwaltung ("Shop")**

*   **Hinzufügen:** Eine dedizierte Kachel ("Shop" oder "+") öffnet ein Overlay-Menü, das alle verfügbaren, aber noch nicht platzierten Kachel-Typen anzeigt.
    *   Ein Klick auf eine Kachel im Shop "heftet" diese an den Mauszeiger.
    *   Ein weiterer Klick auf eine freie Stelle im Gitter platziert die Kachel.
*   **Einzigartigkeit:** Jede Kachel-Art kann nur einmal auf dem Dashboard platziert werden.
*   **Entfernen:**
    *   Ein **Rechtsklick** auf eine platzierte Kachel aktiviert einen "Entfernen-Modus" und blendet ein rotes "X"-Icon auf dieser Kachel ein.
    *   Ein Klick auf das "X" entfernt die Kachel vom Dashboard und gibt sie im Shop wieder frei.

##### **3.3. Kachel: Tagesleiste**

*   **Funktion:** Visualisiert den Fortschritt des Arbeitstages und dient als Terminplaner.
*   **Größe:** Kann in verschiedenen Längen (z.B. 2x1 oder 3x1) existieren.
*   **Setup:** Der Benutzer gibt morgens seine **Startzeit** und die geplante **Gesamtarbeitszeit** (z.B. 8 Stunden) an. Daraus wird die initiale "Gehen-Zeit" berechnet.
*   **Visualisierung:** Ein Fortschrittsbalken füllt sich im Laufe des Tages. Termine und Pausen werden als Blöcke auf diesem Zeitstrahl dargestellt.
*   **Termine (Events):**
    *   **Manuelle Eingabe:** Benutzer können Termine mit **Titel** und **Dauer** hinzufügen.
    *   **(Optional) Outlook-Integration:** Die App soll über die Microsoft Graph API eine Verbindung zum Outlook-Kalender herstellen können, um die heutigen Termine automatisch zu importieren. Der Benutzer muss dies explizit autorisieren (OAuth2-Flow).
    *   **Alarm:** Wenn die Startzeit eines Termins erreicht ist, soll der gesamte Bildschirm kurz aufblinken, um die Aufmerksamkeit des Benutzers zu erregen.
*   **Pausen:**
    *   Pausen werden nachträglich erfasst, indem der Benutzer die **Start- und Endzeit** der Pause eingibt.
    *   Die App berechnet die Pausendauer und aktualisiert die "Gehen-Zeit" dynamisch.
*   **Tagesende:** Um Mitternacht wird die Tagesleiste automatisch zurückgesetzt und ist bereit für den neuen Tag. Die relevanten Daten werden für die Statistik gespeichert (siehe 3.6).

##### **3.4. Kachel: Prompt-Bibliothek**

*   **Funktion:** Eine Bibliothek zum Verwalten und schnellen Wiederverwenden von Textvorlagen (Prompts).
*   **Ablauf:**
    1.  Klick auf die "Prompts"-Kachel öffnet ein Overlay mit **Kategorie-Kacheln** (z.B. "E-Mails", "Code-Snippets"). Eine "+"-Kachel dient zum Anlegen neuer Kategorien.
    2.  Klick auf eine Kategorie-Kachel öffnet eine Ansicht mit den darin enthaltenen **Prompt-Kacheln**.
    3.  Klick auf eine Prompt-Kachel zeigt eine Vorschau des Prompts an, mit farblich hervorgehobenen Platzhaltern.
    4.  Ein "Kopieren"-Button öffnet ein Formular zur Anpassung der Platzhalter.
*   **Prompt-Erstellung/Bearbeitung:**
    *   Ein Editor erlaubt die Eingabe von Titel und Text.
    *   **Platzhalter-Erstellung:** Der Benutzer kann ein Wort im Text markieren und per Button-Klick in einen benannten Platzhalter umwandeln (z.B. `[PROJEKTNAME]`).
*   **Prompt-Nutzung:**
    *   Das Formular zeigt für jeden Platzhalter ein eigenes Eingabefeld.
    *   Als Hilfestellung wird über jedem leeren Eingabefeld der umgebende Satz aus dem Prompt leicht ausgegraut angezeigt, wobei der Platzhalter-Name farblich hervorgehoben ist.
    *   Nach dem Ausfüllen wird der fertige Text per Klick in die Zwischenablage kopiert.
*   **Verwaltung:** In der Kategorie-Ansicht gibt es neben dem Titel einen Button, der ein Menü mit den Optionen "Umbenennen" und "Löschen" (mit Sicherheitsabfrage) für die Kategorie öffnet.

##### **3.5. Kachel: Neumorphische Uhr**

*   **Funktion:** Zeigt die aktuelle Zeit (Stunden und Minuten) in digitaler Form an.
*   **Design-Feature:** Die Farbe der Ziffern ist ein **sekundengenauer Farbverlauf**.
    *   Zu Beginn einer Minute (Sekunde 0) haben die Ziffern die "Startfarbe".
    *   Mit jeder Sekunde wandert der Farbverlauf, bis bei Sekunde 59 die "Endfarbe" erreicht ist.
*   **Konfiguration:** Ein Klick auf die Kachel öffnet ein Einstellungsmenü, in dem der Benutzer die Start- und Endfarbe über einen **detaillierten Farbwähler** (visuelle Auswahl + Eingabe von HEX-Codes) festlegen kann.

##### **3.6. Kachel: Daten-Analyse**

*   **Funktion:** Visualisiert langfristige Arbeitsgewohnheiten.
*   **Datenerfassung:** Jeden Tag, an dem die App genutzt wird, werden automatisch die **finale Startzeit** und die **finale "Gehen-Zeit"** in der Datenbank gespeichert.
*   **Anzeige:** Die Kachel zeigt zwei Durchschnittswerte als Text an: "Ø Startzeit" und "Ø Feierabend".
*   **Filter:** Zwei Reiter ("Maximal", "30 Tage") erlauben dem Benutzer, den Berechnungszeitraum für den Durchschnitt zu wechseln.

##### **3.7. Kachel: Design-Umschalter**

*   **Funktion:** Wechselt per Klick zwischen Light- und Dark-Mode.
*   **Visualisierung:** Zeigt ein Sonnen-Icon im Light-Mode und ein Mond-Icon im Dark-Mode.

#### **4. Datenmodell (Beispiel für Firestore)**

*   **Collection: `users`**
    *   `doc: {userId}`
        *   `email`: `string`
        *   `settings`: `{ theme: 'light' | 'dark' }`
        *   `layout`: `[{ tileId: string, position: {x, y}, size: {w, h} }]`
*   **Collection: `prompts`**
    *   `doc: {userId}`
        *   `categories`: `[{ categoryId: string, name: string }]`
        *   `templates`: `[{ templateId: string, categoryId: string, title: string, content: string }]`
*   **Collection: `dailyLogs`**
    *   `doc: {userId}`
        *   `logs`: `[{ date: timestamp, startTime: time, endTime: time }]`

#### **5. Fehlerbehandlung & Edge Cases**

*   **API-Fehler:** Wenn die Outlook- oder BaaS-Verbindung fehlschlägt, muss eine unaufdringliche Fehlermeldung angezeigt werden (z.B. ein kleines Toast-Banner). Die App muss weiterhin offline funktionsfähig bleiben.
*   **Validierung:** Eingaben müssen validiert werden (z.B. eine Pausen-Endzeit darf nicht vor der Startzeit liegen).
*   **Leere Zustände:**
    *   Wenn eine neue Prompt-Kategorie erstellt wird, soll die App direkt zur Erstellung des ersten Prompts überleiten.
    *   Die "Daten"-Kachel muss einen Zustand für den Fall anzeigen, dass noch nicht genügend Daten für eine Durchschnittsberechnung vorhanden sind.
*   **Sicherheitsabfragen:** Kritische Aktionen wie das Löschen einer Kategorie müssen durch eine "Sind Sie sicher?"-Abfrage bestätigt werden.

#### **6. Testplan**

*   **Unit-Tests:**
    *   Die Funktion zur Berechnung der "Gehen-Zeit" unter Berücksichtigung von Pausen.
    *   Die Funktion zur Ersetzung von Platzhaltern in Prompts.
    *   Die Funktion zur Berechnung der Durchschnittszeiten.
*   **Integrationstests:**
    *   Das Hinzufügen einer Pause aktualisiert die Tagesleiste korrekt.
    *   Das Erstellen einer Prompt-Vorlage und das anschließende Verwenden über das Formular.
    *   Das Speichern der Konfiguration (Layout, Theme) in der BaaS und das korrekte Laden nach einem erneuten Login.
*   **End-to-End (E2E) Tests:**
    *   **Szenario 1 (Tagesablauf):** Login -> Startzeit eingeben -> Event hinzufügen -> Pause eintragen -> "Gehen-Zeit" prüfen -> Logout. Am nächsten Tag einloggen und prüfen, ob die Tagesleiste leer ist und die "Daten"-Kachel die Werte vom Vortag berücksichtigt.
    *   **Szenario 2 (Prompt-Verwaltung):** Login -> Neue Prompt-Kategorie erstellen -> Neuen Prompt mit Platzhaltern erstellen -> Prompt verwenden -> Kategorie umbenennen -> Prompt löschen.
*   **UI/UX-Tests:**
    *   Überprüfung der responsiven Darstellung bei verschiedenen Fenstergrößen.
    *   Verifizierung des Neumorphismus-Stils, der Schatten und der "Pressed"-Effekte auf allen interaktiven Elementen.
    *   Test des Drag & Drop-Verhaltens auf dem Gitter.

---
