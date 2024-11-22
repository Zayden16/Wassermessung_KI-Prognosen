import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {WiskiService} from './wiski.service';
import {LineChartComponent} from './line-chart/line-chart.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuModule, RouterModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: ['/']
    },
    {
      label: 'Stations',
      icon: 'pi pi-map-marker',
      routerLink: ['/stations']
    },
    {
      label: 'Dashboard',
      icon: 'pi pi-chart-bar',
      routerLink: ['/dashboard']
    }
  ];
}
