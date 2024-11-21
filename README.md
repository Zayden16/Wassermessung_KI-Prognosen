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
Das [WebGIS](https://map.geo.sz.ch) stellt zahlreiche Daten mit Koordinatenbezug dar. Viele der Daten sind eher statisch und werden nur einmal täglich (Nacht) oder bei Bedarf aktualisiert. Neu eingepflegte Daten werden dadurch erst am nächsten Tag ersichtlich. Ausserdem stellen die Werte nur die aktuelle Situation dar. Der dynamische Wandel der Werte über eine Periode kann heute nicht über das WebGIS nachverfolgt werden.
Das Amt für Gewässer AFG betreibt Messstellen an Gewässer, die in einer höheren zeitlichen Auflösung über den Tag Daten liefern. Die zahlreichen Informationen werden in das WISKI-System, einer Datenbank, eingespiesen. Jedoch werden diese Daten noch nicht ausgewertet und dargestellt. Neben dem AFG gibt es noch andere Interessenten für die Darstellung von dynamischen Daten im GIS.
Künstliche Intelligenz ist heutzutage in aller Munde und ein sehr mächtiges Tool. Aus Trainingsdaten kann eine KI-Applikation lernen, wie sich künftige Daten verhalten könnten. Dies könnte man beispielsweise für Prognosekarten im Bereich der Naturgefahren oder Klimaentwicklung nutzen. Die Forschung ist bereits daran, KI-Modelle zu entwickeln und optimieren wie z.B. der Artikel aus dem [Nature](https://www.nature.com/articles/s41586-024-07145-1) zeigt.

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

Ähnliche Beispiele der Umsetzung finden sich bei den Kantonen:
- [Luzern](https://www.geo.lu.ch/messdaten/hydrometrie)
- [Uri](https://geo.ur.ch/?basemap=PKGRAU&center=960861%2C5921756&layers=Oberfl%C3%A4chengew%C3%A4sser%20Pegel%20und%20Abfluss&layersidebarvisible=true&opacity=1&visibility=true&zoom=13)

#### Teil 2 der Challenge: KI-Prognose
Aus bestehenden Messreihen (z.B. Temperatur, Niederschlagsmessungen, etc...) als Trainingsdaten soll ein Algorithmus erstellt werden, der in Zukunft erkennt ob die aktuellen Wetterdaten zu möglichen Naturgefahren in bestimmten Regionen führen. Es können viele Faktoren Einfluss auf Naturgefahren haben. So kann bei Überschwemmungen von Flüssen die Niederschlagsmengen, Anzahl Regentage im Voraus oder Schneemenge die Abflussmenge beeinflussen. Aber auch die Grösse der Einzugsgebiete der Flüsse, die Bodensättigung oder der Bodentyp können das Risiko einer Überschwemmung erhöhen oder mildern. Die Challenge ist ein KI-Modell zu erarbeiten, welches zuerst mit Abflussmengen und Niederschlagsmessungen, sowie mit Pegelständen trainiert werden kann. Das Modell soll danach aus den aktuellen Messdaten erkennen, wie hoch die aktuelle Gefahr einer Überschwemmung für den jeweiligen Fluss ist. Zu einem späteren Zeitpunkt können weitere Parameter in das Modell integriert werden.

### Technologie  
#### Teil 1 
- **Frontend:** Javascript, Framework Angular. Das Frontend muss nicht mehr entwickelt werden bzw. für die Challenge genügt ein kleiner Prototyp, der nicht zwingend in Angular erstellt werden muss. Der Aufruf der Pop-Up Fensters soll via Url umgesetzt werden, der die Id der Messtation übergibt.
- **Backend:** Python, Framework Django
- **Datenbank:** PostgreSQL/PostGIS
- **API-Schnittstelle** für das Abrufen von Daten
- **Datendarstellung:** Integration eines Business Intelligence-Frameworks oder Library, die einfach konfigurierbar ist (bsp. Power BI, Apache eCharts...)

#### Teil 2
- KI-Entwicklung mit den gängigen Python-Frameworks (TensorFlow, PyTorch, Keras...)
- Datenbezugsorte (Swisstopo, opendata.swiss, etc...)

### Anforderungen (Must/Nice): 
#### Teil 1
- Abfrage ans Backend muss über eine url gehen, die die stations_nr oder. ts_id übergibt (Must)
- Als Antwort wird ein Html Pop-up Fenster zurückgegeben (Must)
- Layerinfos werden dargestellt (Nice): Allg. Informationen (Aktualisierungsrhythmus, Datenstand,...)   
- Stationsinfos können angezeigt werden (Nice): Stationsname (station_name), Status, Nummer (WISKI, station_no), verfügbare Messparameter (stationsparameter_name), Gewässer (river_name), Standort (site_name), Koordinaten (LV95, station_longitude, station_latitude)
- aktuelle Messdaten werden angezeigt (Nice): Abfluss, Wassertemperatur, pH-Wert, Elektrische Leitfähigkeit (Messwert, Datetime)
- Messreihen werden als Diagramme dargestellt (Must): Verwendung eines Frameworks/Tools (bsp. Apache eCharts, Power BI o.ä)
- Weitere Diagramme können einfach hinzugefügt werden (Must)
- Es kann ein bestimmter Zeitraum abgefragt werden (Must)
- Diagramm (Muss): x-Achse = Zeithorizont, y-Achse = Abfluss [m3/s] bzw. y-Achse = Temperatur [°C] (Siehe Darstellung Kanton Luzern)
- Gefahrenstufen sollen direkt im Abflussdiagramm dargestellt werden (Nice): GS1: <11.9, GS2: 11.9-18.3, GS3: 18.3-22.1, GS4: 22.1-26.2, GS5: >26,2 [m3/s]
- Q347 soll direkt im Abflussdiagramm dargestellt werden (Nice)
- Daten sollen als Excel-Datei heruntergeladen werden (Nice)
- Diagramme sollen als Bilddatei heruntergeladen werden (Nice)

#### Teil 2
- Die Ergebniskarte im LV95-Koordinatensystem (EPSG: 2056) beschrieben (Must)
- Die Daten werden in den PostGIS-Typischen Geometrien gespeichert (Polygone für Flächen und Linestring für Linien) (Must)

### Verfügbare Daten
#### Teil 1
API-Schnittstelle zu Stationen: https://kiwis.innetag.ch/KiWIS/KiWIS?datasource=1&service=kisters&type=queryServices&request=getrequestinfo

#### Teil 2
Hydrologische Daten für KI: 
- https://api.existenz.ch/#smn
- https://lindas.admin.ch/data-usage/data-usage-types/
- https://environment.ld.admin.ch/.well-known/void/dataset/hydro
- https://api3.geo.admin.ch/services/sdiservices.html 
- https://opendata.swiss/de
- https://www.meteoschweiz.admin.ch/service-und-publikationen/service/wetter-und-klimaprodukte.html

Mögliche Datensätze:
- [swissTLMRegio Hydrography](https://opendata.swiss/de/dataset/swisstlmregio-hydrography)
- [Vergleich von Abfluss- und Pegeldaten mit den Gefahrenstufen](https://opendata.swiss/de/dataset/vergleich-von-abfluss-und-pegeldaten-mit-den-gefahrenstufen)
- [Automatische Wetterstationen - aktuelle Messwerte](https://opendata.swiss/de/dataset/automatische-wetterstationen-aktuelle-messwerte)
- [Klimamessnetz - Tageswerte](https://opendata.swiss/de/dataset/klimamessnetz-tageswerte)
- [Manuelle Schnee- und Niederschlagsmessstationen](https://opendata.swiss/de/dataset/manuelle-schnee-und-niederschlagsmessstationen)
- [Messwerte Niederschlag, 10 min Summe](https://opendata.swiss/de/dataset/messwerte-niederschlag-10-min-summe)

### Weitere Informationen 
- Benötigte Hardware: keine besondere Hardware nötig
- Max. Anzahl Teammitglieder:
- Zuständigkeit: Amanda Wetter, Amt für Geoinformation, Kanton Schwyz
- E-Mail: amanda.wetter@sz.ch
