import { Component, Input, OnInit } from '@angular/core';
import { StationListItem, WiskiService } from '../wiski.service';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { CommonModule } from '@angular/common';
import { TimeSeriesChartComponent } from '../time-series-chart/time-series-chart.component';

@Component({
  selector: 'app-station-detail',
  standalone: true,
  imports: [CardModule, PanelModule, CommonModule, TimeSeriesChartComponent],
  templateUrl: './station-detail.component.html',
})
export class StationDetailComponent implements OnInit {
  @Input() station!: StationListItem;
  timeSeriesId?: string;

  constructor(private wiskiService: WiskiService) {}

  ngOnInit() {
    if (this.station) {
      this.wiskiService.getTimeSeriesList(this.station.station_no)
        .subscribe(timeSeries => {
          if (timeSeries.length > 0) {
            this.timeSeriesId = timeSeries[0].ts_id;
          }
        });
    }
  }
}
