import { Component, Input } from '@angular/core';
import { StationListItem } from '../wiski.service';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-station-detail',
  standalone: true,
  imports: [CardModule, PanelModule, CommonModule, CommonModule],
  templateUrl: './station-detail.component.html',
  styleUrl: './station-detail.component.scss'
})
export class StationDetailComponent {
  @Input() station!: StationListItem;
}
