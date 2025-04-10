import { Routes } from '@angular/router';

import { managerClientsRoutes } from './clients/clients.routes';
import { managerMechanicsRoutes } from './mechanics/mechanics.routes';

export const managerRoutes: Routes = [
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
    path: 'overview/:id',
    loadComponent: () =>
      import('./overview/quote-page/quote-page.component').then(
        (m) => m.QuotePage
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardPage),
  },
  {
    path: 'clients',
    loadComponent: () =>
      import('./clients/clients.component').then((m) => m.ClientsPage),
    children: managerClientsRoutes,
  },
  {
    path: 'mechanics',
    loadComponent: () =>
      import('./mechanics/mechanics.component').then((m) => m.MechanicsPage),
    children: managerMechanicsRoutes,
  },
];
