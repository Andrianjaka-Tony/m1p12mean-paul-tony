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
  {
    path: 'services/details/:id',
    loadComponent: () =>
      import(
        './services/services/service-details/service-details.component'
      ).then((m) => m.ServiceDetailsPage),
  },

  {
    path: 'cars',
    loadComponent: () =>
      import('./cars/cars.component').then((m) => m.CarsPage),
  },
];
