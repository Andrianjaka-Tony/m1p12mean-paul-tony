import { Routes } from '@angular/router';
import { publicRoutes } from './public/public.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./public/public.component').then((m) => m.PublicRoute),
    children: publicRoutes,
  },
];
