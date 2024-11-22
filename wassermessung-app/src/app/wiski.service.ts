import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class WiskiService {
  private readonly baseUrl = 'https://kiwis.innetag.ch/KiWIS/KiWIS?';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  constructor(private http: HttpClient) {}

  /**
   * Makes a POST request to fetch the time series list.
   */
  getTimeSeriesList(): Observable<any> {
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
      .set('station_no', 'SZHM105,SZHM106,SZHM200,SZHM201,SZHM202,SZHM203')
      .set('kvp', 'true');

    return this.http.post(this.baseUrl, body, { headers: this.headers });
  }

  /**
   * Makes a POST request to fetch the station list.
   */
  getStationList(): Observable<any> {
    const body = new HttpParams()
      .set('id', 'getStationList')
      .set('datasource', '1')
      .set('service', 'kisters')
      .set('type', 'queryServices')
      .set('request', 'getStationList')
      .set('format', 'csv')
      .set(
        'returnfields',
        'station_no,station_id,parametertype_name,stationparameter_name,station_latitude,station_longitude,site_name,river_name'
      )
      .set('station_no', '*')
      .set('kvp', 'true');

    return this.http.post(this.baseUrl, body, { headers: this.headers });
  }

  /**
   * Makes a POST request to fetch the parameter list.
   */
  getParameterList(): Observable<any> {
    const body = new HttpParams()
      .set('id', 'getParameterList')
      .set('datasource', '1')
      .set('service', 'kisters')
      .set('type', 'queryServices')
      .set('request', 'getParameterList')
      .set('format', 'csv')
      .set(
        'returnfields',
        'station_no,station_id,station_name,site_no,site_id,site_name,stationparameter_id,stationparameter_name,stationparameter_no,stationparameter_longname,parametertype_id,parametertype_name,parametertype_longname,parametertype_shortunitname,parametertype_unitname,ca_par'
      )
      .set('kvp', 'true')
      .set('station_name', '*');

    return this.http.post(this.baseUrl, body, { headers: this.headers });
  }

  /**
   * Makes a POST request to fetch the time series values.
   */
  getTimeSeriesValues(
    tsId: string,
    from: string,
    to: string
  ): Observable<any> {
    const body = new HttpParams()
      .set('datasource', '1')
      .set('service', 'kisters')
      .set('type', 'queryServices')
      .set('request', 'getTimeseriesValues')
      .set('format', 'dajson')
      .set('kvp', 'true')
      .set('dateformat', "yyyy-MM-dd'T'HH:mm:ssXXX")
      .set('metadata', 'true')
      .set('timezone', 'CET')
      .set('md_returnfields', 'station_id,ts_id,ts_name,parametertype_name,stationparameter_name,ts_unitsymbol')
      .set('returnfields', 'Timestamp,Value,Absolute Value')
      .set('ts_id', tsId)
      .set('from', from)
      .set('to', to);

    return this.http.post(this.baseUrl, body, { headers: this.headers });
  }
}
