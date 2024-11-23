import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {StationListItem, WiskiService} from '../wiski.service';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {CommonModule} from '@angular/common';
import {TimeSeriesChartComponent} from '../time-series-chart/time-series-chart.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-station-detail',
  standalone: true,
  imports: [CardModule, PanelModule, CommonModule, TimeSeriesChartComponent, ReactiveFormsModule],
  templateUrl: './station-detail.component.html',
})
export class StationDetailComponent implements OnInit, OnChanges {
  @Input() station!: StationListItem;
  timeSeriesId : string[]
  parametertype_names = ["Abfluss", "Pegel", "Wassertemperatur"]

  dateForm = new FormGroup({
    from: new FormControl(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16)),
    to: new FormControl(new Date().toISOString().slice(0, 16))
  });

  constructor(private wiskiService: WiskiService) {
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
                console.log("no data for station: " + this.station.station_no + " with paramname: " + this.parametertype_names[i])
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
    this.loadTimeSeries();
  }
}
