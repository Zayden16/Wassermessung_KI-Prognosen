import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';


export interface TimeSeriesListItem {
  station_no: string;
  station_id: string;
  ts_id: string;
  ts_name: string;
  ts_type_name: string;
  parametertype_name: string;
  stationparameter_name: string;
  coverage: string;
  ts_unitname: string;
  ts_unitsymbol: string;
  ts_unitname_abs: string;
  ts_unitsymbol_abs: string;
}

export interface StationListItem {
  station_no: string;
  station_id: string;
  station_latitude: number;
  station_longitude: number;
  site_name: string;
  river_name: string;
}

export interface ParameterListItem {
  station_no: string;
  station_id: string;
  station_name: string;
  site_no: string;
  site_id: string;
  site_name: string;
  stationparameter_id: string;
  stationparameter_name: string;
  stationparameter_no: string;
  stationparameter_longname: string;
  parametertype_id: string;
  parametertype_name: string;
  parametertype_longname: string;
  parametertype_shortunitname: string;
  parametertype_unitname: string;
  ca_par: string;
}

export interface TimeSeriesValue {
  Timestamp: string;
  Value: number;
}

export interface TimeSeriesValuesResponse {
  metadata: {
    station_id: string;
    ts_id: string;
    ts_name: string;
    parametertype_name: string;
    stationparameter_name: string;
    ts_unitsymbol: string;
  };
  data: TimeSeriesValue[];
}

@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class WiskiService {
  private readonly baseUrl = 'https://kiwis.innetag.ch/KiWIS/KiWIS?';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  constructor(private http: HttpClient) {
  }

  /**
   * Makes a POST request to fetch the time series list.
   */
  getTimeSeriesList(station_no: String, parametertype_name: String): Observable<TimeSeriesListItem[]> {
    const body = new HttpParams()
      .set('id', 'timeSeriesList')
      .set('datasource', '1')
      .set('service', 'kisters')
      .set('type', 'queryServices')
      .set('request', 'getTimeseriesList')
      .set('format', 'objson')
      .set(
        'returnfields',
        'station_no,station_id,ts_id,ts_name,ts_type_name,parametertype_name,stationparameter_name,coverage,ts_unitname,ts_unitsymbol,ts_unitname_abs,ts_unitsymbol_abs'
      )
      .set('station_no', station_no.toString())
      .set('ts_name', 'Aperiodisch roh')
      .set('parametertype_name', parametertype_name.toString())
      .set('kvp', 'true');

    return this.http.post<TimeSeriesListItem[]>(this.baseUrl, body, { headers: this.headers });
  }

  /**
   * Makes a POST request to fetch the station list and returns only the relevant station
   */
  getRelevantStations(): Observable<StationListItem[]> {
    const desiredStations = ['SZHM105', 'SZHM106', 'SZHM200', 'SZHM201', 'SZHM202', 'SZHM203', 'LUPQ53'];
    const body = new HttpParams()
      .set('id', 'getStationList')
      .set('datasource', '1')
      .set('service', 'kisters')
      .set('type', 'queryServices')
      .set('request', 'getStationList')
      .set('format', 'json')
      .set('returnfields', 'station_no,station_id,station_latitude,station_longitude,site_name,river_name')
      .set('station_no', desiredStations.join(','))  // Filter at API level
      .set('kvp', 'true');

    return this.http.post<any[]>(this.baseUrl, body, {headers: this.headers})
      .pipe(
        map(response => response.slice(1).map(row => ({
          station_no: row[0],
          station_id: row[1],
          station_latitude: parseFloat(row[2]),
          station_longitude: parseFloat(row[3]),
          site_name: row[4],
          river_name: row[5]
        })))
      );
  }

  /**
   * Makes a POST request to fetch the station list.
   */
  getStationList(): Observable<StationListItem[]> {
    const body = new HttpParams()
      .set('id', 'getStationList')
      .set('datasource', '1')
      .set('service', 'kisters')
      .set('type', 'queryServices')
      .set('request', 'getStationList')
      .set('format', 'json')
      .set(
        'returnfields',
        'station_no,station_id,station_latitude,station_longitude,site_name,river_name'
      )
      .set('station_no', '*')
      .set('kvp', 'true');

    return this.http.post<StationListItem[]>(this.baseUrl, body, {headers: this.headers});
  }

  /**
   * Makes a POST request to fetch the parameter list.
   */
  getParameterList(): Observable<ParameterListItem[]> {
    const body = new HttpParams()
      .set('id', 'getParameterList')
      .set('datasource', '1')
      .set('service', 'kisters')
      .set('type', 'queryServices')
      .set('request', 'getParameterList')
      .set('format', 'json')
      .set(
        'returnfields',
        'station_no,station_id,station_name,site_no,site_id,site_name,stationparameter_id,stationparameter_name,stationparameter_no,stationparameter_longname,parametertype_id,parametertype_name,parametertype_longname,parametertype_shortunitname,parametertype_unitname,ca_par'
      )
      .set('kvp', 'true')
      .set('station_name', '*');

    return this.http.post<ParameterListItem[]>(this.baseUrl, body, {headers: this.headers});
  }

  /**
   * Makes a POST request to fetch the time series values.
   */
  getTimeSeriesValues(
    tsId: string,
    from: string,
    to: string
  ): Observable<TimeSeriesValuesResponse> {
    const body = new HttpParams()
      .set('datasource', '1')
      .set('service', 'kisters')
      .set('type', 'queryServices')
      .set('request', 'getTimeseriesValues')
      .set('format', 'json')  // Assuming the format is 'json'
      .set('kvp', 'true')
      .set('dateformat', "yyyy-MM-dd'T'HH:mm:ssXXX")
      .set('metadata', 'true')
      .set('timezone', 'CET')
      .set('md_returnfields', 'station_id,ts_id,ts_name,parametertype_name,stationparameter_name,ts_unitsymbol')
      .set('returnfields', 'Timestamp,Value')
      .set('ts_id', tsId)
      .set('from', from)
      .set('to', to);

    return this.http.post<TimeSeriesValuesResponse>(this.baseUrl, body, { headers: this.headers })
      .pipe(
        map(response => ({
          metadata: response[0] as {
            station_id: string;
            ts_id: string;
            ts_name: string;
            parametertype_name: string;
            stationparameter_name: string;
            ts_unitsymbol: string;
          },
          data: (response[0].data as [string, number][]).map(item => ({
            Timestamp: item[0],
            Value: item[1]
          }))
        }))
      );
  }
}
