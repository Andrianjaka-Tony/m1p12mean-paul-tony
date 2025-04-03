import { Routes } from '@angular/router';
import { publicRoutes } from './public/public.routes';
import { managerRoutes } from './manager/manager.routes';
import { clientRoutes } from './client/client.routes';
import { RouteProtectionGuard } from './guards/route-protection.guard';

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
    canActivateChild: [RouteProtectionGuard],
  },
  {
    path: 'client',
    pathMatch: 'prefix',
    loadComponent: () =>
      import('./client/client.component').then((m) => m.ClientRoute),
    children: clientRoutes,
    canActivateChild: [RouteProtectionGuard],
  },
  {
    path: 'client',
    pathMatch: 'prefix',
    loadComponent: () =>
      import('./mechanic/mechanic.component').then((m) => m.MechanicRoute),
    children: clientRoutes,
    canActivateChild: [RouteProtectionGuard],
  },
];
