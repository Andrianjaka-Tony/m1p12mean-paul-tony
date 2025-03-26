import { Routes } from '@angular/router';

export const clientRoutes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: 'overview',
    loadComponent: () =>
      import('./overview/overview.component').then((m) => m.OverviewPage),
  },
  {
    path: 'car/:id',
    loadComponent: () =>
      import('./car-page/car-page.component').then((m) => m.CarPage),
  },
  // {
  //   path: 'clients',
  //   loadComponent: () =>
  //     import('./clients/clients.component').then((m) => m.ClientsPage),
  //   children: managerClientsRoutes,
  // },
];
