import { Routes } from '@angular/router';

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
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardPage),
  },
  {
    path: 'mechanics',
    loadComponent: () =>
      import('./mechanics/mechanics.component').then((m) => m.MechanicsPage),
  },
];
