import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'
import {WiskiService} from '../wiski.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit{
  public chart : any
  public stationNo = "SZHM105"

  constructor(private wiskiService: WiskiService) {}

  ngOnInit(): void {
    this.wiskiService.getTimeSeriesList(this.stationNo).subscribe(data => {
      this.wiskiService.getTimeSeriesValues(data[0].ts_id, "2023-01-01:00:00:00:000Z", "2024-01-01:00:00:00:000Z").subscribe(data2 => {
       //TODO: createChar
        // this.createChart(data2);
      })
    })
  }

  createChart(data: [{Timestamp: string, Value : number}]){

    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: "labels",
        datasets: "datasets"
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

}
