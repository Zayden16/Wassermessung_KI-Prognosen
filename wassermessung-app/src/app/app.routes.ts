import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'stations',
    loadComponent: () => import('./station-picker/station-picker.component').then(m => m.StationPickerComponent)
  }
];
