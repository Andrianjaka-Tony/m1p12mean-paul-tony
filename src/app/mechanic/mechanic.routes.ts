import { Routes } from '@angular/router';

export const mechanicRoutes: Routes = [
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
    path: 'tasks',
    loadComponent: () =>
      import('./tasks/tasks.component').then((m) => m.TasksPage),
  },
];
