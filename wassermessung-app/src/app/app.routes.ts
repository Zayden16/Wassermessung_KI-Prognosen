import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'stations',
    loadComponent: () => import('./station-picker/station-picker.component').then(m => m.StationPickerComponent)
  },
  {
    path: 'stations/:station_no',
    loadComponent: () =>
      import('./station-detail/station-detail.component').then(m => m.StationDetailComponent)
  }
];
