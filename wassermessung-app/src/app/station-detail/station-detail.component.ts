import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {StationListItem, WiskiService} from '../wiski.service';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {CommonModule} from '@angular/common';
import {TimeSeriesChartComponent} from '../time-series-chart/time-series-chart.component';

@Component({
  selector: 'app-station-detail',
  standalone: true,
  imports: [CardModule, PanelModule, CommonModule, TimeSeriesChartComponent],
  templateUrl: './station-detail.component.html',
})
export class StationDetailComponent implements OnInit, OnChanges {
  @Input() station!: StationListItem;
  timeSeriesId?: string;

  constructor(private wiskiService: WiskiService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['station']) {
      this.loadTimeSeries();
    }
  }

  private loadTimeSeries() {
    if (this.station) {
      this.wiskiService.getTimeSeriesList(this.station.station_no)
        .subscribe(timeSeries => {
          this.timeSeriesId = timeSeries[0].ts_id;
        });
    }
  }

  ngOnInit() {
    this.loadTimeSeries();
  }
}
