import { Routes } from '@angular/router';
import { publicRoutes } from './public/public.routes';
import { managerRoutes } from './manager/manager.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./public/public.component').then((m) => m.PublicRoute),
    children: publicRoutes,
  },
  {
    path: 'manager',
    pathMatch: 'prefix',
    loadComponent: () =>
      import('./manager/manager.component').then((m) => m.ManagerRoute),
    children: managerRoutes,
  },
];
