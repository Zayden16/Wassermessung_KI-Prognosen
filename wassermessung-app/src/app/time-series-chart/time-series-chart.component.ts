import {Component, Input, OnInit, ViewChild, ElementRef, PLATFORM_ID, Inject, OnChanges, SimpleChanges} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
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
  @Input() tsId: string;
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;

  chart?: any;
  dateForm = new FormGroup({
    from: new FormControl(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16)),
    to: new FormControl(new Date().toISOString().slice(0, 16))
  });

  constructor(
    private wiskiService: WiskiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tsId'] && !changes['tsId'].firstChange) {
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
          parsing: {
            xAxisKey: 'x',
            yAxisKey: 'y'
          }
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
    const from = this.dateForm.get('from')?.value;
    const to = this.dateForm.get('to')?.value;

    if (!from || !to || !this.chart) return;

    this.chart.data.datasets[0].data = [];
    this.chart.update();

    this.wiskiService.getTimeSeriesValues(this.tsId, from, to)
      .subscribe((response: TimeSeriesValuesResponse) => {
        if (!this.chart) return;

        const dataset = this.chart.data.datasets[0];
        dataset.data = response.data.map(item => ({
          x: item.Timestamp,
          y: item.Value
        }));
        dataset.label = response.metadata.ts_name;

        this.chart.options.scales.y.title.text =
          `${response.metadata.parametertype_name} (${response.metadata.ts_unitsymbol})`;

        this.chart.update();
      });
  }
}
