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
  {
    path: 'car/quote/:id',
    loadComponent: () =>
      import('./new-quote/new-quote.component').then((m) => m.NewQuotePage),
  },
  // {
  //   path: 'clients',
  //   loadComponent: () =>
  //     import('./clients/clients.component').then((m) => m.ClientsPage),
  //   children: managerClientsRoutes,
  // },
];
