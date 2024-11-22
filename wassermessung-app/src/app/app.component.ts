import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {WiskiService} from './wiski.service';
import {NgOptimizedImage} from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuModule, RouterModule, ButtonModule, NgOptimizedImage],
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
