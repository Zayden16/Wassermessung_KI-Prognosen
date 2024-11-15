# Wassermessung_KI-Prognosen
Das ist ein Repo für das Projekt "Echtzeit-Wassermessung mit KI-Prognosen"

## Bitte untenstehende Angaben ausfüllen:

### Bereich: 
Echzeit-Wassermessungen und KI-Prognosen

### Projekt-Titel:
Echzeit-Wassermessungen und KI-Prognosen

### Projekt-Ziel: 
Das Endprodukt soll ein Protoyp eines Pop-Up Fensters sein, welches durch den Aufruf einer Url an das Frontend (WebGIS) gesendet wird. In dem Fenster werden gewünschte Informationen zur Messstation in Form eines Dashboards dargestellt. Zusätzlich wird eine Prognosekarte mit Koordinatenbezug (LV95) erstellt, welche mit einer Schnittstelle in die Datenbank gespielt werden kann.

### Projekt-Beschreibung:
Das WebGIS (https://map.geo.sz.ch) stellt zahlreiche Daten mit Koordinatenbezug dar. Viele der Daten sind eher statisch und werden nur einmal täglich (Nacht) oder bei Bedarf aktualisiert. Neu eingepflegte Daten werden dadurch erst am nächsten Tag ersichtlich. Ausserdem stellen die Werte nur die aktuelle Situation dar. Der dynamische Wandel der Werte über eine Periode kann heute nicht über das WebGIS nachverfolgt werden.
Das Amt für Gewässer AFG betreibt Messstellen an Gewässer, die in einer höheren zeitlichen Auflösung über den Tag Daten liefern. Die zahlreichen Informationen werden in das WISKI-System, einer Datenbank, eingespiesen. Jedoch werden diese Daten noch nicht ausgewertet und dargestellt. Neben dem AFG gibt es noch andere Interessenten für die Darstellung von dynamischen Daten im GIS.
Künstliche Intelligenz ist heutzutage in aller Munde und ein sehr mächtiges Tool. Aus Trainingsdaten kann eine KI-Applikation lernen, wie sich künftige Daten verhalten könnten. Dies könnte man beispielsweise für Prognosekarten im Bereich der Naturgefahren oder Klimaentwicklung nutzen.

### Produkt: 
Der Challenge Task besteht aus zwei Teilen. Der erste Teil ist die Darstellung der Messungen über einen Zeitraum. Der zweite Teil der Aufgabe ist die Entwicklung einer Prognosekarte, die die aktuelle Situation von Naturgefahren einschätzt. 
#### Teil 1: 
Bei den Messstationen sind Links hinterlegt, die einen Request an das Backend senden. Also Response soll ein Popup-Fenster zurückgeliefert werden, welches aufbereitete Informationen zu der jeweiligen Station darstellet. Das Fenster soll folgende Informationen erhalten:
- Stationsinformation
- aktuelle Messdaten (Text, aufbereitet)
- Diagramme (Grafisch aufbereitet)
Für diese Challenge gibt es ein konkretes Beispiel, welches uns das Amt für Gewässer Kanton Schwyz zur Verfügung gestellt hat. Über eine Schnittstelle können dynamischen Daten einer bestimmten Messstation abgefragt werden. Es werden folgende Daten gemessen:
- Wassertemperatur
- pH-Wert
- Elektrische Leitfähigkeit
Ahnliche Beispiele der Umsetzung finden sich bei den Kantonen:
- Luzern: https://www.geo.lu.ch/messdaten/hydrometrie
- Uri: https://geo.ur.ch/?basemap=PKGRAU&center=960861%2C5921756&layers=Oberfl%C3%A4chengew%C3%A4sser%20Pegel%20und%20Abfluss&layersidebarvisible=true&opacity=1&visibility=true&zoom=13

#### Teil 2 der Challenge: KI-Prognose
Aus bestehenden Messreihen (z.B. Temperatur, Niederschlagsmessungen, etc...) als Trainingsdaten soll ein Algorithmus erstellt werden, der in Zukunft erkennt ob die aktuellen Wetterdaten zu möglichen Naturgefahren in bestimmten Regionen führen.  

### Technologie:  
- Teil1: Frontend: Javascript, Framework Angular. Das Frontend muss nicht mehr entwickelt werden bzw. für die Challenge genügt ein kleiner Prototyp, der nicht zwingend in Angular erstellt werden muss. Der Aufruf der Pop-Up Fensters soll via Url umgesetzt werden, der die Id der Messtation übergibt.
Backend: Python, Framework Django
Datenbank: PostgreSQL/PostGIS
API-Schnittstelle für das Abrufen von Daten

- Teil 2:
KI-Entwicklung mit den gängigen Python-Frameworks (TensorFlow, PyTorch, Keras...)
Evtl. weitere mögliche Datenbezugsorte (Swisstopo, opendata.swiss, etc...)

#### Anforderungen (Must/Nice): tbd"

- Benötigte Hardware: keine besondere Hardware nötig
- Max. Anzahl Teammitglieder:
- Zuständigkeit: Amanda Wetter, Amt für Geoinformation, Kanton Schwyz
- E-Mail: amanda.wetter@sz.ch
