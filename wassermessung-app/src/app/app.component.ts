import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WiskiService} from './wiski.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'wassermessung-app';

  constructor(private wiskiService: WiskiService) {
    // Example usage
    this.wiskiService.getTimeSeriesList().subscribe(data => {
      console.log('Time Series List:', data);
    });
  }
}
