import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {StationListItem, WiskiService} from '../wiski.service';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {CommonModule} from '@angular/common';
import {TimeSeriesChartComponent} from '../time-series-chart/time-series-chart.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ParameterType} from '../../model';

@Component({
  selector: 'app-station-detail',
  standalone: true,
  imports: [CardModule, PanelModule, CommonModule, TimeSeriesChartComponent, ReactiveFormsModule],
  templateUrl: './station-detail.component.html',
})
export class StationDetailComponent implements OnInit, OnChanges {
  @Input() station!: StationListItem;
  timeSeriesId : string[]
  parametertype_names = [ParameterType.Abfluss, ParameterType.Pegel, ParameterType.Wassertemperatur, ParameterType.ElektrischeLeitfaehigkeit]

  dateForm = new FormGroup({
    from: new FormControl(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16)),
    to: new FormControl(new Date().toISOString().slice(0, 16))
  });

  constructor(private wiskiService: WiskiService, private route: ActivatedRoute) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['station']) {
      this.loadTimeSeries();
    }
  }

  private loadTimeSeries() {
    if (this.station) {
      this.timeSeriesId = [];
      for (let i = 0; i < this.parametertype_names.length; i++) {
        this.wiskiService.getTimeSeriesList(this.station.station_no, this.parametertype_names[i])
          .subscribe({
            next: (timeSeries) => {
              if (timeSeries && timeSeries.length > 0) {
                console.log(timeSeries)
                this.timeSeriesId.push(timeSeries[0].ts_id);
              } else {
                console.log("no data for station: " + this.station.station_no + " with paramname: " + this.parametertype_names[i] + " and " + ParameterType.AperiodischRoh)
              }
            }, error: () => {
              console.error("Error fetching time series for station " + this.station.station_no + " with paramname: " + this.parametertype_names[i])
            }
          });
      }

    }
  }

  updateCharts() {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const stationNo = params.get('station_no');
      if (stationNo) {
        this.loadStationDetails(stationNo);
      } else if (this.station) {
        this.loadTimeSeries();
      } else {
        console.error("no station provided and no station_no in route")
      }
    })
    this.loadTimeSeries();
  }

  private loadStationDetails(stationNo: string) {
    this.wiskiService.getStationByNo(stationNo).subscribe({
      next: (station) => {
        console.log("station: " + station[1])
        this.station = station[0];
        this.loadTimeSeries();
      }
    })
  }

  downloadCSV() {
    const csvData: string[] = ['Timestamp,Value'];

    if (!this.timeSeriesId || this.timeSeriesId.length === 0) {
      console.error('No time series IDs available.');
      return;
    }
    this.timeSeriesId.forEach(id => {
        this.wiskiService.getTimeSeriesValues(id, this.dateForm.get('from')?.value, this.dateForm.get('to')?.value).subscribe(params => {
          if (params?.data) {
            params.data.forEach((item: { Timestamp: string, Value: number }) => {
              csvData.push(`${item.Timestamp},${item.Value}`);
            });
          }
      const blob = new Blob([csvData.join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = 'time_series_data_for_' + params.metadata.parametertype_name + '.csv';
          link.click();
          URL.revokeObjectURL(url);
        });
    });
  }
}
