import { Routes } from '@angular/router';

export const managerClientsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'services',
    pathMatch: 'full',
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./services/services.component').then((m) => m.ServicesPage),
  },
];
