import {Component, Input, OnInit, ViewChild, ElementRef, PLATFORM_ID, Inject, OnChanges, SimpleChanges} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {TimeSeriesValuesResponse, WiskiService} from '../wiski.service';
import {TimeScale, LinearScale} from 'chart.js';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-time-series-chart',
  templateUrl: './time-series-chart.component.html',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class TimeSeriesChartComponent implements OnInit, OnChanges {
  @Input() tsId!: string;
  @Input() from!: string;
  @Input() to!: string;
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  chart?: any;


  constructor(
    private wiskiService: WiskiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['tsId'] && !changes['tsId'].firstChange) || changes['from'] || changes['to']) {
      if (this.chart) {
        this.loadData();
      }
    }
  }

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const {Chart} = await import('chart.js/auto');
      Chart.register(TimeScale, LinearScale);
      const ZoomPlugin = (await import('chartjs-plugin-zoom')).default;
      Chart.register(ZoomPlugin);

      await this.initChart(Chart);
      this.loadData();
    }
  }

  private async initChart(Chart: any) {
    const config = {
      type: 'line',
      data: {
        datasets: [{
          label: 'Time Series Data',
          data: [],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
          pointRadius: 0,
          parsing: {
            xAxisKey: 'x',
            yAxisKey: 'y'
          }
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: 'x'
            },
            zoom: {
              wheel: {
                enabled: true
              },
              pinch: {
                enabled: true
              },
              mode: 'x'
            }
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'yyyy-MM-dd'
              }
            },
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            type: 'linear',
            title: {
              display: true,
              text: 'Value'
            }
          }
        }
      }
    };

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, config);
  }

  loadData() {

    if (!this.from || !this.to || !this.chart) return;

    this.chart.data.datasets[0].data = [];
    this.chart.update();

    this.wiskiService.getTimeSeriesValues(this.tsId, this.from, this.to)
      .subscribe((response: TimeSeriesValuesResponse) => {
        if (!this.chart) return;

        const dataset = this.chart.data.datasets[0];
        dataset.data = response.data.map(item => ({
          x: item.Timestamp,
          y: item.Value
        }));
        dataset.label = response.metadata.parametertype_name;

        this.chart.options.scales.y.title.text =
          `${response.metadata.parametertype_name} (${response.metadata.ts_unitsymbol})`;

        this.chart.update();
      });
  }
}
