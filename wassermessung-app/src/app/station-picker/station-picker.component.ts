import { Component } from '@angular/core';
import {StationListItem, WiskiService} from '../wiski.service';
import {StationDetailComponent} from '../station-detail/station-detail.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-station-picker',
  imports: [
    StationDetailComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './station-picker.component.html',
  styleUrl: './station-picker.component.scss'
})
export class StationPickerComponent {
  stationsList: StationListItem[] = [];
  selectedStation?: StationListItem;

  constructor(private wiskiService: WiskiService) {}

  ngOnInit() {
    this.wiskiService.getRelevantStations().subscribe({
      next: (stations) => {
        this.stationsList = stations;
      },
      error: (error) => {
        console.error("Error fetching station list:", error);
      }
    });
  }

  selectStation(station: StationListItem) {
    this.selectedStation = station;
  }
}
